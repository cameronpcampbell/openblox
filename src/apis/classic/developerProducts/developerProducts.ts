// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { toCamel, dataIsSuccess, formDataBuilder } from "../../../utils/utils"
import { readFile } from "../../../file"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { PrettifiedDeveloperProductCreatorDetails, PrettifiedDeveloperProductInfoData, PrettifiedMinimalDeveloperProductData, RawDeveloperProductCreatorDetails, RawDeveloperProductInfoData, RawMinimalDeveloperProductData } from "./developerProducts.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicDeveloperProducts", baseUrl: "https://apis.roblox.com/developer-products" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const prettifyMinimalDeveloperProduct = (
  { id, name, Description, ...rest }: RawMinimalDeveloperProductData
): PrettifiedMinimalDeveloperProductData => ({ id, name, description: Description, ...rest })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about a particular developer product.
 * @endpoint GET /v1/developer-products/{developerProductId}
 * 
 * @param developerProductId The ID (not product ID) of the developer product.
 * 
 * @example const { data:product } = await ClassicDeveloperProductsApi.developerProductInfo({ developerProductId: 3848620 })
 * 
 * @exampleData {"productId":995087849,"productTypeId":4,"isPublicDomain":false,"isForSale":true,"priceInRobux":95,"premiumPriceInRobux":null,"robloxProductId":null,"targetId":3848620,"assetTypeId":null,"creatorId":1536374574,"assetGenres":0,"assetCategories":0,"affiliateFeePercentage":null,"isNew":false,"created":"2020-05-29T11:49:09.08Z","updated":"2024-07-22T05:33:16.827Z"} 
 * @exampleRawBody {"id":995087849,"productTypeId":4,"isPublicDomain":false,"isForSale":true,"priceInRobux":95,"premiumPriceInRobux":null,"robloxProductId":null,"targetId":3848620,"assetTypeId":null,"creatorId":1536374574,"assetGenres":0,"assetCategories":0,"affiliateFeePercentage":null,"isNew":false,"created":"2020-05-29T11:49:09.08Z","updated":"2024-07-22T05:33:16.827Z"}
 */
export const developerProductInfo = createApiMethod(async <DeveloperProductId extends Identifier>(
  { developerProductId }: { developerProductId: DeveloperProductId }
): ApiMethod<RawDeveloperProductInfoData<DeveloperProductId>, PrettifiedDeveloperProductInfoData<DeveloperProductId>> => ({
  method: "GET",
  path: `/v1/developer-products/${developerProductId}`,
  name: `developerProductInfo`,

  formatRawDataFn: ({ id, ...rest }) => ({ productId: id, ...rest })
}))


/**
 * Gets developer products for a particular universe.
 * @endpoint GET /v1/universes/{universeId}/developerproducts
 * 
 * @param universeId The ID of the universe to get developer products from.
 * @param limit The number of results per request.
 * @param pageNumber The number for the previous or next page.
 * 
 * @example const { data:products } = await ClassicDeveloperProductsApi.developerProductsForUniverse({ universeId: 1685831367 })
 * 
 * @exampleData [{"id":3616380,"name":"Buy $100 CamperCoins","description":null,"shopId":1685930453,"iconImageAssetId":4922956503},{"id":3616418,"name":"Buy $1000 CamperCoins","description":null,"shopId":1685930453,"iconImageAssetId":4922970743},{"id":3616413,"name":"Buy $500 CamperCoins","description":null,"shopId":1685930453,"iconImageAssetId":4922969199},{"id":3616425,"name":"CamperCoins","description":null,"shopId":1685930453,"iconImageAssetId":18760547825},{"id":3848620,"name":"Starterpackk","description":null,"shopId":1685930453,"iconImageAssetId":5106354357}]  
 * @exampleRawBody [{"id":3616380,"name":"Buy $100 CamperCoins","Description":null,"shopId":1685930453,"iconImageAssetId":4922956503},{"id":3616418,"name":"Buy $1000 CamperCoins","Description":null,"shopId":1685930453,"iconImageAssetId":4922970743},{"id":3616413,"name":"Buy $500 CamperCoins","Description":null,"shopId":1685930453,"iconImageAssetId":4922969199},{"id":3616425,"name":"CamperCoins","Description":null,"shopId":1685930453,"iconImageAssetId":18760547825},{"id":3848620,"name":"Starterpackk","Description":null,"shopId":1685930453,"iconImageAssetId":5106354357}]
 */
