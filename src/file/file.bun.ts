import { Bun } from "../bun"

export const readFile = async (path: string) => {
  return Buffer.from(await Bun.file(path).arrayBuffer())
}