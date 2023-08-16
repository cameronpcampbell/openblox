import { IncludedConfig } from "../apiCacheHelpers"
import { SHA256 } from "crypto-js"
import { Redis } from "ioredis"

type IncludedSettings = { lifetime: number | "inf" }

export type RedisConnectionUrl = `redis://${string}` | `rediss://${string}`

type RedisApiCacheAdapterConfig = {
  connectionUrl: RedisConnectionUrl,
  included: IncludedConfig<IncludedSettings & {}> & {},
  keyPrefix?: string
}

export const RedisApiCacheAdapter = ({ connectionUrl, included, keyPrefix }: RedisApiCacheAdapterConfig) => {
  return {
    get: async ({ key, keyData }: { key: string, keyData?: Object }) => {
      console.log("Getting")
      const fullKey = `${keyPrefix ? `${keyPrefix}:` : ""}${key}${keyData ? `:${SHA256(JSON.stringify(keyData)).toString()}` : ""}`

      const redis = new Redis(connectionUrl)

      const data = await redis.get(fullKey)
      redis.disconnect()
  
      return data ? JSON.parse(data) : undefined
    },

    set: async (
      { key, keyData, value }: { key: string, keyData?: Object, value: Object },
      cacheSettings: IncludedSettings
    ) => {
      console.log("Setting")
      const lifetime = cacheSettings.lifetime
      const fullKey = `${keyPrefix ? `${keyPrefix}:` : ""}${key}${keyData ? `:${SHA256(JSON.stringify(keyData)).toString()}` : ""}`

      const redis = new Redis(connectionUrl)
      lifetime == "inf" ?
        await redis.set(fullKey, JSON.stringify(value))
      :
        await redis.setex(fullKey, lifetime, JSON.stringify(value))
      redis.disconnect()
    },

    arguments: { connectionUrl, included, keyPrefix },
  }
}