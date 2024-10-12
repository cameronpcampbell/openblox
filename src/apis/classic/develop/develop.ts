// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ObjectEither, ArrayNonEmptyIfConst } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedGameTemplatesData, PrettifiedPluginsInfoData, PrettifiedTeamCreateActiveMembersData, PrettifiedTeamCreateSettingsForUniversesData, PrettifiedGroupUniversesData, PrettifiedUniverseInfo, PrettifiedUniversePlacesData, RawGameTemplatesData, RawPluginsInfoData, RawTeamCreateActiveMembersData, RawTeamCreateSettingsForUniversesData, RawGroupUniversesData, RawUniverseInfo, RawUniversePlacesData, RawUniversesInfoData, PrettifiedUniversesInfoData, RawAuthenticatedUserPermissionsForUniversesData, PrettifiedAuthenticatedUserPermissionsForUniversesData, UniverseConfigurationData_V1, UniverseAvatarType, UniverseScaleType, UniverseAnimationType, UniverseCollisionType, UniverseBodyType, UniverseJointPositioningType, UniverseGenre, UniversePlayableDevice, RawAuthenticatedUserGroupsCanManage, PrettifiedAuthenticatedUserGroupsCanManage, PrettifiedAuthenticatedUserUniversesData, RawPaginatedUniverseData, RawAuthenticatedUserUniversesData, PlaceConfigurationData, PlaceSocialSlotType, PlaceGearType, UpdatePlaceConfigurationData_V2, PrettifiedAvatarAssetOverride, AvatarScales, UniverseRegion, RawUpdateUniverseConfigurationData_V2, PrettifiedUpdateUniverseConfigurationData_V2, RawAvatarAssetOverride } from "./develop.types"
import type { SortOrder } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicDevelop", baseUrl: "https://develop.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Game Templates ] ////////////////////////////////////////////////////////////
/**
 * Gets a page of templates that can be used to start off making games
 * @endpoint GET /v1/gametemplates
 * 
 * @example const { data:templates } = await ClassicDevelopApi.gameTemplates()
 * @exampleData [{"gameTemplateType":"Generic","hasTutorials":false,"universe":{"id":28220420,"name":"Baseplate","description":null,"isArchived":false,"rootPlaceId":95206881,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2013-11-01T08:47:14.070Z","updated":"2023-05-02T22:03:01.107Z"}},{"gameTemplateType":"Generic","hasTutorials":false,"universe":{"id":2464612126,"name":"Classic Baseplate","description":null,"isArchived":false,"rootPlaceId":6560363541,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2021-03-24T00:56:45.957Z","updated":"2021-04-16T18:55:13.820Z"}},{"gameTemplateType":"Generic","hasTutorials":false,"universe":{"id":28223770,"name":"Flat Terrain","description":null,"isArchived":false,"rootPlaceId":95206192,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2013-11-01T08:47:18.013Z","updated":"2023-05-02T22:17:58.570Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":6106389365,"name":"Laser Tag","description":null,"isArchived":false,"rootPlaceId":17823019220,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2024-06-11T21:29:12.993Z","updated":"2024-06-20T16:58:40.577Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":6106388692,"name":"FPS System","description":null,"isArchived":false,"rootPlaceId":17823017290,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2024-06-11T21:28:57.433Z","updated":"2024-06-20T16:58:54.493Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":5557500170,"name":"Racing","description":null,"isArchived":false,"rootPlaceId":16078915506,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2024-01-22T19:47:42.920Z","updated":"2024-01-29T17:39:18.837Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":202770430,"name":"Village","description":null,"isArchived":false,"rootPlaceId":520390648,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2016-10-10T21:32:42.780Z","updated":"2023-05-03T23:39:56.663Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":93411794,"name":"Castle","description":null,"isArchived":false,"rootPlaceId":203810088,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-01-14T21:46:11.363Z","updated":"2023-05-03T23:46:03.850Z"}},{"gameTemplateType":"Theme","hasTutorials":false,"universe":{"id":138962641,"name":"Suburban","description":null,"isArchived":false,"rootPlaceId":366130569,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2016-02-20T00:02:36.483Z","updated":"2023-05-03T23:45:29.983Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":107387509,"name":"Pirate Island","description":null,"isArchived":false,"rootPlaceId":264719325,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-07-01T22:54:38.927Z","updated":"2023-05-03T23:49:39.753Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":93412282,"name":"Obby","description":null,"isArchived":false,"rootPlaceId":203812057,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-01-14T21:51:25.830Z","updated":"2023-05-03T23:50:57.623Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":142606178,"name":"Starting Place","description":null,"isArchived":false,"rootPlaceId":379736082,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2016-03-09T19:04:30.723Z","updated":"2023-05-04T00:09:23.643Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":115791780,"name":"Line Runner","description":null,"isArchived":false,"rootPlaceId":301530843,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-09-28T22:16:52.420Z","updated":"2023-05-04T00:10:55.837Z"}},{"gameTemplateType":"Theme","hasTutorials":false,"universe":{"id":3760683948,"name":"Concert","description":null,"isArchived":false,"rootPlaceId":10275826693,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2022-07-19T00:42:50.713Z","updated":"2023-05-03T23:14:32.480Z"}},{"gameTemplateType":"Theme","hasTutorials":false,"universe":{"id":4594822820,"name":"Modern City","description":null,"isArchived":false,"rootPlaceId":13165709401,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2023-04-17T18:33:52.930Z","updated":"2023-04-17T23:24:03.373Z"}}] 
 * @exampleRawBody {"data":[{"gameTemplateType":"Generic","hasTutorials":false,"universe":{"id":28220420,"name":"Baseplate","description":null,"isArchived":false,"rootPlaceId":95206881,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2013-11-01T08:47:14.07Z","updated":"2023-05-02T22:03:01.107Z"}},{"gameTemplateType":"Generic","hasTutorials":false,"universe":{"id":2464612126,"name":"Classic Baseplate","description":null,"isArchived":false,"rootPlaceId":6560363541,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2021-03-24T00:56:45.957Z","updated":"2021-04-16T18:55:13.82Z"}},{"gameTemplateType":"Generic","hasTutorials":false,"universe":{"id":28223770,"name":"Flat Terrain","description":null,"isArchived":false,"rootPlaceId":95206192,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2013-11-01T08:47:18.013Z","updated":"2023-05-02T22:17:58.57Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":6106389365,"name":"Laser Tag","description":null,"isArchived":false,"rootPlaceId":17823019220,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2024-06-11T21:29:12.993Z","updated":"2024-06-20T16:58:40.577Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":6106388692,"name":"FPS System","description":null,"isArchived":false,"rootPlaceId":17823017290,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2024-06-11T21:28:57.433Z","updated":"2024-06-20T16:58:54.493Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":5557500170,"name":"Racing","description":null,"isArchived":false,"rootPlaceId":16078915506,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2024-01-22T19:47:42.92Z","updated":"2024-01-29T17:39:18.837Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":202770430,"name":"Village","description":null,"isArchived":false,"rootPlaceId":520390648,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2016-10-10T21:32:42.78Z","updated":"2023-05-03T23:39:56.663Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":93411794,"name":"Castle","description":null,"isArchived":false,"rootPlaceId":203810088,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-01-14T21:46:11.363Z","updated":"2023-05-03T23:46:03.85Z"}},{"gameTemplateType":"Theme","hasTutorials":false,"universe":{"id":138962641,"name":"Suburban","description":null,"isArchived":false,"rootPlaceId":366130569,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2016-02-20T00:02:36.483Z","updated":"2023-05-03T23:45:29.983Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":107387509,"name":"Pirate Island","description":null,"isArchived":false,"rootPlaceId":264719325,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-07-01T22:54:38.927Z","updated":"2023-05-03T23:49:39.753Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":93412282,"name":"Obby","description":null,"isArchived":false,"rootPlaceId":203812057,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-01-14T21:51:25.83Z","updated":"2023-05-03T23:50:57.623Z"}},{"gameTemplateType":"Theme","hasTutorials":true,"universe":{"id":142606178,"name":"Starting Place","description":null,"isArchived":false,"rootPlaceId":379736082,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2016-03-09T19:04:30.723Z","updated":"2023-05-04T00:09:23.643Z"}},{"gameTemplateType":"Gameplay","hasTutorials":false,"universe":{"id":115791780,"name":"Line Runner","description":null,"isArchived":false,"rootPlaceId":301530843,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2015-09-28T22:16:52.42Z","updated":"2023-05-04T00:10:55.837Z"}},{"gameTemplateType":"Theme","hasTutorials":false,"universe":{"id":3760683948,"name":"Concert","description":null,"isArchived":false,"rootPlaceId":10275826693,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2022-07-19T00:42:50.713Z","updated":"2023-05-03T23:14:32.48Z"}},{"gameTemplateType":"Theme","hasTutorials":false,"universe":{"id":4594822820,"name":"Modern City","description":null,"isArchived":false,"rootPlaceId":13165709401,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":998796,"creatorName":"Templates","created":"2023-04-17T18:33:52.93Z","updated":"2023-04-17T23:24:03.373Z"}}]}
 */
