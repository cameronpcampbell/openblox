import type { ObjectPrettify, ObjectEither, Identifier, ISODateTime } from "typeforge"


// GET /v2/universes/{universeId}/subscription-products/{subscriptionProductId}/subscriptions/{subscriptionId} -------
type SubscriptionInfo_State = "STATE_UNSPECIFIED" | "SUBSCRIBED_WILL_RENEW" | "SUBSCRIBED_WILL_NOT_RENEW" | "SUBSCRIBED_RENEWAL_PAYMENT_PENDING" | "EXPIRED"

type SubscriptionInfo_ExpirationReason = "EXPIRATION_REASON_UNSPECIFIED" | "PRODUCT_INACTIVE" | "PRODUCT_DELETED" | "SUBSCRIBER_CANCELLED" | "SUBSCRIBER_REFUNDED" | "LAPSED"

type SubscriptionInfo_PurchasePlatform = "PURCHASE_PLATFORM_UNSPECIFIED" | "DESKTOP" | "MOBILE"

type SubscriptionInfo_PaymentProvider = "PAYMENT_PROVIDER_UNSPECIFIED" | "STRIPE" | "APPLE" | "GOOGLE" | "ROBLOX_CREDIT"

type SubscriptionInfoData<UniverseId extends Identifier, SubscriptionProductId extends string, SubscriptionId extends Identifier, TemporalType> = ObjectPrettify<{
  path: `universes/${UniverseId}/subscription-products/${SubscriptionProductId}/subscriptions/${SubscriptionId}`,
  createTime?: TemporalType,
  updateTime?: TemporalType,
  lastBillingTime?: TemporalType,
  state: SubscriptionInfo_State,
  expirationDetails?: {
   reason: SubscriptionInfo_ExpirationReason
  },
  purchasePlatform: SubscriptionInfo_PurchasePlatform,
  paymentProvider: SubscriptionInfo_PaymentProvider,
  user?: `users/${SubscriptionId}`
} & ObjectEither<
  { willRenew: true, nextRenewTime: TemporalType },
  { willRenew: false }
> & ObjectEither<
{ active: true, expireTime: TemporalType },
{ active: false }
>>

export type RawSubscriptionInfoData<UniverseId extends Identifier, SubscriptionProductId extends string, SubscriptionId extends Identifier> = (
  SubscriptionInfoData<UniverseId, SubscriptionProductId, SubscriptionId, ISODateTime>
)

export type PrettifiedSubscriptionInfoData<UniverseId extends Identifier, SubscriptionProductId extends string, SubscriptionId extends Identifier> = (
  SubscriptionInfoData<UniverseId, SubscriptionProductId, SubscriptionId, Date>
)
// -------------------------------------------------------------------------------------------------------------------