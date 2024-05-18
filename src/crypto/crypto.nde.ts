import { createHash } from "node:crypto"

export const md5Checksum = (content: string) => createHash("md5").update(content).digest("base64")