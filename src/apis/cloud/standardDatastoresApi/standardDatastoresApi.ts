// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse } from "../../../apis/apis.utils"
import { calculateContentMD5, cloneAndMutateObject } from "../../../utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { AnyObject, Identifier, PrettifyKeyof } from "../../../utils/utils.types"
import type { ApiMethodResponse } from "../../apis.types"

import type { FormattedListStandardDatastoreData, FormattedListStandardDatastoreEntryVersionsData, FormattedSetStandardDatastoreEntryData, FormattedStandardDatastoreKeysData, IncrementStandardDatastoreEntryConfig, ListStandardDatastoreEntryVersionsConfig, RawListStandardDatastoreData, RawListStandardDatastoreEntryVersionsData, RawSetStandardDatastoreEntryData, RawStandardDatastoreKeysData, SetStandardDatastoreEntryConfig, StandardDatastoreEntryData } from "./standardDatastoresApi.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://apis.roblox.com/datastores"
const apiName = "StandardDatastoresApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = [ "setStandardDatastoreEntry", "deleteStandardDatastoreEntry", "incrementStandardDatastoreEntry" ]


/**
 * Returns a list of data stores belonging to an experience.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param prefix Provide to return only data stores with this prefix.
 * @param limit The maximum number of items to return. Each call only reads one partition so it can return fewer than the given value when running out of objectives on one partition.
 * @param cursor Provide to request the next set of data.
 * 
 * @example const { data:datastores } = await StandardDatastoresApi.listStandardDatastores(5097539509)
 * @exampleData [ { name: "InventoryStore", createdTime: 2023-09-16T11:03:03.868Z } ]
 * @exampleRawBody { datastores: [ { name: "InventoryStore", createdTime: "2023-09-16T11:03:03.868331Z" } ], nextPageCursor: "" }
 */
export async function listStandardDatastores<Prefix extends string|undefined>(
  this: ThisAllOverrides, universeId: Identifier, prefix?: Prefix, limit?: number, cursor?: string
): ApiMethodResponse<RawListStandardDatastoreData<Prefix>, FormattedListStandardDatastoreData<Prefix>, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<RawListStandardDatastoreData<Prefix>>(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores`, {
        searchParams: { prefix, limit, cursor },
        apiName, methodName: "listStandardDatastores", overrides
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawListStandardDatastoreData<Prefix>["datastores"], FormattedListStandardDatastoreData<Prefix>
    >(rawBody.datastores, obj => {
      obj.forEach(store => store.createdTime = new Date(store.createdTime))
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cursors: { next: rawBody.nextPageCursor }, cacheMetadata })
  })
}


/**
 * Returns a list of entry keys within a data store.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param scope The value is global by default.
 * @param allScopes Set to true to return keys from all scopes.
 * @param prefix Provide to return only keys with this prefix.
 * @param limit The maximum number of items to return. Each call only reads one partition so it can return fewer than the given value when running out of objectives on one partition.
 * @param cursor Provide to request the next set of data.
 * 
 * @example const { data:keys } = await StandardDatastoresApi.standardDatastoreKeys(5097539509, "InventoryStore")
 * @exampleData [ "user/45348281" ]
 * @exampleRawBody { keys: [ { key: "user/45348281" } ], nextPageCursor: "eyJ2ZXJzaW9uIjoxLCJjdXJzb3IiOiIxMyMifQ==" }
 */
export async function standardDatastoreKeys<Prefix extends string|undefined>(
  this: ThisAllOverrides, universeId: Identifier, datastoreName: string, scope?: string,
  allScopes?: boolean, prefix?: Prefix, limit?: number, cursor?: string
): ApiMethodResponse<RawStandardDatastoreKeysData<Prefix>, FormattedStandardDatastoreKeysData<Prefix>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<RawStandardDatastoreKeysData<Prefix>>(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores/datastore/entries`, {
        searchParams: { datastoreName, scope, allScopes, prefix, limit, cursor },
        apiName, methodName: "standardDatastoreKeys", overrides
      }
    )

    const getFormattedData = (): FormattedStandardDatastoreKeysData<Prefix> => rawBody.keys.map(key => key.key)

    return buildResponse({ rawBody, data: getFormattedData, response, cursors: { next: rawBody.nextPageCursor }, cacheMetadata })
  })
}


