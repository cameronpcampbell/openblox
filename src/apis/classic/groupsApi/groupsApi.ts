// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse, dataIsSuccess } from "../../apis.utils";
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, toCamel } from "../../../utils";
import { getCacheSettingsOverride, getCredentialsOverride } from "../../../config/config";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AddGroupSocialLinkData, AuthenticatedUserGroupMembershipInfoData, FormattedAllGroupRolesForUserData_V1, FormattedAllGroupRolesForUserData_V2, FormattedAllRolesForGroupData, FormattedAuthenticatedUserPendingGroupsData, FormattedGroupAuditLogData, FormattedGroupDescriptionData, FormattedGroupIdsToGroupsInfoData, FormattedGroupInfoData, FormattedGroupJoinRequestForUser, FormattedGroupJoinRequests, FormattedGroupLookupSearch, FormattedGroupMembersData, FormattedGroupMembersWithRoleData, FormattedGroupNameHistoryData, FormattedGroupPayoutsData, FormattedGroupPermissionsForAllRoles, FormattedGroupPolicyInfoData, FormattedGroupRelationshipsData, FormattedGroupRolesFromIdsData, FormattedGroupSearchData, FormattedGroupSearchMetadata, FormattedGroupShoutData, FormattedGroupSocialLinksData, FormattedGroupWallPostsData_V1, FormattedGroupWallPostsData_V2, FormattedGroupsThatUsersFriendsAreInData, FormattedPrimaryGroupForUserData, GroupAuditLogActionType, GroupAuditLogData, GroupInfoData, GroupNameHistoryData, GroupPayoutRestrictionsData, GroupRelationshipType, GroupRolePermissions, GroupRolePermissionsData, GroupSettingsData, GroupsConfigMetadataData, GroupsMetadataData, NewSocialLinkRequest, RawAllGroupRolesForUserData_V1, RawAllGroupRolesForUserData_V2, RawAllRolesForGroupData, RawAuthenticatedUserPendingGroupsData, RawGroupDescriptionData, RawGroupIdsToGroupsInfoData, RawGroupJoinRequestForUser, RawGroupJoinRequests, RawGroupLookupSearch, RawGroupMembersData, RawGroupMembersWithRoleData, RawGroupPayoutsData, RawGroupPermissionsForAllRoles, RawGroupPolicyInfoData, RawGroupRelationshipsData, RawGroupRolesFromIdsData, RawGroupSearchData, RawGroupSearchMetadata, RawGroupShoutData, RawGroupSocialLinksData, RawGroupWallPostsData_V1, RawGroupWallPostsData_V2, RawGroupsThatUsersFriendsAreInData, RawPrimaryGroupForUserData, UpdateRoleSetData, UpdateRoleSetRequest } from "./groupsApi.types"
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { ApiMethodNames, ApiMethodResponse, SortOrder } from "../../apis.types"
import type { NonEmptyArray, UnionToArray } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://groups.roblox.com"
const apiName = "ClassicGroupsApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = [ "setGroupSettings", "setGroupDescription", "setGroupShout", "setGroupIcon", "batchDeclineGroupJoinRequests", "batchAcceptGroupJoinRequests", "declineGroupJoinRequest", "acceptGroupJoinRequest", "removeGroupMember", "updateGroupMemberRole", "batchDeclineGroupRelationshipRequests", "batchAcceptGroupRelationshipRequests", "removeGroupRelationship", "requestGroupRelationship", "declineGroupRelationshipRequest", "acceptGroupRelationshipRequest", "setGroupRolePermissions", "addGroupSocialLink", "removeGroupSocialLink", "updateGroupSocialLink", "authenticatedUserSubscribeToGroupWallNotificationEvents", "removeGroupWallPost", "removeAllGroupWallPostMadeByUser", "authenticatedUserRemovePrimaryGroup", "authenticatedUserSetPrimaryGroup", "updateGroupRoleSet" ]

// [ GROUPS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets information about a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}
 * @tags [ "?Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:groupInfo } = await ClassicGroupsApi.groupInfo(5850082)
 * @exampleData { id: 5850082, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }
 * @exampleRawBody { id: 5850082, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }
 */
export async function groupInfo<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId
): ApiMethodResponse<GroupInfoData<GroupId>, FormattedGroupInfoData<GroupId>> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<GroupInfoData<GroupId>>(`${baseUrl}/v1/groups/${groupId}`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupInfo")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => cloneAndMutateObject<GroupInfoData<GroupId>, FormattedGroupInfoData<GroupId>>(rawBody, obj => {
      if (!obj?.shout) return
      obj.shout.created = new Date(obj.shout.created); obj.shout.updated = new Date(obj.shout.updated)
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400])
}

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
 * @example const { data:groupAuditLogs } = await ClassicGroupsApi.groupAuditLog(5850082, "AcceptAllyRequest", undefined, 10, "Desc")
 * @exampleData { previousPageCursor: null, nextPageCursor: null, data: [ { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 6333562, TargetGroupName: "Mine Ways Talk Show" }, created: "2020-05-18T12:06:34Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 5257567, TargetGroupName: "The X1 Team" }, created: "2020-05-13T13:52:57Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 5894486, TargetGroupName: "Sky-Blox Studio" }, created: "2020-05-13T13:52:56Z" } ] }
 * @exampleRawBody [ { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 6333562, targetGroupName: "Mine Ways Talk Show" }, created: "2020-05-18T12:06:34Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 5257567, targetGroupName: "The X1 Team" }, created: "2020-05-13T13:52:57Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 5894486, targetGroupName: "Sky-Blox Studio" }, created: "2020-05-13T13:52:56Z" } ]
 */
export async function groupAuditLog(
  this: ThisAllOverrides, groupId: number, actionType?: GroupAuditLogActionType, userId?: number, limit: 10|25|50|100=100, sortOrder: SortOrder="Asc", cursor?: string
): ApiMethodResponse<GroupAuditLogData, FormattedGroupAuditLogData, "PAGINATED"> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<GroupAuditLogData>(`${baseUrl}/v1/groups/${groupId}/audit-log`, {
      searchParams: { actionType, limit, sortOrder, userId, cursor },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupAuditLog")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => {
      let formattedData = toCamel<GroupAuditLogData["data"], FormattedGroupAuditLogData>(rawBody.data)
      formattedData.forEach(log => {
        log.actionType = log.actionType.replaceAll(/ +/g, "") as typeof log.actionType
      })
      return formattedData
    }

    return buildResponse(
      { rawBody, data: getFormattedData, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, response, cache }
    )
  }, [400, 403])
}

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
 * @example const { data:nameHistory } = await ClassicGroupsApi.groupNameHistory(5850082)
 * @exampleData [ { name: "Nameless Game Studio", created: 2022-01-06T00:01:47.193Z } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: null, data: [ { name: "Nameless Game Studio", created: "2022-01-06T00:01:47.193Z" } ] }
 */
export async function groupNameHistory(
  this: ThisAllOverrides, groupId: number, limit: 10|25|50|100=100, sortOrder: SortOrder="Asc", cursor?: string
): ApiMethodResponse<GroupNameHistoryData, FormattedGroupNameHistoryData, "PAGINATED"> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<GroupNameHistoryData>(`${baseUrl}/v1/groups/${groupId}/name-history`, {
      searchParams: { limit, sortOrder, cursor },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupNameHistory")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => cloneAndMutateObject<GroupNameHistoryData["data"], FormattedGroupNameHistoryData>(rawBody.data, obj => {
      obj.forEach(name => {
        name.created = new Date(name.created)
      })
    })

    return buildResponse(
      { rawBody, data: getFormattedData, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, response, cache }
    )
  }, [400, 403])
}

