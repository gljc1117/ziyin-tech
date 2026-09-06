import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
mkdirSync(".qa/checks", { recursive: true });
execFileSync(process.execPath, [
  "node_modules/typescript/bin/tsc", "--target", "ES2022", "--module", "commonjs",
  "--moduleResolution", "node", "--esModuleInterop", "--skipLibCheck", "--strict",
  "--outDir", ".qa/checks", "src/lib/demo-request.ts", "src/lib/model-manifest.ts",
  "src/lib/public-demos.ts", "src/lib/content-policy.ts",
  "src/lib/editorial-content.ts", "src/lib/news-types.ts",
], { stdio: "inherit" });
execFileSync(process.execPath, ["--test", "tests/trust.test.mjs", "tests/editorial.test.mjs"], { stdio: "inherit" });
