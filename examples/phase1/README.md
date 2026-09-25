# Phase 1 browser demo

This browser sandbox proves the completed Phase 1 runtime path with the public Dead Jim APIs:

```text
SkelForm-shaped fixture
  -> SkelFormAdapter
  -> validateSkeleton
  -> clip playback / looping
  -> attachment selection
  -> pose evaluation
  -> two-pose blend
  -> Phaser4RendererAdapter
```

## Run locally

From the repository root:

```bash
npm install
npm run demo:dev
```

Open the local URL printed by Vite.

## PASS

1. The cyan arm continuously animates around the center marker.
2. Moving the blend slider changes the motion continuously without stopping playback.
3. Clicking **Use magenta arm** swaps the rendered attachment while animation continues.
4. Clicking the button again restores the cyan attachment.

A production build is also part of `npm run validate` and can be run directly with:

```bash
npm run demo:build
```

The build output is written to `dist/phase1-demo/`.