/**
 * Gets settings for a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}/settings
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to get settings for.
 * 
 * @example const { data:settings } = await ClassicGroupsApi.groupSettings(5850082)
 * @exampleData { isApprovalRequired: true, isBuildersClubRequired: false, areEnemiesAllowed: true, areGroupFundsVisible: false, areGroupGamesVisible: true, isGroupNameChangeEnabled: true }
 * @exampleRawBody { isApprovalRequired: true, isBuildersClubRequired: false, areEnemiesAllowed: true, areGroupFundsVisible: false, areGroupGamesVisible: true, isGroupNameChangeEnabled: true }
 */
export async function groupSettings(this: ThisAllOverrides, groupId: number): ApiMethodResponse<GroupSettingsData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<GroupSettingsData>(`${baseUrl}/v1/groups/${groupId}/settings`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupSettings")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400, 403])
}

/**
 * Sets settings for a group.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/settings
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param newSettings The new settings for the group.
 * 
 * @example const { data:success } = await ClassicGroupsApi.setGroupSettings(5850082, {
    isApprovalRequired: true,
    isBuildersClubRequired: false,
    areEnemiesAllowed: true,
    areGroupFundsVisible: false,
    areGroupGamesVisible: true, isGroupNameChangeEnabled: true
  })
 * @exampleData boolean
 * @exampleRawBody {}
 */
  export async function setGroupSettings(this: ThisAllOverrides, groupId: number, newSettings:GroupSettingsData): ApiMethodResponse<{}, boolean> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<GroupSettingsData>(`${baseUrl}/v1/groups/${groupId}/settings`, {
      body: newSettings,
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "setGroupSettings")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403, 503])
}

/**
 * Gets groups configuration metadata.
 * @category Groups
 * @endpoint GET /v1/groups/configuration/metadata
 * 
 * @example const { data:configMetadata } = await ClassicGroupsApi.groupsConfigMetadata()
 * @exampleData { groupConfiguration: { nameMaxLength: 50, descriptionMaxLength: 1000, iconMaxFileSizeMb: 20, cost: 100, isUsingTwoStepWebviewComponent: true }, recurringPayoutsConfiguration: { maxPayoutPartners: 20 }, roleConfiguration: { nameMaxLength: 100, descriptionMaxLength: 1000, limit: 40, cost: 25, minRank: 0, maxRank: 255 }, groupNameChangeConfiguration: { cost: 100, cooldownInDays: 90, ownershipCooldownInDays: 90 }, isPremiumPayoutsEnabled: true, isDefaultEmblemPolicyEnabled: true }
 * @exampleRawBody { groupConfiguration: { nameMaxLength: 50, descriptionMaxLength: 1000, iconMaxFileSizeMb: 20, cost: 100, isUsingTwoStepWebviewComponent: true }, recurringPayoutsConfiguration: { maxPayoutPartners: 20 }, roleConfiguration: { nameMaxLength: 100, descriptionMaxLength: 1000, limit: 40, cost: 25, minRank: 0, maxRank: 255 }, groupNameChangeConfiguration: { cost: 100, cooldownInDays: 90, ownershipCooldownInDays: 90 }, isPremiumPayoutsEnabled: true, isDefaultEmblemPolicyEnabled: true }
 */
export async function groupsConfigMetadata(this: ThisAllOverrides): ApiMethodResponse<GroupsConfigMetadataData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<GroupsConfigMetadataData>(`${baseUrl}/v1/groups/configuration/metadata`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupsConfigMetadata")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [])
}

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
export async function groupsMetadata(this: ThisAllOverrides): ApiMethodResponse<GroupsMetadataData> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<GroupsMetadataData>(`${baseUrl}/v1/groups/metadata`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupsMetadata")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [])
}


/**
 * Gets group policy info used for compliance.
 * @category Groups
 * @endpoint GET /v1/groups/policies
 * @tags [ "Cookie" ]
 * 
 * @example const { data:policyInfo } = await ClassicGroupsApi.groupPolicyInfo([5850082])
 * @exampleData { "5850082": { canViewGroup: true } }
 * @exampleRawBody { groups: [ { canViewGroup: true, groupId: 5850082 } ] }
 */
export async function groupPolicyInfo<GroupId extends number>(
  this: ThisAllOverrides, groupIds: NonEmptyArray<GroupId>
): ApiMethodResponse<RawGroupPolicyInfoData, FormattedGroupPolicyInfoData<GroupId>> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<RawGroupPolicyInfoData>(`${baseUrl}/v1/groups/policies`, {
      body: { groupIds },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupPolicyInfo")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => createObjectMapByKeyWithMiddleware(rawBody.groups, "groupId", ({ canViewGroup }: any) => ({ canViewGroup }))

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400, 403])
}


/**
 * Sets group description.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/description
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the description for.
 * @param description The content of the new description.
 * 
 * @example const { data:newDescription } = await ClassicGroupsApi.setGroupDescription(5850082, "Hello World!")
 * @exampleData "Hello World!"
 * @exampleRawBody { newDescription: "Hello World!" }
 */
export async function setGroupDescription(this: ThisAllOverrides, groupId: number, description: string): ApiMethodResponse<
  RawGroupDescriptionData, FormattedGroupDescriptionData
> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<RawGroupDescriptionData>(
      `${baseUrl}/v1/groups/${groupId}/description`, {
        body: { description },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "setGroupDescription")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody.newDescription, response, cache })
  }, [400, 403])
}


/**
 * Sets group shout (status).
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/status
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the shout for.
 * @param message The content of the new shout.
 * 
 * @example const { data:success } = await ClassicGroupsApi.setGroupShout(5850082, "Hello World!")
 * @exampleData { body: "Hello World!", poster: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, created: 2020-03-31T18:36:51.607Z, updated: 2023-09-15T16:21:00.272Z }
 * @exampleRawBody { body: "Hello World!", poster: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, created: "2020-03-31T18:36:51.607Z", updated: "2023-09-15T16:21:00.272Z" }
 */
export async function setGroupShout<Body extends string>(this: ThisAllOverrides, groupId: number, message: Body): ApiMethodResponse<
  RawGroupShoutData<Body>, FormattedGroupShoutData<Body>
> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<RawGroupShoutData<Body>>(
      `${baseUrl}/v1/groups/${groupId}/status`, {
        body: { message },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "setGroupShout")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<RawGroupShoutData<Body>, FormattedGroupShoutData<Body>>(rawBody, obj => {
      obj.created = new Date(obj.created)
      obj.updated = new Date(obj.updated)
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400, 403])
}


/**
 * Sets group icon.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/status
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the icon for.
 * @param icon The new icon for the group.
 * 
 * @example const { data:success } = await ClassicGroupsApi.setGroupIcon(5850082, fs.readFileSync("./newGroupIcon.png"))
 * @exampleData true
 * @exampleRawBody {}
 */
export async function setGroupIcon(this: ThisAllOverrides, groupId: number, icon: Buffer): ApiMethodResponse<{}, boolean> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<{}>(
      `${baseUrl}/v1/groups/icon`, {
        searchParams: { groupId },
        formData: { Files: new Blob([icon]) },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "setGroupIcon")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403, 413])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ MEMBERSHIP ] ////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Batch declines join requests.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/join-requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to batch decline join requests for.
 * 
 * @example const { data:success } = await ClassicGroupsApi.batchDeclineGroupJoinRequests(5850082, [2655994471])
 * @exampleData true
 * @exampleRawBody {}
 */
