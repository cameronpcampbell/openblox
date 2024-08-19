// [ Types ] /////////////////////////////////////////////////////////////////////
import { Identifier, NumberIsLiteral, StringIsLiteral, UnionPrettify } from "typeforge"
import type { DeepLinkAppsFlyerFormat, DeepLinkRobloxProtocolFormat, DeepLinkRobloxUrlFormat } from "./deepLinkHelpers.types"


type ObjectIsLiteral<Obj extends Record<any, any>> = ({ [Key in keyof Obj]: false })["constructor"] extends false ? false : true

type StringIsEmpty<T> = T extends string ? T extends "" ? true : false : false

type IsLiteral<T extends unknown> =
  T extends number ? NumberIsLiteral<T> :
  T extends string ? StringIsLiteral<T> :
  T extends Record<any, any> ? ObjectIsLiteral<T> :
  false

type DeepLinkFormat = UnionPrettify<"AppsFlyer" | "RobloxProtocol" | "RobloxUrl">

type DeepLink<PlaceId extends Identifier, HasLaunchData extends boolean, Format extends DeepLinkFormat> = (
  Format extends "AppsFlyer" ? DeepLinkAppsFlyerFormat<PlaceId, HasLaunchData> :
  Format extends "RobloxProtocol" ? DeepLinkRobloxProtocolFormat<PlaceId, HasLaunchData> :
  DeepLinkRobloxUrlFormat<PlaceId, HasLaunchData>
)

type DeepLinkReturns<PlaceId extends Identifier, HasLaunchData extends boolean, Format extends DeepLinkFormat> =
  Format extends "AppsFlyer" ? DeepLinkAppsFlyerFormat<PlaceId, HasLaunchData> & DeepLinkMethods<PlaceId, HasLaunchData, Format> :
  Format extends "RobloxProtocol" ? DeepLinkRobloxProtocolFormat<PlaceId, HasLaunchData> & DeepLinkMethods<PlaceId, HasLaunchData, Format> :
  DeepLinkRobloxUrlFormat<PlaceId, HasLaunchData> & DeepLinkMethods<PlaceId, HasLaunchData, Format>


type DeepLinkMethods<
  PlaceId extends Identifier, HasLaunchData extends boolean, Format extends DeepLinkFormat,
> = {
  setLaunchData: <LaunchData extends Record<any, any> | undefined | string>(launchData: LaunchData) =>
    DeepLinkReturns<PlaceId, (
      LaunchData extends undefined ? false :
      StringIsEmpty<LaunchData> extends true ? false :
      IsLiteral<LaunchData>
    ), Format>,

  toAppsFlyerFormat: () => DeepLinkAppsFlyerFormat<PlaceId, HasLaunchData> & DeepLinkMethods<PlaceId, HasLaunchData, "AppsFlyer">,
  toRobloxProtocolFormat: () => DeepLinkRobloxProtocolFormat<PlaceId, HasLaunchData> & DeepLinkMethods<PlaceId, HasLaunchData, "RobloxProtocol">,
  toRobloxUrlFormat: () => DeepLinkRobloxUrlFormat<PlaceId, HasLaunchData> & DeepLinkMethods<PlaceId, HasLaunchData, "RobloxUrl">,

  "🔒__PRIVATE_SELF": DeepLink<PlaceId, HasLaunchData, Format>
}
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const toAppsFlyerFormat = (placeId: Identifier, launchDataStr: string | null) => (
  new DeepLinkString(
    `ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2FplaceId%3D${placeId}${launchDataStr ? `%26launchData%3D${launchDataStr}` : ""}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${placeId}${launchDataStr ? `%26launchData%3D${launchDataStr}` : ""}`,
    placeId, launchDataStr, toAppsFlyerFormat
  )
)

const toRobloxProtocolFormat = (placeId: Identifier, launchDataStr: string | null) => (
  new DeepLinkString(`roblox://placeId=${placeId}${launchDataStr ? `&launchData=${launchDataStr}` : ""}`, placeId, launchDataStr, toRobloxProtocolFormat)
)

const toRobloxUrlFormat = (placeId: Identifier, launchDataStr: string | null) => (
  new DeepLinkString(
    `https://www.roblox.com/games/start?placeId=${placeId}${launchDataStr ? `&launchData=${launchDataStr}` : ""}`,
    placeId, launchDataStr, toRobloxUrlFormat
  )
)

const stringifyLaunchData = (launchData: string | Record<any, any> | undefined | null): string | null => {
  if (!launchData) return null
  
  if (typeof launchData === "string") return launchData.length == 0 ? null : encodeURIComponent(btoa(launchData))
  if (launchData?.constructor === Object) return encodeURIComponent(btoa(JSON.stringify(launchData)))
  return null
}
//////////////////////////////////////////////////////////////////////////////////


class DeepLinkString extends String {
  str: string
  placeId: Identifier
  launchData: string | null
  reFormat: (placeId: Identifier, launchData: string | null) => any
  
  constructor(str: string, placeId: Identifier, launchData: string | null, reFormat: (placeId: Identifier, launchData: string | null) => any) {
    super(str);
    this.str = str;

    this.placeId = placeId
    this.launchData = launchData
    this.reFormat = reFormat
  }

  setLaunchData(launchData: Record<any, any> | string | undefined) {
    return this.reFormat(this.placeId, stringifyLaunchData(launchData))
  }

  toAppsFlyerFormat() { return toAppsFlyerFormat(this.placeId, this.launchData) }
  toRobloxProtocolFormat() { return toRobloxProtocolFormat(this.placeId, this.launchData) }
  toRobloxUrlFormat() { return toRobloxUrlFormat(this.placeId, this.launchData) }
}


export const deepLinkCreate = <PlaceId extends Identifier, LaunchData extends Record<any, any> | string, Format extends DeepLinkFormat>(
  { placeId, launchData, format }: { placeId: PlaceId, launchData?: LaunchData, format?: Format }
): DeepLinkReturns<PlaceId, IsLiteral<LaunchData>, Format> => {
  if (!format) format = "AppsFlyer" as any
  const launchDataStr = stringifyLaunchData(launchData)

  return (
    format == "AppsFlyer" ? toAppsFlyerFormat(placeId, launchDataStr) as any :
    format == "RobloxProtocol" ? toRobloxProtocolFormat(placeId, launchDataStr) as any :
    toRobloxUrlFormat(placeId, launchDataStr) as any
  )
}
