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



/*

async ({ universeId, isUniverseCreation, limit, sortOrder, cursor }) => ({
  method: "GET",
  path: `/v1/universes/${universeId}/places`,
  searchParams: { isUniverseCreation, limit, cursor, sortOrder },
  name: "universePlaces",
  prettifyFn: __name(({ data }) => data, "prettifyFn")
}) 

async ({ universeId: r, isUniverseCreation: e, limit: i, sortOrder: s, cursor: t }) => ({ method: "GET", path: `/v1/universes/${r}/places`, searchParams: { isUniverseCreation: e, limit: i, cursor: t, sortOrder: s }, name: "universePlaces", prettifyFn: a(({ data: p }) => p, "prettifyFn") }) 

*/