export async function batchDeclineGroupJoinRequests(
  this: ThisAllOverrides, groupId: number, userIds: NonEmptyArray<number>
): ApiMethodResponse<{}, boolean> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/join-requests`, {
        body: { UserIds: userIds },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "batchDeclineGroupJoinRequests")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


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
 * @example const { data:joinRequests } = await ClassicGroupsApi.groupJoinRequests(5850082)
 * @exampleData [ { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: 2023-09-12T09:35:49.287Z } ]
 * @exampleRawBody [ { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: "2023-09-12T09:35:49.287Z" } ]
 */
export async function groupJoinRequests(
  this: ThisAllOverrides, groupId: number, limit:10|25|50|100=100, sortOrder:SortOrder="Asc", cursor?: string
): ApiMethodResponse<RawGroupJoinRequests, FormattedGroupJoinRequests, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupJoinRequests>(
      `${baseUrl}/v1/groups/${groupId}/join-requests`, {
        searchParams: { limit, sortOrder, cursor },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupJoinRequests")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<RawGroupJoinRequests["data"], FormattedGroupJoinRequests>(rawBody.data, obj => {
      obj.forEach( request => request.created = new Date(request.created) )
    })

    return buildResponse(
      { rawBody, data: getFormattedData, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, response,  cache }
    )
  }, [400, 403])
}


/**
 * Batch accepts join requests.
 * @category Membership
 * @endpoint POST /v1/groups/{groupId}/join-requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to batch accepts join requests for.
 * 
 * @example const { data:success } = await ClassicGroupsApi.batchAcceptGroupJoinRequests(5850082, [2655994471])
 * @exampleData true
 * @exampleRawBody {}
 */
export async function batchAcceptGroupJoinRequests(
  this: ThisAllOverrides, groupId: number, userIds: NonEmptyArray<number>
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<{}>(
      `${baseUrl}/v1/groups/${groupId}/join-requests`, {
        body: { UserIds: userIds },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "batchAcceptGroupJoinRequests")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


/**
 * Declines a join request.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/join-requests/users/${userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to decline a join request for.
 * @param userId The id of the user to decline.
 * 
 * @example const { data:success } = await ClassicGroupsApi.declineGroupJoinRequest(5850082, 2655994471)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function declineGroupJoinRequest(
  this: ThisAllOverrides, groupId: number, userId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/join-requests/users/${userId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "declineGroupJoinRequest")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


/**
 * Gets a join request for a user.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/join-requests/users/${userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param userId The id of the user.
 * 
 * @example const { data:joinRequest } = await ClassicGroupsApi.groupJoinRequestForUser(5850082, 2655994471)
 * @exampleData { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: 2023-09-12T11:31:18.933Z }
 * @exampleRawBody { requester: { hasVerifiedBadge: false, userId: 2655994471, username: "MightyPartJr", displayName: "MightyPartJr" }, created: "2023-09-12T11:31:18.933Z" }
 */
export async function groupJoinRequestForUser<UserId extends number>(
  this: ThisAllOverrides, groupId: number, userId: UserId
): ApiMethodResponse<RawGroupJoinRequestForUser<UserId> | null, FormattedGroupJoinRequestForUser<UserId> | null> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupJoinRequestForUser<UserId>>(
      `${baseUrl}/v1/groups/${groupId}/join-requests/users/${userId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupJoinRequestForUser")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => (rawBody != null) ? cloneAndMutateObject<
      RawGroupJoinRequestForUser<UserId>, FormattedGroupJoinRequestForUser<UserId>
    >(rawBody, obj => {
      obj.created = new Date(obj.created)
    }) : null

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400, 403])
}


/**
 * Accepts a join request.
 * @category Membership
 * @endpoint POST /v1/groups/{groupId}/join-requests/users/${userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to accept a join request for.
 * @param userId The id of the user to accept.
 * 
 * @example const { data:success } = await ClassicGroupsApi.acceptGroupJoinRequest(5850082, 2655994471)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function acceptGroupJoinRequest(
  this: ThisAllOverrides, groupId: number, userId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<{}>(
      `${baseUrl}/v1/groups/${groupId}/join-requests/users/${userId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "acceptGroupJoinRequest")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403, 503])
}


/**
 * Gets group membership info for the currently authenticated user.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/membership
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to get membership info for.
 * 
 * @example const { data:membershipInfo } = await ClassicGroupsApi.authenticatedUserGroupMembershipInfo(5850082)
 * @exampleData { groupId: 5850082, isPrimary: false, isPendingJoin: false, userRole: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: true, deleteFromWall: true, viewStatus: true, postToStatus: true }, groupMembershipPermissions: { changeRank: true, inviteMembers: true, removeMembers: true }, groupManagementPermissions: { manageRelationships: true, manageClan: true, viewAuditLogs: true }, groupEconomyPermissions: { spendGroupFunds: true, advertiseGroup: true, createItems: true, manageItems: true, addGroupPlaces: true, manageGroupGames: true, viewGroupPayouts: true, viewAnalytics: true }, groupOpenCloudPermissions: { useCloudAuthentication: true, administerCloudAuthentication: true } }, areGroupGamesVisible: true, areGroupFundsVisible: false, areEnemiesAllowed: true, canConfigure: true }
 * @exampleRawBody { groupId: 5850082, isPrimary: false, isPendingJoin: false, userRole: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: true, deleteFromWall: true, viewStatus: true, postToStatus: true }, groupMembershipPermissions: { changeRank: true, inviteMembers: true, removeMembers: true }, groupManagementPermissions: { manageRelationships: true, manageClan: true, viewAuditLogs: true }, groupEconomyPermissions: { spendGroupFunds: true, advertiseGroup: true, createItems: true, manageItems: true, addGroupPlaces: true, manageGroupGames: true, viewGroupPayouts: true, viewAnalytics: true }, groupOpenCloudPermissions: { useCloudAuthentication: true, administerCloudAuthentication: true } }, areGroupGamesVisible: true, areGroupFundsVisible: false, areEnemiesAllowed: true, canConfigure: true }
 */
export async function authenticatedUserGroupMembershipInfo<GroupId extends number>(this: ThisAllOverrides, groupId: GroupId): ApiMethodResponse<
  AuthenticatedUserGroupMembershipInfoData<GroupId>
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserGroupMembershipInfoData<GroupId>>(
      `${baseUrl}/v1/groups/${groupId}/membership`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "authenticatedUserGroupMembershipInfo"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400])
}


/**
 * Gets all roles in a group.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/roles
 * 
 * @param groupId The id of the group to get roles for.
 * 
 * @example const { data:roles } = await ClassicGroupsApi.allRolesForGroup(5850082)
 * @exampleData { groupId: 5850082, roles: [ { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0, memberCount: 0 }, { id: 38353811, name: "Owner", description: "", rank: 255, memberCount: 1 } ] }
 * @exampleRawBody { groupId: 5850082, roles: [ { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0, memberCount: 0 }, { id: 38353811, name: "Owner", description: "", rank: 255, memberCount: 1 } ] }
 */
