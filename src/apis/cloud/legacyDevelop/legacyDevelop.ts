// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { ClassicDevelopApi } from "../../classic"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { addExistingApiMethod } = createApiGroup({ name: "LegacyDevelop", baseUrl: "https://apis.roblox.com/legacy-develop" })
//////////////////////////////////////////////////////////////////////////////////


// [ Team Create ] ///////////////////////////////////////////////////////////////
/**
 * Updates team create settings for a universe.
 * @endpoint PATCH /v1/universes/{universeId}/teamcreate
 * 
 * @param universeId The ID of the universe to update team create settings for.
 * @param isEnabled If team create should be enabled.
 * 
 * @example const { data:success } = await LegacyDevelopApi.setTeamCreateSettingsForUniverse({ universeId: 6069031486, isEnabled: false })
 * @exampleData true
 * @exampleRawBody {}
 */
export const setTeamCreateSettingsForUniverse = addExistingApiMethod(ClassicDevelopApi.setTeamCreateSettingsForUniverse)


/**
 * Gets team create settings for a universe.
 * @endpoint GET /v1/universes/{universeId}/teamcreate
 * 
 * @param universeId The ID of the universe to get team create settings for.
 * 
 * @example const { data:settings } = await LegacyDevelopApi.teamCreateSettingsForUniverse({ universeId: 6069031486 })
 * @exampleData {"isEnabled":true} 
 * @exampleRawBody {"isEnabled":true} 
 */
export const teamCreateSettingsForUniverse = addExistingApiMethod(ClassicDevelopApi.teamCreateSettingsForUniverse)


/**
 * Gets team create settings for many universes.
 * @endpoint GET /v1/universes/multiget/teamcreate
 * 
 * @param universeIds The ID of the universe to get team create settings for.
 * 
 * @example const { data:settings } = await LegacyDevelopApi.teamCreateSettingsForUniverses({ universeIds: [ 6069031486 ] })
 * @exampleData {"6069031486":{"isEnabled":false}} 
 * @exampleRawBody {"data":[{"id":6069031486,"isEnabled":false}]}
 */
export const teamCreateSettingsForUniverses = addExistingApiMethod(ClassicDevelopApi.teamCreateSettingsForUniverses)


/**
 * Removes a users team create access.
 * @endpoint DELETE /v1/universes/{universeId}/teamcreate/memberships
 * 
 * @param universeId The ID of the universe to remove the users team create access from.
 * @param userId The ID of the user to remove team create access from.
 * 
 * @example const { data:success } = await LegacyDevelopApi.teamCreateRemoveUsersAccessForUniverse({ universeId: 6069031486, userId: 45348281 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const teamCreateRemoveUsersAccessForUniverse = addExistingApiMethod(ClassicDevelopApi.teamCreateRemoveUsersAccessForUniverse)


/**
 * List of users in the active Team Create session.
 * @endpoint GET /v1/places/{placeId}/teamcreate/active_session/members
 * 
 * @param placeId The ID of the place to get active team create members from.
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:activeMembers } = await LegacyDevelopApi.teamCreateActiveMembers({ placeId: 17718644108 })
 * @exampleData [{"id":45348281,"name":"MightyPart","displayName":"Mighty"}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":45348281,"name":"MightyPart","displayName":"Mighty"}]}
 */
export const teamCreateActiveMembers = addExistingApiMethod(ClassicDevelopApi.teamCreateActiveMembers)
//////////////////////////////////////////////////////////////////////////////////


// [ Team Test V2 ] //////////////////////////////////////////////////////////////
/**
 * Close a game instance that is being used for team testing.
 * @endpoint DELETE /v2/teamtest/{placeId}
 * 
 * @param placeId The ID of the place to close team test session for.
 * @param jobId The ID of the game instance to close.
 * 
 * @example
 * const { data:success } = await LegacyDevelopApi.closeTeamTestSession({
     placeId: 16349154726, jobId: "0e6f3d93-a4aa-44ab-b3b7-9169ddc1d9a1"
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const closeTeamTestSession = addExistingApiMethod(ClassicDevelopApi.closeTeamTestSession)
//////////////////////////////////////////////////////////////////////////////////