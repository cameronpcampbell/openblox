// [ OTHER ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
export type Prettify<T> = T;

export type PrettifyKeyof<T> = {
  [K in keyof T]: T[K];
} & {};

export type FirstChild<T> = T extends { [key: string]: infer U } ? U : never

export type Mutable<T> = {-readonly [K in keyof T]: Mutable<T[K]>} & {}

export type ToString<Thing extends string | number | bigint | boolean | null | undefined> = `${Thing}`
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
