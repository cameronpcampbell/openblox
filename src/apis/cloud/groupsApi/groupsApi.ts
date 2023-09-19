// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse } from "../../../apis/apis.utils"

import { getCacheSettingsOverride, getCredentialsOverride } from "../../../config/config"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import { cloneAndMutateObject } from "../../../utils"
import type { ApiMethodResponse } from "../../apis.types"
import type { FormattedGroupInfoData, FormattedGroupMembershipsData, FormattedGroupRolesData, FormattedGroupShoutData, GroupMembershipsFilter, RawGroupInfoData, RawGroupMembershipsData, RawGroupRolesData, RawGroupShoutData } from "./groupsApi.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
const formatGroupMembershipsFilter = (filter: GroupMembershipsFilter, groupId: number | "-") => {
  if ("userIds" in filter) {
    return `user in [${ filter.userIds.map(id => `'users/${id}'`).join(", ") }]`

  } else if ("userId" in filter) {
    return `user == 'users/${filter.userId}'`

  } else if ("roleId" in filter) {
    return `role == 'groups/${groupId}/roles/${filter.roleId}'`
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://apis.roblox.com/cloud"
const apiName = "GroupsApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = []


// [ METHODS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets information about a specified group.
 * @endpoint GET /v2/groups/{groupId}
 * @tags [ "CloudKey Needed" ]
 * 
 * @param groupId The id of the group to get information about.
 * 
 * @example const { data:groupInfo } = await GroupsApi.groupInfo(5850082)
 * @exampleData { path: "groups/5850082", createTime: 2020-03-29T18:15:20.100Z, updateTime: 2023-08-26T19:19:43.360Z, id: "5850082", displayName: "MightyPart Games", description: "lorem ipsum dolor sit amet.", owner: "users/45348281", memberCount: 102, publicEntryAllowed: false, locked: false, verified: false }
 * @exampleRawBody { path: "groups/5850082", createTime: "2020-03-29T18:15:20.100Z", updateTime: "2023-08-26T19:19:43.360Z", id: "5850082", displayName: "MightyPart Games", description: "lorem ipsum dolor sit amet.", owner: "users/45348281", memberCount: 102, publicEntryAllowed: false, locked: false, verified: false }
 */
export async function groupInfo<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId
): ApiMethodResponse<RawGroupInfoData<GroupId>, FormattedGroupInfoData<GroupId>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupInfoData<GroupId>>(`${baseUrl}/v2/groups/${groupId}`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupInfo")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => cloneAndMutateObject<RawGroupInfoData<GroupId>, FormattedGroupInfoData<GroupId>>(rawBody, obj => {
      obj.createTime = new Date(obj.createTime)
      obj.updateTime = new Date(obj.updateTime)
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache })
  }, [])
}


/**
 * Gets group membership status information.
 * @endpoint GET /v2/groups/{groupId}/memberships
 * @tags [ "CloudKey Needed" ]
 * 
 * @param groupId The id of the group to get membership information about.
 * @param maxPageSize The maximum number of group memberships to return.
 * @param filter This field may be set in order to filter the resources returned.
 * @param pageToken A paging cursor for a specified page.
 * 
 * @example const { data:memberships } = await GroupsApi.groupMemberships("-", 1, { userIds: [45348281] })
 * @exampleData [ { path: "groups/698855/memberships/NDUzNDgyODE", createTime: 2018-02-23T17:18:02.630Z, updateTime: 2018-02-23T17:18:02.630Z, user: "users/45348281", role: "groups/698855/roles/26237353" } ]
 * @exampleRawBody { groupMemberships: [ { path: "groups/698855/memberships/NDUzNDgyODE", createTime: "2018-02-23T17:18:02.630Z", updateTime: "2018-02-23T17:18:02.630Z", user: "users/45348281", role: "groups/698855/roles/26237353" } ], nextPageToken: "324439743" }
 */
export async function groupMemberships<GroupId extends number | "-">(
  this: ThisAllOverrides, groupId: GroupId, maxPageSize: number = 100, filter: GroupMembershipsFilter<GroupId>, pageToken?: string
): ApiMethodResponse<RawGroupMembershipsData<GroupId>, FormattedGroupMembershipsData<GroupId>, "PAGINATED"> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupMembershipsData<GroupId>>(
      `${baseUrl}/v2/groups/${groupId}/memberships`, {
        searchParams: { groupId, maxPageSize, filter: filter && formatGroupMembershipsFilter(filter, groupId), pageToken },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupMemberships")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupMembershipsData<GroupId>["groupMemberships"], FormattedGroupMembershipsData<GroupId>
    >(rawBody.groupMemberships, obj => {
      obj.forEach(membership => {
        membership.createTime = new Date(membership.createTime)
        membership.updateTime = new Date(membership.updateTime)
      })
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache, cursors: { next: rawBody.nextPageToken } })
  }, [])
}


