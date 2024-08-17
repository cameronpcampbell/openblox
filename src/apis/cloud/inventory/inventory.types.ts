import type { ObjectPrettify, UnionPrettify, ObjectEither } from "typeforge"


// GET /v2/users/{userId}/inventory-items ----------------------------------------
type InventoryItemType_Asset = "INVENTORY_ITEM_ASSET_TYPE_UNSPECIFIED" | "CLASSIC_TSHIRT" | "AUDIO" | "HAT" | "MODEL" | "CLASSIC_SHIRT" | "CLASSIC_PANTS" | "DECAL" | "CLASSIC_HEAD" | "FACE" | "GEAR" | "ANIMATION" | "TORSO" | "RIGHT_ARM" | "LEFT_ARM" | "LEFT_LEG" | "RIGHT_LEG" | "PACKAGE" | "PLUGIN" | "MESH_PART" | "HAIR_ACCESSORY" | "FACE_ACCESSORY" | "NECK_ACCESSORY" | "SHOULDER_ACCESSORY" | "FRONT_ACCESSORY" | "BACK_ACCESSORY" | "WAIST_ACCESSORY" | "CLIMB_ANIMATION" | "DEATH_ANIMATION" | "FALL_ANIMATION" | "IDLE_ANIMATION" | "JUMP_ANIMATION" | "RUN_ANIMATION" | "SWIM_ANIMATION" | "WALK_ANIMATION" | "POSE_ANIMATION" | "EMOTE_ANIMATION" | "VIDEO" | "TSHIRT_ACCESSORY" | "SHIRT_ACCESSORY" | "PANTS_ACCESSORY" | "JACKET_ACCESSORY" | "SWEATER_ACCESSORY" | "SHORTS_ACCESSORY" | "LEFT_SHOE_ACCESSORY" | "RIGHT_SHOE_ACCESSORY" | "DRESS_SKIRT_ACCESSORY" | "EYEBROW_ACCESSORY" | "EYELASH_ACCESSORY" | "MOOD_ANIMATION" | "DYNAMIC_HEAD" | "CREATED_PLACE" | "PURCHASED_PLACE"

type InventoryItem_Asset = ObjectPrettify<{
  path: string,
  assetDetails?: {
    assetId: string,
    inventoryItemAssetType: UnionPrettify<InventoryItemType_Asset>,
    instanceId: string,
    collectibleDetails?: {
      itemId: string,
      instanceId: string,
      serialNumber: number
    },
    serialNumber?: number
  }
}>
type InventoryItemType_Badge = ObjectPrettify<{
  path: string,
  badgeDetails?: {
    badgeId: string,
  }
}>
type InventoryItemType_GamePass = ObjectPrettify<{
  path: string,
  gamePassDetails?: {
    gamePassId: string,
  }
}>
type InventoryItemType_PrivateServer = ObjectPrettify<{
  path: string,
  privateServerDetails?: {
    privateServerId: string,
  }
}>

export type InventoryItemsForUserFilter_TypeFields = ObjectPrettify<{
  onlyCollectibles?: boolean,
  inventoryItemAssetTypes?: UnionPrettify<InventoryItemType_Asset>[] | "*",
  badges?: true,
  gamePasses?: true,
  privateServers?: true
}>

export type InventoryItemsForUserFilter_IdFields = ObjectPrettify<{
  assetIds?: string[],
  badgeIds?: string[],
  gamePassIds?: string[],
  privateServerIds?: string[]
}>

export type InventoryItemsForUser_Filter = ObjectEither<InventoryItemsForUserFilter_TypeFields, InventoryItemsForUserFilter_IdFields>

export type RawInventoryItemsForUserData = ObjectPrettify<{
  inventoryItems: ObjectPrettify<InventoryItem_Asset & InventoryItemType_Badge & InventoryItemType_GamePass & InventoryItemType_PrivateServer>[],
  nextPageToken?: string
}>

export type PrettifiedInventoryItemsForUserData = ObjectPrettify<RawInventoryItemsForUserData["inventoryItems"]>
// -------------------------------------------------------------------------------------------------------------------