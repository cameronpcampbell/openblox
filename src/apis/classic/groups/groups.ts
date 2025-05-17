// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, dataIsSuccess, formDataBuilder, toCamel, toPascal } from "../../../utils/utils"
import { readFile } from "../../../file"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, UnionToArray, ArrayNonEmptyIfConst } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { AddGroupSocialLinkData, AuthenticatedUserGroupMembershipInfoData, BanGroupMemberData, FormattedAllGroupRolesForUserData_V1, GroupAuditLogActionType, GroupPayoutRestrictionsInfoData, GroupRelationshipType, GroupRolePermissions, GroupRolePermissionsData, GroupsConfigMetadataData, GroupSettingsData, GroupsMetadataData, NewSocialLinkRequest, PrettifiedAllGroupRolesForUserData_V2, PrettifiedAllRolesForGroupData, PrettifiedAuthenticatedUserPendingGroupsData, PrettifiedGroupAuditLogsData, PrettifiedGroupBansData, PrettifiedGroupIdsToGroupsInfoData, PrettifiedGroupInfoData, PrettifiedGroupJoinRequestForUser, PrettifiedGroupJoinRequests, PrettifiedGroupLookupSearch, PrettifiedGroupMembersData, PrettifiedGroupMembersWithRoleData, PrettifiedGroupNameHistoryData, PrettifiedGroupPayoutsInfoData, PrettifiedGroupPermissionsForAllRoles, PrettifiedGroupPolicyInfoData, PrettifiedGroupRelationshipsData, PrettifiedGroupRolesFromIdsData, PrettifiedGroupSearchData, PrettifiedGroupSearchMetadata, PrettifiedGroupShoutData, PrettifiedGroupSocialLinksData, PrettifiedGroupsThatUsersFriendsAreInData, PrettifiedGroupWallPostsData_V1, PrettifiedGroupWallPostsData_V2, PrettifiedPrimaryGroupForUserData, RawAllGroupRolesForUserData_V1, RawAllGroupRolesForUserData_V2, RawAllRolesForGroupData, RawAuthenticatedUserPendingGroupsData, RawGroupAuditLogsData, RawGroupBansData, RawGroupIdsToGroupsInfoData, RawGroupInfoData, RawGroupJoinRequestForUser, RawGroupJoinRequests, RawGroupLookupSearch, RawGroupMembersData, RawGroupMembersWithRoleData, RawGroupNameHistoryData, RawGroupPayoutsInfoData, RawGroupPermissionsForAllRoles, RawGroupPolicyInfoData, RawGroupRelationshipsData, RawGroupRolesFromIdsData, RawGroupSearchData, RawGroupSearchMetadata, RawGroupShoutData, RawGroupSocialLinksData, RawGroupsThatUsersFriendsAreInData, RawGroupWallPostsData_V1, RawGroupWallPostsData_V2, RawPrimaryGroupForUserData, UpdateRoleSetData, UpdateRoleSetRequest } from "./groups.types"
import type { SortOrder } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicGroups", baseUrl: "https://groups.roblox.com" })
/////////////////////////////////////////////////////////////////////////////////


// [ Featured Content ] /////////////////////////////////////////////////////////
/**
 * Gets the featured event for a group.
 * @endpoint GET /v1/featured-content/event
 * 
 * @param groupId The ID of the group to get the event for.
 * 
 * @example const { data:eventId } = await ClassicGroupsApi.featuredEvent({ groupId: 15842838 })
 * @exampleData "6533473338141704368"
 * @exampleRawBody {"groupId":15842838,"contentType":"event","contentId":"6533473338141704368"}
 */
export const featuredEvent = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<{ groupId: GroupId, contentType: "event", contentId: Identifier } | null, Identifier | null> => ({
  method: "GET",
  path: `/v1/featured-content/event`,
  searchParams: { groupId },
  name: `featuredEvent`,

  formatRawDataFn: (data) => data ? data.contentId : null
}))


/**
 * Sets a featured event for a group.
 * @endpoint POST /v1/featured-content/event
 * 
 * @param groupId The ID of the group to set the event for.
 * @param eventId The ID of the event to set.
 * 
 * @example const { data:eventId } = await ClassicGroupsApi.setFeaturedEvent({ groupId: 15842838, eventId: "5904751593700196492" })
 * @exampleData 5904751593700196492
 * @exampleRawBody {"groupId":15842838,"contentType":"event","contentId":"6533473338141704368"}
 */
export const setFeaturedEvent = createApiMethod(async <GroupId extends Identifier, EventId extends Identifier>(
  { groupId, eventId }: { groupId: Identifier, eventId: EventId }
): ApiMethod<{ groupId: GroupId, contentType: "event", contentId: EventId }, EventId> => ({
  method: "POST",
  path: `/v1/featured-content/event`,
  searchParams: { groupId, eventId },
  name: `setFeaturedEvent`,

  formatRawDataFn: ({ contentId }) => contentId as any
}))

/**
 * Removes a featured event for a group.
 * @endpoint POST /v1/featured-content/event
 * 
 * @param groupId The ID of the group to remove the event from.
 * @param eventId The ID of the event to remove.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeFeaturedEvent({ groupId: 15842838, eventId: "5904751593700196492" })
 * @exampleData true
 * @exampleRawBody ""
 */
export const removeFeaturedEvent = createApiMethod(async <GroupId extends Identifier, EventId extends Identifier>(
  { groupId, eventId }: { groupId: Identifier, eventId: EventId }
): ApiMethod<"", boolean> => ({
  method: "DELETE",
  path: `/v1/featured-content/event`,
  searchParams: { groupId, eventId },
  name: `removeFeaturedEvent`,

  formatRawDataFn: rawData => rawData === ""
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Groups ] ////////////////////////////////////////////////////////////////////
/**
 * Gets information about a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}
 * @tags [ "?Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:groupInfo } = await ClassicGroupsApi.groupInfo({ groupId: 5850082})
 * @exampleData { id: 5850082, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }
 * @exampleRawBody { id: 5850082, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }
 */
export const groupInfo = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<RawGroupInfoData<GroupId>, PrettifiedGroupInfoData<GroupId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}`,
  name: "universeIdFromPlaceId",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    if (!obj?.shout) return
    obj.shout.created = new Date(obj.shout.created); obj.shout.updated = new Date(obj.shout.updated)
  })
}))


/**
 * Gets audit log entries for a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}/audit-log
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param actionType The action to filter the audit logs by. (no filter will be applied if actionType is undefined).
 * @param userId Filter for specific user by their id.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:auditLog } = await ClassicGroupsApi.groupAuditLogs({ groupId: 5850082 })
 * @exampleData { previousPageCursor: null, nextPageCursor: null, data: [ { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 6333562, TargetGroupName: "Mine Ways Talk Show" }, created: "2020-05-18T12:06:34Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 5257567, TargetGroupName: "The X1 Team" }, created: "2020-05-13T13:52:57Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 5894486, TargetGroupName: "Sky-Blox Studio" }, created: "2020-05-13T13:52:56Z" } ] }
 * @exampleRawBody [ { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 6333562, targetGroupName: "Mine Ways Talk Show" }, created: "2020-05-18T12:06:34Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 5257567, targetGroupName: "The X1 Team" }, created: "2020-05-13T13:52:57Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 5894486, targetGroupName: "Sky-Blox Studio" }, created: "2020-05-13T13:52:56Z" } ]
 */
export const groupAuditLogs = createApiMethod(async (
  { groupId, actionType, userId, limit, sortOrder, cursor }:
  { groupId: Identifier, actionType?: GroupAuditLogActionType, userId?: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupAuditLogsData, PrettifiedGroupAuditLogsData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/audit-log`,
  searchParams: { actionType, userId, limit, sortOrder, cursor },
  name: "groupAuditLog",

  formatRawDataFn: ({ data }) => {
    let formattedData = toCamel<RawGroupAuditLogsData["data"], PrettifiedGroupAuditLogsData>(data)
    formattedData.forEach(log => {
      log.actionType = log.actionType.replaceAll(/ +/g, "") as typeof log.actionType
    })
    return formattedData
  }
}))


