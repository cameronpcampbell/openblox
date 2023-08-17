import * as AllApis from "../../apis"

import type { ArrayToUnion, KeysOfTypeFunction, PrettifyKeyof } from "../utilityTypes"

type NonMethodFunctions = "getCallerFunctionName" | "findSettings" | "apiCacheMiddleware"

export type ApiMethodNames<ApiClass extends Object> = PrettifyKeyof<
  Exclude<
    KeysOfTypeFunction<ApiClass> & {},
    NonMethodFunctions
    >
> & {}

export type ApiMethods<ApiClass extends Object> = PrettifyKeyof<
  Omit<
    /* @ts-expect-error */
    { [Key in ApiMethodNames<ApiClass>]: ApiClass[Key] },
    NonMethodFunctions
  >
>
