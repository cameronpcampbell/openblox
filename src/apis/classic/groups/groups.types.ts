import type { Identifier, ISODateTime, ObjectPrettify, UnionPrettify, ObjectKeysToCamelCase } from "typeforge"


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
export type GroupAuditLogActionType = "Delete Post" | "Remove Member" | "Accept Join Request" | "Decline Join Request" | "Post Status" | "Change Rank" | "Buy Ad" | "Send Ally Request" | "Create Enemy" | "Accept Ally Request" | "Decline Ally Request" | "Delete Ally" | "Delete Enemy" | "Add Group Place" | "Remove Group Place" | "Create Items" | "Configure Items" | "Spend Group Funds" | "Change Owner" | "Delete" | "Adjust Currency Amounts" | "Abandon" | "Claim" | "Rename" | "Change Description" | "Invite To Clan" | "Kick From Clan" | "Cancel Clan Invite" | "Buy Clan" | "Create Group Asset" | "Update Group Asset" | "Configure Group Asset" | "Revert Group Asset" | "Create Group Developer Product" | "Configure Group Game" | "Create Group Developer Subscription Product" | "Lock" | "Unlock" | "Create Game Pass" | "Create Badge" | "Configure Badge" | "Save Place" | "Publish Place" | "Update Roleset Rank" | "Update Roleset Data"

type GroupAuditLogBase<ActionType extends GroupAuditLogActionType, Description extends Record<any, any>> = {
  actionType: ActionType,
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
  description: Description,
  created: string
}

type GroupAuditLog_DeletePost = GroupAuditLogBase<"Delete Post", {
  PostDec: string,
  TargetId: number,
  TargetName: string
}>
type GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest = GroupAuditLogBase<"Remove Member" | "Accept Join Request" | "Decline Join Request", {
  TargetId: number,
  TargetName: string
}>
type GroupAuditLog_PostStatus = GroupAuditLogBase<"Post Status", {
  Text: string
}>
type GroupAuditLog_ChangeRank = GroupAuditLogBase<"Change Rank", {
  TargetId: number,
  NewRoleSetId: number,
  OldRoleSetId: number,
  TargetName: string,
  NewRoleSetName: string,
  OldRoleSetName: string
}>
type GroupAuditLog_BuyAd = GroupAuditLogBase<"Buy Ad", {
  AdName: string,
  Bid: number,
  CurrencyTypeId: number,
  CurrencyTypeName: string
}>
type GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy = GroupAuditLogBase<
  "Send Ally Request" | "Create Enemy" | "Accept Ally Request" | "Decline Ally Request" | "Delete Ally" | "Delete Enemy", {
    TargetGroupId: number,
    TargetGroupName: string
  }
>
type GroupAuditLog_CreateItems_CreateGroupDeveloperProduct = GroupAuditLogBase<"Create Items" | "Create Group Developer Product", { //
  AssetId: number,
  AssetName: string
}>
type GroupAuditLog_SpendGroupFunds = GroupAuditLogBase<"Spend Group Funds", { //
  Amount: number,
  CurrencyTypeId: number,
  ItemDescription: string,
  CurrencyTypeName: string
}>
type GroupAuditLog_ChangeOwner = GroupAuditLogBase<"Change Owner", {
  IsRoblox: boolean,
  NewOwnerId: number,
  NewOwnerName: string,
  OldOwnerId: number,
  OldOwnerName: string
}>

