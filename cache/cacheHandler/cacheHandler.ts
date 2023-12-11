// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { getOpenbloxConfig } from "../../config"
import { FindSettings } from "../cache.utils"
import { map } from "p-iteration"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { ApiName } from "../../apis/apis.types"
import type { CacheAdapterConfig, CacheMetadata } from "../cacheAdapters/cacheAdapters.types"
import type { CacheAdapterGetResponse } from "../../http/httpHandler/httpHandler.types"
import type { AnyObject } from "../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const getFromMultipleAdapters = async (adapters: CacheAdapterConfig[], key: string) => {
  let allData = (await map(adapters, async (adapter) => ({ hello: true }))).filter(adapter => !!adapter) as any as { rawBody?: string, data?: string, dataAndRawBody?: string, timestamp: number }[]

  if (!allData.length) return

  (allData[1] as any).hello = false

  allData.sort((a, b) => a.timestamp - b.timestamp)

  console.log(allData)
}

export const cacheHandler = ({ cacheAdapters }: { cacheAdapters: CacheAdapterConfig[] }) => {
  const openbloxConfig = getOpenbloxConfig()

  return {
    get: async <ResponseBody>(
      key: string, cacheSettingsOverrides: { [adapterAlias: string]: AnyObject | "!" | undefined } | undefined,
      apiName: ApiName, methodName: string
    ): Promise<CacheAdapterGetResponse<ResponseBody>> => {
      //let [ cachedData, adapterAlias ]: any[] = [ "CACHE DISABLED" ]
      try {
        
        // Gets an array of adapters that are currently enabled for this wrapper method.
        const enabledCacheAdapters = cacheAdapters.filter(adapter => {
          return !!(cacheSettingsOverrides?.[adapter.alias] || FindSettings(
            adapter.included, apiName, methodName
          ))
        })
        if (!enabledCacheAdapters.length) return {
          cacheMetadata: {
            key, type: "DISABLED", apiName, methodName,
            env: { allSettingsOverrides: cacheSettingsOverrides, allAdapters: cacheAdapters }
          }
        }
        
        const cachedData = enabledCacheAdapters.length == 1 ?
          await enabledCacheAdapters[0].get(key)
        :
          await getFromMultipleAdapters(enabledCacheAdapters, key)

        const rawBody = cachedData?.dataAndRawBody ?? cachedData?.rawBody, data = cachedData?.dataAndRawBody ?? cachedData?.data

        return {
          rawBodyAndData: { data, rawBody: rawBody as ResponseBody },
          cacheMetadata: {
            key, type: cachedData ? "HIT" : "MISS", apiName, methodName,
            env: { allSettingsOverrides: cacheSettingsOverrides, allAdapters: cacheAdapters },
            result: data || rawBody ? { data, rawBody } : undefined,
            timestamp: cachedData?.timestamp
          }
        }

        // loops through all adapters and attempts to fetch cached data from one that is enabled for the current api wrapper method
        /*for (let i = 0; i < cacheAdapters.length; i++) {
          const adapter = cacheAdapters[i]
          adapterAlias = adapter.alias
          cachedData = await adapter.get(key)
          if (cachedData) break
        }
        if (cachedData == "CACHE DISABLED") return {
          cacheMetadata: {
            key, type: "DISABLED", apiName, methodName,
            env: { allSettingsOverrides: cacheSettingsOverrides, allAdapters: cacheAdapters }
          }
        }
    
        // parses cached data
        let [ rawBody, data ]: (undefined | AnyObject | string)[] = [ undefined, undefined ]
        const dataAndRawBody = cachedData?.dataAndRawBody
        if (dataAndRawBody) [ rawBody, data ] = [ dataAndRawBody, dataAndRawBody ]
        else {
          rawBody = cachedData?.rawBody
          data = cachedData?.data
        }
    
        return {
          rawBodyAndData: { data: data as AnyObject, rawBody: rawBody as ResponseBody },
          cacheMetadata: {
            key, type: cachedData ? "HIT" : "MISS", adapterUsedAlias: adapterAlias, apiName, methodName,
            env: { allSettingsOverrides: cacheSettingsOverrides, allAdapters: cacheAdapters },
            result: { data, rawBody }
          }
        }*/
    
      } catch (e) {
        console.log(e)
        return {
          cacheMetadata: {
            key, type: "MISS", apiName, methodName,
            env: { allSettingsOverrides: cacheSettingsOverrides, allAdapters: cacheAdapters }
          }
        }
      }
    },


    set: async <RawBody, Data>(rawBody: RawBody, data: Data | undefined, cacheMetadata: CacheMetadata) => {
      const timestamp = Date.now()

      let [ serData, serRawBody ]: any[] = []
      const formattedDataIsCached = openbloxConfig?.caching?.formattedDataIsCached
      if (formattedDataIsCached && typeof(data) == "function") data = (data as (() => Data))();
  
      [ serData, serRawBody ] = [ formattedDataIsCached ? JSON.stringify(data) : undefined, JSON.stringify(rawBody) ]
      const serDataEqualsSerRawBody = serData == serRawBody
      
      const dataToCache = {
        data: !serDataEqualsSerRawBody ? data : undefined,
        rawBody: !serDataEqualsSerRawBody ? rawBody : undefined,
        dataAndRawBody: serDataEqualsSerRawBody ? data : undefined,
        timestamp
      }
      
      const [ apiName, methodName, allSettingsOverrides, allAdapters, key ] = [
        cacheMetadata.apiName, cacheMetadata.methodName, cacheMetadata.env.allSettingsOverrides, cacheMetadata.env.allAdapters, cacheMetadata.key
      ]
      await Promise.all(cacheAdapters.map(async (adapter, i) => {
        const adapterAlias = Object.keys(allAdapters ?? {})[i]
        const settings = allSettingsOverrides?.[adapterAlias] || FindSettings(
          adapter.included, apiName, methodName
        )
        if (!settings) return
        adapter.set(key, dataToCache, settings)
      }))
    }
  }

}