// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayNonEmptyIfConst, Identifier, Falsey, ObjectEither, ObjectPrettify } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { SortOrder } from "../../../utils/utils.types"
import type { BundleType, MinimalBundle, PrettifiedAssetFavoritesCountData, PrettifiedBundle, PrettifiedBundleFavoritesCountData, PrettifiedCatalogBatchInfoData, RawAssetFavoritesCountData, RawAuthedUserFavoritedBundlesOfTypeData, RawBundle, RawBundleFavoritesCountData, RawCatalogBatchInfoData, RawPaginatedBundlesData, RawPaginatedMinimalBundleData } from "./catalog.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicCatalog", baseUrl: "https://catalog.roblox.com" })

const bundleTypeNameToId = {
  "BodyParts": 1,
  "Animations": 2,
  "Shoes": 3,
  "DynamicHead": 4,
  "DynamicHeadAvatar": 5
} satisfies Record<BundleType, number>
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const prettifyBundleData = (bundle: RawBundle): PrettifiedBundle<any, any> => {
  const collectibleItemDetail = bundle.collectibleItemDetail
  if (!collectibleItemDetail) return bundle as any
  
  const offSaleDeadLine = collectibleItemDetail.offSaleDeadLine
  if (!offSaleDeadLine) return bundle as any

  return {
    ...bundle,
    collectibleItemDetail: cloneAndMutateObject(collectibleItemDetail, obj => (obj as any).offSaleDeadLine = new Date(offSaleDeadLine)),
  } as any
}

const formatBatchCatalogIds = (assetIds: ArrayNonEmptyIfConst<Identifier> | Falsey, bundleIds?: ArrayNonEmptyIfConst<Identifier> | Falsey) => {
  const data: { itemType: 1 | 2, id: Identifier }[] = []

  if (assetIds) assetIds.forEach(id => data.push({ itemType: 1, id }))
  if (bundleIds) bundleIds.forEach(id => data.push({ itemType: 2, id }))

  return data
}
//////////////////////////////////////////////////////////////////////////////////


// [ Categories ] ///////////////////////////////////////////////////////////////
/**
 * Lists asset IDs and their corresponding catalog category ID.
 * @endpoint GET /v1/asset-to-category
 * 
 * @example const { data:ids } = await ClassicCatalogApi.assetIdsToCatalogCategoryIds()
 * @exampleData {"2":3,"3":9,"8":11,"10":6,"11":3,"12":3,"13":8,"17":4,"18":4,"19":11,"38":7,"40":10,"41":11,"42":11,"43":11,"44":11,"45":11,"46":11,"47":11,"48":12,"50":12,"51":12,"52":12,"53":12,"54":12,"55":12,"61":12,"62":14,"64":3,"65":3,"66":3,"67":3,"68":3,"69":3,"70":3,"71":3,"72":3}
 * @exampleRawBody {"2":3,"3":9,"8":11,"10":6,"11":3,"12":3,"13":8,"17":4,"18":4,"19":11,"38":7,"40":10,"41":11,"42":11,"43":11,"44":11,"45":11,"46":11,"47":11,"48":12,"50":12,"51":12,"52":12,"53":12,"54":12,"55":12,"61":12,"62":14,"64":3,"65":3,"66":3,"67":3,"68":3,"69":3,"70":3,"71":3,"72":3}
 */
export const assetIdsToCatalogCategoryIds = createApiMethod(async (
): ApiMethod<{ [Key: Identifier]: Identifier }> => ({
  method: "GET",
  path: `/v1/asset-to-category`,
  name: `assetIdsToCatalogCategoryIds`,
}))


/**
 * Lists asset IDs and their corresponding catalog sub category ID.
 * @endpoint GET /v1/asset-to-category
 * 
 * @example const { data:ids } = await ClassicCatalogApi.assetIdsToCatalogSubCategoryIds()
 * @exampleData {"2":55,"3":16,"8":54,"10":6,"11":56,"12":57,"13":8,"17":15,"18":10,"19":5,"38":7,"40":18,"41":20,"42":21,"43":22,"44":23,"45":24,"46":25,"47":26,"48":28,"50":30,"51":31,"52":32,"53":33,"54":34,"55":35,"61":39,"62":41,"64":58,"65":59,"66":60,"67":61,"68":62,"69":63,"70":64,"71":64,"72":65}
 * @exampleRawBody {"2":55,"3":16,"8":54,"10":6,"11":56,"12":57,"13":8,"17":15,"18":10,"19":5,"38":7,"40":18,"41":20,"42":21,"43":22,"44":23,"45":24,"46":25,"47":26,"48":28,"50":30,"51":31,"52":32,"53":33,"54":34,"55":35,"61":39,"62":41,"64":58,"65":59,"66":60,"67":61,"68":62,"69":63,"70":64,"71":64,"72":65}
 */