export const gameTemplates = createApiMethod(async (
): ApiMethod<RawGameTemplatesData, PrettifiedGameTemplatesData> => ({
  method: "GET",
  path: `/v1/gametemplates`,
  name: `gameTemplates`,

  formatRawDataFn: ({ data }) => data.map(template => cloneAndMutateObject(template, ({ universe }) => {
    universe.created = new Date(universe.created)
    universe.updated = new Date(universe.updated)
  }))
}))
//////////////////////////////////////////////////////////////////////////////////



// [ Groups ] ////////////////////////////////////////////////////////////////////
/**
 * Gets a list of universes for the given group.
 * @endpoint GET /v1/groups/{groupId}/universes
 * 
 * @param groupId The ID of the group to get universes from.
 * @param isArchived Whether or not to return archived games.
 * @param limit The number of results per request.
 * @param sortOrder The order to sort the results in. Sorted by universeId.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:universes } = await ClassicDevelopApi.groupUniverses({ groupId: 5850082 })
 * @exampleData [{"id":1651554338,"name":"Ninjas Unleashed: Legion","description":"No secret projects here\r\nScriptor/Game Designer - NamelessGuy2005\r\nBuilder/Animator - Flaroh\r\n","isArchived":false,"rootPlaceId":4857762148,"isActive":false,"privacyType":"Private","creatorType":"Group","creatorTargetId":5850082,"creatorName":"MightyPart Games","created":"2020-04-04T13:17:08.120Z","updated":"2020-04-20T15:37:55.803Z"}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":1651554338,"name":"Ninjas Unleashed: Legion","description":"No secret projects here\r\nScriptor/Game Designer - NamelessGuy2005\r\nBuilder/Animator - Flaroh\r\n","isArchived":false,"rootPlaceId":4857762148,"isActive":false,"privacyType":"Private","creatorType":"Group","creatorTargetId":5850082,"creatorName":"MightyPart Games","created":"2020-04-04T13:17:08.12Z","updated":"2020-04-20T15:37:55.803Z"}]}
 */
export const groupUniverses = createApiMethod(async <GroupId extends Identifier>(
  { groupId, isArchived, limit, sortOrder, cursor }:
  { groupId: GroupId, isArchived?: boolean, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupUniversesData<GroupId>, PrettifiedGroupUniversesData<GroupId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/universes`,
  searchParams: { isArchived, limit, sortOrder, cursor },
  name: `groupUniverses`,

  formatRawDataFn: ({ data }) => data.map(universe => cloneAndMutateObject(universe, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  }))
}))
//////////////////////////////////////////////////////////////////////////////////



// [ Team Create ] ///////////////////////////////////////////////////////////////
/**
 * List of users in the active Team Create session.
 * @endpoint GET /v1/places/{placeId}/teamcreate/active_session/members
 * 
 * @param placeId The ID of the place to get active team create members from.
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:activeMembers } = await ClassicDevelopApi.teamCreateActiveMembers({ placeId: 17718644108 })
 * @exampleData [{"id":45348281,"name":"MightyPart","displayName":"Mighty"}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":45348281,"name":"MightyPart","displayName":"Mighty"}]}
 */
export const teamCreateActiveMembers = createApiMethod(async (
  { placeId, limit, cursor }: { placeId: Identifier, limit?: 10 | 25 | 50 | 100, cursor?: string }
): ApiMethod<RawTeamCreateActiveMembersData, PrettifiedTeamCreateActiveMembersData> => ({
  method: "GET",
  path: `/v1/places/${placeId}/teamcreate/active_session/members`,
  searchParams: { limit, cursor },
  name: `teamCreateActiveMembers`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets team create settings for a universe.
 * @endpoint GET /v1/universes/{universeId}/teamcreate
 * 
 * @param universeId The ID of the universe to get team create settings for.
 * 
 * @example const { data:settings } = await ClassicDevelopApi.teamCreateSettingsForUniverse({ universeId: 6069031486 })
 * @exampleData {"isEnabled":true} 
 * @exampleRawBody {"isEnabled":true} 
 */
export const teamCreateSettingsForUniverse = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<{ isEnabled: boolean }> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/teamcreate`,
  name: `teamCreateSettingsForUniverse`,
}))


