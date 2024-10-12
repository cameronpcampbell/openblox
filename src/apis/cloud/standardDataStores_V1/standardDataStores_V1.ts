// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
import { md5Checksum } from "../../../crypto"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ISODateTime, Prettify } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedListStandardDatastoreData, PrettifiedListStandardDatastoreEntryVersionsData, PrettifiedSetStandardDatastoreEntryData, PrettifiedStandardDatastoreEntryData, PrettifiedStandardDatastoreKeysData, RawListStandardDatastoreData, RawListStandardDatastoreEntryVersionsData, RawSetStandardDatastoreEntryData, RawStandardDatastoreKeysData } from "./standardDataStores_V1.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "StandardDatastores_V1", baseUrl: "https://apis.roblox.com/datastores" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Returns a list of data stores belonging to an experience.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param prefix Provide to return only data stores with this prefix.
 * @param limit The maximum number of items to return. Each call only reads one partition so it can return fewer than the given value when running out of objectives on one partition.
 * @param cursor Provide to request the next set of data.
 * 
 * @example const { data:datastores } = await StandardDataStoresApi_V1.listStandardDatastores({ universeId: 5097539509 })
 * @exampleData [ { name: "InventoryStore", createdTime: 2023-09-16T11:03:03.868Z } ]
 * @exampleRawBody { datastores: [ { name: "InventoryStore", createdTime: "2023-09-16T11:03:03.868331Z" } ], nextPageCursor: "" }
 */
export const listStandardDatastores = createApiMethod(async <Prefix extends string>(
  { universeId, prefix, limit, cursor }: { universeId: Identifier, prefix?: Prefix, limit?: number, cursor?: string }
): ApiMethod<RawListStandardDatastoreData<Prefix>, PrettifiedListStandardDatastoreData<Prefix>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/standard-datastores`,
  searchParams: { prefix, limit, cursor },
  name: `listStandardDatastores`,

  formatRawDataFn: ({ datastores }) => cloneAndMutateObject(datastores, obj => obj.forEach(store => store.createdTime = new Date(store.createdTime))),

  getCursorsFn: ({ nextPageCursor }) => [ null, nextPageCursor ]
}))


/**
 * Returns a list of entry keys within a data store.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param scope The value is global by default.
 * @param allScopes Set to true to return keys from all scopes.
 * @param prefix Provide to return only keys with this prefix.
 * @param limit The maximum number of items to return. Each call only reads one partition so it can return fewer than the given value when running out of objectives on one partition.
 * @param cursor Provide to request the next set of data.
 * 
 * @example
 * const { data:keys } = await StandardDataStoresApi_V1.standardDatastoreKeys({
     universeId: 5097539509, datastoreName: "InventoryStore"
   })
 * @exampleData [ "user/45348281" ]
 * @exampleRawBody { keys: [ { key: "user/45348281" } ], nextPageCursor: "eyJ2ZXJzaW9uIjoxLCJjdXJzb3IiOiIxMyMifQ==" }
 */
export const standardDatastoreKeys = createApiMethod(async <Prefix extends string>(
  { universeId, datastoreName, scope, allScopes, limit, prefix, cursor }:
  { universeId: Identifier, datastoreName: string, scope?: string, allScopes?: boolean, limit?: number, prefix?: Prefix, cursor?: string }
): ApiMethod<RawStandardDatastoreKeysData<Prefix>, PrettifiedStandardDatastoreKeysData<Prefix>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/standard-datastores/datastore/entries`,
  searchParams: { datastoreName, scope, allScopes, prefix, limit, cursor },
  name: `standardDatastoreKeys`,

  formatRawDataFn: ({ keys }) => keys.map(key => key.key),

  getCursorsFn: (rawData) => [ null, rawData.nextPageCursor ]
}))


/**
 * Returns the value and metadata associated with an entry. Depending on the runtime, `Bun.CryptoHasher` or `node:crypto` is used to calculate the md5 checksum.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param scope The value is global by default.
 * 
 * @example
 * type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
   const { data:entryInfo } = await StandardDataStoresApi_V1.standardDatastoreEntry<InventorySchema>({
     universeId: 5097539509, datastoreName: "InventoryStore", entryKey: "user/45348281"
   })
   if (!entryInfo.checksumsMatch) console.log("checksums do not match, data may be invalid!")
   else console.log("checksums match! ->", entryInfo.entry)
 * @exampleData { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 * @exampleRawBody { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 */ 
