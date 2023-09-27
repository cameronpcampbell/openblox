// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import merge from "lodash.merge"

import { HttpHandler } from "../http/httpHandler"
import { FindSettings } from "../cacheAdapters/cacheAdapters.utils";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { PrettifyKeyof } from "../utils/utils.types";
import type { AllOverrides, Config, ConfigSettings, ThisAllOverrides } from "./config.types"
import type { ApiName } from "../apis/apis.types";
import { mutateObject } from "../utils";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
async function findSettings(this: Config, apiName: string, methodName: string) {
  return await FindSettings(this.cacheAdapter?.included, apiName as ApiName, methodName)
}

function createConfig(config: PrettifyKeyof<ConfigSettings>): Config {
  const http = HttpHandler({
    cookie: config?.cookie,
    cloudKey: config?.cloudKey,
    csrfRetries: config?.csrfRetries,
    cacheAdapter: config?.cacheAdapter,
    httpAdapter: config?.httpAdapter
  })

  return mutateObject(config, obj => {
    obj.http = http
    obj.findSettings = findSettings
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var config: Config = {
  http: HttpHandler({}),

  findSettings: findSettings
}

export const setOpenbloxConfig = (configSettings: PrettifyKeyof<ConfigSettings>) => {
  config = createConfig(configSettings)
}

export const getOpenbloxConfig = () => config

export const getCacheSettingsOverride = (overrides: ThisAllOverrides): { cacheSettingsOverride: any | "!", preCache?: any } | false => {
  const cacheSettingsOverride = overrides?.cacheSettings
  if (!cacheSettingsOverride) return false

  return cacheSettingsOverride
}
export const getCredentialsOverride = (overrides: ThisAllOverrides) => (
  overrides ? ({ cloudKey: overrides?.cloudKey, cookie: overrides?.cookie, oauthToken: overrides?.oauthToken }) : undefined
)