/**
 * Updates team create settings for a universe.
 * @endpoint PATCH /v1/universes/{universeId}/teamcreate
 * 
 * @param universeId The ID of the universe to update team create settings for.
 * @param isEnabled If team create should be enabled.
 * 
 * @example const { data:success } = await ClassicDevelopApi.setTeamCreateSettingsForUniverse({ universeId: 6069031486, isEnabled: false })
 * @exampleData true
 * @exampleRawBody {}
 */
export const setTeamCreateSettingsForUniverse = createApiMethod(async (
  { universeId, isEnabled }: { universeId: Identifier, isEnabled: boolean }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/universes/${universeId}/teamcreate`,
  body: { isEnabled },
  name: `setTeamCreateSettingsForUniverse`,

  formatRawDataFn: dataIsSuccess
}))


/**
 * Gets team create settings for many universes.
 * @endpoint GET /v1/universes/multiget/teamcreate
 * 
 * @param universeIds The ID of the universe to get team create settings for.
 * 
 * @example const { data:settings } = await ClassicDevelopApi.teamCreateSettingsForUniverses({ universeIds: [ 6069031486 ] })
 * @exampleData {"6069031486":{"isEnabled":false}} 
 * @exampleRawBody {"data":[{"id":6069031486,"isEnabled":false}]}
 */
export const teamCreateSettingsForUniverses = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmptyIfConst<UniverseId> }
): ApiMethod<RawTeamCreateSettingsForUniversesData<UniverseId>, PrettifiedTeamCreateSettingsForUniversesData<UniverseId>> => ({
  method: "GET",
  path: `/v1/universes/multiget/teamcreate`,
  searchParams: { ids: universeIds },
  name: `teamCreateSettingsForUniverses`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", ({ id, ...rest }) => ({ ...rest }))
}))


/**
 * Removes a users team create access.
 * @endpoint DELETE /v1/universes/{universeId}/teamcreate/memberships
 * 
 * @param universeId The ID of the universe to remove the users team create access from.
 * @param userId The ID of the user to remove team create access from.
 * 
 * @example const { data:success } = await ClassicDevelopApi.teamCreateRemoveUsersAccessForUniverse({ universeId: 6069031486, userId: 45348281 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const teamCreateRemoveUsersAccessForUniverse = createApiMethod(async (
  { universeId, userId }: { universeId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/universes/${universeId}/teamcreate/memberships`,
  body: { userId },
  name: `teamCreateRemoveUsersAccessForUniverse`,

  formatRawDataFn: dataIsSuccess
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Plugins ] ///////////////////////////////////////////////////////////////////
/**
 * Gets plugin details by IDs.
 * @endpoint GET /v1/plugins
 * 
 * @param pluginIds The IDs of the plugins to get information about.
 * 
 * @example const { data:pluginsInfo } = await ClassicDevelopApi.pluginsInfo({ pluginIds: [ 18407509477 ] })
 * @exampleData {"18407509477":{"created":"2024-07-09T10:44:37.523Z","updated":"2024-07-09T10:44:37.523Z","name":"PropertyLab [PRE-ALPHA V0.0.0]","description":"A modernised plugin explorer for Roblox.","commentsEnabled":false,"versionId":24376570646}} 
 * @exampleRawBody {"data":[{"id":18407509477,"name":"PropertyLab [PRE-ALPHA V0.0.0]","description":"A modernised plugin explorer for Roblox.","commentsEnabled":false,"versionId":24376570646,"created":"2024-07-09T10:44:37.523Z","updated":"2024-07-09T10:44:37.523Z"}]}
 */
export const pluginsInfo = createApiMethod(async <PluginId extends Identifier>(
  { pluginIds }: { pluginIds: ArrayNonEmptyIfConst<PluginId> }
): ApiMethod<RawPluginsInfoData<PluginId>, PrettifiedPluginsInfoData<PluginId>> => ({
  method: "GET",
  path: `/v1/plugins`,
  searchParams: { pluginIds },
  name: `pluginsInfo`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", ({ id, created, updated, ...rest }) => ({
    created: new Date(created),
    updated: new Date(updated),
    ...rest
  }))
}))


/**
 * Updates a plugin.
 * @endpoint PATCH /v1/plugins/{pluginId}
 * 
 * @param pluginId The ID of the plugin to update.
 * @param name The new name for the plugin.
 * @param description The new description for the plugin.
 * @param commentsEnabled If comments should be enabled for the plugin.
 * 
 * @example const { data:success } = await ClassicDevelopApi.updatePlugin({ pluginId: 18407509477, name: "My New Plugin Name" })
 * @exampleData true
 * @exampleRawBody {}
 */
