import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

function readJson(relativePath) {
  return JSON.parse(
    readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"),
  );
}

function readText(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const packageJson = readJson("package.json");
const changelog = readText("CHANGELOG.md");
const releasePolicy = readText("docs/RELEASE_POLICY.md");

assert(packageJson.name === "dead-jim", "Unexpected npm package name.");
assert(
  packageJson.version === "0.1.0-alpha.1",
  "Unexpected pre-release candidate version.",
);
assert(
  packageJson.private !== true,
  "Authorized release candidate must not remain private.",
);
assert(packageJson.license === "MIT", "Package license must remain MIT.");
assert(
  packageJson.repository?.url === "https://github.com/Wolris/deadjim.git",
  "Unexpected package repository URL.",
);
assert(
  packageJson.peerDependencies?.phaser === "^4.2.1",
  "Unexpected Phaser peer dependency.",
);
assert(
  packageJson.main === "./dist/lib/index.js",
  "Unexpected package main entry.",
);
assert(
  packageJson.types === "./dist/lib/index.d.ts",
  "Unexpected package declaration entry.",
);
assert(
  packageJson.exports?.["."]?.types === "./dist/lib/index.d.ts" &&
    packageJson.exports?.["."]?.import === "./dist/lib/index.js" &&
    packageJson.exports?.["."]?.default === "./dist/lib/index.js",
  "Unexpected root package exports.",
);
assert(
  JSON.stringify(packageJson.files) ===
    JSON.stringify(["dist/lib", "README.md", "LICENSE"]),
  "Unexpected package files boundary.",
);

const requiredKeywords = [
  "skelform",
  "phaser",
  "phaser4",
  "skeletal-animation",
  "2d-animation",
  "typescript",
  "game-development",
];
for (const keyword of requiredKeywords) {
  assert(
    packageJson.keywords?.includes(keyword),
    `Missing package keyword: ${keyword}`,
  );
}

assert(
  changelog.includes("## 0.1.0-alpha.1 — 2026-09-25"),
  "CHANGELOG.md does not contain the authorized release date.",
);
assert(
  releasePolicy.includes("0.1.0-alpha.1"),
  "Release policy does not reference the candidate version.",
);
assert(
  releasePolicy.includes("maintainer authorization"),
  "Release policy does not record the authorization boundary.",
);

console.log(
  "Dead Jim release candidate metadata: PASS (dead-jim@0.1.0-alpha.1, publish-ready)",
);
