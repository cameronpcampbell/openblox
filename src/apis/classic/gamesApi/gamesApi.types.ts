import { PrettifyKeyof } from "../../../utils/utils.types"


// [ GAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/games -----------------------------------------------------------------------------------------------------
export type GameInfo<TimeType> = PrettifyKeyof<{
  id: number,
  rootPlaceId: number,
  name: string,
  description: string,
  sourceName: string,
  sourceDescription: string,
  creator: {
    id: number,
    name: string,
    type: string,
    isRNVAccount: boolean,
    hasVerifiedBadge: boolean
  },
  price: number | null,
  allowedGearGenres: string[],
  allowedGearCategories: string[],
  isGenreEnforced: boolean,
  copyingAllowed: boolean,
  playing: number,
  visits: number,
  maxPlayers: number,
  created: TimeType,
  updated: TimeType,
  studioAccessToApisAllowed: boolean,
  createVipServersAllowed: boolean,
  universeAvatarType: string|number,
  genre: string,
  isAllGenre: boolean,
  isFavoritedByUser: boolean,
  favoritedCount: number
}>

export type RawGamesInfoData = PrettifyKeyof<{
  data: GameInfo<string>[]
}>

export type FormattedGamesInfoData<UniverseId extends number> = PrettifyKeyof<
  Record<UniverseId, PrettifyKeyof<Omit<GameInfo<Date>, "id">>> 
>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/{universeId}/media ----------------------------------------------------------------------------------
export type FormattedGameMedia_v1Data = PrettifyKeyof<{
  id: string,
  assetTypeId: number,
  assetType: string,
  imageId: number,
  videoHash: string | null,
  videoTitle: string | null,
  approved: boolean,
  altText: string | null
}>

export type RawGameMedia_v1Data = PrettifyKeyof<{
  data: FormattedGameMedia_v1Data
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/games-product-info ----------------------------------------------------------------------------------
type GameProductInfo = PrettifyKeyof<{
  universeId: number,
  isForSale: boolean,
  productId: number,
  price: number | null,
  sellerId: number
}>

export type RawGamesProductInfoData = PrettifyKeyof<{
  data: GameProductInfo[]
}>

export type FormattedGamesProductInfoData<UniverseId extends number> = PrettifyKeyof<
  Record<UniverseId, PrettifyKeyof<Omit<GameProductInfo, "universeId">>> 
>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/list-spotlight --------------------------------------------------------------------------------------
type AuthenticatedUserSpotlightedGames_GameInfo = PrettifyKeyof<{
  creatorId: number,
  creatorName: string,
  creatorType: string,
  creatorHasVerifiedBadge: boolean,
  totalUpVotes: number,
  totalDownVotes: number,
  universeId: number,
  name: string,
  placeId: number,
  playerCount: number,
  imageToken: string,
  isSponsored: boolean,
  nativeAdData: string,
  isShowSponsoredLabel: boolean,
  price: number,
  analyticsIdentifier: string,
  gameDescription: string,
  genre: string,
  minimumAge: number,
  ageRecommendationDisplayName: string
}>

export type RawAuthenticatedUserSpotlightedGamesData = PrettifyKeyof<{
  data: (
    {
      spotlightType: "FriendsPlaying",
      spotlightActionText: string,
      spotlightTypeData: {
        users: `${number}`[],
        friendsAffinityScores: null
      },
      gameInfo: AuthenticatedUserSpotlightedGames_GameInfo
    } |
    {
      spotlightType: "RecommendedForYou",
      spotlightActionText: string,
      spotlightTypeData: null,
      gameInfo: AuthenticatedUserSpotlightedGames_GameInfo
    }
  )[]
}>

export type FormattedAuthenticatedUserSpotlightedGamesData = PrettifyKeyof<RawAuthenticatedUserSpotlightedGamesData["data"]>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/multiget-place-details ------------------------------------------------------------------------------
type PlacesInfo = PrettifyKeyof<{
  name: string,
  description: string,
  sourceName: string,
  sourceDescription: string,
  url: `https://www.roblox.com/games/${number}/${string}`,
  builder: string,
  builderId: number,
  hasVerifiedBadge: boolean,
  isPlayable: boolean,
  reasonProhibited: string,
  universeId: number,
  universeRootPlaceId: number,
  price: number,
  imageToken: string
}>

export type RawPlacesInfoData<PlaceId extends number> = PrettifyKeyof<PrettifyKeyof<{ placeId: PlaceId } & PlacesInfo>[]>

export type FormattedPlacesInfoData<PlaceId extends number> = PrettifyKeyof<{
  [key in PlaceId]: PlacesInfo
}>
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////