export const updatePlugin = createApiMethod(async (
  { pluginId, name, description, commentsEnabled }: { pluginId: Identifier, name?: string, description?: string, commentsEnabled?: boolean }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/plugins/${pluginId}`,
  body: { name, description, commentsEnabled },
  name: `updatePlugin`,

  formatRawDataFn: dataIsSuccess
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Universes ] /////////////////////////////////////////////////////////////////
/**
 * Gets information about a universe.
 * @endpoint GET /v1/universes/{universeId}
 * 
 * @param universeId The ID of the universe to get information for.
 * 
 * @example const { data:universeInfo } = await ClassicDevelopApi.universeInfo({ universeId: 6069031486 })
 * @exampleData {"id":6069031486,"name":"MightyPart's Place: 06032024_1","description":null,"isArchived":false,"rootPlaceId":17718644108,"isActive":false,"privacyType":"Private","creatorType":"User","creatorTargetId":45348281,"creatorName":"MightyPart","created":"2024-06-03T09:42:56.270Z","updated":"2024-06-03T09:42:56.270Z"} 
 * @exampleRawBody {"id":6069031486,"name":"MightyPart's Place: 06032024_1","description":null,"isArchived":false,"rootPlaceId":17718644108,"isActive":false,"privacyType":"Private","creatorType":"User","creatorTargetId":45348281,"creatorName":"MightyPart","created":"2024-06-03T09:42:56.27Z","updated":"2024-06-03T09:42:56.27Z"}
 */
export const universeInfo = createApiMethod(async <UniverseId extends Identifier>(
  { universeId }: { universeId: Identifier }
): ApiMethod<RawUniverseInfo<UniverseId>, PrettifiedUniverseInfo<UniverseId>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}`,
  name: `universeInfo`,

  formatRawDataFn: data => cloneAndMutateObject(data, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  })
}))


/**
 * Returns a list of permissions related to a specific universe for the authenticated user.
 * @endpoint GET /v1/universes/{universeId}/permissions
 * 
 * @param universeId The ID of the universe to get permissions for.
 * 
 * @example const { data:permissions } = await ClassicDevelopApi.authenticatedUserPermissionsForUniverse({ universeId: 6069031486 })
 * @exampleData {"canManage":true,"canCloudEdit":true}
 * @exampleRawBody {"canManage":true,"canCloudEdit":true}
 */
export const authenticatedUserPermissionsForUniverse = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<{ canManage: boolean, canCloudEdit: boolean }> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/permissions`,
  name: `authenticatedUserPermissionsForUniverse`,
}))

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
export const universePlaces = createApiMethod(async <UniverseId extends Identifier>(
  { universeId, isUniverseCreation, limit, sortOrder, cursor }:
  { universeId: UniverseId, isUniverseCreation?: boolean, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawUniversePlacesData<UniverseId>, PrettifiedUniversePlacesData<UniverseId>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/places`,
  searchParams: { isUniverseCreation, limit, cursor, sortOrder },
  name: `universePlaces`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets information about multiple universes.
 * @endpoint GET /v1/universes/multiget
 * 
 * @param universeId The IDs of the universes to get information for.
 * 
 * @example const { data:universesInfo } = await ClassicDevelopApi.universesInfo({ universeIds: [ 6069031486 ] })
 * @exampleData {"6069031486":{"created":"2024-06-03T09:42:56.270Z","updated":"2024-06-03T09:42:56.270Z","name":"MightyPart's Place: 06032024_1","description":null,"isArchived":false,"rootPlaceId":17718644108,"isActive":false,"privacyType":"Private","creatorType":"User","creatorTargetId":45348281,"creatorName":"MightyPart"}}
 * @exampleRawBody {"data":[{"id":6069031486,"name":"MightyPart's Place: 06032024_1","description":null,"isArchived":false,"rootPlaceId":17718644108,"isActive":false,"privacyType":"Private","creatorType":"User","creatorTargetId":45348281,"creatorName":"MightyPart","created":"2024-06-03T09:42:56.27Z","updated":"2024-06-03T09:42:56.27Z"}]}
 */
export const universesInfo = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmptyIfConst<UniverseId> }
): ApiMethod<RawUniversesInfoData<UniverseId>, PrettifiedUniversesInfoData<UniverseId>> => ({
  method: "GET",
  path: `/v1/universes/multiget`,
  searchParams: { ids: universeIds },
  name: `universesInfo`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(
    data, "id", ({ id, created, updated, ...rest }) => ({ created: new Date(created), updated: new Date(updated), ...rest })
  )
}))


/**
 * Returns a list of permissions related to specific universes for the authenticated user.
 * @endpoint GET /v1/universes/multiget/permissions
 * 
 * @param universeIds The IDs of the universes to get permissions for.
 * 
 * @example const { data:permissions } = await ClassicDevelopApi.authenticatedUserPermissionsForUniverses({ universeIds: [ 6069031486 ] })
 * @exampleData {"6069031486":{"canManage":true,"canCloudEdit":true}}
 * @exampleRawBody {"data":[{"universeId":6069031486,"canManage":true,"canCloudEdit":true}]}
 */
export const authenticatedUserPermissionsForUniverses = createApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmptyIfConst<UniverseId> }
): ApiMethod<
  RawAuthenticatedUserPermissionsForUniversesData<UniverseId>, PrettifiedAuthenticatedUserPermissionsForUniversesData<UniverseId>
> => ({
  method: "GET",
  path: `/v1/universes/multiget/permissions`,
  searchParams: { ids: universeIds },
  name: `authenticatedUserPermissionsForUniverses`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "universeId", ({ universeId, ...rest }) => ({ ...rest }))
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Universe Settings ] /////////////////////////////////////////////////////////
/**
 * Gets the configuration for a universe owned by the authenticated user.
 * @endpoint GET /v1/universes/{universeId}/configuration
 * 
 * @param universeId The ID of the universe to get the configuration for.
 * 
 * @example const { data:config } = await ClassicDevelopApi.universeConfiguration({ universeId: 6069031486 })
 * @exampleData {"allowPrivateServers":false,"privateServerPrice":null,"isMeshTextureApiAccessAllowed":false,"id":6069031486,"name":"MightyPart's Place: 06032024_1","universeAvatarType":"MorphToR15","universeScaleType":"AllScales","universeAnimationType":"PlayerChoice","universeCollisionType":"OuterBox","universeBodyType":"Standard","universeJointPositioningType":"ArtistIntent","isArchived":false,"isFriendsOnly":false,"genre":"All","playableDevices":["Computer","Phone","Tablet","VR"],"isForSale":false,"price":0,"isStudioAccessToApisAllowed":false,"privacyType":"Private"} 
 * @exampleRawBody {"allowPrivateServers":false,"privateServerPrice":null,"isMeshTextureApiAccessAllowed":false,"id":6069031486,"name":"MightyPart's Place: 06032024_1","universeAvatarType":"MorphToR15","universeScaleType":"AllScales","universeAnimationType":"PlayerChoice","universeCollisionType":"OuterBox","universeBodyType":"Standard","universeJointPositioningType":"ArtistIntent","isArchived":false,"isFriendsOnly":false,"genre":"All","playableDevices":["Computer","Phone","Tablet","VR"],"isForSale":false,"price":0,"isStudioAccessToApisAllowed":false,"privacyType":"Private"}
 */
