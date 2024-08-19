// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"
import type { DeepLinkAppsFlyerFormat, DeepLinkRobloxProtocolFormat, DeepLinkRobloxUrlFormat } from "./deepLinkHelpers.types"


type AnyDeepLink = DeepLinkAppsFlyerFormat<Identifier, boolean> | DeepLinkRobloxProtocolFormat<Identifier, boolean> | DeepLinkRobloxUrlFormat<Identifier, boolean>

type ExtractDataFromDeepLink<DeepLink extends unknown> = (
  // RobloxProtocol & RobloxUrl with launch data.
  DeepLink extends `${string}placeId=${infer PlaceId}&${string}` ? [ [ PlaceId ], [ true ] ] :

  // RobloxProtocol & RobloxUrl without launch data.
  DeepLink extends `${string}placeId=${infer PlaceId}` ? [ [ PlaceId ], [ false ] ] :

  // AppsFlyer with launch data.
  DeepLink extends `ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2FplaceId%3D${infer PlaceIdA}%26launchData%3D${string}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${infer PlaceIdB}%26launchData%3D${string}` ? [ [ PlaceIdA, PlaceIdB ], [ true, true ] ] :

  // AppsFlyer with only second launch data.
  DeepLink extends `ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2FplaceId%3D${infer PlaceIdA}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${infer PlaceIdB}%26launchData%3D${string}` ? [ [ PlaceIdA, PlaceIdB ], [ false, true ] ] :

  // AppsFlyer with only first launch data.
  DeepLink extends `ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2FplaceId%3D${infer PlaceIdA}%26launchData%3D${string}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${infer PlaceIdB}` ? [ [ PlaceIdA, PlaceIdB ], [ true, false ] ] :

  // AppsFlyer without launch data.
  DeepLink extends `ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2FplaceId%3D${infer PlaceIdA}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${infer PlaceIdB}` ? [ [ PlaceIdA, PlaceIdB ], [ false, false ] ] :

  never
)

type DeepLinkParseReturns<DeepLink extends any, PlaceId, LaunchData extends boolean[]> = (
  DeepLink extends AnyDeepLink ?
    PlaceId extends string[]
      ? PlaceId["length"] extends 2
        ? [
          { placeId: PlaceId[0], launchData: LaunchData[0] extends true ? string | Record<any, any>  : null },
          { placeId: PlaceId[1], launchData: LaunchData[1] extends true ? string | Record<any, any> : null }
        ]
        : [ { placeId: PlaceId[0], launchData: LaunchData[0] extends true ? string | Record<any, any> : null } ]
      : never
    : { placeIds: `${number}`[], launchData: null | string | Record<any, any> }[]
)
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

const placeIdsRegex = /placeId=([0-9]+)(?:.*placeId=([0-9]+))?/
const launchDataRegex = /launchData=([^&]+)(?:.*launchData=([^&]+))?/
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const parseLaunchData = (launchData: string | null | undefined, decodeBase64?: boolean) => {
  if (!launchData) return null
  launchData = decodeURIComponent(launchData)

  if (decodeBase64 === undefined || decodeBase64) {
    if (decodeBase64 || base64Regex.test(launchData)) launchData = atob(launchData)
  }

  try { return JSON.parse(launchData) }
  catch { return launchData }
}
//////////////////////////////////////////////////////////////////////////////////


export const deepLinkParse = <
  DeepLink extends AnyDeepLink | string,

  ExtractedData extends (DeepLink extends AnyDeepLink ? ExtractDataFromDeepLink<
    "🔒__PRIVATE_SELF" extends keyof DeepLink ? DeepLink["🔒__PRIVATE_SELF"] : DeepLink
  > : never),
  PlaceIds extends (ExtractedData extends [ infer PlaceIds, boolean[] ] ? PlaceIds : never),
  LaunchData extends (ExtractedData extends [ string[], infer HasLaunchData ] ? HasLaunchData : never)
>(deepLink: DeepLink, decodeBase64?: boolean): DeepLinkParseReturns<DeepLink, PlaceIds, LaunchData> => {
  const decodedDeepLink = deepLink.replaceAll("%3D", "=")

  const placeIdsExec = placeIdsRegex.exec(decodedDeepLink)
  const firstPlaceId = placeIdsExec?.[1], secondPlaceId = placeIdsExec?.[2]
  const placeIds = [ typeof firstPlaceId === "string" ? firstPlaceId : null, typeof secondPlaceId === "string" ? secondPlaceId : null ].filter(e => e)

  const launchDataExec = launchDataRegex.exec(decodedDeepLink)
  const firstLaunchData = launchDataExec?.[1], secondLaunchData = launchDataExec?.[2]
  const launchData = [ typeof firstLaunchData === "string" ? firstLaunchData : null, typeof secondLaunchData === "string" ? secondLaunchData : null ]

  return placeIds.map((placeId, idx) => ({ placeId, launchData: parseLaunchData(launchData[idx], decodeBase64) })) as DeepLinkParseReturns<DeepLink, PlaceIds, LaunchData>
}