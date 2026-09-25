import type Phaser from "phaser";

import type {
  AttachmentId,
  SkeletonPose,
  SpriteAttachmentDefinition,
} from "../model.js";
import type { ValidatedSkeleton } from "../skeleton.js";

export const PHASER_TARGET_VERSION = "4.2.1";

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
  ) {
    for (const attachment of skeleton.definition.attachments) {
      const image = scene.add.image(0, 0, attachment.assetId);
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