export const universeConfiguration = createApiMethod(async <UniverseId extends Identifier>(
  { universeId }: { universeId: UniverseId }
): ApiMethod<UniverseConfigurationData_V1<UniverseId>> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/configuration`,
  name: `universeConfiguration`,
}))


/**
 * Updates the configuration for a universe owned by the authenticated user.
 * @endpoint PATCH /v1/universes/{universeId}/configuration
 * 
 * @param universeId The ID of the universe to set configuration for.
 * @param name The new name for the universe.
 * @param avatarType The new avatarType for the universe.
 * @param scaleType The new scaleType for the universe.
 * @param animationType The new animationType for the universe.
 * @param collisionType The new collisionType for the universe.
 * @param bodyType The new bodyType for the universe.
 * @param jointPositioningType The new jointPositioningType for the universe.
 * @param isArchived If the universe is to be archived.
 * @param isFriendsOnly If the universe is to be for friends only.
 * @param genre The new genre for the universe.
 * @param playableDevices The allowed devices the universe can be played on.
 * @param isMeshTextureApiAccessAllowed If mesh and texture apis can be used for this universe.
 * @param isForSale If the universe is for sale.
 * @param price The price of the universe.
 * 
 * @example
 * const { data:updatedConfig } = await ClassicDevelopApi.updateUniverseConfiguration_V1({
     universeId: 5638577595, playableDevices: [ "Computer" ], avatarType: "PlayerChoice"
   })
 * @exampleData {"allowPrivateServers":false,"privateServerPrice":null,"isMeshTextureApiAccessAllowed":true,"id":5638577595,"name":"Terrain Gen Tech Demo","universeAvatarType":"PlayerChoice","universeScaleType":"AllScales","universeAnimationType":"PlayerChoice","universeCollisionType":"OuterBox","universeBodyType":"Standard","universeJointPositioningType":"ArtistIntent","isArchived":false,"isFriendsOnly":false,"genre":"All","playableDevices":["Computer"],"isForSale":false,"price":0,"isStudioAccessToApisAllowed":false,"privacyType":"Public"} 
 * @exampleRawBody {"allowPrivateServers":false,"privateServerPrice":null,"isMeshTextureApiAccessAllowed":true,"id":5638577595,"name":"Terrain Gen Tech Demo","universeAvatarType":"PlayerChoice","universeScaleType":"AllScales","universeAnimationType":"PlayerChoice","universeCollisionType":"OuterBox","universeBodyType":"Standard","universeJointPositioningType":"ArtistIntent","isArchived":false,"isFriendsOnly":false,"genre":"All","playableDevices":["Computer"],"isForSale":false,"price":0,"isStudioAccessToApisAllowed":false,"privacyType":"Public"}
 */
export const updateUniverseConfiguration_V1 = createApiMethod(async <
  UniverseId extends Identifier, Name extends string, AvatarType extends UniverseAvatarType, ScaleType extends UniverseScaleType,
  AnimationType extends UniverseAnimationType, CollisionType extends UniverseCollisionType, BodyType extends UniverseBodyType,
  JointPositioningType extends UniverseJointPositioningType, IsArchived extends boolean, IsFriendsOnly extends boolean,
  Genre extends UniverseGenre, PlayableDevice extends UniversePlayableDevice, IsMeshTextureApiAccessAllowed extends boolean,
  IsForSale extends boolean = false, Price extends number = number
>(
  { 
    universeId, name, avatarType, scaleType, animationType, collisionType, bodyType,
    jointPositioningType, isArchived, isFriendsOnly, playableDevices, isMeshTextureApiAccessAllowed
  }:
  {
    universeId: UniverseId, name?: Name, avatarType?: AvatarType, scaleType?: ScaleType,
    animationType?: AnimationType, collisionType?: CollisionType, bodyType?: BodyType,
    jointPositioningType?: JointPositioningType, isArchived?: IsArchived, isFriendsOnly?: IsFriendsOnly,
    genre?: Genre, playableDevices?: PlayableDevice[], isMeshTextureApiAccessAllowed?: IsMeshTextureApiAccessAllowed
  } & ObjectEither<{ isForSale: IsForSale, price: Price }, { isForSale?: false }>
): ApiMethod<UniverseConfigurationData_V1<
  UniverseId, Name, AvatarType, ScaleType, AnimationType, CollisionType, BodyType, JointPositioningType,
  IsArchived, IsFriendsOnly, Genre, PlayableDevice, IsMeshTextureApiAccessAllowed, IsForSale, Price
>> => ({
  method: "PATCH",
  path: `/v1/universes/${universeId}/configuration`,
  body: {
    name, universeAvatarType: avatarType, universeScaleType: scaleType, universeAnimationType: animationType,
    universeCollisionType: collisionType, universeBodyType: bodyType, universeJointPositioningType: jointPositioningType,
    isArchived, isFriendsOnly, playableDevices, isMeshTextureApiAccessAllowed
  },
  name: `updateUniverseConfiguration_V1`,
}))


/**
 * Gets the configuration for vip servers of a universe owned by the authenticated user.
 * @endpoint GET /v1/universes/{universeId}/configuration/vip-servers
 * 
 * @param universeId The ID of the universe to get the vip servers configuration from.
 * 
 * @example const { data:config } = await ClassicDevelopApi.vipServerConfigurationForUniverse({ universeId: 5638577595 })
 * @exampleData {"isEnabled":false,"price":null,"activeServersCount":0,"activeSubscriptionsCount":0} 
 * @exampleRawBody {"isEnabled":false,"price":null,"activeServersCount":0,"activeSubscriptionsCount":0} 
 */
export const vipServerConfigurationForUniverse = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<{ isEnabled: boolean, price: number | null, activeServersCount: number, activeSubscriptionsCount: number }> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/configuration/vip-servers`,
  name: `vipServerConfigurationForUniverse`,
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Users ] /////////////////////////////////////////////////////////////////////
/**
 * Lists groups that the authenticated user can manage.
 * @endpoint GET /v1/user/groups/canmanage
 * 
 * @example const { data:groupsCanManage } = await ClassicDevelopApi.authenticatedUserGroupsCanManage()
 * @exampleData [{"id":5850082,"name":"MightyPart Games"}] 
 * @exampleRawBody {"data":[{"id":5850082,"name":"MightyPart Games"}]}
 */
