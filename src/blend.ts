import type {
  BoneId,
  BonePose,
  SkeletonPose,
  Transform2D,
} from "./model.js";

function requireBlendWeight(weight: number): number {
  if (!Number.isFinite(weight) || weight < 0 || weight > 1) {
    throw new Error("Blend weight must be a finite number between 0 and 1.");
  }
  return weight;
}

function lerp(from: number, to: number, weight: number): number {
  return from + (to - from) * weight;
}

function blendTransform(
  first: Readonly<Transform2D>,
  second: Readonly<Transform2D>,
  weight: number,
): Transform2D {
  return {
    x: lerp(first.x, second.x, weight),
    y: lerp(first.y, second.y, weight),
    rotation: lerp(first.rotation, second.rotation, weight),
    scaleX: lerp(first.scaleX, second.scaleX, weight),
    scaleY: lerp(first.scaleY, second.scaleY, weight),
  };
}

function assertCompatibleVisibility(
  first: SkeletonPose,
  second: SkeletonPose,
): void {
  if (
    first.visibleAttachments.length !== second.visibleAttachments.length ||
    first.visibleAttachments.some(
      (attachmentId, index) =>
        attachmentId !== second.visibleAttachments[index],
    )
  ) {
    throw new Error(
      "Intermediate blended poses require identical visibleAttachments.",
    );
  }
}

function assertCompatibleBones(
  first: SkeletonPose,
  second: SkeletonPose,
): void {
  if (first.bones.size !== second.bones.size) {
    throw new Error("Blended poses must contain the same bone ids.");
  }

  for (const boneId of first.bones.keys()) {
    if (!second.bones.has(boneId)) {
      throw new Error("Blended poses must contain the same bone ids.");
    }
  }
}

/**
 * Blend exactly two evaluated poses with a normalized linear weight.
 *
 * Attachment visibility is not blended. Endpoint weights preserve exact pose
 * identity; intermediate weights require both poses to agree on visibility.
 */
export function blendSkeletonPoses(
  first: SkeletonPose,
  second: SkeletonPose,
  weight: number,
): SkeletonPose {
  const normalizedWeight = requireBlendWeight(weight);

  if (normalizedWeight === 0) return first;
  if (normalizedWeight === 1) return second;

  assertCompatibleBones(first, second);
  assertCompatibleVisibility(first, second);

  const bones = new Map<BoneId, BonePose>();

  for (const [boneId, firstBone] of first.bones) {
    const secondBone = second.bones.get(boneId);
    if (!secondBone) {
      throw new Error("Blended poses must contain the same bone ids.");
    }

    if (
      firstBone.boneId !== boneId ||
      secondBone.boneId !== boneId
    ) {
      throw new Error(
        `Blended pose bone map entry ${boneId} does not match its boneId.`,
      );
    }

    bones.set(boneId, {
      boneId,
      local: blendTransform(
        firstBone.local,
        secondBone.local,
        normalizedWeight,
      ),
      world: blendTransform(
        firstBone.world,
        secondBone.world,
        normalizedWeight,
      ),
    });
  }

  return {
    bones,
    visibleAttachments: first.visibleAttachments,
  };
}
