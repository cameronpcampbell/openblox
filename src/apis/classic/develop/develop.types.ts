import type { ArrayToUnion, Identifier, ISODateTime, ObjectPrettify, ObjectRemoveKeys, UnionPrettify, ArrayNonEmptyIfConst } from "typeforge"
import type { ObjectRemoveReadOnly } from "../../../apis/apis.types"



type Universe<
  TemporalType extends ISODateTime | Date,
  UniverseId extends Identifier = Identifier, CreatorId extends Identifier = Identifier,
  CreatorType extends "User" | "Group" = "User" | "Group"
> = ObjectPrettify<{
  id: UniverseId,
  name: string,
  description: string,
  isArchived: boolean,
  rootPlaceId: Identifier,
  isActive: boolean,
  privacyType: "Private" | "Public",
  creatorType: CreatorType,
  creatorTargetId: CreatorId,
  creatorName: string,
  created: TemporalType,
  updated: TemporalType,
}>

export type RawPaginatedUniverseData<
  UniverseId extends Identifier = Identifier, CreatorId extends Identifier = Identifier, CreatorType extends "User" | "Group" = "User" | "Group"
> = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: Universe<ISODateTime, UniverseId, CreatorId, CreatorType>[]
}


// [ Game Templates ] ////////////////////////////////////////////////////////////
// GET /v1/gametemplates ---------------------------------------------------------
type GameTemplate<TemporalType extends ISODateTime | Date> = ObjectPrettify<{
  gameTemplateType: "Generic" | "Gameplay" | "Theme",
  hasTutorials: boolean,
  universe: {
    id: Identifier,
    name: string,
    description: string | null,
    isArchived: boolean,
    rootPlaceId: Identifier,
    isActive: boolean,
    privacyType: "Public",
    creatorType: "User",
    creatorTargetId: Identifier,
    creatorName: string,
    created: TemporalType,
    updated: TemporalType,
  }
}>

export type RawGameTemplatesData = {
  data: GameTemplate<ISODateTime>[]
}

export type PrettifiedGameTemplatesData = GameTemplate<Date>[]
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Groups ] ////////////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}/universes --------------------------------------------
export type RawGroupUniversesData<GroupId extends Identifier> = RawPaginatedUniverseData<Identifier, GroupId, "Group">

export type PrettifiedGroupUniversesData<GroupId extends Identifier> = Universe<Date, Identifier, GroupId, "Group">[]
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Team Create ] ///////////////////////////////////////////////////////////////
// GET /v1/places/{placeId}/teamcreate/active_session/members --------------------
type TeamCreateUser = ObjectPrettify<{
  id: Identifier,
  name: string,
  displayName: string
}>

export type RawTeamCreateActiveMembersData = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: TeamCreateUser[]
}

export type PrettifiedTeamCreateActiveMembersData = TeamCreateUser[]
// -------------------------------------------------------------------------------


// GET /v1/universes/multiget/teamcreate -----------------------------------------
export type RawTeamCreateSettingsForUniversesData<UniverseId extends Identifier> = {
  data: {
    id: UniverseId,
    isEnabled: boolean
  }[]
}

export type PrettifiedTeamCreateSettingsForUniversesData<UniverseId extends Identifier> = {
  [Key in UniverseId]: {
    isEnabled: boolean
  } | undefined
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Team Create ] ///////////////////////////////////////////////////////////////
// GET /v1/plugins ---------------------------------------------------------------
type PluginInfo<TemporalType extends ISODateTime | Date, PluginId extends Identifier | undefined = undefined> = ObjectPrettify<{
  id: PluginId
  name: string,
  description: string,
  commentsEnabled: boolean,
  versionId: Identifier,
  created: TemporalType,
  updated: TemporalType
}>

export type RawPluginsInfoData<PluginId extends Identifier> = {
  data: PluginInfo<ISODateTime, PluginId>[]
}

export type PrettifiedPluginsInfoData<PluginId extends Identifier> = {
  [Key in PluginId]: ObjectPrettify<ObjectRemoveKeys<PluginInfo<Date>, "id">> | undefined
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Universes ] /////////////////////////////////////////////////////////////////
// GET /v1/universes/{universeId} ------------------------------------------------
export type RawUniverseInfo<UniverseId extends Identifier> = Universe<ISODateTime, UniverseId>

export type PrettifiedUniverseInfo<UniverseId extends Identifier> = Universe<Date, UniverseId>
// -------------------------------------------------------------------------------


// GET /v1/universes/{universeId}/places -----------------------------------------
export type PrettifiedUniversePlacesData<UniverseId extends Identifier> = {
  id: Identifier,
  universeId: UniverseId,
  name: string,
  description: string
}[]