export async function allRolesForGroup<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId
): ApiMethodResponse<RawAllRolesForGroupData<GroupId>, FormattedAllRolesForGroupData> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawAllRolesForGroupData<GroupId>>(
      `${baseUrl}/v1/groups/${groupId}/roles`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "allRolesForGroup")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody.roles, response, cache })
  }, [400])
}


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
 * @example const { rawBody:membersWithRole } = await ClassicGroupsApi.groupMembersWithRole(5850082, 38353811)
 * @exampleData [ { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: null, data: [ { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" } ]
 */
export async function groupMembersWithRole(
  this: ThisAllOverrides, groupId: number, roleSetId: number, limit: 10|25|50|100=100, sortOrder: SortOrder="Asc", cursor?: string
): ApiMethodResponse<RawGroupMembersWithRoleData, FormattedGroupMembersWithRoleData, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupMembersWithRoleData>(
      `${baseUrl}/v1/groups/${groupId}/roles/${roleSetId}/users`, {
        searchParams: { limit, sortOrder, cursor },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupMembersWithRole")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse(
      { rawBody, data: rawBody.data, response, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor } , cache }
    )
  }, [400, 403])
}


/**
 * Gets all members of a group.
 * @category Membership
 * @endpoint GET /v1/groups/{groupId}/users
 * 
 * @param groupId The id of the group.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:members } = await ClassicGroupsApi.groupMembers(5850082)
 * @exampleData [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: "3023291639_1_8ba111cfa4097b6dd27d851a15353a1f", data: [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } } ]
 */
export async function groupMembers(
  this: ThisAllOverrides, groupId: number, limit: 10|25|50|100=100, sortOrder: SortOrder="Asc", cursor?: string
): ApiMethodResponse<RawGroupMembersData, FormattedGroupMembersData, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupMembersData>(
      `${baseUrl}/v1/groups/${groupId}/users`, {
        searchParams: { limit, sortOrder, cursor },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupMembers")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse(
      { rawBody, data: rawBody.data, response, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor } , cache }
    )
  }, [400])
}


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
export async function authenticatedUserPendingGroups(this: ThisAllOverrides): ApiMethodResponse<
  RawAuthenticatedUserPendingGroupsData, FormattedAuthenticatedUserPendingGroupsData
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawAuthenticatedUserPendingGroupsData>(
      `${baseUrl}/v1/user/groups/pending`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "authenticatedUserPendingGroups"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawAuthenticatedUserPendingGroupsData, FormattedAuthenticatedUserPendingGroupsData
    >(rawBody, obj => {
      obj.forEach(group => {
        if (!group.shout) return
        group.shout.created = new Date(group.shout.created)
        group.shout.updated = new Date(group.shout.updated)
      })
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [])
}


/**
 * Gets a list of all groups the specified users' friends are in.
 * @category Membership
 * @endpoint GET /v1/users/{userId}/friends/groups/roles
 * @tags [ "Cookie" ]
 * 
 * @param userId The id of the user to get friends groups for.
 * 
 * @example const { data:groupsThatUsersFriendsAreIn } = await ClassicGroupsApi.groupsThatUsersFriendsAreIn(45348281)
 * @exampleData [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, groups: [ { group: { id: 5850082, name: "Lorem ipsum", description: "Lorem ipsum dolor sit amet.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 45348281, name: "MightyPart", rank: 1 } } ] } ]
 * @exampleRawBody { data: [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, groups: [ { group: { id: 5850082, name: "Lorem ipsum", description: "Lorem ipsum dolor sit amet.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 45348281, name: "MightyPart", rank: 1 } } ] } ] }
 */
export async function groupsThatUsersFriendsAreIn(this: ThisAllOverrides, userId: number): ApiMethodResponse<
 RawGroupsThatUsersFriendsAreInData, FormattedGroupsThatUsersFriendsAreInData
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupsThatUsersFriendsAreInData>(
      `${baseUrl}/v1/users/${userId}/friends/groups/roles`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "groupsThatUsersFriendsAreIn"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupsThatUsersFriendsAreInData["data"], FormattedGroupsThatUsersFriendsAreInData
    >(rawBody.data, obj => {
      obj.forEach(user => {
        user.groups.forEach(group => {
          if (!group.group.shout) return
          group.group.shout.created = new Date(group.group.shout.created)
          group.group.shout.updated = new Date(group.group.shout.updated)
        })
      })
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400])
}


/**
 * Gets a list of all roles for every group that the specified user is in.
 * @category Membership
 * @endpoint GET /v1/users/{userId}/groups/roles
 * @tags [ "Cookie" ]
 * 
 * @param userId The id of the user to get roles for.
 * 
 * @example const { data:groups } = await ClassicGroupsApi.allGroupRolesForUser_V1(45348281)
 * @exampleData [ { group: { id: 5855434, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet...", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: 'MightyPart' }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 5855434, name: "MightyPart", rank: 1 } } ]
 * @exampleRawBody { data: [ { group: { id: 5855434, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet...", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: 'MightyPart' }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 5855434, name: "MightyPart", rank: 1 } } ] }
 */
export async function allGroupRolesForUser_V1(this: ThisAllOverrides, userId: number): ApiMethodResponse<
  RawAllGroupRolesForUserData_V1, FormattedAllGroupRolesForUserData_V1
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawAllGroupRolesForUserData_V1>(
      `${baseUrl}/v1/users/${userId}/groups/roles`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "allGroupRolesForUser_V1"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const formattedData = () => cloneAndMutateObject<
      RawAllGroupRolesForUserData_V1["data"], FormattedAllGroupRolesForUserData_V1
    >(rawBody.data, obj => {
      obj.forEach(group => {
        if (!group.group.shout) return
        group.group.shout.created = new Date(group.group.shout.created)
        group.group.shout.updated = new Date(group.group.shout.updated)
      })
    })

    return buildResponse({ rawBody, data: formattedData, response, cache })
  }, [400])
}


/**
 * Removes a user from a group.
 * @category Membership
 * @endpoint DELETE /v1/groups/{groupId}/users/{userId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to remove the user from.
 * @param userId The id of the user to be removed.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeGroupMember(5850082, 2655994471)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function removeGroupMember(this: ThisAllOverrides, groupId: number, userId: number): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/users/${userId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "removeGroupMember"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400])
}


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
 * @example const { data:success } = await ClassicGroupsApi.updateGroupMemberRole(5850082, 2655994471, 38354760)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function updateGroupMemberRole(this: ThisAllOverrides, groupId: number, userId: number, roleId: number): ApiMethodResponse<
  {}, boolean
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<{}>(
      `${baseUrl}/v1/groups/${groupId}/users/${userId}`, {
        body: { roleId },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "updateGroupMemberRole"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403, 503])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ REVENUE ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets values indicating if the specified group can use payout features.
 * @category Revenue
 * @endpoint GET /v1/groups/{groupId}/payout-restriction
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:payoutRestrictions } = await ClassicGroupsApi.groupPayoutRestrictions(5850082)
 * @exampleData { canUseRecurringPayout: true, canUseOneTimePayout: true }
 * @exampleRawBody { canUseRecurringPayout: true, canUseOneTimePayout: true }
 */
export async function groupPayoutRestrictions(this: ThisAllOverrides, groupId: number): ApiMethodResponse<GroupPayoutRestrictionsData> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<GroupPayoutRestrictionsData>(
      `${baseUrl}/v1/groups/${groupId}/payout-restriction`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "groupPayoutRestrictions"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400, 403])
}


