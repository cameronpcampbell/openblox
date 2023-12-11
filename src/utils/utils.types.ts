// [ OTHER ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Add, And, Divide, Gt, GtOrEq, IsOdd, Lt, LtOrEq, Multiply, Pow, Subtract } from "ts-arithmetic"

export type Prettify<T> = T;

export type PrettifyKeyof<T> = {
  [K in keyof T]: T[K];
} & {};



export type PrettifyUnion<T> = ArrayToUnion<UnionToArray<T>>

export type PrettifyArray<T extends any[]> = UnionToArray<ArrayToUnion<T>>

export type FirstChild<T> = T extends { [key: string]: infer U } ? U : never

export type Mutable<T> = {-readonly [K in keyof T]: Mutable<T[K]>} & {}

export type ToString<Thing extends string | number | bigint | boolean | null | undefined> = `${Thing}`

export type OptionalWww = "www." | ""
export type OptionalHttp = `https://${OptionalWww}` | `http://${OptionalWww}` | ""


export type UnionRange<Start extends number, End extends number> = Start extends End ? Start : Start | UnionRange<Add<Start, 1>, End>

export type UnionLength<T> = ArrayLength<UnionToArray<T>>

export type SecureUrl = `https://${string}`

export type Nullable<T> = { [K in keyof T]: T[K] | null };
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

export type ObjectValues<Obj extends Object> = Obj[keyof Obj]

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

export type Identifier = number | `${number}`

type StrToNumMap = {
  "0": 1,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9
}

export type ResolvedType<T> = T extends Promise <infer R> ? R : never;


// The higher the max iterations is the more precise the outcome will be although more computation will be needed.
type DoLogarithm_MaxIterations = 7

type E = 2.718281828

type DoLogarithm<
  X extends number,
  _RelDiff extends number = Divide<Subtract<X, 1>, Add<X, 1>>,
  _CurrIterCount extends number = 1,
  _CurrPow extends number = 1,
  _Result extends number = 0,
> = (
  LtOrEq<X, 0> extends 1 ? never :
  LtOrEq<_CurrIterCount, DoLogarithm_MaxIterations> extends 0 ?
    Multiply<2, _Result>
  :
    DoLogarithm<
      X, 
      _RelDiff,
      Add<_CurrIterCount, 1>,                                   // _CurrIterCount
      Add<_CurrPow, 2>,                                         // _CurrPow
      Add<_Result, Divide<Pow<_RelDiff, _CurrPow>, _CurrPow>>   // _Result
    >
)


export type Log<X extends number> = DoLogarithm<X>

export type Log10<X extends number> = Divide<Log<X>, Log<10>>


export type StringToTuple<S extends string, T extends any[] = []> = S extends `${infer Char}${infer Rest}` ? StringToTuple<Rest, [...T, Char]> : T;

export type ObjectPrettify<Obj extends Record<any, any>> = {
  [Key in keyof Obj]: Obj[Key] extends AnyObject ? ObjectPrettify<Obj[Key]> : Obj[Key];
} & {};

/*type Floor<
  X extends number,
  _XAsTuple extends any[] = StringToTuple<"HELLO">,
  _CurrIterCount extends number = 1,
  _Result extends number = 0
> = (
  
)*/

/* @ts-expect-error */
export type ToNumber<X extends number | `${number}`> = X extends number ? X : Subtract<Add<X, 1>, 1>

export type IdentifierToNumber<X extends number | `${number}`> = (
  X extends number ?
    X
  :
    /* @ts-expect-error */
    GtOrEq<X, Pow<2, 53>> extends 1 ? X : Subtract<Add<X, 1>, 1>
)






type StringifiedLength_GetLengthOfKeyOrValue<Value> = (
  Value extends string ? Add<ArrayLength<StringToTuple<Value>>, 2> // Value is string. Adds 2 to accomodate for speech marks.

  : Value extends number ? ArrayLength<StringToTuple<`${Value}`>>

  : Value extends true ? 4

  : Value extends false ? 5

  : 0
)

export type ObjectLength<T> = keyof T extends never ? 0 : keyof T extends infer Keys ? ArrayLength<UnionToArray<Keys>> : 0;

