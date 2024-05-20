// [ Modules ] ///////////////////////////////////////////////////////////////////
import { FetchAdapter } from "../http/httpAdapters/fetchHttpAdapter"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { HttpAdapter } from "../http/httpAdapters"
import type { CacheAdapter } from "../cache/cacheAdapters/cacheAdapters"
import { mergeDeep, removeNullUndefined } from "../utils/utils"
import { TtlCacheAdapter } from "../cache/cacheAdapters"
import { isObject } from "lodash"

export type RobloxCookie = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|${string}`

export type OpenbloxConfig = {
  cookie?: RobloxCookie,
  cloudKey?: string,
  http?: {
    adapter?: HttpAdapter,
    csrfMaxAttempts?: number
  },
  cache?: {
    [alias: string]: ReturnType<CacheAdapter<any, any>>
  }
}
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const initialCookie = process.env.ROBLOX_COOKIE

export const config: OpenbloxConfig = {
  cookie: (initialCookie && `.ROBLOSECURITY=${initialCookie}`) as any as RobloxCookie | undefined,
  cloudKey: process.env.ROBLOX_CLOUD_KEY,

  cache: { default: TtlCacheAdapter({ included: { lifetime: 300 } }) }
};
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
/**
 * Deep merge two configs.
 * @param target
 * @param ...sources
 */
function mergeDeepConfigs(target: Record<any, any>, ...sources: Record<any, any>[]) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        if (key == "cache") {
          Object.assign(target[key], source[key])
        } else {
          mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
//////////////////////////////////////////////////////////////////////////////////


export const getConfig = () => config

export const setConfig = (newConfig: OpenbloxConfig) => {
  Object.keys(config).forEach(key => delete config[key as keyof OpenbloxConfig])
  Object.assign(config, newConfig)
}

export const updateConfig = (updateConfigWith: OpenbloxConfig) => {
  mergeDeepConfigs(config, updateConfigWith)
}