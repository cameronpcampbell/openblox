import * as esbuild from 'esbuild';
import { globby } from 'globby';
import { rm } from "node:fs/promises";

await rm('dist', { recursive: true, force: true })
const entryPoints = await globby(['src/**/*.{js,ts}']);

const settings = {
  entryPoints,
  outdir: "dist",
  //minify: true,
  //keepNames: true,
  format: 'cjs',
  platform: 'node',
  target: ['node18', 'node16', 'node20', 'node22']
} satisfies esbuild.BuildOptions

await esbuild.build(settings);