/*type PRIVATE_StringifiedLength<
  ObjOrArr extends AnyObject | Array<any>,

  _ObjOrArrIsArray extends boolean = ObjOrArr extends any[] ? true : false,

  _ObjKeys extends any[]|undefined = _ObjOrArrIsArray extends false ? UnionToArray<keyof ObjOrArr> : undefined,
  _ObjValues = _ObjOrArrIsArray extends false ? UnionToArray<ObjectValues<ObjOrArr>> : undefined,

  _CurrIter extends number = 0,
  _CurrIndex extends any = ObjOrArr[_CurrIter],
  _Length extends number = 0,

   @ts-expect-error 
  _AmountOfColons extends number = _ObjOrArrIsArray extends false ? ArrayLength<_ObjKeys> : 0,
   @ts-expect-error 
  _AmountOfCommas extends number = Subtract<_ObjOrArrIsArray extends true ? ArrayLength<ObjOrArr> : ArrayLength<_ObjKeys>, 1>,

   @ts-expect-error 
  _CurrKey extends any = _ObjKeys[_CurrIter],
   @ts-expect-error 
  _CurrValue extends any = _ObjValues[_CurrIter],
> = (

  _ObjOrArrIsArray extends false ? 

    ObjectLength<ObjOrArr> extends 0 ?
      2

    : _CurrKey extends undefined ?
      Add<Add<_Length, 2>, Add<_AmountOfColons, _AmountOfCommas>> // End of Obj has been reached.
    :
      PRIVATE_StringifiedLength<
        ObjOrArr, _ObjOrArrIsArray,
        _ObjKeys, _ObjValues,
        Add<_CurrIter, 1>,  // Increments _CurrIter by 1.
        ObjOrArr[Add<_CurrIter, 1>],
        Add<_Length, Add<
          StringifiedLength_GetLengthOfKeyOrValue<_CurrKey>,
          _CurrValue extends AnyObject ? StringifiedLength<_CurrValue> : StringifiedLength_GetLengthOfKeyOrValue<_CurrValue>
        >>, // Adds the length of the current key and value to _Length
        _AmountOfColons, _AmountOfCommas
      >

  :

    @ts-expect-error
    ArrayLength<ObjOrArr> extends 0 ? 2 // If array is empty
      
    : _CurrIndex extends undefined ?
      Add<Add<_Length, 2>, _AmountOfCommas>
    :
      PRIVATE_StringifiedLength<
        ObjOrArr, _ObjOrArrIsArray,
        _ObjKeys, _ObjValues,
        Add<_CurrIter, 1>,  // Increments _CurrIter by 1.
        ObjOrArr[Add<_CurrIter, 1>],
        Add<
          _Length,
          _CurrIndex extends Array<any> ? StringifiedLength<_CurrIndex> : StringifiedLength_GetLengthOfKeyOrValue<_CurrIndex>
        >,
        _AmountOfColons, _AmountOfCommas
      >
)

export type StringifiedLength<ObjOrArr extends AnyObject | Array<any>> = PRIVATE_StringifiedLength<ObjOrArr>

type Arr_Test1 = StringifiedLength<[ 1, 2, 3 ]>               // Should Be 7
type Arr_Test2 = StringifiedLength<[ 1, [ 5, 6, 7, 9 ], 3 ]>  // Should Be 15
type Arr_Test3 = StringifiedLength<[]>                        // Should Be 2

type Obj_Test1 = StringifiedLength<{    // Should Be 55
  targetId: 45348281,
  reason: "You smell kinda funny."
}>
type Obj_Test2 = StringifiedLength<{    // Should Be 78
  targetId: 45348281,
  reason: "You smell kinda funny.",
  data: {
    exists: true
  }
}>
type Obj_Test3 = StringifiedLength<{ }>  // Should be 2

type Mixed_Test1 = StringifiedLength<{  // Should Be 36
  targetId: 45348281,
  data: [ 1, 2, 3 ]
}>
type Mixed_Test2 = StringifiedLength<{  // Should Be 44
  targetId: 45348281,
  data: [ 1, [ 5, 6, 7, 9 ], 3 ]
}>
type Mixed_Test3 = StringifiedLength<{  // Should Be 31
  targetId: 45348281,
  data: []
}>
type Mixed_Test4 = StringifiedLength<{  // Should Be 123
  targetId: 45348281,
  reason: "Smells kinda bad (ewwww)",
  userInfo: {
    icons: [ "icon64x64.png", "icon32x32.jpeg" ]
  },
  data: []
}>
type Mixed_Test5 = StringifiedLength<{  // Should Be 26
  previousInfractions: {},
}>
type Mixed_Test6 = StringifiedLength<{  // Should Be 148
  targetId: 45348281,
  reason: "Smells kinda bad (ewwww)",
  userInfo: {
    icons: [ "icon64x64.png", "icon32x32.jpeg" ]
  },
  previousInfractions: {},
  data: []
}>*/

export type StringLength<Str extends string> = ArrayLength<StringToTuple<Str>>

export type NumberIsClamped<
  Number extends number,
  MinLength extends number,
  MaxLength extends number
> = (
  And<GtOrEq<Number, MinLength>, LtOrEq<Number, MaxLength>> extends 1 ? true : false
)