/**
 * Gets a list of the group payout percentages.
 * @category Revenue
 * @endpoint GET /v1/groups/{groupId}/payouts
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:payouts } = await ClassicGroupsApi.groupPayouts(5850082)
 * @exampleData [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, percentage: 50 } ]
 * @exampleRawBody { data: [ { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, percentage: 50 } ] }
 */
export async function groupPayouts(this: ThisAllOverrides, groupId: number): ApiMethodResponse<
  RawGroupPayoutsData, FormattedGroupPayoutsData
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupPayoutsData>(
      `${baseUrl}/v1/groups/${groupId}/payouts`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "groupPayouts"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody.data, response, cache })
  }, [400, 403])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ RELATIONSHIPS ] /////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a group's relationships.
 * @category Relationships
 * @endpoint GET /v1/groups/{groupId}/relationships/{groupRelationshipType}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param groupRelationshipType The group relationship type, "Enemies" or "Allies".
 * @param startRowIndex The start index of the page request.
 * @param maxRows The maximum number of rows for the page request, should be at least 1.
 * 
 * @example const { data:relationships } = await ClassicGroupsApi.groupRelationships(5850082, "Allies", 0, 1)
 * @exampleData { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ] }
 * @exampleRawBody { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ], nextRowIndex: 1 }
 */
export async function groupRelationships<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId, groupRelationshipType: GroupRelationshipType, startRowIndex: number=0, maxRows: number=100
): ApiMethodResponse<RawGroupRelationshipsData<GroupId>, FormattedGroupRelationshipsData<GroupId>, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupRelationshipsData<GroupId>>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}`, {
        searchParams: { StartRowIndex: startRowIndex, MaxRows: maxRows },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "groupRelationships"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupRelationshipsData<GroupId>, FormattedGroupRelationshipsData<GroupId>
    >(rawBody, obj => {
      obj.relatedGroups.forEach(group => {
        if (!group.shout) return
        group.shout.created = new Date(group.shout.created)
        group.shout.updated = new Date(group.shout.updated)
      });
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cursors: { next: rawBody.nextRowIndex }, cache })
  }, [400])
}


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
 * @example const { data:success } = await ClassicGroupsApi.batchDeclineGroupRelationshipRequests(5850082, "Allies", [15842838])
 * @exampleData true
 * @exampleRawBody {}
 */
export async function batchDeclineGroupRelationshipRequests(
  this: ThisAllOverrides, groupId: number, groupRelationshipType: GroupRelationshipType, groupIds: NonEmptyArray<number>
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests`, {
        body: { GroupIds: groupIds },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "batchDeclineGroupRelationshipRequests"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [403])
}


/**
 * Batch declines relationship requests.
 * @category Relationships
 * @endpoint GET /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param groupRelationshipType The group relationship type, "Enemies" or "Allies".
 * @param startRowIndex The start index of the page request.
 * @param maxRows The maximum number of rows for the page request, should be at least 1.
 * 
 * @example const { data:relationshipRequests } = await ClassicGroupsApi.groupRelationshipRequests(5850082, "Allies", 0, 1)
 * @exampleData { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ] }
 * @exampleRawBody { groupId: 5850082, relationshipType: "Allies", totalGroupCount: 2, relatedGroups: [ { id: 50, name: "Lorem Ipsum", description: "Hello World", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 38, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false } ], nextRowIndex: 1 }
 */
