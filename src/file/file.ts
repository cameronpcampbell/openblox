const runtime = process.versions.bun ? "bun" : "node"

type Lib = {
  readFile: (path: string) => Promise<Buffer>
}

const lib: Lib = runtime == "bun" ? require("./bunFile") : require("./nodeFile")

export const readFile = lib.readFile