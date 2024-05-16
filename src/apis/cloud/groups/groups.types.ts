// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, ISODateTime, ObjectEither, ObjectPrettify, ObjectPrettifyDeep } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////

// GET /v2/groups/{groupId} ------------------------------------------------------------------------------------------
type GroupInfoData<GroupId extends Identifier, TemporalType> = {
  path: `groups/${GroupId}`,
  createTime: TemporalType,
  updateTime: TemporalType,
  id: GroupId,
  displayName: string,
  description: string,
  owner: `users/${Identifier}`
  memberCount: number,
  publicEntryAllowed: boolean,
  locked: boolean,
  verified: boolean
}

export type RawGroupInfoData<GroupId extends Identifier> = GroupInfoData<GroupId, ISODateTime>

export type PrettifiedGroupInfoData<GroupId extends Identifier> = GroupInfoData<GroupId, Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/${groupId}/join-requests ---------------------------------------------------------------------------
type GroupJoinRequestData<GroupId extends Identifier, TemporalType> = ObjectPrettify<{
  path: `groups/${GroupId}/join-requests/${Identifier}`,
  createTime: TemporalType,
  user: `users/${Identifier}`
}>

export type RawGroupJoinRequestsData<GroupId extends Identifier> = ObjectPrettifyDeep<{
  groupJoinRequests: GroupJoinRequestData<GroupId, ISODateTime>[],
  nextPageToken: string
}>

export type PrettifiedGroupJoinRequestsData<GroupId extends Identifier> = GroupJoinRequestData<GroupId, Date>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/${groupId}/memberships -----------------------------------------------------------------------------
export type GroupMembers_Filter = ObjectEither<
  { userId: Identifier },
  { roleId: Identifier }
>

export type GroupMembers_WildcardFilter = ObjectPrettify<{ readonly userIds: Identifier[] }>

type GroupMember<GroupId extends Identifier | "-", TemporalType, UserId extends Identifier = Identifier> = ObjectPrettify<{
  path: `groups/${GroupId}/memberships/${string}`,
  createTime: TemporalType,
  updateTime: TemporalType,
  user: `users/${UserId}`,
  role: `groups/${GroupId}/roles/${string}`
}>

export type RawGroupMembersData<GroupId extends Identifier | "-", UserId extends Identifier = Identifier> = ObjectPrettify<{
  groupMemberships: GroupMember<GroupId, ISODateTime, UserId>[],
  nextPageToken: string
}>

export type PrettifiedGroupMembersData<GroupId extends Identifier | "-", UserId extends Identifier = Identifier> = GroupMember<GroupId, Date, UserId>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/${groupId}/roles -----------------------------------------------------------------------------------
type GroupRole<GroupId extends Identifier, TemporalType> = ObjectPrettify<{
  path: `groups/${GroupId}/roles/${Identifier}`,
  createTime: TemporalType,
  updateTime: TemporalType,
  id: Identifier,
  displayName: string,
  description: string,
  rank: number,
  memberCount: number,
  permissions: {
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
}>

export type RawGroupRolesData<GroupId extends Identifier> = {
  groupRoles: GroupRole<GroupId, ISODateTime>[]
  nextPageToken: string
}

export type PrettifiedGroupRolesData<GroupId extends Identifier> = GroupRole<GroupId, Date>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/${groupId}/shout -----------------------------------------------------------------------------------
type GroupShoutData<GroupId extends Identifier, TemporalType> = {
  path: `groups/${GroupId}/shout`,
  createTime: TemporalType,
  updateTime: TemporalType,
  content: string,
  poster: `users/${Identifier}`
}

export type RawGroupShoutData<GroupId extends Identifier> = GroupShoutData<GroupId, ISODateTime>

export type PrettifiedGroupShoutData<GroupId extends Identifier> = GroupShoutData<GroupId, Date>
// -------------------------------------------------------------------------------------------------------------------