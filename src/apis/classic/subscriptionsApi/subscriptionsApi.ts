// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse } from "../../apis.utils";

import * as fs from "fs"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { AuthenticatedUserSubscriptionsPermissionsForUniverseData, FormattedCreateSubscriptionData, FormattedSubscriptionInfoData, FormattedSubscriptionsForUniverseData, FormattedSubscriptionsPriceTiersForUniverseData, RawCreateSubscriptionData, RawSubscriptionInfoData, RawSubscriptionsForUniverseData, RawSubscriptionsPriceTiersForUniverseData, SubscriptionBasePriceId, SubscriptionType, SubsriptionPrice } from "./subscriptionsApi.types"
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { ApiMethodResponse } from "../../apis.types"
import { cloneAndMutateObject } from "../../../utils";
import type { Identifier } from "../../../utils/utils.types";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://apis.roblox.com/experience-subscriptions"
const apiName = "ClassicSubscriptionsApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = [  ]

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
 * const { data:newSubscription } = await ClassicSubscriptionsApi.createSubscription(
     4383627529, "Amazing Subscription", "Lorem Ipsum",
     "Currency", "$14.99"
   )
 * @exampleData { id: "2129699544299733115", universeId: 4383627529, shopId: 4383760479, name: "Amazing Subscription", description: "Lorem Ipsum", imageAssetId: 0, periodType: "Monthly", developerSubscriptionProductType: "Currency", productStatusType: 1, createdTimestampMs: 1695244795883, updatedTimestampMs: 1695244795883 }
 * @exampleRawBody { developerSubscription: { id: "2129699544299733115", universeId: 4383627529, shopId: 4383760479, name: "Amazing Subscription", description: "Lorem Ipsum", imageAssetId: 0, periodType: 1, developerSubscriptionProductType: 2, productStatusType: 1, createdTimestampMs: 1695244795883, updatedTimestampMs: 1695244795883 } }
 */
export async function createSubscription<
  UniverseId extends Identifier, Name extends string, Description extends string, Type extends SubscriptionType
>(
  this: ThisAllOverrides, universeId: UniverseId, name: Name, description: Description, type: Type, price: SubsriptionPrice
): ApiMethodResponse<
  RawCreateSubscriptionData<UniverseId, Name, Description, Type>, FormattedCreateSubscriptionData<UniverseId, Name, Description, Type>
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.post<
      RawCreateSubscriptionData<UniverseId, Name, Description, Type>
    >(
      `${baseUrl}/v1/experiences/${universeId}/experience-subscriptions`, {
        body: {
          productName: name, productDescription: description,
          productType: subscriptionTypeToId[type], basePriceId: subscriptionPriceToId[price]
        },
        apiName, methodName: "createSubscription", overrides
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawCreateSubscriptionData<UniverseId, Name, Description, Type>["developerSubscription"],
      FormattedCreateSubscriptionData<UniverseId, Name, Description, Type>
    >(rawBody.developerSubscription, obj => {
      obj.periodType = "Monthly"
      obj.developerSubscriptionProductType = subsriptionIdToType[obj.developerSubscriptionProductType as any] as any
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}


/**
 * Sets the icon of a subscription.
 * @endpoint POST /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId}/upload-image
 * 
 * @param universeId The id of the universe to create a subscription for.
 * 
 * @example
 * const { data:success } = await ClassicSubscriptionsApi.setSubscriptionIcon(
     4383627529, "2129699544299733115", 45348281, fs.readFileSync("./newGroupIcon.png")
   )
 * @exampleData true
 * @exampleRawBody { status: true }
 */
  export async function setSubscriptionIcon(
  this: ThisAllOverrides, universeId: Identifier, subscriptionId: Identifier, actingUserId: Identifier, icon: string | Buffer
): ApiMethodResponse<
  { status: boolean }, boolean
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.post<{ status: boolean }>(
      `${baseUrl}/v1/experiences/${universeId}/experience-subscriptions/${subscriptionId}/upload-image`, {
        formData: { ActingUserId: actingUserId, ImageFile: new Blob([ typeof icon == "string" ? fs.readFileSync(icon) : icon ]) },
        apiName, methodName: "setSubscriptionIcon", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody.status, response, cacheMetadata })
  })
}


