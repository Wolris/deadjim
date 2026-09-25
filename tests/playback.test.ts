import { describe, expect, it } from "vitest";

import type { AnimationClip } from "../src/model.js";
import {
  advanceClipPlayback,
  createClipPlayback,
  resolveClipTime,
  sampleClipPlaybackTime,
} from "../src/playback.js";

function clip(
  durationMs: number,
  loop = false,
): AnimationClip {
  return {
    id: "clip",
    name: "Clip",
    durationMs,
    loop,
    tracks: [],
  };
}

describe("clip playback", () => {
  it("starts at the beginning of the clip", () => {
    const state = createClipPlayback(clip(1000));

    expect(state.elapsedMs).toBe(0);
    expect(sampleClipPlaybackTime(state)).toBe(0);
  });

  it("advances deterministically by elapsed milliseconds", () => {
    const initial = createClipPlayback(clip(1000));
    const first = advanceClipPlayback(initial, 250);
    const second = advanceClipPlayback(first, 375);

    expect(initial.elapsedMs).toBe(0);
    expect(first.elapsedMs).toBe(250);
    expect(second.elapsedMs).toBe(625);
    expect(sampleClipPlaybackTime(second)).toBe(625);
  });

  it("clamps non-looping clips at their endpoint", () => {
    const state = advanceClipPlayback(
      createClipPlayback(clip(1000)),
      1250,
    );

    expect(state.elapsedMs).toBe(1250);
    expect(sampleClipPlaybackTime(state)).toBe(1000);
    expect(resolveClipTime(state.clip, 5000)).toBe(1000);
  });

  it("wraps looping clips by clip duration", () => {
    const state = advanceClipPlayback(
      createClipPlayback(clip(1000, true)),
      2750,
    );

    expect(sampleClipPlaybackTime(state)).toBe(750);
    expect(resolveClipTime(state.clip, 1000)).toBe(0);
  });

  it("keeps zero-duration clips stable", () => {
    const nonLooping = advanceClipPlayback(
      createClipPlayback(clip(0)),
      500,
    );
    const looping = advanceClipPlayback(
      createClipPlayback(clip(0, true)),
      500,
    );

    expect(sampleClipPlaybackTime(nonLooping)).toBe(0);
    expect(sampleClipPlaybackTime(looping)).toBe(0);
  });

  it("rejects invalid duration, elapsed time, and advancement", () => {
    expect(() => createClipPlayback(clip(-1))).toThrow(
      "durationMs must be a finite non-negative number",
    );
    expect(() => resolveClipTime(clip(1000), -1)).toThrow(
      "Playback elapsedMs must be a finite non-negative number",
    );
    expect(() =>
      advanceClipPlayback(createClipPlayback(clip(1000)), -1),
    ).toThrow(
      "Playback deltaMs must be a finite non-negative number",
    );
  });
});
