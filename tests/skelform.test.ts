import { describe, expect, it } from "vitest";

import { evaluateClipPose } from "../src/pose.js";
import { validateSkeleton } from "../src/skeleton.js";
import {
  SKELFORM_ARMATURE_VERSION,
  SKELFORM_RELEASE_COMMIT,
  SKELFORM_RELEASE_TAG,
  SkelFormAdapter,
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
          y: 20,
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
          rotation: 0.25,
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
        pivotY: 0.75,
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
              { timeMs: 0, value: 0.25 },
              { timeMs: 1000, value: 1.25 },
            ],
          },
        ],
      },
    ]);
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

    expect(pose.bones.get("1")?.local.rotation).toBeCloseTo(0.75);
    expect(pose.bones.get("1")?.world.x).toBeCloseTo(20);
    expect(pose.bones.get("1")?.world.y).toBeCloseTo(20);
    expect(pose.bones.get("1")?.world.rotation).toBeCloseTo(0.75);
    expect(pose.visibleAttachments).toEqual(["bone-1-visual-0"]);
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
  });
});
