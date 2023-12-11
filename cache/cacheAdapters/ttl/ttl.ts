// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import TTLCache from "@isaacs/ttlcache"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CacheAdapter } from "../cacheAdapters.types"

type IncludedSettings = { lifetime: number | "inf" }

type TTLCacheAdapterConfig = {
  maxItems?: number
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const TTLCacheAdapter: CacheAdapter<IncludedSettings, TTLCacheAdapterConfig> = (
  { included = "!", alias, maxItems }
) => {
  const cache = new TTLCache({ max: maxItems })
  
  return {
    get: async (key) => {
      try {
        return await cache.get(key)
      } catch (e) { console.log("Failed To Get", e) }
    },

    set: async (key, value, cacheSettings) => {
      try {
        const lifetime = cacheSettings.lifetime

        lifetime == "inf" ?
          cache.set(key, value, { ttl: Infinity })
        :
          cache.set(key, value, { ttl: lifetime * 1000 })
      } catch (e) { console.log("Failed To Set", e) }
    },

    included, alias
  }
}