// [ GROUPS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}
export type GroupInfoData = {
  id: number,
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
}
export type FormattedGroupInfoData = Omit<GroupInfoData, "shout"> & {
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
}

// /v1/groups/{groupId}/audit-log
export type GroupAuditLogActionType = "DeletePost" | "RemoveMember" | "AcceptJoinRequest" | "DeclineJoinRequest" | "PostStatus" | "ChangeRank" | "BuyAd" | "SendAllyRequest" | "CreateEnemy" | "AcceptAllyRequest" | "DeclineAllyRequest" | "DeleteAlly" | "DeleteEnemy" | "AddGroupPlace" | "RemoveGroupPlace" | "CreateItems" | "ConfigureItems" | "SpendGroupFunds" | "ChangeOwner" | "Delete" | "AdjustCurrencyAmounts" | "Abandon" | "Claim" | "Rename" | "ChangeDescription" | "InviteToClan" | "KickFromClan" | "CancelClanInvite" | "BuyClan" | "CreateGroupAsset" | "UpdateGroupAsset" | "ConfigureGroupAsset" | "RevertGroupAsset" | "CreateGroupDeveloperProduct" | "ConfigureGroupGame" | "CreateGroupDeveloperSubscriptionProduct" | "Lock" | "Unlock" | "CreateGamePass" | "CreateBadge" | "ConfigureBadge" | "SavePlace" | "PublishPlace" | "UpdateRolesetRank" | "UpdateRolesetData"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


