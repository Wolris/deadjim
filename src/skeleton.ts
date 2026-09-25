import type { BoneDefinition, BoneId, SkeletonDefinition } from "./model.js";

export interface ValidatedSkeleton {
  definition: SkeletonDefinition;
  bonesById: ReadonlyMap<BoneId, BoneDefinition>;
  boneOrder: readonly BoneId[];
}

export function validateSkeleton(definition: SkeletonDefinition): ValidatedSkeleton {
  const bonesById = new Map<BoneId, BoneDefinition>();

  for (const bone of definition.bones) {
    if (bonesById.has(bone.id)) {
      throw new Error(`Duplicate bone id: ${bone.id}`);
    }
    bonesById.set(bone.id, bone);
  }

  for (const bone of definition.bones) {
    if (bone.parentId !== null && !bonesById.has(bone.parentId)) {
      throw new Error(`Bone ${bone.id} references missing parent ${bone.parentId}`);
    }
  }

  for (const attachment of definition.attachments) {
    if (!bonesById.has(attachment.boneId)) {
      throw new Error(
        `Attachment ${attachment.id} references missing bone ${attachment.boneId}`,
      );
    }
  }

  const temporary = new Set<BoneId>();
  const permanent = new Set<BoneId>();
  const boneOrder: BoneId[] = [];

  const visit = (boneId: BoneId): void => {
    if (permanent.has(boneId)) return;
    if (temporary.has(boneId)) {
      throw new Error(`Bone hierarchy contains a cycle at ${boneId}`);
    }

    temporary.add(boneId);
    const bone = bonesById.get(boneId);
    if (!bone) throw new Error(`Missing bone during hierarchy traversal: ${boneId}`);

    if (bone.parentId !== null) visit(bone.parentId);

    temporary.delete(boneId);
    permanent.add(boneId);
    boneOrder.push(boneId);
  };

  for (const bone of definition.bones) visit(bone.id);

  return {
    definition,
    bonesById,
    boneOrder,
  };
}
