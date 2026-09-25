import { describe, expect, it } from "vitest";

import type {
  BonePose,
  SkeletonPose,
  Transform2D,
} from "../src/model.js";
import { blendSkeletonPoses } from "../src/blend.js";

function transform(
  x: number,
  y: number,
  rotation: number,
  scaleX: number,
  scaleY: number,
): Transform2D {
  return { x, y, rotation, scaleX, scaleY };
}

function bone(
  boneId: string,
  local: Transform2D,
  world: Transform2D = local,
): BonePose {
  return { boneId, local, world };
}

function pose(
  bones: readonly BonePose[],
  visibleAttachments: readonly string[] = ["image"],
): SkeletonPose {
  return {
    bones: new Map(bones.map((entry) => [entry.boneId, entry])),
    visibleAttachments,
  };
}

describe("blendSkeletonPoses", () => {
  const first = pose([
    bone(
      "root",
      transform(0, 10, 0.2, 1, 2),
      transform(5, 15, 0.4, 2, 3),
    ),
  ]);
  const second = pose([
    bone(
      "root",
      transform(20, 30, 1.2, 3, 4),
      transform(25, 35, 1.4, 4, 5),
    ),
  ]);

  it("preserves exact endpoint identity", () => {
    expect(blendSkeletonPoses(first, second, 0)).toBe(first);
    expect(blendSkeletonPoses(first, second, 1)).toBe(second);
  });

  it("linearly blends translation, rotation, and scale at the midpoint", () => {
    const blended = blendSkeletonPoses(first, second, 0.5);
    const root = blended.bones.get("root");

    expect(root?.local).toEqual({
      x: 10,
      y: 20,
      rotation: 0.7,
      scaleX: 2,
      scaleY: 3,
    });
    expect(root?.world.x).toBeCloseTo(15);
    expect(root?.world.y).toBeCloseTo(25);
    expect(root?.world.rotation).toBeCloseTo(0.9);
    expect(root?.world.scaleX).toBeCloseTo(3);
    expect(root?.world.scaleY).toBeCloseTo(4);
    expect(blended.visibleAttachments).toBe(first.visibleAttachments);
  });

  it("supports deterministic non-midpoint weights", () => {
    const blended = blendSkeletonPoses(first, second, 0.25);
    const root = blended.bones.get("root");

    expect(root?.local.x).toBeCloseTo(5);
    expect(root?.local.rotation).toBeCloseTo(0.45);
    expect(root?.local.scaleX).toBeCloseTo(1.5);
    expect(root?.local.scaleY).toBeCloseTo(2.5);
  });

  it("rejects invalid weights", () => {
    expect(() => blendSkeletonPoses(first, second, -0.01)).toThrow(
      "Blend weight must be a finite number between 0 and 1.",
    );
    expect(() => blendSkeletonPoses(first, second, 1.01)).toThrow(
      "Blend weight must be a finite number between 0 and 1.",
    );
    expect(() => blendSkeletonPoses(first, second, Number.NaN)).toThrow(
      "Blend weight must be a finite number between 0 and 1.",
    );
  });

  it("rejects incompatible bone sets for intermediate blends", () => {
    const incompatible = pose([
      bone("other", transform(0, 0, 0, 1, 1)),
    ]);

    expect(() => blendSkeletonPoses(first, incompatible, 0.5)).toThrow(
      "Blended poses must contain the same bone ids.",
    );
  });

  it("rejects differing attachment visibility for intermediate blends", () => {
    const hidden = pose(
      [
        bone(
          "root",
          transform(20, 30, 1.2, 3, 4),
          transform(25, 35, 1.4, 4, 5),
        ),
      ],
      [],
    );

    expect(() => blendSkeletonPoses(first, hidden, 0.5)).toThrow(
      "Intermediate blended poses require identical visibleAttachments.",
    );

    expect(blendSkeletonPoses(first, hidden, 0)).toBe(first);
    expect(blendSkeletonPoses(first, hidden, 1)).toBe(hidden);
  });
});
