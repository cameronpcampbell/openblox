const runtime = process.versions.bun ? "bun" : "node"

type Lib = {
  md5Checksum: (content: string) => string
}

const lib: Lib = runtime == "bun" ? require("./crypto.bun") : require("./crypto.nde")

export const md5Checksum = lib.md5Checksum