import type { SkeletonDefinition } from "../model.js";
import type { SkeletonSourceAdapter } from "../source.js";

/**
 * Deliberately minimal boundary for the first discriminator.
 *
 * The source shape is kept opaque here so SkelForm-specific field names do not
 * leak into Dead Jim's normalized runtime model before the exact file/version
 * contract is pinned by source evidence and fixtures.
 */
export type SkelFormSource = Readonly<Record<string, unknown>>;

export class SkelFormAdapter
  implements SkeletonSourceAdapter<SkelFormSource>
{
  readonly format = "skelform";

  import(_source: SkelFormSource): SkeletonDefinition {
    throw new Error("SkelForm import mapping is not implemented yet.");
  }
}