export type RawUniversePlacesData<UniverseId extends Identifier> = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: PrettifiedUniversePlacesData<UniverseId>
}
// -------------------------------------------------------------------------------


// GET /v1/universes/multiget ----------------------------------------------------
export type RawUniversesInfoData<UniverseId extends Identifier> = RawPaginatedUniverseData<UniverseId>

export type PrettifiedUniversesInfoData<UniverseId extends Identifier> = {
  [Key in UniverseId]: ObjectRemoveKeys<Universe<Date>, "id"> | undefined
}
// -------------------------------------------------------------------------------


// GET /v1/universes/multiget/permissions ----------------------------------------
export type RawAuthenticatedUserPermissionsForUniversesData<UniverseId extends Identifier> = {
  data: {
    universeId: UniverseId,
    canManage: boolean,
    canCloudEdit: boolean
  }[]
}

export type PrettifiedAuthenticatedUserPermissionsForUniversesData<UniverseId extends Identifier> = {
  [Kry in UniverseId]: {
    canManage: boolean,
    canCloudEdit: boolean
  } | undefined
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Universe Settings ] /////////////////////////////////////////////////////////
// GET /v1/universes/{universeId}/configuration ----------------------------------
export type UniverseAvatarType = UnionPrettify<"MorphtoR6" | "MorphToR15" | "PlayerChoice">
export type UniverseScaleType = UnionPrettify<"AllScales" | "NoScales">
export type UniverseAnimationType = UnionPrettify<"Standard" | "PlayerChoice">
export type UniverseCollisionType = UnionPrettify<"InnnerBox" | "OuterBox">
export type UniverseBodyType = UnionPrettify<"Standard" | "PlayerChoice">
export type UniverseJointPositioningType = UnionPrettify<"Standard" | "ArtistIntent">
export type UniverseGenre = UnionPrettify<"All" | "TownAndCity" | "Fantasy" | "SciFi" | "Ninja" | "Scary" | "Pirate" | "Adventure" | "Sports" | "Funny" | "WildWest" | "War" | "SkatePark" | "Tutorial">
export type UniversePlayableDevice = UnionPrettify<"Computer" | "Phone" | "Tablet" | "VR" | "Console">

export type UniverseConfigurationData_V1<
  UniverseId extends Identifier = Identifier, Name extends string = string, AvatarType extends UniverseAvatarType = UniverseAvatarType,
  ScaleType extends UniverseScaleType = UniverseScaleType, AnimationType extends UniverseAnimationType = UniverseAnimationType,
  CollisionType extends UniverseCollisionType = UniverseCollisionType, BodyType extends UniverseBodyType = UniverseBodyType,
  JointPositioningType extends UniverseJointPositioningType = UniverseJointPositioningType, IsArchived extends boolean = boolean,
  IsFriendsOnly extends boolean = boolean, Genre extends UniverseGenre = UniverseGenre,
  PlayableDevice extends UniversePlayableDevice = UniversePlayableDevice, IsMeshTextureApiAccessAllowed extends boolean = boolean,
  IsForSale extends boolean = boolean, Price extends number = number
> = {
  allowPrivateServers: boolean,
  privateServerPrice: number | null,
  isMeshTextureApiAccessAllowed: IsMeshTextureApiAccessAllowed,
  id: UniverseId,
  name: Name,
  universeAvatarType: AvatarType,
  universeScaleType: ScaleType,
  universeAnimationType: AnimationType,
  universeCollisionType: CollisionType,
  universeBodyType: BodyType,
  universeJointPositioningType: JointPositioningType,
  isArchived: IsArchived,
  isFriendsOnly: IsFriendsOnly,
  genre: Genre,
  playableDevices: PlayableDevice[],
  isForSale: IsForSale,
  price: Price | null,
  isStudioAccessToApisAllowed: boolean,
  privacyType: "Public" | "Private",
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Users ] /////////////////////////////////////////////////////////////////////
// GET /v1/user/groups/canmanage -------------------------------------------------
type GroupCanManage = ObjectPrettify<{
  id: Identifier,
  name: string
}>

export type RawAuthenticatedUserGroupsCanManage = {
  data: GroupCanManage[]
}

export type PrettifiedAuthenticatedUserGroupsCanManage = GroupCanManage[]
// -------------------------------------------------------------------------------


// GET /v1/user/universes --------------------------------------------------------
export type RawAuthenticatedUserUniversesData = RawPaginatedUniverseData<Identifier, Identifier, "User">