export const authenticatedUserGroupsCanManage = createApiMethod(async (
): ApiMethod<RawAuthenticatedUserGroupsCanManage, PrettifiedAuthenticatedUserGroupsCanManage> => ({
  method: "GET",
  path: `/v1/user/groups/canmanage`,
  name: `authenticatedUserGroupsCanManage`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Lists groups that the authenticated user can manage.
 * @endpoint GET /v1/user/groups/canmanage
 * 
 * @example const { data:groupsCanManage } = await ClassicDevelopApi.authenticatedUserGroupsCanManageGamesOrItems()
 * @exampleData [{"id":5850082,"name":"MightyPart Games"}] 
 * @exampleRawBody {"data":[{"id":5850082,"name":"MightyPart Games"}]}
 */
export const authenticatedUserGroupsCanManageGamesOrItems = createApiMethod(async (
): ApiMethod<RawAuthenticatedUserGroupsCanManage, PrettifiedAuthenticatedUserGroupsCanManage> => ({
  method: "GET",
  path: `/v1/user/groups/canmanagegamesoritems`,
  name: `authenticatedUserGroupsCanManageGamesOrItems`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets a list of universes for the authenticated user.
 * @endpoint GET /v1/user/universes
 * 
 * @param isArchived Whether or not to return archived games.
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * @param sortOrder The order to sort the results in. Sorted by universeId.
 * 
 * @example const { data:universes } = await ClassicDevelopApi.universesForGroup({ groupId: 5850082 })
 * @exampleData [{"id":43387735,"name":"parrrty's Place Number: 2","description":"parrrty's Place","isArchived":false,"rootPlaceId":122862800,"isActive":false,"privacyType":"Private","creatorType":"User","creatorTargetId":45348281,"creatorName":"MightyPart","created":"2013-11-01T13:47:47.813Z","updated":"2019-04-04T13:32:49.633Z"}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":43387735,"name":"parrrty's Place Number: 2","description":"parrrty's Place","isArchived":false,"rootPlaceId":122862800,"isActive":false,"privacyType":"Private","creatorType":"User","creatorTargetId":45348281,"creatorName":"MightyPart","created":"2013-11-01T13:47:47.813Z","updated":"2019-04-04T13:32:49.633Z"}]}
 */
export const authenticatedUserUniverses = createApiMethod(async (
  { isArchived, limit, sortOrder, cursor }:
  { isArchived?: boolean, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawAuthenticatedUserUniversesData, PrettifiedAuthenticatedUserUniversesData> => ({
  method: "GET",
  path: `/v1/user/universes`,
  searchParams: { isArchived, limit, sortOrder, cursor },
  name: `universesForGroup`,

  formatRawDataFn: ({ data }) => data.map(universe => cloneAndMutateObject(universe, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  }))
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Places ] ////////////////////////////////////////////////////////////////////
/**
 * Updates the configuration for a place owned by the authenticated user.
 * @endpoint GET /v1/places/{placeId}
 * 
 * @param placeId The ID of the place to update the configuration for.
 * @param name The name for the place.
 * @param description The description for the place.
 * 
 * @example const { data:updatedPlace } = await ClassicDevelopApi.updatePlaceConfiguration({ placeId: 16349154726, name: "New name" })
 * @exampleData {"id":16349154726,"universeId":5638577595,"name":"New name!","description":""} 
 * @exampleRawBody {"id":16349154726,"universeId":5638577595,"name":"New name!","description":""}
 */
export const updatePlaceConfiguration_V1 = createApiMethod(async <
  PlaceId extends Identifier, Name extends string, Description extends string
>(
  { placeId, name, description }: { placeId: PlaceId, name?: Name, description?: Description }
): ApiMethod<{ id: PlaceId, universeId: Identifier, name: Name, description: Description }> => ({
  method: "PATCH",
  path: `/v1/places/${placeId}`,
  body: { name, description },
  name: `updatePlaceConfiguration_V1`,
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Places V2 ] /////////////////////////////////////////////////////////////////
/**
 * Gets the configuration for a place owned by the authenticated user.
 * @endpoint GET /v2/places/{placeId}
 * 
 * @param placeId The ID of the place to get the configuration from.
 * 
 * @example const { data:config } = await ClassicDevelopApi.placeConfiguration({ placeId: 16349154726 })
 * @exampleData {"maxPlayerCount":50,"socialSlotType":"Automatic","customSocialSlotsCount":15,"allowCopying":false,"currentSavedVersion":1537,"isAllGenresAllowed":true,"allowedGearTypes":[],"maxPlayersAllowed":700,"id":16349154726,"universeId":5638577595,"name":"New name!","description":"","isRootPlace":true}
 * @exampleRawBody {"maxPlayerCount":50,"socialSlotType":"Automatic","customSocialSlotsCount":15,"allowCopying":false,"currentSavedVersion":1537,"isAllGenresAllowed":true,"allowedGearTypes":[],"maxPlayersAllowed":700,"id":16349154726,"universeId":5638577595,"name":"New name!","description":"","isRootPlace":true}
 */
export const placeConfiguration = createApiMethod(async <PlaceId extends Identifier>(
  { placeId }: { placeId: PlaceId }
): ApiMethod<PlaceConfigurationData<PlaceId>> => ({
  method: "GET",
  path: `/v2/places/${placeId}`,
  name: `placeConfiguration`,
}))


/**
 * Updates the configuration for a place owned by the authenticated user.
 * @endpoint GET /v1/places/{placeId}
 * 
 * @param placeId The ID of the place to update the configuration for.
 * @param name The name for the place.
 * @param description The description for the place.
 * 
 * @example  const { data:updatedConfig } = await ClassicDevelopApi.updatePlaceConfiguration_V2({ placeId: 16349154726, allowCopying: false })
 * @exampleData {"id":16349154726,"universeId":5638577595,"name":"New name!","description":""} 
 * @exampleRawBody {"id":16349154726,"universeId":5638577595,"name":"New name!","description":""}
 */
export const updatePlaceConfiguration_V2 = createApiMethod(async <
  PlaceId extends Identifier, Name extends string, Description extends string, MaxPlayerCount extends number,
  SocialSlotType extends PlaceSocialSlotType, CustomSocialSlotsCount extends number, AllowCopying extends boolean,
  AllowedGearTypes extends PlaceGearType, IsAllGenresAllowed extends boolean
>(
  { placeId, name, description, maxPlayerCount, socialSlotType, customSocialSlotsCount, allowCopying, allowedGearTypes, isAllGenresAllowed }:
  {
    placeId: PlaceId, name?: Name, description?: Description, maxPlayerCount?: MaxPlayerCount,
    socialSlotType?: SocialSlotType, customSocialSlotsCount?: CustomSocialSlotsCount, allowCopying?: AllowCopying,
    allowedGearTypes?: AllowedGearTypes[], isAllGenresAllowed?: IsAllGenresAllowed
  }
): ApiMethod<UpdatePlaceConfigurationData_V2<
  PlaceId, Name, Description, MaxPlayerCount, SocialSlotType, CustomSocialSlotsCount, AllowCopying, AllowedGearTypes, IsAllGenresAllowed
>> => ({
  method: "PATCH",
  path: `/v2/places/${placeId}`,
  body: { name, description, maxPlayerCount, socialSlotType, customSocialSlotsCount, allowedGearTypes, allowCopying, isAllGenresAllowed },
  name: `updatePlaceConfiguration_V2`,
}))
//////////////////////////////////////////////////////////////////////////////////



// [ Universe Settings ] /////////////////////////////////////////////////////////
/**
 * Updates the configuration for a universe owned by the authenticated user.
 * @endpoint PATCH /v2/universes/${universeId}/configuration
 * 
 * @param universeId The ID of the universe to set configuration for.
 * @param allowPrivateServers If private servers are allowed for the universe.
 * @param privateServerPrice The price of private servers.
 * @param name The new name for the universe.
 * @param description The universes description.
 * @param avatarType The new avatarType for the universe.
 * @param animationType The new animationType for the universe.
 * @param collisionType The new collisionType for the universe.
 * @param bodyType The new bodyType for the universe.
 * @param jointPositioningType The new jointPositioningType for the universe.
 * @param isArchived If the universe is to be archived.
 * @param isFriendsOnly If the universe is to be for friends only.
 * @param genre The new genre for the universe.
 * @param playableDevices The allowed devices the universe can be played on.
 * @param avatarAssetOverrides The overrides for avatar assets.
 * @param avatarMinScales The min scales allowed for avatars.
 * @param avatarMaxScales The max scales allowed for avatars.
 * @param studioAccessToApisAllowed If studio is allowed to access apis.
 * @param isThirdPartyTeleportAllowed If third party teleports are allowed.
 * @param isThirdPartyAssetAllowed if third party assets are allowed.
 * @param isThirdPartyPurchaseAllowed If third party purchases are allowed.
 * @param isMeshTextureApiAccessAllowed If mesh and texture apis can be used for this universe.
 * @param isForSale If the universe is for sale.
 * @param price The price of the universe.
 * 
 * @example
 * const { data:universe } = await ClassicDevelopApi.updateUniverseConfiguration_V2({
     universeId: 5638577595, playableDevices: [ "Computer" ], avatarType: "PlayerChoice"
   })
 * @exampleData {"allowPrivateServers":false,"privateServerPrice":null,"optInRegions":[],"isMeshTextureApiAccessAllowed":true,"id":5638577595,"name":"New name!","description":"","universeAvatarType":"PlayerChoice","universeAnimationType":"PlayerChoice","universeCollisionType":"OuterBox","universeJointPositioningType":"ArtistIntent","isArchived":false,"isFriendsOnly":false,"genre":"All","playableDevices":["Computer"],"isForSale":false,"price":0,"universeAvatarMinScales":{"height":0.9,"width":0.7,"head":0.95,"depth":0,"proportion":0,"bodyType":0},"universeAvatarMaxScales":{"height":1.05,"width":1,"head":1,"depth":0,"proportion":1,"bodyType":1},"studioAccessToApisAllowed":false,"universeAvatarAssetOverrides":[],"permissions":{"isThirdPartyTeleportAllowed":false,"isThirdPartyAssetAllowed":false,"isThirdPartyPurchaseAllowed":false}} 
 * @exampleRawBody {"allowPrivateServers":false,"privateServerPrice":null,"optInRegions":[],"isMeshTextureApiAccessAllowed":true,"id":5638577595,"name":"New name!","description":"","universeAvatarType":"PlayerChoice","universeAnimationType":"PlayerChoice","universeCollisionType":"OuterBox","universeJointPositioningType":"ArtistIntent","isArchived":false,"isFriendsOnly":false,"genre":"All","playableDevices":["Computer"],"isForSale":false,"price":0,"universeAvatarAssetOverrides":[],"universeAvatarMinScales":{"height":0.9,"width":0.7,"head":0.95,"depth":0,"proportion":0,"bodyType":0},"universeAvatarMaxScales":{"height":1.05,"width":1,"head":1,"depth":0,"proportion":1,"bodyType":1},"studioAccessToApisAllowed":false,"permissions":{"IsThirdPartyTeleportAllowed":false,"IsThirdPartyAssetAllowed":false,"IsThirdPartyPurchaseAllowed":false}}
 */
export const updateUniverseConfiguration_V2 = createApiMethod(async <
  UniverseId extends Identifier, AllowPrivateServers extends boolean, PrivateServerPrice extends number, Name extends string,
  Description extends string, AvatarType extends UniverseAvatarType, AnimationType extends UniverseAnimationType,
  CollisionType extends UniverseCollisionType, JointPositioningType extends UniverseJointPositioningType,
  IsArchived extends boolean, IsFriendsOnly extends boolean, Genre extends UniverseGenre,
  PlayableDevice extends UniversePlayableDevice, const AvatarAssetOverrides extends ArrayNonEmptyIfConst<PrettifiedAvatarAssetOverride>,
  const AvatarMinScales extends AvatarScales, const AvatarMaxScales extends AvatarScales, StudioAccessToApisAllowed extends boolean,
  IsThirdPartyTeleportAllowed extends boolean, IsThirdPartyAssetAllowed extends boolean,
  IsThirdPartyPurchaseAllowed extends boolean, OptInRegion extends UniverseRegion, OptOutRegion extends UniverseRegion,
  IsMeshTextureApiAccessAllowed extends boolean, Price extends number, IsForSale extends boolean = false,
>(
  {
    universeId, name, description, avatarType, animationType, collisionType, jointPositioningType, isArchived, isFriendsOnly,
    genre, playableDevices, avatarAssetOverrides, avatarMinScales, avatarMaxScales, studioAccessToApisAllowed,
    isThirdPartyTeleportAllowed, isThirdPartyAssetAllowed, isThirdPartyPurchaseAllowed,
    isMeshTextureApiAccessAllowed, allowPrivateServers, privateServerPrice, price, isForSale
  }: {
    universeId: UniverseId, name?: Name, description?: Description, avatarType?: AvatarType,
    animationType?: AnimationType, collisionType?: CollisionType, jointPositioningType?: JointPositioningType, 
    isArchived?: IsArchived, isFriendsOnly?: IsFriendsOnly, genre?: Genre, playableDevices?: PlayableDevice[],
    avatarAssetOverrides?: AvatarAssetOverrides, avatarMinScales?: AvatarMinScales,
    avatarMaxScales?: AvatarMaxScales, studioAccessToApisAllowed?: StudioAccessToApisAllowed,
    isThirdPartyTeleportAllowed?: IsThirdPartyTeleportAllowed, isThirdPartyAssetAllowed?: IsThirdPartyAssetAllowed,
    isThirdPartyPurchaseAllowed?: IsThirdPartyPurchaseAllowed, isMeshTextureApiAccessAllowed?: IsMeshTextureApiAccessAllowed,
  }
  & ObjectEither<{ isForSale: IsForSale, price: Price }, { isForSale?: false }>
  & ObjectEither<{ allowPrivateServers: AllowPrivateServers, privateServerPrice: PrivateServerPrice }, { allowPrivateServers?: false }>
): (ApiMethod<
  RawUpdateUniverseConfigurationData_V2<
    UniverseId, AllowPrivateServers, PrivateServerPrice, Name, Description, AvatarType, AnimationType,
    CollisionType, JointPositioningType, IsArchived, IsFriendsOnly, Genre, PlayableDevice,
    AvatarMinScales, AvatarMaxScales, StudioAccessToApisAllowed, IsThirdPartyTeleportAllowed, IsThirdPartyAssetAllowed,
    IsThirdPartyPurchaseAllowed, OptInRegion, OptOutRegion, IsMeshTextureApiAccessAllowed, Price, IsForSale, AvatarAssetOverrides
  >,
  PrettifiedUpdateUniverseConfigurationData_V2<
    UniverseId, AllowPrivateServers, PrivateServerPrice, Name, Description, AvatarType, AnimationType,
    CollisionType, JointPositioningType, IsArchived, IsFriendsOnly, Genre, PlayableDevice,
    AvatarMinScales, AvatarMaxScales, StudioAccessToApisAllowed, IsThirdPartyTeleportAllowed, IsThirdPartyAssetAllowed,
    IsThirdPartyPurchaseAllowed, OptInRegion, OptOutRegion, IsMeshTextureApiAccessAllowed, Price, IsForSale, AvatarAssetOverrides
  >
>) => ({
  method: "PATCH",
  path: `/v2/universes/${universeId}/configuration`,
  body: {
    allowPrivateServers, privateServerPrice, name, description,
    universeAvatarType: avatarType, universeAnimationType: animationType,
    universeCollisionType: collisionType, universeJointPositioningType: jointPositioningType,
    isArchived, isFriendsOnly, genre, playableDevices, isForSale, price, universeAvatarAssetOverrides: avatarAssetOverrides,
    universeAvatarMinScales: avatarMinScales, universeAvatarMaxScales: avatarMaxScales, studioAccessToApisAllowed,
    permissions: {
      IsThirdPartyTeleportAllowed: isThirdPartyTeleportAllowed, IsThirdPartyAssetAllowed: isThirdPartyAssetAllowed,
      IsThirdPartyPurchaseAllowed: isThirdPartyPurchaseAllowed
    },
    isMeshTextureApiAccessAllowed
  },
  name: `updateUniverseConfiguration_V2`,

  formatRawDataFn: ({ permissions, universeAvatarAssetOverrides, ...rest }) => ({
    ...rest,
    universeAvatarAssetOverrides: (universeAvatarAssetOverrides as any as RawAvatarAssetOverride[]).map(({ assetID, assetTypeID, ...rest2 }) => ({
      assetId: assetID, assetTypeId: assetTypeID, ...rest2
    })) as any,
    permissions: {
      isThirdPartyTeleportAllowed: permissions.IsThirdPartyTeleportAllowed,
      isThirdPartyAssetAllowed: permissions.IsThirdPartyAssetAllowed,
      isThirdPartyPurchaseAllowed: permissions.IsThirdPartyPurchaseAllowed
    }
  })
}))
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
 * const { data:success } = await ClassicDevelopApi.closeTeamTestSession({
     placeId: 16349154726, jobId: "0e6f3d93-a4aa-44ab-b3b7-9169ddc1d9a1"
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const closeTeamTestSession = createApiMethod(async (
  { placeId, jobId }: { placeId: Identifier, jobId: string }
): ApiMethod<any> => ({
  method: "DELETE",
  path: `/v2/teamtest/${placeId}`,
  searchParams: { gameId: jobId },
  name: `closeTeamTestSession`,
}))
//////////////////////////////////////////////////////////////////////////////////