export const standardDatastoreEntry = createApiMethod(async <Schema extends Record<any, any> | string | number = string | number>(
  { universeId, datastoreName, entryKey, scope }:
  { universeId: Identifier, datastoreName: string, entryKey: string, scope?: string }
): ApiMethod<Schema, PrettifiedStandardDatastoreEntryData<Schema>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`,
  searchParams: { datastoreName, entryKey, scope },
  name: `standardDatastoreKeys`,

  formatRawDataFn: (rawData, { headers }) => {
    const
      entryCreatedTime = headers?.get("roblox-entry-created-time"), 
      entryVersionCreatedTime = headers?.get("roblox-entry-version-created-time"),
      entryAttributes = headers?.get("roblox-entry-attributes"), entryUserIds = headers?.get("roblox-entry-userids"),
      contentMD5 = headers?.get("content-md5")

    return {
      entry: rawData as Prettify<Schema>,
      checksumsMatch: md5Checksum(JSON.stringify(rawData)) == contentMD5,
      metadata: {
        contentMD5: contentMD5 as string,
        entryVersion: headers?.get("roblox-entry-version") as string,
        entryCreatedTime: (entryCreatedTime && new Date (entryCreatedTime as string)) as Date,
        entryVersionCreatedTime: (entryVersionCreatedTime && new Date (entryVersionCreatedTime as string)) as Date,
        entryAttributes: (entryAttributes && JSON.parse(entryAttributes)) as Record<string, string>,
        entryUserIds: (entryUserIds && JSON.parse(entryUserIds)) as number[]
      }
    }
  }
}))


/**
 * Sets the value, metadata and user IDs associated with an entry.
 * @endpoint POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param scope The value is global by default.
 * @param matchVersion Provide to update only if the current version matches this.
 * @param exclusiveCreate Create the entry only if it does not exist.
 * @param entryAttributes Attributes to be associated with new version of the entry. If not provided, existing attributes are cleared.
 * @param entryUserIds An array of Roblox user IDs tagged with the entry. If not provided, existing user IDs are cleared.
 * 
 * @example
 * type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
   const { data:response } = await StandardDataStoresApi_V1.setStandardDatastoreEntry<InventorySchema>({
     universeId: 5097539509, datastoreName: "InventoryStore", entryKey: "user/45348281", 
     entryValue: { Gold: 6 },  entryUserIds: [ 45348281 ]
   })
 * @exampleData { version: "08DBB6A47FDE6132.000000000E.08DBB780C616DF0C.01", deleted: false, contentLength: 20, createdTime: 2023-09-17T13:19:51.014Z, objectCreatedTime: 2023-09-16T11:03:03.922Z }
 * @exampleRawBody { version: "08DBB6A47FDE6132.000000000E.08DBB780C616DF0C.01", deleted: false, contentLength: 20, createdTime: "2023-09-17T13:19:51.014Z", objectCreatedTime: "2023-09-16T11:03:03.922Z" }
 */ 
export const setStandardDatastoreEntry = createApiMethod(async <Schema extends Record<any, any> | string | number = string | number>(
  { universeId, datastoreName, entryKey, entryValue, scope, matchVersion, exclusiveCreate, entryAttributes, entryUserIds }:
  {
    universeId: Identifier, datastoreName: string, entryKey: string, entryValue: Schema, scope?: string,
    matchVersion?: string, exclusiveCreate?: boolean, entryAttributes?: Record<string, Identifier>, entryUserIds?: Identifier[]
  }
): ApiMethod<RawSetStandardDatastoreEntryData, PrettifiedSetStandardDatastoreEntryData> => {
  const entryValueStr = typeof entryValue === "object" ? JSON.stringify(entryValue) : entryValue as string

  return {
    method: "POST",
    path: `/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`,
    searchParams: { datastoreName, entryKey, scope, matchVersion, exclusiveCreate },
    body: entryValueStr,
    headers: {
      "roblox-entry-attributes": entryAttributes ? JSON.stringify(entryAttributes) : undefined,
      "roblox-entry-userids": entryUserIds ? `[${entryUserIds?.join(",")}]` : undefined,
      "content-md5": md5Checksum(entryValueStr)
    },
    name: `setStandardDatastoreEntry`,

    formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
      obj.createdTime = new Date(obj.createdTime)
      obj.objectCreatedTime = new Date(obj.objectCreatedTime)
    })
  }
})


/**
 * Returns the value and metadata associated with an entry.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param scope The value is global by default.
 * 
 * @example const { data:success } = await StandardDataStoresApi_V1.deleteStandardDatastoreEntry({
     universeId: 5097539509, datastoreName: "InventoryStore",  entryKey: "user/45348281"
   })
 * @exampleData true
 * @exampleRawBody ""
 */ 
export const deleteStandardDatastoreEntry = createApiMethod(async (
  { universeId, datastoreName, entryKey, scope }:
  { universeId: Identifier, datastoreName: string, entryKey: string, scope?: string }
): ApiMethod<"", boolean> => ({
  method: "DELETE",
  path: `/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`,
  searchParams: { datastoreName, entryKey, scope },
  name: `deleteStandardDatastoreEntry`,

  formatRawDataFn: (rawData) => rawData === "" ? true : false
}))


/**
 * Increments the value for an entry by a given amount, or create a new entry with that amount.
 * @endpoint POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/increment
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param incrementBy The amount by which the entry should be incremented, or the starting value if it doesn't exist.
 * @param scope The value is global by default.
 * @param entryAttributes Attributes to be associated with new version of the entry. If not provided, existing attributes are cleared.
 * @param entryUserIds A comma-separated list of Roblox user IDs that the entry is tagged with. If not provided, existing user IDs are cleared.
 * 
 * @example
 * const { data:incrementedEntry } = await StandardDataStoresApi_V1.incrementStandardDatastoreEntry({
     universeId: 5097539509, datastoreName: "LoremIpsum", entryKey: "user/45348281", incrementBy: 1,
     entryUserIds: [ 45348281 ]
   })
 * @exampleData 2
 * @exampleRawBody 2
 */ 
export const incrementStandardDatastoreEntry = createApiMethod(async (
  { universeId, datastoreName, entryKey, scope, incrementBy, entryAttributes, entryUserIds }:
  {
    universeId: Identifier, datastoreName: string, entryKey: string, scope?: string, incrementBy: number,
    entryAttributes?: Record<string, Identifier>, entryUserIds?: Identifier[]
  }
): ApiMethod<number> => ({
  method: "POST",
  path: `/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/increment`,
  searchParams: { datastoreName, entryKey, scope, incrementBy },
  headers: {
    "roblox-entry-attributes": entryAttributes ? JSON.stringify(entryAttributes) : undefined,
    "roblox-entry-userids": entryUserIds ? `[${entryUserIds?.join(",")}]` : undefined,
  },
  name: `incrementStandardDatastoreEntry`
}))


/**
 * Returns the value and metadata of a specific version of an entry.
 * @endpoint POST /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/versions/version
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param versionId The version to inspect.
 * @param scope The value is global by default.
 * 
 * @example
 * type InventorySchema = { Iron?: number, Gold?: number, Copper?: number, Stone?: number, Wood?: number }
   const { data:entry } = await StandardDataStoresApi_V1.standardDatastoreEntryOfVersion({
     universeId: 5097539509, datastoreName: "LoremIpsum",  entryKey: "user/45348281",
     versionId: "08DC7742E4BD78AF.0000000001.08DC7742E4BD78AF.01"
   })
 * @exampleData { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 * @exampleRawBody { entry: { Gold: 6, Iron: 57 }, checksumsMatch: true, metadata: { contentMD5: "hGwoaGwduF4bOhexREYGkA==", entryVersion: "08DBB6A47FDE6132.0000000016.08DBB782CEE11766.01", entryCreatedTime: 2023-09-16T11:03:03.922Z, entryVersionCreatedTime: 2023-09-17T13:34:24.754Z, entryAttributes: null, entryUserIds: [ 45348281 ] } }
 */ 
export const standardDatastoreEntryOfVersion = createApiMethod(async <Schema extends Record<any, any> | string | number = string | number>(
  { universeId, datastoreName, entryKey, scope, versionId }:
  { universeId: Identifier, datastoreName: string, entryKey: string, scope?: string, versionId: string }
): ApiMethod<Prettify<Schema>, PrettifiedStandardDatastoreEntryData<Schema>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/versions/version`,
  searchParams: { datastoreName, entryKey, versionId, scope },
  name: `standardDatastoreEntryOfVersion`,

  formatRawDataFn: (rawData, { headers }) => {
    const
      entryCreatedTime = headers?.get("roblox-entry-created-time"), 
      entryVersionCreatedTime = headers?.get("roblox-entry-version-created-time"),
      entryAttributes = headers?.get("roblox-entry-attributes"), entryUserIds = headers?.get("roblox-entry-userids"),
      contentMD5 = headers?.get("content-md5")

    return {
      entry: rawData as Prettify<Schema>,
      checksumsMatch: md5Checksum(JSON.stringify(rawData)) == contentMD5,
      metadata: {
        contentMD5: contentMD5 as string,
        entryVersion: headers?.get("roblox-entry-version") as string,
        entryCreatedTime: (entryCreatedTime && new Date (entryCreatedTime as string)) as Date,
        entryVersionCreatedTime: (entryVersionCreatedTime && new Date (entryVersionCreatedTime as string)) as Date,
        entryAttributes: (entryAttributes && JSON.parse(entryAttributes)) as Record<string, string>,
        entryUserIds: (entryUserIds && JSON.parse(entryUserIds)) as number[]
      }
    }
  }
}))


