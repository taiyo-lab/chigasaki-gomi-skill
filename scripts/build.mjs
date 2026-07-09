import { build } from "esbuild";
import { mkdirSync, cpSync, existsSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";

const outdir = "dist";

if (existsSync(outdir)) {
  rmSync(outdir, { recursive: true, force: true });
}
mkdirSync(outdir, { recursive: true });

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  outfile: `${outdir}/index.js`,
  minify: false,
  sourcemap: false,
  loader: { ".json": "json" },
});

const zipPath = `${outdir}/function.zip`;
execSync(`cd ${outdir} && zip -q -r function.zip index.js`, { stdio: "inherit" });

console.log(`Built ${zipPath}`);
