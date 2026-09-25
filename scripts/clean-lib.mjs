import { rmSync } from "node:fs";

rmSync(new URL("../dist/lib/", import.meta.url), {
  recursive: true,
  force: true,
});
