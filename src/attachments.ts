import type {
  AttachmentId,
  AttachmentSelections,
  AttachmentSlotDefinition,
} from "./model.js";
import type { ValidatedSkeleton } from "./skeleton.js";

function slotsById(
  skeleton: ValidatedSkeleton,
): ReadonlyMap<string, AttachmentSlotDefinition> {
  return new Map(
    (skeleton.definition.attachmentSlots ?? []).map((slot) => [slot.id, slot]),
  );
}

export function resolveVisibleAttachments(
  skeleton: ValidatedSkeleton,
  selections: AttachmentSelections = new Map(),
): readonly AttachmentId[] {
  const slots = skeleton.definition.attachmentSlots ?? [];
  const knownSlots = slotsById(skeleton);
  const selectedBySlot = new Map<string, AttachmentId>();
  const slottedAttachments = new Set<AttachmentId>();

  for (const slot of slots) {
    for (const attachmentId of slot.attachmentIds) {
      slottedAttachments.add(attachmentId);
    }

    selectedBySlot.set(
      slot.id,
      selections.get(slot.id) ?? slot.defaultAttachmentId,
    );
  }

  for (const [slotId, attachmentId] of selections) {
    const slot = knownSlots.get(slotId);
    if (!slot) {
      throw new Error(`Attachment selection references unknown slot ${slotId}.`);
    }

    if (!slot.attachmentIds.includes(attachmentId)) {
      throw new Error(
        `Attachment ${attachmentId} is not an alternative in slot ${slotId}.`,
      );
    }
  }

  const selectedAttachments = new Set(selectedBySlot.values());

  return skeleton.definition.attachments
    .filter(
      (attachment) =>
        !slottedAttachments.has(attachment.id) ||
        selectedAttachments.has(attachment.id),
    )
    .map((attachment) => attachment.id);
}
