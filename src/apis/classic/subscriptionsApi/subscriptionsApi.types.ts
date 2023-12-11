import { Identifier, IdentifierToNumber, PrettifyKeyof, PrettifyUnion, UnionLength, UnionRange } from "../../../utils/utils.types"


export type SubscriptionType = "Durable" | "Consumable" | "Currency"
export type SubsriptionPrice = "$2.99" | "$4.99" | "$7.99" | "$9.99" | "$14.99"

export type SubscriptionBasePriceId = "919c5912-7de8-413c-9756-d4265b3cbd3a" | "c0516080-fc44-42a2-bc23-3c6dbfd0772d" | "75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a" | "1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7" | "790ff0ac-ef4b-490e-9b95-89f9249b8f51"

type SubscriptionTypeToId<Type extends SubscriptionType> = (
  Type extends "Durable" ? 3 :
  Type extends "Currency" ? 2 :
  Type extends "Consumable" ? 1 :
  never
)

// POST /v1/experiences/{universeId}/experience-subscriptions --------------------------------------------------------
export type RawCreateSubscriptionData<
UniverseId extends Identifier, Name extends string, Description extends string, Type extends SubscriptionType
> = PrettifyKeyof<{
  developerSubscription: {
      id: `${number}`,
      universeId: IdentifierToNumber<UniverseId>,
      shopId: number,
      name: Name,
      description: Description,
      imageAssetId: number,
      periodType: number,
      developerSubscriptionProductType: SubscriptionTypeToId<Type>,
      productStatusType: number,
      createdTimestampMs: number,
      updatedTimestampMs: number
  }
}>

export type FormattedCreateSubscriptionData<
  UniverseId extends Identifier, Name extends string, Description extends string, Type extends SubscriptionType
> = PrettifyKeyof<{
  id: `${number}`,
  universeId: IdentifierToNumber<UniverseId>,
  shopId: number,
  name: Name,
  description: Description,
  imageAssetId: number,
  periodType: "Monthly", // more periods expected to be coming later on.
  developerSubscriptionProductType: Type,
  productStatusType: number,
  createdTimestampMs: number,
  updatedTimestampMs: number
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/experiences/{universeId}/experience-subscriptions ---------------------------------------------------------
export type FormattedSubscriptionsForUniverseData<UniverseId extends Identifier> = PrettifyKeyof<{
    id: `${number}`,
    universeId: IdentifierToNumber<UniverseId>,
    name: string,
    description: string,
    imageAssetId: number,
    periodType: "Monthly",
    productType: PrettifyUnion<SubscriptionType>,
    productStatusType: number,
    basePrice: PrettifyUnion<SubsriptionPrice>,
    basePriceId: PrettifyUnion<SubscriptionBasePriceId>,
    createdTimestampMs: number,
    updatedTimestampMs: number,
}[]>

export type RawSubscriptionsForUniverseData<UniverseId extends Identifier> = PrettifyKeyof<{
  developerSubscriptions: {
    id: `${number}`,
    universeId: IdentifierToNumber<UniverseId>,
    name: string,
    description: string,
    imageAssetId: number,
    periodType: "Monthly",
    productType: number,
    productStatusType: number,
    basePriceId: SubscriptionBasePriceId,
    createdTimestampMs: number,
    updatedTimestampMs: number,
  },
  previousCursor: string,
  nextCursor: string,
  hasMoreResults: false
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId} ----------------------------------------
export type RawSubscriptionInfoData<UniverseId extends Identifier, SubscriptionId extends `${number}`> = PrettifyKeyof<{
  id: SubscriptionId,
  universeId: IdentifierToNumber<UniverseId>,
  name: string,
  description: string,
  imageAssetId: number,
  periodType: number,
  productType: number,
  productStatusType: number,
  basePriceId: SubscriptionBasePriceId,
  createdTimestampMs: number,
  updatedTimestampMs: number
}>

export type FormattedSubscriptionInfoData<UniverseId extends Identifier, SubscriptionId extends `${number}`> = PrettifyKeyof<{
  id: SubscriptionId,
  universeId: IdentifierToNumber<UniverseId>,
  name: string,
  description: string,
  imageAssetId: number,
  periodType: "Monthly",
  productType: PrettifyUnion<SubscriptionType>,
  productStatusType: number,
  basePriceId: PrettifyUnion<SubscriptionBasePriceId>,
  basePrice: PrettifyUnion<SubsriptionPrice>,
  createdTimestampMs: number,
  updatedTimestampMs: number
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/experiences/{universeId}/experience-subscriptions/prices --------------------------------------------------
export type FormattedSubscriptionsPriceTiersForUniverseData = PrettifyKeyof<{
  [Key: string]: { units: number, cents: number }
}>

export type RawSubscriptionsPriceTiersForUniverseData = PrettifyKeyof<{
  priceTierPrices: FormattedSubscriptionsPriceTiersForUniverseData
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/experiences/{universeId}/experience-subscriptions/permission ----------------------------------------------
export type AuthenticatedUserSubscriptionsPermissionsForUniverseData = PrettifyKeyof<{
  canUserEditExperienceSubscription: boolean
}>
// -------------------------------------------------------------------------------------------------------------------