/**
 * Gets name history of a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}/name-history
 * 
 * @param groupId The id of the group.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:nameHistory } = await ClassicGroupsApi.groupNameHistory({ groupId: 5850082 })
 * @exampleData [ { name: "Nameless Game Studio", created: 2022-01-06T00:01:47.193Z } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: null, data: [ { name: "Nameless Game Studio", created: "2022-01-06T00:01:47.193Z" } ] }
 */
export const groupNameHistory = createApiMethod(async (
  { groupId, limit, sortOrder, cursor }:
  { groupId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupNameHistoryData, PrettifiedGroupNameHistoryData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/name-history`,
  searchParams: { limit, sortOrder, cursor },
  name: "groupNameHistory",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data, obj => {
    obj.forEach(name => {
      name.created = new Date(name.created)
    })
  })
}))


/**
 * Gets settings for a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}/settings
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to get settings for.
 * 
 * @example const { data:settings } = await ClassicGroupsApi.groupSettings({ groupId: 5850082 })
 * @exampleData { isApprovalRequired: true, isBuildersClubRequired: false, areEnemiesAllowed: true, areGroupFundsVisible: false, areGroupGamesVisible: true, isGroupNameChangeEnabled: true }
 * @exampleRawBody { isApprovalRequired: true, isBuildersClubRequired: false, areEnemiesAllowed: true, areGroupFundsVisible: false, areGroupGamesVisible: true, isGroupNameChangeEnabled: true }
 */
export const groupSettings = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<GroupSettingsData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/settings`,
  name: "groupSettings"
}))


/**
 * Sets settings for a group.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/settings
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param newSettings The new settings for the group.
 * 
 * @example const { data:success } = await ClassicGroupsApi.setGroupSettings({ groupId: 5850082, newSettings: {
    isApprovalRequired: true,
    isBuildersClubRequired: false,
    areEnemiesAllowed: true,
    areGroupFundsVisible: false,
    areGroupGamesVisible: true, isGroupNameChangeEnabled: true
  }})
 * @exampleData boolean
 * @exampleRawBody {}
 */
