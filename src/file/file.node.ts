import * as fs from "fs"

export const readFile = async (path: string) => {
  return fs.readFileSync(path)
}