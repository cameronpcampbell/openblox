// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { Identifier, SortOrder } from "../../../utils/utils.types"
import { FriendsMetadataData, PrettifiedAuthenticatedUserFriendRequestsData, PrettifiedFindFriendsData, PrettifiedFriendsListData, RawAuthenticatedUserFriendRequestsData, RawFindFriendsData, RawFriendsListData } from "./friends.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "ClassicFriends", baseUrl: "https://friends.roblox.com" })
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
export const friendsMetadata = addApiMethod(async (
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
export const authenticatedUserFriendsCount = addApiMethod(async (
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/my/friends/count`,
  method: "GET",
  name: "authenticatedUserFriendsCount",

  prettifyFn: ({ count }) => count
}))

/**
 * Gets friends requests sent to the authenticated user.
 * @endpoint GET /v1/my/friends/requests
 * 
 * @param limit
 * @param sortOrder
 * @param cursor
 * 
 * @example const { data:requests } = await ClassicFriendsApi.authenticatedUserFriendRequests({ limit: 10 })
 * @exampleData [ { "friendRequest": { "sentAt": "2024-03-24T02:25:33.095Z", "senderId": 5635371081, "sourceUniverseId": 2549415383, "originSourceType": "InGame", "contactName": null }, "mutualFriendsList": [], "hasVerifiedBadge": false, "description": "", "created": "2024-03-04T15:20:32.033Z", "isBanned": false, "externalAppDisplayName": null, "id": 5635371081, "name": "loremIpsum", "displayName": "loremIpsum"} ]
 * @exampleRawBody { "previousPageCursor": null, "nextPageCursor": "638366615689560000-0_1_bcccef3d2c3547470ca9dc3072eedfec", "data": [ { "friendRequest": { "sentAt": "2024-03-24T02:25:33.095Z", "senderId": 5635371081, "sourceUniverseId": 2549415383, "originSourceType": "InGame", "contactName": null }, "mutualFriendsList": [], "hasVerifiedBadge": false, "description": "", "created": "2024-03-04T15:20:32.033Z", "isBanned": false, "externalAppDisplayName": null, "id": 5635371081, "name": "loremIpsum", "displayName": "loremIpsum"} ] }
 */
export const authenticatedUserFriendRequests = addApiMethod(async (
  { limit, sortOrder, cursor }: { limit?: 10 | 18 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawAuthenticatedUserFriendRequestsData, PrettifiedAuthenticatedUserFriendRequestsData> => ({
  path: `/v1/my/friends/requests`,
  method: "GET",
  searchParams: { limit, sortOrder, cursor },
  name: "authenticatedUserFriendRequests",

  prettifyFn: ({ data }) => data.map(requestData => cloneAndMutateObject(requestData, obj => {
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
export const authenticatedUserFriendRequestsCount = addApiMethod(async (
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/user/friend-requests/count`,
  method: "GET",
  name: "authenticatedUserFriendRequestsCount",

  prettifyFn: ({ count }) => count
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
export const friendsList = addApiMethod(async (
  { userId, userSort }: { userId: Identifier, userSort?: 0 | 1 | 2 }
): ApiMethod<RawFriendsListData, PrettifiedFriendsListData> => ({
  path: `/v1/users/${userId}/friends`,
  method: "GET",
  searchParams: { userSort },
  name: "friendsList",

  prettifyFn: ({ data }) => data.map(friendData => cloneAndMutateObject(friendData, obj => {
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
export const friendsCount = addApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/users/${userId}/friends/count`,
  method: "GET",
  name: "friendsCount",

  prettifyFn: ({ count }) => count
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
export const findFriends = addApiMethod(async (
  { userId, userSort, limit, cursor }: { userId: Identifier, userSort?: 0 | 1 | 2, limit?: number, cursor?: string }
): ApiMethod<RawFindFriendsData, PrettifiedFindFriendsData> => ({
  path: `/v1/users/${userId}/friends/find`,
  method: "GET",
  searchParams: { userSort, limit, cursor },
  name: "findFriends",

  prettifyFn: ({ PageItems:pageItems }) => pageItems,

  getCursorsFn: ({ PreviousCursor:previousCursor, NextCursor:nextCursor }) => [ previousCursor, nextCursor ]
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
export const userfollowersCount = addApiMethod(async (
  { userId }: { userId: Identifier }
): ApiMethod<{ count: number }, number> => ({
  path: `/v1/users/${userId}/followers/count`,
  method: "GET",
  name: "userfollowersCount",

  prettifyFn: ({ count }) => count
}))
//////////////////////////////////////////////////////////////////////////////////