// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayNonEmptyIfConst, ISODateTime, Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { AssetResaleData, AssetResellerData, AuthedUserDevExCashOutInfoData, AuthedUserEconomyMetadataData, GroupRevenueSummaryData, GroupTransactionType, PrettifiedGroupTransactionHistoryData, PrettifiedUserGroupPayoutEligibilityData, RawAssetResellersData, RawGroupTransactionHistoryData, RawUserGroupPayoutEligibilityData } from "./economy.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicEconomy", baseUrl: "https://economy.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// [ Resale ] ///////////////////////////////////////////////////////////////////
/**
 * Gets resale data for a particular asset.
 * @endpoint GET /v1/assets/{assetId}/resale-data
 * 
 * @param assetId The ID of the asset to get resale data for.
 * 
 * @example const { data:resaleData } = await ClassicEconomyApi.assetResaleData({ assetId: 1365767 })
 * @exampleData {"assetStock":null,"sales":11412,"numberRemaining":null,"recentAveragePrice":261565,"originalPrice":null,"priceDataPoints":[{"value":271997,"date":"2024-07-30T00:00:00Z"}],"volumeDataPoints":[{"value":2,"date":"2024-07-30T00:00:00Z"}]}
 * @exampleRawBody {"assetStock":null,"sales":11412,"numberRemaining":null,"recentAveragePrice":261565,"originalPrice":null,"priceDataPoints":[{"value":271997,"date":"2024-07-30T00:00:00Z"}],"volumeDataPoints":[{"value":2,"date":"2024-07-30T00:00:00Z"}]}
 */
export const assetResaleData = createApiMethod(async (
  { assetId }: { assetId: Identifier }
): ApiMethod<AssetResaleData> => ({
  method: "GET",
  path: `/v1/assets/${assetId}/resale-data`,
  name: `assetResaleData`,
}))


/**
 * Gets resellers for a particular asset.
 * @endpoint GET /v1/assets/{assetId}/resellers
 * 
 * @param assetId The ID of the asset to get resellers for.
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:resellers } = await ClassicEconomyApi.assetResellers({ assetId: 1365767 })
 * @exampleData [{"userAssetId":482809968,"seller":{"hasVerifiedBadge":false,"id":4159620298,"type":"User","name":"AnimatedObjects"},"price":280000,"serialNumber":null}]
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImFzc2V0SWQ6MTM2NTc2NyIsImNvdW50IjoxMH0KYTlmMDVlNGMxZGYwMDMwMjAwOWQ5ODFjMzk5MTY2OWJmNDU1MTljNDQ2OWEzZTZmMGI2NzE0NTgwOWE4NWQzZQ==","data":[{"userAssetId":482809968,"seller":{"hasVerifiedBadge":false,"id":4159620298,"type":"User","name":"AnimatedObjects"},"price":280000,"serialNumber":null}]}
 */
