// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayToUnion, Identifier, ISODateTime, ObjectPrettify } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { GroupMembers_Filter, GroupMembers_WildcardFilter, GroupRole, PrettifiedGroupInfoData, PrettifiedGroupJoinRequestsData, PrettifiedGroupMembersData, PrettifiedGroupRolesData, PrettifiedGroupShoutData, RawGroupInfoData, RawGroupJoinRequestsData, RawGroupMembersData, RawGroupRolesData, RawGroupShoutData, UpdateGroupMemberRoleData } from "./groups.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "Users", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const formatGroupMembersFilters = (groupId: Identifier | "-", filter: GroupMembers_WildcardFilter | GroupMembers_Filter) => {
  let formattedFilter

  if (groupId === "-")
    formattedFilter = `user in [${(filter as unknown as GroupMembers_WildcardFilter).userIds.map(userId => `'users/${userId}'`).join(", ")}]`
  
  else {
    const userIdFilter = (filter as unknown as GroupMembers_Filter)?.userId
    if (userIdFilter) formattedFilter = `user == 'users/${userIdFilter}'`

    else {
      const roleIdFilter = (filter as unknown as GroupMembers_Filter)?.roleId
      if (roleIdFilter) formattedFilter = `role == 'groups/${groupId}/roles/${roleIdFilter}'`
    }
  }

  return formattedFilter
}
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about a user from their id.
 * @endpoint GET /v2/groups/{groupId}
 * 
 * @param groupId The id of the group to get info about.
 * 
 * @example  const { data:groupInfo } = await GroupsApi.groupInfo({ groupId: 5850082 });
 * @exampleData {"path":"groups/5850082","createTime":"2020-03-29T18:15:20.100Z","updateTime":"2024-05-12T13:17:41.639Z","id":"5850082","displayName":"MightyPart Games","description":"Hello World!","owner":"users/45348281","memberCount":99,"publicEntryAllowed":true,"locked":false,"verified":false}
 * @exampleRawBody {"path":"groups/5850082","createTime":"2020-03-29T18:15:20.100Z","updateTime":"2024-05-12T13:17:41.639132600Z","id":"5850082","displayName":"MightyPart Games","description":"Hello World!","owner":"users/45348281","memberCount":99,"publicEntryAllowed":true,"locked":false,"verified":false}
 */
export const groupInfo = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<RawGroupInfoData<GroupId>, PrettifiedGroupInfoData<GroupId>> => ({
  path: `/v2/groups/${groupId}`,
  method: "GET",
  name: "groupInfo",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })
}))


/**
 * Gets members for a group.
 * @endpoint GET /v2/groups/{groupId}/memberships
 * 
 * @param groupId The id of the group to get join requests for.
 * @param limit The maximum number of group memberships to return. The service might return fewer than this value. If unspecified, at most 10 group memberships are returned. The maximum value is 100 and higher values are set to 100.
 * @param filter This field may be set in order to filter the resources returned.
 * @param cursor A page token, received from a previous call, to retrieve a subsequent page.
 * 
 * @example const { data:members } = await GroupsApi.groupMembers({ groupId: 5850082, filter: { userId: 45348281 } })
 * @exampleData [{"path":"groups/5850082/memberships/NDUzNDgyODE","createTime":"2020-03-29T18:15:20.020Z","updateTime":"2023-09-15T07:03:50.583Z","user":"users/45348281","role":"groups/5850082/roles/38353811"}]
 * @exampleRawBody {"groupMemberships":[{"path":"groups/5850082/memberships/NDUzNDgyODE","createTime":"2020-03-29T18:15:20.020Z","updateTime":"2023-09-15T07:03:50.583Z","user":"users/45348281","role":"groups/5850082/roles/38353811"}],"nextPageToken":""}
 */
export const groupMembers = createApiMethod(async <
  GroupId extends Identifier | "-",
  const Filter extends GroupId extends "-" ? ObjectPrettify<GroupMembers_WildcardFilter> : ObjectPrettify<GroupMembers_Filter>,


  const UserId extends Identifier = (
    "userIds" extends keyof Filter
      ? Filter["userIds"] extends readonly Identifier[]
        ? ArrayToUnion<Filter["userIds"]> : Identifier
      : "userId" extends keyof Filter
        ? Filter["userId"] extends Identifier ? Filter["userId"] : Identifier
        : Identifier
  ),

  const RoleId extends Identifier = (
      "roleId" extends keyof Filter
        ? Filter["roleId"] extends Identifier ? Filter["roleId"] : Identifier
        : Identifier
  )
>(
  { groupId, limit, filter, cursor }
  : { groupId: GroupId, limit?: UserId, filter?: Filter, cursor?: string }
): ApiMethod<RawGroupMembersData<GroupId, UserId>, PrettifiedGroupMembersData<GroupId, UserId, RoleId>> => ({
  path: `/v2/groups/${groupId}/memberships`,
  method: "GET",
  searchParams: {
    maxPageSize: limit, pageToken: cursor,
    filter: formatGroupMembersFilters(groupId, filter as unknown as GroupMembers_WildcardFilter | GroupMembers_Filter)
  },
  name: "groupMembers",

  formatRawDataFn: ({ groupMemberships }) => groupMemberships.map(member => cloneAndMutateObject(member, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })),

  getCursorsFn: ({ nextPageToken }) => [null, nextPageToken]
}))


