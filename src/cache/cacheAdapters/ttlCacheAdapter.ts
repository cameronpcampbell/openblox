import { CacheAdapter, CacheConfig } from "./cacheAdapters";

export const TtlCacheAdapter: CacheAdapter<{ lifetime: number }, {}> = (config) => ({
  name: "TtlCacheAdapter",
  config: JSON.stringify(config),

  get: (key) => {

  },

  set: (settings, key, value) => {

  }
})