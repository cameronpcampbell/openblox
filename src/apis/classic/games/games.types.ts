import type { ISODateTime, Identifier, ObjectEither, ObjectPrettify, UnionPrettify } from "typeforge"


// [ Games ] /////////////////////////////////////////////////////////////////////
type GameGearGenre = UnionPrettify<"All" | "TownAndCity" | "Fantasy" | "SciFi" | "Ninja" | "Scary" | "Pirate" | "Adventure" | "Sports" | "Funny" | "WildWest" | "War" | "SkatePark" | "Tutorial">

type GameGearCategories = UnionPrettify<"Building" | "Explosive" | "Melee" | "Musical" | "Navigation" | "PowerUp" | "Ranged" | "Social" | "Transportation">


// /v1/games ---------------------------------------------------------------------------------------------------------
type GameInfoData<TemporalType extends ISODateTime | Date> = {
  rootPlaceId: Identifier,
  name: string,
  description: string | null,
  sourceName: string,
  creator: {
    id: number,
    name: string,
    type: "User" | "Group",
    isRNVAccount: boolean,
    hasVerifiedBadge: boolean
  },
  price: number | null,
  allowedGearGenres: GameGearGenre[],
  allowedGearCategories: GameGearCategories[],
  isGenreEnforced: boolean,
  copyingAllowed: boolean,
  playing: number,
  visits: number,
  maxPlayers: number,
  created: TemporalType,
  updated: TemporalType,
  studioAccessToApisAllowed: boolean,
  createVipServersAllowed: boolean,
  universeAvatarType: "MorphToR15" | "MorphToR6" | "PlayerChoice",
  genre: GameGearGenre,
  isAllGenre: boolean,
  isFavouritedByUser: boolean,
  favouriteCount: number
}

export type RawGamesInfoData<UniverseId extends Identifier> = ObjectPrettify<{
  data: ObjectPrettify<{ id: UniverseId } & GameInfoData<ISODateTime>>[]
}>


