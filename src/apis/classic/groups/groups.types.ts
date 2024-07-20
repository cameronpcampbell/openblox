// [ Types ] /////////////////////////////////////////////////////////////////////
import { ArrWithObjectsToCamelCase, KeysToCamelCase } from "../../../utils/utils.types";
import type { Identifier, ISODateTime, ObjectPrettify, UnionPrettify, UnionToArray, Url } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


type UrlProtocol = `http${"s" | ""}://`;


// [ GROUPS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId} ------------------------------------------------------------------------------------------
export type RawGroupInfoData<GroupId extends Identifier> = ObjectPrettify<{
  id: GroupId,
  name: string,
  description: string,
  owner: {
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  shout?: {
    body: string,
    poster: {
      hasVerifiedBadge: boolean,
      userId: string,
      username: string,
      displayName: string
    },
    created: string
    updated: string
  },
  memberCount: number,
  isBuildersClubOnly: boolean,
  publicEntryAllowed: boolean,
  hasVerifiedBadge: boolean
}>

export type PrettifiedGroupInfoData<GroupId extends Identifier> = ObjectPrettify<Omit<RawGroupInfoData<GroupId>, "shout"> & {
  shout?: {
    body: string,
    poster: {
      hasVerifiedBadge: boolean,
      userId: string,
      username: string,
      displayName: string
    },
    created: Date,
    updated: Date
  },
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/audit-log --------------------------------------------------------------------------------
export type GroupAuditLogActionType = "DeletePost" | "RemoveMember" | "AcceptJoinRequest" | "DeclineJoinRequest" | "PostStatus" | "ChangeRank" | "BuyAd" | "SendAllyRequest" | "CreateEnemy" | "AcceptAllyRequest" | "DeclineAllyRequest" | "DeleteAlly" | "DeleteEnemy" | "AddGroupPlace" | "RemoveGroupPlace" | "CreateItems" | "ConfigureItems" | "SpendGroupFunds" | "ChangeOwner" | "Delete" | "AdjustCurrencyAmounts" | "Abandon" | "Claim" | "Rename" | "ChangeDescription" | "InviteToClan" | "KickFromClan" | "CancelClanInvite" | "BuyClan" | "CreateGroupAsset" | "UpdateGroupAsset" | "ConfigureGroupAsset" | "RevertGroupAsset" | "CreateGroupDeveloperProduct" | "ConfigureGroupGame" | "CreateGroupDeveloperSubscriptionProduct" | "Lock" | "Unlock" | "CreateGamePass" | "CreateBadge" | "ConfigureBadge" | "SavePlace" | "PublishPlace" | "UpdateRolesetRank" | "UpdateRolesetData"

type GroupAuditLogBase<actionType extends GroupAuditLogActionType, description extends Record<any, any>> = {
  actor: {
    user: {
      hasVerifiedBadge: boolean,
      userId: number,
      username: string,
      displayName: string
    },
    role: {
      id: number,
      name: string,
      rank: number
    }
  },
  actionType: actionType,
  description: description,
  created: string
}

type GroupAuditLog_DeletePost = GroupAuditLogBase<"DeletePost", {
  PostDec: string,
  TargetId: number,
  TargetName: string
}>
type GroupAuditLog_RemoveMember = GroupAuditLogBase<"RemoveMember", {
  TargetId: number,
  TargetName: string
}>
type GroupAuditLog_AcceptJoinRequest = GroupAuditLogBase<"AcceptJoinRequest", {
  TargetId: number,
  TargetName: string
}>
type GroupAuditLog_DeclineJoinRequest = GroupAuditLogBase<"DeclineJoinRequest", {
  TargetId: number,
  TargetName: string
}>
type GroupAuditLog_PostStatus = GroupAuditLogBase<"PostStatus", {
  Text: string
}>
type GroupAuditLog_ChangeRank = GroupAuditLogBase<"ChangeRank", {
  TargetId: number,
  NewRoleSetId: number,
  OldRoleSetId: number,
  TargetName: string,
  NewRoleSetName: string,
  OldRoleSetName: string
}>
type GroupAuditLog_BuyAd = GroupAuditLogBase<"BuyAd", {
  AdName: string,
  Bid: number,
  CurrencyTypeId: number,
  CurrencyTypeName: string
}>
type GroupAuditLog_SendAllyRequest = GroupAuditLogBase<"SendAllyRequest", {
  TargetGroupId: number,
  TargetGroupName: string
}>
type GroupAuditLog_CreateEnemy = GroupAuditLogBase<"CreateEnemy", { //
  TargetGroupId: number,
  TargetGroupName: string
}>
type GroupAuditLog_AcceptAllyRequest = GroupAuditLogBase<"AcceptAllyRequest", {
  TargetGroupId: number,
  TargetGroupName: string
}>
type GroupAuditLog_DeclineAllyRequest = GroupAuditLogBase<"DeclineAllyRequest", {
  TargetGroupId: number,
  TargetGroupName: string
}>
type GroupAuditLog_DeleteAlly = GroupAuditLogBase<"DeleteAlly", {
  TargetGroupId: number,
  TargetGroupName: string
}>
type GroupAuditLog_DeleteEnemy = GroupAuditLogBase<"DeleteEnemy", { //
  TargetGroupId: number,
  TargetGroupName: string
}>
type GroupAuditLog_AddGroupPlace = GroupAuditLogBase<"AddGroupPlace", { //
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_RemoveGroupPlace = GroupAuditLogBase<"RemoveGroupPlace", { //
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_CreateItems = GroupAuditLogBase<"CreateItems", { //
  AssetId: number,
  AssetName: string
}>
type GroupAuditLog_ConfigureItems = GroupAuditLogBase<"ConfigureItems", { //
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_SpendGroupFunds = GroupAuditLogBase<"SpendGroupFunds", { //
  Amount: number,
  CurrencyTypeId: number,
  ItemDescription: string,
  CurrencyTypeName: string
}>
type GroupAuditLog_ChangeOwner = GroupAuditLogBase<"ChangeOwner", {
  IsRoblox: boolean,
  NewOwnerId: number,
  NewOwnerName: string,
  OldOwnerId: number,
  OldOwnerName: string
}>
type GroupAuditLog_AdjustCurrencyAmounts = GroupAuditLogBase<"AdjustCurrencyAmounts", {
  // legacy action used for adding tickets to group funds, cant get description for it :(.
}>
type GroupAuditLog_Abandon = GroupAuditLogBase<"Abandon", {}> // Yes, this is supposed to be empty.
type GroupAuditLog_Claim = GroupAuditLogBase<"Claim", {}> // Yes, this is supposed to be empty.
type GroupAuditLog_Rename = GroupAuditLogBase<"Rename", {
  NewName: string
}>
type GroupAuditLog_ChangeDescription = GroupAuditLogBase<"ChangeDescription", {
  NewDescription: string
}>
type GroupAuditLog_InviteToClan = GroupAuditLogBase<"InviteToClan", {
  // legacy action used for adding user to clan, cant get description for it :(.
}>
type GroupAuditLog_KickFromClan = GroupAuditLogBase<"KickFromClan", {
  // legacy action used for kicking user from clan, cant get description for it :(.
}>
type GroupAuditLog_CancelClanInvite = GroupAuditLogBase<"CancelClanInvite", {
  // legacy action used for cancelling clan invitation, cant get description for it :(.
}>
type GroupAuditLog_BuyClan = GroupAuditLogBase<"BuyClan", {
  // legacy action used for buying a clan, cant get description for it :(.
}>
type GroupAuditLog_CreateGroupAsset = GroupAuditLogBase<"CreateGroupAsset", {
  AssetId: number,
  AssetName: string,
  VersionNumber: number,
  RevertVersionNumber: number | null
}>
type GroupAuditLog_UpdateGroupAsset = GroupAuditLogBase<"UpdateGroupAsset", {
  AssetId: number,
  AssetName: string,
  VersionNumber: number,
  RevertVersionNumber: number | null
}>
type GroupAuditLog_ConfigureGroupAsset = GroupAuditLogBase<"ConfigureGroupAsset", {
  AssetId: number,
  AssetName: string,
  Actions: number[] | null
}>
type GroupAuditLog_RevertGroupAsset = GroupAuditLogBase<"RevertGroupAsset", {
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_CreateGroupDeveloperProduct = GroupAuditLogBase<"CreateGroupDeveloperProduct", {
  AssetId: number,
  AssetName: string
}>
type GroupAuditLog_ConfigureGroupGame = GroupAuditLogBase<"ConfigureGroupGame", {
  Actions: number[],
  Type: number,
  TargetId: number,
  TargetName: string,
  UniverseId: number | null,
  UniverseName: string
}>
type GroupAuditLog_CreateGroupDeveloperSubscriptionProduct = GroupAuditLogBase<"CreateGroupDeveloperSubscriptionProduct", {
  // possibly for an unreleased feature, cant get description for it :(.
}>
type GroupAuditLog_Lock = GroupAuditLogBase<"Lock", {
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_Unlock = GroupAuditLogBase<"Unlock", {
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_CreateGamePass = GroupAuditLogBase<"CreateGamePass", {
  GamePassId: number,
  PlaceId: number,
  GamePassName: string,
  PlaceName: string
}>
type GroupAuditLog_CreateBadge = GroupAuditLogBase<"CreateBadge", {
  BadgeId: number,
  BadgeName: string,
  Type: null
}>
type GroupAuditLog_ConfigureBadge = GroupAuditLogBase<"ConfigureBadge", {
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_SavePlace = GroupAuditLogBase<"SavePlace", {
  AssetId: number,
  AssetName: string,
  VersionNumber: number
}>
type GroupAuditLog_PublishPlace = GroupAuditLogBase<"PublishPlace", {
  // possibly broken, cant get description for it :(.
}>
type GroupAuditLog_UpdateRolesetRank = GroupAuditLogBase<"UpdateRolesetRank", {
  NewRank: number,
  OldRank: number,
  RoleSetId: number,
  RoleSetName: string
}>
type GroupAuditLog_UpdateRolesetData = GroupAuditLogBase<"UpdateRolesetData", {
  NewDescription: string,
  NewName: string,
  OldDescription: string,
  OldName: string,
  RoleSetId: number,
  RoleSetName: string
}>


type AllGroupAuditLogs = GroupAuditLog_DeletePost | GroupAuditLog_RemoveMember | GroupAuditLog_AcceptJoinRequest | GroupAuditLog_DeclineJoinRequest | GroupAuditLog_PostStatus | GroupAuditLog_ChangeRank | GroupAuditLog_BuyAd | GroupAuditLog_SendAllyRequest | GroupAuditLog_CreateEnemy | GroupAuditLog_AcceptAllyRequest | GroupAuditLog_DeclineAllyRequest | GroupAuditLog_DeleteAlly | GroupAuditLog_DeleteEnemy | GroupAuditLog_AddGroupPlace | GroupAuditLog_RemoveGroupPlace | GroupAuditLog_CreateItems | GroupAuditLog_ConfigureItems | GroupAuditLog_SpendGroupFunds | GroupAuditLog_ChangeOwner | GroupAuditLog_AdjustCurrencyAmounts | GroupAuditLog_Abandon | GroupAuditLog_Claim | GroupAuditLog_Rename | GroupAuditLog_ChangeDescription | GroupAuditLog_InviteToClan | GroupAuditLog_KickFromClan | GroupAuditLog_CancelClanInvite | GroupAuditLog_BuyClan | GroupAuditLog_CreateGroupAsset | GroupAuditLog_UpdateGroupAsset | GroupAuditLog_ConfigureGroupAsset | GroupAuditLog_RevertGroupAsset | GroupAuditLog_CreateGroupDeveloperProduct | GroupAuditLog_ConfigureGroupGame | GroupAuditLog_CreateGroupDeveloperSubscriptionProduct | GroupAuditLog_Lock | GroupAuditLog_Unlock | GroupAuditLog_CreateGamePass | GroupAuditLog_CreateBadge | GroupAuditLog_ConfigureBadge | GroupAuditLog_SavePlace | GroupAuditLog_PublishPlace | GroupAuditLog_UpdateRolesetRank | GroupAuditLog_UpdateRolesetData
 
export type RawGroupAuditLogData = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: AllGroupAuditLogs[]
}>

export type PrettifiedGroupAuditLogData = ObjectPrettify<ArrWithObjectsToCamelCase<RawGroupAuditLogData["data"]>>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/username-history -------------------------------------------------------------------------
type GroupNameHistoryData<TemporalType> = {
  name: string,
  created: TemporalType
}[]


export type RawGroupNameHistoryData = {
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: GroupNameHistoryData<ISODateTime>
}

export type PrettifiedGroupNameHistoryData = GroupNameHistoryData<Date>
// -------------------------------------------------------------------------------------------------------------------


// GET, PATCH /v1/groups/{groupId}/settings --------------------------------------------------------------------------
export type GroupSettingsData = ObjectPrettify<{
  isApprovalRequired: boolean,
  isBuildersClubRequired: boolean,
  areEnemiesAllowed: boolean,
  areGroupFundsVisible: boolean,
  areGroupGamesVisible: boolean,
  isGroupNameChangeEnabled: boolean
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/configuration/metadata -----------------------------------------------------------------------------
export type GroupsConfigMetadataData = ObjectPrettify<{
  groupConfiguration: {
    nameMaxLength: number,
    descriptionMaxLength: number,
    iconMaxFileSizeMb: number,
    cost: number,
    isUsingTwoStepWebviewComponent: boolean
  },
  recurringPayoutsConfiguration: { maxPayoutPartners: number },
  roleConfiguration: {
    nameMaxLength: number,
    descriptionMaxLength: number,
    limit: number,
    cost: number,
    minRank: number,
    maxRank: number
  },
  groupNameChangeConfiguration: {
    cost: number,
    cooldownInDays: number,
    ownershipCooldownInDays: number
  },
  isPremiumPayoutsEnabled: boolean,
  isDefaultEmblemPolicyEnabled: boolean
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/configuration/metadata -----------------------------------------------------------------------------
export type GroupsMetadataData = ObjectPrettify<{
  groupLimit: number,
  currentGroupCount: number,
  groupStatusMaxLength: number,
  groupPostMaxLengt: number,
  isGroupWallNotificationsEnabled: boolean,
  groupWallNotificationsSubscribeIntervalInMilliseconds: number,
  areProfileGroupsHidden: boolean,
  isGroupDetailsPolicyEnabled: boolean,
  showPreviousGroupNames: boolean
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/policies -------------------------------------------------------------------------------------------
export type RawGroupPolicyInfoData<GroupId extends Identifier> = ObjectPrettify<{
  groups: {
    canViewGroup: boolean,
    groupId: GroupId
  }[]
}>

export type PrettifiedGroupPolicyInfoData<GroupId extends Identifier> = ObjectPrettify<{
  [Id in GroupId]: { 
    canViewGroup: boolean,
  }
}>
// -------------------------------------------------------------------------------------------------------------------


// PATCH /v1/groups/{groupId}/status ---------------------------------------------------------------------------------
type GroupShoutData<NewShout extends string, TemporalType> = ObjectPrettify<{
  body: NewShout,
  poster: {
    buildersClubMembershipType: number,
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  created: TemporalType
  updated: TemporalType
}>

export type RawGroupShoutData<NewShout extends string> = GroupShoutData<NewShout, ISODateTime>

export type PrettifiedGroupShoutData<NewShout extends string> = GroupShoutData<NewShout, Date>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ MEMBERSHIP ] ////////////////////////////////////////////////////////////////////////////////////////////////////
type GroupJoinRequest<UserId extends Identifier, TemporalType> = ObjectPrettify<{
  requester: {
    buildersClubMembershipType: number,
    hasVerifiedBadge: true,
    userId: UserId,
    username: string,
    displayName: string
  },
  created: TemporalType
}>

// GET /v1/groups/{groupId}/join-requests ----------------------------------------------------------------------------
export type RawGroupJoinRequests = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: GroupJoinRequest<Identifier, ISODateTime>[]
}>

export type PrettifiedGroupJoinRequests = GroupJoinRequest<Identifier, Date>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/join-requests ----------------------------------------------------------------------------
export type RawGroupJoinRequestForUser<UserId extends Identifier> = GroupJoinRequest<UserId, ISODateTime> | {}

export type PrettifiedGroupJoinRequestForUser<UserId extends Identifier> = GroupJoinRequest<UserId, Date> | {}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/membership -------------------------------------------------------------------------------
export type AuthenticatedUserGroupMembershipInfoData<GroupId extends Identifier> = ObjectPrettify<{
  groupId: GroupId,
  isPrimary: boolean,
  isPendingJoin: boolean,
  userRole: {
    user: {
      buildersClubMembershipType: number,
      hasVerifiedBadge: boolean,
      userId: number,
      username: string,
      displayName: string
    },
    role: {
      id: number,
      name: string,
      description: string,
      rank: number,
      memberCount: number
    }
  },
  permissions: {
    groupPostsPermissions: {
      viewWall: boolean,
      postToWall: boolean,
      deleteFromWall: boolean,
      viewStatus: boolean,
      postToStatus: boolean
    },
    groupMembershipPermissions: {
      changeRank: boolean,
      inviteMembers: boolean,
      removeMembers: boolean
    },
    groupManagementPermissions: {
      manageRelationships: boolean,
      manageClan: boolean,
      viewAuditLogs: boolean
    },
    groupEconomyPermissions: {
      spendGroupFunds: boolean,
      advertiseGroup: boolean,
      createItems: boolean,
      manageItems: boolean,
      addGroupPlaces: boolean,
      manageGroupGames: boolean,
      viewGroupPayouts: boolean,
      viewAnalytics: boolean
    },
    groupOpenCloudPermissions: {
      useCloudAuthentication: boolean,
      administerCloudAuthentication: boolean
    }
  },
  areGroupGamesVisible: boolean,
  areGroupFundsVisible: boolean,
  areEnemiesAllowed: boolean,
  canConfigure: boolean
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/roles ------------------------------------------------------------------------------------
export type PrettifiedAllRolesForGroupData = ObjectPrettify<{
  id: number,
  name: string,
  description: string,
  rank: number,
  memberCount: number
}[]>

export type RawAllRolesForGroupData<GroupId extends Identifier> = ObjectPrettify<{
  groupId: GroupId,
  roles: PrettifiedAllRolesForGroupData
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/roles/{roleSetId}/users ------------------------------------------------------------------
export type PrettifiedGroupMembersWithRoleData = ObjectPrettify<{
  hasVerifiedBadge: boolean,
  userId: Identifier,
  username: string,
  displayName: string
}>[]

export type RawGroupMembersWithRoleData = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: PrettifiedGroupMembersWithRoleData
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/users ------------------------------------------------------------------------------------
export type PrettifiedGroupMembersData = ObjectPrettify<{
  user: {
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  role: {
    id: number
    name: string,
    rank: number
  }
}>[]

export type RawGroupMembersData = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: PrettifiedGroupMembersData
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/user/groups/pending ---------------------------------------------------------------------------------------
type AuthenticatedUserPendingGroupsData<TemporalType> = ObjectPrettify<{
  id: number,
  name: string,
  description: string,
  owner: {
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  shout: {
    body: string,
    poster: {
      hasVerifiedBadge: boolean,
      userId: number,
      username: string,
      displayName: string
    },
    created: TemporalType,
    updated: TemporalType
  } | null,
  isBuildersClubOnly: boolean,
  publicEntryAllowed: boolean,
  hasVerifiedBadge: boolean
}>[]

export type RawAuthenticatedUserPendingGroupsData = AuthenticatedUserPendingGroupsData<ISODateTime>

export type PrettifiedAuthenticatedUserPendingGroupsData = AuthenticatedUserPendingGroupsData<Date>
// -------------------------------------------------------------------------------------------------------------------


//  GET /v1/users/{userId}/friends/groups/roles ----------------------------------------------------------------------
type GroupsThatUsersFriendsAreInData<TemporalType> = ObjectPrettify<{
  user: {
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  groups: [
    {
      group: {
        id: number,
        name: string,
        description: string,
        owner: {
          hasVerifiedBadge: boolean,
          userId: number,
          username: string,
          displayName: string
        },
        shout: {
          body: string,
          poster: {
            hasVerifiedBadge: boolean,
            userId: number,
            username: string,
            displayName: string
          },
          created: TemporalType,
          updated: TemporalType
        } | null,
        isBuildersClubOnly: boolean,
        publicEntryAllowed: boolean,
        hasVerifiedBadge: boolean
      },
      role: {
        id: number,
        name: string,
        rank: number
      }
    }
  ]
}[]>

export type RawGroupsThatUsersFriendsAreInData = ObjectPrettify<{
  data: GroupsThatUsersFriendsAreInData<ISODateTime>
}>

export type PrettifiedGroupsThatUsersFriendsAreInData = GroupsThatUsersFriendsAreInData<Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/users/{userId}/groups/roles -------------------------------------------------------------------------------
type AllGroupRolesForUserData_V1<TemporalType> = ObjectPrettify<{
  group: {
    id: number,
    name: string,
    description: string,
    owner: {
      hasVerifiedBadge: boolean,
      userId: number,
      username: string,
      displayName: string
    },
    shout: {
      body: string,
      poster: {
        hasVerifiedBadge: boolean,
        userId: number,
        username: string,
        displayName: string
      },
      created: TemporalType,
      updated: TemporalType
    } | null,
    memberCount: number,
    isBuildersClubOnly: boolean,
    publicEntryAllowed: boolean,
    hasVerifiedBadge: boolean
  },
  role: {
    id: number,
    name: string,
    description: string,
    rank: number,
    memberCount: number
  },
  isPrimaryGroup: boolean
}[]>

export type RawAllGroupRolesForUserData_V1 = ObjectPrettify<{
  data: AllGroupRolesForUserData_V1<ISODateTime>
}>

export type FormattedAllGroupRolesForUserData_V1 = AllGroupRolesForUserData_V1<Date>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// [ GROUPS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}/payout-restriction -----------------------------------------------------------------------
export type GroupPayoutRestrictionsInfoData = ObjectPrettify<{
  canUseRecurringPayout: boolean,
  canUseOneTimePayout: boolean
}>
// -------------------------------------------------------------------------------------------------------------------

// GET /v1/groups/{groupId}/payouts ----------------------------------------------------------------------------------
export type PrettifiedGroupPayoutsInfoData = ObjectPrettify<{
  user: {
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  percentage: number
}>[]

export type RawGroupPayoutsInfoData = ObjectPrettify<{
  data: PrettifiedGroupPayoutsInfoData
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ RELATIONSHIPS ] /////////////////////////////////////////////////////////////////////////////////////////////////
export type GroupRelationshipType = "Enemies" | "Allies"

type GroupRelationshipsData<GroupId extends Identifier, TimeType> = ObjectPrettify<{
  groupId: GroupId,
  relationshipType: GroupRelationshipType,
  totalGroupCount: number,
  relatedGroups: {
    id: number,
    name: string,
    description: string,
    owner: {
      hasVerifiedBadge: boolean,
      userId: number,
      username: string,
      displayName: string
    },
    shout: {
      body: string,
      poster: {
        buildersClubMembershipType: number,
        hasVerifiedBadge: boolean,
        userId: number,
        username: string,
        displayName: string
      },
      created: TimeType,
      updated: TimeType
    } | null,
    memberCount: number,
    isBuildersClubOnly: number,
    publicEntryAllowed: boolean,
    hasVerifiedBadge: boolean
  }[],
  nextRowIndex: number
}>

export type RawGroupRelationshipsData<GroupId extends Identifier> = GroupRelationshipsData<GroupId, ISODateTime>

export type PrettifiedGroupRelationshipsData<GroupId extends Identifier> = GroupRelationshipsData<GroupId, Date>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PERMISSIONS ] ///////////////////////////////////////////////////////////////////////////////////////////////////
export type GroupRolePermissionsData<
  GroupId extends Identifier, RoleSetId extends Identifier,
  Name extends string = string, Rank extends number = number
> = ObjectPrettify<{
  groupId: GroupId,
  role: {
    id: RoleSetId,
    name: Name,
    description: string,
    rank: Rank
  },
  permissions: {
    groupPostsPermissions: {
      viewWall: boolean,
      postToWall: boolean,
      deleteFromWall: boolean,
      viewStatus: boolean,
      postToStatus: boolean
    },
    groupMembershipPermissions: {
      changeRank: boolean,
      inviteMembers: boolean,
      removeMembers: boolean
    },
    groupManagementPermissions: {
      manageRelationships: boolean,
      manageClan: boolean,
      viewAuditLogs: boolean
    },
    groupEconomyPermissions: {
      spendGroupFunds: boolean,
      advertiseGroup: boolean,
      createItems: boolean,
      manageItems: boolean,
      addGroupPlaces: boolean,
      manageGroupGames: boolean,
      viewGroupPayouts: boolean,
      viewAnalytics: boolean
    },
    groupOpenCloudPermissions: {
      useCloudAuthentication: boolean,
      administerCloudAuthentication: boolean
    }
  }
}>


// PATCH /v1/groups/{groupId}/roles/{roleSetId}/permissions ----------------------------------------------------------
export type GroupRolePermissions = KeysToCamelCase<{
  DeleteFromWall?: boolean,
  PostToWall?: boolean,
  InviteMembers?: boolean,
  PostToStatus?: boolean,
  RemoveMembers?: boolean,
  ViewStatus?: boolean,
  ViewWall?: boolean,
  ChangeRank?: boolean,
  AdvertiseGroup?: boolean,
  ManageRelationships?: boolean,
  AddGroupPlaces?: boolean,
  ViewAuditLogs?: boolean,
  CreateItems?: boolean,
  ManageItems?: boolean,
  SpendGroupFunds?: boolean,
  ManageClan?: boolean,
  ManageGroupGames?: boolean,
  UseCloudAuthentication?: boolean,
  AdministerCloudAuthentication?: boolean,
  ViewAnalytics?: boolean
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/roles/permissions ------------------------------------------------------------------------
export type RawGroupPermissionsForAllRoles<GroupId extends Identifier> = ObjectPrettify<{
  data: GroupRolePermissionsData<GroupId, number>[]
}>

export type PrettifiedGroupPermissionsForAllRoles<GroupId extends Identifier> = GroupRolePermissionsData<GroupId, number>[]
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type GroupSocialLinkType = UnionPrettify<'Facebook' | 'Twitter' | 'YouTube' | 'Twitch' | 'GooglePlus' | 'Discord' | 'RobloxGroup' | 'Amazon' | 'Guilded'>

type AddGroupSocialLinksWithUrl = {
  "Facebook": `${UrlProtocol}facebook.com/${string}`,
  "Twitter": `${UrlProtocol}twitter.com/${string}`,
  "Youtube": `${UrlProtocol}youtube.com/${string}`,
  "Twitch": `${UrlProtocol}twitch.tv/${string}`,
  "Discord": `${UrlProtocol}discord.gg/${string}`,
  "Guilded": `${UrlProtocol}guilded.gg/${string}`
}

export type NewSocialLinkRequest = {
  [Key in keyof AddGroupSocialLinksWithUrl as number]: {
    type: Key,
    url: AddGroupSocialLinksWithUrl[Key],
    title: `${string & any}`
  }
}[number]

// GET /v1/groups/{groupId}/social-links -----------------------------------------------------------------------------
export type PrettifiedGroupSocialLinksData = ObjectPrettify<{
  id: Identifier,
  type: GroupSocialLinkType,
  url: `${"https" | "http"}://${string}`,
  title: string
}[]>

export type RawGroupSocialLinksData = ObjectPrettify<{
  data: PrettifiedGroupSocialLinksData
}>
// -------------------------------------------------------------------------------------------------------------------


// POST /v1/groups/{groupId}/social-links ----------------------------------------------------------------------------
export type AddGroupSocialLinkData<NewSocial extends NewSocialLinkRequest, SocialLinkId extends Identifier = Identifier> = ObjectPrettify<
  { id: SocialLinkId } &
  { -readonly [Key in keyof NewSocial]: NewSocial[Key] }
>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ WALL ] //////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}/wall/posts -------------------------------------------------------------------------------
export type GroupWallPostsData_V1<TimeType> = ObjectPrettify<{
  id: number,
  poster: {
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  body: string,
  created: TimeType,
  updated: TimeType
}[]>

export type RawGroupWallPostsData_V1 = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: GroupWallPostsData_V1<ISODateTime>
}>

export type PrettifiedGroupWallPostsData_V1 = ObjectPrettify<GroupWallPostsData_V1<Date>>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUP SEARCH ] //////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/search ---------------------------------------------------------------------------------------------
type GroupSearchData<TimeType> = ObjectPrettify<{
  id: number,
  name: string,
  description: string,
  memberCount: number,
  previousName: string,
  publicEntryAllowed: true,
  created: TimeType,
  updated: TimeType,
  hasVerifiedBadge: true
}[]>

export type RawGroupSearchData = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  keyword: string,
  data: GroupSearchData<string>
}>

export type PrettifiedGroupSearchData = GroupSearchData<Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/search/lookup --------------------------------------------------------------------------------------
export type PrettifiedGroupLookupSearch = ObjectPrettify<{
  id: number,
  name: string,
  memberCount: number,
  hasVerifiedBadge: boolean
}[]>

export type RawGroupLookupSearch = ObjectPrettify<{
  data: PrettifiedGroupLookupSearch
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/search/metatdata -----------------------------------------------------------------------------------
export type RawGroupSearchMetadata = ObjectPrettify<{
  SuggestedGroupKeywords: string[],
  ShowFriendsGroupsSort: boolean
}>

export type PrettifiedGroupSearchMetadata = ObjectPrettify<KeysToCamelCase<RawGroupSearchMetadata>>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/roles -----------------------------------------------------------------------------------------------------
export type RawGroupRolesFromIdsData<RoleId extends Identifier> = ObjectPrettify<{
  data: {
    groupId: number,
    id: RoleId,
    name: string,
    rank: number
  }[]
}>

export type PrettifiedGroupRolesFromIdsData<RoleId extends Identifier> = ObjectPrettify<{
  [Key in RoleId]: ObjectPrettify<{
    groupId: number,
    name: string,
    rank: number
  }> | undefined
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PRIMARY GROUP ] /////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/groups/primary/role ------------------------------------------------------------------------
type PrimaryGroupForUserData<TemporalType> = ObjectPrettify<{
  group: {
    id: number,
    name: string,
    description: string,
    owner: {
      hasVerifiedBadge: boolean,
      userId: number,
      username: string,
      displayName: string
    },
    shout: {
      body: string,
      poster: {
        buildersClubMembershipType: number,
        hasVerifiedBadge: boolean,
        userId: number,
        username: string,
        displayName: string
      },
      created: TemporalType,
      updated: TemporalType
    } | null,
    isBuildersClubOnly: boolean,
    publicEntryAllowed: boolean,
    hasVerifiedBadge: boolean
  },
  role: {
    id: number,
    name: string,
    rank: number
  }
}>

export type RawPrimaryGroupForUserData = PrimaryGroupForUserData<string>

export type PrettifiedPrimaryGroupForUserData = PrimaryGroupForUserData<Date>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// [ ROLE SETS ] /////////////////////////////////////////////////////////////////////////////////////////////////////
// PATCH /v1/groups/{groupId}/rolesets/{roleSetId} -------------------------------------------------------------------
export type UpdateRoleSetRequest = {
  name: `${any}`,
  description: `${any}`,
  rank: number
}

export type UpdateRoleSetData<NewRoleData extends UpdateRoleSetRequest> = ObjectPrettify<{
  id: number,
  name: NewRoleData["name"],
  description: NewRoleData["description"],
  rank: NewRoleData["rank"],
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUPS V2 ] /////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v2/groups ----------------------------------------------------------------------------------------------------
export type RawGroupIdsToGroupsInfoData<GroupId extends Identifier>= ObjectPrettify<{
  data: {
    id: GroupId,
    name: string,
    description: string,
    owner: {
      id: number,
      type: string
    },
    created: string,
    hasVerifiedBadge: boolean
  }[]
}>



export type PrettifiedGroupIdsToGroupsInfoData<GroupId extends Identifier> = ObjectPrettify<{
  [Key in GroupId]: {
    name: string,
    description: string,
    owner: {
      id: number,
      type: string
    },
    created: Date,
    hasVerifiedBadge: boolean
  } | undefined
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/users/{userId}/groups/roles -------------------------------------------------------------------------------
export type PrettifiedAllGroupRolesForUserData_V2 = ObjectPrettify<{
  group: {
    id: number,
    name: string,
    memberCount: number,
    hasVerifiedBadge: boolean
  },
  role: {
    id: number,
    name: string,
    rank: number
  }
}[]>

export type RawAllGroupRolesForUserData_V2 = ObjectPrettify<{
  data: PrettifiedAllGroupRolesForUserData_V2
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ WALL V2 ] //////////////////////////////////////////////////////////////////////////////////////////////////
type GroupWallPostsData_V2<TemporalType> = ObjectPrettify<{
  id: number,
  poster: {
    user: {
      hasVerifiedBadge: boolean,
      userId: number,
      username: string,
      displayName: string
    },
    role: {
      id: number,
      name: string,
      rank: number
    }
  },
  body: string,
  created: TemporalType,
  updated: TemporalType
}[]>

export type RawGroupWallPostsData_V2 = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: GroupWallPostsData_V2<ISODateTime>
}>

export type PrettifiedGroupWallPostsData_V2 = GroupWallPostsData_V2<Date>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////