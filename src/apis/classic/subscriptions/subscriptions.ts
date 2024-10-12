// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, formDataBuilder } from "../../../utils/utils"
import { readFile } from "../../../file"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { AuthenticatedUserSubscriptionsPermissionsForUniverseData, PrettifiedCreateSubscriptionData, PrettifiedSubscriptionInfoData, PrettifiedSubscriptionsForUniverseData, PrettifiedSubscriptionsPriceTiersForUniverseData, RawCreateSubscriptionData, RawSubscriptionInfoData, RawSubscriptionsForUniverseData, RawSubscriptionsPriceTiersForUniverseData, SubscriptionBasePriceId, SubscriptionType, SubsriptionPrice } from "./subscriptions.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicSubscriptions", baseUrl: "https://apis.roblox.com/experience-subscriptions" })

const subscriptionTypeToId: { [key in SubscriptionType]: number } = {
  "Durable": 3,
  "Currency": 2,
  "Consumable": 1
}
const subsriptionIdToType: { [Key: number]: SubscriptionType } = {
  3: "Durable",
  2: "Currency",
  1: "Consumable"
}

const subscriptionPriceToId: { [key in SubsriptionPrice]: SubscriptionBasePriceId } = {
  "$2.99": "919c5912-7de8-413c-9756-d4265b3cbd3a",
  "$4.99": "c0516080-fc44-42a2-bc23-3c6dbfd0772d",
  "$7.99": "75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a",
  "$9.99": "1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7",
  "$14.99": "790ff0ac-ef4b-490e-9b95-89f9249b8f51"
}
const subscriptionIdToPrice: { [key in SubscriptionBasePriceId]: SubsriptionPrice } = {
  "919c5912-7de8-413c-9756-d4265b3cbd3a": "$2.99",
  "c0516080-fc44-42a2-bc23-3c6dbfd0772d": "$4.99",
  "75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a": "$7.99",
  "1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7": "$9.99",
  "790ff0ac-ef4b-490e-9b95-89f9249b8f51": "$14.99"
}
//////////////////////////////////////////////////////////////////////////////////

/**
 * Creates a subscription for a specified universe.
 * @endpoint POST /v1/experiences/{universeId}/experience-subscriptions
 * 
 * @param universeId The id of the universe to create a subscription for.
 * @param name The subscription name.
 * @param description The subscription description.
 * @param type The subscription type.
 * @param price The subscription price.
 * 
 * @example
 * const { data } = await ClassicSubscriptionsApi.createSubscription({
     universeId: 5795192361, name: "Cool Subscription", description: "Lorem ipsum dolor sit amet.", type: "Durable", price: "$7.99"
   })
 * @exampleData {"id":"8517167288618319987","universeId":5795192361,"shopId":5795481121,"name":"Cool Subscription","description":"Lorem ipsum dolor sit amet.","imageAssetId":0,"periodType":"Monthly","developerSubscriptionProductType":"Durable","productStatusType":1,"initialActivationTimestampMs":null,"createdTimestampMs":1713322834753,"updatedTimestampMs":1713322834753}
 * @exampleRawBody {"developerSubscription":{"id":"8517167288618319987","universeId":5795192361,"shopId":5795481121,"name":"Cool Subscription","description":"Lorem ipsum dolor sit amet.","imageAssetId":0,"periodType":1,"developerSubscriptionProductType":3,"productStatusType":1,"initialActivationTimestampMs":null,"createdTimestampMs":1713322834753,"updatedTimestampMs":1713322834753}}
 */
export const createSubscription = createApiMethod(async <
  UniverseId extends Identifier, Name extends string, Description extends string, Type extends SubscriptionType
>(
  { universeId, name, description, type, price }: { universeId: UniverseId, name: Name, description: Description, type: Type, price: SubsriptionPrice }
): ApiMethod<RawCreateSubscriptionData<UniverseId, Name, Description, Type>, PrettifiedCreateSubscriptionData<UniverseId, Name, Description, Type>> => ({
  path: `/v1/experiences/${universeId}/experience-subscriptions`,
  method: "POST",
  body: { productName: name, productDescription: description, productType: subscriptionTypeToId[type], basePriceId: subscriptionPriceToId[price] },
  name: "createSubscription",

  formatRawDataFn: ({ developerSubscription }) => (cloneAndMutateObject<
    RawCreateSubscriptionData<UniverseId, Name, Description, Type>["developerSubscription"],
    PrettifiedCreateSubscriptionData<UniverseId, Name, Description, Type>
  >(developerSubscription, obj => {
    obj.periodType = "Monthly"
    obj.developerSubscriptionProductType = subsriptionIdToType[obj.developerSubscriptionProductType as any] as any
  }))

}))


