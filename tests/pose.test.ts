import { describe, expect, it } from "vitest";

import type { AnimationClip, SkeletonDefinition, Transform2D } from "../src/model.js";
import {
  composeTransform,
  evaluateClipPose,
  sampleNumberKeyframes,
} from "../src/pose.js";
import { validateSkeleton } from "../src/skeleton.js";

const identity: Transform2D = {
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
};

function definition(
  bones: SkeletonDefinition["bones"],
  animations: SkeletonDefinition["animations"] = [],
): SkeletonDefinition {
  return {
    bones,
    attachments: [],
    animations,
  };
}

describe("composeTransform", () => {
  it("propagates parent translation, rotation, and scale into child world space", () => {
    const world = composeTransform(
      {
        x: 10,
        y: 20,
        rotation: Math.PI / 2,
        scaleX: 2,
        scaleY: 3,
      },
      {
        x: 4,
        y: 5,
        rotation: 0.25,
        scaleX: 0.5,
        scaleY: 0.25,
      },
    );

    expect(world.x).toBeCloseTo(-5);
    expect(world.y).toBeCloseTo(28);
    expect(world.rotation).toBeCloseTo(Math.PI / 2 + 0.25);
    expect(world.scaleX).toBeCloseTo(1);
    expect(world.scaleY).toBeCloseTo(0.75);
  });
});

describe("sampleNumberKeyframes", () => {
  it("linearly interpolates between adjacent keyframes", () => {
    expect(
      sampleNumberKeyframes(
        [
          { timeMs: 100, value: 10 },
          { timeMs: 300, value: 30 },
        ],
        200,
        0,
      ),
    ).toBe(20);
  });

  it("clamps before the first and after the last keyframe", () => {
    const keyframes = [
      { timeMs: 100, value: 10 },
      { timeMs: 300, value: 30 },
    ];

    expect(sampleNumberKeyframes(keyframes, 0, 99)).toBe(10);
    expect(sampleNumberKeyframes(keyframes, 400, 99)).toBe(30);
  });

  it("uses fallback for an empty channel and the value for a single keyframe", () => {
    expect(sampleNumberKeyframes([], 100, 7)).toBe(7);
    expect(sampleNumberKeyframes([{ timeMs: 100, value: 12 }], 0, 7)).toBe(12);
  });

  it("rejects non-increasing keyframe times", () => {
    expect(() =>
      sampleNumberKeyframes(
        [
          { timeMs: 100, value: 1 },
          { timeMs: 100, value: 2 },
        ],
        100,
        0,
      ),
    ).toThrow("Keyframe times must be strictly increasing.");
  });
});

describe("evaluateClipPose", () => {
  it("evaluates sparse transform channels and propagates world transforms in hierarchy order", () => {
    const clip: AnimationClip = {
      id: "move",
      name: "Move",
      durationMs: 1000,
      loop: false,
      tracks: [
        {
          boneId: "root",
          x: [
            { timeMs: 0, value: 0 },
            { timeMs: 1000, value: 10 },
          ],
          rotation: [
            { timeMs: 0, value: 0 },
            { timeMs: 1000, value: Math.PI },
          ],
        },
        {
          boneId: "child",
          scaleX: [
            { timeMs: 0, value: 1 },
            { timeMs: 1000, value: 2 },
          ],
        },
      ],
    };

    const skeleton = validateSkeleton(
      definition(
        [
          {
            id: "child",
            name: "Child",
            parentId: "root",
            bind: { x: 2, y: 0, rotation: 0.25, scaleX: 1, scaleY: 3 },
          },
          {
            id: "root",
            name: "Root",
            parentId: null,
            bind: identity,
          },
        ],
        [clip],
      ),
    );

    const pose = evaluateClipPose(skeleton, clip, 500);
    const root = pose.bones.get("root");
    const child = pose.bones.get("child");

    expect(root?.local.x).toBeCloseTo(5);
    expect(root?.local.rotation).toBeCloseTo(Math.PI / 2);
    expect(child?.local.x).toBe(2);
    expect(child?.local.rotation).toBe(0.25);
    expect(child?.local.scaleX).toBeCloseTo(1.5);
    expect(child?.local.scaleY).toBe(3);

    expect(child?.world.x).toBeCloseTo(5);
    expect(child?.world.y).toBeCloseTo(2);
    expect(child?.world.rotation).toBeCloseTo(Math.PI / 2 + 0.25);
    expect(child?.world.scaleX).toBeCloseTo(1.5);
    expect(child?.world.scaleY).toBeCloseTo(3);
  });

  it("returns bind pose when no clip is supplied", () => {
    const skeleton = validateSkeleton(
      definition([
        {
          id: "root",
          name: "Root",
          parentId: null,
          bind: { x: 3, y: 4, rotation: 0.5, scaleX: 2, scaleY: 2 },
        },
      ]),
    );

    const pose = evaluateClipPose(skeleton, null, 500);

    expect(pose.bones.get("root")?.local).toEqual({
      x: 3,
      y: 4,
      rotation: 0.5,
      scaleX: 2,
      scaleY: 2,
    });
    expect(pose.bones.get("root")?.world).toEqual(
      pose.bones.get("root")?.local,
    );
  });

  it("rejects tracks for missing bones and duplicate tracks for one bone", () => {
    const skeleton = validateSkeleton(
      definition([
        { id: "root", name: "Root", parentId: null, bind: identity },
      ]),
    );

    expect(() =>
      evaluateClipPose(
        skeleton,
        {
          id: "bad",
          name: "Bad",
          durationMs: 100,
          loop: false,
          tracks: [{ boneId: "missing", x: [{ timeMs: 0, value: 1 }] }],
        },
        0,
      ),
    ).toThrow("Animation track references missing bone missing");

    expect(() =>
      evaluateClipPose(
        skeleton,
        {
          id: "duplicate",
          name: "Duplicate",
          durationMs: 100,
          loop: false,
          tracks: [
            { boneId: "root", x: [{ timeMs: 0, value: 1 }] },
            { boneId: "root", y: [{ timeMs: 0, value: 2 }] },
          ],
        },
        0,
      ),
    ).toThrow("Animation clip contains duplicate transform tracks for bone root");
  });
});
