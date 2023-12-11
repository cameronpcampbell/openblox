// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { Redis } from "ioredis"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CacheAdapter } from "../cacheAdapters.types"

type IncludedSettings = { lifetime: number | "inf" }

export type RedisConnectionUrl = `redis://${string}` | `rediss://${string}`

type RedisCacheAdapterConfig = {
  connectionUrl: RedisConnectionUrl,
  keysPrefix?: string,
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RedisCacheAdapter: CacheAdapter<IncludedSettings, RedisCacheAdapterConfig> = (
  { connectionUrl, included = "!", alias }
) => {
  return {
    get: async (key) => {
      try {
        console.log("Getting") // temporary for debug purposes

        const redis = new Redis(connectionUrl)
  
        const data = await redis.get(key)
        redis.disconnect()
        
        return data ? JSON.parse(data) : undefined
      } catch (e) { console.log("Failed To Get", e) }
    },

    set: async (key, value, cacheSettings) => {
      try {
        console.log("Setting") // temporary for debug purposes

        const lifetime = cacheSettings.lifetime

        const redis = new Redis(connectionUrl)
        lifetime == "inf" ?
          await redis.set(key, JSON.stringify(value.rawBody ?? value.dataAndRawBody))
        :
          await redis.setex(key, lifetime, JSON.stringify({
            rawBody: value.rawBody ?? value.dataAndRawBody, timestamp: value.timestamp
          }))
        redis.disconnect()
      } catch (e) { console.log("Failed To Set", e) }
    },

    included, alias
  }
}