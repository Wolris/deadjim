import { describe, expect, it } from "vitest";

import type { SkeletonDefinition } from "../src/model.js";
import { validateSkeleton } from "../src/skeleton.js";

const transform = {
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
};

function skeleton(
  bones: SkeletonDefinition["bones"],
  attachments: SkeletonDefinition["attachments"] = [],
): SkeletonDefinition {
  return {
    bones,
    attachments,
    animations: [],
  };
}

describe("validateSkeleton", () => {
  it("returns parent-before-child evaluation order regardless of source order", () => {
    const result = validateSkeleton(
      skeleton([
        { id: "hand", name: "Hand", parentId: "arm", bind: transform },
        { id: "root", name: "Root", parentId: null, bind: transform },
        { id: "arm", name: "Arm", parentId: "root", bind: transform },
      ]),
    );

    expect(result.boneOrder).toEqual(["root", "arm", "hand"]);
  });

  it("rejects duplicate bone ids", () => {
    expect(() =>
      validateSkeleton(
        skeleton([
          { id: "root", name: "Root A", parentId: null, bind: transform },
          { id: "root", name: "Root B", parentId: null, bind: transform },
        ]),
      ),
    ).toThrow("Duplicate bone id: root");
  });

  it("rejects missing parents", () => {
    expect(() =>
      validateSkeleton(
        skeleton([
          { id: "hand", name: "Hand", parentId: "arm", bind: transform },
        ]),
      ),
    ).toThrow("Bone hand references missing parent arm");
  });

  it("rejects cycles", () => {
    expect(() =>
      validateSkeleton(
        skeleton([
          { id: "a", name: "A", parentId: "b", bind: transform },
          { id: "b", name: "B", parentId: "a", bind: transform },
        ]),
      ),
    ).toThrow("Bone hierarchy contains a cycle");
  });

  it("rejects attachments that target missing bones", () => {
    expect(() =>
      validateSkeleton(
        skeleton(
          [{ id: "root", name: "Root", parentId: null, bind: transform }],
          [
            {
              id: "sword",
              name: "Sword",
              boneId: "hand",
              assetId: "sword.png",
              pivotX: 0.5,
              pivotY: 0.5,
              zIndex: 10,
            },
          ],
        ),
      ),
    ).toThrow("Attachment sword references missing bone hand");
  });
});
