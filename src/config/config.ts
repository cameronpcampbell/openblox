// [ Modules ] ///////////////////////////////////////////////////////////////////
import { TtlCacheAdapter } from "../cache/cacheAdapters"
import { RobloxCookie } from "../http/http.utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { HttpAdapter } from "../http/httpAdapters"
import type { CacheAdapter } from "../cache/cacheAdapters/cacheAdapters"
import type { ObjectPrettify } from "typeforge"

export type OpenbloxConfig<Cookie = FormattedRobloxCookie> = ObjectPrettify<{
    cookie?: Cookie,
    cloudKey?: string,

    http?: {
        adapter?: HttpAdapter,
        csrfMaxAttempts?: number,
        csrfToken?: string,

        polling?: {
            disabled?: boolean,
            iterations?: number,
            multiplyer?: number,
            retryOffset?: number,
            debugMessages?: boolean
        }
    },

    cache?: ReturnType<CacheAdapter<any, any>>[]
}>
//////////////////////////////////////////////////////////////////////////////////


const formatRobloxCookie = (cookie: string) => `.ROBLOSECURITY=${cookie}; RBXEventTrackerV2=CreateDate=1/1/1 1:1:1 PM&rbxid=1&browserid=1;` as FormattedRobloxCookie & { _phantom_isValid: true }

// [ Variables ] /////////////////////////////////////////////////////////////////
const initialCookie = process.env.ROBLOX_COOKIE

export const defaultOpenbloxConfig: OpenbloxConfig = {
    cookie: initialCookie ? formatRobloxCookie(initialCookie) : undefined,
    cloudKey: process.env.ROBLOX_CLOUD_KEY,

    cache: [ TtlCacheAdapter({ included: { lifetime: 300 } }) ],
    
    http: {}
};
//////////////////////////////////////////////////////////////////////////////////


export type FormattedRobloxCookie = `.ROBLOSECURITY=${RobloxCookie}; RBXEventTrackerV2=CreateDate=1/1/1 1:1:1 PM&rbxid=1&browserid=1;`

export const setDefaultOpenbloxConfig = (newConfig: OpenbloxConfig & { _phantom_isValid: true }) => {
    for (var key in defaultOpenbloxConfig) { delete defaultOpenbloxConfig[key as keyof OpenbloxConfig] }
    Object.assign(defaultOpenbloxConfig, newConfig)
}

export const createOpenbloxConfig = (newConfig: OpenbloxConfig<RobloxCookie>) => {
    if (!newConfig?.http) newConfig.http = {} 

    const newConfigCookie = newConfig?.cookie
    if (newConfigCookie) newConfig.cookie = formatRobloxCookie(newConfigCookie) as any

    return newConfig as OpenbloxConfig & { _phantom_isValid: true }
}