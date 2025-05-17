// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ArrayNonEmptyIfConst } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { FriendshipOriginSourceType, FriendsMetadataData, FriendsUserSort, PrettifiedAuthenticatedUserFollowingsExistData, PrettifiedAuthenticatedUserFriendRequestsData, PrettifiedFindFriendsData, PrettifiedFriendsListData, PrettifiedFriendsSearchData, PrettifiedFriendsStatusesData, PrettifiedInactiveFriendsData, PrettifiedOnlineFriendsUserPresenceData, PrettifiedUserFollowersData, RawAuthenticatedUserFollowingsExistData, RawAuthenticatedUserFriendRequestsData, RawFindFriendsData, RawFriendsListData, RawFriendsSearchData, RawFriendsStatusesData, RawInactiveFriendsData, RawOnlineFriendsUserPresenceData, RawUserFollowersData } from "./friends.types"
import type { SortOrder } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicFriends", baseUrl: "https://friends.roblox.com" })

const userSortNameToId = {
  Alphabetical: 0,
  StatusAlphabetical: 1,
  StatusFrequents: 2
} satisfies Record<FriendsUserSort, 0 | 1 | 2>

const friendshipOriginSourceTypeNameToId = {
  Unknown: 0,
  PlayerSearch: 1,
  QrCode: 2,
  InGame: 3,
  UserProfile: 4,
  QqContactImporter: 5,
  WeChatContactImporter: 6,
  ProfileShare: 7,
  PhoneContactImporter: 8,
  FriendRecommendations: 9
} satisfies Record<FriendshipOriginSourceType, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>
//////////////////////////////////////////////////////////////////////////////////


// [ Friends ] ///////////////////////////////////////////////////////////////////
/**
 * Gets friends metadata.
 * @endpoint GET /v1/metadata
 * 
 * @example const { data:metadata } = await ClassicFriendsApi.friendsMetadata()
 * @exampleData {"isFriendsFilterBarEnabled":true,"isFriendsPageSortExperimentEnabled":false,"isFriendsUserDataStoreCacheEnabled":true,"frequentFriendSortRollout":0,"userName":null,"displayName":null}
 * @exampleRawBody {"isFriendsFilterBarEnabled":true,"isFriendsPageSortExperimentEnabled":false,"isFriendsUserDataStoreCacheEnabled":true,"frequentFriendSortRollout":0,"userName":null,"displayName":null}
 */
export const friendsMetadata = createApiMethod(async (
): ApiMethod<FriendsMetadataData> => ({
  path: `/v1/metadata`,
  method: "GET",
  name: "friendsMetadata"
}))

/**
 * Gets the amount of friends the authenticated user has.
 * @endpoint GET /v1/my/friends/count
 * 
 * @example const { data:metadata } = await ClassicFriendsApi.friendsMetadata()
 * @exampleData 47
 * @exampleRawBody {"count":47}
 */
