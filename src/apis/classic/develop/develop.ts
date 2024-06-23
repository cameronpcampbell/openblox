// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier, SortOrder } from "../../../utils/utils.types"
import { PrettifiedUniversePlacesData, RawUniversePlacesData } from "./develop.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "Develop", baseUrl: "https://develop.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets a list of places for the specified universe.
 * @endpoint GET /v1/universes/{universeId}/places
 * 
 * @param universeId The id of the universe to get places for.
 * @param isUniverseCreation Returns only new universe creations.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data } = await ClassicDevelopApi.universePlaces({ universeId: 6026274246 });
 * @exampleData [{"id":11969698031,"universeId":6026274246,"name":"MightyPart's Place Number: 140","description":""}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":11969698031,"universeId":6026274246,"name":"MightyPart's Place Number: 140","description":""}]}
 */
export const universePlaces = addApiMethod(async <UniverseId extends Identifier>(
  { universeId, isUniverseCreation, limit, sortOrder, cursor }:
  { universeId: UniverseId, isUniverseCreation?: boolean, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawUniversePlacesData<UniverseId>, PrettifiedUniversePlacesData<UniverseId>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/places`,
  searchParams: { isUniverseCreation, limit, cursor, sortOrder },
  name: `universePlaces`,

  prettifyFn: ({ data }) => data
}))