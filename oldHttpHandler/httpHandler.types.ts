// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { AgnosticResponse } from "../httpAdapters"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CacheResultType } from "../../cacheAdapters/cacheAdapters.types"
import type { CredentialsOverride } from "../../config/config.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type SettingsConfig = {
  cacheSettings?: Object,
  credentialsOverride?: CredentialsOverride
}

export type SettingsConfigUnsafe = (SettingsConfig & {
  csrfData?: { token: string, attempts: number },
  body?: Object,
  formData?: Object
})

export type MethodResponse<ResponseBody extends any = {}> = Promise<{
  response?: AgnosticResponse, data: ResponseBody, body:ResponseBody, cachedResultType: CacheResultType
}>

export type ClassicApiHeaders = { headers: { Cookie: `.ROBLOSECURITY=${string}` } }
export type CloudApiHeaders =  { headers: { "x-api-key": string } }
export type CredentialsHeaders = ClassicApiHeaders & CloudApiHeaders