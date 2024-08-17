import type { ISODateTime, UnionPrettify } from "typeforge"

type ObjectValues<Obj extends Record<any, any>> = UnionPrettify<Obj[keyof Obj]>

type UserSubscriptionsData<TemporalType> = {
  subscriptionProductModel: ObjectValues<
    {
      [StipendAmount in 450 | 1000 | 2200]: {
        premiumFeatureId: number,
        subscriptionTypeName: `RobloxPremium${StipendAmount}`
        robuxStipendAmount: StipendAmount,
        isLifetime: boolean, 
        expiration: TemporalType,
        renewal: TemporalType,
        created: TemporalType,
        purchasePlatform: "isIosApp" | string,
        subscriptionName: `Roblox Premium ${StipendAmount}`
      }
    }
  >
}

export type RawUserSubscriptionsData = UserSubscriptionsData<ISODateTime>
export type PrettifiedUserSubscriptionsData = UserSubscriptionsData<Date>



