# Engineering History

Completed engineering and release milestones move here so `ACTIVE_TODO.md` remains a small current-state owner.

## Semantic SVG rig discriminator — DONE

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

## Genuine SkelForm editor proof — SUPERSEDED

The prior lock required a genuine SkelForm v0.7.2 editor-produced `.skf`.

During real asset preparation, a concrete required workflow gap was established before completing that proof: the production direction requires reusable semantic SVG source assets and metadata-driven color/material changes, while the SkelForm export path packages textures as raster atlas images.

The already-released SkelForm adapter remains supported. The editor proof is no longer the active adoption gate.

## Real SkelForm atlas packaging — DONE

PR #19 closed the first adoption blocker.

Evidence:

- merged commit: `5b7d1e4622d54df5d054b49af304e2616cc2628e`;
- merged-`main` validation run 104: PASS;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed package boundary remains 23 files;
- genuine SkelForm `atlases[]` / `styles[].textures[]` metadata is supported without changing the normalized skeleton model;
- ADR-0003 records the accepted packaging boundary.

## Product-focus correction — DONE

DragonBones/LoongBones evaluation was removed from the active roadmap. Source-adapter expansion remains evidence-driven.

## Release automation decision — DONE

Publication remains manual for now. Revisit after a second manual pre-release or when release cadence makes the manual path materially repetitive. If automation is later justified, prefer npm Trusted Publishing with GitHub Actions OIDC and preserve explicit maintainer approval.

## First public pre-release — DONE

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
