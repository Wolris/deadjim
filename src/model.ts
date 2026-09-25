export type BoneId = string;
export type AttachmentId = string;
export type AnimationId = string;

/**
 * Dead Jim normalized 2D transform space.
 *
 * +X points right, +Y points down, and positive rotation is clockwise in
 * radians. Source adapters are responsible for converting external coordinate
 * conventions into this space.
 */
export interface Transform2D {
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export const IDENTITY_TRANSFORM: Readonly<Transform2D> = Object.freeze({
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
});

export interface BoneDefinition {
  id: BoneId;
  name: string;
  parentId: BoneId | null;
  bind: Transform2D;
}

export interface SpriteAttachmentDefinition {
  id: AttachmentId;
  name: string;
  boneId: BoneId;
  assetId: string;
  /**
   * Texture-center-relative normalized offsets in Dead Jim coordinates.
   * (0, 0) centers the texture on the bone; (+0.5, +0.5) places the texture
   * center half a texture width right and half a texture height down.
   */
  pivotX: number;
  pivotY: number;
  zIndex: number;
}

export interface NumberKeyframe {
  timeMs: number;
  value: number;
}

export interface TransformTrack {
  boneId: BoneId;
  x?: readonly NumberKeyframe[];
  y?: readonly NumberKeyframe[];
  rotation?: readonly NumberKeyframe[];
  scaleX?: readonly NumberKeyframe[];
  scaleY?: readonly NumberKeyframe[];
}

export interface AnimationClip {
  id: AnimationId;
  name: string;
  durationMs: number;
  loop: boolean;
  tracks: readonly TransformTrack[];
}

export interface SkeletonDefinition {
  bones: readonly BoneDefinition[];
  attachments: readonly SpriteAttachmentDefinition[];
  animations: readonly AnimationClip[];
}

export interface BonePose {
  boneId: BoneId;
  local: Transform2D;
  world: Transform2D;
}

export interface SkeletonPose {
  bones: ReadonlyMap<BoneId, BonePose>;
  visibleAttachments: readonly AttachmentId[];
}