export const assetIdsToCatalogSubCategoryIds = createApiMethod(async (
): ApiMethod<{ [Key: Identifier]: Identifier }> => ({
  method: "GET",
  path: `/v1/asset-to-subcategory`,
  name: `assetIdsToCatalogSubCategoryIds`,
}))


/**
 * Lists catalog categories and their corresponding ID.
 * @endpoint GET /v1/asset-to-category
 * 
 * @example const { data:categories } = await ClassicCatalogApi.catalogCategories()
 * @exampleData {"Featured":0,"All":1,"Collectibles":2,"Clothing":3,"BodyParts":4,"Gear":5,"Models":6,"Plugins":7,"Decals":8,"Audio":9,"Meshes":10,"Accessories":11,"AvatarAnimations":12,"CommunityCreations":13,"Video":14,"Recommended":15,"LayeredClothing":16,"Characters":17}
 * @exampleRawBody {"Featured":0,"All":1,"Collectibles":2,"Clothing":3,"BodyParts":4,"Gear":5,"Models":6,"Plugins":7,"Decals":8,"Audio":9,"Meshes":10,"Accessories":11,"AvatarAnimations":12,"CommunityCreations":13,"Video":14,"Recommended":15,"LayeredClothing":16,"Characters":17}
 */
export const catalogCategories = createApiMethod(async (
): ApiMethod<{ [Key: string]: Identifier }> => ({
  method: "GET",
  path: `/v1/categories`,
  name: `catalogCategories`,
}))


/**
 * Lists catalog sub categories and their corresponding ID.
 * @endpoint GET /v1/asset-to-category
 * 
 * @example const { data:categories } = await ClassicCatalogApi.catalogCategories()
 * @exampleData  {"Featured":0,"All":1,"Collectibles":2,"Clothing":3,"BodyParts":4,"Gear":5,"Models":6,"Plugins":7,"Decals":8,"Hats":9,"Faces":10,"Packages":11,"Shirts":12,"Tshirts":13,"Pants":14,"Heads":15,"Audio":16,"RobloxCreated":17,"Meshes":18,"Accessories":19,"HairAccessories":20,"FaceAccessories":21,"NeckAccessories":22,"ShoulderAccessories":23,"FrontAccessories":24,"BackAccessories":25,"WaistAccessories":26,"AvatarAnimations":27,"ClimbAnimations":28,"FallAnimations":30,"IdleAnimations":31,"JumpAnimations":32,"RunAnimations":33,"SwimAnimations":34,"WalkAnimations":35,"AnimationPackage":36,"BodyPartsBundles":37,"AnimationBundles":38,"EmoteAnimations":39,"CommunityCreations":40,"Video":41,"Recommended":51,"LayeredClothing":52,"AllBundles":53,"HeadAccessories":54,"ClassicTShirts":55,"ClassicShirts":56,"ClassicPants":57,"TShirtAccessories":58,"ShirtAccessories":59,"PantsAccessories":60,"JacketAccessories":61,"SweaterAccessories":62,"ShortsAccessories":63,"ShoesBundles":64,"DressSkirtAccessories":65,"DynamicHeads":66}
 * @exampleRawBody {"Featured":0,"All":1,"Collectibles":2,"Clothing":3,"BodyParts":4,"Gear":5,"Models":6,"Plugins":7,"Decals":8,"Hats":9,"Faces":10,"Packages":11,"Shirts":12,"Tshirts":13,"Pants":14,"Heads":15,"Audio":16,"RobloxCreated":17,"Meshes":18,"Accessories":19,"HairAccessories":20,"FaceAccessories":21,"NeckAccessories":22,"ShoulderAccessories":23,"FrontAccessories":24,"BackAccessories":25,"WaistAccessories":26,"AvatarAnimations":27,"ClimbAnimations":28,"FallAnimations":30,"IdleAnimations":31,"JumpAnimations":32,"RunAnimations":33,"SwimAnimations":34,"WalkAnimations":35,"AnimationPackage":36,"BodyPartsBundles":37,"AnimationBundles":38,"EmoteAnimations":39,"CommunityCreations":40,"Video":41,"Recommended":51,"LayeredClothing":52,"AllBundles":53,"HeadAccessories":54,"ClassicTShirts":55,"ClassicShirts":56,"ClassicPants":57,"TShirtAccessories":58,"ShirtAccessories":59,"PantsAccessories":60,"JacketAccessories":61,"SweaterAccessories":62,"ShortsAccessories":63,"ShoesBundles":64,"DressSkirtAccessories":65,"DynamicHeads":66}
 */
