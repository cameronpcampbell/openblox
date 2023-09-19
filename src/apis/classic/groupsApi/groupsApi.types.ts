import type { AnyObject, ArrWithObjectsToCamelCase, KeysToCamelCase, ObjectValues, OptionalHttp, PrettifyKeyof, PrettifyUnion, UnionToArray } from "../../../utils/utils.types"
import type { DataWithCursors } from "../../apis.types"


// [ GROUPS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId} ------------------------------------------------------------------------------------------
export type GroupInfoData<GroupId extends number> = PrettifyKeyof<{
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

export type FormattedGroupInfoData<GroupId extends number> = PrettifyKeyof<Omit<GroupInfoData<GroupId>, "shout"> & {
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

type GroupAuditLogBase<actionType extends GroupAuditLogActionType, description extends AnyObject> = {
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
 
export type GroupAuditLogData = PrettifyKeyof<
  DataWithCursors<AllGroupAuditLogs[]>
>

export type FormattedGroupAuditLogData = PrettifyKeyof<ArrWithObjectsToCamelCase<GroupAuditLogData["data"]>>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/username-history -------------------------------------------------------------------------
export type GroupNameHistoryData = DataWithCursors<{
  name: string,
  created: string
}[]>

export type FormattedGroupNameHistoryData = PrettifyKeyof<{
  name: string,
  created: Date
}[]>
// -------------------------------------------------------------------------------------------------------------------


// GET, PATCH /v1/groups/{groupId}/settings --------------------------------------------------------------------------
export type GroupSettingsData = PrettifyKeyof<{
  isApprovalRequired: boolean,
  isBuildersClubRequired: boolean,
  areEnemiesAllowed: boolean,
  areGroupFundsVisible: boolean,
  areGroupGamesVisible: boolean,
  isGroupNameChangeEnabled: boolean
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/configuration/metadata -----------------------------------------------------------------------------
export type GroupsConfigMetadataData = PrettifyKeyof<{
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
export type GroupsMetadataData = PrettifyKeyof<{
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
export type RawGroupPolicyInfoData = PrettifyKeyof<{
  groups: {
    canViewGroup: boolean,
    groupId: number
  }[]
}>

export type FormattedGroupPolicyInfoData<GroupId extends number> = PrettifyKeyof<
  Record<GroupId, { 
    canViewGroup: boolean,
  }>
>
// -------------------------------------------------------------------------------------------------------------------


// PATCH /v1/groups/{groupId}/description ----------------------------------------------------------------------------
export type RawGroupDescriptionData = PrettifyKeyof<{
  newDescription: string
}>

export type FormattedGroupDescriptionData = string
// -------------------------------------------------------------------------------------------------------------------


// PATCH /v1/groups/{groupId}/status ---------------------------------------------------------------------------------
type GroupShoutData<Body extends string, TimeType> = PrettifyKeyof<{
  body: Body,
  poster: {
    buildersClubMembershipType: number,
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  created: TimeType
  updated: TimeType
}>

export type RawGroupShoutData<Body extends string> = GroupShoutData<Body, string>

export type FormattedGroupShoutData<Body extends string> = GroupShoutData<Body, Date>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ MEMBERSHIP ] ////////////////////////////////////////////////////////////////////////////////////////////////////
type GroupJoinRequest<TimeType, UserId = number> = PrettifyKeyof<{
  requester: {
    buildersClubMembershipType: number,
    hasVerifiedBadge: true,
    userId: UserId,
    username: string,
    displayName: string
  },
  created: TimeType
}>

// GET /v1/groups/{groupId}/join-requests ----------------------------------------------------------------------------
type GroupJoinRequests<TimeType> = PrettifyKeyof<GroupJoinRequest<TimeType>[]>

export type RawGroupJoinRequests = DataWithCursors<GroupJoinRequests<string>>

export type FormattedGroupJoinRequests = GroupJoinRequests<Date>
// ------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/join-requests ----------------------------------------------------------------------------
export type RawGroupJoinRequestForUser<UserId extends number = number> = GroupJoinRequest<string, UserId>

export type FormattedGroupJoinRequestForUser<UserId extends number = number> = PrettifyKeyof<GroupJoinRequest<Date, UserId>>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/membership -------------------------------------------------------------------------------
export type AuthenticatedUserGroupMembershipInfoData<GroupId extends number> = PrettifyKeyof<{
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
export type FormattedAllRolesForGroupData = PrettifyKeyof<{
  id: number,
  name: string,
  description: string,
  rank: number,
  memberCount: number
}[]>

export type RawAllRolesForGroupData<GroupId extends number> = PrettifyKeyof<{
  groupId: GroupId,
  roles: FormattedAllRolesForGroupData
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/roles/{roleSetId}/users ------------------------------------------------------------------
type GroupMembersWithRoleData = PrettifyKeyof<{
  hasVerifiedBadge: boolean,
  userId: number,
  username: string,
  displayName: string
}[]>

export type RawGroupMembersWithRoleData = PrettifyKeyof<DataWithCursors<GroupMembersWithRoleData>>

export type FormattedGroupMembersWithRoleData = PrettifyKeyof<GroupMembersWithRoleData>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/users ------------------------------------------------------------------------------------
export type FormattedGroupMembersData = PrettifyKeyof<{
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
}[]>

export type RawGroupMembersData = PrettifyKeyof<DataWithCursors<FormattedGroupMembersData>>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/user/groups/pending ---------------------------------------------------------------------------------------
type AuthenticatedUserPendingGroupsData<TimeType> = PrettifyKeyof<{
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
    created: TimeType,
    updated: TimeType
  } | null,
  isBuildersClubOnly: boolean,
  publicEntryAllowed: boolean,
  hasVerifiedBadge: boolean
}[]>

export type RawAuthenticatedUserPendingGroupsData = PrettifyKeyof<DataWithCursors<AuthenticatedUserPendingGroupsData<string>>>

export type FormattedAuthenticatedUserPendingGroupsData = AuthenticatedUserPendingGroupsData<Date>
// -------------------------------------------------------------------------------------------------------------------


//  GET /v1/users/{userId}/friends/groups/roles ----------------------------------------------------------------------
type GroupsThatUsersFriendsAreInData<TimeType> = PrettifyKeyof<{
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
          created: TimeType,
          updated: TimeType
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

export type RawGroupsThatUsersFriendsAreInData = PrettifyKeyof<{
  data: GroupsThatUsersFriendsAreInData<string>
}>

export type FormattedGroupsThatUsersFriendsAreInData = GroupsThatUsersFriendsAreInData<Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/users/{userId}/friends/groups/roles -----------------------------------------------------------------------
type AllGroupRolesForUserData_V1<TimeType> = PrettifyKeyof<{
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
      created: TimeType,
      updated: TimeType
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

export type RawAllGroupRolesForUserData_V1 = PrettifyKeyof<{
  data: AllGroupRolesForUserData_V1<string>
}>

export type FormattedAllGroupRolesForUserData_V1 = AllGroupRolesForUserData_V1<Date>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ REVENUE ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}/payout-restriction -----------------------------------------------------------------------
export type GroupPayoutRestrictionsData = {
  canUseRecurringPayout: boolean,
  canUseOneTimePayout: boolean
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/payouts ----------------------------------------------------------------------------------
export type FormattedGroupPayoutsData = PrettifyKeyof<{
  user: {
    hasVerifiedBadge: boolean,
    userId: number,
    username: string,
    displayName: string
  },
  percentage: number
}[]>

export type RawGroupPayoutsData = PrettifyKeyof<{
  data: FormattedGroupPayoutsData
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ RELATIONSHIPS ] /////////////////////////////////////////////////////////////////////////////////////////////////
export type GroupRelationshipType = "Enemies" | "Allies"

type GroupRelationshipsData<GroupId extends number, TimeType> = PrettifyKeyof<{
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

export type RawGroupRelationshipsData<GroupId extends number> = PrettifyKeyof<GroupRelationshipsData<GroupId, string>>

export type FormattedGroupRelationshipsData<GroupId extends number> = GroupRelationshipsData<GroupId, Date>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PERMISSIONS ] ///////////////////////////////////////////////////////////////////////////////////////////////////
export type GroupRolePermissionsData<GroupId extends number, RoleId extends number> = PrettifyKeyof<{
  groupId: GroupId,
  role: {
    id: RoleId,
    name: string,
    description: string,
    rank: number
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
export type GroupRolePermissions = {
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
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/{groupId}/roles/permissions ------------------------------------------------------------------------
export type RawGroupPermissionsForAllRoles<GroupId extends number> = PrettifyKeyof<{
  data: GroupRolePermissionsData<GroupId, number>[]
}>

export type FormattedGroupPermissionsForAllRoles<GroupId extends number> = PrettifyKeyof<GroupRolePermissionsData<GroupId, number>[]>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ SOCIAL LINKS ] //////////////////////////////////////////////////////////////////////////////////////////////////
type GroupSocialLinkType = 'Facebook' | 'Twitter' | 'YouTube' | 'Twitch' | 'GooglePlus' | 'Discord' | 'RobloxGroup' | 'Amazon' | 'Guilded'

type AddGroupSocialLinksWithUrl = {
  "Facebook": `${OptionalHttp}facebook.com/${string}`,
  "Twitter": `${OptionalHttp}twitter.com/${string}`,
  "Youtube": `${OptionalHttp}youtube.com/${string}`,
  "Twitch": `${OptionalHttp}twitch.tv/${string}`,
  "Discord": `${OptionalHttp}discord.gg/${string}`,
  "Guilded": `${OptionalHttp}guilded.gg/${string}`
}

export type NewSocialLinkRequest = ObjectValues<{
  [Key in keyof AddGroupSocialLinksWithUrl]: {
    type: Key,
    url: AddGroupSocialLinksWithUrl[Key],
    title: `${string & any}`
  }
}>

// GET /v1/groups/{groupId}/social-links -----------------------------------------------------------------------------
export type FormattedGroupSocialLinksData = PrettifyKeyof<{
  id: number,
  type: PrettifyUnion<GroupSocialLinkType>,
  url: `${"https" | "http"}://${string}`,
  title: string
}[]>

export type RawGroupSocialLinksData = PrettifyKeyof<{
  data: FormattedGroupSocialLinksData
}>
// -------------------------------------------------------------------------------------------------------------------


// POST /v1/groups/{groupId}/social-links ----------------------------------------------------------------------------
export type AddGroupSocialLinkData<Request extends NewSocialLinkRequest> = PrettifyKeyof<Request & { id: number }>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ WALL ] //////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}/wall/posts -------------------------------------------------------------------------------
export type GroupWallPostsData_V1<TimeType> = PrettifyKeyof<{
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

export type RawGroupWallPostsData_V1 = PrettifyKeyof<DataWithCursors<GroupWallPostsData_V1<string>>>

export type FormattedGroupWallPostsData_V1 = PrettifyKeyof<GroupWallPostsData_V1<Date>>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUP SEARCH ] //////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/search ---------------------------------------------------------------------------------------------
type GroupSearchData<TimeType> = PrettifyKeyof<{
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

export type RawGroupSearchData = PrettifyKeyof<DataWithCursors<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  keyword: string,
  data: GroupSearchData<string>
}>>

export type FormattedGroupSearchData = GroupSearchData<Date>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/search/lookup --------------------------------------------------------------------------------------
export type FormattedGroupLookupSearch = PrettifyKeyof<{
  id: number,
  name: string,
  memberCount: number,
  hasVerifiedBadge: boolean
}[]>

export type RawGroupLookupSearch = PrettifyKeyof<{
  data: FormattedGroupLookupSearch
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/groups/search/metatdata -----------------------------------------------------------------------------------
export type RawGroupSearchMetadata = PrettifyKeyof<{
  SuggestedGroupKeywords: string[],
  ShowFriendsGroupsSort: boolean
}>

export type FormattedGroupSearchMetadata = PrettifyKeyof<KeysToCamelCase<RawGroupSearchMetadata>>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/roles -----------------------------------------------------------------------------------------------------
export type RawGroupRolesFromIdsData<RoleId extends number> = PrettifyKeyof<{
  data: UnionToArray<ObjectValues<{
    [Key in RoleId]: PrettifyKeyof<{
      groupId: number,
      id: Key,
      name: string,
      rank: number
    }>
  }>>
}>

export type FormattedGroupRolesFromIdsData<RoleId extends number> = PrettifyKeyof<{
  [Key in RoleId]: PrettifyKeyof<{
    groupId: number,
    name: string,
    rank: number
  }>
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ PRIMARY GROUP ] /////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/groups/primary/role ------------------------------------------------------------------------
type PrimaryGroupForUserData<TimeType> = PrettifyKeyof<{
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
      created: TimeType,
      updated: TimeType
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

export type FormattedPrimaryGroupForUserData = PrimaryGroupForUserData<Date>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLE SETS ] /////////////////////////////////////////////////////////////////////////////////////////////////////
// PATCH /v1/groups/{groupId}/rolesets/{roleSetId} -------------------------------------------------------------------
export type UpdateRoleSetRequest = {
  name: `${any}`,
  description: `${any}`,
  rank: number
}

export type UpdateRoleSetData<Request extends UpdateRoleSetRequest> = PrettifyKeyof<{
  id: number,
  name: Request["name"],
  description: Request["description"],
  rank: Request["rank"],
  memberCount: number
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ GROUPS V2 ] /////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v2/groups ----------------------------------------------------------------------------------------------------
export type RawGroupIdsToGroupsInfoData<GroupId extends number>= PrettifyKeyof<{
  data: UnionToArray<ObjectValues<{
    [Key in GroupId]: PrettifyKeyof<{
      id: Key,
      name: string,
      description: string,
      owner: {
        id: number,
        type: string
      },
      created: string,
      hasVerifiedBadge: boolean
    }>
  }>>
}>

export type FormattedGroupIdsToGroupsInfoData<GroupId extends number> = PrettifyKeyof<Record<GroupId, {
  name: string,
  description: string,
  owner: {
    id: number,
    type: string
  },
  created: Date,
  hasVerifiedBadge: boolean
}>>
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/users/{userId}/groups/roles -------------------------------------------------------------------------------
export type FormattedAllGroupRolesForUserData_V2 = PrettifyKeyof<{
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

export type RawAllGroupRolesForUserData_V2 = PrettifyKeyof<{
  data: FormattedAllGroupRolesForUserData_V2
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ WALL V2 ] //////////////////////////////////////////////////////////////////////////////////////////////////
type GroupWallPostsData_V2<TimeType> = PrettifyKeyof<{
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
  created: TimeType,
  updated: TimeType
}[]>

export type RawGroupWallPostsData_V2 = PrettifyKeyof<DataWithCursors<GroupWallPostsData_V2<string>>>

export type FormattedGroupWallPostsData_V2 = PrettifyKeyof<GroupWallPostsData_V2<Date>>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////