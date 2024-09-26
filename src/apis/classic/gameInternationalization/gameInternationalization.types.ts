import { ISODateTime, UnionPrettify } from "typeforge";

export type LanguageCode = UnionPrettify<
  "en" | "de" | "es" | "fr" | "id" | "it" | "ja" | "ko" | "pl" | "pt" | "ru" | "th" | "tr" | "vi" | "zh-hans" | "zh-hant"
>


// [ Automatic Translation ] /////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/automatic-translation/games/{universeId}/quota ------------------------------------------------------------
export type UniverseAutoTranslationQuotaData = {
  monthlyQuota: {
    previousRefreshDate: ISODateTime,
    nextRefreshDate: ISODateTime,
    remaining: number,
    capacity: number,
  },
  bankQuota: {
    remaining: number,
    capacity: number,
  },
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/automatic-translation/languages/${languageCode}/target-languages ------------------------------------------
export type RawAutoTranslatableLanguagesForSourceData<
  SourceLanguageCode extends LanguageCode, TargetLanguageCode extends LanguageCode = LanguageCode
> = {
  sourceLanguage: SourceLanguageCode,
  targetLanguages: {
    languageCode: TargetLanguageCode,
    isAutomaticTranslationAllowed: boolean
  }[]
}

export type FormattedAutoTranslatableLanguagesForSourceData<TargetLanguageCode extends LanguageCode = LanguageCode> = {
  [Code in TargetLanguageCode]?: boolean
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
