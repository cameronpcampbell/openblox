// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { MD5, AES } from "crypto-js"
import { Redis } from "ioredis"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { CacheAdapterConfig, IncludedConfig } from "../cacheAdapters.types"

type IncludedSettings = { lifetime: number | "inf" }

export type RedisConnectionUrl = `redis://${string}` | `rediss://${string}`

type RedisCacheAdapterConfig = {
  connectionUrl: RedisConnectionUrl,
  keysPrefix?: string,
  included?: IncludedConfig<IncludedSettings & {}> & {}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RedisCacheAdapter = ({ connectionUrl, keysPrefix = "openblox", included = "!" }: RedisCacheAdapterConfig): CacheAdapterConfig<IncludedSettings> => {
  return {
    get: async ({ key, keyData }) => {
      try {
        console.log("Getting")
        
        const fullKey = `${keysPrefix ? `${keysPrefix}:` : ""}${key}${keyData ? `:${MD5(JSON.stringify(keyData)).toString()}` : ""}`

        const redis = new Redis(connectionUrl)
  
        const data = await redis.get(fullKey)
        redis.disconnect()
    
        return data ? JSON.parse(data) : undefined
      } catch (e) { console.log("Failed To Get", e) }
    },

    set: async ({ key, keyData, value }, cacheSettings) => {
      try {
        console.log("Setting")

        const lifetime = cacheSettings.lifetime
        const fullKey = `${keysPrefix ? `${keysPrefix}:` : ""}${key}${keyData ? `:${MD5(JSON.stringify(keyData)).toString()}` : ""}`

        const redis = new Redis(connectionUrl)
        lifetime == "inf" ?
          await redis.set(fullKey, JSON.stringify(value))
        :
          await redis.setex(fullKey, lifetime, JSON.stringify(value))
        redis.disconnect()
      } catch (e) { console.log("Failed To Set", e) }
    },

    included: included
  }
}