declare const Bun: {
  file: (path: string | URL, options?: BlobPropertyBag) => {
    arrayBuffer: () => Promise<Buffer>
  }
}

export const readFile = async (path: string) => {
  return Buffer.from(await Bun.file(path).arrayBuffer())
}