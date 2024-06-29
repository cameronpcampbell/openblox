import { Add, GtOrEq, Pow, Subtract } from "ts-arithmetic"
import { ArrayToUnion, UnionToArray } from "typeforge"

export type Identifier = number | `${number}`

export type IdentifierToNumber<X extends Identifier> = (
  X extends number ? X
  /* @ts-expect-error */
  : GtOrEq<X, Pow<2, 53>> extends 1 ? X : Subtract<Add<X, 1>, 1>
)

export type SearchParams = Record<string, any>
export type ParsedSearchParams = Record<string, string>

export type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" 

export type SecureUrl = `https://${string}`

export type SortOrder = "Asc" | "Desc"


type NumberIsLiteral<Num extends number> = (
  number extends Num ? false
  : [Num] extends [never] ? false
  : [Num] extends [string | number] ? true
  : false
)