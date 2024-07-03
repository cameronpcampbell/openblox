// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, ISODateTime, ObjectPrettify, UnionPrettify, UrlSecure } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////


type Universe_SocialLink = ObjectPrettify<{
  title: string,
  uri: UrlSecure
}>

type Universe_AgeRating = UnionPrettify<"AGE_RATING_UNSPECIFIED" | "AGE_RATING_ALL" | "AGE_RATING_9_PLUS" | "AGE_RATING_13_PLUS" | "AGE_RATING_17_PLUS">

type Universe = {
  displayName: string,
  description: string,
  visibility: "PRIVATE" | "PUBLIC" | "VISIBILITY_UNSPECIFIED",
  facebookSocialLink?: Universe_SocialLink,
  twitterSocialLink?: Universe_SocialLink,
  youtubeSocialLink?: Universe_SocialLink,
  twitchSocialLink?: Universe_SocialLink,
  discordSocialLink?: Universe_SocialLink,
  robloxGroupSocialLink?: Universe_SocialLink,
  guildedSocialLink?: Universe_SocialLink,
  voiceChatEnabled: boolean,
  ageRating: Universe_AgeRating,
  privateServerPriceRobux?: number,
  desktopEnabled: boolean,
  mobileEnabled: boolean,
  tabletEnabled: boolean,
  consoleEnabled: boolean,
  vrEnabled: boolean
}

// GET /cloud/v2/universes/{universeId} ------------------------------------------------------------------------------
type UniverseInfoData<UniverseId extends Identifier, TimeType> = {
  path: `universes/${UniverseId}`,
  createTime: TimeType,
  updateTime: TimeType,
  user: `users/${Identifier}`,
} & Universe

export type RawUniverseInfoData<UniverseId extends Identifier> = UniverseInfoData<UniverseId, ISODateTime>

export type PrettifiedUniverseInfoData<UniverseId extends Identifier> = UniverseInfoData<UniverseId, Date>
// -------------------------------------------------------------------------------------------------------------------


// PATCH /cloud/v2/universes/{universeId} ----------------------------------------------------------------------------
export type UpdateUniverse_NewData = ObjectPrettify<Partial<Universe>>

type UpdateUniverseData<UniverseId extends Identifier, NewData extends UpdateUniverse_NewData, TemporalType> = ObjectPrettify<Omit<{
  path: `universes/${UniverseId}`,
  createTime: TemporalType,
  updateTime: TemporalType,
  description: string,
  user: `users/${Identifier}`,
  voiceChatEnabled: boolean,
  ageRating: Universe_AgeRating,
  desktopEnabled: boolean,
  mobileEnabled: boolean,
  tabletEnabled: boolean,
  consoleEnabled: boolean,
  vrEnabled: boolean
}, keyof NewData> & { -readonly[Key in keyof NewData]: NewData[Key] }>

export type RawUpdateUniverseData<UniverseId extends Identifier, NewData extends UpdateUniverse_NewData> =
  UpdateUniverseData<UniverseId, NewData, ISODateTime>

export type PrettifiedUpdateUniverseData<UniverseId extends Identifier, NewData extends UpdateUniverse_NewData> =
  UpdateUniverseData<UniverseId, NewData, Date>
// -------------------------------------------------------------------------------------------------------------------


type Place = ObjectPrettify<{
  displayName: string,
  description: string,
  serverSize: number
}>

// GET /cloud/v2/universes/${universeId}/places/${PlaceId} -----------------------------------------------------------
type PlaceInfoData<UniverseId extends Identifier, PlaceId extends Identifier, TemporalType> = ObjectPrettify<{
  path: `universes/${UniverseId}/places/${PlaceId}`,
  createTime: TemporalType,
  updateTime: TemporalType,
} & Place>

export type RawPlaceInfoData<UniverseId extends Identifier, PlaceId extends Identifier> = PlaceInfoData<UniverseId, PlaceId, ISODateTime>

export type PrettifiedPlaceInfoData<UniverseId extends Identifier, PlaceId extends Identifier> = PlaceInfoData<UniverseId, PlaceId, Date>
// -------------------------------------------------------------------------------------------------------------------


// PATCH /cloud//v2/universes/${universeId}/places/${PlaceId} --------------------------------------------------------
export type UpdatePlace_NewData = ObjectPrettify<Partial<Place>>

type UpdatePlaceData<
  UniverseId extends Identifier, PlaceId extends Identifier, NewData extends UpdatePlace_NewData, TemporalType
> = ObjectPrettify<
  Omit<{
    path: `universes/${UniverseId}/places/${PlaceId}`,
    createTime: TemporalType,
    updateTime: TemporalType,
  } & Place, keyof NewData>
  & { -readonly[Key in keyof NewData]: NewData[Key] }
>

export type RawUpdatePlaceData<UniverseId extends Identifier, PlaceId extends Identifier, NewData extends UpdatePlace_NewData> =
  UpdatePlaceData<UniverseId, PlaceId, NewData, ISODateTime>

export type PrettifiedUpdatePlaceData<UniverseId extends Identifier, PlaceId extends Identifier, NewData extends UpdatePlace_NewData> =
  UpdatePlaceData<UniverseId, PlaceId, NewData, Date>
// -------------------------------------------------------------------------------------------------------------------