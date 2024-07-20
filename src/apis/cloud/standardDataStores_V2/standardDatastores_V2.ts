// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "typeforge"
import { PrettifiedListStandardDatastoreEntriesData, PrettifiedListStandardDatastoresData, RawListStandardDatastoreEntriesData, RawListStandardDatastoresData } from "./standardDatastores_V2.types"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "StandardDatastores_V2", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * Returns a list of data stores belonging to an experience.
 * @endpoint GET /v2/universes/{universeId}/data-stores
 * 
 * @param universeId The ID of the universe to list datastores for.
 * @param prefix Provide to return only data stores with this prefix.
 * @param limit The maximum number of data stores to return. The service might return fewer than this value. If unspecified, at most 10 data stores are returned. The maximum value is 100 and higher values are set to 100.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:datastores } = await StandardDatastoresApi_V2.listStandardDatastores({ universeId: 5097539509, prefix: "Ba" })
 * @exampleData [{"path":"universes/5097539509/data-stores/Bans","id":"Bans"}] 
 * @exampleRawBody {"dataStores":[{"path":"universes/5097539509/data-stores/Bans","id":"Bans"}]}
 */
export const listStandardDatastores = addApiMethod(async <UniverseId extends Identifier, Prefix extends string>(
  { universeId, prefix, limit, cursor }: { universeId: UniverseId, prefix?: Prefix, limit?: number, cursor?: string }
): ApiMethod<RawListStandardDatastoresData<UniverseId, Prefix>, PrettifiedListStandardDatastoresData<UniverseId, Prefix>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/data-stores`,
  searchParams: { filter: prefix ? `id.startsWith("${prefix}")` : null, maxPageSize: limit, pageToken: cursor },
  name: `listStandardDatastores`,

  prettifyFn: ({ dataStores }) => dataStores
}))


/**
 * Lists entries for a standard datastore.
 * @endpoint
 * GET /v2/universes/{universe}/data-stores/{data-store}/entries
 * GET /v2/universes/{universe}/data-stores/{data-store}/scopes/{scope}/entries
 * 
 * @param universeId The ID of the universe to get data store entries for.
 * @param prefix Provide to return only data store entries with this prefix.
 * @param limit The maximum number of data store entries to return. The service might return fewer than this value. If unspecified, at most 10 data store entries are returned. The maximum value is 256 and higher values are set to 256.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example
 * await StandardDatastoresApi_V2.listStandardDatastoreEntries({
     universeId: 5097539509, dataStore: "InventoryStore"
   })
 * @exampleData [{"path":"universes/5097539509/data-stores/InventoryStore/entries/user/45348281","id":"user/45348281"}]
 * @exampleRawBody {"dataStoreEntries":[{"path":"universes/5097539509/data-stores/InventoryStore/entries/user/45348281","id":"user/45348281"}]}
 */
export const listStandardDatastoreEntries = addApiMethod(async <
  UniverseId extends Identifier, Prefix extends string, DataStore extends string, Scope extends string
>(
  { universeId, dataStore, scope, prefix, limit, cursor }:
  { universeId: UniverseId, dataStore: DataStore, scope?: Scope, prefix?: Prefix, limit?: number, cursor?: string }
): ApiMethod<
  RawListStandardDatastoreEntriesData<UniverseId, Prefix, DataStore, Scope>,
  PrettifiedListStandardDatastoreEntriesData<UniverseId, Prefix, DataStore, Scope>
  > => ({
  method: "GET",
  path: (
    scope ? `/v2/universes/${universeId}/data-stores/${dataStore}/scopes/${scope}/entries`
    : `/v2/universes/${universeId}/data-stores/${dataStore}/entries`
  ),
  searchParams: { filter: prefix ? `id.startsWith("${prefix}")` : null, maxPageSize: limit, pageToken: cursor },
  name: `listStandardDatastoreEntries`,

  prettifyFn: rawData => rawData?.dataStoreEntries || [],

  getCursorsFn: rawData => [ null, rawData?.nextPageToken ]
}))