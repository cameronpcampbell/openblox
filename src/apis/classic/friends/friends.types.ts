import type { Identifier, ISODateTime, ObjectKeysToCamelCase, ObjectPrettify } from "typeforge"


export type FriendsUserSort = "Alphabetical" | "StatusAlphabetical" | "StatusFrequents"


export type FriendshipOriginSourceType = "Unknown" | "PlayerSearch" | "QrCode" | "InGame" | "UserProfile" | "QqContactImporter" | "WeChatContactImporter" | "ProfileShare" | "PhoneContactImporter" | "FriendRecommendations"

type FriendData<TemporalType> = ObjectPrettify<{
  isDeleted: boolean,
  friendFrequentScore: number,
  friendFrequentRank: number,
  hasVerifiedBadge: boolean,
  description: string | null,
  created: TemporalType,
  isBanned: boolean,
  externalAppDisplayName: string | null,
  id: number,
  name: string,
  displayName: string,
}>

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


// /v1/users${userId}/friends/inactive -------------------------------------------
export type RawInactiveFriendsData = {
  data: FriendData<ISODateTime>[]
}

export type PrettifiedInactiveFriendsData = FriendData<Date>[]
// -------------------------------------------------------------------------------


// /v1/users${userId}/friends/online -------------------------------------------
type OnlineFriends_UserPresence<TemporalType> = ObjectPrettify<{
  UserPresenceType: string,
  UserLocationType: string,
  lastLocation: string,
  placeId: Identifier,
  rootPlaceId: Identifier,
  gameInstanceId: string,
  universeId: Identifier,
  lastOnline: TemporalType
}>

export type RawOnlineFriendsUserPresenceData = ObjectPrettify<{
  data: {
    userPresence: OnlineFriends_UserPresence<ISODateTime>,
    id: Identifier,
    name: string,
    displayName: string
  }[]
}>

export type PrettifiedOnlineFriendsUserPresenceData = ObjectPrettify<{
  userPresence: ObjectKeysToCamelCase<OnlineFriends_UserPresence<Date>>,
  id: Identifier,
  name: string,
  displayName: string
}[]>
// -------------------------------------------------------------------------------


// /v1/users${userId}/friends/search ---------------------------------------------
export type PrettifiedFriendsSearchData = {
  id: Identifier,
  hasVerifiedBadge: false
}[]

export type RawFriendsSearchData = {
  PreviousCursor: string | null,
  PageItems: PrettifiedFriendsSearchData,
  NextCursor: string | null,
  HasMore: string | null
}
// -------------------------------------------------------------------------------


// /v1/users${userId}/friends/statuses -------------------------------------------
export type RawFriendsStatusesData<RelatedUserId extends Identifier> = {
  data: {
    id: RelatedUserId,
    status: "NotFriends" | "Friends" | "RequestSent" | "RequestReceived"
  }[]
}

export type PrettifiedFriendsStatusesData<RelatedUserId extends Identifier> = {
  [Key in RelatedUserId]: "NotFriends" | "Friends" | "RequestSent" | "RequestReceived" | undefined
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////



// [ Followings ] ////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/followers/count ----------------------------------------
export type RawUserFollowersData = {
  data: FriendData<ISODateTime>[]
}

export type PrettifiedUserFollowersData = FriendData<Date>[]
// -------------------------------------------------------------------------------


// POST /v1/user/following-exists ------------------------------------------------
export type RawAuthenticatedUserFollowingsExistData<UserId extends Identifier> = {
  followings: {
    isFollowing: boolean,
    isFollowed: boolean,
    userId: UserId
  }[]
}

export type PrettifiedAuthenticatedUserFollowingsExistData<UserId extends Identifier> = {
  [Key in UserId]: {
    isFollowing: boolean,
    isFollowed: boolean
  } | undefined
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////