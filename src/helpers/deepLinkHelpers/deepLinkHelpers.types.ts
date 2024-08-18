import type { Identifier } from "typeforge"

export type DeepLinkAppsFlyerFormat<PlaceId extends Identifier, HasLaunchData extends boolean> = `ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2FplaceId%3D${PlaceId}${HasLaunchData extends true ? `%26launchData%3D${string}` : ""}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${PlaceId}${HasLaunchData extends true ? `%26launchData%3D${string}` : ""}`

export type DeepLinkRobloxProtocolFormat<PlaceId extends Identifier, HasLaunchData extends boolean> = `roblox://placeId=${PlaceId}${HasLaunchData extends true ? `&launchData=${string}` : ""}`

export type DeepLinkRobloxUrlFormat<PlaceId extends Identifier, HasLaunchData extends boolean> = `https://www.roblox.com/games/start?placeId=${PlaceId}${HasLaunchData extends true ? `&launchData=${string}` : ""}`