export type FormattedGamesInfoData<UniverseId extends Identifier> = {
  [Key in UniverseId]?: ObjectPrettify<GameInfoData<Date>>
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/games-product-info ----------------------------------------------------------------------------------
type GameProductInfo = {
  isForSale: boolean,
  productId: Identifier,
  price: number | null,
  sellerId: Identifier
}

export type RawGamesProductInfo<UniverseId extends Identifier> = {
  data: ObjectPrettify<{ universeId: UniverseId } & GameProductInfo>[]
}

export type FormattedGamesProductInfo<UniverseId extends Identifier> = {
  [Key in UniverseId]?: ObjectPrettify<GameProductInfo>
}
// -------------------------------------------------------------------------------------------------------------------

// GET /v1/games/list-spotlight --------------------------------------------------------------------------------------
type AuthedUserSpotlightedGameData_GameInfo = {
  creatorId: Identifier,
  creatorName: string,
  creatorType: "User" | "Group",
  creatorHasVerifiedBadge: boolean,
  totalUpVotes: number,
  totalDownVotes: number,
  universeId: Identifier,
  name: string,
  placeId: Identifier,
  playerCount: number,
  imageToken: string,
  isSponsored: boolean,
  nativeAdData: string,
  isShowSponsoredLabel: boolean,
  price: number | null,
  analyticsIdentifier: string | null,
  gameDescription: string,
  genre: string,
  minimumAge: number,
  ageRecommendationDisplayName: string
}

export type FormattedAuthedUserSpotlightedGamesData = ObjectEither<
  {
    spotlightType: "FriendsPlaying",
    spotlightActionText: string,
    spotlightTypeData: {
        users: Identifier[],
        friendsAffinityScores: null | number
    },
    gameInfo: AuthedUserSpotlightedGameData_GameInfo
  },
  {
    spotlightType: "RecommendedForYou",
    spotlightActionText: string,
    spotlightTypeData: null,
    gameInfo: AuthedUserSpotlightedGameData_GameInfo
  }
>[]

export type RawAuthedUserSpotlightedGamesData = {
  data: FormattedAuthedUserSpotlightedGamesData
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/multiget-place-details ------------------------------------------------------------------------------
type PlacesInfoData = {
  name: string,
  description: string,
  sourceName: string,
  sourceDescription: string,
  url: string,
  builder: string,
  builderId: Identifier,
  hasVerifiedBadge: boolean,
  isPlayable: boolean,
  reasonProhibited: string,
  universeId: Identifier,
  universeRootPlaceId: Identifier,
  price: number,
  imageToken: string
}

export type RawPlacesInfoData<PlaceId extends Identifier> = ObjectPrettify<{ placeId: PlaceId } & PlacesInfoData>[]

export type FormattedPlacesInfoData<PlaceId extends Identifier> = {
  [Key in PlaceId]?: ObjectPrettify<PlacesInfoData>
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/multiget-playability-status -------------------------------------------------------------------------
type AuthedUserGamePlayabilityStatusData = {
  playabilityStatus: "Playable",
  isPlayable: boolean
}

export type RawAuthedUserGamesPlayabilityStatusesData<UniverseId extends Identifier> = ObjectPrettify<
  { universeId: UniverseId } & AuthedUserGamePlayabilityStatusData
>[]

export type FormattedUserGamesPlayabilityStatusesData<UniverseId extends Identifier> = {
  [Key in UniverseId]?: AuthedUserGamePlayabilityStatusData
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/recommendations/game/{universeId} -------------------------------------------------------------------
type RecommendationsForUniverseData = ObjectPrettify<{
  creatorId: Identifier,
  creatorName: string,
  creatorType: "User" | "Group",
  creatorHasVerifiedBadge: boolean,
  totalUpVotes: number,
  totalDownVotes: number,
  universeId: Identifier,
  name: string,
  placeId: Identifier,
  playerCount: number,
  imageToken: string,
  isSponsored: boolean,
  nativeAdData: string,
  isShowSponsoredLabel: boolean,
  price: number | null,
  analyticsIdentifier: string | null,
  gameDescription: string,
  genre: string,
  minimumAge: number,
  ageRecommendationDisplayName: string,
}>

export type RawRecommendationsForUniversesData = {
  games: RecommendationsForUniverseData[],
  nextPaginationKey: string
}

export type FormattedRecommendationsForUniversesData = RecommendationsForUniverseData[]
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Game Instances ] ////////////////////////////////////////////////////////////
// GET /v1/games/recommendations/game/{universeId} -------------------------------------------------------------------
export type FormattedAuthedUserPrivateServersForPlace = ObjectPrettify<{
  maxPlayers: number,
  playerTokens: string[],
  players: Identifier[],
  name: string,
  vipServerId: Identifier,
  owner: {
    hasVerifiedBadge: boolean,
    id: Identifier,
    name: string,
    displayName: string
  }
}>[]

export type RawAuthedUserPrivateServersForPlace = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: FormattedAuthedUserPrivateServersForPlace
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/games/{placeId}/servers/{serverType} ----------------------------------------------------------------------
export type FormattedPlaceServerListData = {
  id: string,
  maxPlayers: number,
  playing: number,
  playerTokens: string[],
  players: Identifier[],
  fps: number,
  ping: number
}[]

export type RawPlaceServerListData = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: FormattedPlaceServerListData
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Game Passes ] ///////////////////////////////////////////////////////////////
// GET /v1/games/{universeId}/game-passes ----------------------------------------------------------------------------
export type FormattedUniverseGamePassesData = ObjectPrettify<{
  id: Identifier,
  name: string,
  displayName: string,
  productId: Identifier,
  price: number,
  sellerName: string,
  sellerId: Identifier | null,
  isOwned: boolean
}>[]

export type RawUniverseGamePassesData = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: FormattedUniverseGamePassesData
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Votes ] /////////////////////////////////////////////////////////////////////
// GET /v1/games/votes -----------------------------------------------------------------------------------------------
export type RawUniversesVoteStatusData<UniverseId extends Identifier> = {
  data: {
    id: UniverseId,
    upVotes: number,
    downVotes: number
  }[]
}

export type FormattedniversesVoteStatusData<UniverseId extends Identifier> = {
  [Key in UniverseId]?: {
    upVotes: number,
    downVotes: number
  }
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Vip Servers ] ///////////////////////////////////////////////////////////////
// GET GET /v1/vip-servers/{vipServerId} -----------------------------------------------------------------------------
export type VipServerInfoData<
  VipServerId extends Identifier, Name extends string = string, Active extends boolean = boolean
> = {
  id: VipServerId,
  name: Name,
  game: {
    id: Identifier,
    name: string,
    rootPlace: {
      id: Identifier,
      name: string
    }
  },
  joinCode: string,
  active: Active,
  subscription: {
    active: boolean,
    expired: boolean,
    expirationDate: ISODateTime,
    price: number | null,
    canRenew: boolean,
    hasInsufficientFunds: boolean,
    hasRecurringProfile: boolean,
    hasPriceChanged: boolean,
  },
  permissions: {
    clanAllowed: boolean,
    enemyClanId: Identifier | null,
    friendsAllowed: boolean,
    users: Identifier[]
  },
  voiceSettings: {
    enabled: boolean
  },
  link: `https://www.roblox.com/share${string}`
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Games V2 ] //////////////////////////////////////////////////////////////////
// GET /v2/games/{universeId}/media ----------------------------------------------------------------------------------
type UniverseMediaData = UnionPrettify<(
  {
    assetTypeId: 1,
    assetType: "Image",
    imageId: Identifier,
    videoHash: null,
    videoTitle: null,
    approved: boolean,
    altText: string | null
  } | {
    assetTypeId: 62,
    assetType: "Video",
    imageId: null,
    videoHash: string,
    videoTitle: string,
    approved: boolean,
    altText: string | null
  }
)>

export type FormattedUniverseMediaData = UniverseMediaData[]

export type RawUniverseMediaData = {
  data: UniverseMediaData[]
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v2/groups/{groupId}/games ------------------------------------------------------------------------------------
export type FormattedGroupGamesData<GroupId extends Identifier> = ObjectPrettify<{
  id: Identifier,
  name: string,
  description: string | null,
  creator: {
    id: GroupId,
    type: "Group"
  },
  rootPlace: {
    id: Identifier,
    type: "Place"
  },
  created: ISODateTime,
  updated: ISODateTime,
  placeVisits: number
}>

export type RawGroupGamesData<GroupId extends Identifier> = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: FormattedGroupGamesData<GroupId>
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////











// GET /v2/users/{userId}/games --------------------------------------------------------------------------------------
type UserGamesData<TimeType> = ObjectPrettify<{
  id: Identifier,
  name: string,
  description: string | null,
  creator: {
    id: number,
    type: "User"
  },
  rootPlace: {
    id: number,
    type: "Place"
  },
  created: TimeType,
  updated: TimeType,
  placeVisits: number
}>[]

export type RawUserGamesData = ObjectPrettify<{
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: UserGamesData<ISODateTime>
}>

export type PrettifiedUserGamesData = UserGamesData<Date>
// -------------------------------------------------------------------------------------------------------------------