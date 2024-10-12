// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { ClassicBadgesApi } from "../../classic"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { addExistingApiMethod } = createApiGroup({ name: "LegacyBadges", baseUrl: "https://apis.roblox.com/legacy-badges" })
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
export const updateBadge = addExistingApiMethod(ClassicBadgesApi.updateBadge)
//////////////////////////////////////////////////////////////////////////////////