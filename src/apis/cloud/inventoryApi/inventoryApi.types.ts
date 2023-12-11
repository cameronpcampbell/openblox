import { Either, PrettifyArray, PrettifyKeyof, PrettifyUnion } from "../../../utils/utils.types"

type InventoryItemType_Asset = "INVENTORY_ITEM_ASSET_TYPE_UNSPECIFIED" | "CLASSIC_TSHIRT" | "AUDIO" | "HAT" | "MODEL" | "CLASSIC_SHIRT" | "CLASSIC_PANTS" | "DECAL" | "CLASSIC_HEAD" | "FACE" | "GEAR" | "ANIMATION" | "TORSO" | "RIGHT_ARM" | "LEFT_ARM" | "LEFT_LEG" | "RIGHT_LEG" | "PACKAGE" | "PLUGIN" | "MESH_PART" | "HAIR_ACCESSORY" | "FACE_ACCESSORY" | "NECK_ACCESSORY" | "SHOULDER_ACCESSORY" | "FRONT_ACCESSORY" | "BACK_ACCESSORY" | "WAIST_ACCESSORY" | "CLIMB_ANIMATION" | "DEATH_ANIMATION" | "FALL_ANIMATION" | "IDLE_ANIMATION" | "JUMP_ANIMATION" | "RUN_ANIMATION" | "SWIM_ANIMATION" | "WALK_ANIMATION" | "POSE_ANIMATION" | "EMOTE_ANIMATION" | "VIDEO" | "TSHIRT_ACCESSORY" | "SHIRT_ACCESSORY" | "PANTS_ACCESSORY" | "JACKET_ACCESSORY" | "SWEATER_ACCESSORY" | "SHORTS_ACCESSORY" | "LEFT_SHOE_ACCESSORY" | "RIGHT_SHOE_ACCESSORY" | "DRESS_SKIRT_ACCESSORY" | "EYEBROW_ACCESSORY" | "EYELASH_ACCESSORY" | "MOOD_ANIMATION" | "DYNAMIC_HEAD" | "CREATED_PLACE" | "PURCHASED_PLACE"
type InventoryItem_Asset = PrettifyKeyof<{
  path: string,
  assetDetails?: {
    assetId: string,
    inventoryItemAssetType: PrettifyUnion<InventoryItemType_Asset>,
    instanceId: string,
    collectibleDetails?: {
      itemId: string,
      instanceId: string,
      serialNumber: number
    },
    serialNumber?: number
  }
}>
type InventoryItemType_Badge = PrettifyKeyof<{
  path: string,
  badgeDetails?: {
    badgeId: string,
  }
}>
type InventoryItemType_GamePass = PrettifyKeyof<{
  path: string,
  gamePassDetails?: {
    gamePassId: string,
  }
}>
type InventoryItemType_PrivateServer = PrettifyKeyof<{
  path: string,
  privateServerDetails?: {
    privateServerId: string,
  }
}>

export type InventoryItemsForUserFilter_TypeFields = {
  onlyCollectibles?: boolean,
  inventoryItemAssetTypes?: PrettifyUnion<InventoryItemType_Asset[] | "*">,
  badges?: true,
  gamePasses?: true,
  privateServers?: true
}
export type InventoryItemsForUserFilter_IdFields = {
  assetIds?: string[],
  badgeIds?: string[],
  gamePassIds?: string[],
  privateServerIds?: string[]
}
export type InventoryItemsForUserFilter = Either<InventoryItemsForUserFilter_TypeFields, InventoryItemsForUserFilter_IdFields>

export type RawInventoryItemsForUserData = PrettifyKeyof<{
  inventoryItems: PrettifyKeyof<InventoryItem_Asset & InventoryItemType_Badge & InventoryItemType_GamePass & InventoryItemType_PrivateServer>[],
  nextPageToken?: string
}>

export type FormattedInventoryItemsForUserData = PrettifyKeyof<RawInventoryItemsForUserData["inventoryItems"]>