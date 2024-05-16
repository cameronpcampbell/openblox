// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, ISODateTime } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


// [ Friends ] ///////////////////////////////////////////////////////////////////
// GET /v1/metadata --------------------------------------------------------------
export type FriendsMetadataData = {
  isFriendsFilterBarEnabled: boolean,
  isFriendsPageSortExperimentEnabled: boolean,
  isFriendsUserDataStoreCacheEnabled: boolean,
  frequentFriendSortRollout: number,
  userName: string,
  displayName: string,
}
// -------------------------------------------------------------------------------

// /v1/my/friends/requests -------------------------------------------------------
export type AuthenticatedUserFriendRequest<TemporalType> = {
  friendRequest: {
    sentAt: TemporalType,
    senderId: Identifier,
    sourceUniverseId: Identifier,
    originSourceType: "UserProfile" | "InGame" | "PlayerSearch",
    contactName: string | null
  },
  mutualFriendsList: string[],
  hasVerifiedBadge: boolean,
  description: string,
  created: TemporalType,
  isBanned: boolean,
  externalAppDisplayName: string | null,
  id: Identifier,
  name: string,
  displayName: string
}

export type RawAuthenticatedUserFriendRequestsData = {
  previousPageCursor: string | null,
  nextPageCursor: string,
  data: AuthenticatedUserFriendRequest<ISODateTime>[]
}

export type PrettifiedAuthenticatedUserFriendRequestsData = AuthenticatedUserFriendRequest<Date>[]
// -------------------------------------------------------------------------------


// /v1/users/{userId}/friends ----------------------------------------------------
type FriendsData<TemporalType> = {
  isOnline: boolean,
  presenceType: number,
  isDeleted: boolean,
  friendFrequentScore: number,
  friendFrequentRank: number,
  hasVerifiedBadge: boolean,
  description: string,
  created: TemporalType,
  isBanned: boolean,
  externalAppDisplayName: string,
  id: number,
  name: string,
  displayName: string
}

export type RawFriendsListData = {
  data: FriendsData<ISODateTime>[]
}

export type PrettifiedFriendsListData = FriendsData<Date>[]
// -------------------------------------------------------------------------------


// /v1/users/{userId}/friends/find -----------------------------------------------
type FindFriendData = {
  id: Identifier,
  hasVerifiedBadge: boolean
}

export type RawFindFriendsData = {
  PreviousCursor: null | string,
  PageItems: FindFriendData[],
  NextCursor: null | string,
  HasMore: null | string
}

export type PrettifiedFindFriendsData = FindFriendData[]
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////