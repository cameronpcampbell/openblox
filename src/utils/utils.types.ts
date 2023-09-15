// [ OTHER ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
export type Prettify<T> = T;

export type PrettifyKeyof<T> = {
  [K in keyof T]: T[K];
} & {};

export type PrettifyUnion<T> = ArrayToUnion<UnionToArray<T>>

export type FirstChild<T> = T extends { [key: string]: infer U } ? U : never

export type Mutable<T> = {-readonly [K in keyof T]: Mutable<T[K]>} & {}

export type ToString<Thing extends string | number | bigint | boolean | null | undefined> = `${Thing}`

export type OptionalWww = "www." | ""
export type OptionalHttp = `https://${OptionalWww}` | `http://${OptionalWww}` | ""
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ARRAYS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
export type NonEmptyArray<T> = [T, ...T[]]

export type ArrayDup<T, N extends number, A extends any[] = []> = Mutable<
  A['length'] extends N
  ? A
  : ArrayDup<T, N, [T, ...A]>
>

export type ArrayLength<T extends any[]> = T extends { length: infer L } ? L : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>
type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A]

export type ArrayToUnion<T extends any[]> = T[number]


type LowercaseFirstLetter<S extends string> =
S extends `${infer First}${infer Rest}`
? `${Lowercase<First>}${Rest}`
: S;
export type KeysToCamelCase<Obj> = PrettifyKeyof<{
  [Key in keyof Obj as LowercaseFirstLetter<string &Key>]: (
    Obj[Key] extends Array<any> ? Obj[Key]
    : Obj[Key] extends {} ? KeysToCamelCase< Obj[Key]>
    : Obj[Key]
  )
}>
export type ArrWithObjectsToCamelCase<Arr extends unknown[]> =  { [Key in keyof Arr]: PrettifyKeyof<KeysToCamelCase<Arr[Key]>> }

export type ArrayElemsOptional<T> = { [K in keyof T]: T[K] | undefined }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ OBJECTS ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
type KeyValueMap<T extends { key: string; value: any }[]> = {
  [K in T[number]['key']]: Extract<T[number], { key: K }>['value']
} & {}

type KeysValueObject<Keys extends any[], Values extends any[]> = {
  [Index in keyof Keys]: {
    key: Keys[Index];
    /* @ts-expect-error */
    value: Values[Index];
  };
}

export type KeyValuePairsMap<Keys  extends any[], Values  extends any[]> = KeyValueMap<KeysValueObject<Keys, Values>> & {}

export type ObjectValues<Obj extends Object> = PrettifyKeyof<Obj[keyof Obj]>

export type KeysOfTypeFunction<Obj extends Object> = {
  [Key in keyof Obj]: Obj[Key] extends (...args: any[]) => any ? Key : never;
}[keyof Obj];

export type ValuesFromArrayToUnion<Obj extends { [key: string | number | symbol]: any[] } > = {
  [Key in keyof Obj]: ArrayToUnion<Obj[Key]>
} & {}

export type Unionise2ObjectsValues<Obj1 extends Object, Obj2 extends { [Key in keyof Partial<Obj1>]: any }> = {
  [Key in keyof Obj1]: Obj1[Key] | Obj2[Key]
} & {}

export type MakeKeyOptional<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | undefined : T[P];
}

export type AnyObject = { [key: string|number|symbol]: any }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type Only<T, U> = {
  [P in keyof T]: P extends keyof U ? Only<T[P], U[P]> : T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T extends Object, U extends Object> = PrettifyKeyof<Only<T, U> | Only<U, T>>

/*type OptionalKeys<Obj extends Object> = {
  [Key in keyof Obj]: undefined extends Obj[Key] ? Key : never;
}[keyof Obj]
type RequiredKeys<Obj extends Object> = {
  [Key in keyof Obj]: undefined extends Obj[Key] ? never : Key;
}*/



export type ResolvedType<T> = T extends Promise <infer R> ? R : never;