type GroupAuditLog_Abandon = GroupAuditLogBase<"Abandon", {}> // Yes, this is supposed to be empty.
type GroupAuditLog_Claim = GroupAuditLogBase<"Claim", {}> // Yes, this is supposed to be empty.
type GroupAuditLog_Rename = GroupAuditLogBase<"Rename", {
  NewName: string
}>
type GroupAuditLog_ChangeDescription = GroupAuditLogBase<"Change Description", {
  NewDescription: string
}>
type GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems = (
  GroupAuditLogBase<"Invite To Clan" | "Kick From Clan" | "Cancel Clan Invite" | "Buy Clan" | "Adjust Currency Amounts" | "Revert Group Asset" | "Create Group Developer Subscription Product" | "Lock" | "Unlock" | "Configure Badge" | "Publish Place" | "Add Group Place" | "Remove Group Place" | "Configure Items" | "Delete", {
    // legacy action used for adding user to clan, cant get description for it :(.
  }>
)
type GroupAuditLog_CreateGroupAsset_UpdateGroupAsset = GroupAuditLogBase<"Create Group Asset" | "Update Group Asset", {
  AssetId: number,
  AssetName: string,
  VersionNumber: number,
  RevertVersionNumber: number | null
}>
type GroupAuditLog_ConfigureGroupAsset = GroupAuditLogBase<"Configure Group Asset", {
  AssetId: number,
  AssetName: string,
  Actions: number[] | null
}>
type GroupAuditLog_ConfigureGroupGame = GroupAuditLogBase<"Configure Group Game", {
  Actions: number[],
  Type: number,
  TargetId: number,
  TargetName: string,
  UniverseId: number | null,
  UniverseName: string
}>
type GroupAuditLog_CreateGamePass = GroupAuditLogBase<"Create Game Pass", {
  GamePassId: number,
  PlaceId: number,
  GamePassName: string,
  PlaceName: string
}>
type GroupAuditLog_CreateBadge = GroupAuditLogBase<"Create Badge", {
  BadgeId: number,
  BadgeName: string,
  Type: null
}>
type GroupAuditLog_SavePlace = GroupAuditLogBase<"Save Place", {
  AssetId: number,
  AssetName: string,
  VersionNumber: number
}>

type GroupAuditLog_UpdateRolesetRank = GroupAuditLogBase<"Update Roleset Rank", {
  NewRank: number,
  OldRank: number,
  RoleSetId: number,
  RoleSetName: string
}>
type GroupAuditLog_UpdateRolesetData = GroupAuditLogBase<"Update Roleset Data", {
  NewDescription: string,
  NewName: string,
  OldDescription: string,
  OldName: string,
  RoleSetId: number,
  RoleSetName: string
}>

type RawGroupAuditLogs_NameToType = {
  "Delete Post": GroupAuditLog_DeletePost,
  "Remove Member": GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest,
  "Accept Join Request": GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest,
  "Decline Join Request": GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest,
  "Post Status": GroupAuditLog_PostStatus,
  "Change Rank": GroupAuditLog_ChangeRank,
  "Buy Ad": GroupAuditLog_BuyAd,
  "Send Ally Request": GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy,
  "Create Enemy": GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy,
  "Accept Ally Request": GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy,
  "Decline Ally Request": GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy,
  "Delete Ally": GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy,
  "Delete Enemy": GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy,
  "Add Group Place": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Remove Group Place": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Create Items": GroupAuditLog_CreateItems_CreateGroupDeveloperProduct,
  "Configure Items": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Spend Group Funds": GroupAuditLog_SpendGroupFunds,
  "Change Owner": GroupAuditLog_ChangeOwner,
  "Delete": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Adjust Currency Amounts": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Abandon": GroupAuditLog_Abandon,
  "Claim": GroupAuditLog_Claim,
  "Rename": GroupAuditLog_Rename,
  "Change Description": GroupAuditLog_ChangeDescription,
  "Invite To Clan": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Kick From Clan": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Cancel Clan Invite": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Buy Clan": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Create Group Asset": GroupAuditLog_CreateGroupAsset_UpdateGroupAsset,
  "Update Group Asset": GroupAuditLog_CreateGroupAsset_UpdateGroupAsset,
  "Configure Group Asset": GroupAuditLog_ConfigureGroupAsset,
  "Revert Group Asset": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Create Group Developer Product": GroupAuditLog_CreateItems_CreateGroupDeveloperProduct,
  "Configure Group Game": GroupAuditLog_ConfigureGroupGame,
  "Create Group Developer Subscription Product": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Lock": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Unlock": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Create Game Pass": GroupAuditLog_CreateGamePass,
  "Create Badge": GroupAuditLog_CreateBadge,
  "Configure Badge": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Save Place": GroupAuditLog_SavePlace,
  "Publish Place": GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems,
  "Update Roleset Rank": GroupAuditLog_UpdateRolesetRank,
  "Update Roleset Data": GroupAuditLog_UpdateRolesetData
}

