import type { Identifier, ISODateTime, ObjectEither, ObjectPrettify, UnionPrettify, UrlSecure } from "typeforge"


type Universe_SocialLink = ObjectPrettify<{
  title: string,
  uri: UrlSecure
}>

export type UniverseAgeRating = UnionPrettify<"AGE_RATING_UNSPECIFIED" | "AGE_RATING_ALL" | "AGE_RATING_9_PLUS" | "AGE_RATING_13_PLUS" | "AGE_RATING_17_PLUS">

export type UniverseVisibility = UnionPrettify<"PRIVATE" | "PUBLIC" | "VISIBILITY_UNSPECIFIED">

export type Universe<
  DisplayName extends string = string, Description extends string = string,
  Visibility extends UniverseVisibility = UniverseVisibility, VoiceChatEnabled extends boolean = boolean,
  AgeRating extends UniverseAgeRating = UniverseAgeRating, DesktopEnabled extends boolean = boolean,
  MobileEnabled extends boolean = boolean, TabletEnabled extends boolean = boolean, ConsoleEnabled extends boolean = boolean,
  VREnabled extends boolean = boolean
> = {
  displayName: DisplayName,
  description: Description,
  visibility: Visibility,
  facebookSocialLink?: Universe_SocialLink,
  twitterSocialLink?: Universe_SocialLink,
  youtubeSocialLink?: Universe_SocialLink,
  twitchSocialLink?: Universe_SocialLink,
  discordSocialLink?: Universe_SocialLink,
  robloxGroupSocialLink?: Universe_SocialLink,
  guildedSocialLink?: Universe_SocialLink,
  voiceChatEnabled: VoiceChatEnabled,
  ageRating: AgeRating,
  privateServerPriceRobux?: number,
  desktopEnabled: DesktopEnabled,
  mobileEnabled: MobileEnabled,
  tabletEnabled: TabletEnabled,
  consoleEnabled: ConsoleEnabled,
  vrEnabled: VREnabled
}

// GET /cloud/v2/universes/{universeId} ------------------------------------------------------------------------------
type UniverseInfoData<UniverseId extends Identifier, TimeType> = {
  path: `universes/${UniverseId}`,
  createTime: TimeType,
  updateTime: TimeType,
} & ObjectEither<{ user: `users/${Identifier}` }, { group: `groups/${Identifier}` }> & Universe

export type RawUniverseInfoData<UniverseId extends Identifier> = UniverseInfoData<UniverseId, ISODateTime>

export type PrettifiedUniverseInfoData<UniverseId extends Identifier> = UniverseInfoData<UniverseId, Date>
// -------------------------------------------------------------------------------------------------------------------


// PATCH /cloud/v2/universes/{universeId} ----------------------------------------------------------------------------
type UpdateUniverseData<
  UniverseId extends Identifier,TemporalType,
  DisplayName extends string, Description extends string, Visibility extends UniverseVisibility,
  VoiceChatEnabled extends boolean, AgeRating extends UniverseAgeRating, DesktopEnabled extends boolean,
  MobileEnabled extends boolean, TabletEnabled extends boolean, ConsoleEnabled extends boolean,
  VREnabled extends boolean
> = {
  path: `universes/${UniverseId}`,
  createTime: TemporalType,
  updateTime: TemporalType,
  displayName: DisplayName,
  description: Description,
  user: `users/${Identifier}`,
  visibility: Visibility,
  voiceChatEnabled: VoiceChatEnabled,
  ageRating: AgeRating,
  desktopEnabled: DesktopEnabled,
  mobileEnabled: MobileEnabled,
  tabletEnabled: TabletEnabled,
  consoleEnabled: ConsoleEnabled,
  vrEnabled: VREnabled
}

export type RawUpdateUniverseData<
  UniverseId extends Identifier, DisplayName extends string, Description extends string, Visibility extends UniverseVisibility,
  VoiceChatEnabled extends boolean, AgeRating extends UniverseAgeRating, DesktopEnabled extends boolean,
  MobileEnabled extends boolean, TabletEnabled extends boolean, ConsoleEnabled extends boolean,
  VREnabled extends boolean
> = (
  UpdateUniverseData<
    UniverseId, ISODateTime, DisplayName, Description, Visibility, VoiceChatEnabled,
    AgeRating, DesktopEnabled, MobileEnabled, TabletEnabled, ConsoleEnabled, VREnabled
  >
)

export type PrettifiedUpdateUniverseData<
  UniverseId extends Identifier, DisplayName extends string, Description extends string, Visibility extends UniverseVisibility,
  VoiceChatEnabled extends boolean, AgeRating extends UniverseAgeRating, DesktopEnabled extends boolean,
  MobileEnabled extends boolean, TabletEnabled extends boolean, ConsoleEnabled extends boolean,
  VREnabled extends boolean
> = (
  UpdateUniverseData<
    UniverseId, Date, DisplayName, Description, Visibility, VoiceChatEnabled,
    AgeRating, DesktopEnabled, MobileEnabled, TabletEnabled, ConsoleEnabled, VREnabled
  >
)
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
type UpdatePlaceData<
  UniverseId extends Identifier, PlaceId extends Identifier, TemporalType, DisplayName extends string,
  Description extends string, ServerSize extends number
> = ObjectPrettify<
  {
    path: `universes/${UniverseId}/places/${PlaceId}`,
    createTime: TemporalType,
    updateTime: TemporalType,
    displayName: DisplayName,
    description: Description,
    serverSize: ServerSize
  }
>

export type RawUpdatePlaceData<
  UniverseId extends Identifier, PlaceId extends Identifier, DisplayName extends string,
  Description extends string, ServerSize extends number
> =
  UpdatePlaceData<UniverseId, PlaceId, ISODateTime, DisplayName, Description, ServerSize>

export type PrettifiedUpdatePlaceData<
  UniverseId extends Identifier, PlaceId extends Identifier, DisplayName extends string,
  Description extends string, ServerSize extends number
> =
  UpdatePlaceData<UniverseId, PlaceId, ISODateTime, DisplayName, Description, ServerSize>
// -------------------------------------------------------------------------------------------------------------------