// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicUniverses", baseUrl: "https://apis.roblox.com/universes" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets the parent universe Id from a place Id.
 * @endpoint GET /v1/places/{placeId}/universe
 * 
 * @param placeId The id of the place to get the universe id for.
 * 
 * @example const { data:universeId } = await ClassicUniversesApi.universeIdFromPlaceId({ placeId: 16349154726 })
 * @exampleData 5638577595
 * @exampleRawBody {"universeId":5638577595}
 */
export const universeIdFromPlaceId = createApiMethod(async (
  { placeId }: { placeId: Identifier }
): ApiMethod<{ universeId: Identifier }, Identifier> => ({
  path: `/v1/places/${placeId}/universe`,
  method: "GET",
  name: "universeIdFromPlaceId",

  formatRawDataFn: ({ universeId }) => universeId
}))
