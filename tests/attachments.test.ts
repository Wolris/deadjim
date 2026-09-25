import { describe, expect, it } from "vitest";

import type {
  AnimationClip,
  SkeletonDefinition,
  Transform2D,
} from "../src/model.js";
import {
  advanceClipPlayback,
  createClipPlayback,
  evaluateClipPlaybackPose,
} from "../src/playback.js";
import { evaluateClipPose } from "../src/pose.js";
import { validateSkeleton } from "../src/skeleton.js";

const identity: Transform2D = {
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
};

function definition(): SkeletonDefinition {
  return {
    bones: [
      {
        id: "root",
        name: "Root",
        parentId: null,
        bind: identity,
      },
    ],
    attachments: [
      {
        id: "body",
        name: "Body",
        boneId: "root",
        assetId: "body.png",
        pivotX: 0,
        pivotY: 0,
        zIndex: 0,
      },
      {
        id: "hat-red",
        name: "Red Hat",
        boneId: "root",
        assetId: "hat-red.png",
        pivotX: 0,
        pivotY: 0,
        zIndex: 1,
      },
      {
        id: "hat-blue",
        name: "Blue Hat",
        boneId: "root",
        assetId: "hat-blue.png",
        pivotX: 0,
        pivotY: 0,
        zIndex: 1,
      },
    ],
    attachmentSlots: [
      {
        id: "hat",
        attachmentIds: ["hat-red", "hat-blue"],
        defaultAttachmentId: "hat-red",
      },
    ],
    animations: [],
  };
}

describe("attachment slots", () => {
  it("uses the deterministic default alternative when no swap is active", () => {
    const skeleton = validateSkeleton(definition());
    const pose = evaluateClipPose(skeleton, null, 0);

    expect(pose.visibleAttachments).toEqual(["body", "hat-red"]);
  });

  it("switches only the visible alternative when a valid selection is active", () => {
    const skeleton = validateSkeleton(definition());
    const defaultPose = evaluateClipPose(skeleton, null, 0);
    const swappedPose = evaluateClipPose(
      skeleton,
      null,
      0,
      new Map([["hat", "hat-blue"]]),
    );

    expect(swappedPose.visibleAttachments).toEqual(["body", "hat-blue"]);
    expect(swappedPose.bones).toEqual(defaultPose.bones);
  });

  it("rejects unknown slots and attachments outside the selected slot", () => {
    const skeleton = validateSkeleton(definition());

    expect(() =>
      evaluateClipPose(
        skeleton,
        null,
        0,
        new Map([["missing", "hat-blue"]]),
      ),
    ).toThrow("Attachment selection references unknown slot missing.");

    expect(() =>
      evaluateClipPose(
        skeleton,
        null,
        0,
        new Map([["hat", "body"]]),
      ),
    ).toThrow("Attachment body is not an alternative in slot hat.");
  });

  it("preserves playback time and bone transforms across a swap", () => {
    const clip: AnimationClip = {
      id: "move",
      name: "Move",
      durationMs: 1000,
      loop: true,
      tracks: [
        {
          boneId: "root",
          x: [
            { timeMs: 0, value: 0 },
            { timeMs: 1000, value: 10 },
          ],
        },
      ],
    };
    const skeleton = validateSkeleton({
      ...definition(),
      animations: [clip],
    });
    const playback = advanceClipPlayback(
      createClipPlayback(clip),
      500,
    );

    const defaultPose = evaluateClipPlaybackPose(
      skeleton,
      playback,
    );
    const swappedPose = evaluateClipPlaybackPose(
      skeleton,
      playback,
      new Map([["hat", "hat-blue"]]),
    );

    expect(playback.elapsedMs).toBe(500);
    expect(defaultPose.bones.get("root")?.world.x).toBeCloseTo(5);
    expect(swappedPose.bones).toEqual(defaultPose.bones);
    expect(swappedPose.visibleAttachments).toEqual(["body", "hat-blue"]);
  });

  it("rejects ambiguous slot definitions during skeleton validation", () => {
    const ambiguous = definition();
    ambiguous.attachmentSlots = [
      {
        id: "hat",
        attachmentIds: ["hat-red", "hat-blue"],
        defaultAttachmentId: "hat-red",
      },
      {
        id: "accent",
        attachmentIds: ["hat-blue", "body"],
        defaultAttachmentId: "body",
      },
    ];

    expect(() => validateSkeleton(ambiguous)).toThrow(
      "Attachment hat-blue belongs to multiple slots: hat, accent.",
    );
  });
});
