const getUserAgent = () => {
  try { return navigator?.userAgent }
  catch { return null }
}

const runtime = process.versions.bun ? "bun" : "node"
const userAgent = getUserAgent()

type Lib = {
  readFile: (path: string) => Promise<Buffer>
}


const lib: Lib =
  runtime == "bun" ? require("./file.bun") :
  userAgent === 'Cloudflare-Workers' ? require("./file.shell") :
  require("./file.nde")

export const readFile = lib.readFile