export const developerProductsForUniverse = createApiMethod(async (
  { universeId, limit = 50, pageNumber = 1 }: { universeId: Identifier, limit?: number, pageNumber?: number }
): ApiMethod<RawMinimalDeveloperProductData[], PrettifiedMinimalDeveloperProductData[]> => ({
  method: "GET",
  path: `/v1/universes/${universeId}/developerproducts`,
  searchParams: { pageSize: limit, pageNumber },
  name: `developerProductsForUniverse`,

  formatRawDataFn: rawData => rawData.map(prettifyMinimalDeveloperProduct),

  getCursorsFn: () => [ pageNumber && pageNumber !== 1 ? pageNumber - 1 : null, pageNumber ? pageNumber + 1 : 1 ]
}))


/**
 * Updates a developer product
 * @endpoint GET /v1/universes/{universeId}/developerproducts/{developerProductId}/update
 * 
 * @param universeId The ID of the universe to update a developer product in.
 * @param developerProductId The ID of the developer product to update.
 * @param name The new name for the developer product.
 * @param description The new description for the developer product.
 * @param priceInRobux The new price in robux for the developer product.
 * 
 * @example
 * const { data:success } = await ClassicDeveloperProductsApi.updateDeveloperProduct({
     universeId: 1685831367, developerProductId: 975462435, name: "CamperCoins"
   })
 * @exampleData true
 * @exampleRawBody {}
 */
export const updateDeveloperProduct = createApiMethod(async (
  { universeId, developerProductId, name, description, priceInRobux }:
  { universeId: Identifier, developerProductId: Identifier, name?: string, description?: string, priceInRobux?: number }
): ApiMethod<{}, boolean> => ({
  method: "POST",
  path: `/v1/universes/${universeId}/developerproducts/${developerProductId}/update`,
  body: { Name: name, Description: description, PriceInRobux: priceInRobux },
  name: `updateDeveloperProduct`,

  formatRawDataFn: dataIsSuccess
}))


/**
 * Updates a developer product's icon.
 * @endpoint POST /v1/developer-products/{developerProductId}/image
 * 
 * @param developerProductId The ID of the developer product to update icon for.
 * @param icon The new icon for the developer product.
 * 
 * @example
 * const { data, response:{body} } = await ClassicDeveloperProductsApi.updateDeveloperProductIcon({
     developerProductId: 975462435, icon: "./developerProductIcon.png"
   })
 * @exampleData 18760547825
 * @exampleRawBody {"imageAssetId":18760547825}
 */
export const updateDeveloperProductIcon = createApiMethod(async (
  { developerProductId, icon }: { developerProductId: Identifier, icon: string | File }
): ApiMethod<{ imageAssetId: 18760543954 }, Identifier> => ({
  method: "POST",
  path: `/v1/developer-products/${developerProductId}/image`,
  formData: formDataBuilder()
    .append("imageFile", typeof icon == "string" ? new File([ new Blob([ await readFile(icon) ]) ], "imageFile") : icon),
  name: `updateDeveloperProductIcon`,

  formatRawDataFn: ({ imageAssetId }) => imageAssetId
}))


