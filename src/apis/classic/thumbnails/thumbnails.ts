// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import { ArrayNonEmpty, Identifier } from "typeforge"

import type { GamesIconSize, GameThumbnailSize, PrettifiedGamesIconsData, PrettifiedGamesThumbnailsData, RawGamesIconsData, RawGamesThumbnailsData, ThumbnailFormat, ThumbnailReturnPolicy } from "./thumbnails.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "ClassicThumbnails", baseUrl: "https://thumbnails.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Usernames ] /////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/**
 * Gets thumbnail(s) for multiple games.
 * @category Games
 * @endpoint GET /v1/games/multiget/thumbnails
 * 
 * @param universeIds The ids of the universe to get thumbnails for.
 * @param countPerUniverse The amount of thumbnails to return for each universe
 * @param defaults True if defaults (if any) should be returned if no media exists.
 * @param size The thumbnails size (formatted as {width}x{height}).
 * @param format Specifies the format of the thumbnails.
 * @param isCircular Dictates if the thumbnails should be masked by a circle.
 * 
 * @example const { data:gamesThumbnails } = await ClassicThumbnailsApi.gamesThumbnails({ universeIds: [ 1685831367 ] });
 * @exampleData {"1685831367":{"error":null,"thumbnails":[{"targetId":5130624799,"state":"Completed","imageUrl":"https://tr.rbxcdn.com/611f558eaab21d31a688b0523cb12433/480/270/Image/Webp","version":"TN2"}]}}
 * @exampleRawBody {"data":[{"error":null,"thumbnails":[{"targetId":5130624799,"state":"Completed","imageUrl":"https://tr.rbxcdn.com/611f558eaab21d31a688b0523cb12433/480/270/Image/Webp","version":"TN2"}]}]}
 */
export const gamesThumbnails = addApiMethod(async <UniverseId extends Identifier>(
  { universeIds, countPerUniverse, defaults, size = "480x270", format = "WebP", isCircular }:
  {
    universeIds: ArrayNonEmpty<UniverseId>, countPerUniverse?: number, defaults?: boolean,
    size?: GameThumbnailSize, format?: ThumbnailFormat, isCircular?: boolean
  }
): ApiMethod<RawGamesThumbnailsData<UniverseId>, PrettifiedGamesThumbnailsData<UniverseId>> => ({
  path: `/v1/games/multiget/thumbnails`,
  method: "GET",
  searchParams: { universeIds, countPerUniverse, defaults, size, format, isCircular },
  name: "gamesThumbnails",

  prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "universeId", gameThumbnailData => {
    delete (gameThumbnailData as Omit<typeof gameThumbnailData, "universeId"> & { universeId?: Identifier }).universeId
    return gameThumbnailData
  })
}))

export const gamesIcons = addApiMethod(async <UniverseId extends Identifier>(
  { universeIds, returnPolicy, size = "256x256", format = "WebP", isCircular }:
  {
    universeIds: ArrayNonEmpty<UniverseId>, returnPolicy?: ThumbnailReturnPolicy, size?: GamesIconSize, format?: ThumbnailFormat, isCircular?: boolean
  }
): ApiMethod<RawGamesIconsData<UniverseId>, PrettifiedGamesIconsData<UniverseId>> => ({
  path: `/v1/games/icons`,
  method: "GET",
  searchParams: { universeIds, returnPolicy, size, format, isCircular },
  name: "gamesIcons",

  prettifyFn: ({ data }) => createObjectMapByKeyWithMiddleware(data, "targetId", gameIconData => {
    delete (gameIconData as Omit<typeof gameIconData, "targetId"> & { targetId?: Identifier }).targetId
    return gameIconData
  })
}))
//////////////////////////////////////////////////////////////////////////////////