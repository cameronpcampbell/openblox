import "dotenv/config"

// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { HttpHandler } from "../http/httpHandler"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AnyObject, PrettifyKeyof } from "../utils/utils.types";
import type { Config, ConfigSettings, RobloSecurityCookie, ThisAllOverrides } from "./config.types"
import { mutateObject } from "../utils";
import { createHash } from "crypto";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
async function findSettings(this: Config, apiName: string, methodName: string) {
  //return await FindSettings(this.cacheAdapter?.included, apiName as ApiName, methodName)
}

function createConfig(config: PrettifyKeyof<ConfigSettings>): Config {
  const cacheAdapters = config?.caching?.adapters
  const cookie = (config?.cookie ?? process?.env?.ROBLOX_COOKIE) as RobloSecurityCookie | undefined

  const http = HttpHandler({
    cookie: cookie ? `.ROBLOSECURITY=${cookie}` : undefined,
    cloudKey: config?.cloudKey ?? process?.env?.ROBLOX_CLOUD_KEY,
    caching: config?.caching,
    maxCsrfAttempts: config.httpRequests?.maxCsrfAttempts,
    hardwareBackedAuthentication: config.httpRequests?.hardwareBackedAuthentication
  })

  /*const cache = cacheAdapters?.length ? cacheHandler({
    cacheAdapters: config?.caching?.adapters as CacheAdapterConfig[]
  }) : undefined*/

  return mutateObject(config, obj => {
    obj.http = http
    //obj.cache = cache
    obj.findSettings = findSettings
    obj._hash = createHash("md5").update(JSON.stringify(obj)).digest("hex")
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const defaultCookie: any = process?.env?.ROBLOX_COOKIE
var config: Config = {
  http: HttpHandler({
    cookie: defaultCookie && `.ROBLOSECURITY=${defaultCookie}`,
    cloudKey: process?.env?.ROBLOX_CLOUD_KEY
  }),

  findSettings: findSettings,
}
config._hash = createHash("md5").update(JSON.stringify(config)).digest("hex")

export const setOpenbloxConfig = (configSettings: PrettifyKeyof<ConfigSettings>) => {
  config = createConfig(configSettings)
}

export const getOpenbloxConfig = () => config

export const getCacheSettingsOverride = (overrides: ThisAllOverrides): {
  cacheSettingsOverride: { [adapterAlias: string]: AnyObject | "!" | undefined }
} | undefined => {
  return overrides?.cacheSettings
}
export const getCredentialsOverride = (overrides: ThisAllOverrides) => (
  overrides ? ({ cloudKey: overrides?.cloudKey, cookie: overrides?.cookie, oauthToken: overrides?.oauthToken }) : undefined
)

export const buildCacheKey = (
  prefix: string|undefined, url: string, reqBodyHash: string | undefined,
  openbloxConfigHash: string | undefined, overridesHash: string | undefined
) => {
  return [
    prefix,
    url,
    reqBodyHash ?? "",
    openbloxConfigHash ?? "",
    overridesHash ?? undefined
  ].filter(element => element == "" || !!element).join(":")
}