type PrettifiedGroupAuditLogs_NameToType = {
  "Delete Post": ObjectKeysToCamelCase<GroupAuditLog_DeletePost>,
  "Remove Member": ObjectKeysToCamelCase<GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest>,
  "Accept Join Request": ObjectKeysToCamelCase<GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest>,
  "Decline Join Request": ObjectKeysToCamelCase<GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest>,
  "Post Status": ObjectKeysToCamelCase<GroupAuditLog_PostStatus>,
  "Change Rank": ObjectKeysToCamelCase<GroupAuditLog_ChangeRank>,
  "Buy Ad": ObjectKeysToCamelCase<GroupAuditLog_BuyAd>,
  "Send Ally Request": ObjectKeysToCamelCase<GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy>,
  "Create Enemy": ObjectKeysToCamelCase<GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy>,
  "Accept Ally Request": ObjectKeysToCamelCase<GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy>,
  "Decline Ally Request": ObjectKeysToCamelCase<GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy>,
  "Delete Ally": ObjectKeysToCamelCase<GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy>,
  "Delete Enemy": ObjectKeysToCamelCase<GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy>,
  "Add Group Place": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Remove Group Place": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Create Items": ObjectKeysToCamelCase<GroupAuditLog_CreateItems_CreateGroupDeveloperProduct>,
  "Configure Items": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Spend Group Funds": ObjectKeysToCamelCase<GroupAuditLog_SpendGroupFunds>,
  "Change Owner": ObjectKeysToCamelCase<GroupAuditLog_ChangeOwner>,
  "Delete": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Adjust Currency Amounts": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Abandon": ObjectKeysToCamelCase<GroupAuditLog_Abandon>,
  "Claim": ObjectKeysToCamelCase<GroupAuditLog_Claim>,
  "Rename": ObjectKeysToCamelCase<GroupAuditLog_Rename>,
  "Change Description": ObjectKeysToCamelCase<GroupAuditLog_ChangeDescription>,
  "Invite To Clan": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Kick From Clan": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Cancel Clan Invite": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Buy Clan": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Create Group Asset": ObjectKeysToCamelCase<GroupAuditLog_CreateGroupAsset_UpdateGroupAsset>,
  "Update Group Asset": ObjectKeysToCamelCase<GroupAuditLog_CreateGroupAsset_UpdateGroupAsset>,
  "Configure Group Asset": ObjectKeysToCamelCase<GroupAuditLog_ConfigureGroupAsset>,
  "Revert Group Asset": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Create Group Developer Product": ObjectKeysToCamelCase<GroupAuditLog_CreateItems_CreateGroupDeveloperProduct>,
  "Configure Group Game": ObjectKeysToCamelCase<GroupAuditLog_ConfigureGroupGame>,
  "Create Group Developer Subscription Product": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Lock": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Unlock": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Create Game Pass": ObjectKeysToCamelCase<GroupAuditLog_CreateGamePass>,
  "Create Badge": ObjectKeysToCamelCase<GroupAuditLog_CreateBadge>,
  "Configure Badge": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Save Place": ObjectKeysToCamelCase<GroupAuditLog_SavePlace>,
  "Publish Place": ObjectKeysToCamelCase<GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems>,
  "Update Roleset Rank": ObjectKeysToCamelCase<GroupAuditLog_UpdateRolesetRank>,
  "Update Roleset Data": ObjectKeysToCamelCase<GroupAuditLog_UpdateRolesetData>
}