/**
 * Creates a developer product.
 * @endpoint POST /v1/universes/{universeId}/developerproducts
 * 
 * @param universeId The ID of the universe to create a developer product in.
 * @param name The name for the developer product.
 * @param description The description for the developer product.
 * @param priceInRobux The price in robux for the developer product.
 * 
 * @example
 * const { data:product } = await ClassicDeveloperProductsApi.createDeveloperProduct({
     universeId: 1685831367, name: "50 Coins", description: "Lorem Ipsum", priceInRobux: 50
   })
 * @exampleData {"id":60558911,"name":"50 Coins","description":"Lorem Ipsum","shopId":1685930453,"iconImageAssetId":null}
 * @exampleRawBody {"id":60558911,"name":"50 Coins","Description":"Lorem Ipsum","shopId":1685930453,"iconImageAssetId":null}
 */ 
export const createDeveloperProduct = createApiMethod(async (
  { universeId, name, description, priceInRobux }: { universeId: Identifier, name: string, description: string, priceInRobux: number }
): ApiMethod<RawMinimalDeveloperProductData, PrettifiedMinimalDeveloperProductData> => ({
  method: "POST",
  path: `/v1/universes/${universeId}/developerproducts`,
  searchParams: { name, description, priceInRobux },
  name: `createDeveloperProduct`,

  formatRawDataFn: prettifyMinimalDeveloperProduct
}))


/**
 * Gets details for the creator about a developer product.
 * @endpoint GET /v1/developer-products/{developerProductId}/creator-details
 * 
 * @param developerProductId The Product-ID (not ID) of the develoepr product to get creator details for.
 * 
 * @example
 * const { data:productCreatorDetails } = await ClassicDeveloperProductsApi.developerProductCreatorDetails({
 *   developerProductProductId: 995087849
 * })
 * @exampleData {"displayName":"Starterpackk","displayDescription":null,"displayIconImageAssetId":5106354357,"priceInformation":{"defaultPriceInRobux":95,"isInActivePriceOptimizationExperiment":false},"targetId":3848620,"productType":"Developer Product","assetId":0,"productId":995087849,"name":"Starterpackk","description":null,"assetTypeId":0,"creator":{"id":0,"name":null,"creatorType":null,"creatorTargetId":0},"iconImageAssetId":5106354357,"created":"2020-05-29T11:49:09.08Z","updated":"2024-07-22T05:33:16.827Z","priceInRobux":null,"premiumPriceInRobux":null,"priceInTickets":null,"isNew":false,"isForSale":true,"isPublicDomain":false,"isLimited":false,"isLimitedUnique":false,"remaining":null,"sales":null,"minimumMembershipLevel":0} 
 * @exampleRawBody {"DisplayName":"Starterpackk","DisplayDescription":null,"DisplayIconImageAssetId":5106354357,"PriceInformation":{"defaultPriceInRobux":95,"isInActivePriceOptimizationExperiment":false},"TargetId":3848620,"ProductType":"Developer Product","AssetId":0,"ProductId":995087849,"Name":"Starterpackk","Description":null,"AssetTypeId":0,"Creator":{"Id":0,"Name":null,"CreatorType":null,"CreatorTargetId":0},"IconImageAssetId":5106354357,"Created":"2020-05-29T11:49:09.08Z","Updated":"2024-07-22T05:33:16.827Z","PriceInRobux":null,"PremiumPriceInRobux":null,"PriceInTickets":null,"IsNew":false,"IsForSale":true,"IsPublicDomain":false,"IsLimited":false,"IsLimitedUnique":false,"Remaining":null,"Sales":null,"MinimumMembershipLevel":0}
 */
export const developerProductCreatorDetails = createApiMethod(async (
  { developerProductProductId }: { developerProductProductId: Identifier }
): ApiMethod<RawDeveloperProductCreatorDetails, PrettifiedDeveloperProductCreatorDetails> => ({
  method: "GET",
  path: `/v1/developer-products/${developerProductProductId}/creator-details`,
  name: `developerProductCreatorDetails`,

  formatRawDataFn: toCamel
}))