import type { SkeletonDefinition } from "./model.js";

export interface SkeletonSourceAdapter<TSource = unknown> {
  readonly format: string;
  import(source: TSource): SkeletonDefinition;
}
