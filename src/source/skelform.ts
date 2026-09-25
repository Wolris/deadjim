import type {
  AnimationClip,
  BoneId,
  NumberKeyframe,
  SkeletonDefinition,
  SpriteAttachmentDefinition,
  TransformTrack,
} from "../model.js";
import type { SkeletonSourceAdapter } from "../source.js";

/**
 * First pinned SkelForm compatibility target.
 *
 * SkelForm release v0.7.2 is tag 37b268dfa578a2fb2e31c29814c5f609249475f2.
 * That release's Cargo package version is still 0.7.1, and SkelForm serializes
 * CARGO_PKG_VERSION into armature.json. Therefore files produced by this
 * compatibility target identify themselves as version "0.7.1".
 */
export const SKELFORM_RELEASE_TAG = "v0.7.2";
export const SKELFORM_RELEASE_COMMIT =
  "37b268dfa578a2fb2e31c29814c5f609249475f2";
export const SKELFORM_ARMATURE_VERSION = "0.7.1";

export interface SkelFormVec2 {
  x: number;
  y: number;
}

export interface SkelFormBone {
  id: number;
  name: string;
  parent_id: number;
  init_pos: SkelFormVec2;
  init_rot: number;
  init_scale: SkelFormVec2;
  init_hidden?: boolean;
  visuals_id?: number;
  ik_family_id?: number;
  physics_id?: number;
}

export interface SkelFormTint {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface SkelFormVisuals {
  tex?: string;
  tint?: SkelFormTint;
  zindex?: number;
  pivot_pos?: SkelFormVec2;
  pivot_rot?: number;
  pivot_scale?: SkelFormVec2;
  vertices?: readonly unknown[];
  indices?: readonly unknown[];
  binds?: readonly unknown[];
}

export interface SkelFormKeyframe {
  frame: number;
  bone_id: number;
  element: string;
  value?: number;
  handle_preset?: string;
}

export interface SkelFormAnimation {
  id: number;
  name: string;
  fps: number;
  keyframes: readonly SkelFormKeyframe[];
}

export interface SkelFormSource {
  version: string;
  bones: readonly SkelFormBone[];
  animations: readonly SkelFormAnimation[];
  visuals: readonly SkelFormVisuals[];
  inverse_kinematics?: readonly unknown[];
  physics?: readonly unknown[];
}

interface MutableTransformTrack {
  boneId: BoneId;
  x?: NumberKeyframe[];
  y?: NumberKeyframe[];
  rotation?: NumberKeyframe[];
  scaleX?: NumberKeyframe[];
  scaleY?: NumberKeyframe[];
}

function sourceBoneId(id: number): BoneId {
  return String(id);
}

function requireFinite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    throw new Error(`SkelForm ${label} must be a finite number.`);
  }
  return value;
}

function negateWithoutNegativeZero(value: number): number {
  const converted = -value;
  return Object.is(converted, -0) ? 0 : converted;
}

function sourceYToNormalized(value: number): number {
  return negateWithoutNegativeZero(value);
}

function sourceRotationToNormalized(value: number): number {
  return negateWithoutNegativeZero(value);
}

function sourceChannelValueToNormalized(
  element: string,
  value: number,
): number {
  switch (element) {
    case "PositionY":
      return sourceYToNormalized(value);
    case "Rotation":
      return sourceRotationToNormalized(value);
    default:
      return value;
  }
}

