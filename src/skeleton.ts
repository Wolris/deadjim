import type {
  AttachmentId,
  BoneDefinition,
  BoneId,
  SkeletonDefinition,
} from "./model.js";

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

  const attachmentIds = new Set<AttachmentId>();

  for (const attachment of definition.attachments) {
    if (attachmentIds.has(attachment.id)) {
      throw new Error(`Duplicate attachment id: ${attachment.id}`);
    }
    attachmentIds.add(attachment.id);

    if (!bonesById.has(attachment.boneId)) {
      throw new Error(
        `Attachment ${attachment.id} references missing bone ${attachment.boneId}`,
      );
    }
  }

  const slotIds = new Set<string>();
  const owningSlotByAttachment = new Map<AttachmentId, string>();

  for (const slot of definition.attachmentSlots ?? []) {
    if (slotIds.has(slot.id)) {
      throw new Error(`Duplicate attachment slot id: ${slot.id}`);
    }
    slotIds.add(slot.id);

    if (slot.attachmentIds.length < 2) {
      throw new Error(
        `Attachment slot ${slot.id} must define at least two alternatives.`,
      );
    }

    const slotAttachmentIds = new Set<AttachmentId>();

    for (const attachmentId of slot.attachmentIds) {
      if (slotAttachmentIds.has(attachmentId)) {
        throw new Error(
          `Attachment slot ${slot.id} contains duplicate attachment ${attachmentId}.`,
        );
      }
      slotAttachmentIds.add(attachmentId);

      if (!attachmentIds.has(attachmentId)) {
        throw new Error(
          `Attachment slot ${slot.id} references missing attachment ${attachmentId}.`,
        );
      }

      const previousOwner = owningSlotByAttachment.get(attachmentId);
      if (previousOwner) {
        throw new Error(
          `Attachment ${attachmentId} belongs to multiple slots: ${previousOwner}, ${slot.id}.`,
        );
      }
      owningSlotByAttachment.set(attachmentId, slot.id);
    }

    if (!slotAttachmentIds.has(slot.defaultAttachmentId)) {
      throw new Error(
        `Attachment slot ${slot.id} default ${slot.defaultAttachmentId} is not one of its alternatives.`,
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
