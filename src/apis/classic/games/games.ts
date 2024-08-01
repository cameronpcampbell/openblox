// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { ArrayNonEmptyIfConst, Identifier, SortOrder } from "../../../utils/utils.types"
import type { PrettifiedGamesInfoData, PrettifiedUserGamesData, RawGamesInfoData, RawUserGamesData } from "./games.types"
import { ArrayNonEmpty } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "ClassicGames", baseUrl: "https://games.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets a list of games info from universe ids.
 * @endpoint GET /v1/games
 * 
 * @param userId The id of the user to get games for.
 * @param limit The maximum amount of games to return.
 * @param sortOrder The order the results are sorted it.
 * @param cursor the paging cursor for the previous or next page.
 * 
 * @example
 * @exampleData
 * @exampleRawBody
 */
export const gamesInfo = addApiMethod(async <UniverseId extends Identifier>(
  { universeIds }: { universeIds: ArrayNonEmpty<UniverseId> }
): ApiMethod<RawGamesInfoData<UniverseId>, PrettifiedGamesInfoData<UniverseId>> => ({
  method: "GET",
  path: `/v1/games`,
  name: "gamesInfo",
  searchParams: { universeIds },

  prettifyFn: x => x as any,

 /*prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "id", gameInfo => {
    delete (gameInfo as Omit<typeof gameInfo, "id"> & { id?: typeof gameInfo["id"] }).id
    gameInfo.created = new Date(gameInfo.created) as any
    gameInfo.updated = new Date(gameInfo.updated) as any
    return gameInfo
  })*/

}))

/**
 * Gets a list of games made by a specific user.
 * @endpoint GET /v2/users/{userId}/games
 * 
 * @param userId The id of the user to get games for.
 * @param limit The maximum amount of games to return.
 * @param sortOrder The order the results are sorted it.
 * @param cursor the paging cursor for the previous or next page.
 * 
 * @example
 * @exampleData
 * @exampleRawBody
 */
export const userGames = addApiMethod(async (
  { userId, limit, sortOrder, cursor }: { userId: Identifier, limit?: 10 | 25 | 50, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawUserGamesData, PrettifiedUserGamesData> => ({
  path: `/v2/users/${userId}/games`,
  method: "GET",
  searchParams: { limit, sortOrder, cursor },
  name: "userGames",

  prettifyFn: ({ data }) => data.map(gameData => cloneAndMutateObject(gameData, obj => {
    obj.created = new Date(obj.created)
    obj.updated = new Date(obj.updated)
  })),

  getCursorsFn: ({ previousPageCursor, nextPageCursor }) => [ previousPageCursor, nextPageCursor ]
}))