function ensureFirstDiscriminatorScope(source: SkelFormSource): void {
  if (source.version !== SKELFORM_ARMATURE_VERSION) {
    throw new Error(
      `Unsupported SkelForm armature version: ${source.version}. Expected ${SKELFORM_ARMATURE_VERSION} from ${SKELFORM_RELEASE_TAG}.`,
    );
  }

  if ((source.inverse_kinematics?.length ?? 0) > 0) {
    throw new Error("SkelForm inverse kinematics are not supported by this import discriminator.");
  }

  if ((source.physics?.length ?? 0) > 0) {
    throw new Error("SkelForm physics are not supported by this import discriminator.");
  }

  source.bones.forEach((bone, index) => {
    if (bone.id !== index) {
      throw new Error(
        `SkelForm bone ids must be sequential from 0; expected ${index}, received ${bone.id}.`,
      );
    }
    if ((bone.ik_family_id ?? -1) !== -1) {
      throw new Error(
        `SkelForm bone ${bone.id} uses inverse kinematics, which are not supported by this import discriminator.`,
      );
    }
    if ((bone.physics_id ?? -1) !== -1) {
      throw new Error(
        `SkelForm bone ${bone.id} uses physics, which are not supported by this import discriminator.`,
      );
    }
    if (bone.init_hidden === true) {
      throw new Error(
        `SkelForm bone ${bone.id} is hidden in the bind pose, which is not supported by this import discriminator.`,
      );
    }
  });
}

function convertAttachments(source: SkelFormSource): SpriteAttachmentDefinition[] {
  const attachments: SpriteAttachmentDefinition[] = [];

  for (const bone of source.bones) {
    const visualsId = bone.visuals_id ?? -1;
    if (visualsId === -1) continue;

    const visual = source.visuals[visualsId];
    if (!visual) {
      throw new Error(
        `SkelForm bone ${bone.id} references missing visuals ${visualsId}.`,
      );
    }

    if (
      (visual.vertices?.length ?? 0) > 0 ||
      (visual.indices?.length ?? 0) > 0 ||
      (visual.binds?.length ?? 0) > 0
    ) {
      throw new Error(
        `SkelForm visuals ${visualsId} uses mesh data, which is outside the first Dead Jim import discriminator.`,
      );
    }

    const pivotRotation = requireFinite(
      visual.pivot_rot ?? 0,
      `visuals ${visualsId} pivot rotation`,
    );
    if (pivotRotation !== 0) {
      throw new Error(
        `SkelForm visuals ${visualsId} uses pivot rotation, which is outside the first Dead Jim import discriminator.`,
      );
    }

    const pivotScale = visual.pivot_scale ?? { x: 1, y: 1 };
    if (
      requireFinite(pivotScale.x, `visuals ${visualsId} pivot scale x`) !== 1 ||
      requireFinite(pivotScale.y, `visuals ${visualsId} pivot scale y`) !== 1
    ) {
      throw new Error(
        `SkelForm visuals ${visualsId} uses pivot scale, which is outside the first Dead Jim import discriminator.`,
      );
    }

    const tint = visual.tint ?? { r: 1, g: 1, b: 1, a: 1 };
    if (
      tint.r !== 1 ||
      tint.g !== 1 ||
      tint.b !== 1 ||
      tint.a !== 1
    ) {
      throw new Error(
        `SkelForm visuals ${visualsId} uses tint, which is outside the first Dead Jim import discriminator.`,
      );
    }

    const assetId = visual.tex ?? "";
    if (assetId.length === 0) continue;

    const pivot = visual.pivot_pos ?? { x: 0, y: 0 };

    attachments.push({
      id: `bone-${bone.id}-visual-${visualsId}`,
      name: assetId,
      boneId: sourceBoneId(bone.id),
      assetId,
      pivotX: requireFinite(pivot.x, `visuals ${visualsId} pivot x`),
      pivotY: sourceYToNormalized(
        requireFinite(pivot.y, `visuals ${visualsId} pivot y`),
      ),
      zIndex: requireFinite(visual.zindex ?? 0, `visuals ${visualsId} z-index`),
    });
  }

  return attachments;
}

function getTrackChannel(
  track: MutableTransformTrack,
  element: string,
): NumberKeyframe[] {
  switch (element) {
    case "PositionX":
      return (track.x ??= []);
    case "PositionY":
      return (track.y ??= []);
    case "Rotation":
      return (track.rotation ??= []);
    case "ScaleX":
      return (track.scaleX ??= []);
    case "ScaleY":
      return (track.scaleY ??= []);
    default:
      throw new Error(
        `Unsupported SkelForm animation element in first import discriminator: ${element}`,
      );
  }
}