export const setGroupSettings = createApiMethod(async (
  { groupId, newSettings }: { groupId: Identifier, newSettings: GroupSettingsData }
): ApiMethod<boolean, {}> => ({
  method: "PATCH",
  path: `/v1/groups/${groupId}/settings`,
  body: newSettings,
  name: "setGroupSettings",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Gets groups configuration metadata.
 * @category Groups
 * @endpoint GET /v1/groups/configuration/metadata
 * 
 * @example const { data:configMetadata } = await ClassicGroupsApi.groupsConfigMetadata()
 * @exampleData { groupConfiguration: { nameMaxLength: 50, descriptionMaxLength: 1000, iconMaxFileSizeMb: 20, cost: 100, isUsingTwoStepWebviewComponent: true }, recurringPayoutsConfiguration: { maxPayoutPartners: 20 }, roleConfiguration: { nameMaxLength: 100, descriptionMaxLength: 1000, limit: 40, cost: 25, minRank: 0, maxRank: 255 }, groupNameChangeConfiguration: { cost: 100, cooldownInDays: 90, ownershipCooldownInDays: 90 }, isPremiumPayoutsEnabled: true, isDefaultEmblemPolicyEnabled: true }
 * @exampleRawBody { groupConfiguration: { nameMaxLength: 50, descriptionMaxLength: 1000, iconMaxFileSizeMb: 20, cost: 100, isUsingTwoStepWebviewComponent: true }, recurringPayoutsConfiguration: { maxPayoutPartners: 20 }, roleConfiguration: { nameMaxLength: 100, descriptionMaxLength: 1000, limit: 40, cost: 25, minRank: 0, maxRank: 255 }, groupNameChangeConfiguration: { cost: 100, cooldownInDays: 90, ownershipCooldownInDays: 90 }, isPremiumPayoutsEnabled: true, isDefaultEmblemPolicyEnabled: true }
 */
export const groupsConfigMetadata = createApiMethod(async (
): ApiMethod<GroupsConfigMetadataData> => ({
  method: "GET",
  path: `/v1/groups/configuration/metadata`,
  name: "groupsConfigMetadata"
}))


/**
 * Gets groups metadata.
 * @category Groups
 * @endpoint GET /v1/groups/metadata
 * 
 * @example const { data:metadata } = await ClassicGroupsApi.groupsMetadata()
 * @exampleData { groupLimit: 100, currentGroupCount: 57, groupStatusMaxLength: 255, groupPostMaxLength: 500, isGroupWallNotificationsEnabled: false,
 groupWallNotificationsSubscribeIntervalInMilliseconds: 60000, areProfileGroupsHidden: false, isGroupDetailsPolicyEnabled: true, showPreviousGroupNames: true }
 * @exampleRawBody { groupLimit: 100, currentGroupCount: 57, groupStatusMaxLength: 255, groupPostMaxLength: 500, isGroupWallNotificationsEnabled: false,
 groupWallNotificationsSubscribeIntervalInMilliseconds: 60000, areProfileGroupsHidden: false, isGroupDetailsPolicyEnabled: true, showPreviousGroupNames: true }
 */
export const groupsMetadata = createApiMethod(async (
): ApiMethod<GroupsMetadataData> => ({
  method: "GET",
  path: `/v1/groups/metadata`,
  name: "groupsMetadata"
}))


/**
 * Gets group policy info used for compliance.
 * @category Groups
 * @endpoint GET /v1/groups/policies
 * @tags [ "Cookie" ]
 * 
 * @param groupIds the ids of groups to get policy info for.
 * 
 * @example const { data:policyInfo } = await ClassicGroupsApi.groupsPolicyInfo({ groupIds: [ 5850082 ] })
 * @exampleData { "5850082": { canViewGroup: true } }
 * @exampleRawBody { groups: [ { canViewGroup: true, groupId: 5850082 } ] }
 */
export const groupsPolicyInfo = createApiMethod(async <GroupId extends Identifier>(
  { groupIds }: { groupIds: ArrayNonEmptyIfConst<GroupId> }
): ApiMethod<RawGroupPolicyInfoData<GroupId>, PrettifiedGroupPolicyInfoData<GroupId>> => ({
  method: "POST",
  path: `/v1/groups/policies`,
  body: { groupIds },
  name: "groupsPolicyInfo",

  formatRawDataFn: ({ groups }) => createObjectMapByKeyWithMiddleware(groups, "groupId", ({ groupId, ...rest }) => ({ ...rest }))
}))


/**
 * Sets group description.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/description
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the description for.
 * @param newDescription The content of the new description.
 * 
 * @example const { data:newDescription } = await ClassicGroupsApi.setGroupDescription({ groupId: 5850082, newDescription: "Hello World!" })
 * @exampleData "Hello World!"
 * @exampleRawBody { newDescription: "Hello World!" }
 */
export const setGroupDescription = createApiMethod(async <NewDescription extends string>(
  { groupId, newDescription }: { groupId: Identifier, newDescription: NewDescription }
): ApiMethod<{ newDescription: NewDescription }, NewDescription> => ({
  method: "PATCH",
  path: `/v1/groups/${groupId}/description`,
  body: { description: newDescription },
  name: "setGroupDescription",

  formatRawDataFn: ({ newDescription }) => newDescription as any
}))


/**
 * Sets group shout (status).
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/status
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the shout for.
 * @param message The content of the new shout.
 * 
 * @example const { data:newShout } = await ClassicGroupsApi.setGroupShout({ groupId: 5850082, newShout: "Hello World!" })
 * @exampleData { body: "Hello World!", poster: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, created: 2020-03-31T18:36:51.607Z, updated: 2023-09-15T16:21:00.272Z }
 * @exampleRawBody { body: "Hello World!", poster: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, created: "2020-03-31T18:36:51.607Z", updated: "2023-09-15T16:21:00.272Z" }
 */
export const setGroupShout = createApiMethod(async <NewShout extends string>(
  { groupId, newShout }: { groupId: Identifier, newShout: NewShout }
): ApiMethod<RawGroupShoutData<NewShout>, PrettifiedGroupShoutData<NewShout>> => ({
  method: "PATCH",
  path: `/v1/groups/${groupId}/status`,
  body: { message: newShout },
  name: "setGroupShout",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  })
}))


/**
 * Sets group icon.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/status
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the icon for.
 * @param newIcon The new icon for the group.
 * 
 * @example const { data:success } = await ClassicGroupsApi.setGroupIcon({ groupId: 5850082, newIcon: "./newGroupIcon.png" })
 * @exampleData true
 * @exampleRawBody {}
 */
export const setGroupIcon = createApiMethod(async (
  { groupId, newIcon }: { groupId: Identifier, newIcon: string | File }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/groups/icon`,
  searchParams: { groupId },
  formData: formDataBuilder()
    .append("Files", typeof newIcon == "string" ? new File([ new Blob([ await readFile(newIcon) ]) ], "Files") : newIcon),
  name: "setGroupIcon",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Membership ] ////////////////////////////////////////////////////////////////
/**
 * Batch declines join requests.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/join-requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to batch decline join requests for.
 * @param userIds The ids of the user to decline.
 * 
 * @example const { data:success } = await ClassicGroupsApi.batchDeclineGroupJoinRequests({ groupId: 5850082, userIds: [2655994471] })
 * @exampleData true
 * @exampleRawBody {}
 */
export const batchDeclineGroupJoinRequests = createApiMethod(async (
  { groupId, userIds }: { groupId: Identifier, userIds: ArrayNonEmptyIfConst<Identifier> }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/join-requests`,
  body: { UserIds: userIds },
  name: "batchDeclineGroupJoinRequests",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * gets join requests.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/join-requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to get join requests for.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:joinRequests } = await ClassicGroupsApi.groupJoinRequests({ groupId: 5850082 })
 * @exampleData [ { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: 2023-09-12T09:35:49.287Z } ]
 * @exampleRawBody [ { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: "2023-09-12T09:35:49.287Z" } ]
 */
export const groupJoinRequests = createApiMethod(async (
  { groupId, limit, sortOrder, cursor }: { groupId: Identifier, limit?: 10|25|50|100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupJoinRequests, PrettifiedGroupJoinRequests> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/join-requests`,
  searchParams: { limit, sortOrder, cursor },
  name: "groupJoinRequests",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data, obj => obj.forEach(request => request.created = new Date(request.created)))
}))

/**
 * Batch accepts join requests.
 * @category Membership
 * @endpoint POST /v1/groups/{groupId}/join-requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to batch accepts join requests for.
 * @param userIds The ids of the user to accept.
 * 
 * @example const { data:success } = await ClassicGroupsApi.batchAcceptGroupJoinRequests({ groupId: 5850082, userIds: [2655994471] })
 * @exampleData true
 * @exampleRawBody {}
 */
export const batchAcceptGroupJoinRequests = createApiMethod(async (
  { groupId, userIds }: { groupId: Identifier, userIds: ArrayNonEmptyIfConst<Identifier> }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/join-requests`,
  body: { UserIds: userIds },
  name: "batchAcceptGroupJoinRequests",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Declines a join request.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/join-requests/users/${userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to decline a join request for.
 * @param userId The id of the user to decline.
 * 
 * @example const { data:success } = await ClassicGroupsApi.declineGroupJoinRequest({ groupId: 5850082, userId: 2655994471 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const declineGroupJoinRequest = createApiMethod(async (
  { groupId, userId }: { groupId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/join-requests/users/${userId}`,
  name: "declineGroupJoinRequest",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Gets a join request for a user.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/join-requests/users/${userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param userId The id of the user.
 * 
 * @example const { data:joinRequest } = await ClassicGroupsApi.groupJoinRequestInfo({ groupId: 5850082, userId: 2655994471 })
 * @exampleData { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: 2023-09-12T11:31:18.933Z }
 * @exampleRawBody { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: "2023-09-12T11:31:18.933Z" }
 */
export const groupJoinRequestInfo = createApiMethod(async <UserId extends Identifier>(
  { groupId, userId }: { groupId: Identifier, userId: UserId }
): ApiMethod<RawGroupJoinRequestForUser<UserId>, PrettifiedGroupJoinRequestForUser<UserId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/join-requests/users/${userId}`,
  name: "groupJoinRequestInfo",

  formatRawDataFn: (rawData) => !Object.keys(rawData) ? {} : cloneAndMutateObject(rawData, obj => {
    (obj as any as UnionToArray<typeof obj>[1]).created = new Date((obj as any as UnionToArray<typeof obj>[1]).created)
  })
}))


/**
 * Accepts a join request.
 * @category Membership
 * @endpoint POST /v1/groups/{groupId}/join-requests/users/${userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to accept a join request for.
 * @param userId The id of the user to accept.
 * 
 * @example const { data:success } = await ClassicGroupsApi.acceptGroupJoinRequest({ groupId: 5850082, userId: 2655994471 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const acceptGroupJoinRequest = createApiMethod(async (
  { groupId, userId }: { groupId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/join-requests/users/${userId}`,
  name: "acceptGroupJoinRequest",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))

/**
 * Gets group membership info for the currently authenticated user.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/membership
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to get membership info for.
 * 
 * @example const { data:membershipInfo } = await ClassicGroupsApi.authenticatedUserGroupMembershipInfo({ groupId: 5850082 })
 * @exampleData { groupId: 5850082, isPrimary: false, isPendingJoin: false, userRole: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: true, deleteFromWall: true, viewStatus: true, postToStatus: true }, groupMembershipPermissions: { changeRank: true, inviteMembers: true, removeMembers: true }, groupManagementPermissions: { manageRelationships: true, manageClan: true, viewAuditLogs: true }, groupEconomyPermissions: { spendGroupFunds: true, advertiseGroup: true, createItems: true, manageItems: true, addGroupPlaces: true, manageGroupGames: true, viewGroupPayouts: true, viewAnalytics: true }, groupOpenCloudPermissions: { useCloudAuthentication: true, administerCloudAuthentication: true } }, areGroupGamesVisible: true, areGroupFundsVisible: false, areEnemiesAllowed: true, canConfigure: true }
 * @exampleRawBody { groupId: 5850082, isPrimary: false, isPendingJoin: false, userRole: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: true, deleteFromWall: true, viewStatus: true, postToStatus: true }, groupMembershipPermissions: { changeRank: true, inviteMembers: true, removeMembers: true }, groupManagementPermissions: { manageRelationships: true, manageClan: true, viewAuditLogs: true }, groupEconomyPermissions: { spendGroupFunds: true, advertiseGroup: true, createItems: true, manageItems: true, addGroupPlaces: true, manageGroupGames: true, viewGroupPayouts: true, viewAnalytics: true }, groupOpenCloudPermissions: { useCloudAuthentication: true, administerCloudAuthentication: true } }, areGroupGamesVisible: true, areGroupFundsVisible: false, areEnemiesAllowed: true, canConfigure: true }
 */
export const authenticatedUserGroupMembershipInfo = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<AuthenticatedUserGroupMembershipInfoData<GroupId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/membership`,
  name: "authenticatedUserGroupMembershipInfo"
}))

/**
 * Gets all roles in a group.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/roles
 * 
 * @param groupId The id of the group to get roles for.
 * 
 * @example const { data:roles } = await ClassicGroupsApi.groupRoles({ groupId: 5850082 })
 * @exampleData [ { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0, memberCount: 0 }, { id: 38353811, name: "Owner", description: "", rank: 255, memberCount: 1 } ]
 * @exampleRawBody { groupId: 5850082, roles: [ { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0, memberCount: 0 }, { id: 38353811, name: "Owner", description: "", rank: 255, memberCount: 1 } ] }
 */
export const groupRoles = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<RawAllRolesForGroupData<GroupId>, PrettifiedAllRolesForGroupData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/roles`,
  name: "groupRoles",

  formatRawDataFn: ({ roles }) => roles
}))


/**
 * Gets group members that have a specified role.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/roles/{roleSetId}/users
 * 
 * @param groupId The id of the group.
 * @param roleSetId The id of the role.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:membersWithRole } = await ClassicGroupsApi.groupMembersWithRole({ groupId: 5850082, roleSetId: 38353811 })
 * @exampleData [ { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: null, data: [ { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" } ] }
 */
export const groupMembersWithRole = createApiMethod(async (
  { groupId, roleSetId, limit, sortOrder, cursor }:
  { groupId: Identifier, roleSetId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupMembersWithRoleData, PrettifiedGroupMembersWithRoleData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/roles/${roleSetId}/users`,
  searchParams: { limit, sortOrder, cursor },
  name: "groupMembersWithRole",

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets a page of members of a group.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/users
 * 
 * @param groupId The id of the group.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:members } = await ClassicGroupsApi.groupMembers({ groupId: 5850082 })
 * @exampleData [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: "3023291639_1_8ba111cfa4097b6dd27d851a15353a1f", data: [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } } ] }
 */
export const groupMembers = createApiMethod(async (
  { groupId, limit, sortOrder, cursor }:
  { groupId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupMembersData, PrettifiedGroupMembersData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/users`,
  searchParams: { limit, sortOrder, cursor },
  name: "groupMembers",

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets groups that the authenticated user has requested to join.
 * @category Membership
 * @endpoint GET /v1/user/groups/pending
 * @tags [ "Cookie" ]
 * 
 * @example const { data:pendingGroups } = await ClassicGroupsApi.authenticatedUserPendingGroups()
 * @exampleData [ { id: 5850082, name: "lorem ipsum", description: "", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: false, hasVerifiedBadge: false } ]
 * @exampleRawBody { data: [ { id: 5850082, name: "lorem ipsum", description: "", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: false, hasVerifiedBadge: false } ] }
 */
export const authenticatedUserPendingGroups = createApiMethod(async (
): ApiMethod<RawAuthenticatedUserPendingGroupsData, PrettifiedAuthenticatedUserPendingGroupsData> => ({
  method: "GET",
  path: `/v1/user/groups/pending`,
  name: "authenticatedUserPendingGroups",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.forEach(group => {
    if (!group.shout) return
    group.shout.created = new Date(group.shout.created)
    group.shout.updated = new Date(group.shout.updated)
  }))
}))


/**
 * Gets a list of all groups the specified users' friends are in.
 * @category Membership
 * @endpoint GET /v1/users/{userId}/friends/groups/roles
 * @tags [ "Cookie" ]
 * 
 * @param userId The id of the user to get friends groups for.
 * 
 * @example const { data:groupsThatUsersFriendsAreIn } = await ClassicGroupsApi.groupsThatUsersFriendsAreIn({ userId: 45348281 })
 * @exampleData [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, groups: [ { group: { id: 5850082, name: "Lorem ipsum", description: "Lorem ipsum dolor sit amet.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 45348281, name: "MightyPart", rank: 1 } } ] } ]
 * @exampleRawBody { data: [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, groups: [ { group: { id: 5850082, name: "Lorem ipsum", description: "Lorem ipsum dolor sit amet.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 45348281, name: "MightyPart", rank: 1 } } ] } ] }
 */
export const groupsThatUsersFriendsAreIn = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<RawGroupsThatUsersFriendsAreInData, PrettifiedGroupsThatUsersFriendsAreInData> => ({
  method: "GET",
  path: `/v1/users/${userId}/friends/groups/roles`,
  name: "groupsThatUsersFriendsAreIn",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data, obj => obj.forEach(user => {
    user.groups.forEach(group => {
      if (!group.group.shout) return
      group.group.shout.created = new Date(group.group.shout.created)
      group.group.shout.updated = new Date(group.group.shout.updated)
    })
  }))
}))


/**
 * Gets a list of all roles for every group that the specified user is in.
 * @category Membership
 * @endpoint GET /v1/users/{userId}/groups/roles
 * @tags [ "Cookie" ]
 * 
 * @param userId The id of the user to get roles for.
 * 
 * @example const { data:allRoles } = await ClassicGroupsApi.allGroupRolesForUser_V1({ userId: 45348281 })
 * @exampleData [ { group: { id: 5855434, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet...", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: 'MightyPart' }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 5855434, name: "MightyPart", rank: 1 } } ]
 * @exampleRawBody { data: [ { group: { id: 5855434, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet...", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: 'MightyPart' }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 5855434, name: "MightyPart", rank: 1 } } ] }
 */
export const allGroupRolesForUser_V1 = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<RawAllGroupRolesForUserData_V1, FormattedAllGroupRolesForUserData_V1> => ({
  method: "GET",
  path: `/v1/users/${userId}/groups/roles`,
  name: "allGroupRolesForUser_V1",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data, obj => obj.forEach(group => {
    if (!group.group.shout) return
    group.group.shout.created = new Date(group.group.shout.created)
    group.group.shout.updated = new Date(group.group.shout.updated)
  }))
}))


/**
 * Removes a user from a group.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/users/{userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to remove the user from.
 * @param userId The id of the user to be removed.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeGroupMember({ groupId: 5850082, userId: 2655994471 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const removeGroupMember = createApiMethod(async (
  { groupId, userId }: { groupId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/users/${userId}`,
  name: "removeGroupMember",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Changes a members' role in a group.
 * @category Membership
 * @endpoint PATCH /v1/groups/{groupId}/users/{userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group
 * @param userId The id of the user to change role for.
 * @param roleId The id of the role.
 * 
 * @example const { data:success } = await ClassicGroupsApi.updateGroupMemberRole({ groupId: 5850082, userId: 2655994471, roleId: 38354760 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const updateGroupMemberRole = createApiMethod(async (
  { groupId, userId, roleId }: { groupId: Identifier, userId: Identifier, roleId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/groups/${groupId}/users/${userId}`,
  body: { roleId },
  name: "updateGroupMemberRole",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Revenue ] ///////////////////////////////////////////////////////////////////
/**
 * Gets values indicating if the specified group can use payout features.
 * @category Revenue
 * @endpoint GET /v1/groups/{groupId}/payout-restriction
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:payoutRestrictions } = await ClassicGroupsApi.groupPayoutRestrictionsInfo({ groupId: 5850082 })
 * @exampleData { canUseRecurringPayout: true, canUseOneTimePayout: true }
 * @exampleRawBody { canUseRecurringPayout: true, canUseOneTimePayout: true }
 */
export const groupPayoutRestrictionsInfo = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<GroupPayoutRestrictionsInfoData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/payout-restriction`,
  name: "groupPayoutRestrictionsInfo"
}))


/**
 * Gets a list of the group payout percentages.
 * @category Revenue
 * @endpoint GET /v1/groups/{groupId}/payouts
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:payouts } = await ClassicGroupsApi.groupPayoutsInfo({ groupId: 5850082 })
 * @exampleData [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, percentage: 50 } ]
 * @exampleRawBody { data: [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, percentage: 50 } ] }
 */
export const groupPayoutsInfo = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<RawGroupPayoutsInfoData, PrettifiedGroupPayoutsInfoData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/payouts`,
  name: "groupPayoutsInfo",

  formatRawDataFn: ({ data }) => data
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Relationships ] /////////////////////////////////////////////////////////////
/**
 * Gets a group's relationships.
 * @category Relationships
 * @endpoint GET /v1/groups/{groupId}/relationships/{groupRelationshipType}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param groupRelationshipType The group relationship type, "Enemies" or "Allies".
 * @param maxRows The maximum number of rows for the page request, should be at least 1.
 * @param startRowIndex The start index of the page request.
 * 
 * @example const { data:relationships } = await ClassicGroupsApi.groupRelationships({ groupId: 5850082, groupRelationshipType: "Allies", maxRows: 1 })
 * @exampleData { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ] }
 * @exampleRawBody { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ], nextRowIndex: 1 }
 */
export const groupRelationships = createApiMethod(async <GroupId extends Identifier>(
  { groupId, groupRelationshipType, maxRows = 10, startRowIndex = 0 }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, maxRows?: number, startRowIndex?: number }
): ApiMethod<RawGroupRelationshipsData<GroupId>, PrettifiedGroupRelationshipsData<GroupId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}`,
  searchParams: { StartRowIndex: startRowIndex, MaxRows: maxRows },
  name: "groupRelationships",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.relatedGroups.forEach(group => {
      if (!group.shout) return
      group.shout.created = new Date(group.shout.created)
      group.shout.updated = new Date(group.shout.updated)
    });
  }),

  getCursorsFn: ({ nextRowIndex }) => [ null, nextRowIndex ]
}))


/**
 * Batch declines relationship requests.
 * @category Relationships
 * @endpoint DELETE /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to batch decline relationship requests for.
 * @param groupRelationshipType The type of group relationship to batch decline for.
 * @param groupIds The ids of the groups to decline.
 * 
 * @example
 * const { data:success } = await ClassicGroupsApi.batchDeclineGroupRelationshipRequests({
     groupId: 5850082, groupRelationshipType: "Allies", groupIds: [15842838]
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const batchDeclineGroupRelationshipRequests = createApiMethod(async (
  { groupId, groupRelationshipType, groupIds }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, groupIds: Identifier[] }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests`,
  body: { groupIds },
  name: "batchDeclineGroupRelationshipRequests",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Gets relationship requests.
 * @category Relationships
 * @endpoint GET /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param groupRelationshipType The group relationship type, "Enemies" or "Allies".
 * @param maxRows The maximum number of rows for the page request, should be at least 1.
 * @param startRowIndex The start index of the page request.
 * 
 * @example
 * const { data:relationshipRequests, cursors } = await ClassicGroupsApi.groupRelationshipRequests({
     groupId: 5850082, groupRelationshipType: "Allies", maxRows: 1
   })
 * @exampleData { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ] }
 * @exampleRawBody { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ], nextRowIndex: 1 }
 */
