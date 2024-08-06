import type { ObjectEither, ObjectPrettify, ObjectPrettifyDeep } from "typeforge"
/*import * as _ImportedClassicApis from "./classic"
import * as _ImportedCloudApis from "./cloud"

type _ClassicApis = typeof _ImportedClassicApis
type _CloudApis = typeof _ImportedCloudApis

type PrettifyApiGroup<ApiGroup> = {
  -readonly [ApiName in keyof ApiGroup]: {
    -readonly [MethodName in keyof ApiGroup[ApiName]]: ApiGroup[ApiName][MethodName]
  }
}


export type ClassicApis = PrettifyApiGroup<_ClassicApis>
export type CloudApis = PrettifyApiGroup<_CloudApis>
export type AllApis = ObjectPrettify<ClassicApis & CloudApis>*/


export type ObjectRemoveReadOnly<Obj extends Record<any, any>> = {
  -readonly [Key in keyof Obj]: Obj[Key]
} & {}

export type LongRunningOperation<Path extends string, Response extends Record<any, any>> = ObjectEither<{
  path: Path,
  done: true,
  response: {
    [Key in keyof Response]: Response[Key]
  }
}, {
  path: Path,
  done: false
}>



type CreateFooBar<Condition extends boolean> = Condition extends true ? { hello: "world" } : { foo: "bar" }

type FooBarA = CreateFooBar<true>

type FooBarB = CreateFooBar<true>

type Test<Condition extends boolean> = CreateFooBar<Condition> extends infer T extends Record<any, any> ? {
  [Key in keyof T]: CreateFooBar<Condition>[Key]
} : never