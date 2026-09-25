import { describe, expect, it } from "vitest";

import { blendSkeletonPoses } from "../src/blend.js";
import type {
  BonePose,
  SkeletonDefinition,
  SkeletonPose,
  Transform2D,
} from "../src/model.js";
import {
  advanceClipPlayback,
  createClipPlayback,
  evaluateClipPlaybackPose,
  sampleClipPlaybackTime,
} from "../src/playback.js";
import { evaluateClipPose } from "../src/pose.js";
import {
  PHASER_TARGET_VERSION,
  Phaser4RendererAdapter,
  registerPhaserAtlasRegions,
} from "../src/renderer/phaser.js";
import { validateSkeleton } from "../src/skeleton.js";
import {
  SkelFormAdapter,
  resolveSkelFormTextureRegions,
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

  constructor(
    readonly assetId: string,
    readonly frame?: string | number,
  ) {}

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

interface FakeFrame {
  sourceIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

class FakeTexture {
  readonly frames = new Map<string, FakeFrame>();

  has(name: string): boolean {
    return this.frames.has(name);
  }

  add(
    name: string,
    sourceIndex: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): FakeFrame | null {
    if (this.frames.has(name)) return null;

    const frame = { sourceIndex, x, y, width, height };
    this.frames.set(name, frame);
    return frame;
  }
}

class FakeTextureManager {
  private readonly textures = new Map<string, FakeTexture>();

  constructor(keys: readonly string[] = []) {
    for (const key of keys) {
      this.textures.set(key, new FakeTexture());
    }
  }

  exists(key: string): boolean {
    return this.textures.has(key);
  }

  get(key: string): FakeTexture {
    const texture = this.textures.get(key);
    if (!texture) {
      throw new Error(`Missing fake texture ${key}.`);
    }
    return texture;
  }
}

function makeScene(
  images: FakeImage[],
  textures: FakeTextureManager = new FakeTextureManager(),
) {
  return {
    add: {
      image(
        _x: number,
        _y: number,
        assetId: string,
        frame?: string | number,
      ) {
        const image = new FakeImage(assetId, frame);
        images.push(image);
        return image;
      },
    },
    textures,
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

  it("registers real SkelForm atlas regions and resolves them into Phaser frames", () => {
    const source = structuredClone(fixture) as SkelFormSource;
    const definition = new SkelFormAdapter().import(source);
    const skeleton = validateSkeleton(definition);
    const pose = evaluateClipPose(skeleton, definition.animations[0], 500);
    const images: FakeImage[] = [];
    const textures = new FakeTextureManager(["skelform:atlas0.png"]);
    const scene = makeScene(images, textures);
    const regions = resolveSkelFormTextureRegions(source, [0]);
    const resolveAsset = registerPhaserAtlasRegions(
      scene,
      regions,
      (filename) => `skelform:${filename}`,
    );
    const adapter = new Phaser4RendererAdapter(scene, skeleton, {
      resolveAsset,
    });

    expect(
      textures
        .get("skelform:atlas0.png")
        .frames.get("dead-jim:hand.png"),
    ).toEqual({
      sourceIndex: 0,
      x: 12,
      y: 20,
      width: 40,
      height: 60,
    });

    adapter.applyPose(pose);

    expect(images).toHaveLength(1);
    expect(images[0].assetId).toBe("skelform:atlas0.png");
    expect(images[0].frame).toBe("dead-jim:hand.png");
    expect(images[0].x).toBeCloseTo(20);
    expect(images[0].y).toBeCloseTo(-20);

    adapter.destroy();
  });

  it("fails clearly when a SkelForm atlas image has not been loaded into Phaser", () => {
    const source = structuredClone(fixture) as SkelFormSource;
    const regions = resolveSkelFormTextureRegions(source, [0]);
    const scene = makeScene([]);

    expect(() =>
      registerPhaserAtlasRegions(
        scene,
        regions,
        (filename) => `skelform:${filename}`,
      ),
    ).toThrow(
      "Phaser atlas texture skelform:atlas0.png is not loaded for asset hand.png",
    );
  });

  it("renders looping clip playback through the normalized runtime", () => {
    const source = structuredClone(fixture) as SkelFormSource;
    const definition = new SkelFormAdapter().import(source);
    const skeleton = validateSkeleton(definition);
    const loopClip = {
      ...definition.animations[0],
      loop: true,
    };
    const playback = advanceClipPlayback(
      createClipPlayback(loopClip),
      1600,
    );
    const pose = evaluateClipPlaybackPose(skeleton, playback);
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      skeleton,
    );

    expect(loopClip.durationMs).toBe(1100);
    expect(sampleClipPlaybackTime(playback)).toBe(500);

    adapter.applyPose(pose);

    expect(images).toHaveLength(1);
    expect(images[0].x).toBeCloseTo(20);
    expect(images[0].y).toBeCloseTo(-20);
    expect(images[0].rotation).toBeCloseTo(-0.75);
    expect(images[0].visible).toBe(true);

    adapter.destroy();
  });

  it("renders only the selected attachment alternative without changing transforms", () => {
    const swappable: SkeletonDefinition = {
      bones: [
        {
          id: "root",
          name: "Root",
          parentId: null,
          bind: transform(12, 18, 0.4, 1.5, 0.75),
        },
      ],
      attachments: [
        {
          id: "red-hat",
          name: "Red Hat",
          boneId: "root",
          assetId: "red-hat.png",
          pivotX: 0,
          pivotY: 0,
          zIndex: 4,
        },
        {
          id: "blue-hat",
          name: "Blue Hat",
          boneId: "root",
          assetId: "blue-hat.png",
          pivotX: 0,
          pivotY: 0,
          zIndex: 4,
        },
      ],
      attachmentSlots: [
        {
          id: "hat",
          attachmentIds: ["red-hat", "blue-hat"],
          defaultAttachmentId: "red-hat",
        },
      ],
      animations: [],
    };
    const skeleton = validateSkeleton(swappable);
    const defaultPose = evaluateClipPose(skeleton, null, 0);
    const swappedPose = evaluateClipPose(
      skeleton,
      null,
      0,
      new Map([["hat", "blue-hat"]]),
    );
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      skeleton,
    );

    adapter.applyPose(swappedPose);

    expect(defaultPose.bones).toEqual(swappedPose.bones);
    expect(images).toHaveLength(2);
    expect(images[0].assetId).toBe("red-hat.png");
    expect(images[0].visible).toBe(false);
    expect(images[1].assetId).toBe("blue-hat.png");
    expect(images[1].visible).toBe(true);
    expect(images[1].x).toBeCloseTo(12);
    expect(images[1].y).toBeCloseTo(18);
    expect(images[1].rotation).toBeCloseTo(0.4);
    expect(images[1].scaleX).toBeCloseTo(1.5);
    expect(images[1].scaleY).toBeCloseTo(0.75);

    adapter.destroy();
  });

  it("renders a blended pose from two evaluated clips", () => {
    const blendedDefinition: SkeletonDefinition = {
      bones: [
        {
          id: "root",
          name: "Root",
          parentId: null,
          bind: transform(0, 0, 0, 1, 1),
        },
      ],
      attachments: [
        {
          id: "root-image",
          name: "Root Image",
          boneId: "root",
          assetId: "root.png",
          pivotX: 0,
          pivotY: 0,
          zIndex: 2,
        },
      ],
      animations: [
        {
          id: "left",
          name: "Left",
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
                { timeMs: 1000, value: 0.5 },
              ],
              scaleX: [
                { timeMs: 0, value: 1 },
                { timeMs: 1000, value: 2 },
              ],
              scaleY: [
                { timeMs: 0, value: 1 },
                { timeMs: 1000, value: 2 },
              ],
            },
          ],
        },
        {
          id: "right",
          name: "Right",
          durationMs: 1000,
          loop: false,
          tracks: [
            {
              boneId: "root",
              x: [
                { timeMs: 0, value: 20 },
                { timeMs: 1000, value: 30 },
              ],
              rotation: [
                { timeMs: 0, value: 1 },
                { timeMs: 1000, value: 1.5 },
              ],
              scaleX: [
                { timeMs: 0, value: 3 },
                { timeMs: 1000, value: 4 },
              ],
              scaleY: [
                { timeMs: 0, value: 3 },
                { timeMs: 1000, value: 4 },
              ],
            },
          ],
        },
      ],
    };
    const skeleton = validateSkeleton(blendedDefinition);
    const firstPose = evaluateClipPose(
      skeleton,
      blendedDefinition.animations[0],
      500,
    );
    const secondPose = evaluateClipPose(
      skeleton,
      blendedDefinition.animations[1],
      500,
    );
    const blendedPose = blendSkeletonPoses(
      firstPose,
      secondPose,
      0.25,
    );
    const images: FakeImage[] = [];
    const adapter = new Phaser4RendererAdapter(
      makeScene(images),
      skeleton,
    );

    adapter.applyPose(blendedPose);

    expect(images).toHaveLength(1);
    expect(images[0].x).toBeCloseTo(10);
    expect(images[0].y).toBeCloseTo(0);
    expect(images[0].rotation).toBeCloseTo(0.5);
    expect(images[0].scaleX).toBeCloseTo(2);
    expect(images[0].scaleY).toBeCloseTo(2);
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