/**
 * Sets the icon of a subscription.
 * @endpoint POST /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId}/upload-image
 * 
 * @param universeId The id of the universe to create a subscription for.
 * 
 * @example
 * const { data:success } = await ClassicSubscriptionsApi.setSubscriptionIcon({
       universeId: 5795192361, subscriptionId: "3656348821302804581", actingUserId: 45348281, icon: "./src/image.png"
   })
 * @exampleData true
 * @exampleRawBody { status: true }
 */
export const setSubscriptionIcon = createApiMethod(async (
  { universeId, subscriptionId, actingUserId, icon }: { universeId: Identifier, subscriptionId: Identifier, actingUserId: Identifier, icon: string | File }
): ApiMethod<{ status: boolean }, boolean> => ({
  path: `/v1/experiences/${universeId}/experience-subscriptions/${subscriptionId}/upload-image`,
  method: "POST",
  formData: formDataBuilder()
    .append("ActingUserId", actingUserId.toString())
    .append("ImageFile", typeof icon == "string" ? new File([ new Blob([ await readFile(icon) ]) ], "ImageFile") : icon),
  name: "setSubscriptionIcon",

  formatRawDataFn: ({ status }) => status
}))


/**
 * Lists subscriptions for a specified universe.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions
 * 
 * @param universeId The id of the universe to create a subscription for.
 * @param resultsPerPage The number of results to show per page.
 * @param cursor A pagination cursor for the next or previous page.
 * 
 * @exampleconst { data:subscriptions } = await ClassicSubscriptionsApi.subscriptionsForUniverse({ universeId: 5795192361 })
 * @exampleData [{"id":"3656348821302804581","universeId":5795192361,"name":"Testing","description":"Lorem ipsum dolor sit amet.","imageAssetId":17095512680,"periodType":"Monthly","productType":"Consumable","productStatusType":1,"basePriceId":"919c5912-7de8-413c-9756-d4265b3cbd3a","initialActivationTimestampMs":0,"createdTimestampMs":1712783803427,"updatedTimestampMs":1712783804047,"basePrice":"$2.99"}]
 * @exampleRawBody {"developerSubscriptions":[{"id":"3656348821302804581","universeId":5795192361,"name":"Testing","description":"Lorem ipsum dolor sit amet.","imageAssetId":17095512680,"periodType":1,"productType":1,"productStatusType":1,"basePriceId":"919c5912-7de8-413c-9756-d4265b3cbd3a","initialActivationTimestampMs":0,"createdTimestampMs":1712783803427,"updatedTimestampMs":1712783804047}],"previousCursor":"id_2Ac8yvfXhfKwAZQ","nextCursor":"id_2Ac8yvfXhfKwAZQ","hasMoreResults":false}
 */
export const subscriptionsForUniverse = createApiMethod(async <UniverseId extends Identifier>(
  { universeId, resultsPerPage, cursor }: { universeId: UniverseId, resultsPerPage?: number, cursor?: string }
): ApiMethod<RawSubscriptionsForUniverseData<UniverseId>, PrettifiedSubscriptionsForUniverseData<UniverseId>> => ({
  path: `/v1/experiences/${universeId}/experience-subscriptions`,
  method: "GET",
  searchParams: { ResultsPerPage: resultsPerPage, Cursor: cursor },
  name: "subscriptionsForUniverse",

  formatRawDataFn: ({ developerSubscriptions }) => (cloneAndMutateObject<
    RawSubscriptionsForUniverseData<UniverseId>["developerSubscriptions"], PrettifiedSubscriptionsForUniverseData<UniverseId>
  >(developerSubscriptions, obj => {
    obj.forEach((subscription) => {
      subscription.periodType = "Monthly"
      subscription.basePrice = subscriptionIdToPrice[subscription.basePriceId]
      subscription.productType = subsriptionIdToType[subscription.productType as any as number] as typeof subscription["productType"]
    })
  })),

  getCursorsFn: ({ previousCursor, nextCursor }) => ([ previousCursor, nextCursor ])
}))


