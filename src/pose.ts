import type {
  AnimationClip,
  AttachmentSelections,
  BoneId,
  BonePose,
  NumberKeyframe,
  SkeletonPose,
  Transform2D,
  TransformTrack,
} from "./model.js";
import { resolveVisibleAttachments } from "./attachments.js";
import type { ValidatedSkeleton } from "./skeleton.js";

/**
 * Compose a child-local TRS transform into parent world space.
 *
 * Dead Jim's normalized runtime intentionally models transform state as
 * translation + rotation + scale only. Shear/skew is outside this first
 * runtime boundary.
 */
export function composeTransform(
  parent: Readonly<Transform2D>,
  local: Readonly<Transform2D>,
): Transform2D {
  const cos = Math.cos(parent.rotation);
  const sin = Math.sin(parent.rotation);
  const scaledX = local.x * parent.scaleX;
  const scaledY = local.y * parent.scaleY;

  return {
    x: parent.x + scaledX * cos - scaledY * sin,
    y: parent.y + scaledX * sin + scaledY * cos,
    rotation: parent.rotation + local.rotation,
    scaleX: parent.scaleX * local.scaleX,
    scaleY: parent.scaleY * local.scaleY,
  };
}

export function sampleNumberKeyframes(
  keyframes: readonly NumberKeyframe[] | undefined,
  timeMs: number,
  fallback: number,
): number {
  if (!keyframes || keyframes.length === 0) return fallback;
  if (keyframes.length === 1) return keyframes[0].value;

  for (let index = 1; index < keyframes.length; index += 1) {
    if (keyframes[index].timeMs <= keyframes[index - 1].timeMs) {
      throw new Error("Keyframe times must be strictly increasing.");
    }
  }

  if (timeMs <= keyframes[0].timeMs) return keyframes[0].value;

  const last = keyframes[keyframes.length - 1];
  if (timeMs >= last.timeMs) return last.value;

  for (let index = 1; index < keyframes.length; index += 1) {
    const next = keyframes[index];
    if (timeMs <= next.timeMs) {
      const previous = keyframes[index - 1];
      const alpha = (timeMs - previous.timeMs) / (next.timeMs - previous.timeMs);
      return previous.value + (next.value - previous.value) * alpha;
    }
  }

  return last.value;
}

export function sampleTransformTrack(
  bind: Readonly<Transform2D>,
  track: TransformTrack | undefined,
  timeMs: number,
): Transform2D {
  return {
    x: sampleNumberKeyframes(track?.x, timeMs, bind.x),
    y: sampleNumberKeyframes(track?.y, timeMs, bind.y),
    rotation: sampleNumberKeyframes(track?.rotation, timeMs, bind.rotation),
    scaleX: sampleNumberKeyframes(track?.scaleX, timeMs, bind.scaleX),
    scaleY: sampleNumberKeyframes(track?.scaleY, timeMs, bind.scaleY),
  };
}

export function evaluateClipPose(
  skeleton: ValidatedSkeleton,
  clip: AnimationClip | null,
  timeMs: number,
  attachmentSelections: AttachmentSelections = new Map(),
): SkeletonPose {
  const tracksByBone = new Map<BoneId, TransformTrack>();

  if (clip) {
    for (const track of clip.tracks) {
      if (!skeleton.bonesById.has(track.boneId)) {
        throw new Error(
          `Animation track references missing bone ${track.boneId}`,
        );
      }
      if (tracksByBone.has(track.boneId)) {
        throw new Error(
          `Animation clip contains duplicate transform tracks for bone ${track.boneId}`,
        );
      }
      tracksByBone.set(track.boneId, track);
    }
  }

  const poses = new Map<BoneId, BonePose>();

  for (const boneId of skeleton.boneOrder) {
    const bone = skeleton.bonesById.get(boneId);
    if (!bone) {
      throw new Error(`Missing bone during pose evaluation: ${boneId}`);
    }

    const local = sampleTransformTrack(
      bone.bind,
      tracksByBone.get(boneId),
      timeMs,
    );

    const parentWorld =
      bone.parentId === null ? null : poses.get(bone.parentId)?.world;

    if (bone.parentId !== null && !parentWorld) {
      throw new Error(
        `Missing evaluated parent ${bone.parentId} for bone ${bone.id}`,
      );
    }

    const world = parentWorld ? composeTransform(parentWorld, local) : { ...local };

    poses.set(boneId, {
      boneId,
      local,
      world,
    });
  }

  return {
    bones: poses,
    visibleAttachments: resolveVisibleAttachments(
      skeleton,
      attachmentSelections,
    ),
  };
}
