import { ObjectEither, ObjectPrettify } from "typeforge"
import * as _ImportedClassicApis from "./classic"
import * as _ImportedCloudApis from "./cloud"

type _ClassicApis = typeof _ImportedClassicApis
type _CloudApis = typeof _ImportedCloudApis

type PrettifyApiGroup<ApiGroup> = {
  -readonly [ApiName in keyof ApiGroup]: {
    -readonly [MethodName in keyof ApiGroup[ApiName]]: ApiGroup[ApiName][MethodName]
  }
}

export type ObjectRemoveReadOnly<Obj extends Record<any, any>> = {
  -readonly [Key in keyof Obj]: Obj[Key]
} & {}

export type ClassicApis = PrettifyApiGroup<_ClassicApis>
export type CloudApis = PrettifyApiGroup<_CloudApis>
export type AllApis = ObjectPrettify<ClassicApis & CloudApis>


export type LongRunningOperation<Path extends string, Response extends Record<any, any>> = ObjectPrettify<ObjectEither<{
  path: Path,
  done: true,
  response: ObjectPrettify<Response>
}, {
  path: Path,
  done: false
}>>