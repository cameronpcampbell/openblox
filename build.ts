import * as esbuild from 'esbuild';

const settings = {
  entryPoints: ["src/**/*"],
  outdir: "dist",
  //minify: true,
  //keepNames: true,
  format: 'cjs',
  platform: 'node',
  target: ['node18', 'node16', 'node20', 'node22']
} satisfies esbuild.BuildOptions

await esbuild.build(settings);