export async function groupRelationshipRequests<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId, groupRelationshipType: GroupRelationshipType, startRowIndex: number=0, maxRows: number=100
): ApiMethodResponse<RawGroupRelationshipsData<GroupId>, FormattedGroupRelationshipsData<GroupId>, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<any>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests`, {
        searchParams: { StartRowIndex: startRowIndex, MaxRows: maxRows },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupRelationshipRequests")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupRelationshipsData<GroupId>, FormattedGroupRelationshipsData<GroupId>
    >(rawBody, obj => {
      obj.relatedGroups.forEach(group => {
        if (!group.shout) return
        group.shout.created = new Date(group.shout.created)
        group.shout.updated = new Date(group.shout.updated)
      })
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cursors: { next: rawBody.nextRowIndex }, cache })
  }, [400, 403])
}


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
 * @example const { data:success } = await ClassicGroupsApi.batchAcceptGroupRelationshipRequests(5850082, "Allies", [15842838])
 * @exampleData true
 * @exampleRawBody {}
 */
export async function batchAcceptGroupRelationshipRequests(
  this: ThisAllOverrides, groupId: number, groupRelationshipType: GroupRelationshipType, groupIds: NonEmptyArray<number>
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<{}>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests`, {
        body: { GroupIds: groupIds },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "batchAcceptGroupRelationshipRequests"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [403])
}


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
 * @example const { data:success } = await ClassicGroupsApi.removeGroupRelationship(5850082, "Allies", 15842838)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function removeGroupRelationship(
  this: ThisAllOverrides, groupId: number, groupRelationshipType: GroupRelationshipType, relatedGroupId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}/${relatedGroupId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "removeGroupRelationship")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


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
 * @example const { data:success } = await ClassicGroupsApi.requestGroupRelationship(5850082, "Allies", 15842838)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function requestGroupRelationship(
  this: ThisAllOverrides, groupId: number, groupRelationshipType: GroupRelationshipType, relatedGroupId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<{}>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}/${relatedGroupId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "requestGroupRelationship")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


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
 * @example const { data:success } = await ClassicGroupsApi.declineGroupRelationshipRequest(5850082, "Allies", 15842838)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function declineGroupRelationshipRequest(
  this: ThisAllOverrides, groupId: number, groupRelationshipType: GroupRelationshipType, relatedGroupId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests/${relatedGroupId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "declineGroupRelationshipRequest")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


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
 * @example const { data:success } = await ClassicGroupsApi.acceptGroupRelationshipRequest(5850082, "Allies", 15842838)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function acceptGroupRelationshipRequest(
  this: ThisAllOverrides, groupId: number, groupRelationshipType: GroupRelationshipType, relatedGroupId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<{}>(
      `${baseUrl}/v1/groups/${groupId}/relationships/${groupRelationshipType}/requests/${relatedGroupId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "acceptGroupRelationshipRequest")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PERMISSIONS ] ///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets permissions for a role in a group.
 * @category Permissions
 * @endpoint GET /v1/groups/{groupId}/roles/{roleSetId}/permissions
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param roleSetId The id of the role to get permissions for.
 * 
 * @example const { data:rolePerms } = await ClassicGroupsApi.groupPermissionsForRole(5850082, 38353814)
 * @exampleData { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 * @exampleRawBody { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 */
export async function groupPermissionsForRole<GroupId extends number, RoleSetId extends number>(
  this: ThisAllOverrides, groupId: GroupId, roleSetId: RoleSetId
): ApiMethodResponse<GroupRolePermissionsData<GroupId, RoleSetId>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<any>(
      `${baseUrl}/v1/groups/${groupId}/roles/${roleSetId}/permissions`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupPermissionsForRole")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400, 403])
}


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
 * @example const { data:success } = await ClassicGroupsApi.setGroupRolePermissions(5850082, 38353814, { ViewStatus: false })
 * @exampleData true
 * @exampleRawBody {}
 */
export async function setGroupRolePermissions<GroupId extends number, RoleSetId extends number>(
  this: ThisAllOverrides, groupId: GroupId, roleSetId: RoleSetId, permissions: GroupRolePermissions
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<{}>(
      `${baseUrl}/v1/groups/${groupId}/roles/${roleSetId}/permissions`, {
        body: { permissions },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "setGroupRolePermissions")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


/**
 * Gets permissions for the guest role of a group.
 * @category Permissions
 * @endpoint GET /v1/groups/{groupId}/roles/guest/permissions
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:rolePerms } = await ClassicGroupsApi.groupRolePermissions(5850082, 38353814)
 * @exampleData { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 * @exampleRawBody { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } }
 */
export async function groupGuestRolePermissions<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId
): ApiMethodResponse<GroupRolePermissionsData<GroupId, number>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<any>(
      `${baseUrl}/v1/groups/${groupId}/roles/guest/permissions`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupGuestRolePermissions")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400])
}


/**
 * Gets permissions for all roles in a group.
 * @category Permissions
 * @endpoint GET /v1/groups/{groupId}/roles/permissions
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data:allPerms } = await ClassicGroupsApi.groupPermissionsForAllRoles(5850082)
 * @exampleData [ { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } } ]
 * @exampleRawBody { data: [ { groupId: 5850082, role: { id: 38353814, name: "Guest", description: "A non-group member.", rank: 0 }, permissions: { groupPostsPermissions: { viewWall: true, postToWall: false, deleteFromWall: false, viewStatus: false, postToStatus: false }, groupMembershipPermissions: { changeRank: false, inviteMembers: false, removeMembers: false }, groupManagementPermissions: { manageRelationships: false, manageClan: false, viewAuditLogs: false }, groupEconomyPermissions: { spendGroupFunds: false, advertiseGroup: false, createItems: false, manageItems: false, addGroupPlaces: false, manageGroupGames: false, viewGroupPayouts: false, viewAnalytics: false }, groupOpenCloudPermissions: { useCloudAuthentication: false, administerCloudAuthentication: false } } } ] }
 */
export async function groupPermissionsForAllRoles<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId
): ApiMethodResponse<RawGroupPermissionsForAllRoles<GroupId>, FormattedGroupPermissionsForAllRoles<GroupId>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupPermissionsForAllRoles<GroupId>>(
      `${baseUrl}/v1/groups/${groupId}/roles/permissions`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupPermissionsForAllRoles")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody.data, response, cache })
  }, [])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ SOCIAL LINKS ] //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets socials links for a group.
 * @category Social Links
 * @endpoint GET /v1/groups/{groupId}/social-links
 * @tags [ "?Cookie" ]
 * 
 * 
 * @example const { rawBody:socials } = await ClassicGroupsApi.groupSocialLinks(5850082)
 * @exampleData [ { id: 3412774, type: "Discord", url: "https://discord.gg/4hDH5s52a", title: "Support Server" } ]
 * @exampleRawBody { data: [ { id: 3412774, type: "Discord", url: "https://discord.gg/4hDH5s52a", title: "Support Server" } ] }
 */
export async function groupSocialLinks(this: ThisAllOverrides, groupId: number): ApiMethodResponse<
  RawGroupSocialLinksData, FormattedGroupSocialLinksData
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupSocialLinksData>(
      `${baseUrl}/v1/groups/${groupId}/social-links`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupSocialLinks")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody.data, response, cache })
  }, [400, 403, 404])
}


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
 * const { data:addedSocial } = await ClassicGroupsApi.addGroupSocialLink(5850082, {
     type: "Twitch",
     title: "Follow My Twitch",
     url: "twitch.tv/fooBar"
   })
 * @exampleData { id: 10791942, type: "Twitch", url: "https://twitch.tv/fooBar", title: "Follow My Twitch" }
 * @exampleRawBody { id: 10791942, type: "Twitch", url: "https://twitch.tv/fooBar", title: "Follow My Twitch" }
 */
export async function addGroupSocialLink<Request extends NewSocialLinkRequest>(
  this: ThisAllOverrides, groupId: number, request: Request
): ApiMethodResponse<AddGroupSocialLinkData<Request>> {
    const overrides = this
    return BaseHandler(async function(this: ThisProfile) {
  
    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<AddGroupSocialLinkData<Request>>(
      `${baseUrl}/v1/groups/${groupId}/social-links`, {
        body: request,
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "addGroupSocialLink")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400, 403, 404, 503])
}


/**
 * Removes an existing social link from a group.
 * @category Social Links
 * @endpoint DELETE /v1/groups/{groupId}/social-links/{socialLinkId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to add a social link to.
 * @param socialLinkId The id of the social link to remove.
 * 
 * @example const { rawBody:success } = await ClassicGroupsApi.removeGroupSocialLink(5850082, 10791942)
 * @exampleData true
 * @exampleRawBody {}
 */
   export async function removeGroupSocialLink(
    this: ThisAllOverrides, groupId: number, socialLinkId: number
  ): ApiMethodResponse<{}, boolean> {
    const overrides = this
    return BaseHandler(async function(this: ThisProfile) {
  
    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/social-links/${socialLinkId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "removeGroupSocialLink")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403, 404])
}


/**
 * (THIS ENDPOINT IS CURRENTLY BROKEN). Updates an existing social link.
 * @category Social Links
 * @endpoint PATCH /v1/groups/{groupId}/social-links/{socialLinkId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to add a social link to.
 * @param request The social link request data.
 * 
 * @example
 * const { data:success } = await ClassicGroupsApi.updateGroupSocialLink(5850082, 10792025, {
     type: "Twitch",
     title: "Join Today!",
     url: "twitch.tv/barFoo"
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export async function updateGroupSocialLink(
  this: ThisAllOverrides, groupId: number, socialLinkId: number, request: NewSocialLinkRequest
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<{}>(
      `${baseUrl}/v1/groups/${groupId}/social-links/${socialLinkId}`, {
        body: { request },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "removeGroupSocialLink")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403, 404, 503])
}
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
 * @example const { data:wallPosts } = await ClassicGroupsApi.groupWallPosts_V1(5850082)
 * @exampleData [ { id: 2727146317, poster: { hasVerifiedBadge: false, userId: 45348281, username: 'MightyPart', displayName: 'MightyPart' }, body: 'Lorem Ipsum dolor sit amet...', created: 2022-11-24T15:31:28.157Z, updated: 2022-11-24T15:31:28.157Z } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: '2550358523_1_75917f56fab75bb02bd9d16be933b95a', data: [ { id: 2727146317, poster: { hasVerifiedBadge: false, userId: 45348281, username: 'MightyPart', displayName: 'MightyPart' }, body: 'Lorem Ipsum dolor sit amet...', created: "2022-11-24T15:31:28.157Z", updated: "2022-11-24T15:31:28.157Z" } ] }
 */
export async function groupWallPosts_V1(
  this: ThisAllOverrides, groupId: number, limit: 10|25|50|100=100, sortOrder: SortOrder="Desc", cursor?: string 
): ApiMethodResponse<RawGroupWallPostsData_V1, FormattedGroupWallPostsData_V1, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupWallPostsData_V1>(
      `${baseUrl}/v1/groups/${groupId}/wall/posts`, {
        searchParams: { limit, sortOrder, cursor },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupWallPosts_V1")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupWallPostsData_V1["data"], FormattedGroupWallPostsData_V1
    >(rawBody.data, obj => {
      obj.forEach(wallPost => {
        wallPost.created = new Date(wallPost.created)
        wallPost.updated = new Date(wallPost.updated)
      })
    })

    return buildResponse(
      { rawBody, data: getFormattedData, response, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, cache }
    )
  }, [400, 403])
}


/**
 * (THIS ENDPOINT PROBABLY DOESN'T WORK). Subscribes the authenticated user to notifications of group wall events.
 * @category Wall
 * @endpoint GET /v1/groups/{groupId}/wall/posts/subscribe
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * 
 * @example const { data } = await ClassicGroupsApi.authenticatedUserSubscribeToGroupWallNotificationEvents(5850082)
 */
export async function authenticatedUserSubscribeToGroupWallNotificationEvents(
  this: ThisAllOverrides, groupId: number
): ApiMethodResponse<any> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<any>(
      `${baseUrl}/v1/groups/${groupId}/wall/subscribe`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "authenticatedUserSubscribeToGroupWallNotificationEvents"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400, 403])
}


/**
 * Removes a group wall post.
 * @category Wall
 * @endpoint GET /v1/groups/{groupId}/wall/posts/{postId}
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param postId The id of the wall post to be removed.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeGroupWallPost(5850082, 2727146317)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function removeGroupWallPost(
  this: ThisAllOverrides, groupId: number, postId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/wall/posts/${postId}`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "removeGroupWallPost")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}


/**
 * Removes all group wall posts made by a specific user.
 * @category Wall
 * @endpoint GET /v1/groups/{groupId}/wall/users/{userId}/posts
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param userId The id of the user.
 * 
 * @example const { data:success } = await ClassicGroupsApi.removeAllGroupWallPostMadeByUser(5850082, 45348281)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function removeAllGroupWallPostMadeByUser(
  this: ThisAllOverrides, groupId: number, userId: number
): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/groups/${groupId}/wall/users/${userId}/posts`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "removeAllGroupWallPostMadeByUser")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}
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
 * @example const { data:results } = await ClassicGroupsApi.groupSearch("MightyPart Games")
 * @exampleData [ { id: 5850082, name: 'MightyPart Games', description: 'Welcome to my amazing group', memberCount: 102, previousName: 'Nameless Game Studio', publicEntryAllowed: true, created: '2020-03-29T18:15:20.1Z', updated: '2023-09-14T06:34:36.243Z', hasVerifiedBadge: false } ]
 * @exampleRawBody { keyword: 'MightyPart Games', previousPageCursor: null, nextPageCursor: 'eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImtleXdvcmQ6TWlnaHR5UGFydCBHYW1lcyIsImNvdW50IjoxMH0KOTIwMGU5MzQwMTBlM2IzOTBlNmU3M2E3MzJkNzhhYzRkZjU1ZGM2ZGEwNWUwMDRjMmM1ZmRmZDlhMzk3YjRhNA==', data: [ { id: 5850082, name: 'MightyPart Games', description: 'Welcome to my amazing group', memberCount: 102, previousName: 'Nameless Game Studio', publicEntryAllowed: true, created: '2020-03-29T18:15:20.1Z', updated: '2023-09-14T06:34:36.243Z', hasVerifiedBadge: false } ] }
 */
export async function groupSearch(
  this: ThisAllOverrides, keyword: string, prioritizeExactMatch: boolean=false, limit: 10|25|50|100=100, cursor?: string
): ApiMethodResponse<RawGroupSearchData, FormattedGroupSearchData, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupSearchData>(
      `${baseUrl}/v1/groups/search`, {
        searchParams: { keyword, prioritizeExactMatch, limit, cursor },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupSearch")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupSearchData["data"], FormattedGroupSearchData
    >(rawBody.data, obj => {
      obj.forEach(result => {
        result.created = new Date(result.created)
        result.updated = new Date(result.updated)
      })
    })

    return buildResponse(
      { rawBody, data: getFormattedData, response, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, cache }
    )
  }, [400])
}


