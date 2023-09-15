import { Either, PrettifyKeyof } from "../../../utils/utils.types"


// [ GROUPS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v2/groups/{groupId} ------------------------------------------------------------------------------------------
type GroupInfoData<GroupId extends number, TimeType> = PrettifyKeyof<{
  path: `groups/${GroupId}`,
  createTime: TimeType,
  updateTime: TimeType,
  id: `${number}`,
  displayName: string,
  description: string,
  owner?: `users/${number}`,
  memberCount: number,
  publicEntryAllowed: boolean,
  locked: boolean,
  verified: boolean
}>

export type RawGroupInfoData<GroupId extends number> = PrettifyKeyof<GroupInfoData<GroupId, string>>

export type FormattedGroupInfoData<GroupId extends number>  = PrettifyKeyof<GroupInfoData<GroupId, Date>>
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/${groupId}/memberships -----------------------------------------------------------------------------
type GroupMembershipsFilterByUser = { userId: number }
type GroupMembershipsFilterByRole = { roleId: number }
type GroupMembershipsFilterByUsers = { userIds: number[] }

export type GroupMembershipsFilter<GroupId extends number | "-" | void = void> =
GroupId extends "-" ?
  GroupMembershipsFilterByUsers
: GroupId extends number ?
  Either<GroupMembershipsFilterByUser, GroupMembershipsFilterByRole> | undefined
: GroupId extends void ?
  GroupMembershipsFilterByUser | GroupMembershipsFilterByRole | GroupMembershipsFilterByUsers
: never

type GroupMemberships<GroupId extends number | "-", TimeFormat> = PrettifyKeyof<{
  path: `groups/${GroupId}/memberships/${string}`,
    createTime: TimeFormat,
    updateTime: TimeFormat,
    user: `users/${number}`,
    role: `groups/${GroupId}/roles/${number}`
}>

export type RawGroupMembershipsData<GroupId extends number | "-"> = PrettifyKeyof<{
  groupMemberships: GroupMemberships<GroupId, string>[],
  nextPageToken?: string
}>

export type FormattedGroupMembershipsData<GroupId extends number | "-"> = PrettifyKeyof<GroupMemberships<GroupId, Date>[]>
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/{groupId}/roles ------------------------------------------------------------------------------------
type GroupRolesPermissions = {
  viewWallPosts: boolean,
  createWallPosts: boolean,
  deleteWallPosts: boolean,
  viewGroupShout: boolean,
  createGroupShout: boolean,
  changeRank: boolean,
  acceptRequests: boolean,
  exileMembers: boolean,
  manageRelationships: boolean,
  viewAuditLog: boolean,
  spendGroupFunds: boolean,
  advertiseGroup: boolean,
  createAvatarItems: boolean,
  manageAvatarItems: boolean,
  manageGroupUniverses: boolean,
  viewUniverseAnalytics: boolean,
  createApiKeys: boolean,
  manageApiKeys: boolean
}

type GroupRolesData<GroupId extends number, TimeType> = PrettifyKeyof<{
  path: `groups/${GroupId}/roles/${number}`,
  createTime: TimeType,
  updateTime: TimeType,
  id: `${number}`,
  displayName: string,
  description: string,
  rank: number,
  memberCount: number,
  permissions: GroupRolesPermissions
}[]>

export type RawGroupRolesData<GroupId extends number> = PrettifyKeyof<{
  groupRoles: GroupRolesData<GroupId, string>,
  nextPageToken?: string
}>

export type FormattedGroupRolesData<GroupId extends number> = PrettifyKeyof<
  GroupRolesData<GroupId, Date>
>
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/{groupId}/shout ------------------------------------------------------------------------------------
type GroupShoutData<GroupId extends number, TimeType> = PrettifyKeyof<{
  path: `groups/${GroupId}/shout`,
  createTime: TimeType,
  updateTime: TimeType,
  content: string,
  poster: `users/${number}`
}>

export type RawGroupShoutData<GroupId extends number> = GroupShoutData<GroupId, string>

export type FormattedGroupShoutData<GroupId extends number> = GroupShoutData<GroupId, Date>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