export const catalogSubCategories = createApiMethod(async (
): ApiMethod<{ [Key: string]: Identifier }> => ({
  method: "GET",
  path: `/v1/subcategories`,
  name: `catalogSubCategories`,
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Bundle ] ///////////////////////////////////////////////////////////////////
/**
 * Lists bundles a particular asset belongs to.
 * @endpoint GET /v1/assets/{assetId}/bundles
 * 
 * @param assetId The ID of the asset to get bundles for.
 * @param limit The number of results to be returned per request.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:bundles } = await ClassicCatalogApi.bundlesAssetIsIn({ assetId: 2608539495 })
 * @exampleData [{"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":null,"price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":"85283800-cf57-4870-9a02-141945b9cbfd","price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}]}
 */ 
export const bundlesAssetIsIn = createApiMethod(async (
  { assetId, limit, sortOrder, cursor }: { assetId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawPaginatedBundlesData, PrettifiedBundle[]> => ({
  method: "GET",
  path: `/v1/assets/${assetId}/bundles`,
  searchParams: { limit, sortOrder, cursor },
  name: `bundlesAssetIsIn`,

  formatRawDataFn: ({ data }) => data.map(prettifyBundleData)
}))


/**
 * Gets information about a bundle.
 * @endpoint GET /v1/bundles/{bundleId}/details
 * 
 * @param bundleId The ID of the bundle to get information about.
 * 
 * @example const { data:bundle } = await ClassicCatalogApi.bundleInfo({ bundleId: 429 })
 * @exampleData {"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":null,"price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}
 * @exampleRawBody {"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":"85283800-cf57-4870-9a02-141945b9cbfd","price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}
 */
export const bundleInfo = createApiMethod(async <BundleId extends Identifier>(
  { bundleId }: { bundleId: BundleId }
): ApiMethod<RawBundle<BundleId>, PrettifiedBundle<BundleId>> => ({
  method: "GET",
  path: `/v1/bundles/${bundleId}/details`,
  name: `bundleInfo`,

  formatRawDataFn: prettifyBundleData
}))


/**
 * Gets recommendations for a specific bundle.
 * @endpoint GET /v1/bundles/{bundleId}/recommendations
 * 
 * @param bundleId The ID of the bundle to get recommendations for.
 * @param amount The amount of recommendations to return. Can't exceed 50.
 * 
 * @example const { data:bundles } = await ClassicCatalogApi.recommendationsForBundle({ bundleId: 429, amount: 1 })
 * @exampleData [{"id":598,"name":"Elemental Crystal Golem","description":"The light of an Elemental is controlled by its summoner, so its pretty much like a giant glowing mood ring. ","bundleType":"BodyParts","items":[{"id":4504227797,"name":"Elemental Crystal Golem - Left Arm","type":"Asset"},{"id":4504228958,"name":"Elemental Crystal Golem - Left Leg","type":"Asset"},{"id":4504228453,"name":"Elemental Crystal Golem - Right Arm","type":"Asset"},{"id":4504229658,"name":"Elemental Crystal Golem - Right Leg","type":"Asset"},{"id":4504230246,"name":"Elemental Crystal Golem - Torso","type":"Asset"},{"id":4504231783,"name":"Elemental Crystal Golem - Shoulder Rock","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":1791810588,"name":"Elemental Crystal Golem","type":"UserOutfit"},{"id":15057738572,"name":"Elemental Crystal Golem - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452708388,"name":"Elemental Crystal Golem - Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":1066235020906534,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":400,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"5529c928-ca35-4fba-91d8-9b63f81a1ae2","collectibleProductId":null,"price":400,"lowestPrice":400,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}] 
 * @exampleRawBody {"data":[{"id":598,"name":"Elemental Crystal Golem","description":"The light of an Elemental is controlled by its summoner, so its pretty much like a giant glowing mood ring. ","bundleType":"BodyParts","items":[{"id":4504227797,"name":"Elemental Crystal Golem - Left Arm","type":"Asset"},{"id":4504228958,"name":"Elemental Crystal Golem - Left Leg","type":"Asset"},{"id":4504228453,"name":"Elemental Crystal Golem - Right Arm","type":"Asset"},{"id":4504229658,"name":"Elemental Crystal Golem - Right Leg","type":"Asset"},{"id":4504230246,"name":"Elemental Crystal Golem - Torso","type":"Asset"},{"id":4504231783,"name":"Elemental Crystal Golem - Shoulder Rock","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":1791810588,"name":"Elemental Crystal Golem","type":"UserOutfit"},{"id":15057738572,"name":"Elemental Crystal Golem - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452708388,"name":"Elemental Crystal Golem - Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":1066235020906534,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":400,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"5529c928-ca35-4fba-91d8-9b63f81a1ae2","collectibleProductId":"b503d9a7-c446-4e16-90ab-644c272e8543","price":400,"lowestPrice":400,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}]}
 */
export const recommendationsForBundle = createApiMethod(async (
  { bundleId, amount }: { bundleId: Identifier, amount?: number }
): ApiMethod<{ data: RawBundle[] }, PrettifiedBundle[]> => ({
  method: "GET",
  path: `/v1/bundles/${bundleId}/recommendations`,
  searchParams: { numItems: amount },
  name: `recommendationsForBundle`,

  formatRawDataFn: ({ data }) => data.map(prettifyBundleData)
}))


/**
 * Gets information about multiple bundles.
 * @endpoint GET /v1/bundles/details
 * 
 * @param bundleIds The IDs of the bundles to get information about.
 * 
 * @example const { data:bundles } = await ClassicCatalogApi.bundlesInfo({ bundleIds: [ 429 ] })
 * @exampleData [{"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":null,"price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}] 
 * @exampleRawBody [{"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":"85283800-cf57-4870-9a02-141945b9cbfd","price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}]
 */
export const bundlesInfo = createApiMethod(async <BundleId extends Identifier>(
  { bundleIds }: { bundleIds: ArrayNonEmptyIfConst<BundleId> }
): ApiMethod<RawBundle<BundleId>[], PrettifiedBundle<BundleId>[]> => ({
  method: "GET",
  path: `/v1/bundles/details`,
  searchParams: { bundleIds },
  name: `bundlesInfo`,

  formatRawDataFn: rawData => rawData.map(prettifyBundleData)
}))

/**
 * Gets bundles owned by a specific user.
 * @endpoint GET /v1/users/{userId}/bundles
 * 
 * @param userId The ID of the user to get owned bundles for.
 * @param limit The number of results to be returned per request.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:bundles } = await ClassicCatalogApi.bundlesOwnedByUser({ userId: 45348281 })
 * @exampleData [{"id":290,"name":"Football Player","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":71,"name":"Wild Starr","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":238,"name":"Man   ","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":81,"name":"Superhero Animation Pack","bundleType":"AvatarAnimations","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":109,"name":"ROBLOX Boy","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":338,"name":"Knights of Redcliff: Paladin","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":321,"name":"City Life Man","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":337,"name":"City Life Woman","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":339,"name":"The High Seas: Beatrix The Pirate Queen","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":350,"name":"Dark Age Apprentice","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"191961467_1_6d4452377c2b2297df45ff633660d10b","data":[{"id":290,"name":"Football Player","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":71,"name":"Wild Starr","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":238,"name":"Man   ","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":81,"name":"Superhero Animation Pack","bundleType":"AvatarAnimations","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":109,"name":"ROBLOX Boy","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":338,"name":"Knights of Redcliff: Paladin","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":321,"name":"City Life Man","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":337,"name":"City Life Woman","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":339,"name":"The High Seas: Beatrix The Pirate Queen","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":350,"name":"Dark Age Apprentice","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}}]}
 */
export const bundlesOwnedByUser = createApiMethod(async (
  { userId, limit, sortOrder, cursor }: { userId: Identifier, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawPaginatedBundlesData, PrettifiedBundle[]> => ({
  method: "GET",
  path: `/v1/users/${userId}/bundles`,
  searchParams: { limit, sortOrder, cursor },
  name: `bundlesOwnedByUser`,

  formatRawDataFn: ({ data }) => data.map(prettifyBundleData)
}))


/**
 * Gets bundles of a specific type owned by a specified user.
 * @endpoint GET /v1/users/{userId}/bundles/{bundleType}
 * 
 * @param userId The ID of the user to get owned bundles for.
 * @param bundleType The type of bundles to return.
 * @param limit The number of results to be returned per request.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:bundles } = await ClassicCatalogApi.bundlesOfTypeOwnedByUser({ userId: 45348281, bundleType: "BodyParts" })
 * @exampleData [{"id":2043,"name":"Billy","bundleType":"BodyParts","creator":{"id":1755732316,"name":"mPhase","type":"User","hasVerifiedBadge":true}},{"id":942,"name":"Gil by Guilded","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":573,"name":"Oliver","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":572,"name":"Summer","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":239,"name":"Woman","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":510,"name":"Eleven’s Mall Outfit","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":502,"name":"FC Barcelona: Elite Playmaker","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":504,"name":"FC Barcelona: Elite Striker","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":364,"name":"NFL Super Bowl LIII – Los Angeles Rams","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":394,"name":"Simple Robo","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"eyJrZXkiOjIzNTUwNjI0NSwic29ydE9yZGVyIjoiRGVzYyIsInBhZ2luZ0RpcmVjdGlvbiI6IkZvcndhcmQiLCJwYWdlTnVtYmVyIjoyLCJkaXNjcmltaW5hdG9yIjoidXNlcklkOjQ1MzQ4MjgxYnVuZGxlVHlwZTpCb2R5UGFydHMiLCJjb3VudCI6MTB9CmExMTc4NzRhNTM0ZWVhNWY3NzM1OTdjOGVjZGU4NjczMDVhMGJhYTVhMjQ5NTk4OGQyZjc4NmU1NzM3NTVhMzk=","data":[{"id":2043,"name":"Billy","bundleType":"BodyParts","creator":{"id":1755732316,"name":"mPhase","type":"User","hasVerifiedBadge":true}},{"id":942,"name":"Gil by Guilded","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":573,"name":"Oliver","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":572,"name":"Summer","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":239,"name":"Woman","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":510,"name":"Eleven’s Mall Outfit","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":502,"name":"FC Barcelona: Elite Playmaker","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":504,"name":"FC Barcelona: Elite Striker","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":364,"name":"NFL Super Bowl LIII – Los Angeles Rams","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}},{"id":394,"name":"Simple Robo","bundleType":"BodyParts","creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true}}]}
 */
export const bundlesOfTypeOwnedByUser = createApiMethod(async <Type extends BundleType>(
  { userId, bundleType, limit, sortOrder, cursor }:
  { userId: Identifier, bundleType: Type, limit?: 10 | 25 | 50 | 100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawPaginatedMinimalBundleData<Type>, MinimalBundle<Type>[]> => ({
  method: "GET",
  path: `/v1/users/${userId}/bundles/${bundleType}`,
  searchParams: { limit, sortOrder, cursor },
  name: `bundlesOwnedByUser`,

  formatRawDataFn: ({ data }) => data
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Favorites ] ////////////////////////////////////////////////////////////////
/**
 * Gets favorites count for an asset.
 * @endpoint GET /v1/favorites/assets/{assetId}/count
 * 
 * @param assetId The ID of the asset to get favorites count for.
 * 
 * @example const { data:favoritesCount } = await ClassicCatalogApi.assetFavoritesCount({ assetId: 2608539495 })
 * @exampleData 10370
 * @exampleRawBody 10370
 */
export const assetFavoritesCount = createApiMethod(async (
  { assetId }: { assetId: Identifier }
): ApiMethod<number> => ({
  method: "GET",
  path: `/v1/favorites/assets/${assetId}/count`,
  name: `assetFavoritesCount`,
}))


/**
 * Gets favorites count for a bundle.
 * @endpoint GET /v1/favorites/bundles/{bundleId}/count
 * 
 * @param bundleId The ID of the bundle to get favorites count for.
 * 
 * @example const { data:favoritesCount } = await ClassicCatalogApi.bundleFavoritesCount({ bundleId: 429 })
 * @exampleData 520250
 * @exampleRawBody 520250
 */
export const bundleFavoritesCount = createApiMethod(async (
  { bundleId }: { bundleId: Identifier }
): ApiMethod<number> => ({
  method: "GET",
  path: `/v1/favorites/bundles/${bundleId}/count`,
  name: `bundleFavoritesCount`,
}))


/**
 * Removes the authenticated users favorite for a specific asset.
 * @endpoint DELETE /v1/favorites/users/{userId}/assets/{assetId}/favorite
 * 
 * @param userId The ID of the authenticated user.
 * @param assetId The ID of the asset to unfavorite.
 * 
 * @example const { data:success } = await ClassicCatalogApi.authedUserRemoveAssetFavorite({ userId: 45348281, assetId: 2608539495 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authedUserRemoveAssetFavorite = createApiMethod(async (
  { userId, assetId }: { userId: Identifier, assetId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/favorites/users/${userId}/assets/${assetId}/favorite`,
  name: `authedUserRemoveAssetFavorite`,
  
  formatRawDataFn: dataIsSuccess
}))


/**
 * Gets the authenticated users favorite for a specific asset.
 * @endpoint GET /v1/favorites/users/{userId}/assets/{assetId}/favorite
 * 
 * @param userId The ID of the authenticated user.
 * @param assetId The ID of the asset to get favorite for.
 * 
 * @example const { data:favorite } = await ClassicCatalogApi.authedUserGetAssetFavorite({ userId: 45348281, assetId: 2608539495 })
 * @exampleData {"assetId":2608539495,"userId":45348281,"created":"2024-07-30T15:00:39.540Z"} 
 * @exampleRawBody {"assetId":2608539495,"userId":45348281,"created":"2024-07-30T15:00:39.540Z"}
 */ 
export const authedUserGetAssetFavorite = createApiMethod(async <UserId extends Identifier, AssetId extends Identifier>(
  { userId, assetId }: { userId: UserId, assetId: AssetId }
): ApiMethod<RawAssetFavoritesCountData<UserId, AssetId>, PrettifiedAssetFavoritesCountData<UserId, AssetId>> => ({
  method: "GET",
  path: `/v1/favorites/users/${userId}/assets/${assetId}/favorite`,
  name: `authedUserGetAssetFavorite`,

  formatRawDataFn: rawData => rawData ? cloneAndMutateObject(rawData, obj => obj.created = new Date(obj.created)) : rawData
}))


/**
 * Favorites a specific asset for the authenticated user.
 * @endpoint POST /v1/favorites/users/{userId}/assets/{assetId}/favorite
 * 
 * @param userId The ID of the authenticated user.
 * @param assetId The ID of the asset to create favorite for.
 * 
 * @example const { data:favorite } = await ClassicCatalogApi.authedUserCreateAssetFavorite({ userId: 45348281, assetId: 2608539495 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authedUserCreateAssetFavorite = createApiMethod(async <UserId extends Identifier, AssetId extends Identifier>(
  { userId, assetId }: { userId: UserId, assetId: AssetId }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/favorites/users/${userId}/assets/${assetId}/favorite`,
  name: `authedUserCreateAssetFavorite`,

  formatRawDataFn: dataIsSuccess
}))


/**
 * Removes the authenticated users favorite for a specific asset.
 * @endpoint DELETE /v1/favorites/users/{userId}/bundles/{bundleId}/favorite
 * 
 * @param userId The ID of the authenticated user.
 * @param assetId The ID of the bundle to unfavorite.
 * 
 * @example const { data:success } = await ClassicCatalogApi.authedUserRemoveBundleFavorite({ userId: 45348281, bundleId: 429 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authedUserRemoveBundleFavorite = createApiMethod(async (
  { userId, bundleId }: { userId: Identifier, bundleId: Identifier }
): ApiMethod<{}, boolean> => ({
  method: "DELETE",
  path: `/v1/favorites/users/${userId}/bundles/${bundleId}/favorite`,
  name: `authedUserRemoveBundleFavorite`,
  
  formatRawDataFn: dataIsSuccess
}))

/**
 * Gets the authenticated users favorite for a specific bundle.
 * @endpoint GET /v1/favorites/users/{userId}/bundles/{bundleId}/favorite
 * 
 * @param userId The ID of the authenticated user.
 * @param bundleId The ID of the bundle to get favorite for.
 * 
 * @example const { data:favorite } = await ClassicCatalogApi.authedUserGetBundleFavorite({ userId: 45348281, bundleId: 429 })
 * @exampleData {"bundleId":429,"userId":45348281,"created":"2024-07-30T23:23:36.501Z"} 
 * @exampleRawBody {"bundleId":429,"userId":45348281,"created":"2024-07-30T23:23:36.501Z"} 
 */
export const authedUserGetBundleFavorite = createApiMethod(async <UserId extends Identifier, BundleId extends Identifier>(
  { userId, bundleId }: { userId: UserId, bundleId: BundleId }
): ApiMethod<RawBundleFavoritesCountData<UserId, BundleId>, PrettifiedBundleFavoritesCountData<UserId, BundleId>> => ({
  method: "GET",
  path: `/v1/favorites/users/${userId}/bundles/${bundleId}/favorite`,
  name: `authedUserGetBundleFavorite`,

  formatRawDataFn: rawData => rawData ? cloneAndMutateObject(rawData, obj => obj.created = new Date(obj.created)) : rawData
}))


/**
 * Favorites a specific bundle for the authenticated user.
 * @endpoint POST /v1/favorites/users/{userId}/bundles/{bundleId}/favorite
 * 
 * @param userId The ID of the authenticated user.
 * @param bundleId The ID of the bundle to create favorite for.
 * 
 * @example const { data:favorite } = await ClassicCatalogApi.authedUserCreateBundleFavorite({ userId: 45348281, bundleId: 429 })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authedUserCreateBundleFavorite = createApiMethod(async <UserId extends Identifier, AssetId extends Identifier>(
  { userId, bundleId }: { userId: UserId, bundleId: AssetId }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/favorites/users/${userId}/bundles/${bundleId}/favorite`,
  name: `authedUserCreateBundleFavorite`,

  formatRawDataFn: dataIsSuccess
}))


/**
 * Gets bundles of a specific type that the authenticated user has favorited.
 * @endpoint GET /v1/favorites/users/{userId}/favorites/{bundleType}/bundles
 * 
 * @param userId The ID of the authenticated user.
 * @param bundleType The type of bundle sub type to get.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:bundles } = await ClassicCatalogApi.authedUserFavoritedBundlesOfType({ userId: 45348281, bundleType: "BodyParts" })
 * @exampleData [{"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":null,"price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}] 
 * @exampleRawBody {"favorites":[{"id":429,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","bundleType":"BodyParts","items":[{"id":2608534881,"name":"Magma Fiend - Left Arm","type":"Asset"},{"id":2608536258,"name":"Magma Fiend - Left Leg","type":"Asset"},{"id":2608537440,"name":"Magma Fiend - Right Arm","type":"Asset"},{"id":2608538559,"name":"Magma Fiend - Right Leg","type":"Asset"},{"id":2608539495,"name":"Magma Fiend - Torso","type":"Asset"},{"id":2510230574,"name":"Rthro Climb","type":"Asset"},{"id":2510233257,"name":"Rthro Fall","type":"Asset"},{"id":2510235063,"name":"Rthro Idle","type":"Asset"},{"id":2510236649,"name":"Rthro Jump","type":"Asset"},{"id":2510238627,"name":"Rthro Run","type":"Asset"},{"id":2510240941,"name":"Rthro Swim","type":"Asset"},{"id":2510242378,"name":"Rthro Walk","type":"Asset"},{"id":474312030,"name":"Magma Fiend","type":"UserOutfit"},{"id":12726967427,"name":"Magma Fiend - Head","type":"Asset"},{"id":11573370910,"name":"Anime - Mood","type":"Asset"},{"id":23452425262,"name":"Magma Fiend Head","type":"UserOutfit"}],"creator":{"id":1,"name":"Roblox","type":"User","hasVerifiedBadge":true},"product":{"id":7219806593957530,"type":"productType","isPublicDomain":false,"isForSale":true,"priceInRobux":300,"isFree":false,"noPriceText":null},"collectibleItemDetail":{"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","collectibleProductId":"85283800-cf57-4870-9a02-141945b9cbfd","price":300,"lowestPrice":300,"lowestResalePrice":0,"totalQuantity":0,"unitsAvailable":0,"saleLocation":{"saleLocationType":"ShopAndAllExperiences","saleLocationTypeId":5,"universeIds":[],"enabledUniverseIds":[]},"hasResellers":false,"saleStatus":"OnSale","quantityLimitPerUser":null,"offSaleDeadline":null,"collectibleItemType":"NonLimited","lowestAvailableResaleProductId":null,"lowestAvailableResaleItemInstanceId":null,"resaleRestriction":"Disabled"}}],"moreFavorites":false,"nextCursor":null,"previousCursor":null}
 */
export const authedUserFavoritedBundlesOfType = createApiMethod(async <BType extends BundleType>(
  { userId, bundleType, cursor, isPrevious }:
  ObjectPrettify<
    { userId: Identifier, bundleType: BType } &
    ObjectEither<{ cursor: string, isPrevious: boolean }, { cursor?: string }>
  >
): ApiMethod<RawAuthedUserFavoritedBundlesOfTypeData<BType>, PrettifiedBundle<Identifier, BType>[]> => ({
  method: "GET",
  path: `/v1/favorites/users/${userId}/favorites/${bundleTypeNameToId[bundleType]}/bundles`,
  searchParams: { cursor, isPrevious },
  name: `authedUserFavoritedBundlesOfType`,

  formatRawDataFn: ({ favorites }) => favorites.map(prettifyBundleData)
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Catalog ] //////////////////////////////////////////////////////////////////
/**
 * Gets batch information about specific assets and bundles.
 * @endpoint GET /v1/catalog/items/details
 * 
 * @param assetIds The IDs of the assets to get info about.
 * @param bundleIds The IDs of the bundles to get info about.
 * 
 * @example const { data:items } = await ClassicCatalogApi.catalogBatchInfo({ assetIds: [ 2608538559 ], bundleIds: [ 429 ] })
 * @exampleData [{"id":429,"itemType":"Bundle","bundleType":1,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","productId":7219806593957530,"itemStatus":[],"itemRestrictions":[],"creatorHasVerifiedBadge":true,"creatorType":"User","creatorTargetId":1,"creatorName":"Roblox","price":300,"lowestPrice":300,"lowestResalePrice":0,"unitsAvailableForConsumption":0,"purchaseCount":0,"favoriteCount":520324,"offSaleDeadline":null,"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","totalQuantity":0,"saleLocationType":"ShopAndAllExperiences","hasResellers":false},{"id":2608538559,"itemType":"Asset","assetType":31,"name":"Magma Fiend - Right Leg","description":"He's got hot blood, with a temperature of nine hundred and three.","productId":427839098,"itemStatus":[],"itemRestrictions":[],"creatorHasVerifiedBadge":true,"creatorType":"User","creatorTargetId":1,"creatorName":"Roblox","priceStatus":"Off Sale","purchaseCount":0,"favoriteCount":9887,"offSaleDeadline":null,"saleLocationType":"NotApplicable","isOffSale":true}] 
 * @exampleRawBody {"data":[{"id":429,"itemType":"Bundle","bundleType":1,"name":"Magma Fiend","description":"He's got hot blood, with a temperature of nine hundred and three.","productId":7219806593957530,"itemStatus":[],"itemRestrictions":[],"creatorHasVerifiedBadge":true,"creatorType":"User","creatorTargetId":1,"creatorName":"Roblox","price":300,"lowestPrice":300,"lowestResalePrice":0,"unitsAvailableForConsumption":0,"purchaseCount":0,"favoriteCount":520324,"offSaleDeadline":null,"collectibleItemId":"e036077b-ed8d-4bf1-9193-4e64bbc86978","totalQuantity":0,"saleLocationType":"ShopAndAllExperiences","hasResellers":false},{"id":2608538559,"itemType":"Asset","assetType":31,"name":"Magma Fiend - Right Leg","description":"He's got hot blood, with a temperature of nine hundred and three.","productId":427839098,"itemStatus":[],"itemRestrictions":[],"creatorHasVerifiedBadge":true,"creatorType":"User","creatorTargetId":1,"creatorName":"Roblox","priceStatus":"Off Sale","purchaseCount":0,"favoriteCount":9887,"offSaleDeadline":null,"saleLocationType":"NotApplicable","isOffSale":true}]}
 */
export const catalogBatchInfo = createApiMethod(async <AssetId extends Identifier, BundleId extends Identifier>(
  { assetIds, bundleIds }:
  ObjectEither<
    { assetIds: ArrayNonEmptyIfConst<AssetId> },
    ObjectEither<
      { bundleIds: ArrayNonEmptyIfConst<BundleId> },
      { assetIds: ArrayNonEmptyIfConst<AssetId>, bundleIds: ArrayNonEmptyIfConst<BundleId> }
    >
  >
): ApiMethod<RawCatalogBatchInfoData<AssetId, BundleId>, PrettifiedCatalogBatchInfoData<AssetId, BundleId>> => ({
  method: "POST",
  path: `/v1/catalog/items/details`,
  body: { items: formatBatchCatalogIds(assetIds, bundleIds) },
  name: `catalogBatchInfo`,

  formatRawDataFn: ({ data }) => data.map(item => {
    const offSaleDeadline = item.offSaleDeadline
    return offSaleDeadline ? cloneAndMutateObject(item, obj => obj.offSaleDeadline = new Date(offSaleDeadline)) : item
  }) as any
}))
/////////////////////////////////////////////////////////////////////////////////