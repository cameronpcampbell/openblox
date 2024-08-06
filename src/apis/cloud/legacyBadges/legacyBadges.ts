// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ name: "LegacyBadges", baseUrl: "https://apis.roblox.com/legacy-badges" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// [ Badges ] ////////////////////////////////////////////////////////////////////
/**
 * Updates a badge.
 * @endpoint PATCH /v1/badges/{badgeId}
 * 
 * @param badgeId The ID of the badge to update.
 * @param name The new name for the badge.
 * @param description The new description for the badge.
 * @param enabled If the badge is to enabled.
 * 
 * @example const { data:success } = await LegacyBadgesApi.updateBadge({ badgeId: 2124533401, description: "hello" })
 * @exampleData true
 * @exampleRawBody {}
 */
export const updateBadge = addApiMethod(async (
  { badgeId, name, description, enabled }: { badgeId: Identifier, name?: string, description?: string, enabled?: boolean }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/badges/${badgeId}`,
  name: `updateBadge`,
  body: { name, description, enabled },

  formatRawDataFn: rawData => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////