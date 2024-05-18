const runtime = process.versions.bun ? "bun" : "node"

type Lib = {
  readFile: (path: string) => Promise<Buffer>
}

const lib: Lib = runtime == "bun" ? require("./file.bun") : require("./file.nde")

export const readFile = lib.readFile