type AllGroupAuditLogs = GroupAuditLog_DeletePost | GroupAuditLog_RemoveMember_AcceptJoinRequest_DeclineJoinRequest | GroupAuditLog_PostStatus | GroupAuditLog_ChangeRank | GroupAuditLog_BuyAd | GroupAuditLog_SpendGroupFunds | GroupAuditLog_ChangeOwner | GroupAuditLog_Abandon | GroupAuditLog_Claim | GroupAuditLog_Rename | GroupAuditLog_ChangeDescription | GroupAuditLog_CreateGroupAsset_UpdateGroupAsset | GroupAuditLog_ConfigureGroupAsset | GroupAuditLog_ConfigureGroupGame | GroupAuditLog_CreateGamePass | GroupAuditLog_CreateBadge | GroupAuditLog_SavePlace | GroupAuditLog_UpdateRolesetRank | GroupAuditLog_SendAllyRequest_CreateEnemy_AcceptAllyRequest_DeclineAllyRequest_DeleteAlly_DeleteEnemy | GroupAuditLog_UpdateRolesetData | GroupAuditLog_CreateItems_CreateGroupDeveloperProduct |GroupAuditLog_InviteToClan_KickFromClan_CancelClanInvite_BuyClan_AdjustCurrencyAmounts_RevertGroupAsset_CreateGroupDeveloperSubscriptionProduct_Lock_Unlock_ConfigureBadge_PublishPlace_AddGroupPlace_RemoveGroupPlace_ConfigureItems

type RawGroupAuditLogsData_Data<LogType extends GroupAuditLogActionType | undefined = undefined> = (
  LogType extends keyof RawGroupAuditLogs_NameToType
    ? ObjectPrettify<({ actionType: LogType } & Omit<RawGroupAuditLogs_NameToType[LogType], "actionType">)>
    : AllGroupAuditLogs
)

type FormattedGroupAuditLogDatas_Data<LogType extends GroupAuditLogActionType | undefined> = (
  LogType extends GroupAuditLogActionType
    ? ObjectPrettify<({ actionType: LogType } & Omit<PrettifiedGroupAuditLogs_NameToType[LogType], "actionType">)>
    : AllGroupAuditLogs
)

export type RawGroupAuditLogsData<LogType extends GroupAuditLogActionType | undefined = undefined> = ObjectPrettify<{
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: RawGroupAuditLogsData_Data<LogType>[]
}>

export type PrettifiedGroupAuditLogsData<Type extends GroupAuditLogActionType | undefined = undefined> = (
  FormattedGroupAuditLogDatas_Data<Type>[]
)
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
export type RawGroupPolicyInfoData<GroupId extends Identifier> = {
  groups: {
    canViewGroup: boolean,
    groupId: GroupId
  }[]
}

export type PrettifiedGroupPolicyInfoData<GroupId extends Identifier> = {
  [Id in GroupId]: { 
    canViewGroup: boolean,
  }
}
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
}>[]

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
export type GroupRolePermissions = ObjectKeysToCamelCase<{
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

export type PrettifiedGroupSearchMetadata = ObjectPrettify<ObjectKeysToCamelCase<RawGroupSearchMetadata>>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ ROLES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/roles -----------------------------------------------------------------------------------------------------
export type RawGroupRolesFromIdsData<RoleId extends Identifier> = {
  data: {
    groupId: number,
    id: RoleId,
    name: string,
    rank: number
  }[]
}

export type PrettifiedGroupRolesFromIdsData<RoleId extends Identifier> = {
  [Key in RoleId]: ObjectPrettify<{
    groupId: number,
    name: string,
    rank: number
  }> | undefined
}
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
export type RawGroupIdsToGroupsInfoData<GroupId extends Identifier>= {
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
}



export type PrettifiedGroupIdsToGroupsInfoData<GroupId extends Identifier> = {
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
}
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


// [ BANS ] //////////////////////////////////////////////////////////////////////////////////////////////////////////
export type BanGroupMemberData<UserId extends Identifier> = {
  user: {
      hasVerifiedBadge: boolean,
      userId: UserId,
      username: string,
      displayName: string
  },
  actingUser: {
      user: {
          hasVerifiedBadge: boolean,
          userId: Identifier,
          username: string,
          displayName: string
      },
      role: {
          id: Identifier,
          name: string,
          rank: number
      }
  },
  created: ISODateTime
}

// GET /v1/groups/{groupId}/bans -------------------------------------------------------------------------------------
export type RawGroupBansData = {
  previousPageCursor?: string,
  nextPageCursor?: string,
  data: BanGroupMemberData<Identifier>[]
}

export type PrettifiedGroupBansData = BanGroupMemberData<Identifier>[]
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////