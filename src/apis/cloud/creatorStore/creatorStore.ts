// [ Modules ] ///////////////////////////////////////////////////////////////////
import { Identifier } from "typeforge"
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { CreatorStoreProduct_NewProductData, CreatorStoreProduct_OnlyOneId, CreatorStoreProduct_Type, CreatorStoreProductInfo } from "./creatorStore.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "CreatorStore", baseUrl: "https://apis.roblox.com/cloud" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * 
 * @endpoint GET /v2/creator-store-products/{productId}
 * @tags [ "CloudKey Needed" ]
 * 
 * @param modelAssetId Use this if the creator product you are getting is a model.
 * @param pluginAssetId Use this if the creator product you are getting is a plugin.
 * @param audioAssetId Use this if the creator product you are getting is an audio.
 * @param decalAssetId Use this if the creator product you are getting is a decal.
 * @param meshPartAssetId Use this if the creator product you are getting is a mesh part.
 * @param videoAssetId Use this if the creator product you are getting is a video.
 * @param fontFamilyAssetId Use this if the creator product you are getting is a font family.
 * 
 * @example const { data:productInfo } = await CreatorStoreApi.creatorStoreProductInfo({ modelAssetId: 16989381169 })
 * @exampleData {"path":"creator-store-products/CreatorMarketplaceAsset-Model-16989381169","displayName":"monkey","description":"","basePrice":{"currencyCode":"USD","quantity":{"significand":0,"exponent":0}},"purchasePrice":{"currencyCode":"USD","quantity":{"significand":0,"exponent":0}},"published":false,"restrictions":[],"purchasable":false,"userSeller":"45348281","modelAssetId":"16989381169"}
 * @exampleRawBody {"path":"creator-store-products/CreatorMarketplaceAsset-Model-16989381169","displayName":"monkey","description":"","basePrice":{"currencyCode":"USD","quantity":{"significand":0,"exponent":0}},"purchasePrice":{"currencyCode":"USD","quantity":{"significand":0,"exponent":0}},"published":false,"restrictions":[],"purchasable":false,"userSeller":"45348281","modelAssetId":"16989381169"}
 */
export const creatorStoreProductInfo = createApiMethod(async <const IdInfo extends CreatorStoreProduct_OnlyOneId>(
  { modelAssetId, pluginAssetId, audioAssetId, decalAssetId, meshPartAssetId, videoAssetId, fontFamilyAssetId }: IdInfo
): ApiMethod<CreatorStoreProductInfo<IdInfo>> => {
  const [productType, productId]: [ CreatorStoreProduct_Type, any ] = (
    modelAssetId ? [ "PRODUCT_TYPE_MODEL", modelAssetId ]
    : pluginAssetId ? [ "PRODUCT_TYPE_PLUGIN", pluginAssetId ]
    : audioAssetId ? [ "PRODUCT_TYPE_AUDIO", audioAssetId ]
    : decalAssetId ? [ "PRODUCT_TYPE_DECAL", decalAssetId ]
    : meshPartAssetId ? [ "PRODUCT_TYPE_MESH_PART", meshPartAssetId ]
    : videoAssetId ? [ "PRODUCT_TYPE_VIDEO", videoAssetId ]
    : fontFamilyAssetId ? [ "PRODUCT_TYPE_FONT_FAMILY", fontFamilyAssetId ]
    : [ "PRODUCT_TYPE_INVALID", undefined ]
  )

  return ({
    path: `/v2/creator-store-products/CreatorMarketplaceAsset-${productType}-${productId}`,
    method: "GET",
    name: "creatorStoreProductInfo",
  })
})


/**
 * Creates a creator store product (doesnt work atm for some reason).
 * @endpoint POST /v2/creator-store-products
 * @tags [ "CloudKey Needed" ]
 * 
 * @param displayName The display name for the product.
 * @param description The description for the product.
 * @param basePrice
 * 
 * @example
 * @exampleData
 * @exampleRawBody
 */
export const createCreatorStoreProduct = createApiMethod(async (
  {
     displayName, description, basePrice, purchasePrice, published, purchasable,
     modelAssetId, pluginAssetId, audioAssetId, decalAssetId, meshPartAssetId, videoAssetId, fontFamilyAssetId
  }: CreatorStoreProduct_NewProductData
): ApiMethod<any> => {
  const productData: { productType: CreatorStoreProduct_Type, [Key: string]: any } = (
    modelAssetId ? { productType: "PRODUCT_TYPE_MODEL", modelAssetId: modelAssetId.toString() }
    : pluginAssetId ? { productType: "PRODUCT_TYPE_PLUGIN", pluginAssetId: pluginAssetId.toString() }
    : audioAssetId ? { productType: "PRODUCT_TYPE_AUDIO", audioAssetId: audioAssetId.toString() }
    : decalAssetId ? { productType: "PRODUCT_TYPE_DECAL", decalAssetId: decalAssetId.toString() }
    : meshPartAssetId ? { productType: "PRODUCT_TYPE_MESH_PART", meshPartAssetId: meshPartAssetId.toString() }
    : videoAssetId ? { productType: "PRODUCT_TYPE_VIDEO", videoAssetId: videoAssetId.toString() }
    : fontFamilyAssetId ? { productType: "PRODUCT_TYPE_FONT_FAMILY", fontFamilyAssetId: fontFamilyAssetId.toString() }
    : { productType: "PRODUCT_TYPE_INVALID" }
  )

  return {
    path: `/v2/creator-store-products`,
    method: "POST",
    name: "createCreatorStoreProduct",
    body: {
      displayName, description, basePrice, purchasePrice: purchasePrice ?? basePrice, published, purchasable, ...productData
    }
  }
})


export const updateCreatorStoreProduct = createApiMethod(async (
  {
     displayName, description, basePrice, purchasePrice, published, purchasable,
     modelAssetId, pluginAssetId, audioAssetId, decalAssetId, meshPartAssetId, videoAssetId, fontFamilyAssetId
  }: Partial<CreatorStoreProduct_NewProductData>
): ApiMethod<any
> => {
  const [productType, productId]: [ CreatorStoreProduct_Type, any ] = (
    modelAssetId ? [ "PRODUCT_TYPE_MODEL", modelAssetId ]
    : pluginAssetId ? [ "PRODUCT_TYPE_PLUGIN", pluginAssetId ]
    : audioAssetId ? [ "PRODUCT_TYPE_AUDIO", audioAssetId ]
    : decalAssetId ? [ "PRODUCT_TYPE_DECAL", decalAssetId ]
    : meshPartAssetId ? [ "PRODUCT_TYPE_MESH_PART", meshPartAssetId ]
    : videoAssetId ? [ "PRODUCT_TYPE_VIDEO", videoAssetId ]
    : fontFamilyAssetId ? [ "PRODUCT_TYPE_FONT_FAMILY", fontFamilyAssetId ]
    : [ "PRODUCT_TYPE_INVALID", undefined ]
  )

  return {
    path: `/v2/creator-store-products/CreatorMarketplaceAsset-${productType}-${productId}`,
    method: "PATCH",
    name: "updateCreatorStoreProduct",
    body: {
      displayName, description, basePrice, purchasePrice: purchasePrice ?? basePrice, published, purchasable
    }
  }
})