// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayNonEmptyIfConst, Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { FormattedAutoTranslatableLanguagesForSourceData, LanguageCode, RawAutoTranslatableLanguagesForSourceData, UniverseAutoTranslationQuotaData } from "./gameInternationalization.types"
import { createObjectMapByKeyWithMiddleware } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ name: "ClassicGameInternationalization", baseUrl: "https://gameInternationalization.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Automatic Translation ] /////////////////////////////////////////////////////
/**
 * Sees if automatic translations are allowed for a particular universe.
 * @endpoint GET /v1/automatic-translation/games/{universeId}/feature-status
 * 
 * @param universeId The ID of the universe to see if automatic translations are allowed.
 * 
 * @example const { data:allowed } = await ClassicGameInternationalizationApi.universeAutoTranslationsAllowed({ universeId: 1685831367 })
 * @exampleData {"gameId":1685831367,"isAutomaticTranslationAllowed":true,"isAutomaticTranslationSwitchesUIEnabled":true}
 * @exampleRawBody {"gameId":1685831367,"isAutomaticTranslationAllowed":true,"isAutomaticTranslationSwitchesUIEnabled":true}
 */
export const universeAutoTranslationsAllowed = addApiMethod(async <UniverseId extends Identifier>(
  { universeId }: { universeId: UniverseId }
): ApiMethod<{ gameId: UniverseId, isAutomaticTranslationAllowed: boolean, isAutomaticTranslationSwitchesUIEnabled: boolean }> => ({
  method: "GET",
  path: `/v1/automatic-translation/games/${universeId}/feature-status`,
  name: `universeAutomaticTranslationsAllowed`,
}))


/**
 * Gets automatic translation quota for a particular universe.
 * @endpoint GET /v1/automatic-translation/games/{universeId}/quota
 * 
 * @param universeId The ID of the universe to get automatic translation quota from.
 * 
 * @example const { data:quota } = await ClassicGameInternationalizationApi.universeAutoTranslationQuota({ universeId: 1685831367 })
 * @exampleData {"monthlyQuota":{"previousRefreshDate":"0001-01-01T00:00:00","nextRefreshDate":"2024-09-10T15:29:26.849Z","remaining":550000,"capacity":550000},"bankQuota":{"remaining":2750000,"capacity":2750000}}
 * @exampleRawBody {"monthlyQuota":{"previousRefreshDate":"0001-01-01T00:00:00","nextRefreshDate":"2024-09-10T15:29:26.849Z","remaining":550000,"capacity":550000},"bankQuota":{"remaining":2750000,"capacity":2750000}}
 */
export const universeAutoTranslationQuota = addApiMethod(async (
  { universeId }: { universeId: Identifier }
): ApiMethod<UniverseAutoTranslationQuotaData> => ({
  method: "GET",
  path: `/v1/automatic-translation/games/${universeId}/quota`,
  name: `universeAutomaticTranslationQuota`,
}))


/**
 * DESCRIPTION
 * @endpoint REST /...
 * 
 * @param
 * 
 * @example
 * const { data:autoTranslationsAllowed } = await ClassicGameInternationalizationApi.autoTranslatableLanguagesForSource({
 *   languageCode: "en", targetLanguageCodes: [ "fr" ]
 * })
 * @exampleData {"fr":true}
 * @exampleRawBody {"sourceLanguage":"en","targetLanguages":[{"languageCode":"fr","isAutomaticTranslationAllowed":true}]}
 */
export const autoTranslatableLanguagesForSource = addApiMethod(async <
  SourceLanguageCode extends LanguageCode, TargetLanguageCode extends Exclude<LanguageCode, SourceLanguageCode>
>(
  { languageCode, targetLanguageCodes, universeId }:
  { languageCode: SourceLanguageCode, targetLanguageCodes?: ArrayNonEmptyIfConst<TargetLanguageCode>, universeId?: Identifier }
): ApiMethod<
  RawAutoTranslatableLanguagesForSourceData<SourceLanguageCode, TargetLanguageCode>,
  FormattedAutoTranslatableLanguagesForSourceData<TargetLanguageCode>
> => ({
  method: "GET",
  path: `/v1/automatic-translation/languages/${languageCode}/target-languages`,
  searchParams: { targetLanguages: targetLanguageCodes, gameId: universeId },
  name: `autoTranslatableLanguagesForSource`,

  formatRawDataFn: ({ targetLanguages }) => createObjectMapByKeyWithMiddleware(
    targetLanguages, "languageCode", ({ isAutomaticTranslationAllowed }) => isAutomaticTranslationAllowed
  )
}))
//////////////////////////////////////////////////////////////////////////////////