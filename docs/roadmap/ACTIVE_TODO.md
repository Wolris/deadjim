# ACTIVE TODO

## Current phase

**Post-Phase 1 — Public Alpha / SVG-native Authoring Adoption**

Dead Jim `0.1.0-alpha.1` was published on September 25, 2026.

## CURRENT EXECUTION LOCK

**AWAITING MANUAL EVIDENCE — Discriminate Premation as the first external SVG-native authoring candidate.**

The semantic-SVG runtime contract has passed. Do not redraw the representative production character yet.

The next question is whether an existing no-cost external editor can author the skeleton and animation data efficiently while Dead Jim keeps SVG appearance semantics independent.

Premation is the first candidate because current public documentation/source evidence shows:

- local/offline-capable Windows support;
- SVG import;
- hierarchical bone rigging;
- keyframeable bone rotation, x/y, scaleX/scaleY;
- timeline/graph editing;
- inspectable local `.motion` project bundles containing JSON scene/animation/timeline chunks;
- AGPL-3.0 licensing, allowing the editor to remain an external project while Dead Jim stays MIT.

### Maintainer discriminator

Use the already-proven simple semantic-SVG part set. This is not a production-art task.

Required evidence:

1. import enough SVG parts to represent **chest -> upper arm -> forearm -> hand -> held item** plus one head/hair part;
2. create the parent/child skeleton in Premation without merging the SVG source parts into one raster image;
3. establish practical pivots for shoulder, elbow, and wrist;
4. create **Idle** using at least one authored transform and **Action** using obvious arm motion;
5. prove rotation plus at least one of translation or scale can be keyframed in the editor;
6. save the local `.motion` project and provide the project bundle for inspection;
7. preserve the original semantic SVG masters as the appearance source of truth; Premation may use imported/parsed copies for authoring preview;
8. confirm the workflow does not require a paid account, hosted service, or commercial runtime license.

Repository acceptance after the project bundle is available:

- inspect only the project data needed to identify skeleton hierarchy, part/layer identity, pivots/bind transforms, and animation tracks;
- determine whether a small Premation source adapter can map those fields into Dead Jim's normalized runtime without copying AGPL implementation code;
- prove original SVG masters can remain independently addressable for semantic theme/material resolution;
- record any concrete gap before implementing around it.

### Known risk to verify

Premation parses simple imported SVGs into editable scene shapes. Dead Jim must not depend on Premation preserving arbitrary custom SVG attributes. The discriminator succeeds if original SVG masters can remain separate appearance assets while Premation provides stable rig/animation identity that can be mapped back to them.

## NEXT

If the Premation discriminator passes, implement the smallest source adapter/project importer needed for the proof and run the semantic-SVG asset through Dead Jim -> Phaser 4.

If it fails, record the exact blocker and discriminate the next bounded external candidate before promoting custom editor development.

Only after the SVG-native authoring path is proven should work resume on the representative production-style character set.

Once the representative asset proof is solid and blocking gaps are closed, promote the **public promotional/adoption website** milestone from `BACKLOG.md`.

## Explicitly deferred

- custom Dead Jim visual rigging/animation editor until bounded external-tool discrimination establishes that it is necessary;
- automated npm/GitHub publication until repetition justifies it;
- weighted mesh deformation;
- IK and physics in the Dead Jim runtime;
- advanced constraints/interpolation beyond concrete source evidence;
- additional renderer adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.

## History

Completed and superseded milestones are recorded in `docs/roadmap/HISTORY.md`.