/**
 * Lists subscriptions for a specified universe.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions
 * 
 * @param universeId The id of the universe to create a subscription for.
 * @param resultsPerPage The number of results to show per page.
 * @param cursor A pagination cursor for the next or previous page.
 * 
 * @example const { rawBody:subscriptions } = await ClassicSubscriptionsApi.subscriptionsForUniverse(4383627529)
 * @exampleData [ { id: "6209937874256396403", universeId: 4383627529, name: "Amazing Subscription", description: "Lorem Ipsum", imageAssetId: 0, periodType: "Monthly", productType: "Currency", productStatusType: 1, basePriceId: "790ff0ac-ef4b-490e-9b95-89f9249b8f51", createdTimestampMs: 1695165195861, updatedTimestampMs: 1695165195861, basePrice: "$14.99" } ]
 * @exampleRawBody { developerSubscriptions: [ { id: "6209937874256396403", universeId: 4383627529, name: "Amazing Subscription", description: "Lorem Ipsum", imageAssetId: 0, periodType: 1, productType: 2, productStatusType: 1, basePriceId: "790ff0ac-ef4b-490e-9b95-89f9249b8f51", createdTimestampMs: 1695165195861, updatedTimestampMs: 1695165195861 } ], previousCursor: "id_2Ac8aYv8wUEwAZg", nextCursor: "id_2Ac9WLiGYUEwAcw", hasMoreResults: false }
 */
export async function subscriptionsForUniverse<UniverseId extends Identifier>(
  this: ThisAllOverrides, universeId: UniverseId, resultsPerPage?: number, cursor?: string
): ApiMethodResponse<
  RawSubscriptionsForUniverseData<UniverseId>, FormattedSubscriptionsForUniverseData<UniverseId>, "PAGINATED"
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawSubscriptionsForUniverseData<UniverseId>>(
      `${baseUrl}/v1/experiences/${universeId}/experience-subscriptions`, {
        searchParams: { ResultsPerPage: resultsPerPage, Cursor: cursor },
        apiName, methodName: "subscriptionsForUniverse", overrides
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawSubscriptionsForUniverseData<UniverseId>["developerSubscriptions"], FormattedSubscriptionsForUniverseData<UniverseId>
    >(rawBody.developerSubscriptions, obj => {
      obj.forEach(subscription => {
        subscription.periodType = "Monthly"
        subscription.basePrice = subscriptionIdToPrice[subscription.basePriceId]
        subscription.productType = subsriptionIdToType[subscription.productType as any as number]
      })
    })

    return buildResponse(
      { rawBody, data: getFormattedData, response, cacheMetadata, cursors: { previous: rawBody.previousCursor, next: rawBody.nextCursor } }
    )
  })
}


/**
 * Gets information about a subscription for a specified universe.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId}
 * 
 * @param universeId The id of the universe.
 * @param subscriptionId The id of the subscription to get.
 * 
 * @example const { data:subscription } = await ClassicSubscriptionsApi.subscriptionInfo(4383627529, "6209937874256396403")
 * @exampleData { id: '6209937874256396403', universeId: 4383627529, name: 'Amazing Subscription', description: 'Lorem Ipsum', imageAssetId: 0, periodType: 'Monthly', productType: 'Currency', productStatusType: 1, basePriceId: '790ff0ac-ef4b-490e-9b95-89f9249b8f51', createdTimestampMs: 1695165195861, updatedTimestampMs: 1695165195861, basePrice: '$14.99' }
 * @exampleRawBody { id: '6209937874256396403', universeId: 4383627529, name: 'Amazing Subscription',  description: 'Lorem Ipsum', imageAssetId: 0, periodType: 1, productType: 2, productStatusType: 1, basePriceId: '790ff0ac-ef4b-490e-9b95-89f9249b8f51', createdTimestampMs: 1695165195861, updatedTimestampMs: 1695165195861 }
 */
export async function subscriptionInfo<
  UniverseId extends Identifier, SubscriptionId extends `${number}`
