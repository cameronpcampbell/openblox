import * as esbuild from 'esbuild';
import esbuildPluginTsc from "esbuild-plugin-tsc"

const settings = {
  entryPoints: ["src/**/*"],
  outdir: "dist",
  //minify: true,
  //keepNames: true,
  format: 'cjs',
  platform: 'node',
  target: ['node16'], 
  plugins: [
    esbuildPluginTsc({
      force: true
    }),
  ],
} satisfies esbuild.BuildOptions

await esbuild.build(settings);