/**
 * Gets roles for a group.
 * @endpoint GET /v2/groups/{groupId}/roles
 * 
 * @param groupId The id of the group to get roles for.
 * @param limit The maximum number of group roles to return. The service might return fewer than this value. If unspecified, at most 10 group roles are returned. The maximum value is 20 and higher values are set to 20.
 * @param cursor A page token, received from a previous call, to retrieve a subsequent page.
 * 
 * @example const { data:roles } = await GroupsApi.groupRoles({ groupId: 5850082, limit: 1 })
 * @exampleData [{"path":"groups/5850082/roles/38353811","createTime":"2020-03-29T13:15:20.020Z","updateTime":"2020-09-20T08:04:35.850Z","id":"38353811","displayName":"NamelessGuy2005 - Scriptor","description":"","rank":255,"memberCount":1,"permissions":{"viewWallPosts":true,"createWallPosts":true,"deleteWallPosts":true,"viewGroupShout":true,"createGroupShout":true,"changeRank":true,"acceptRequests":true,"exileMembers":true,"manageRelationships":true,"viewAuditLog":true,"spendGroupFunds":true,"advertiseGroup":true,"createAvatarItems":true,"manageAvatarItems":true,"manageGroupUniverses":true,"viewUniverseAnalytics":true,"createApiKeys":true,"manageApiKeys":true}}]
 * @exampleRawBody {"groupRoles":[{"path":"groups/5850082/roles/38353811","createTime":"2020-03-29T13:15:20.020Z","updateTime":"2020-09-20T08:04:35.850Z","id":"38353811","displayName":"NamelessGuy2005 - Scriptor","description":"","rank":255,"memberCount":1,"permissions":{"viewWallPosts":true,"createWallPosts":true,"deleteWallPosts":true,"viewGroupShout":true,"createGroupShout":true,"changeRank":true,"acceptRequests":true,"exileMembers":true,"manageRelationships":true,"viewAuditLog":true,"spendGroupFunds":true,"advertiseGroup":true,"createAvatarItems":true,"manageAvatarItems":true,"manageGroupUniverses":true,"viewUniverseAnalytics":true,"createApiKeys":true,"manageApiKeys":true}}],"nextPageToken":"38353811"}
 */
export const groupRoles = createApiMethod(async <GroupId extends Identifier>(
  { groupId, limit, cursor }
  : { groupId: GroupId, limit?: number,  cursor?: string }
): ApiMethod<RawGroupRolesData<GroupId>, PrettifiedGroupRolesData<GroupId>> => ({
  path: `/v2/groups/${groupId}/roles`,
  method: "GET",
  searchParams: { maxPageSize: limit, pageToken: cursor },
  name: "groupRoles",

  formatRawDataFn: ({ groupRoles }) => groupRoles.map(role => cloneAndMutateObject(role, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })),

  getCursorsFn: ({ nextPageToken }) => [null, nextPageToken]
}))


/**
 * Gets information about a specific role for a group.
 * @endpoint GET /v2/groups/{groupId}/roles/{roleId}
 * 
 * @param groupId The id of the group to get the role information from.
 * @param roleId The id of the role to get information about.
 * 
 * @example const { data:role } = await GroupsApi.groupRole({ groupId: 5850082, roleId: 48715304 })
 * @exampleData
 * @exampleRawBody
 */
export const groupRole = createApiMethod(async <GroupId extends Identifier, RoleId extends Identifier>(
  { groupId, roleId }:
  { groupId: GroupId, roleId: RoleId }
): ApiMethod<GroupRole<GroupId, RoleId, ISODateTime>> => ({
  path: `/v2/groups/${groupId}/roles/${roleId}`,
  method: "GET",
  name: "groupRole",
}))


/**
 * Gets roles for a group.
 * @endpoint GET /v2/groups/{groupId}/roles
 * 
 * @param groupId The id of the group to get roles for.
 * @param limit The maximum number of group roles to return. The service might return fewer than this value. If unspecified, at most 10 group roles are returned. The maximum value is 20 and higher values are set to 20.
 * @param cursor A page token, received from a previous call, to retrieve a subsequent page.
 * 
 * @example const { data:shout } = await GroupsApi.groupShout({ groupId: 5850082 })
 * @exampleData {"path":"groups/5850082/shout","createTime":"2020-03-31T18:36:51.607Z","updateTime":"2023-09-17T20:35:48.213Z","content":"Hello World!","poster":"users/45348281"}
 * @exampleRawBody {"path":"groups/5850082/shout","createTime":"2020-03-31T18:36:51.607Z","updateTime":"2023-09-17T20:35:48.213Z","content":"Hello World!","poster":"users/45348281"}
 */
export const groupShout = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<RawGroupShoutData<GroupId>, PrettifiedGroupShoutData<GroupId>> => ({
  path: `/v2/groups/${groupId}/shout`,
  method: "GET",
  name: "groupShout",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.updateTime = new Date(obj.updateTime)
  })
}))


