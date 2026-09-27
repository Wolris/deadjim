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

## Recently closed

### Semantic SVG rig discriminator — DONE

Maintainer-reported browser validation: **7/7 PASS**.

Evidence:

- semantic SVG parts remained separate and hierarchically transformable;
- chest/limb overlap worked without forced closed-shape seam outlines;
- theme colors changed the same SVG assets;
- Steel/Gold/Diamond-style material changes reused the same held-item SVG;
- hair swapped without rebuilding the rig;
- Idle/Action transforms were driven by portable rig/animation data;
- a customized vector SVG export was produced successfully after changing theme, material, and hair;
- ADR-0004 records the resulting source/appearance boundary.

### Genuine SkelForm editor proof — SUPERSEDED

The prior lock required a genuine SkelForm v0.7.2 editor-produced `.skf`.

During real asset preparation, a concrete required workflow gap was established before completing that proof: the production direction requires reusable semantic SVG source assets and metadata-driven color/material changes, while the SkelForm export path packages textures as raster atlas images.

The already-released SkelForm adapter remains supported. The editor proof is no longer the active adoption gate.

### Real SkelForm atlas packaging — DONE

PR #19 closed the first adoption blocker.

Evidence:

- merged commit: `5b7d1e4622d54df5d054b49af304e2616cc2628e`;
- merged-`main` validation run 104: PASS;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed package boundary remains 23 files;
- genuine SkelForm `atlases[]` / `styles[].textures[]` metadata is supported without changing the normalized skeleton model;
- ADR-0003 records the accepted packaging boundary.

### Product-focus correction — DONE

DragonBones/LoongBones evaluation was removed from the active roadmap. Source-adapter expansion remains evidence-driven.

### Release automation decision — DONE

Publication remains manual for now. Revisit after a second manual pre-release or when release cadence makes the manual path materially repetitive. If automation is later justified, prefer npm Trusted Publishing with GitHub Actions OIDC and preserve explicit maintainer approval.

### First public pre-release — DONE

`dead-jim@0.1.0-alpha.1` is publicly released.

Evidence:

- final release commit: `35a86f21339e4b5267d052859d7935e3bd888c2d`;
- post-release reconciliation merged at `a65da361cb95e7d68f7858bcdeb52a5a8ceb5629`;
- release-automation decision merged at `f680438f96ec6e8683ab068e5b7b6fcc4a9daa0b`;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed artifact: `dead-jim@0.1.0-alpha.1`, 23 files;
- npm publication: live;
- Git tag: `v0.1.0-alpha.1`;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**.

## Explicitly deferred

- custom Dead Jim visual rigging/animation editor until bounded external-tool discrimination establishes that it is necessary;
- automated npm/GitHub publication until repetition justifies it;
- weighted mesh deformation;
- IK and physics in the Dead Jim runtime;
- advanced constraints/interpolation beyond concrete source evidence;
- additional renderer adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.