function sortTrackChannels(track: MutableTransformTrack): TransformTrack {
  const byTime = (a: NumberKeyframe, b: NumberKeyframe): number =>
    a.timeMs - b.timeMs;

  track.x?.sort(byTime);
  track.y?.sort(byTime);
  track.rotation?.sort(byTime);
  track.scaleX?.sort(byTime);
  track.scaleY?.sort(byTime);

  return track;
}

function convertAnimation(
  animation: SkelFormAnimation,
  source: SkelFormSource,
): AnimationClip {
  if (!Number.isFinite(animation.fps) || animation.fps <= 0) {
    throw new Error(
      `SkelForm animation ${animation.id} must have a positive fps value.`,
    );
  }

  const sourceBoneIds = new Set(source.bones.map((bone) => bone.id));
  const tracksByBone = new Map<BoneId, MutableTransformTrack>();
  let lastFrame = -1;

  for (const keyframe of animation.keyframes) {
    if (!Number.isInteger(keyframe.frame) || keyframe.frame < 0) {
      throw new Error(
        `SkelForm animation ${animation.id} has invalid keyframe frame ${keyframe.frame}.`,
      );
    }
    if (!sourceBoneIds.has(keyframe.bone_id)) {
      throw new Error(
        `SkelForm animation ${animation.id} references missing bone ${keyframe.bone_id}.`,
      );
    }
    if (
      keyframe.handle_preset !== undefined &&
      keyframe.handle_preset !== "Linear"
    ) {
      throw new Error(
        `SkelForm animation ${animation.id} uses ${keyframe.handle_preset} interpolation; only Linear is supported by the first import discriminator.`,
      );
    }

    const value = keyframe.value;
    if (value === undefined || !Number.isFinite(value)) {
      throw new Error(
        `SkelForm animation ${animation.id} transform keyframe is missing a finite numeric value.`,
      );
    }

    const boneId = sourceBoneId(keyframe.bone_id);
    const track =
      tracksByBone.get(boneId) ??
      (() => {
        const created: MutableTransformTrack = { boneId };
        tracksByBone.set(boneId, created);
        return created;
      })();

    getTrackChannel(track, keyframe.element).push({
      timeMs: (keyframe.frame * 1000) / animation.fps,
      value: sourceChannelValueToNormalized(keyframe.element, value),
    });

    lastFrame = Math.max(lastFrame, keyframe.frame);
  }

  const tracks = source.bones
    .map((bone) => tracksByBone.get(sourceBoneId(bone.id)))
    .filter((track): track is MutableTransformTrack => track !== undefined)
    .map(sortTrackChannels);

  return {
    id: String(animation.id),
    name: animation.name,
    durationMs:
      lastFrame < 0 ? 0 : ((lastFrame + 1) * 1000) / animation.fps,
    // SkelForm takes looping as a playback option; it is not stored on Animation.
    loop: false,
    tracks,
  };
}

export class SkelFormAdapter
  implements SkeletonSourceAdapter<SkelFormSource>
{
  readonly format = "skelform";

  import(source: SkelFormSource): SkeletonDefinition {
    ensureFirstDiscriminatorScope(source);

    return {
      bones: source.bones.map((bone) => ({
        id: sourceBoneId(bone.id),
        name: bone.name,
        parentId: bone.parent_id === -1 ? null : sourceBoneId(bone.parent_id),
        bind: {
          x: requireFinite(bone.init_pos.x, `bone ${bone.id} init x`),
          y: sourceYToNormalized(
            requireFinite(bone.init_pos.y, `bone ${bone.id} init y`),
          ),
          rotation: sourceRotationToNormalized(
            requireFinite(bone.init_rot, `bone ${bone.id} init rotation`),
          ),
          scaleX: requireFinite(
            bone.init_scale.x,
            `bone ${bone.id} init scale x`,
          ),
          scaleY: requireFinite(
            bone.init_scale.y,
            `bone ${bone.id} init scale y`,
          ),
        },
      })),
      attachments: convertAttachments(source),
      animations: source.animations.map((animation) =>
        convertAnimation(animation, source),
      ),
    };
  }
}
