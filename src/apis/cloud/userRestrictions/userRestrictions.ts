// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ISODateTime } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedListRestrictionLogsData, PrettifiedUserRestrictionsData, RawListRestrictionLogsData, RawUserRestrictionsData, UpdateUserRestrictionsData } from "./userRestrictions.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ name: "UserRestrictions", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



/**
 * Gets restrictions for a user.
 * @endpoint
 * PATCH /v2/universes/{universe}/user-restrictions/{user-restriction}
 * PATCH /v2/universes/{universeId}/places/{placeId}/user-restrictions/{userId}
 * 
 * @param universeId The ID of the universe to get restrictions for.
 * @param placeId The ID of the place to get restrictions for.
 * @param userId The ID of the uset to get restrictions to get.
 * 
 * @example
 * const { data:restrictions } = await UserRestrictionsApi.restrictions({
     universeId: 5795192361, placeId: 18210254887, userId: 6193495014
   })
 * @exampleData {"path":"universes/5795192361/places/18210254887/user-restrictions/6193495014","user":"users/6193495014","gameJoinRestriction":{"active":true,"startTime":"2024-06-25T22:56:58.873Z","duration":"31540000s","privateReason":"Being a meanie :/","displayReason":"Annoying other players.","excludeAltAccounts":false,"inherited":false}}
 * @exampleRawBody {"path":"universes/5795192361/places/18210254887/user-restrictions/6193495014","user":"users/6193495014","gameJoinRestriction":{"active":true,"startTime":"2024-06-25T22:56:58.873Z","duration":"31540000s","privateReason":"Being a meanie :/","displayReason":"Annoying other players.","excludeAltAccounts":false,"inherited":false}}
 */
export const restrictions = addApiMethod(async <
  UniverseId extends Identifier, UserId extends Identifier, PlaceId extends Identifier | undefined = undefined
>(
  { universeId, placeId, userId }:
  { universeId: UniverseId, placeId?: PlaceId, userId: UserId }
): ApiMethod<RawUserRestrictionsData<UniverseId, UserId, PlaceId>, PrettifiedUserRestrictionsData<UniverseId, UserId, PlaceId>> =>  ({
  method: "GET",
  path: (
    placeId ? `/v2/universes/${universeId}/places/${placeId}/user-restrictions/${userId}`
    : `/v2/universes/${universeId}/user-restrictions/${userId}`
  ),
  name: `restrictions`,

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, ({ gameJoinRestriction }) => {
    gameJoinRestriction.startTime = new Date(gameJoinRestriction.startTime)
  })
}))




/**
 * Updates restrctions for a user.
 * @endpoint
 * PATCH /v2/universes/{universe}/user-restrictions/{user-restriction}
 * PATCH /v2/universes/{universeId}/places/{placeId}/user-restrictions/{userId}
 * 
 * @param universeId The ID of the universe to set restrictions for.
 * @param placeId The ID of the place to set restrictions for.
 * @param userId The ID of the uset to set restrictions to get.
 * @param updatedData The new restrictions.
 * @param idempotencyKey The unique key to use for idempotency.
 * @param firstSent The timestamp at which the first request was sent. If this is further in the past than the lifetime of the idempotency key (which may exceed the annotated minimum lifetime), the server must return an error.
 * 
 * @example
 * import { v4 as uuidv4 } from "uuid"
   const idempotencyKey = uuidv4(), firstSent = new Date()
    
   const { data:updatedRestrictions } = await UserRestrictionsApi.updateRestrictionsForUser({
     universeId: 5795192361, placeId: 18210254887, userId: 6193495014, idempotencyKey, firstSent, updatedData: {
       gameJoinRestriction: {
         active: true,
         duration: "31540000s", // 1 year.
         privateReason: "Being a meanie :/",
         displayReason: "Annoying other players.",
         excludeAltAccounts: false,
         inherited: true
       }
     }
   })
 * @exampleData {"path":"universes/5795192361/places/18210254887/user-restrictions/6193495014","user":"users/6193495014","gameJoinRestriction":{"active":true,"startTime":"2024-06-25T22:54:39.245Z","duration":"31540000s","privateReason":"Being a meanie :/","displayReason":"Annoying other players.","excludeAltAccounts":false,"inherited":false}}
 * @exampleRawBody {"path":"universes/5795192361/places/18210254887/user-restrictions/6193495014","user":"users/6193495014","gameJoinRestriction":{"active":true,"startTime":"2024-06-25T22:54:39.245Z","duration":"31540000s","privateReason":"Being a meanie :/","displayReason":"Annoying other players.","excludeAltAccounts":false,"inherited":false}}
 */
