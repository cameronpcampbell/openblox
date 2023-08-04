// [ ACCOUNT INFORMATION ] ///////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/birthdate
export type AuthenticatedUserBirthdateData = Date
export type RawAuthenticatedUserBirthdateData = {
  birthMonth: number,
  birthDay: number,
  birthYear: number
}

// GET /v1/description
export type AuthenticatedUserDescriptionData = string
export type RawAuthenticatedUserDescriptionData = { description: string }

// GET /v1/gender
export type AuthenticatedUserGenderData = "Male" | "Female" | "Unset"
export type RawAuthenticatedUserGenderData = { gender: 1 | 2 | 3 }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
export type ValidateDisplayNameForNewUserData = boolean
export type RawValidateDisplayNameForNewUserData = {}

// GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
export type ValidateDisplayNameForExistingUserData = boolean
export type RawValidateDisplayNameForExisitingUserData = {}

// PATCH /v1/users/{userId}/display-names
export type SetDisplayNameForAuthenticatedUserData = boolean
export type RawSetDisplayNameForAuthenticatedUserData = {}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}
export type DetailedUserInfoData = {
  description: string,
  created: Date,
  isBanned: boolean,
  externalAppDisplayName: string,
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}
export type RawDetailedUserInfoData = {
  description: string,
  created: string,
  isBanned: boolean,
  externalAppDisplayName: string,
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}

// GET /v1/users/authenticated
export type AuthenticatedUserMinimalInfoData = {
  id: number,
  name: string,
  displayName: string
}
export type RawAuthenticatedUserMinimalInfoData = AuthenticatedUserMinimalInfoData

// GET /v1/users/authenticated/age-bracket
export type AuthenticatedUserAgeBracketData = "13+" | "<13"
export type RawAuthenticatedUserAgeBracketData = { ageBracket: 0 | 1 }

// GET /v1/users/authenticated/country-code
type AuthenticatedUserCountryCode = "US" | "GB" | "CA" | "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BQ" | "BA" | "BW" | "BV" | "BR" | "IO" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "CI" | "HR" | "CW" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HM" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "KR" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "AN" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SX" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "SS" | "ES" | "LK" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "UM" | "UY" | "UZ" | "VU" | "VE" | "VN" | "VG" | "VI" | "WF" | "EH" | "YE" | "ZM" | "ZW" | "CU" | "IR" | "SY" | "KP"
export type AuthenticatedUserCountryCodeData = AuthenticatedUserCountryCode
export type RawAuthenticatedUserCountryCodeData = { countryCode: AuthenticatedUserCountryCode }

// GET /v1/users/authenticated/roles
export type AuthenticatedUserRolesData = string[]
export type RawAuthenticatedUserRolesData = { roles: string[] }

// POST /v1/usernames/users
export type UsernamesToUsersInfoData = { 
  [requestedUsername: string]: {
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }
}
export type RawUsernamesToUsersInfoData = {
  data: { 
    requestedUsername: string,
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}

// POST /v1/users
export type UserIdsToUsersInfoData = { 
  [userId: number]: {
    hasVerifiedBadge: boolean,
    name: string,
    displayName: string
  }
}
export type RawUserIdsToUsersInfoData = {
  data: { 
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USERNAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/username-history ? limit={limit} & sortOrder={sortOrder} & cursor={cursor}
export type UsernameHistoryData = string[]
export type RawUsernameHistoryData = {
  previousPageCursor: string,
  nextPageCursor: string,
  data: { name: string }[]
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
export type SearchData = {
  previousUsernames: string[],
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}[]
export type RawSearchData = {
  previousPageCursor: string,
  nextPageCursor: string,
  data: {
    previousUsernames: string[],
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////