// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, ISODateTime, ObjectPrettify } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////

export type FriendsUserSort = "Alphabetical" | "StatusAlphabetical" | "StatusFrequents"

type LowercaseFirstLetter<S extends string> =
S extends `${infer First}${infer Rest}`
? `${Lowercase<First>}${Rest}`
: S;
type KeysToCamelCase<Obj> = ObjectPrettify<{
  [Key in keyof Obj as LowercaseFirstLetter<string &Key>]: (
    Obj[Key] extends Array<any> ? Obj[Key]
    : Obj[Key] extends {} ? KeysToCamelCase< Obj[Key]>
    : Obj[Key]
  )
}>
type ArrWithObjectsToCamelCase<Arr extends unknown[]> =  { [Key in keyof Arr]: ObjectPrettify<KeysToCamelCase<Arr[Key]>> }

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

type ObjectToCamelCase<Obj extends Record<string, any>> = ObjectPrettify<{
  // @ts-ignore | hush hush shawty
  [Key in keyof Obj as LowercaseFirstLetter<Key>]: Obj[Key]
}>

export type PrettifiedOnlineFriendsUserPresenceData = ObjectPrettify<{
  userPresence: ObjectToCamelCase<OnlineFriends_UserPresence<Date>>,
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
  [Key in RelatedUserId]: "NotFriends" | "Friends" | "RequestSent" | "RequestReceived"
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////



// [ Followings ] ////////////////////////////////////////////////////////////////
export type RawUserFollowersData = {
  data: FriendData<ISODateTime>[]
}

export type PrettifiedUserFollowersData = FriendData<Date>[]
//////////////////////////////////////////////////////////////////////////////////