/**
 * Gets roles for a given group.
 * @endpoint GET /v2/groups/{groupId}/roles
 * @tags [ "CloudKey Needed" ]
 * 
 * @param groupId The id of the group to get role information about.
 * @param maxPageSize The maximum number of group memberships to return.
 * @param filter This field may be set in order to filter the resources returned.
 * @param pageToken A paging cursor for a specified page.
 * 
 * @example const { data:roles } = await GroupsApi.groupRoles(5850082, 1)
 * @exampleData [ { path: "groups/5850082/roles/38353811", createTime: 2020-03-29T13:15:20.020Z, updateTime: 2020-09-20T08:04:35.850Z, id: "38353811", displayName: "NamelessGuy2005 - Scriptor", description: "", rank: 255, memberCount: 1, permissions: { viewWallPosts: true, createWallPosts: true, deleteWallPosts: true, viewGroupShout: true, createGroupShout: true, changeRank: true, acceptRequests: true, exileMembers: true, manageRelationships: true, viewAuditLog: true, spendGroupFunds: true, advertiseGroup: true, createAvatarItems: true, manageAvatarItems: true, manageGroupUniverses: true, viewUniverseAnalytics: true, createApiKeys: true, manageApiKeys: true } } ]
 * @exampleRawBody { groupRoles: [ {  path: "groups/5850082/roles/38353811", createTime: "2020-03-29T13:15:20.020Z", updateTime: "2020-09-20T08:04:35.850Z", id: "38353811", displayName: "NamelessGuy2005 - Scriptor", description: "", rank: 255, memberCount: 1, permissions: permissions: { viewWallPosts: true, createWallPosts: true, deleteWallPosts: true, viewGroupShout: true, createGroupShout: true, changeRank: true, acceptRequests: true, exileMembers: true, manageRelationships: true, viewAuditLog: true, spendGroupFunds: true, advertiseGroup: true, createAvatarItems: true, manageAvatarItems: true, manageGroupUniverses: true, viewUniverseAnalytics: true, createApiKeys: true, manageApiKeys: true } } ], nextPageToken: "38353811" }
 */
export async function groupRoles<GroupId extends number>(
  this: ThisAllOverrides, groupId: GroupId, maxPageSize: number = 100, pageToken?: string
): ApiMethodResponse<RawGroupRolesData<GroupId>, FormattedGroupRolesData<GroupId>, "PAGINATED"> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<RawGroupRolesData<GroupId>>(
      `${baseUrl}/v2/groups/${groupId}/roles`, {
        searchParams: { groupId, maxPageSize, pageToken },
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupRoles")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawGroupRolesData<GroupId>["groupRoles"], FormattedGroupRolesData<GroupId>
    >(rawBody.groupRoles, obj => {
      obj.forEach(role => {
        role.createTime = new Date(role.createTime)
        role.updateTime = new Date(role.updateTime)
      })
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache, cursors: { next: rawBody.nextPageToken } })
  }, [])
}


/**
 * Gets shout for a given group.
 * @endpoint GET /v2/groups/{groupId}/shout
 * @tags [ "CloudKey Needed" ]
 * 
 * @param groupId The id of the group to get the shout for.
 * 
 * @example const { data:shout } = await GroupsApi.groupShout(5850082)
 * @exampleData { path: "groups/5850082/shout", createTime: 2020-03-31T18:36:51.607Z, updateTime: 2023-07-30T12:26:28.257Z, content: "hi guys", poster: "users/45348281" }
 * @exampleRawBody { path: "groups/5850082/shout", createTime: "2020-03-31T18:36:51.607Z", updateTime: "2023-07-30T12:26:28.257Z", content: "hi guys", poster: "users/45348281" }
 */
export async function groupShout<GroupId extends number>(this: ThisAllOverrides, groupId: GroupId): ApiMethodResponse<
  RawGroupShoutData<GroupId>, FormattedGroupShoutData<GroupId>
> {
  const overrides = this

  return BaseHandler(async function(this: ThisProfile) {
    const { data:rawBody, response, cachedResultType:cache } = await this.http.get<any>(
      `${baseUrl}/v2/groups/${groupId}/shout`, {
        cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "groupRoles")),
        credentialsOverride: getCredentialsOverride(overrides)
      }
    )

    const getFormattedData = () => cloneAndMutateObject<RawGroupShoutData<GroupId>, FormattedGroupShoutData<GroupId>>(rawBody, obj => {
      obj.createTime = new Date(obj.createTime)
      obj.updateTime = new Date(obj.updateTime)
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cache, cursors: { next: rawBody.nextPageToken } })
  }, [])
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////