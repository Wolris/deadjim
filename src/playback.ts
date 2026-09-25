import type {
  AnimationClip,
  AttachmentSelections,
  SkeletonPose,
} from "./model.js";
import { evaluateClipPose } from "./pose.js";
import type { ValidatedSkeleton } from "./skeleton.js";

export interface ClipPlaybackState {
  readonly clip: AnimationClip;
  readonly elapsedMs: number;
}

function requireNonNegativeFinite(value: number, label: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite non-negative number.`);
  }
  return value;
}

export function resolveClipTime(
  clip: AnimationClip,
  elapsedMs: number,
): number {
  const durationMs = requireNonNegativeFinite(
    clip.durationMs,
    `Animation clip ${clip.id} durationMs`,
  );
  const elapsed = requireNonNegativeFinite(elapsedMs, "Playback elapsedMs");

  if (durationMs === 0) return 0;
  if (clip.loop) return elapsed % durationMs;
  return Math.min(elapsed, durationMs);
}

export function createClipPlayback(
  clip: AnimationClip,
): ClipPlaybackState {
  resolveClipTime(clip, 0);

  return {
    clip,
    elapsedMs: 0,
  };
}

export function advanceClipPlayback(
  state: ClipPlaybackState,
  deltaMs: number,
): ClipPlaybackState {
  const delta = requireNonNegativeFinite(deltaMs, "Playback deltaMs");
  const elapsedMs = state.elapsedMs + delta;

  resolveClipTime(state.clip, elapsedMs);

  return {
    clip: state.clip,
    elapsedMs,
  };
}

export function sampleClipPlaybackTime(
  state: ClipPlaybackState,
): number {
  return resolveClipTime(state.clip, state.elapsedMs);
}

export function evaluateClipPlaybackPose(
  skeleton: ValidatedSkeleton,
  state: ClipPlaybackState,
  attachmentSelections: AttachmentSelections = new Map(),
): SkeletonPose {
  return evaluateClipPose(
    skeleton,
    state.clip,
    sampleClipPlaybackTime(state),
    attachmentSelections,
  );
}