export const authenticatedUserFriendsCount = createApiMethod(async (
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/my/friends/count`,
  method: "GET",
  name: "authenticatedUserFriendsCount",

  formatRawDataFn: ({ count }) => count
}))

/**
 * Gets friends requests sent to the authenticated user.
 * @endpoint GET /v1/my/friends/requests
 * 
 * @param limit The number of results to be returned per request.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:requests } = await ClassicFriendsApi.authenticatedUserFriendRequests({ limit: 10 })
 * @exampleData [ { "friendRequest": { "sentAt": "2024-03-24T02:25:33.095Z", "senderId": 5635371081, "sourceUniverseId": 2549415383, "originSourceType": "InGame", "contactName": null }, "mutualFriendsList": [], "hasVerifiedBadge": false, "description": "", "created": "2024-03-04T15:20:32.033Z", "isBanned": false, "externalAppDisplayName": null, "id": 5635371081, "name": "loremIpsum", "displayName": "loremIpsum"} ]
 * @exampleRawBody { "previousPageCursor": null, "nextPageCursor": "638366615689560000-0_1_bcccef3d2c3547470ca9dc3072eedfec", "data": [ { "friendRequest": { "sentAt": "2024-03-24T02:25:33.095Z", "senderId": 5635371081, "sourceUniverseId": 2549415383, "originSourceType": "InGame", "contactName": null }, "mutualFriendsList": [], "hasVerifiedBadge": false, "description": "", "created": "2024-03-04T15:20:32.033Z", "isBanned": false, "externalAppDisplayName": null, "id": 5635371081, "name": "loremIpsum", "displayName": "loremIpsum"} ] }
 */
export const authenticatedUserFriendRequests = createApiMethod(async (
  { limit, sortOrder, cursor }: { limit?: 10 | 18 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawAuthenticatedUserFriendRequestsData, PrettifiedAuthenticatedUserFriendRequestsData> => ({
  path: `/v1/my/friends/requests`,
  method: "GET",
  searchParams: { limit, sortOrder, cursor },
  name: "authenticatedUserFriendRequests",

  formatRawDataFn: ({ data }) => data.map(requestData => cloneAndMutateObject(requestData, obj => {
    const friendRequest = obj.friendRequest
    friendRequest.sentAt = new Date(friendRequest.sentAt)
    obj.created = new Date(obj.created)
  }))
}))

/**
 * Gets the amount of friend requests the authenticated user has.
 * @endpoint GET /v1/user/friend-requests/count
 * 
 * @example const { data:requestsCount } = await ClassicFriendsApi.authenticatedUserFriendRequestsCount()
 * @exampleData 82
 * @exampleRawBody {"count":82}
 */
export const authenticatedUserFriendRequestsCount = createApiMethod(async (
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/user/friend-requests/count`,
  method: "GET",
  name: "authenticatedUserFriendRequestsCount",

  formatRawDataFn: ({ count }) => count
}))

/**
 * Gets friends for a specified user.
 * @endpoint GET /v1/users/{userId}/friends
 * 
 * @param userId The id of the user to get friends for.
 * @param userSort Specifies how to sort the returned friends.
 * 
 * @example const { data:friends } = await ClassicFriendsApi.friendsList({ userId: 45348281 })
 * @exampleData [{"isOnline":true,"presenceType":1,"isDeleted":false,"friendFrequentScore":0,"friendFrequentRank":1,"hasVerifiedBadge":false,"description":null,"created":"0001-01-01T05:52:00Z","isBanned":false,"externalAppDisplayName":null,"id":1999518862,"name":"Ipsum","displayName":"Lorem"}]
 * @exampleRawBody {"data":[{"isOnline":true,"presenceType":1,"isDeleted":false,"friendFrequentScore":0,"friendFrequentRank":1,"hasVerifiedBadge":false,"description":null,"created":"0001-01-01T05:52:00Z","isBanned":false,"externalAppDisplayName":null,"id":1999518862,"name":"Ipsum","displayName":"Lorem"}]}
 */
export const friendsList = createApiMethod(async (
  { userId, userSort }: { userId: Identifier, userSort?: FriendsUserSort }
): ApiMethod<RawFriendsListData, PrettifiedFriendsListData> => ({
  path: `/v1/users/${userId}/friends`,
  method: "GET",
  searchParams: { userSort: userSort ? userSortNameToId[userSort] : undefined },
  name: "friendsList",

  formatRawDataFn: ({ data }) => data.map(friendData => cloneAndMutateObject(friendData, obj => {
    obj.created = new Date(obj.created)
  }))
}))

/**
 * Gets friends count for a specified user.
 * @endpoint GET /v1/users/{userId}/friends/count
 * 
 * @param userId The id of the user to get friends for.
 * 
 * @example const { data:count } = await ClassicFriendsApi.friendsCount({ userId: 45348281 })
 * @exampleData 47
 * @exampleRawBody {"count":47}
 */