export const assetResellers = createApiMethod(async (
  { assetId, limit, cursor }: { assetId: Identifier, limit?: 10 | 25 | 50 | 100, cursor?: string }
): ApiMethod<RawAssetResellersData, AssetResellerData[]> => ({
  method: "GET",
  path: `/v1/assets/${assetId}/resellers`,
  searchParams: { limit, cursor },
  name: `assetResellers`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets resellable copies of an asset that the authenticated user owns.
 * @endpoint GET /v1/assets/{assetId}/users/{userId}/resellable-copies
 * 
 * @param userId The ID of the authenticated user.
 * @param assetId The ID of the asset to get resellable copies for.
 * 
 * @example  const { data:resellableCopies } = await ClassicEconomyApi.authedUserAssetResellableCopies({ userId: 45348281, assetId: 3798248888 })
 * @exampleData [{"userAssetId":45867931761,"seller":{"hasVerifiedBadge":false,"id":45348281,"type":"User","name":"MightyPart"},"price":null,"serialNumber":null,"isOnHold":false}] 
 * @exampleRawBody {"data":[{"userAssetId":45867931761,"seller":{"hasVerifiedBadge":false,"id":45348281,"type":"User","name":"MightyPart"},"price":null,"serialNumber":null,"isOnHold":false}]}
 */
export const authedUserAssetResellableCopies = createApiMethod(async (
  { userId, assetId }: { userId: Identifier, assetId: Identifier }
): ApiMethod<{ data: AssetResellerData[] }, AssetResellerData[]> => ({
  method: "GET",
  path: `/v1/assets/${assetId}/users/${userId}/resellable-copies`,
  name: `authedUserAssetResellableCopies`,

  formatRawDataFn: ({ data }) => data
}))


/**
 * Gets asset resale related metadata
 * @endpoint GET /v1/resale-tax-rate
 * 
 * @example const { data:taxRate } = await ClassicEconomyApi.assetResaleTaxRate()
 * @exampleData {"taxRate":0.3,"minimumFee":1} 
 * @exampleRawBody {"taxRate":0.3,"minimumFee":1} 
 */
export const assetResaleTaxRate = createApiMethod(async (
): ApiMethod<{ taxRate: number, minimumFee: number }> => ({
  method: "GET",
  path: `/v1/resale-tax-rate`,
  name: `assetResaleTaxData`,
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Cash Out ] /////////////////////////////////////////////////////////////////
/**
 * Gets info data about whether the authenticated user can make a developer exchange cashout request.
 * @endpoint GET /v1/developer-exchange/info
 * 
 * @example const { data:cashOutInfo } = await ClassicEconomyApi.authedUserDevExCashOutInfo()
 * @exampleData {"hasCurrencyOperationError":false,"currencyOperationErrorMessage":"","showOnlyExchangeRates":true,"emailIsVerified":true,"isImbursementBlacklistUser":false,"canProceedToCashout":false,"showProgressBar":false,"percentRobux":1,"minRobuxToCashOut":30000,"maxRobuxCanCashOut":20000000000,"lastImbursementStatus":null,"lastImbursementSubmissionDate":null,"conversionPercent":0.0035}
 * @exampleRawBody {"hasCurrencyOperationError":false,"currencyOperationErrorMessage":"","showOnlyExchangeRates":true,"emailIsVerified":true,"isImbursementBlacklistUser":false,"canProceedToCashout":false,"showProgressBar":false,"percentRobux":1,"minRobuxToCashOut":30000,"maxRobuxCanCashOut":20000000000,"lastImbursementStatus":null,"lastImbursementSubmissionDate":null,"conversionPercent":0.0035}
 */
export const authedUserDevExCashOutInfo = createApiMethod(async (
): ApiMethod<AuthedUserDevExCashOutInfoData> => ({
  method: "GET",
  path: `/v1/developer-exchange/info`,
  name: `authedUserDevExCashOutInfo`,
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Currency ] /////////////////////////////////////////////////////////////////
/**
 * Checks if a group can have funds added to it.
 * @endpoint GET /v1/groups/${groupId}/addfunds/allowed
 * 
 * @param groupId The ID of the group to check if funds can be added to.
 * 
 * @example const { data:canAddFunds } = await ClassicEconomyApi.groupCanAddFunds({ groupId: 5850082 })
 * @exampleData false
 * @exampleRawBody false
 */
export const groupCanAddFunds = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<boolean> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/addfunds/allowed`,
  name: `groupCanAddFunds`,
}))


/**
 * Checks if a group can have funds added to it.
 * @endpoint GET /v1/groups/${groupId}/addfunds/allowed
 * 
 * @param groupId The ID of the group to check if funds can be added to.
 * 
 * @example const { data:fundsData } = await ClassicEconomyApi.groupLatestAddedFundsData({ groupId: 5850082 })
 * @exampleData {"transactionDate":null,"rateLimitInDays":30} 
 * @exampleRawBody {"transactionDate":null,"rateLimitInDays":30} 
 */
export const groupLatestAddedFundsData = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<{ transactionDate: ISODateTime | null, rateLimitInDays: number }> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/addfunds/latest`,
  name: `groupCanAddFunds`,
}))


/**
 * Gets currency for a particular group.
 * @endpoint GET /v1/groups/{groupId}/currency
 * 
 * @param groupId The ID of the group to get currency for.
 * 
 * @example const { data:currency } = await ClassicEconomyApi.groupCurrency({ groupId: 5850082 })
 * @exampleData {"robux":0} 
 * @exampleRawBody {"robux":0} 
 */
export const groupCurrency = createApiMethod(async (
  { groupId }: { groupId: Identifier }
): ApiMethod<{ robux: number} > => ({
  method: "GET",
  path: `/v1/groups/${groupId}/currency`,
  name: `groupCurrency`,
}))


/**
 * Gets currency for the authenticated user.
 * @endpoint GET /v1/user/currency
 * 
 * @example const { data:currency } = await ClassicEconomyApi.authedUserCurrency()
 * @exampleData {"robux":0}
 * @exampleRawBody {"robux":0}
 */
export const authedUserCurrency = createApiMethod(async (
): ApiMethod<{ robux: number }> => ({
  method: "GET",
  path: `/v1/user/currency`,
  name: `authedUserCurrency`,
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Revenue Summary ] //////////////////////////////////////////////////////////
/**
 * Gets the revenue summary for a particular group.
 * @endpoint GET /v1/groups/{groupId}/revenue/summary/{timeFrame}
 * 
 * @param groupId The ID of the group to get the revenue summary for.
 * @param timeFrame The timeframe of the summary to get.
 * 
 * @example const { data:summary } = await ClassicEconomyApi.groupRevenueSummary({ groupId: 5850082, timeFrame: "Day" })
 * @exampleData {"recurringRobuxStipend":0,"itemSaleRobux":0,"purchasedRobux":0,"tradeSystemRobux":0,"pendingRobux":0,"groupPayoutRobux":0,"individualToGroupRobux":0,"premiumPayouts":0,"groupPremiumPayouts":0,"adjustmentRobux":0,"immersiveAdPayouts":0,"subscriptionPayouts":0,"subscriptionClawbacks":0,"isShowImmersiveAdPayoutSummaryOnZeroEnabled":false,"commissionRobux":0,"publishingAdvanceRebates":0} 
 * @exampleRawBody {"recurringRobuxStipend":0,"itemSaleRobux":0,"purchasedRobux":0,"tradeSystemRobux":0,"pendingRobux":0,"groupPayoutRobux":0,"individualToGroupRobux":0,"premiumPayouts":0,"groupPremiumPayouts":0,"adjustmentRobux":0,"immersiveAdPayouts":0,"subscriptionPayouts":0,"subscriptionClawbacks":0,"isShowImmersiveAdPayoutSummaryOnZeroEnabled":false,"commissionRobux":0,"publishingAdvanceRebates":0} 
 */
export const groupRevenueSummary = createApiMethod(async (
  { groupId, timeFrame }: { groupId: Identifier, timeFrame: "Day" | "Week" | "Month" | "Year" }
): ApiMethod<GroupRevenueSummaryData> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/revenue/summary/${timeFrame}`,
  name: `groupRevenueSummary`,
}))
/////////////////////////////////////////////////////////////////////////////////


// [ Group Payouts ] ////////////////////////////////////////////////////////////

/**
 * Gets the group payout eligibility for a group of users.
 * @endpoint GET /v1/groups/{groupId}/users-payout-eligibility
 * 
 * @param groupId The ID of the group.
 * @param userIds The userIds to check for payout eligibility.
 * 
 * @example const { data:eligibility } = await ClassicEconomyApi.groupPayoutsUserEligibility({ groupId: 14941564, userIds: [1412728377] })
 * @exampleData {"1412728377":"Eligible"}
 * @exampleRawBody {"usersGroupPayoutEligibility":{"1412728377":"Eligible"}}
 */
export const groupPayoutsUserEligibility = createApiMethod(async <UserId extends Identifier>(
  { groupId, userIds }: { groupId: Identifier, userIds: ArrayNonEmptyIfConst<UserId> }
): ApiMethod<RawUserGroupPayoutEligibilityData<UserId>, PrettifiedUserGroupPayoutEligibilityData<UserId>> => ({
  method: "GET",
  path: `/v1/groups/${groupId}/users-payout-eligibility`,
  searchParams: userIds.map(id => `userIds=${id}`).join('&'),
  name: `groupPayoutsUserEligibility`,

  formatRawDataFn: ({ usersGroupPayoutEligibility }) => usersGroupPayoutEligibility as any
}))
 
/////////////////////////////////////////////////////////////////////////////////


// Economy V2


// [ Transaction History ] //////////////////////////////////////////////////////
/**
 * Gets transaction history for a particular group.
 * @endpoint GET /v2/group/${groupId}/transactions
 * 
 * @param groupId The ID of the group to get transaction history for.
 * @param transactionType The transaction type to get.
 * @param limit The number of results per request.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:transactions } = await ClassicEconomyApi.groupTransactionHistory({ groupId: 5850082, transactionType: "Sale" })
 * @exampleData [{"id":14289110391,"idHash":"L1HiwSO1f1e68Xh1d50b91","created":"2022-07-09T21:35:43.013Z","isPending":false,"agent":{"id":473747714,"type":"User","name":"LoremIpsum"},"details":{"id":1116381,"name":"Buy 100 Coins","type":"DeveloperProduct","place":{"placeId":1121711941,"universeId":8681831361,"name":"LoremIpsumGame"}},"currency":{"amount":0,"type":"Robux"},"purchaseToken":null}] 
 * @exampleRawBody {"previousPageCursor":null,"nextPageCursor":"eyJrZXkiOjEwLCJzb3J0T3JkZXIiOiJBc2MiLCJwYWdpbmdEaXJlY3Rpb24iOiJGb3J3YXJkIiwicGFnZU51bWJlciI6MiwiZGlzY3JpbWluYXRvciI6Imdyb3VwSWQ6NTg1MDA4MnRyYW5zYWN0aW9uVHlwZTpTYWxlIiwiY291bnQiOjEwfQpiYzljYmU0OTFiNjlmNTBmZDBiMGM3YzJmZTVlN2RkMGNlZjY5ZTQ4ZTRiODViZDNiMzBlZGM0NDNiZDMxMmU0","data":[{"id":14289110391,"idHash":"L1HiwSO1f1e68Xh1d50b91","created":"2022-07-09T21:35:43.013Z","isPending":false,"agent":{"id":473747714,"type":"User","name":"LoremIpsum"},"details":{"id":1116381,"name":"Buy 100 Coins","type":"DeveloperProduct","place":{"placeId":1121711941,"universeId":8681831361,"name":"LoremIpsumGame"}},"currency":{"amount":0,"type":"Robux"},"purchaseToken":null}] }
 */
export const groupTransactionHistory = createApiMethod(async <Type extends GroupTransactionType>(
  { groupId, transactionType }: { groupId: Identifier, transactionType: Type, limit?: 10 | 25 | 50 | 100, cursor?: string }
): ApiMethod<RawGroupTransactionHistoryData<Type>, PrettifiedGroupTransactionHistoryData<Type>> => ({
  method: "GET",
  path: `/v2/groups/${groupId}/transactions`,
  searchParams: { transactionType, limit: 10 },
  name: `groupTransactionHistory`,

  formatRawDataFn: ({ data }) => data as any
}))
/////////////////////////////////////////////////////////////////////////////////



// [ Misc ] /////////////////////////////////////////////////////////////////////
/**
 * Gets economy metadata for the authenticated user.
 * @endpoint GET /v2/metadata
 * 
 * @example const { data:metadata } = await ClassicEconomyApi.authedUserEconomyMetadata()
 * @exampleData {"isMarketPlaceEnabled":true,"isItemsXchangeEnabled":true,"isGroupSalesAmountTooltipEnabled":true,"isTransactionsRecordsDownloadEnabled":true,"transactionRecordsDownloadEarliestYearDiff":2,"isCommissionRecordsDownloadEnabled":false,"isGroupCommissionsPageEnabled":true,"isPublishingAdvanceRebatePageEnabled":true} 
 * @exampleRawBody {"isMarketPlaceEnabled":true,"isItemsXchangeEnabled":true,"isGroupSalesAmountTooltipEnabled":true,"isTransactionsRecordsDownloadEnabled":true,"transactionRecordsDownloadEarliestYearDiff":0,"isCommissionRecordsDownloadEnabled":true,"isGroupCommissionsPageEnabled":true,"isPublishingAdvanceRebatePageEnabled":true} 
 */
export const authedUserEconomyMetadata = createApiMethod(async (
): ApiMethod<AuthedUserEconomyMetadataData> => ({
  method: "GET",
  path: `/v2/metadata`,
  name: `authedUserEconomyMetadata`,
}))
/////////////////////////////////////////////////////////////////////////////////