export const groupRelationshipRequests = createApiMethod(async <GroupId extends Identifier>(
  { groupId, groupRelationshipType, maxRows = 10, startRowIndex = 0 }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, maxRows?: number, startRowIndex?: number }
): ApiMethod<RawGroupRelationshipsData<GroupId>, PrettifiedGroupRelationshipsData<GroupId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests`,
  searchParams: { StartRowIndex: startRowIndex, MaxRows: maxRows },
  name: "groupRelationshipRequests",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.relatedGroups.forEach(group => {
      if (!group.shout) return
      group.shout.created = new Date(group.shout.created)
      group.shout.updated = new Date(group.shout.updated)
    });
  }),

  getCursorsFn: ({ nextRowIndex }) => [ null, nextRowIndex ]
}))


/**
 * Batch accepts relationship requests.
 * @category Relationships
 * @endpoint POST /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to batch accept relationship requests for.
 * @param groupRelationshipType The type of group relationship to batch accept for.
 * @param groupIds The ids of the groups to accept.
 * 
 * @example
 * const { data:success } = await ClassicGroupsApi.batchAcceptGroupRelationshipRequests({
     groupId: 5850082, groupRelationshipType: "Allies", groupIds: [15842838]
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const batchAcceptGroupRelationshipRequests = createApiMethod(async (
  { groupId, groupRelationshipType, groupIds }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, groupIds: Identifier[] }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests`,
  body: { groupIds },
  name: "batchDeclineGroupRelationshipRequests",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Removes an already existing group relationship
 * @category Relationships
 * @endpoint POST /v1/groups/{groupId}/relationships/{groupRelationshipType}/{relatedGroupId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to remove the relationship from.
 * @param groupRelationshipType The type of group relationship to remove.
 * @param relatedGroupId The id of the group to remove.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeGroupRelationship({ groupId: 5850082, groupRelationshipType: "Allies", relatedGroupId: 3843784})
 * @exampleData true
 * @exampleRawBody {}
 */
export const removeGroupRelationship = createApiMethod(async (
  { groupId, groupRelationshipType, relatedGroupId }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, relatedGroupId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}/${relatedGroupId}`,
  name: "removeGroupRelationship",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Sends a group relationship request to a group.
 * @category Relationships
 * @endpoint POST /v1/groups/{groupId}/relationships/{groupRelationshipType}/{relatedGroupId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to send a request for.
 * @param groupRelationshipType The type of group relationship to request.
 * @param relatedGroupId The id of the group to request a relationship with.
 * 
 * @example const { data:success } = await ClassicGroupsApi.requestGroupRelationship({ groupId: 5850082, groupRelationshipType: "Allies", relatedGroupId: 3843784})
 * @exampleData true
 * @exampleRawBody {}
 */
export const requestGroupRelationship = createApiMethod(async (
  { groupId, groupRelationshipType, relatedGroupId }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, relatedGroupId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}/${relatedGroupId}`,
  name: "requestGroupRelationship",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Declines a group relationship request.
 * @category Relationships
 * @endpoint DELETE /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests/{relatedGroupId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to decline for.
 * @param groupRelationshipType The type of group relationship to decline.
 * @param relatedGroupId The id of the group to decline a relationship with.
 * 
 * @example const { data:success } = await ClassicGroupsApi.declineGroupRelationshipRequest({ groupId: 5850082, groupRelationshipType: "Allies", relatedGroupId: 3843784})
 * @exampleData true
 * @exampleRawBody {}
 */
export const declineGroupRelationshipRequest = createApiMethod(async (
  { groupId, groupRelationshipType, relatedGroupId }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, relatedGroupId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests/${relatedGroupId}`,
  name: "declineGroupRelationshipRequest",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Accepts a group relationship request.
 * @category Relationships
 * @endpoint POST /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests/{relatedGroupId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to accept for.
 * @param groupRelationshipType The type of group relationship to accept.
 * @param relatedGroupId The id of the group to accept a relationship with.
 * 
 * @example const { data:success } = await ClassicGroupsApi.acceptGroupRelationshipRequest({ groupId: 5850082, groupRelationshipType: "Allies", relatedGroupId: 3843784})
 * @exampleData true
 * @exampleRawBody {}
 */
export const acceptGroupRelationshipRequest = createApiMethod(async (
  { groupId, groupRelationshipType, relatedGroupId }:
  { groupId: Identifier, groupRelationshipType: GroupRelationshipType, relatedGroupId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests/${relatedGroupId}`,
  name: "acceptGroupRelationshipRequest",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Permissions ] ///////////////////////////////////////////////////////////////
/**
 * Gets permissions for a role in a group.
 * @category Permissions
 * @endpoint GET /v1/groups/{groupId}/roles/{roleSetId}/permissions
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param roleSetId The id of the role to get permissions for.
 * 
 * @example const { data:rolePerms } = await ClassicGroupsApi.groupPermissionsForRole({ groupId: 5850082, roleSetId: 38353814 })
 * @exampleData { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 * @exampleRawBody { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 */
export const groupPermissionsForRole = createApiMethod(async <GroupId extends Identifier, RoleSetId extends Identifier>(
  { groupId, roleSetId }: { groupId: GroupId, roleSetId: RoleSetId }
): ApiMethod<GroupRolePermissionsData<GroupId, RoleSetId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/roles/${roleSetId}/permissions`,
  name: "groupPermissionsForRole"
}))


/**
 * Sets permissions for a role in a group.
 * @category Permissions
 * @endpoint PATCH /v1/groups/{groupId}/roles/{roleSetId}/permissions
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param roleSetId The id of the role to set permissions for.
 * @param permissions An object of permissions to set.
 * 
 * @example
 * const { data:success } = await ClassicGroupsApi.setGroupRolePermissions({
     groupId: 5850082, roleSetId: 38353813, permissions: { viewStatus: true }
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const setGroupRolePermissions = createApiMethod(async <GroupId extends Identifier, RoleSetId extends Identifier>(
  { groupId, roleSetId, permissions }:
  { groupId: GroupId, roleSetId: RoleSetId, permissions: GroupRolePermissions }
): ApiMethod<{}, boolean> => ({
  method: "PATCH",
  path: `/v1/groups/${groupId}/roles/${roleSetId}/permissions`,
  body: { permissions: toPascal(permissions) },
  name: "setGroupRolePermissions",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Gets permissions for the guest role of a group.
 * @category Permissions
 * @endpoint GET /v1/groups/{groupId}/roles/guest/permissions
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:rolePerms } = await ClassicGroupsApi.groupGuestRolePermissions({ groupId: 5850082 })
 * @exampleData { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 * @exampleRawBody { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 */
export const groupGuestRolePermissions = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<GroupRolePermissionsData<GroupId, Identifier, "Guest", 0>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/roles/guest/permissions`,
  name: "groupGuestRolePermissions"
}))


/**
 * Gets permissions for all roles in a group.
 * @category Permissions
 * @endpoint GET /v1/groups/{groupId}/roles/permissions
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:allPerms } = await ClassicGroupsApi.groupPermissionsForAllRoles({ groupId: 5850082 })
 * @exampleData [ { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } } ]
 * @exampleRawBody { data: [ { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } } ] }
 */
export const groupPermissionsForAllRoles = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<RawGroupPermissionsForAllRoles<GroupId>, PrettifiedGroupPermissionsForAllRoles<GroupId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/roles/permissions`,
  name: "groupGuestRolePermissions",

  formatRawDataFn: ({ data }) => data
}))
//////////////////////////////////////////////////////////////////////////////////


// [ SOCIAL LINKS ] //////////////////////////////////////////////////////////////
/**
 * Gets socials links for a group.
 * @category Social Links
 * @endpoint GET /v1/groups/{groupId}/social-links
 * @tags [ "?Cookie" ]
 * 
 * @param groupId The id of the group to get social links for.
 * 
 * @example const { rawBody:socials } = await ClassicGroupsApi.groupSocialLinks(5850082)
 * @exampleData [ { id: 3412774, type: "Discord", url: "https://discord.gg/4hDH5s52a", title: "Support Server" } ]
 * @exampleRawBody { data: [ { id: 3412774, type: "Discord", url: "https://discord.gg/4hDH5s52a", title: "Support Server" } ] }
 */
export const groupSocialLinks = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<RawGroupSocialLinksData, PrettifiedGroupSocialLinksData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/social-links`,
  name: "groupSocialLinks",

  formatRawDataFn: ({ data }) => data
}))