/**
 * Search for groups by keyword.
 * @category Group Search
 * @endpoint GET /v1/groups/search/lookup
 * 
 * @param groupName The name of the group to lookup.
 * 
 * @example const { data:results } = await ClassicGroupsApi.groupLookupSearch("MightyPart Games")
 * @exampleData [ { id: 5850082, name: 'MightyPart Games', memberCount: 102, hasVerifiedBadge: false } ]
 * @exampleRawBody { data: [ { id: 5850082, name: 'MightyPart Games', memberCount: 102, hasVerifiedBadge: false } ] }
 */
export async function groupLookupSearch(
  this: ThisAllOverrides, groupName: string
): ApiMethodResponse<RawGroupLookupSearch, FormattedGroupLookupSearch> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupLookupSearch>(
      `${baseUrl}/v1/groups/search/lookup`, {
        searchParams: { groupName },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupLookupSearch")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody.data, response, cache })
  }, [400])
}


/**
 * Gets suggested groups and other miscellaneous information needed for the group/join page like flags.
 * @category Group Search
 * @endpoint GET /v1/groups/search/metadata
 * 
 * @example const { data:searchMetadata } = await ClassicGroupsApi.groupSearchMetadata()
 * @exampleData { suggestedGroupKeywords: [ 'Experience Studios', 'Building', 'Roleplaying', 'Fan' ], showFriendsGroupsSort: true }
 * @exampleRawBody { SuggestedGroupKeywords: [ 'Experience Studios', 'Building', 'Roleplaying', 'Fan' ], ShowFriendsGroupsSort: true }
 */
export async function groupSearchMetadata(this: ThisAllOverrides): ApiMethodResponse<RawGroupSearchMetadata, FormattedGroupSearchMetadata> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupSearchMetadata>(
      `${baseUrl}/v1/groups/search/metadata`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupLookupSearch")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => toCamel<RawGroupSearchMetadata, FormattedGroupSearchMetadata>(rawBody)

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [404])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a list of roles from role ids.
 * @category Roles
 * @endpoint GET /v1/roles
 * 
 * @param roleIds The ids of roles to get.
 * 
 * @example const { data:roles } = await ClassicGroupsApi.groupRolesFromIds([38353811])
 * @exampleData { '38353811': { groupId: 5850082, name: 'NamelessGuy2005 - Scriptor', rank: 255 } }
 * @exampleRawBody { data: [ { groupId: 5850082, id: 38353811, name: 'NamelessGuy2005 - Scriptor', rank: 255 } ] }
 */
export async function groupRolesFromIds<RoleId extends number>(
  this: ThisAllOverrides, roleIds: NonEmptyArray<RoleId>
): ApiMethodResponse<RawGroupRolesFromIdsData<RoleId>, FormattedGroupRolesFromIdsData<RoleId>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupRolesFromIdsData<RoleId>>(
      `${baseUrl}/v1/roles`, {
        searchParams: { ids: roleIds },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupRolesFromIds")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = (): FormattedGroupRolesFromIdsData<RoleId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "id", ({ groupId, name, rank }: any) => ({ groupId, name, rank })
    )

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PRIMARY GROUP ] /////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets a user's primary group.
 * @category Primary Group
 * @endpoint GET /v1/users/{userId}/groups/primary/role
 * 
 * @param userId The id of the user to get the primary group for.
 * 
 * @example const { rawBody:primaryGroup } = await ClassicGroupsApi.primaryGroupForUser(45348281)
 * @exampleData { group: { id: 5850082, name: "MightyPart Games", description: "Welcome to my amazing group", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }
 * @exampleRawBody { group: { id: 5850082, name: "MightyPart Games", description: "Welcome to my amazing group", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }
 */
export async function primaryGroupForUser(
  this: ThisAllOverrides, userId: number
): ApiMethodResponse<RawPrimaryGroupForUserData, FormattedPrimaryGroupForUserData> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawPrimaryGroupForUserData>(
      `${baseUrl}/v1/users/${userId}/groups/primary/role`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "primaryGroupForUser")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawPrimaryGroupForUserData, FormattedPrimaryGroupForUserData
    >(rawBody, obj => {
        if (!obj.group.shout) return
        obj.group.shout.created = new Date(obj.group.shout.created)
        obj.group.shout.updated = new Date(obj.group.shout.updated)
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400])
}


/**
 * Removes the authenticated user's primary group.
 * @category Primary Group
 * @endpoint DELETE /v1/user/groups/primary
 * 
 * @example const { data:success } = await ClassicGroupsApi.authenticatedUserRemovePrimaryGroup()
 * @exampleData true
 * @exampleRawBody {}
 */
export async function authenticatedUserRemovePrimaryGroup(this: ThisAllOverrides): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.delete<{}>(
      `${baseUrl}/v1/user/groups/primary`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "authenticatedUserRemovePrimaryGroup"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [403])
}