export type PrettifiedAuthenticatedUserUniversesData = Universe<Date, Identifier, Identifier, "User">[]
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Places V2 ] /////////////////////////////////////////////////////////////////
export type PlaceSocialSlotType = UnionPrettify<"Automatic" | "Empty" | "Custom">
export type PlaceGearType = UnionPrettify<"Invalid" | "Melee" | "Ranged" | "Explosive" | "PowerUps" | "Navigation" | "Musical" | "Social" | "Building" | "PersonalTransport">

// GET /v2/places/{placeId} ------------------------------------------------------
export type PlaceConfigurationData<PlaceId extends Identifier> = {
  maxPlayerCount: number,
  socialSlotType: PlaceSocialSlotType,
  customSocialSlotsCount: number,
  allowCopying: boolean,
  currentSavedVersion: number,
  isAllGenresAllowed: boolean,
  allowedGearTypes: PlaceGearType[],
  maxPlayersAllowed: number,
  id: PlaceId,
  universeId: Identifier,
  name: string,
  description: string,
  isRootPlace: boolean,
}
// -------------------------------------------------------------------------------


// PATCH /v2/places/{placeId} ----------------------------------------------------
export type UpdatePlaceConfigurationData_V2<
  PlaceId extends Identifier, Name extends string, Description extends string, MaxPlayerCount extends number,
  SocialSlotType extends PlaceSocialSlotType, CustomSocialSlotsCount extends number, AllowCopying extends boolean,
  AllowedGearTypes extends PlaceGearType, IsAllGenresAllowed extends boolean