export const friendsCount = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/users/${userId}/friends/count`,
  method: "GET",
  name: "friendsCount",

  formatRawDataFn: ({ count }) => count
}))

/**
 * Gets a paginated list of all friends for the specified user.
 * @endpoint GET /v1/users/{userId}/friends/find
 * 
 * @param userId The id of the user to get friends for.
 * @param userSort Specifies how to sort the returned friends.
 * @param limit The number of results to be returned
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:friends } = await ClassicFriendsApi.userfollowersCount({ userId: 45348281 })
 * @exampleData [{"id":2820974191,"hasVerifiedBadge":false},{"id":29992184,"hasVerifiedBadge":true}]
 * @exampleRawBody {"PreviousCursor":null,"PageItems":[{"id":2820974191,"hasVerifiedBadge":false},{"id":29992184,"hasVerifiedBadge":true}],"NextCursor":"MTk5OTIxODE2MiYxNzYxMjQwMTYmMg==","HasMore":null}
 */
export const findFriends = createApiMethod(async (
  { userId, userSort, limit, cursor }: { userId: Identifier, userSort?: FriendsUserSort, limit?: number, cursor?: string }
): ApiMethod<RawFindFriendsData, PrettifiedFindFriendsData> => ({
  path: `/v1/users/${userId}/friends/find`,
  method: "GET",
  searchParams: { userSort: userSort ? userSortNameToId[userSort] : undefined, limit, cursor },
  name: "findFriends",

  formatRawDataFn: ({ PageItems:pageItems }) => pageItems,

  getCursorsFn: ({ PreviousCursor:previousCursor, NextCursor:nextCursor }) => [ previousCursor, nextCursor ]
}))


/**
 * Gets a list of all inactive friends for a specified user.
 * @endpoint GET /v1/users/{userId}/friends/inactive
 * 
 * @param userId The id of the user to get inactive friends for.
 * 
 * @example const { data:inactive } = await ClassicFriendsApi.inactiveFriends({ userId: 45348281 })
 * @exampleData [{"isDeleted":false,"friendFrequentScore":0,"friendFrequentRank":201,"hasVerifiedBadge":false,"description":null,"created":"0001-01-01T05:51:00.000Z","isBanned":false,"externalAppDisplayName":null,"id":5275218436,"name":"loremIpsum","displayName":"LoremIpsum"}]
 * @exampleRawBody {"data":[{"isDeleted":false,"friendFrequentScore":0,"friendFrequentRank":201,"hasVerifiedBadge":false,"description":null,"created":"0001-01-01T05:51:00.000Z","isBanned":false,"externalAppDisplayName":null,"id":5275218436,"name":"loremIpsum","displayName":"LoremIpsum"}]}
 */
export const inactiveFriends = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<RawInactiveFriendsData, PrettifiedInactiveFriendsData> => ({
  method: "GET",
  path: `/v1/users/${userId}/friends/inactive`,
  name: `inactiveFriends`,

  formatRawDataFn: ({ data }) => data.map(inactiveFriend => cloneAndMutateObject(inactiveFriend, obj => obj.created = new Date(obj.created))) 
}))


/**
 * Gets a list of all online friends for a specified user.
 * @endpoint GET /v1/users/{userId}/friends/online
 * 
 * @param userId The id of the user to get online friends for.
 * @param userSort Specifies how to sort the returned friends.
 * 
 * @example const { data:online } = await ClassicFriendsApi.onlineFriends({ userId: 45348281 })
 * @exampleData [{"userPresence":{"lastLocation":"Simulator Simulator X 99 360","placeId":223715525,"rootPlaceId":221718525,"gameInstanceId":"acd149a6-d1ed-49d7-aa08-643d62cb3068","universeId":93141687,"lastOnline":"2024-05-20T14:34:40.820Z","userPresenceType":"InGame","userLocationType":"Game"},"id":2966800574,"name":"loremIpsum","displayName":"LoremIpsum"}]
 * @exampleRawBody {"data":[{"userPresence":{"lastLocation":"Simulator Simulator X 99 360","placeId":223715525,"rootPlaceId":221718525,"gameInstanceId":"acd149a6-d1ed-49d7-aa08-643d62cb3068","universeId":93141687,"lastOnline":"2024-05-20T14:34:40.820Z","userPresenceType":"InGame","userLocationType":"Game"},"id":2966800574,"name":"loremIpsum","displayName":"LoremIpsum"}]}
 */
export const onlineFriends = createApiMethod(async (
  { userId, userSort }: { userId: Identifier, userSort?: Exclude<FriendsUserSort, "Alphabetical"> }
): ApiMethod<RawOnlineFriendsUserPresenceData, PrettifiedOnlineFriendsUserPresenceData> => ({
  method: "GET",
  path: `/v1/users/${userId}/friends/online`,
  searchParams: { userSort: userSort ? userSortNameToId[userSort] : undefined },
  name: `onlineFriends`,

  formatRawDataFn: ({ data }) => data.map(onlineFriend => cloneAndMutateObject(onlineFriend, ({ userPresence }) => {
    (userPresence as any).userPresenceType = (userPresence as any).UserPresenceType;
    delete (userPresence as any).UserPresenceType;

    (userPresence as any).userLocationType = (userPresence as any).UserLocationType;
    delete (userPresence as any).UserLocationType;

    userPresence.lastOnline = new Date(userPresence.lastOnline)
  }))
}))


/**
 * Search through a users friends list.
 * @endpoint GET /v1/users/{userId}/friends/search
 * 
 * @param userId The id of the user to get online friends for.
 * @param query The query to search for.
 * @param userSort Specifies how to sort the returned friends.
 * @param limit The number of results to be returned per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:searchedFriend } = await ClassicFriendsApi.friendsSearch({ userId: 45348281, query: "b" })
 * @exampleData [{"id":2027974391,"hasVerifiedBadge":false},{"id":176144016,"hasVerifiedBadge":false},{"id":3116019601,"hasVerifiedBadge":false}]
 * @exampleRawBody {"PreviousCursor":null,"PageItems":[{"id":2027974391,"hasVerifiedBadge":false},{"id":176144016,"hasVerifiedBadge":false},{"id":3116019601,"hasVerifiedBadge":false}],"NextCursor":null,"HasMore":null}
 */
export const friendsSearch = createApiMethod(async (
  { userId, query, userSort, limit, cursor }:
  { userId: Identifier, query: string, userSort?: Exclude<FriendsUserSort, "Alphabetical">, limit?: number, cursor?: string }
): ApiMethod<RawFriendsSearchData, PrettifiedFriendsSearchData> => ({
  method: "GET",
  path: `/v1/users/${userId}/friends/search`,
  searchParams: { query, userSort: userSort ? userSortNameToId[userSort] : undefined, limit, cursor },
  name: `friendsSearch`,

  formatRawDataFn: ({ PageItems }) => PageItems,

  getCursorsFn: ({ PreviousCursor, NextCursor }) => [ PreviousCursor, NextCursor ]
}))


/**
 * Gets the friend statuses between a user and multiple related user ids.
 * @endpoint GET /v1/users/{userId}/friends/search
 * 
 * @param userId The id of the user to get friends statuses for.
 * @param relatedUserIds An array of the related userIds to get friends statuses for.
 * 
 * @example const { data:statuses } = await ClassicFriendsApi.friendsStatuses({ userId: 45348281, relatedUserIds: [ 2655994471 ] })
 * @exampleData {"2655994471":"Friends"}
 * @exampleRawBody {"data":[{"id":2655994471,"status":"Friends"}]}
 */
export const friendsStatuses = createApiMethod(async <RelatedUserId extends Identifier>(
  { userId, relatedUserIds }:
  { userId: Identifier, relatedUserIds: ArrayNonEmptyIfConst<RelatedUserId> }
): ApiMethod<RawFriendsStatusesData<RelatedUserId>, PrettifiedFriendsStatusesData<RelatedUserId>> => ({
  method: "GET",
  path: `/v1/users/${userId}/friends/statuses`,
  searchParams: { userIds: relatedUserIds },
  name: `friendsStatuses`,

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", ({ status }) => status)
}))


/**
 * Declines all friend requests for the authenticated user.
 * @endpoint POST /v1/user/friend-requests/decline-all
 * 
 * @example const { data:success } = await ClassicFriendsApi.authenticatedUserDeclineAllFriendRequests()
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserDeclineAllFriendRequests = createApiMethod(async (
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/user/friend-requests/decline-all`,
  name: `authenticatedUserDeclineAllFriendRequests`,

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Accepts a friend request from a specific user for the authenticated user.
 * @endpoint POST /v1/users/{userId}/accept-friend-request
 * 
 * @param userId The id of the user to accept friend request from.
 * 
 * @example const { data:success } = await ClassicFriendsApi.authenticatedUserAcceptFriendRequest({ userId: 2655994471 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserAcceptFriendRequest = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/users/${userId}/accept-friend-request`,
  name: `authenticatedUserAcceptFriendRequest`,

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Accepts a friend request from a specific user for the authenticated user.
 * @endpoint POST /v1/users/{requesterUserId}/decline-friend-request
 * 
 * @param requesterUserId The id of the user to decline friend request from.
 * 
 * @example const { data:success } = await ClassicFriendsApi.authenticatedUserDeclineFriendRequest({ requesterUserId: 2655994471 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserDeclineFriendRequest = createApiMethod(async (
  { requesterUserId }: { requesterUserId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/users/${requesterUserId}/decline-friend-request`,
  name: `authenticatedUserAcceptFriendRequest`,

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))


