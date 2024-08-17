import type { Identifier, ObjectPrettify, UnionPrettify } from "typeforge"


export type SubscriptionType = UnionPrettify<"Durable" | "Consumable" | "Currency">
export type SubsriptionPrice = UnionPrettify<"$2.99" | "$4.99" | "$7.99" | "$9.99" | "$14.99">

export type SubscriptionBasePriceId = UnionPrettify<"919c5912-7de8-413c-9756-d4265b3cbd3a" | "c0516080-fc44-42a2-bc23-3c6dbfd0772d" | "75c782ff-9d8b-4cf0-b3d8-64dd0ec4676a" | "1adf5d0a-eabb-4d5d-a9e7-d9ab28dcb7c7" | "790ff0ac-ef4b-490e-9b95-89f9249b8f51">

type SubscriptionTypeToId<Type extends SubscriptionType> = (
  Type extends "Durable" ? 3 :
  Type extends "Currency" ? 2 :
  Type extends "Consumable" ? 1 :
  never
)

// POST /v1/experiences/{universeId}/experience-subscriptions --------------------------------------------------------
export type RawCreateSubscriptionData<
  UniverseId extends Identifier, Name extends string, Description extends string, Type extends SubscriptionType
> = ObjectPrettify<{
  developerSubscription: {
      id: Identifier,
      universeId: UniverseId,
      shopId: number,
      name: Name,
      description: Description,
      imageAssetId: number,
      periodType: number,
      developerSubscriptionProductType: SubscriptionTypeToId<Type>,
      productStatusType: number,
      initialActivationTimestampMs: number | null,
      createdTimestampMs: number,
      updatedTimestampMs: number
  }
}>

export type PrettifiedCreateSubscriptionData<
  UniverseId extends Identifier, Name extends string, Description extends string, Type extends SubscriptionType
> = ObjectPrettify<{
  id: Identifier,
  universeId: UniverseId,
  shopId: number,
  name: Name,
  description: Description,
  imageAssetId: number,
  periodType: "Monthly",
  developerSubscriptionProductType: Type,
  productStatusType: number,
  initialActivationTimestampMs: number | null,
  createdTimestampMs: number,
  updatedTimestampMs: number
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/experiences/{universeId}/experience-subscriptions ---------------------------------------------------------
export type RawSubscriptionsForUniverseData<UniverseId extends Identifier> = ObjectPrettify<{
  developerSubscriptions: {
    id: Identifier,
    universeId: UniverseId,
    name: string,
    description: string,
    imageAssetId: Identifier,
    periodType: "Monthly",
    productType: number,
    productStatusType: number,
    basePriceId: SubscriptionBasePriceId,
    initialActivationTimestampMs: number,
    createdTimestampMs: number,
    updatedTimestampMs: number,
  },
  previousCursor: string,
  nextCursor: string,
  hasMoreResults: false
}>

export type PrettifiedSubscriptionsForUniverseData<UniverseId extends Identifier> = ObjectPrettify<{
  id: Identifier,
  universeId: UniverseId,
  name: string,
  description: string,
  imageAssetId: Identifier,
  periodType: "Monthly",
  productType: SubscriptionType,
  productStatusType: number,
  basePrice: SubsriptionPrice,
  basePriceId: SubscriptionBasePriceId,
  initialActivationTimestampMs: number,
  createdTimestampMs: number,
  updatedTimestampMs: number,
}>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId} ----------------------------------------
export type RawSubscriptionInfoData<UniverseId extends Identifier, SubscriptionId extends Identifier> = ObjectPrettify<{
  id: SubscriptionId,
  universeId: UniverseId,
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

export type PrettifiedSubscriptionInfoData<UniverseId extends Identifier, SubscriptionId extends Identifier> = ObjectPrettify<{
  id: SubscriptionId,
  universeId: UniverseId,
  name: string,
  description: string,
  imageAssetId: number,
  periodType: "Monthly",
  productType: UnionPrettify<SubscriptionType>,
  productStatusType: number,
  basePriceId: UnionPrettify<SubscriptionBasePriceId>,
  basePrice: UnionPrettify<SubsriptionPrice>,
  createdTimestampMs: number,
  updatedTimestampMs: number
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/experiences/{universeId}/experience-subscriptions/prices --------------------------------------------------
export type RawSubscriptionsPriceTiersForUniverseData = ObjectPrettify<{
  priceTierPrices: {
    [Key: string]: { units: number, cents: number }
  }
}>

export type PrettifiedSubscriptionsPriceTiersForUniverseData = ObjectPrettify<{ [Key: string]: `$${number}.${number}` }>
// -------------------------------------------------------------------------------------------------------------------

// GET /v1/experiences/{universeId}/experience-subscriptions/permission ----------------------------------------------
export type AuthenticatedUserSubscriptionsPermissionsForUniverseData = ObjectPrettify<{
  canUserEditExperienceSubscription: boolean
}>
// -------------------------------------------------------------------------------------------------------------------