/**
 * Gets information about a subscription for a specified universe.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId}
 * 
 * @param universeId The id of the universe.
 * @param subscriptionId The id of the subscription to get.
 * 
 * @example const { data:subscription } =  await ClassicSubscriptionsApi.subscriptionInfo({ universeId: 5795192361, subscriptionId: "3656348821302804581" });
 * @exampleData {"id":"3656348821302804581","universeId":5795192361,"name":"Testing","description":"Lorem ipsum dolor sit amet.","imageAssetId":17175811135,"periodType":"Monthly","productType":"Consumable","productStatusType":1,"basePriceId":"919c5912-7de8-413c-9756-d4265b3cbd3a","initialActivationTimestampMs":0,"createdTimestampMs":1712783803427,"updatedTimestampMs":1713318949692,"basePrice":"$2.99"}
 * @exampleRawBody {"id":"3656348821302804581","universeId":5795192361,"name":"Testing","description":"Lorem ipsum dolor sit amet.","imageAssetId":17175811135,"periodType":1,"productType":1,"productStatusType":1,"basePriceId":"919c5912-7de8-413c-9756-d4265b3cbd3a","initialActivationTimestampMs":0,"createdTimestampMs":1712783803427,"updatedTimestampMs":1713318949692}
 */
export const subscriptionInfo = createApiMethod(async <UniverseId extends Identifier, SubscriptionId extends Identifier>(
  { universeId, subscriptionId }: { universeId: UniverseId, subscriptionId: SubscriptionId }
): ApiMethod<RawSubscriptionInfoData<UniverseId, SubscriptionId>, PrettifiedSubscriptionInfoData<UniverseId, SubscriptionId>> => ({
  path: `/v1/experiences/${universeId}/experience-subscriptions/${subscriptionId}`,
  method: "GET",
  name: "subscriptionInfo",

  formatRawDataFn: (rawData) => (cloneAndMutateObject<
    RawSubscriptionInfoData<UniverseId, SubscriptionId>, PrettifiedSubscriptionInfoData<UniverseId, SubscriptionId>
  >(rawData, obj => {
    obj.periodType = "Monthly"
    obj.basePrice = subscriptionIdToPrice[obj.basePriceId]
    obj.productType = subsriptionIdToType[obj.productType as any as number] as typeof obj["productType"]
  }))
}))

/**
 * Gets all of the availible price tiers that a universe's subscriptions can have.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions/prices
 * 
 * @param universeId The id of the universe.
 * 
 * @example const { data:tiers } = await ClassicSubscriptionsApi.subscriptionsPriceTiersForUniverse({ universeId: 5795192361 })
 * @exampleData {"919c5912-7de8-413c-9756-d4265b3cbd3a":"$2.99","c0516080-fc44-42a2-bc23-3c6dbfd0772d":"$4.99","75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a":"$7.99","1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7":"$9.99","790ff0ac-ef4b-490e-9b95-89f9249b8f51":"$14.99"}
 * @exampleRawBody {"priceTierPrices":{"919c5912-7de8-413c-9756-d4265b3cbd3a":{"units":2,"cents":99},"c0516080-fc44-42a2-bc23-3c6dbfd0772d":{"units":4,"cents":99},"75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a":{"units":7,"cents":99},"1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7":{"units":9,"cents":99},"790ff0ac-ef4b-490e-9b95-89f9249b8f51":{"units":14,"cents":99}}}
 */
export const subscriptionsPriceTiersForUniverse = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<RawSubscriptionsPriceTiersForUniverseData, PrettifiedSubscriptionsPriceTiersForUniverseData> => ({
  path: `/v1/experiences/${universeId}/experience-subscriptions/prices`,
  method: "GET",
  name: "subscriptionsPriceTiersForUniverse",

  formatRawDataFn: (({ priceTierPrices }) => cloneAndMutateObject<
    RawSubscriptionsPriceTiersForUniverseData["priceTierPrices"], PrettifiedSubscriptionsPriceTiersForUniverseData
  >(priceTierPrices, obj => {
    for (const key in priceTierPrices) {
      const { units, cents } = priceTierPrices[key] as typeof priceTierPrices[number]
      obj[key] = `$${units}.${cents}`
    }
  }))
}))


/**
 * Gets permissions the authenticated user can perform of a specified universes subscriptions.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions/permission
 * 
 * @param universeId The id of the universe to get subscription permissions for.
 * 
 * @example const { data:perms } = await ClassicSubscriptionsApi.authenticatedUserSubscriptionsPermissionsForUniverse({ universeId: 5795192361 })
 * @exampleData { canUserEditExperienceSubscription: true }
 * @exampleRawBody { canUserEditExperienceSubscription: true }
 */
export const authenticatedUserSubscriptionsPermissionsForUniverse = createApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<AuthenticatedUserSubscriptionsPermissionsForUniverseData> => ({
  path: `/v1/experiences/${universeId}/experience-subscriptions/permission`,
  method: "GET",
  name: "authenticatedUserSubscriptionsPermissionsForUniverse"
}))