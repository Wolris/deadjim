import type Phaser from "phaser";

import type {
  AttachmentId,
  SkeletonPose,
  SpriteAttachmentDefinition,
} from "../model.js";
import type { ValidatedSkeleton } from "../skeleton.js";

export const PHASER_TARGET_VERSION = "4.2.1";

export interface PhaserAssetBinding {
  textureKey: string;
  frame?: string | number;
}

export type PhaserAssetResolver = (
  assetId: string,
) => PhaserAssetBinding;

export interface Phaser4RendererOptions {
  resolveAsset?: PhaserAssetResolver;
}

export interface PhaserAtlasRegion {
  assetId: string;
  atlasFilename: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function defaultAssetResolver(assetId: string): PhaserAssetBinding {
  return { textureKey: assetId };
}

export function registerPhaserAtlasRegions(
  scene: Phaser.Scene,
  regions: readonly PhaserAtlasRegion[],
  atlasTextureKey: (atlasFilename: string) => string = (filename) => filename,
): PhaserAssetResolver {
  const bindings = new Map<string, PhaserAssetBinding>();

  for (const region of regions) {
    if (bindings.has(region.assetId)) {
      throw new Error(
        `Duplicate Phaser atlas region for asset ${region.assetId}.`,
      );
    }

    const textureKey = atlasTextureKey(region.atlasFilename);
    if (!scene.textures.exists(textureKey)) {
      throw new Error(
        `Phaser atlas texture ${textureKey} is not loaded for asset ${region.assetId}.`,
      );
    }

    const texture = scene.textures.get(textureKey);
    const frame = `dead-jim:${region.assetId}`;

    if (!texture.has(frame)) {
      const added = texture.add(
        frame,
        0,
        region.x,
        region.y,
        region.width,
        region.height,
      );

      if (!added) {
        throw new Error(
          `Could not register Phaser frame ${frame} in texture ${textureKey}.`,
        );
      }
    }

    bindings.set(region.assetId, { textureKey, frame });
  }

  return (assetId) =>
    bindings.get(assetId) ?? defaultAssetResolver(assetId);
}

function toPhaserOrigin(
  attachment: SpriteAttachmentDefinition,
): { x: number; y: number } {
  return {
    x: 0.5 - attachment.pivotX,
    y: 0.5 - attachment.pivotY,
  };
}

/**
 * First Phaser 4 renderer boundary.
 *
 * This adapter owns Phaser display objects and consumes only Dead Jim's
 * normalized, validated runtime state. It does not know about SkelForm source
 * fields or perform animation evaluation.
 */
export class Phaser4RendererAdapter {
  private readonly images = new Map<AttachmentId, Phaser.GameObjects.Image>();
  private destroyed = false;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly skeleton: ValidatedSkeleton,
    options: Phaser4RendererOptions = {},
  ) {
    const resolveAsset = options.resolveAsset ?? defaultAssetResolver;

    for (const attachment of skeleton.definition.attachments) {
      const binding = resolveAsset(attachment.assetId);
      const image = scene.add.image(
        0,
        0,
        binding.textureKey,
        binding.frame,
      );
      const origin = toPhaserOrigin(attachment);

      image
        .setOrigin(origin.x, origin.y)
        .setDepth(attachment.zIndex)
        .setVisible(false);

      this.images.set(attachment.id, image);
    }
  }

  applyPose(pose: SkeletonPose): void {
    this.assertActive();

    const visible = new Set(pose.visibleAttachments);

    for (const attachmentId of visible) {
      if (!this.images.has(attachmentId)) {
        throw new Error(
          `Pose references unknown attachment ${attachmentId}.`,
        );
      }
    }

    for (const attachment of this.skeleton.definition.attachments) {
      const image = this.images.get(attachment.id);
      if (!image) {
        throw new Error(
          `Missing Phaser image for attachment ${attachment.id}.`,
        );
      }

      const bonePose = pose.bones.get(attachment.boneId);
      if (!bonePose) {
        throw new Error(
          `Pose is missing bone ${attachment.boneId} required by attachment ${attachment.id}.`,
        );
      }

      const world = bonePose.world;
      image
        .setPosition(world.x, world.y)
        .setRotation(world.rotation)
        .setScale(world.scaleX, world.scaleY)
        .setVisible(visible.has(attachment.id));
    }
  }

  destroy(): void {
    if (this.destroyed) return;

    for (const image of this.images.values()) {
      image.destroy();
    }

    this.images.clear();
    this.destroyed = true;
  }

  private assertActive(): void {
    if (this.destroyed) {
      throw new Error("Phaser4RendererAdapter has been destroyed.");
    }
  }
}