/**
 * Adds a new social link to a group.
 * @category Social Links
 * @endpoint POST /v1/groups/{groupId}/social-links
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to add a social link to.
 * @param request The social link request data.
 * 
 * @example
 * const { data:addedSocial } = await ClassicGroupsApi.addGroupSocialLink({ groupId: 5850082, newSocial: {
     type: "Twitch",
     title: "Follow My Twitch",
     url: "twitch.tv/fooBar"
   }})
 * @exampleData { id: 10791942, type: "Twitch", url: "https://twitch.tv/fooBar", title: "Follow My Twitch" }
 * @exampleRawBody { id: 10791942, type: "Twitch", url: "https://twitch.tv/fooBar", title: "Follow My Twitch" }
 */
export const addGroupSocialLink = createApiMethod(async <const NewSocial extends NewSocialLinkRequest>(
  { groupId, newSocial }: { groupId: Identifier, newSocial: NewSocial }
): ApiMethod<AddGroupSocialLinkData<NewSocial>> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/social-links`,
  body: newSocial,
  name: "addGroupSocialLink"
}))


/**
 * Removes an existing social link from a group.
 * @category Social Links
 * @endpoint DELETE /v1/groups/{groupId}/social-links/{socialLinkId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to add a social link to.
 * @param socialLinkId The id of the social link to remove.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeGroupSocialLink({ groupId: 5850082, socialLinkId: 10792025 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const removeGroupSocialLink = createApiMethod(async (
  { groupId, socialLinkId }: { groupId: Identifier, socialLinkId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/social-links/${socialLinkId}`,
  name: "removeGroupSocialLink",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Updates an existing social link.
 * @category Social Links
 * @endpoint PATCH /v1/groups/{groupId}/social-links/{socialLinkId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to add a social link to.
 * @param newSocial The social link request data.
 * 
 * @example
 * const { data:updatedSocial } = await ClassicGroupsApi.updateGroupSocialLink({ groupId: 5850082, socialLinkId: addedSocial.id, newSocial: {
     type: "Twitch",
     title: "Follow My Twitch lol",
     url: "https://twitch.tv/fooBar"
   }})
 * @exampleData true
 * @exampleRawBody {}
 */
export const updateGroupSocialLink = createApiMethod(async <SocialLinkId extends Identifier, const NewSocial extends NewSocialLinkRequest>(
  { groupId, socialLinkId, newSocial }: { groupId: Identifier, socialLinkId: SocialLinkId, newSocial: NewSocial }
): ApiMethod<AddGroupSocialLinkData<NewSocial, SocialLinkId>> => ({
  method: "PATCH",
  path: `/v1/groups/${groupId}/social-links/${socialLinkId}`,
  body: newSocial,
  name: "updateGroupSocialLink",
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ WALL ] //////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a list of group wall posts.
 * @category Wall
 * @endpoint GET /v1/groups/{groupId}/wall/posts
 * @tags [ "?Cookie" ]
 * 
 * @param groupId The id of the group to get wall posts for.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:wallPosts } = await ClassicGroupsApi.groupWallPosts_V1({ groupId: 5850082 })
 * @exampleData [ { id: 2727146317, poster: { hasVerifiedBadge: false, userId: 45348281, username: 'MightyPart', displayName: 'MightyPart' }, body: 'Lorem Ipsum dolor sit amet...', created: 2022-11-24T15:31:28.157Z, updated: 2022-11-24T15:31:28.157Z } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: '2550358523_1_75917f56fab75bb02bd9d16be933b95a', data: [ { id: 2727146317, poster: { hasVerifiedBadge: false, userId: 45348281, username: 'MightyPart', displayName: 'MightyPart' }, body: 'Lorem Ipsum dolor sit amet...', created: "2022-11-24T15:31:28.157Z", updated: "2022-11-24T15:31:28.157Z" } ] }
 */
export const groupWallPosts_V1 = createApiMethod(async <SocialLinkId extends Identifier, const NewSocial extends NewSocialLinkRequest>(
  { groupId, limit, sortOrder, cursor }:
  { groupId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupWallPostsData_V1, PrettifiedGroupWallPostsData_V1> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/wall/posts`,
  searchParams: { limit, sortOrder, cursor },
  name: "groupWallPosts_V1",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data, obj => {
    obj.forEach(wallPost => {
      wallPost.created = new Date(wallPost.created)
      wallPost.updated = new Date(wallPost.updated)
    })
  })
}))


/**
 * (THIS ENDPOINT PROBABLY DOESN'T WORK). Subscribes the authenticated user to notifications of group wall events.
 * @category Wall
 * @endpoint GET /v1/groups/{groupId}/wall/posts/subscribe
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data } = await ClassicGroupsApi.authenticatedUserSubscribeToGroupWallNotificationEvents({ groupId: 5850082 })
 */
export const authenticatedUserSubscribeToGroupWallNotificationEvents = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<any> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/wall/subscribe`,
  name: "authenticatedUserSubscribeToGroupWallNotificationEvents",
}))


/**
 * Removes a group wall post.
 * @category Wall
 * @endpoint GET /v1/groups/{groupId}/wall/posts/{wallPostId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param wallPostId The id of the wall post to be removed.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeGroupWallPost({ groupId: 5850082, wallPostId: 2727146317 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const removeGroupWallPost = createApiMethod(async (
  { groupId, wallPostId }: { groupId: Identifier, wallPostId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/wall/posts/${wallPostId}`,
  name: "removeGroupWallPost",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Removes all group wall posts made by a specific user.
 * @category Wall
 * @endpoint GET /v1/groups/{groupId}/wall/users/{userId}/posts
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param userId The id of the user.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeAllGroupWallPostsMadeByUser({ groupId: 5850082, userId: 45348281 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const removeAllGroupWallPostsMadeByUser = createApiMethod(async (
  { groupId, userId }: { groupId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/wall/users/${userId}/posts`,
  name: "removeAllGroupWallPostsMadeByUser",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUP SEARCH ] //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Search for groups by keyword.
 * @category Group Search
 * @endpoint GET /v1/groups/search
 * 
 * @param keyword The keyword or phrase to use as the search parameter.
 * @param prioritizeExactMatch Whether or not to prioritize the exact match for the keyword.
 * @param limit The number of results to be returned.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:results } = await ClassicGroupsApi.groupSearch({ keyword: "MightyPart Games", prioritizeExactMatch: true })
 * @exampleData [ { id: 5850082, name: 'MightyPart Games', description: 'Welcome to my amazing group', memberCount: 102, previousName: 'Nameless Game Studio', publicEntryAllowed: true, created: '2020-03-29T18:15:20.1Z', updated: '2023-09-14T06:34:36.243Z', hasVerifiedBadge: false } ]
 * @exampleRawBody { keyword: 'MightyPart Games', previousPageCursor: null, nextPageCursor: 'eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImtleXdvcmQ6TWlnaHR5UGFydCBHYW1lcyIsImNvdW50IjoxMH0KOTIwMGU5MzQwMTBlM2IzOTBlNmU3M2E3MzJkNzhhYzRkZjU1ZGM2ZGEwNWUwMDRjMmM1ZmRmZDlhMzk3YjRhNA==', data: [ { id: 5850082, name: 'MightyPart Games', description: 'Welcome to my amazing group', memberCount: 102, previousName: 'Nameless Game Studio', publicEntryAllowed: true, created: '2020-03-29T18:15:20.1Z', updated: '2023-09-14T06:34:36.243Z', hasVerifiedBadge: false } ] }
 */
export const groupSearch = createApiMethod(async (
  { keyword, prioritizeExactMatch, limit, cursor }:
  { keyword: string, prioritizeExactMatch?: boolean, limit?: 10 | 25 | 50 | 100, cursor?: string }
): ApiMethod<RawGroupSearchData, PrettifiedGroupSearchData> => ({
  method: "GET",
  path: `/v1/groups/search`,
  searchParams: { keyword, prioritizeExactMatch, limit, cursor },
  name: "groupSearch",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data, obj => obj.forEach(result => {
    result.created = new Date(result.created)
    result.updated = new Date(result.updated)
  }))
}))


/**
 * Search for groups by keyword.
 * @category Group Search
 * @endpoint GET /v1/groups/search/lookup
 * 
 * @param groupName The name of the group to lookup.
 * 
 * @example const { data:results } = await ClassicGroupsApi.groupLookupSearch({ groupName: "MightyPart Games" })
 * @exampleData [ { id: 5850082, name: 'MightyPart Games', memberCount: 102, hasVerifiedBadge: false } ]
 * @exampleRawBody { data: [ { id: 5850082, name: 'MightyPart Games', memberCount: 102, hasVerifiedBadge: false } ] }
 */
export const groupLookupSearch = createApiMethod(async (
  { groupName }: { groupName: string }
): ApiMethod<RawGroupLookupSearch, PrettifiedGroupLookupSearch> => ({
  method: "GET",
  path: `/v1/groups/search/lookup`,
  searchParams: { groupName },
  name: "groupLookupSearch",

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets suggested groups and other miscellaneous information needed for the group/join page like flags.
 * @category Group Search
 * @endpoint GET /v1/groups/search/metadata
 * 
 * @example const { data:searchMetadata } = await ClassicGroupsApi.groupSearchMetadata()
 * @exampleData { suggestedGroupKeywords: [ 'Experience Studios', 'Building', 'Roleplaying', 'Fan' ], showFriendsGroupsSort: true }
 * @exampleRawBody { SuggestedGroupKeywords: [ 'Experience Studios', 'Building', 'Roleplaying', 'Fan' ], ShowFriendsGroupsSort: true }
 */
export const groupSearchMetadata = createApiMethod(async (
): ApiMethod<RawGroupSearchMetadata, PrettifiedGroupSearchMetadata> => ({
  method: "GET",
  path: `/v1/groups/search/metadata`,
  name: "groupSearchMetadata",

  formatRawDataFn: (rawData) => toCamel<RawGroupSearchMetadata, PrettifiedGroupSearchMetadata>(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a list of roles from role ids.
 * @category Roles
 * @endpoint GET /v1/roles
 * 
 * @param roleIds The ids of roles to get.
 * 
 * @example const { data:roles } = await ClassicGroupsApi.groupRolesFromIds({ roleIds: [ 38353811 ] })
 * @exampleData { '38353811': { groupId: 5850082, name: 'NamelessGuy2005 - Scriptor', rank: 255 } }
 * @exampleRawBody { data: [ { groupId: 5850082, id: 38353811, name: 'NamelessGuy2005 - Scriptor', rank: 255 } ] }
 */
export const groupRolesFromIds = createApiMethod(async <RoleId extends Identifier>(
  { roleIds }: { roleIds: ArrayNonEmptyIfConst<RoleId> }
): ApiMethod<RawGroupRolesFromIdsData<RoleId>, PrettifiedGroupRolesFromIdsData<RoleId>> => ({
  method: "GET",
  path: `/v1/roles`,
  searchParams: { ids: roleIds },
  name: "groupRolesFromIds",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", ({ id, ...rest }) => rest)
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PRIMARY GROUP ] /////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a user's primary group.
 * @category Primary Group
 * @endpoint GET /v1/users/{userId}/groups/primary/role
 * 
 * @param userId The id of the user to get the primary group for.
 * 
 * @example const { data:primaryGroup } = await ClassicGroupsApi.primaryGroupForUser({ userId: 45348281 })
 * @exampleData { group: { id: 5850082, name: "MightyPart Games", description: "Welcome to my amazing group", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }
 * @exampleRawBody { group: { id: 5850082, name: "MightyPart Games", description: "Welcome to my amazing group", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }
 */
export const primaryGroupForUser = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<RawPrimaryGroupForUserData, PrettifiedPrimaryGroupForUserData> => ({
  method: "GET",
  path: `/v1/users/${userId}/groups/primary/role`,
  name: "primaryGroupForUser",

  formatRawDataFn: (rawData) =>  cloneAndMutateObject(rawData, obj => {
    if (!obj.group.shout) return
    obj.group.shout.created = new Date(obj.group.shout.created)
    obj.group.shout.updated = new Date(obj.group.shout.updated)
  })
}))


/**
 * Removes the authenticated user's primary group.
 * @category Primary Group
 * @endpoint DELETE /v1/user/groups/primary
 * 
 * @example const { data:success } = await ClassicGroupsApi.authenticatedUserRemovePrimaryGroup()
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserRemovePrimaryGroup = createApiMethod(async (
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/user/groups/primary`,
  name: "authenticatedUserRemovePrimaryGroup",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Sets the authenticated user's primary group.
 * @category Primary Group
 * @endpoint POST /v1/user/groups/primary
 * 
 * @param groupId The id of the group to set as the primary group.
 * 
 * @example const { data:success } = await ClassicGroupsApi.authenticatedUserSetPrimaryGroup({ groupId: 5850082 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserSetPrimaryGroup = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/user/groups/primary`,
  body: { groupId },
  name: "authenticatedUserSetPrimaryGroup",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLE SETS ] /////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Updates an existing role set.
 * @category Role Sets
 * @endpoint PATCH /v1/groups/{groupId}/rolesets/{roleSetId}
 * 
 * @param groupId The id of the group.
 * @param roleSetId The id of the role to update.
 * @param request The updated information.
 *  
 * @example
 * const { data:updatedRole } = await ClassicGroupsApi.updateGroupRoleSet({ groupId: 5850082, roleSetId: 38353813, newData: {
     name: "Mighty Member",
     description: "A regular group member.",
     rank: 2
   }})
 * @exampleData { id: 38353813, name: "Mighty Member", description:  "A regular group member.", rank: 2, memberCount: 94 }
 * @exampleRawBody { id: 38353813, name: "Mighty Member", description:  "A regular group member.", rank: 2, memberCount: 94 }
 */
export const updateGroupRoleSet = createApiMethod(async <const NewRoleData extends UpdateRoleSetRequest>(
  { groupId, roleSetId, newData }: { groupId: Identifier, roleSetId: Identifier, newData: NewRoleData }
): ApiMethod<UpdateRoleSetData<NewRoleData>> => ({
  method: "PATCH",
  path: `/v1/groups/${groupId}/rolesets/${roleSetId}`,
  body: newData,
  name: "updateGroupRoleSet"
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUPS V2 ] /////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets information about multiple groups.
 * @category Groups
 * @endpoint GET /v2/groups
 * 
 * @param groupIds The id of the groups to get information for.
 *  
 * @example const { data:groupsInfo } = await ClassicGroupsApi.groupsInfo({ groupIds: [ 5850082 ] })
 * @exampleData { "5850082": { name: "MightyPart Games", description: "Welcome to my amazing group", owner: { id: 45348281, type: "User" }, created: 2020-03-29T18:15:20.100Z, hasVerifiedBadge: false } }
 * @exampleRawBody { data: [ { id: 5850082, name: "MightyPart Games", description: "Welcome to my amazing group", owner: { id: 45348281, type: "User" }, created: "2020-03-29T18:15:20.1Z", hasVerifiedBadge: false } ] }
 */
export const groupsInfo = createApiMethod(async <GroupId extends Identifier>(
  { groupIds }: { groupIds: GroupId[] }
): ApiMethod<RawGroupIdsToGroupsInfoData<GroupId>, PrettifiedGroupIdsToGroupsInfoData<GroupId>> => ({
  method: "GET",
  path: `/v2/groups`,
  searchParams: { groupIds },
  name: "groupIdsToGroupsInfo",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", ({ id, created, ...rest }) => ({ created: new Date(created), ...rest }))
}))


/**
 * Gets a list of all roles for every group that the specified user is in.
 * @category Groups V2
 * @endpoint GET /v2/users/{userId}/groups/roles
 * @tags [ "Cookie" ]
 * 
 * @param userId The id of the user to get roles for.
 * 
 * @example const { data:groups } = await ClassicGroupsApi.allGroupRolesForUser_v2({ userId: 45348281 })
 * @exampleData [ { group: { id: 5850082, name: "MightyPart Games", memberCount: 108, hasVerifiedBadge: false }, role: { id: 5850082, name: "Mighty Member", rank: 100 } } ]
 * @exampleRawBody { data: [ { group: { id: 5850082, name: "MightyPart Games", memberCount: 108, hasVerifiedBadge: false }, role: { id: 5850082, name: "Mighty Member", rank: 100 } } ] }
 */
export const allGroupRolesForUser_v2 = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<RawAllGroupRolesForUserData_V2, PrettifiedAllGroupRolesForUserData_V2> => ({
  method: "GET",
  path: `/v2/users/${userId}/groups/roles`,
  name: "allGroupRolesForUser_v2",

  formatRawDataFn: ({ data }) => data
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ WALL V2 ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a list of group wall posts.
 * @category Wall
 * @endpoint GET /v2/groups/{groupId}/wall/posts
 * @tags [ "?Cookie" ]
 * 
 * @param groupId The id of the group to get wall posts for.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:wallPosts } = await ClassicGroupsApi.groupWallPosts_V2({ groupId: 5850082 })
 * @exampleData [ { id: 2724986278, poster: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353813, name: "Mighty Member", rank: 1 } }, body: "Lorem ipsum dolor sit amet.", created: 2022-11-19T16:30:38.197Z, updated: 2022-11-19T16:30:38.197Z } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: "2549745135_1_00ad0f026ca1d251093fc548c366b7ea", data: [ { id: 2724986278, poster: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353813, name: "Mighty Member", rank: 1 } }, body: "Lorem ipsum dolor sit amet.", created: 2022-11-19T16:30:38.197Z, updated: 2022-11-19T16:30:38.197Z } ] }
 */
export const groupWallPosts_V2 = createApiMethod(async (
  { groupId, limit, sortOrder, cursor }: { groupId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawGroupWallPostsData_V2, PrettifiedGroupWallPostsData_V2> => ({
  method: "GET",
  path: `/v2/groups/${groupId}/wall/posts`,
  searchParams: { limit, sortOrder, cursor },
  name: "groupWallPosts_V2",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data, obj => obj.forEach(wallPost => {
    wallPost.created = new Date(wallPost.created)
    wallPost.updated = new Date(wallPost.updated)
  }))
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ BANS ] //////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a list of group bans.
 * @category Bans
 * @endpoint GET /v1/groups/{groupId}/bans
 * 
 * @param groupId The id of the group to get bans for.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:bans } = await ClassicGroupsApi.groupBans({ groupId: 5850082 })
 * @exampleData [{"user":{"hasVerifiedBadge":false,"userId":1599940985,"username":"TheNamelessBot","displayName":"TheNamelessBot"},"actingUser":{"user":{"hasVerifiedBadge":false,"userId":45348281,"username":"MightyPart","displayName":"Mighty"},"role":{"id":38353811,"name":"NamelessGuy2005 - Scriptor","rank":255}},"created":"2025-05-17T17:04:15.646Z"}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"user":{"hasVerifiedBadge":false,"userId":1599940985,"username":"TheNamelessBot","displayName":"TheNamelessBot"},"actingUser":{"user":{"hasVerifiedBadge":false,"userId":45348281,"username":"MightyPart","displayName":"Mighty"},"role":{"id":38353811,"name":"NamelessGuy2005 - Scriptor","rank":255}},"created":"2025-05-17T17:04:15.646Z"}]}
 */
export const groupBans = createApiMethod(async (
  { groupId, limit, sortOrder, cursor }:
  { groupId: Identifier, limit?: number, sortOrder?: "Asc" | "Desc", cursor?: string }
): ApiMethod<RawGroupBansData, PrettifiedGroupBansData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/bans`,
  searchParams: { limit, sortOrder, cursor },
  name: "groupBans",

  formatRawDataFn: ({ data }) => data
}))

/**
 * Bans a member from a group.
 * @category Bans
 * @endpoint POST /v1/groups/{groupId}/bans/{userId}
 * 
 * @param groupId The id of the group to ban a member from.
 * @param userId The id of the member to ban.
 * 
 * @example const { data:banInfo } = await ClassicGroupsApi.banGroupMember({ groupId: 5850082, userId: 1599940985 })
 * @exampleData {"user":{"hasVerifiedBadge":false,"userId":1599940985,"username":"TheNamelessBot","displayName":"TheNamelessBot"},"actingUser":{"user":{"hasVerifiedBadge":false,"userId":45348281,"username":"MightyPart","displayName":"Mighty"},"role":{"id":38353811,"name":"NamelessGuy2005 - Scriptor","rank":255}},"created":"2025-05-17T17:04:15.646Z"}
 * @exampleRawBody {"user":{"hasVerifiedBadge":false,"userId":1599940985,"username":"TheNamelessBot","displayName":"TheNamelessBot"},"actingUser":{"user":{"hasVerifiedBadge":false,"userId":45348281,"username":"MightyPart","displayName":"Mighty"},"role":{"id":38353811,"name":"NamelessGuy2005 - Scriptor","rank":255}},"created":"2025-05-17T17:04:15.646Z"}
 */
export const banGroupMember = createApiMethod(async <UserId extends Identifier>(
  { groupId, userId }: { groupId: Identifier, userId: UserId }
): ApiMethod<BanGroupMemberData<UserId>> => ({
  method: "POST",
  path: `/v1/groups/${groupId}/bans/${userId}`,
  name: "banGroupMember"
}))

/**
 * Unbans a member from a group.
 * @category Bans
 * @endpoint DELETE /v1/groups/{groupId}/bans/{userId}
 * 
 * @param groupId The id of the group to unban a member from.
 * @param userId The id of the member to unban.
 * 
 * @example const { data:success } = await ClassicGroupsApi.unbanGroupMember({ groupId: 5850082, userId: 1599940985 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const unbanGroupMember = createApiMethod(async <UserId extends Identifier>(
  { groupId, userId }: { groupId: Identifier, userId: UserId }
): ApiMethod<boolean, {}> => ({
  method: "DELETE",
  path: `/v1/groups/${groupId}/bans/${userId}`,
  name: "unbanGroupMember",

  formatRawDataFn: dataIsSuccess
}))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////