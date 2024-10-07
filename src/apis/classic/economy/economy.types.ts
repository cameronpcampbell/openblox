import type { Identifier, ISODateTime, ObjectEither, ObjectPrettify, UnionPrettify } from "typeforge"


// [ Resale ] ///////////////////////////////////////////////////////////////////
export type AssetResellerData = ObjectPrettify<{
  userAssetId: Identifier,
  seller: {
    id: Identifier,
    type: "User" | "Group",
    name: string
  },
  price: number,
  serialNumber: number
}>


// GET /v1/assets/{assetId}/resale-data -----------------------------------------
export type AssetResaleData = {
  assetStock: number | null,
  sales: number,
  numberRemaining: number | null,
  recentAveragePrice: number,
  originalPrice: number | null,
  priceDataPoints: {
    value: number,
    date: ISODateTime
  }[],
  volumeDataPoints: {
    value: number,
    date: ISODateTime
  }[]
}
// ------------------------------------------------------------------------------


// GET /v1/assets/{assetId}/resellers -------------------------------------------
export type RawAssetResellersData = {
  previousPageCursor: string | null,
  nextPageCursor: string | null,
  data: AssetResellerData[]
}
// ------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////


// [ Cash Out ] /////////////////////////////////////////////////////////////////
// GET /v1/developer-exchange/info ----------------------------------------------
export type AuthedUserDevExCashOutInfoData = {
  hasCurrencyOperationError: boolean,
  currencyOperationErrorMessage: string,
  showOnlyExchangeRates: boolean,
  meetsMembershipRequirements: boolean,
  emailIsVerified: boolean,
  isImbursementBlacklistUser: boolean,
  canProceedToCashout: boolean,
  showProgressBar: boolean,
  percentRobux: number,
  minRobuxToCashOut: number,
  maxRobuxCanCashOut: number,
  lastImbursementStatus: string,
  lastImbursementSubmissionDate: ISODateTime | null,
  conversionPercent: number
}
// ------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////


// [ Revenue Summary ] //////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}/revenue/summary/{timeFrame} -------------------------
export type GroupRevenueSummaryData = {
  recurringRobuxStipend: number,
  itemSaleRobux: number,
  purchasedRobux: number,
  tradeSystemRobux: number,
  pendingRobux: number,
  groupPayoutRobux: number,
  individualToGroupRobux: number,
  premiumPayouts: number,
  groupPremiumPayouts: number,
  adjustmentRobux: number,
  immersiveAdPayouts: number,
  subscriptionPayouts: number,
  subscriptionClawbacks: number,
  isShowImmersiveAdPayoutSummaryOnZeroEnabled: false,
  commissionRobux: number,
  publishingAdvanceRebates: number,
}
// ------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////


// [ Group Payouts ] ////////////////////////////////////////////////////////////
// GET /v1/groups/{groupId}/users-payout-eligibility -------------------------

export type RawUserGroupPayoutEligibilityData<UserId extends Identifier> = {
  usersGroupPayoutEligibility: {
    [Key in UserId]: 'Undefined' | 'Eligible' | 'NotInGroup' | 'PayoutRestricted' | undefined
  }
}

export type PrettifiedUserGroupPayoutEligibilityData<UserId extends Identifier> = {
  [Key in UserId]: 'Undefined' | 'Eligible' | 'NotInGroup' | 'PayoutRestricted' | undefined
}

/////////////////////////////////////////////////////////////////////////////////


// [ Transaction History ] //////////////////////////////////////////////////////
// GET /v2/groups/${groupId}/transactions ---------------------------------------
export type GroupTransactionType = UnionPrettify<"Sale" | "PublishingAdvanceRebates">

type GroupSaleTransaction = ObjectPrettify<{
  id: Identifier,
  idHash: string,
  created: ISODateTime,
  isPending: boolean,
  agent: {
    id: Identifier,
    type: "User" | "Group",
    name: string
  },
  details: {
    id: Identifier,
    name: string,
  } & ObjectEither<
    {
      type: "DeveloperProduct" | "GamePass",
      place: {
        placeId: Identifier,
        universeId: Identifier,
        name: string
      }
    },
    {
      type: "Asset"
    }
  > & {
    currency: {
      amount: number,
      type: "Robux"
    },
    purchaseToken: string | null
  }
}>

export type RawGroupTransactionHistoryData<Type extends GroupTransactionType> = {
  previousPageCursor?: string | null,
  nextPageCursor?: string | null,
  data: Type extends "Sale" ? GroupSaleTransaction[] : any[]
}

export type PrettifiedGroupTransactionHistoryData<Type extends GroupTransactionType> = Type extends "Sale" ? GroupSaleTransaction[] : any[]
// ------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////



// [ Misc ] /////////////////////////////////////////////////////////////////////
// GET /v2/metadata -------------------------------------------------------------
export type AuthedUserEconomyMetadataData = {
  isMarketPlaceEnabled: boolean,
  isItemsXchangeEnabled: boolean,
  isGroupSalesAmountTooltipEnabled: boolean,
  isTransactionsRecordsDownloadEnabled: boolean,
  transactionRecordsDownloadEarliestYearDiff: number,
  isCommissionRecordsDownloadEnabled: boolean,
  isGroupCommissionsPageEnabled: boolean,
  isPublishingAdvanceRebatePageEnabled: boolean,
}
// ------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////