>(this: ThisAllOverrides, universeId: UniverseId, subscriptionId: SubscriptionId): ApiMethodResponse<
  RawSubscriptionInfoData<UniverseId, SubscriptionId>, FormattedSubscriptionInfoData<UniverseId, SubscriptionId>
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawSubscriptionInfoData<UniverseId, SubscriptionId>>(
      `${baseUrl}/v1/experiences/${universeId}/experience-subscriptions/${subscriptionId}`, {
        apiName, methodName: "subscriptionInfo", overrides
      }
    )

    const getFormattedData = () => cloneAndMutateObject<
      RawSubscriptionInfoData<UniverseId, SubscriptionId>, FormattedSubscriptionInfoData<UniverseId, SubscriptionId>
    >(rawBody, obj => {
      obj.periodType = "Monthly"
      obj.basePrice = subscriptionIdToPrice[obj.basePriceId]
      obj.productType = subsriptionIdToType[obj.productType as any as number]
    })

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}


/**
 * Gets all of the availible price tiers that a universe's subscriptions can have.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions/prices
 * 
 * @param universeId The id of the universe.
 * @param subscriptionId The id of the subscription to get.
 * 
 * @example const { data:tiers } = await ClassicSubscriptionsApi.subscriptionsPriceTiersForUniverse(4383627529)
 * @exampleData { '919c5912-7de8-413c-9756-d4265b3cbd3a': { units: 2, cents: 99 }, 'c0516080-fc44-42a2-bc23-3c6dbfd0772d': { units: 4, cents: 99 }, '75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a': { units: 7, cents: 99 }, '1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7': { units: 9, cents: 99 }, '790ff0ac-ef4b-490e-9b95-89f9249b8f51': { units: 14, cents: 99 } } 
 * @exampleRawBody { priceTierPrices: { '919c5912-7de8-413c-9756-d4265b3cbd3a': { units: 2, cents: 99 }, 'c0516080-fc44-42a2-bc23-3c6dbfd0772d': { units: 4, cents: 99 }, '75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a': { units: 7, cents: 99 }, '1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7': { units: 9, cents: 99 }, '790ff0ac-ef4b-490e-9b95-89f9249b8f51': { units: 14, cents: 99 } } }
 */
export async function subscriptionsPriceTiersForUniverse<UniverseId extends number>(
  this: ThisAllOverrides, universeId: UniverseId
): ApiMethodResponse<
  RawSubscriptionsPriceTiersForUniverseData, FormattedSubscriptionsPriceTiersForUniverseData
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<RawSubscriptionsPriceTiersForUniverseData>(
      `${baseUrl}/v1/experiences/${universeId}/experience-subscriptions/prices`, {
        apiName, methodName: "subscriptionsPriceTiersForUniverse", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody.priceTierPrices, response, cacheMetadata })
  })
}


/**
 * Gets permissions the authenticated user can perform of a specified universes subscriptions.
 * @endpoint GET /v1/experiences/{universeId}/experience-subscriptions/permission
 * 
 * @param universeId The id of the universe to get subscription permissions for.
 * 
 * @example const { data:perms } = await ClassicSubscriptionsApi.authenticatedUserSubscriptionsPermissionsForUniverse(4383627529)
 * @exampleData { canUserEditExperienceSubscription: true }
 * @exampleRawBody { canUserEditExperienceSubscription: true }
 */
export async function authenticatedUserSubscriptionsPermissionsForUniverse(
  this: ThisAllOverrides, universeId: Identifier
): ApiMethodResponse<
  AuthenticatedUserSubscriptionsPermissionsForUniverseData
> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {

    const { rawBody, response, cacheMetadata } = await this.http.get<AuthenticatedUserSubscriptionsPermissionsForUniverseData>(
      `${baseUrl}/v1/experiences/${universeId}/experience-subscriptions/permission`, {
        apiName, methodName: "authenticatedUserSubscriptionsPermissionsForUniverse", overrides
      }
    )

    return buildResponse({ rawBody, data: rawBody, response, cacheMetadata })
  })
}



