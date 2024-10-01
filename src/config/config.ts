// [ Modules ] ///////////////////////////////////////////////////////////////////
import { isObject } from "lodash"

import { mergeDeep } from "../utils/utils"
import { TtlCacheAdapter } from "../cache/cacheAdapters"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { HttpAdapter } from "../http/httpAdapters"
import type { CacheAdapter } from "../cache/cacheAdapters/cacheAdapters"
import type { RobloxCookie } from "../http/http.utils"

export type OpenbloxConfig = {
  cookie?: RobloxCookie,
  cloudKey?: string,

  http?: {
    adapter?: HttpAdapter,
    csrfMaxAttempts?: number,

    polling?: {
      disabled?: boolean,
      iterations?: number,
      multiplyer?: number,
      retryOffset?: number,
      debugMessages?: boolean
    },
  },

  cache?: ReturnType<CacheAdapter<any, any>>[]
}
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const initialCookie = process.env.ROBLOX_COOKIE

export const config: OpenbloxConfig = {
  cookie: (initialCookie && `.ROBLOSECURITY=${initialCookie}; RBXEventTrackerV2=CreateDate=1/1/1 1:1:1 PM&rbxid=1&browserid=1;`) as any as RobloxCookie | undefined,
  cloudKey: process.env.ROBLOX_CLOUD_KEY,

  cache: [ TtlCacheAdapter({ included: { lifetime: 300 } }) ]
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


export const setConfig = (newConfig: OpenbloxConfig) => {
  const newConfigCookie = newConfig?.cookie
  if (newConfigCookie) newConfig.cookie = `.ROBLOSECURITY=${newConfigCookie}; RBXEventTrackerV2=CreateDate=1/1/1 1:1:1 PM&rbxid=1&browserid=1;` as any

  Object.keys(config).forEach(key => delete config[key as keyof OpenbloxConfig])
  Object.assign(config, newConfig)
}

export const updateConfig = (updateConfigWith: OpenbloxConfig) => {
  const updateConfigWithCookie = updateConfigWith?.cookie
  if (updateConfigWithCookie) updateConfigWith.cookie = `.ROBLOSECURITY=${updateConfigWithCookie}; RBXEventTrackerV2=CreateDate=1/1/1 1:1:1 PM&rbxid=1&browserid=1;` as any

  mergeDeepConfigs(config, updateConfigWith)
}