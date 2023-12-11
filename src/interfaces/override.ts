import { createHash } from "crypto"
import { AllOverrides, AllOverridesSettings } from "../config/config.types"
import { mutateObject } from "../utils"

export const Override = <T extends ((...args: any) => any)>(
  method: T, { cloudKey, cookie, oauthToken, cacheSettings }: AllOverridesSettings): T => {
  const overrides = {
    credentials: (cloudKey || cookie || oauthToken) ? { cloudKey, cookie, oauthToken } : undefined,
    cacheSettings: cacheSettings
  }

  const binded = method.bind(overrides) as unknown as ((...args: Parameters<T>) => ReturnType<T>)

  (overrides as AllOverrides)._hashes = {} as any
  mutateObject((overrides as AllOverrides)._hashes, (obj) => {
    if (overrides.credentials) obj._credentialsOverrideHash = createHash("md5").update(JSON.stringify(overrides.credentials)).digest("hex")
    if (overrides.cacheSettings) obj._cacheSettingsOverrideHash = createHash("md5").update(JSON.stringify(overrides.cacheSettings)).digest("hex")
  })

  /* @ts-expect-error */
  binded.overrides = overrides

  return binded as T
}