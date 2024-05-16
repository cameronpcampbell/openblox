import { ObjectPrettify } from "typeforge"
import * as _ImportedClassicApis from "./classic"
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
export type AllApis = ObjectPrettify<ClassicApis & CloudApis>