/**
 * Sends a friend request to a specific user.
 * @endpoint REST /...
 * 
 * @param userId The ID of the user to send a friend request to.
 * @param originSourceType Where the friend request originated from.
 * 
 * @example
 * const { data:requestStatus } = await ClassicFriendsApi.authenticatedUserRequestFriendship({
     userId: 2655994471, originSourceType: "UserProfile"
   })
 * @exampleData {"success":true,"isCaptchaRequired":false}
 * @exampleRawBody {"success":true,"isCaptchaRequired":false}
 */
export const authenticatedUserRequestFriendship = createApiMethod(async (
  { userId, originSourceType }: { userId: Identifier, originSourceType?: FriendshipOriginSourceType }
): ApiMethod<{ success: boolean, isCaptchaRequired: boolean }> => ({
  method: "POST",
  path: `/v1/users/${userId}/request-friendship`,
  body: { friendshipOriginSourceType: originSourceType ? friendshipOriginSourceTypeNameToId[originSourceType] : 0 },
  name: `authenticatedUserRequestFriendship`,
}))

/**
 * Removes a friend for the authenticated user.
 * @endpoint POST /v1/users/{targetUserId}/unfriend
 * 
 * @param targetUserId The id of the user to remove as friend.
 * 
 * @example const { data:success } = await ClassicFriendsApi.authenticatedUserUnfriend({ userId: 2655994471 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserUnfriend = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/users/${userId}/unfriend`,
  name: `authenticatedUserUnfriend`,

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Followings ] ////////////////////////////////////////////////////////////////
/**
 * Gets the followers for a specific user.
 * @endpoint GET /v1/users/{userId}/followers
 * 
 * @param userId The id of the user to get the followers for.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:followersCount } = await ClassicFriendsApi.userfollowersCount({ userId: 45348281 })
 * @exampleData [{"isDeleted":false,"friendFrequentScore":0,"friendFrequentRank":201,"hasVerifiedBadge":true,"description":null,"created":"0001-01-01T05:51:00.000Z","isBanned":false,"externalAppDisplayName":null,"id":156,"name":"builderman","displayName":"builderman"}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"745831147_1_1e210d709f013f76846a9e2517aa7263","data":[{"isDeleted":false,"friendFrequentScore":0,"friendFrequentRank":201,"hasVerifiedBadge":true,"description":null,"created":"0001-01-01T05:51:00.000Z","isBanned":false,"externalAppDisplayName":null,"id":156,"name":"builderman","displayName":"builderman"}]}
 */
