import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const npmExecPath = process.env.npm_execpath;
const packageCheckDir = join(repoRoot, "dist", "package-check");
const packDir = join(packageCheckDir, "pack");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
    env: process.env,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n");
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status}.\n${output}`,
    );
  }

  return result.stdout ?? "";
}

function runNpm(args, options = {}) {
  if (npmExecPath) {
    return run(process.execPath, [npmExecPath, ...args], options);
  }

  const fallbackCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  return run(fallbackCommand, args, options);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

rmSync(packageCheckDir, { recursive: true, force: true });
mkdirSync(packDir, { recursive: true });

runNpm(["run", "build:lib"]);

const packageJson = JSON.parse(
  readFileSync(join(repoRoot, "package.json"), "utf8"),
);

const packOutput = runNpm(
  ["pack", "--json", "--pack-destination", packDir],
  { capture: true },
);
const packInfo = JSON.parse(packOutput);
assert(
  Array.isArray(packInfo) && packInfo.length === 1,
  "npm pack did not return exactly one package result.",
);

const packed = packInfo[0];
assert(
  packed.name === packageJson.name,
  `Packed artifact name ${packed.name} does not match package.json ${packageJson.name}.`,
);
assert(
  packed.version === packageJson.version,
  `Packed artifact version ${packed.version} does not match package.json ${packageJson.version}.`,
);

const packedFiles = packed.files.map((entry) => entry.path).sort();
const requiredFiles = [
  "LICENSE",
  "README.md",
  "dist/lib/index.d.ts",
  "dist/lib/index.js",
  "package.json",
];

for (const required of requiredFiles) {
  assert(
    packedFiles.includes(required),
    `Packed artifact is missing required file: ${required}`,
  );
}

const allowedRootFiles = new Set(["LICENSE", "README.md", "package.json"]);
for (const path of packedFiles) {
  assert(
    allowedRootFiles.has(path) || path.startsWith("dist/lib/"),
    `Packed artifact contains unexpected repository file: ${path}`,
  );
}

const tarballPath = resolve(packDir, packed.filename);
assert(
  basename(tarballPath) === packed.filename,
  "npm pack returned an unexpected tarball filename.",
);

const consumerDir = mkdtempSync(join(tmpdir(), "dead-jim-consumer-"));
try {
  writeFileSync(
    join(consumerDir, "package.json"),
    JSON.stringify(
      {
        name: "dead-jim-package-smoke",
        private: true,
        type: "module",
      },
      null,
      2,
    ) + "\n",
  );

  runNpm(
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--package-lock=false",
      tarballPath,
      "phaser@4.2.1",
    ],
    { cwd: consumerDir },
  );

  const runtimeSmoke = `
import {
  IDENTITY_TRANSFORM,
  SkelFormAdapter,
  blendSkeletonPoses,
  createClipPlayback,
  validateSkeleton,
} from "dead-jim";

const required = {
  IDENTITY_TRANSFORM,
  SkelFormAdapter,
  blendSkeletonPoses,
  createClipPlayback,
  validateSkeleton,
};

for (const [name, value] of Object.entries(required)) {
  if (value === undefined) {
    throw new Error(\`Missing package export: \${name}\`);
  }
}

if (IDENTITY_TRANSFORM.scaleX !== 1 || IDENTITY_TRANSFORM.scaleY !== 1) {
  throw new Error("Unexpected packaged identity transform.");
}

console.log("Dead Jim packed runtime import: PASS");
`;

  writeFileSync(join(consumerDir, "smoke.mjs"), runtimeSmoke);
  run(process.execPath, ["smoke.mjs"], { cwd: consumerDir });

  const typeSmoke = `
import {
  IDENTITY_TRANSFORM,
  validateSkeleton,
  type SkeletonDefinition,
  type Transform2D,
} from "dead-jim";

const bind: Transform2D = { ...IDENTITY_TRANSFORM };
const skeleton: SkeletonDefinition = {
  bones: [{ id: "root", name: "Root", parentId: null, bind }],
  attachments: [],
  animations: [],
};

validateSkeleton(skeleton);
`;

  writeFileSync(join(consumerDir, "smoke.ts"), typeSmoke);

  const typescriptCli = join(
    repoRoot,
    "node_modules",
    "typescript",
    "bin",
    "tsc",
  );

  run(
    process.execPath,
    [
      typescriptCli,
      "--noEmit",
      "--strict",
      "--skipLibCheck",
      "--target",
      "ES2022",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "smoke.ts",
    ],
    { cwd: consumerDir },
  );
} finally {
  rmSync(consumerDir, { recursive: true, force: true });
}

assert(packageJson.private !== true, "Release-prepared package must not be private.");

console.log(
  `Dead Jim packed artifact: PASS (${packed.name}@${packed.version}, ${packedFiles.length} files)`,
);
console.log(
  `Dead Jim package boundary: PASS (${packedFiles.length} packed files, no publish performed)`,
);
