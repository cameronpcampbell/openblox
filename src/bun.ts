type SupportedCryptoAlgorithms =
		| "blake2b256"
		| "blake2b512"
		| "md4"
		| "md5"
		| "ripemd160"
		| "sha1"
		| "sha224"
		| "sha256"
		| "sha384"
		| "sha512"
		| "sha512-224"
		| "sha512-256"
		| "sha3-224"
		| "sha3-256"
		| "sha3-384"
		| "sha3-512"
		| "shake128"
		| "shake256";

type BlobOrStringOrBuffer =
    | string
    | NodeJS.TypedArray
    | ArrayBufferLike
    | Blob

  type BinaryToTextEncoding = "base64" | "base64url" | "hex" | "binary";
  type CharacterEncoding = "utf8" | "utf-8" | "utf16le" | "utf-16le" | "latin1";
  type LegacyCharacterEncoding = "ascii" | "binary" | "ucs2" | "ucs-2";
  type Encoding = BinaryToTextEncoding | CharacterEncoding | LegacyCharacterEncoding;

export declare const Bun: {
  file: (path: string | URL, options?: BlobPropertyBag) => {
    arrayBuffer: () => Promise<Buffer>
  },

  CryptoHasher: {
    new(algorithm: SupportedCryptoAlgorithms): {
      update: (input: BlobOrStringOrBuffer, inputEncoding?: Encoding) => {
        digest: (encoding: "base64" | "hex") => string
      }
    }
  }
}