/**
 * Sets the authenticated user's primary group.
 * @category Primary Group
 * @endpoint POST /v1/user/groups/primary
 * 
 * @param groupId The id of the group to set as the primary group.
 * 
 * @example const { data:success } = await ClassicGroupsApi.authenticatedUserSetPrimaryGroup(5850082)
 * @exampleData true
 * @exampleRawBody {}
 */
export async function authenticatedUserSetPrimaryGroup(this: ThisAllOverrides, groupId: number): ApiMethodResponse<{}, boolean> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.post<{}>(
      `${baseUrl}/v1/user/groups/primary`, {
        body: { groupId },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "authenticatedUserSetPrimaryGroup"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: () => dataIsSuccess(rawBody), response, cache })
  }, [400, 403])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLE SETS ] /////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * (THIS ENDPOINT PROBABLY DOESN'T WORK). Updates an existing role set.
 * @category Role Sets
 * @endpoint PATCH /v1/groups/{groupId}/rolesets/{roleSetId}
 * 
 * @param groupId The id of the group.
 * @param roleSetId The id of the role to update.
 * @param request The updated information.
 *  
 * @example const { data:updatedRole } = await ClassicGroupsApi.updateRoleSet(5850082, 38353813, {
    name: "Mighty Member",
    description: "A regular group member.",
    rank: 2
  })
 * @exampleData { id: 38353813, name: "Mighty Member", description:  "A regular group member.", rank: 2, memberCount: 94 }
 * @exampleRawBody { id: 38353813, name: "Mighty Member", description:  "A regular group member.", rank: 2, memberCount: 94 }
 */
export async function updateGroupRoleSet<Request extends UpdateRoleSetRequest>(
  this: ThisAllOverrides, groupId: number, roleSetId: number, request: Request
): ApiMethodResponse<UpdateRoleSetData<Request>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.patch<UpdateRoleSetData<Request>>(
      `${baseUrl}/v1/groups/${groupId}/rolesets/${roleSetId}`, {
        body: { request },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "updateGroupRoleSet")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cache })
  }, [400, 403])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUPS V2 ] /////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets information about multiple groups.
 * @category Groups
 * @endpoint GET /v2/groups
 * 
 * @param groupIds The id of the groups to get information for.
 *  
 * @example const { rawBody:groups } = await ClassicGroupsApi.groupIdsToGroupsInfo([5850082])
 * @exampleData { "5850082": { name: "MightyPart Games", description: "Welcome to my amazing group", owner: { id: 45348281, type: "User" }, created: 2020-03-29T18:15:20.100Z, hasVerifiedBadge: false } }
 * @exampleRawBody { data: [ { id: 5850082, name: "MightyPart Games", description: "Welcome to my amazing group", owner: { id: 45348281, type: "User" }, created: "2020-03-29T18:15:20.1Z", hasVerifiedBadge: false } ] }
 */
export async function groupIdsToGroupsInfo<GroupId extends number>(
  this: ThisAllOverrides, groupIds: GroupId[]
): ApiMethodResponse<RawGroupIdsToGroupsInfoData<GroupId>, FormattedGroupIdsToGroupsInfoData<GroupId>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<any>(
      `${baseUrl}/v2/groups`, {
        searchParams: { groupIds },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupIdsToGroupsInfo")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = (): FormattedGroupIdsToGroupsInfoData<GroupId> => createObjectMapByKeyWithMiddleware(
      rawBody.data, "id", ({ name, description, owner, created, hasVerifiedBadge }: any) => (
        { name, description, owner, created: (new Date(created)), hasVerifiedBadge }
      )
    )

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [400, 403])
}

/**
 * Gets a list of all roles for every group that the specified user is in.
 * @category Groups V2
 * @endpoint GET /v2/users/{userId}/groups/roles
 * @tags [ "Cookie" ]
 * 
 * @param userId The id of the user to get roles for.
 * 
 * @example const { data:groups } = await ClassicGroupsApi.allGroupRolesForUser_v2(45348281)
 * @exampleData [ { group: { id: 5850082, name: "MightyPart Games", memberCount: 108, hasVerifiedBadge: false }, role: { id: 5850082, name: "Mighty Member", rank: 100 } } ]
 * @exampleRawBody { data: [ { group: { id: 5850082, name: "MightyPart Games", memberCount: 108, hasVerifiedBadge: false }, role: { id: 5850082, name: "Mighty Member", rank: 100 } } ] }
 */
export async function allGroupRolesForUser_V2(this: ThisAllOverrides, userId: number): ApiMethodResponse<
  RawAllGroupRolesForUserData_V2, FormattedAllGroupRolesForUserData_V2
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawAllGroupRolesForUserData_V2>(
      `${baseUrl}/v2/users/${userId}/groups/roles`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(
          apiName, "allGroupRolesForUser_V2"
        )),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    return buildResponse({ rawBody, data: rawBody.data, response, cache })
  }, [400])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ WALL V2 ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
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
 * @example const { data:wallPosts } = await ClassicGroupsApi.groupWallPosts_V2(5850082)
 * @exampleData [ { id: 2724986278, poster: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353813, name: "Mighty Member", rank: 1 } }, body: "Lorem ipsum dolor sit amet.", created: 2022-11-19T16:30:38.197Z, updated: 2022-11-19T16:30:38.197Z } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: "2549745135_1_00ad0f026ca1d251093fc548c366b7ea", data: [ { id: 2724986278, poster: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353813, name: "Mighty Member", rank: 1 } }, body: "Lorem ipsum dolor sit amet.", created: 2022-11-19T16:30:38.197Z, updated: 2022-11-19T16:30:38.197Z } ] }
 */
export async function groupWallPosts_V2(
  this: ThisAllOverrides, groupId: number, limit: 10|25|50|100=100, sortOrder: SortOrder="Desc", cursor?: string 
): ApiMethodResponse<RawGroupWallPostsData_V2, FormattedGroupWallPostsData_V2, "PAGINATED"> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupWallPostsData_V2>(
      `${baseUrl}/v2/groups/${groupId}/wall/posts`, {
        searchParams: { limit, sortOrder, cursor },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupWallPosts_V2")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupWallPostsData_V2["data"], FormattedGroupWallPostsData_V2
    >(rawBody.data, obj => {
      obj.forEach(wallPost => {
        wallPost.created = new Date(wallPost.created)
        wallPost.updated = new Date(wallPost.updated)
      })
    })

    return buildResponse(
      { rawBody, data: getFormattedData, response, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, cache }
    )
  }, [400, 403])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////