export const updateRestrictionsForUser = addApiMethod(async <
  UniverseId extends Identifier, UserId extends Identifier,
  const UpdatedData extends UpdateUserRestrictionsData, PlaceId extends Identifier | undefined = undefined
>(
  { universeId, placeId, userId, updatedData, idempotencyKey, firstSent }:
  {
    universeId: UniverseId, placeId?: PlaceId, userId: UserId,
    updatedData: UpdatedData, idempotencyKey?: string, firstSent?: Date | ISODateTime
  }
): ApiMethod<
    RawUserRestrictionsData<UniverseId, UserId, PlaceId, UpdatedData>,
    PrettifiedUserRestrictionsData<UniverseId, UserId, PlaceId, UpdatedData>
  > =>  ({
  method: "PATCH",
  path: (
    placeId ? `/v2/universes/${universeId}/places/${placeId}/user-restrictions/${userId}`
    : `/v2/universes/${universeId}/user-restrictions/${userId}`
  ),
  searchParams: { "idempotencyKey.key": idempotencyKey, "idempotencyKey.firstSent": firstSent },
  body: updatedData,
  name: `updateRestrictionsForUser`,

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, ({ gameJoinRestriction }) => {
    gameJoinRestriction.startTime = new Date(gameJoinRestriction.startTime)
  })
}))



/**
 * Gets a list of restriction logs from a specific universe.
 * @endpoint GET /v2/universes/{universeId}/user-restrictions:listLogs
 * 
 * @param universeId The ID of the universe to get restriction logs for.
 * @param placeId The ID of the place to get restriction logs for.
 * @param userId The ID of the uset to get restriction logs to get.
 * @param limit The maximum number of items to return.
 * @param cursor Provide to request the next set of data.
 * 
 * @example
 * const { data:logs } = await UserRestrictionsApi.listRestrictionLogs({
 *   universeId: 5795192361, placeId: 18210254887, userId: 6193495014
 * })
 * @exampleData [{"user":"users/6193495014","place":"18210254887","moderator":{"robloxUser":"45348281"},"createTime":"2024-06-25T22:56:58.873Z","active":true,"startTime":"2024-06-25T22:56:58.873Z","duration":"31540000s","privateReason":"Being a meanie :/","displayReason":"Annoying other players.","excludeAltAccounts":false}]
 * @exampleRawBody {"logs":[{"user":"users/6193495014","place":"18210254887","moderator":{"robloxUser":"45348281"},"createTime":"2024-06-25T22:56:58.873Z","active":true,"startTime":"2024-06-25T22:56:58.873Z","duration":"31540000s","privateReason":"Being a meanie :/","displayReason":"Annoying other players.","excludeAltAccounts":false}],"nextPageToken":"id_2zwAAAZBRnd35xBBXeienIm9K54uMH01-RpcT"}
 */
export const listRestrictionLogs = addApiMethod(async <
  UniverseId extends Identifier, UserId extends Identifier = Identifier, PlaceId extends Identifier = Identifier
>(
  { universeId, placeId, userId, limit, cursor }:
  { universeId: UniverseId, placeId?: PlaceId, userId?: UserId, limit?: number, cursor?: string  }
): ApiMethod<RawListRestrictionLogsData<UserId, PlaceId>, PrettifiedListRestrictionLogsData<UserId, PlaceId>> => ({
  method: "GET",
  path: `/v2/universes/${universeId}/user-restrictions:listLogs`,
  searchParams: { maxPageSize: limit, pageToken: cursor, filter: (
    (userId && placeId) ? `user == 'users/${userId}' && place == 'places/${placeId}'`
    : userId ? `user == 'users/${userId}'`
    : placeId ? `place == 'places/${placeId}'`
    : undefined
  ) },
  name: `listRestrictionLogs`,

  formatRawDataFn: ({ logs }) => logs.map(log => cloneAndMutateObject(log, obj => {
    obj.createTime = new Date(obj.createTime)
    obj.startTime = new Date(obj.startTime)
  })),

  getCursorsFn: ({ nextPageToken }) => [ null, nextPageToken ],
}))