export const userFollowers = createApiMethod(async (
  { userId, limit, sortOrder, cursor }:
  { userId: Identifier, limit?: 10 | 18 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawUserFollowersData, PrettifiedUserFollowersData> => ({
  method: "GET",
  path: `/v1/users/${userId}/followers`,
  searchParams: { limit, sortOrder, cursor },
  name: "userFollowers",

  formatRawDataFn: ({ data }) => data.map(follower => cloneAndMutateObject(follower, obj => obj.created = new Date(obj.created)))
}))


/**
 * Gets the followers count for a specific user.
 * @endpoint GET /v1/users/{userId}/followers/count
 * 
 * @param userId The id of the user to get the follower count for.
 * 
 * @example const { data:followersCount } = await ClassicFriendsApi.userfollowersCount({ userId: 45348281 })
 * @exampleData 510
 * @exampleRawBody { count: 510 }
 */
export const userFollowersCount = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/users/${userId}/followers/count`,
  method: "GET",
  name: "userFollowersCount",

  formatRawDataFn: ({ count }) => count
}))


// TODO: finish this endpoint.
/**
 * Gets the followings for a specific user.
 * @endpoint REST /...
 * 
 * @param userId The ID of the user to get followings for.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example
 * @exampleData
 * @exampleRawBody
 */
export const userFollowings = createApiMethod(async (
  { userId, limit, sortOrder, cursor }:
  { userId: Identifier, limit: 10 | 18 | 25 | 50 | 100, sortOrder: SortOrder, cursor: string }
): ApiMethod<any> => ({
  method: "GET",
  path: `/v1/users/${userId}/followings`,
  searchParams: { limit, sortOrder, cursor },
  name: `userFollowings`,
}))


/**
 * Gets the number of followings a user has.
 * @endpoint GET /v1/users/{userId}/followings/count
 * 
 * @param userId The ID of the user to get followings count for.
 * 
 * @example const { data:followingsCount } = await ClassicFriendsApi.userFollowingsCount({ userId: 45348281 })
 * @exampleData 337
 * @exampleRawBody { count: 337 }
 */
export const userFollowingsCount = createApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{ count: number }, number> => ({
  method: "GET",
  path: `/v1/users/${userId}/followings/count`,
  name: `userFollowingsCount`,

  formatRawDataFn: ({ count }) => count
}))

/**
 * Returns whether or not the current user is following each userId in a list of userIds
 * @endpoint POST /v1/user/following-exists
 * 
 * @param userIds The userIds to get following statuses for.
 * 
 * @example const { data:followings } = await ClassicFriendsApi.authenticatedUserFollowingsExist({ userIds: [ 2655994471 ] })
 * @exampleData {"2655994471":{"isFollowing":false,"isFollowed":false}}
 * @exampleRawBody {"followings":[{"isFollowing":false,"isFollowed":false,"userId":2655994471}]}
 */
export const authenticatedUserFollowingsExist = createApiMethod(async <UserId extends Identifier>(
  { userIds }: { userIds: ArrayNonEmptyIfConst<UserId> }
): ApiMethod<RawAuthenticatedUserFollowingsExistData<UserId>, PrettifiedAuthenticatedUserFollowingsExistData<UserId>> => ({
  method: "POST",
  path: `/v1/user/following-exists`,
  body: { targetUserIds: userIds },
  name: `authenticatedUserFollowingsExist`,

  formatRawDataFn: ({ followings }) => createObjectMapByKeyWithMiddleware(followings, "userId", ({ userId, ...rest }) => ({ ...rest }))
}))
//////////////////////////////////////////////////////////////////////////////////