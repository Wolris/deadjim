import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

const packageName = packageJson.name;
const expectedRepository = "github.com/Wolris/deadjim";

const response = await fetch(
  `https://registry.npmjs.org/${encodeURIComponent(packageName)}`,
  {
    headers: {
      accept: "application/json",
      "user-agent": "dead-jim-release-readiness-check",
    },
  },
);

if (response.status === 404) {
  console.log(
    `Dead Jim npm identity: PASS (${packageName} has no registry package record)`,
  );
  process.exit(0);
}

if (!response.ok) {
  throw new Error(
    `npm registry identity check failed with HTTP ${response.status}.`,
  );
}

const metadata = await response.json();
const repository =
  typeof metadata.repository === "string"
    ? metadata.repository
    : metadata.repository?.url ?? "";

const normalizedRepository = String(repository)
  .replace(/^git\+/, "")
  .replace(/\.git$/, "");

if (!normalizedRepository.includes(expectedRepository)) {
  throw new Error(
    `npm package name ${packageName} is already registered to another project.`,
  );
}

console.log(
  `Dead Jim npm identity: PASS (${packageName} is registered to the expected repository)`,
);