/**
 * Returns a list of data stores belonging to an experience.
 * @endpoint GET /v1/universes/{universeId}/standard-datastores/datastore/entries/entry/versions
 * @tags [ "Cloud Key" ]
 * @deprecated Please use `StandardDataStoresApi_V2` for new work.
 * 
 * @param universeId The identifier of the experience with data stores that you want to access.
 * @param datastoreName The name of the data store.
 * @param entryKey The key identifying the entry.
 * @param scope The value is global by default.
 * @param startTime Provide to not include versions earlier than this timestamp.
 * @param endTime Provide to not include versions later than this timestamp.
 * @param sortOrder Either "Ascending" (earlier versions first) or "Descending" (later versions first).
 * @param limit The maximum number of items to return. Each call only reads one partition so it can return fewer than the given value when running out of objectives on one partition.
 * @param cursor Provide to request the next set of data.
 * 
 * @example
 * const { data:versions } = await StandardDataStoresApi_V1.listStandardDatastoreEntryVersions({
     universeId: 5097539509, datastoreName: "InventoryStore", entryKey: "user/45348281",
     sortOrder: "Ascending", limit: 1
   })
 * @exampleData [ { version: "08DBB6A47FDE6132.0000000010.08DBB781B9579F00.01", deleted: false, contentLength: 20, createdTime: 2023-09-17T13:26:39.124Z, objectCreatedTime: 2023-09-16T11:03:03.922Z } ]
 * @exampleRawBody { versions: [ { version: "08DBB6A47FDE6132.0000000010.08DBB781B9579F00.01", deleted: false, contentLength: 20, createdTime: "2023-09-17T13:26:39.124Z", objectCreatedTime: "2023-09-16T11:03:03.922Z" } ] }
 */ 
export const listStandardDatastoreEntryVersions = createApiMethod(async <Schema extends Record<any, any> | string | number = string | number>(
  { universeId, datastoreName, entryKey, scope, startTime, endTime, sortOrder, limit, cursor }:
  {
    universeId: Identifier, datastoreName: string, entryKey: string, scope?: string,
    startTime?: Date | ISODateTime, endTime?: Date | ISODateTime,
    sortOrder?: "Ascending" | "Descending", limit?: number, cursor?: string
  }
): ApiMethod<RawListStandardDatastoreEntryVersionsData, PrettifiedListStandardDatastoreEntryVersionsData> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/versions`,
  searchParams: { datastoreName, entryKey, scope, startTime, endTime, sortOrder, limit, cursor },
  name: `listStandardDatastoreEntryVersions`,

  formatRawDataFn: ({ versions }) => cloneAndMutateObject(versions, obj => obj.forEach(versionData => {
    versionData.createdTime = new Date(versionData.createdTime)
    versionData.objectCreatedTime = new Date(versionData.objectCreatedTime)
  })),

  getCursorsFn: ({ nextPageCursor }) => [ null, nextPageCursor ]
}))