import { describe, expect, it } from "vitest";

import type {
  BonePose,
  SkeletonDefinition,
  SkeletonPose,
  Transform2D,
} from "../src/model.js";
import { evaluateClipPose } from "../src/pose.js";
import {
  PHASER_TARGET_VERSION,
  Phaser4RendererAdapter,
} from "../src/renderer/phaser.js";
import { validateSkeleton } from "../src/skeleton.js";
import {
  SkelFormAdapter,
  type SkelFormSource,
} from "../src/source/skelform.js";
import fixture from "./fixtures/skelform-v0.7.2-minimal.json";

class FakeImage {
  x = 0;
  y = 0;
  rotation = 0;
  scaleX = 1;
  scaleY = 1;
  originX = 0.5;
  originY = 0.5;
  depth = 0;
  visible = true;
  destroyed = false;

  constructor(readonly assetId: string) {}

  setPosition(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  setRotation(rotation: number): this {
    this.rotation = rotation;
    return this;
  }

  setScale(x: number, y: number): this {
    this.scaleX = x;
    this.scaleY = y;
    return this;
  }

  setOrigin(x: number, y: number): this {
    this.originX = x;
    this.originY = y;
    return this;
  }

  setDepth(depth: number): this {
    this.depth = depth;
    return this;
  }

  setVisible(visible: boolean): this {
    this.visible = visible;
    return this;
  }

  destroy(): void {
    this.destroyed = true;
  }
}

function makeScene(images: FakeImage[]) {
  return {
    add: {
      image(_x: number, _y: number, assetId: string) {
        const image = new FakeImage(assetId);
        images.push(image);
        return image;
      },
    },
  } as unknown as ConstructorParameters<typeof Phaser4RendererAdapter>[0];
}

function transform(
  x: number,
  y: number,
  rotation: number,
  scaleX: number,
  scaleY: number,
): Transform2D {
  return { x, y, rotation, scaleX, scaleY };
}

function poseFor(
  bonePoses: readonly BonePose[],
  visibleAttachments: readonly string[],
): SkeletonPose {
  return {
    bones: new Map(bonePoses.map((bone) => [bone.boneId, bone])),
    visibleAttachments,
  };
}

function definition(): SkeletonDefinition {
  return {
    bones: [
      {
        id: "root",
        name: "Root",
        parentId: null,
        bind: transform(0, 0, 0, 1, 1),
      },
      {
        id: "hand",
        name: "Hand",
        parentId: "root",
        bind: transform(5, 0, 0, 1, 1),
      },
    ],
    attachments: [
      {
        id: "hand-image",
        name: "Hand Image",
        boneId: "hand",
        assetId: "hand-texture",
        pivotX: 0.25,
        pivotY: -0.1,
        zIndex: 7,
      },
    ],
    animations: [],
  };
}

describe("Phaser4RendererAdapter", () => {
  it("pins the first renderer boundary to Phaser 4.2.1", () => {
    expect(PHASER_TARGET_VERSION).toBe("4.2.1");
  });

  it("creates Phaser images with normalized pivot and depth, hidden until a pose is applied", () => {
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      validateSkeleton(definition()),
    );

    expect(images).toHaveLength(1);
    expect(images[0].assetId).toBe("hand-texture");
    expect(images[0].originX).toBeCloseTo(0.25);
    expect(images[0].originY).toBeCloseTo(0.6);
    expect(images[0].depth).toBe(7);
    expect(images[0].visible).toBe(false);

    adapter.destroy();
  });

  it("applies evaluated world transforms and attachment visibility", () => {
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      validateSkeleton(definition()),
    );

    adapter.applyPose(
      poseFor(
        [
          {
            boneId: "root",
            local: transform(10, 20, 0.1, 1, 1),
            world: transform(10, 20, 0.1, 1, 1),
          },
          {
            boneId: "hand",
            local: transform(5, 0, 0.2, 2, 0.5),
            world: transform(14.5, 22.25, 0.3, 2, 0.5),
          },
        ],
        ["hand-image"],
      ),
    );

    expect(images[0].x).toBeCloseTo(14.5);
    expect(images[0].y).toBeCloseTo(22.25);
    expect(images[0].rotation).toBeCloseTo(0.3);
    expect(images[0].scaleX).toBeCloseTo(2);
    expect(images[0].scaleY).toBeCloseTo(0.5);
    expect(images[0].visible).toBe(true);

    adapter.applyPose(
      poseFor(
        [
          {
            boneId: "root",
            local: transform(10, 20, 0.1, 1, 1),
            world: transform(10, 20, 0.1, 1, 1),
          },
          {
            boneId: "hand",
            local: transform(5, 0, 0.2, 2, 0.5),
            world: transform(14.5, 22.25, 0.3, 2, 0.5),
          },
        ],
        [],
      ),
    );

    expect(images[0].visible).toBe(false);

    adapter.destroy();
  });

  it("fails deterministically for mismatched pose state", () => {
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      validateSkeleton(definition()),
    );

    expect(() =>
      adapter.applyPose(
        poseFor(
          [
            {
              boneId: "root",
              local: transform(0, 0, 0, 1, 1),
              world: transform(0, 0, 0, 1, 1),
            },
          ],
          ["hand-image"],
        ),
      ),
    ).toThrow("Pose is missing bone hand");

    expect(() =>
      adapter.applyPose(
        poseFor(
          [
            {
              boneId: "root",
              local: transform(0, 0, 0, 1, 1),
              world: transform(0, 0, 0, 1, 1),
            },
            {
              boneId: "hand",
              local: transform(0, 0, 0, 1, 1),
              world: transform(0, 0, 0, 1, 1),
            },
          ],
          ["unknown-attachment"],
        ),
      ),
    ).toThrow("Pose references unknown attachment unknown-attachment");

    adapter.destroy();
  });

  it("renders the normalized pose produced from the pinned SkelForm fixture", () => {
    const source = structuredClone(fixture) as SkelFormSource;
    const definition = new SkelFormAdapter().import(source);
    const skeleton = validateSkeleton(definition);
    const pose = evaluateClipPose(skeleton, definition.animations[0], 500);
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      skeleton,
    );

    adapter.applyPose(pose);

    expect(images).toHaveLength(1);
    expect(images[0].assetId).toBe("hand.png");
    expect(images[0].x).toBeCloseTo(20);
    expect(images[0].y).toBeCloseTo(-20);
    expect(images[0].rotation).toBeCloseTo(-0.75);
    expect(images[0].scaleX).toBeCloseTo(1);
    expect(images[0].scaleY).toBeCloseTo(1);
    expect(images[0].originX).toBeCloseTo(0);
    expect(images[0].originY).toBeCloseTo(1.25);
    expect(images[0].depth).toBe(3);
    expect(images[0].visible).toBe(true);

    adapter.destroy();
  });

  it("owns and destroys its Phaser images exactly once", () => {
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      validateSkeleton(definition()),
    );

    adapter.destroy();
    adapter.destroy();

    expect(images[0].destroyed).toBe(true);
    expect(() =>
      adapter.applyPose(
        poseFor([], []),
      ),
    ).toThrow("has been destroyed");
  });
});
