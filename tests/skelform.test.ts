import { describe, expect, it } from "vitest";

import { evaluateClipPose } from "../src/pose.js";
import { validateSkeleton } from "../src/skeleton.js";
import {
  SKELFORM_ARMATURE_VERSION,
  SKELFORM_RELEASE_COMMIT,
  SKELFORM_RELEASE_TAG,
  SkelFormAdapter,
  resolveSkelFormTextureRegions,
  type SkelFormSource,
} from "../src/source/skelform.js";
import fixture from "./fixtures/skelform-v0.7.2-minimal.json";

function source(): SkelFormSource {
  return structuredClone(fixture) as SkelFormSource;
}

describe("SkelFormAdapter", () => {
  it("pins the first importer to the released v0.7.2 source schema", () => {
    expect(SKELFORM_RELEASE_TAG).toBe("v0.7.2");
    expect(SKELFORM_RELEASE_COMMIT).toBe(
      "37b268dfa578a2fb2e31c29814c5f609249475f2",
    );
    expect(SKELFORM_ARMATURE_VERSION).toBe("0.7.1");
  });

  it("maps hierarchy, bind transforms, visuals, and transform animation channels", () => {
    const definition = new SkelFormAdapter().import(source());

    expect(definition.bones).toEqual([
      {
        id: "0",
        name: "Root",
        parentId: null,
        bind: {
          x: 10,
          y: -20,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        },
      },
      {
        id: "1",
        name: "Hand",
        parentId: "0",
        bind: {
          x: 5,
          y: 0,
          rotation: -0.25,
          scaleX: 1,
          scaleY: 1,
        },
      },
    ]);

    expect(definition.attachments).toEqual([
      {
        id: "bone-1-visual-0",
        name: "hand.png",
        boneId: "1",
        assetId: "hand.png",
        pivotX: 0.5,
        pivotY: -0.75,
        zIndex: 3,
      },
    ]);

    expect(definition.animations).toEqual([
      {
        id: "0",
        name: "MoveAndTurn",
        durationMs: 1100,
        loop: false,
        tracks: [
          {
            boneId: "0",
            x: [
              { timeMs: 0, value: 10 },
              { timeMs: 1000, value: 20 },
            ],
          },
          {
            boneId: "1",
            rotation: [
              { timeMs: 0, value: -0.25 },
              { timeMs: 1000, value: -1.25 },
            ],
          },
        ],
      },
    ]);
  });

  it("resolves packed SkelForm texture regions using active-style precedence", () => {
    const packed = source();
    packed.atlases = [
      ...(packed.atlases ?? []),
      { filename: "atlas1.png" },
    ];
    packed.styles = [
      ...(packed.styles ?? []),
      {
        id: 1,
        name: "Alternate",
        textures: [
          {
            name: "hand.png",
            offset: { x: 70, y: 80 },
            size: { x: 44, y: 66 },
            atlas_idx: 1,
          },
        ],
      },
    ];

    expect(resolveSkelFormTextureRegions(packed, [0])).toEqual([
      {
        assetId: "hand.png",
        styleId: 0,
        styleName: "Default",
        atlasIndex: 0,
        atlasFilename: "atlas0.png",
        x: 12,
        y: 20,
        width: 40,
        height: 60,
      },
    ]);

    expect(resolveSkelFormTextureRegions(packed, [1, 0])).toEqual([
      {
        assetId: "hand.png",
        styleId: 1,
        styleName: "Alternate",
        atlasIndex: 1,
        atlasFilename: "atlas1.png",
        x: 70,
        y: 80,
        width: 44,
        height: 66,
      },
    ]);
  });

  it("rejects invalid or incomplete SkelForm atlas metadata deterministically", () => {
    expect(() => resolveSkelFormTextureRegions(source(), [])).toThrow(
      "at least one active style id",
    );

    expect(() => resolveSkelFormTextureRegions(source(), [99])).toThrow(
      "active style 99 does not exist",
    );

    const missingTexture = source();
    missingTexture.styles = [
      {
        id: 0,
        name: "Default",
        textures: [],
      },
    ];
    expect(() =>
      resolveSkelFormTextureRegions(missingTexture, [0]),
    ).toThrow("No active SkelForm style provides texture hand.png");

    const missingAtlas = source();
    missingAtlas.styles = [
      {
        id: 0,
        name: "Default",
        textures: [
          {
            name: "hand.png",
            offset: { x: 0, y: 0 },
            size: { x: 10, y: 10 },
            atlas_idx: 4,
          },
        ],
      },
    ];
    expect(() =>
      resolveSkelFormTextureRegions(missingAtlas, [0]),
    ).toThrow("references missing atlas 4");
  });

  it("feeds imported data through normalized pose evaluation", () => {
    const definition = new SkelFormAdapter().import(source());
    const skeleton = validateSkeleton(definition);
    const clip = definition.animations[0];
    const pose = evaluateClipPose(skeleton, clip, 500);

    expect(pose.bones.get("0")?.local.x).toBeCloseTo(15);
    expect(pose.bones.get("0")?.world).toEqual(
      pose.bones.get("0")?.local,
    );

    expect(pose.bones.get("1")?.local.rotation).toBeCloseTo(-0.75);
    expect(pose.bones.get("1")?.world.x).toBeCloseTo(20);
    expect(pose.bones.get("1")?.world.y).toBeCloseTo(-20);
    expect(pose.bones.get("1")?.world.rotation).toBeCloseTo(-0.75);
    expect(pose.visibleAttachments).toEqual(["bone-1-visual-0"]);
  });

  it("converts SkelForm Y-up and counter-clockwise channels at the source boundary", () => {
    const converted = source();
    converted.animations[0].keyframes = [
      ...converted.animations[0].keyframes,
      {
        frame: 0,
        bone_id: 0,
        element: "PositionY",
        value: 20,
        handle_preset: "Linear",
      },
      {
        frame: 10,
        bone_id: 0,
        element: "PositionY",
        value: 30,
        handle_preset: "Linear",
      },
    ];

    const definition = new SkelFormAdapter().import(converted);
    const rootTrack = definition.animations[0].tracks.find(
      (track) => track.boneId === "0",
    );

    expect(rootTrack?.y).toEqual([
      { timeMs: 0, value: -20 },
      { timeMs: 1000, value: -30 },
    ]);
  });

  it("rejects source versions and interpolation semantics outside the pinned discriminator", () => {
    const wrongVersion = source();
    wrongVersion.version = "0.8.0";
    expect(() => new SkelFormAdapter().import(wrongVersion)).toThrow(
      "Unsupported SkelForm armature version: 0.8.0",
    );

    const curved = source();
    curved.animations[0].keyframes[0].handle_preset = "SineIn";
    expect(() => new SkelFormAdapter().import(curved)).toThrow(
      "only Linear is supported",
    );
  });

  it("rejects deferred mesh, IK, and physics data instead of silently dropping it", () => {
    const mesh = source();
    mesh.visuals[0].vertices = [{ id: 0 }];
    expect(() => new SkelFormAdapter().import(mesh)).toThrow(
      "mesh data",
    );

    const ik = source();
    ik.inverse_kinematics = [{}];
    expect(() => new SkelFormAdapter().import(ik)).toThrow(
      "inverse kinematics",
    );

    const physics = source();
    physics.physics = [{}];
    expect(() => new SkelFormAdapter().import(physics)).toThrow(
      "physics",
    );

    const pivotRotation = source();
    pivotRotation.visuals[0].pivot_rot = 0.25;
    expect(() => new SkelFormAdapter().import(pivotRotation)).toThrow(
      "pivot rotation",
    );

    const pivotScale = source();
    pivotScale.visuals[0].pivot_scale = { x: 2, y: 1 };
    expect(() => new SkelFormAdapter().import(pivotScale)).toThrow(
      "pivot scale",
    );

    const tint = source();
    tint.visuals[0].tint = { r: 1, g: 0.5, b: 1, a: 1 };
    expect(() => new SkelFormAdapter().import(tint)).toThrow(
      "uses tint",
    );

    const hidden = source();
    hidden.bones[1].init_hidden = true;
    expect(() => new SkelFormAdapter().import(hidden)).toThrow(
      "hidden in the bind pose",
    );
  });
});
