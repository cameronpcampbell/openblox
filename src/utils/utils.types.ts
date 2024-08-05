import type { ArrayNonEmpty, ArrayToUnion, ObjectPrettify, UnionToArray } from "typeforge"

export type Identifier = number | `${number}`

export type SearchParams = Record<string, any>
export type ParsedSearchParams = Record<string, string>

export type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" 

export type SecureUrl = `https://${string}`

export type SortOrder = "Asc" | "Desc"

export type StringIsLiteral<Str extends string> =  Str extends `${infer U}` ? string extends U ? false : true : false;

export type NumberIsLiteral<Num extends number> = (
  number extends Num ? false
  : [Num] extends [never] ? false
  : [Num] extends [string | number] ? true
  : false
)



export type LowercaseFirstLetter<S extends string> =
S extends `${infer First}${infer Rest}`
? `${Lowercase<First>}${Rest}`
: S;

export type KeysToCamelCase<Obj> = ObjectPrettify<{
  [Key in keyof Obj as LowercaseFirstLetter<string &Key>]: (
    Obj[Key] extends Array<any> ? Obj[Key]
    : Obj[Key] extends Date ? Date
    : Obj[Key] extends Record<any, any> ? KeysToCamelCase< Obj[Key]>
    : Obj[Key]
  )
} & {}>

export type ArrWithObjectsToCamelCase<Arr extends unknown[]> =  { [Key in keyof Arr]: ObjectPrettify<KeysToCamelCase<Arr[Key]>> }


export type IsLiteral<T extends unknown> =
  T extends number ? NumberIsLiteral<T>
  : T extends string ? StringIsLiteral<T>
  : false

export type ArrayNonEmptyIfConst<T extends any> = IsLiteral<T> extends true ? ArrayNonEmpty<T> : T[]
