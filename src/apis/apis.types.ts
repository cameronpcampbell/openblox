// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import * as _AllClassicApis from "./classic"
import * as _AllCloudApis from "./cloud"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AnyObject, KeysOfTypeFunction, ObjectValues, PrettifyKeyof, PrettifyUnion, UnionToArray } from "../utils/utils.types"
import { AgnosticResponse } from "../http/httpAdapters"
import { CacheMetadata } from "../cache/cacheAdapters/cacheAdapters.types"
import { Add } from "ts-arithmetic"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type AllClassicApis = typeof _AllClassicApis
export type AllCloudApis = typeof _AllCloudApis
export type AllApis = AllClassicApis & AllCloudApis

export type ApiName = keyof AllClassicApis | keyof AllCloudApis

export type ApiMethods = {
  [ApiKey in ApiName]: {
    [MethodKey in KeysOfTypeFunction<AllApis[ApiKey]>]: AllApis[ApiKey][MethodKey]
  }
}

export type ApiMethodNames = {
  [ApiKey in ApiName]: keyof ApiMethods[ApiKey] & {}
}

export type SortOrder = "Asc" | "Desc"

export type DataWithCursors<Data extends AnyObject> = {
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: Data
}

export type ReturnedCursors = { previous: string | null, next: string | null }

type ApiMethodResponseBase<RawBody, Data> = PrettifyKeyof<{
  rawBody: RawBody,
  data: Data,
  response?: AgnosticResponse,
  cacheMetadata: CacheMetadata<RawBody, Data>
}>

export type ApiMethodResponse_Cursors = {
  previous?: string|number,
  next?: string|number
}

export type ApiMethodResponse<
  RawData = unknown, FormattedData = RawData, Pagination extends "PAGINATED" | false = false
> = Promise<
  PrettifyKeyof<
    Pagination extends "PAGINATED" ? ApiMethodResponseBase<RawData, FormattedData> & {
      cursors: ApiMethodResponse_Cursors
    }

    : ApiMethodResponseBase<RawData, FormattedData>
  >
>