/**
 * Gets join requests for a group.
 * @endpoint GET /v2/groups/{groupId}/join-requests
 * 
 * @param groupId The id of the group to get join requests for.
 * @param limit The maximum number of group join requests to return. The service might return fewer than this value. If unspecified, at most 10 group join requests are returned. The maximum value is 20 and higher values are set to 20.
 * @param filter This field may be set in order to filter the resources returned.
 * @param cursor A page token, received from a previous call, to retrieve a subsequent page.
 * 
 * @example const { data:joinRequests } = await GroupsApi.groupJoinRequests({ groupId: 5850082 })
 * @exampleData [{"path":"groups/5850082/join-requests/2655994471","createTime":"2024-05-12T16:32:46.841Z","user":"users/2655994471"}]
 * @exampleRawBody {"groupJoinRequests":[{"path":"groups/5850082/join-requests/2655994471","createTime":"2024-05-12T16:32:46.841Z","user":"users/2655994471"}],"nextPageToken":""}
 */
export const groupJoinRequests = createApiMethod(async <GroupId extends Identifier>(
  { groupId, limit, filter:{userId:userIdFilter} = {} as any, cursor }
  : { groupId: GroupId, limit?: number, filter?: { userId: Identifier }, cursor?: string }
): ApiMethod<RawGroupJoinRequestsData<GroupId>, PrettifiedGroupJoinRequestsData<GroupId>> => ({
  path: `/v2/groups/${groupId}/join-requests`,
  method: "GET",
  searchParams: { maxPageSize: limit, pageToken: cursor, filter: userIdFilter && `user == 'users/${userIdFilter}'` },
  name: "groupJoinRequests",

  formatRawDataFn: ({ groupJoinRequests }) => groupJoinRequests.map(request => cloneAndMutateObject(request, obj => {
    obj.createTime = new Date(obj.createTime)
  })),

  getCursorsFn: ({ nextPageToken }) => [null, nextPageToken]
}))


/**
 * Accepts a group join request.
 * @endpoint POST /v2/groups/{groupId}/join-requests/{userId}:accept
 * 
 * @param groupId The id of the group to accept a join request for.
 * @param userId The id of the user to accept into the group.
 * 
 * @example const { data:success } = await GroupsApi.acceptGroupJoinRequest({ groupId: 5850082, userId: 2655994471 });
 * @exampleData true
 * @exampleRawBody {}
 */
export const acceptGroupJoinRequest = createApiMethod(async (
  { groupId, userId }: { groupId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v2/groups/${groupId}/join-requests/${userId}:accept`,
  body: {},
  name: "acceptGroupJoinRequest",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Declines a group join request.
 * @endpoint POST /v2/groups/{groupId}/join-requests/{userId}:decline
 * 
 * @param groupId The id of the group to decline a join request for.
 * @param userId The id of the user to decline from the group.
 * 
 * @example const { data:success } = await GroupsApi.declineGroupJoinRequest({ groupId: 5850082, userId: 2655994471 });
 * @exampleData true
 * @exampleRawBody {}
 */
export const declineGroupJoinRequest = createApiMethod(async (
  { groupId, userId }: { groupId: Identifier, userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v2/groups/${groupId}/join-requests/${userId}:decline`,
  body: {},
  name: "declineGroupJoinRequest",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Updates the group membership for a particular group member. This action requires the requester to be able to manage lower ranked members. Guest or Owner ranks cannot be assigned, and a requester cannot change their own rank.
 * @endpoint PATCH /v2/groups/{groupId}/memberships/{userId}
 * 
 * @param groupId The id of the group to change a users role for.
 * @param userId The id of the user to change role for.
 * @param roleId The id of the role to update to.
 * 
 * @example const { data:success } = await GroupsApi.updateGroupMemberRole({ groupId: 5850082, userId: 2655994471, roleId: 41112469 });
 * @exampleData {"path":"groups/5850082/memberships/MTU5OTk0MDk4NQ","createTime":"2020-04-30T10:28:57.147Z","updateTime":"2025-05-17T16:26:10.879549500Z","user":"users/1599940985","role":"groups/5850082/roles/41112469"}
 * @exampleRawBody {"path":"groups/5850082/memberships/MTU5OTk0MDk4NQ","createTime":"2020-04-30T10:28:57.147Z","updateTime":"2025-05-17T16:26:10.879549500Z","user":"users/1599940985","role":"groups/5850082/roles/41112469"}
 */
export const updateGroupMemberRole = createApiMethod(async <GroupId extends Identifier, RoleId extends Identifier>(
  { groupId, userId, roleId }: { groupId: GroupId, userId: Identifier, roleId: RoleId }
): ApiMethod<UpdateGroupMemberRoleData<GroupId, RoleId>> => ({
  method: "PATCH",
  path: `/v2/groups/${groupId}/memberships/${userId}`,
  body: {
    role: `groups/${groupId}/roles/${roleId}`
  },
  name: "declineGroupJoinRequest"
}))