/**
 * Returns the value and metadata associated with an entry.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param scope The value is global by default.
 * 
 * @example
 * type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
   const { data:entryInfo } = await StandardDatastoresApi.standardDatastoreEntry<InventorySchema>(5097539509, "InventoryStore",  "user/45348281")
 * @exampleData { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 * @exampleRawBody { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 */ 
export async function standardDatastoreEntry<Schema>(
  this: ThisAllOverrides, universeId: Identifier, datastoreName: string, entryKey: string, scope?: string
): ApiMethodResponse<PrettifyKeyof<Schema>, StandardDatastoreEntryData<Schema>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<PrettifyKeyof<Schema>>(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`, {
        searchParams: { datastoreName, entryKey, scope },
        apiName, methodName: "standardDatastoreEntry", overrides
      }
    )
    
    const getFormattedData = (): StandardDatastoreEntryData<Schema> => {
      const headers = response?.headers

      const [ entryCreatedTime, entryVersionCreatedTime, entryAttributes, entryUserIds, contentMD5  ] = [
        headers?.get("roblox-entry-created-time"), headers?.get("roblox-entry-version-created-time"),
        headers?.get("roblox-entry-attributes"),  headers?.get("roblox-entry-userids"),
        headers?.get("content-md5")
      ]

      return {
        entry: rawBody as Schema extends Object ? PrettifyKeyof<Schema> : Schema,
        checksumsMatch: calculateContentMD5(JSON.stringify(rawBody)) == contentMD5,
        metadata: {
          contentMD5: contentMD5 as string,
          entryVersion: headers?.get("roblox-entry-version") as string,
          entryCreatedTime: (entryCreatedTime && new Date (entryCreatedTime as string)) as Date,
          entryVersionCreatedTime: (entryVersionCreatedTime && new Date (entryVersionCreatedTime as string)) as Date,
          entryAttributes: (entryAttributes && JSON.parse(entryAttributes)) as { [Key: string]: string },
          entryUserIds: (entryUserIds && JSON.parse(entryUserIds)) as number[]
        }
      }
    }

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}


/**
 * Sets the value, metadata and user IDs associated with an entry.
 * @endpoint POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param config Extra configuration settings.
 * @param config.matchVersion Provide to update only if the current version matches this.
 * @param config.exclusiveCreate Create the entry only if it does not exist.
 * @param config.scope The value is global by default.
 * @param config.entryAttributes Attributes to be associated with new version of the entry. Serialized by JSON map objects. If not provided, existing attributes are cleared.
 * @param config.entryUserIds Comma-separated list of Roblox user IDs tagged with the entry. If not provided, existing user IDs are cleared.
 * 
 * @example
 * type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
 * const { data:response } = await StandardDatastoresApi.setStandardDatastoreEntry<InventorySchema>(
     5097539509, "InventoryStore",  "user/45348281",      // universeId, datastoreName, entryKey
     { Gold: 6 },                                         // the new data (MUST CONFORM TO `InventorySchema`)
     { entryUserIds: [ 45348281 ] }                       // extra optional settings
   )
 * @exampleData { version: "08DBB6A47FDE6132.000000000E.08DBB780C616DF0C.01", deleted: false, contentLength: 20, createdTime: 2023-09-17T13:19:51.014Z, objectCreatedTime: 2023-09-16T11:03:03.922Z }
 * @exampleRawBody { version: "08DBB6A47FDE6132.000000000E.08DBB780C616DF0C.01", deleted: false, contentLength: 20, createdTime: "2023-09-17T13:19:51.014Z", objectCreatedTime: "2023-09-16T11:03:03.922Z" }
 */ 
  export async function setStandardDatastoreEntry<Schema extends AnyObject>(
  this: ThisAllOverrides, universeId: Identifier, datastoreName: string, entryKey: string, entryValue:Schema, config?: SetStandardDatastoreEntryConfig
): ApiMethodResponse<RawSetStandardDatastoreEntryData, FormattedSetStandardDatastoreEntryData> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const [ matchVersion, exclusiveCreate, scope, entryAttributes, entryUserIds ] = [
      config?.matchVersion, config?.exclusiveCreate, config?.scope, config?.entryAttributes, config?.entryUserIds 
    ]

    const stringifiedData = JSON.stringify(entryValue)
    const { rawBody, response, cacheMetadata } = await this.http.post<RawSetStandardDatastoreEntryData>(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`, {
        searchParams: {  datastoreName, entryKey, matchVersion, exclusiveCreate, scope },
        body: stringifiedData, 
        headers: {
          "roblox-entry-attributes": entryAttributes && JSON.stringify(entryAttributes),
          "roblox-entry-userids": entryUserIds && `[${entryUserIds?.join(",")}]`,
          "content-md5": calculateContentMD5(stringifiedData)
        },
        apiName, methodName: "setStandardDatastoreEntry", overrides
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawSetStandardDatastoreEntryData, FormattedSetStandardDatastoreEntryData
    >(rawBody, obj => {
      obj.createdTime = new Date(obj.createdTime)
      obj.objectCreatedTime = new Date(obj.objectCreatedTime)
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}


/**
 * Returns the value and metadata associated with an entry.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param scope The value is global by default.
 * 
 * @example await StandardDatastoresApi.deleteStandardDatastoreEntry(5097539509, "InventoryStore",  "user/45348281")
 * @exampleData true
 * @exampleRawBody ""
 */ 
export async function deleteStandardDatastoreEntry(
  this: ThisAllOverrides, universeId: Identifier, datastoreName: string, entryKey: string, scope?: string
): ApiMethodResponse<"", true> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.delete<"">(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`, {
        searchParams: { datastoreName, entryKey, scope },
        validStatusCodes: [ 204 ],
        apiName, methodName: "deleteStandardDatastoreEntry", overrides
      }
    )

    return buildResponse({ rawBody, data: true as const, response, cacheMetadata })
  })
}


/**
 * Increments the value for an entry by a given amount, or create a new entry with that amount.
 * @endpoint POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/increment
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param incrementBy The amount by which the entry should be incremented, or the starting value if it doesn't exist.
 * @param config Extra Settings.
 * @param config.scope The value is global by default.
 * @param config.entryAttributes Attributes to be associated with new version of the entry. If not provided, existing attributes are cleared.
 * @param config.entryUserIds A comma-separated list of Roblox user IDs that the entry is tagged with. If not provided, existing user IDs are cleared.
 * 
 * @example
 * const { data:incrementedEntry } = await StandardDatastoresApi.incrementStandardDatastoreEntry(
     5097539509, "InventoryStore",  "user/45348281", // universeId, datastoreName, entryKey
     1,                                              // incrementBy
     { entryUserIds: [ 45348281 ] }                  // extra optional settings
   )
 * @exampleData 2
 * @exampleRawBody 2
 */ 
  export async function incrementStandardDatastoreEntry(
  this: ThisAllOverrides, universeId: Identifier, datastoreName: string, entryKey: string, incrementBy: number, config?: IncrementStandardDatastoreEntryConfig
): ApiMethodResponse<number> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const [ scope, entryAttributes, entryUserIds ] = [ config?.scope, config?.entryAttributes, config?.entryUserIds ]

    const { rawBody, response, cacheMetadata } = await this.http.post<number>(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/increment`, {
        searchParams: {  datastoreName, entryKey, incrementBy, scope },
        headers: {
          "roblox-entry-attributes": entryAttributes && JSON.stringify(entryAttributes),
          "roblox-entry-userids": entryUserIds && `[${entryUserIds?.join(",")}]`,
        },
        apiName, methodName: "incrementStandardDatastoreEntry", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cacheMetadata })
  })
}