> = {
  maxPlayerCount: MaxPlayerCount,
  socialSlotType: SocialSlotType,
  customSocialSlotsCount: CustomSocialSlotsCount,
  allowCopying: AllowCopying,
  currentSavedVersion: number,
  isAllGenresAllowed: IsAllGenresAllowed,
  allowedGearTypes: AllowedGearTypes[],
  maxPlayersAllowed: number,
  id: PlaceId,
  universeId: Identifier,
  name: Name,
  description: Description,
  isRootPlace: boolean,
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


// [ Universe Settings ] /////////////////////////////////////////////////////////
// PATCH /v2/universes/{universeId}/configuration --------------------------------

export type RawAvatarAssetOverride = ObjectPrettify<{
  assetID: Identifier,
  assetTypeID: Identifier,
  isPlayerChoice: boolean
}>

export type PrettifiedAvatarAssetOverride = ObjectPrettify<{
  assetId: Identifier,
  assetTypeId: Identifier,
  isPlayerChoice: boolean
}>

export type AvatarScales = ObjectPrettify<{
  height: number,
  width: number,
  head: number,
  depth: number,
  proportion: number,
  bodyType: number
}>

export type UniverseRegion = UnionPrettify<"Unknown" | "China">

type PrettifiedAvatarAssetOverridesToRaw<
  Overrides extends ArrayNonEmptyIfConst<PrettifiedAvatarAssetOverride>
> = ArrayToUnion<{
  [Key in keyof Overrides]: {
    assetID: Overrides[Key]["assetId"],
    assetTypeID: Overrides[Key]["assetTypeId"],
    isPlayerChoice: Overrides[Key]["isPlayerChoice"]
  }
}>[]

type UpdateUniverseConfigurationData_V2<
  UniverseId extends Identifier, AllowPrivateServers extends boolean, PrivateServerPrice extends number, Name extends string,
  Description extends string, AvatarType extends UniverseAvatarType, AnimationType extends UniverseAnimationType,
  CollisionType extends UniverseCollisionType, JointPositioningType extends UniverseJointPositioningType,
  IsArchived extends boolean, IsFriendsOnly extends boolean, Genre extends UniverseGenre,
  PlayableDevice extends UniversePlayableDevice, AvatarMinScales extends AvatarScales, AvatarMaxScales extends AvatarScales,
  StudioAccessToApisAllowed extends boolean, OptInRegion extends UniverseRegion, OptOutRegion extends UniverseRegion,
  IsMeshTextureApiAccessAllowed extends boolean, Price extends number, IsForSale extends boolean,

  AvatarAssetOverrides extends any, Permissions extends any,
> = ObjectPrettify<{
  allowPrivateServers: AllowPrivateServers,
  privateServerPrice: PrivateServerPrice,
  optInRegions: {
    region: number,
    status: string
  }[],
  isMeshTextureApiAccessAllowed: IsMeshTextureApiAccessAllowed,
  id: UniverseId,
  name: Name,
  description: Description,
  universeAvatarType: AvatarType,
  universeAnimationType:AnimationType,
  universeCollisionType: CollisionType,
  universeJointPositioningType: JointPositioningType,
  isArchived: IsArchived,
  isFriendsOnly: IsFriendsOnly,
  genre: Genre,
  playableDevices: PlayableDevice[],
  isForSale: IsForSale,
  price: Price,
  universeAvatarAssetOverrides: AvatarAssetOverrides,
  universeAvatarMinScales: ObjectRemoveReadOnly<AvatarMinScales>,
  universeAvatarMaxScales: ObjectRemoveReadOnly<AvatarMaxScales>,
  studioAccessToApisAllowed: StudioAccessToApisAllowed,
  permissions: Permissions,
}>

export type RawUpdateUniverseConfigurationData_V2<
  UniverseId extends Identifier, AllowPrivateServers extends boolean, PrivateServerPrice extends number, Name extends string,
  Description extends string, AvatarType extends UniverseAvatarType, AnimationType extends UniverseAnimationType,
  CollisionType extends UniverseCollisionType, JointPositioningType extends UniverseJointPositioningType,
  IsArchived extends boolean, IsFriendsOnly extends boolean, Genre extends UniverseGenre,
  PlayableDevice extends UniversePlayableDevice,
  AvatarMinScales extends AvatarScales, AvatarMaxScales extends AvatarScales, StudioAccessToApisAllowed extends boolean,
  IsThirdPartyTeleportAllowed extends boolean, IsThirdPartyAssetAllowed extends boolean,
  IsThirdPartyPurchaseAllowed extends boolean, OptInRegion extends UniverseRegion, OptOutRegion extends UniverseRegion,
  IsMeshTextureApiAccessAllowed extends boolean, Price extends number, IsForSale extends boolean = false,
  AvatarAssetOverrides extends ArrayNonEmptyIfConst<PrettifiedAvatarAssetOverride> = []

> = UpdateUniverseConfigurationData_V2<
  UniverseId, AllowPrivateServers, PrivateServerPrice, Name, Description, AvatarType, AnimationType,
  CollisionType, JointPositioningType, IsArchived, IsFriendsOnly, Genre, PlayableDevice,
  AvatarMinScales, AvatarMaxScales, StudioAccessToApisAllowed, OptInRegion, OptOutRegion, IsMeshTextureApiAccessAllowed, Price, IsForSale,

  PrettifiedAvatarAssetOverridesToRaw<AvatarAssetOverrides>,
  {
    IsThirdPartyTeleportAllowed: IsThirdPartyTeleportAllowed,
    IsThirdPartyAssetAllowed: IsThirdPartyAssetAllowed,
    IsThirdPartyPurchaseAllowed: IsThirdPartyPurchaseAllowed,
  }
>

export type PrettifiedUpdateUniverseConfigurationData_V2<
  UniverseId extends Identifier, AllowPrivateServers extends boolean, PrivateServerPrice extends number, Name extends string,
  Description extends string, AvatarType extends UniverseAvatarType, AnimationType extends UniverseAnimationType,
  CollisionType extends UniverseCollisionType, JointPositioningType extends UniverseJointPositioningType,
  IsArchived extends boolean, IsFriendsOnly extends boolean, Genre extends UniverseGenre,
  PlayableDevice extends UniversePlayableDevice,
  AvatarMinScales extends AvatarScales, AvatarMaxScales extends AvatarScales, StudioAccessToApisAllowed extends boolean,
  IsThirdPartyTeleportAllowed extends boolean, IsThirdPartyAssetAllowed extends boolean,
  IsThirdPartyPurchaseAllowed extends boolean, OptInRegion extends UniverseRegion, OptOutRegion extends UniverseRegion,
  IsMeshTextureApiAccessAllowed extends boolean, Price extends number, IsForSale extends boolean = false,

  AvatarAssetOverrides extends ArrayNonEmptyIfConst<PrettifiedAvatarAssetOverride> = []
> = UpdateUniverseConfigurationData_V2<
  UniverseId, AllowPrivateServers, PrivateServerPrice, Name, Description, AvatarType, AnimationType,
  CollisionType, JointPositioningType, IsArchived, IsFriendsOnly, Genre, PlayableDevice,
  AvatarMinScales, AvatarMaxScales, StudioAccessToApisAllowed, OptInRegion, OptOutRegion, IsMeshTextureApiAccessAllowed, Price, IsForSale,

  ObjectRemoveReadOnly<ArrayToUnion<AvatarAssetOverrides>>[],
  {
    isThirdPartyTeleportAllowed: IsThirdPartyTeleportAllowed,
    isThirdPartyAssetAllowed: IsThirdPartyAssetAllowed,
    isThirdPartyPurchaseAllowed: IsThirdPartyPurchaseAllowed,
  }
>
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////

