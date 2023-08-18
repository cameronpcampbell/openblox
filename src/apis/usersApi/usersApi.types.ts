// [ ACCOUNT INFORMATION ] ///////////////////////////////////////////////////////////////////////////////////////////

import { Prettify } from "../../lib/lib.types"

// GET /v1/birthdate
export type AuthenticatedUserBirthdateData = Prettify<{
  birthMonth: number,
  birthDay: number,
  birthYear: number
}>
export type FormattedAuthenticatedUserBirthdateData = Prettify<Date>

// GET /v1/description
export type AuthenticatedUserDescriptionData = Prettify<{ description: string }>
export type FormattedAuthenticatedUserDescriptionData = Prettify<string>

// GET /v1/gender
export type AuthenticatedUserGenderData = Prettify<{ gender: 1 | 2 | 3 }>
export type FormattedAuthenticatedUserGenderData = Prettify<"Male" | "Female" | "Unset">
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
export type ValidateDisplayNameForNewUserData = Prettify<{}>
export type FormattedValidateDisplayNameForNewUserData = Prettify<boolean>

// GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
export type ValidateDisplayNameForExisitingUserData = Prettify<{}>
export type FormattedValidateDisplayNameForExistingUserData = Prettify<boolean>

// PATCH /v1/users/{userId}/display-names
export type SetDisplayNameForAuthenticatedUserData = Prettify<{}>
export type FormattedSetDisplayNameForAuthenticatedUserData = Prettify<boolean>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}
export type DetailedUserInfoData = Prettify<{
  description: string,
  created: string,
  isBanned: boolean,
  externalAppDisplayName: string,
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}>
export type FormattedDetailedUserInfoData = Prettify<Omit<DetailedUserInfoData, "created"> & { created: Date }>

// GET /v1/users/authenticated
export type AuthenticatedUserMinimalInfoData = Prettify<{
  id: number,
  name: string,
  displayName: string
}>

// GET /v1/users/authenticated/age-bracket
export type AuthenticatedUserAgeBracketData = Prettify<{ ageBracket: 0 | 1 }>
export type FormattedAuthenticatedUserAgeBracketData = Prettify<"13+" | "<13">

// GET /v1/users/authenticated/country-code
export type AuthenticatedUserCountryCodeData = Prettify<{ countryCode: FormattedAuthenticatedUserCountryCodeData }>
export type FormattedAuthenticatedUserCountryCodeData = Prettify<"US" | "GB" | "CA" | "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BQ" | "BA" | "BW" | "BV" | "BR" | "IO" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "CI" | "HR" | "CW" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HM" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "KR" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "AN" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SX" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "SS" | "ES" | "LK" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "UM" | "UY" | "UZ" | "VU" | "VE" | "VN" | "VG" | "VI" | "WF" | "EH" | "YE" | "ZM" | "ZW" | "CU" | "IR" | "SY" | "KP">

// GET /v1/users/authenticated/roles
export type AuthenticatedUserRolesData = Prettify<{ roles: FormattedAuthenticatedUserRolesData }>
export type FormattedAuthenticatedUserRolesData = Prettify<string[]>

// POST /v1/usernames/users
export type UsernamesToUsersInfoData = Prettify<{
  data: { 
    requestedUsername: string,
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}>
export type FormattedUsernamesToUsersInfoData = Prettify<{ 
  [requestedUsername: string]: {
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }
}>

// POST /v1/users
export type UserIdsToUsersInfoData = Prettify<{
  data: { 
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}>
export type FormattedUserIdsToUsersInfoData = Prettify<{ 
  [userId: number]: {
    hasVerifiedBadge: boolean,
    name: string,
    displayName: string
  }
}>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USERNAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/username-history ? limit={limit} & sortOrder={sortOrder} & cursor={cursor}
export type UsernameHistoryData = Prettify<{
  previousPageCursor: string,
  nextPageCursor: string,
  data: { name: string }[]
}>
export type FormattedUsernameHistoryData = Prettify<string[]>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
export type SearchData = Prettify<{
  previousPageCursor: string,
  nextPageCursor: string,
  data: {
    previousUsernames: string[],
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}>
export type FormattedSearchData = Prettify<{
  previousUsernames: string[],
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}[]>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////