/**
 * Returns the value and metadata of a specific version of an entry.
 * @endpoint POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/versions/version
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param versionId The version to inspect.
 * @param scope The value is global by default.
 * 
 * @example
 * type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
 * const { data:entryVersion } = await StandardDatastoresApi.standardDatastoreEntryVersion<InventorySchema>(
     5097539509, "InventoryStore",  "user/45348281",    // universeId, datastoreName, entryKey
     "08DBB6A47FDE6132.0000000022.08DBB88134CB805D.01"  // versionId
   )
 * @exampleData { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 * @exampleRawBody { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 */ 
export async function standardDatastoreEntryVersion<Schema>(
  this: ThisAllOverrides, universeId: Identifier, datastoreName: string, entryKey: string, versionId: string, scope?: string
): ApiMethodResponse<PrettifyKeyof<Schema>, StandardDatastoreEntryData<Schema>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<PrettifyKeyof<Schema>>(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/versions/version`, {
        searchParams: {  datastoreName, entryKey, versionId, scope },
        apiName, methodName: "standardDatastoreEntryVersion", overrides
      }
    )

    const getFormattedData = (): StandardDatastoreEntryData<Schema> => {
      const headers = response?.headers

      const [ entryCreatedTime, entryVersionCreatedTime, entryAttributes, entryUserIds, contentMD5  ] = [
        headers?.get("roblox-entry-created-time"), headers?.get("roblox-entry-version-created-time"),
        headers?.get("roblox-entry-attributes"),  headers?.get("roblox-entry-userids"),
        headers?.get("content-md5")
      ]

      return {
        entry: rawBody as Schema extends Object ? PrettifyKeyof<Schema> : Schema,
        checksumsMatch: calculateContentMD5(JSON.stringify(rawBody)) == contentMD5,
        metadata: {
          contentMD5: contentMD5 as string,
          entryVersion: headers?.get("roblox-entry-version") as string,
          entryCreatedTime: (entryCreatedTime && new Date (entryCreatedTime as string)) as Date,
          entryVersionCreatedTime: (entryVersionCreatedTime && new Date (entryVersionCreatedTime as string)) as Date,
          entryAttributes: (entryAttributes && JSON.parse(entryAttributes)) as { [Key: string]: string },
          entryUserIds: (entryUserIds && JSON.parse(entryUserIds)) as number[]
        }
      }
    }

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}


/**
 * Returns a list of data stores belonging to an experience.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/versions
 * @tags [ "Cloud Key" ]
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param config Extra settings.
 * @param config.scope The value is global by default.
 * @param config.startTime Provide to not include versions earlier than this timestamp.
 * @param config.endTime Provide to not include versions later than this timestamp.
 * @param config.sortOrder Either "Ascending" (earlier versions first) or "Descending" (later versions first).
 * @param config.limit The maximum number of items to return. Each call only reads one partition so it can return fewer than the given value when running out of objectives on one partition.
 * @param cursor Provide to request the next set of data.
 * 
 * @example
 * const { data:versions } = await StandardDatastoresApi.listStandardDatastoreEntryVersions(
     5097539509, "InventoryStore",  "user/45348281", // universeId, datastoreName, entryKey
     { sortOrder: "Ascending" },                     // extra optional settings
   )
 * @exampleData [ { version: "08DBB6A47FDE6132.0000000010.08DBB781B9579F00.01", deleted: false, contentLength: 20, createdTime: 2023-09-17T13:26:39.124Z, objectCreatedTime: 2023-09-16T11:03:03.922Z } ]
 * @exampleRawBody { versions: [ { version: "08DBB6A47FDE6132.0000000010.08DBB781B9579F00.01", deleted: false, contentLength: 20, createdTime: "2023-09-17T13:26:39.124Z", objectCreatedTime: "2023-09-16T11:03:03.922Z" } ] }
 */ 
export async function listStandardDatastoreEntryVersions(
  this: ThisAllOverrides, universeId: Identifier, datastoreName: string, entryKey: string,
  config?: ListStandardDatastoreEntryVersionsConfig, cursor?: string
): ApiMethodResponse<RawListStandardDatastoreEntryVersionsData, FormattedListStandardDatastoreEntryVersionsData, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const [ scope, startTime, endTime, sortOrder, limit ] = [ config?.scope, config?.startTime, config?.endTime, config?.sortOrder, config?.limit ]

    const { rawBody, response, cacheMetadata } = await this.http.get<RawListStandardDatastoreEntryVersionsData>(
      `${baseUrl}/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/versions`, {
        searchParams: {  datastoreName, entryKey, scope, startTime, endTime, sortOrder, limit, cursor },
        apiName, methodName: "listStandardDatastoreEntryVersions", overrides
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawListStandardDatastoreEntryVersionsData["versions"], FormattedListStandardDatastoreEntryVersionsData
    >(rawBody.versions, obj => {
      obj.forEach(versionData => {
        versionData.createdTime = new Date(versionData.createdTime)
        versionData.objectCreatedTime = new Date(versionData.objectCreatedTime)
      })
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata, cursors: { next: rawBody.nextPageCursor } })
  })
}

