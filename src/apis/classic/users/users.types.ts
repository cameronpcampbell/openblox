import type { Identifier, ISODateTime, ObjectPrettify, UnionPrettify } from "typeforge"


// [ Account Information ] ///////////////////////////////////////////////////////
// GET /v1/birthdate
export type RawAuthenticatedUserBirthdateData = {
  birthMonth: number,
  birthDay: number,
  birthYear: number
}

// GET /v1/description
export type RawAuthenticatedUserDescriptionData = { description: string }

// GET /v1/gender
export type RawAuthenticatedUserGenderData = { gender: 1 | 2 | 3 }
export type PrettifiedAuthenticatedUserGenderData = "Male" | "Female" | "Unset"
//////////////////////////////////////////////////////////////////////////////////


// [ Users ] /////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}
type UserInfoData<UserId extends Identifier, TimeType> = {
  description: string,
  created: TimeType,
  isBanned: boolean,
  externalAppDisplayName: string | null,
  hasVerifiedBadge: boolean,
  id: UserId,
  name: string,
  displayName: string
}
export type RawUserInfoData<UserId extends Identifier> = UserInfoData<UserId, ISODateTime>
export type PrettifiedUserInfoData<UserId extends Identifier> = UserInfoData<UserId, Date>

// GET /v1/users/authenticated
export type AuthenticatedUserInfoData = {
  id: number,
  name: string,
  displayName: string
}

// GET /v1/users/authenticated/age-bracket
export type RawAuthenticatedUserAgeBracketData = { ageBracket: 0 | 1 }
export type PrettifiedAuthenticatedUserAgeBracketData = UnionPrettify<"13+" | "<13">

// GET /v1/users/authenticated/country-code
export type RawAuthenticatedUserCountryCodeData = { countryCode: PrettifiedAuthenticatedUserCountryCodeData }
export type PrettifiedAuthenticatedUserCountryCodeData = "US" | "GB" | "CA" | "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BQ" | "BA" | "BW" | "BV" | "BR" | "IO" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "CI" | "HR" | "CW" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HM" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "KR" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "AN" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SX" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "SS" | "ES" | "LK" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "UM" | "UY" | "UZ" | "VU" | "VE" | "VN" | "VG" | "VI" | "WF" | "EH" | "YE" | "ZM" | "ZW" | "CU" | "IR" | "SY" | "KP"

// GET /v1/users/authenticated/roles
export type RawAuthenticatedUserRolesData = { roles: string[] }

// POST /v1/usernames/users
export type RawUsernamesToUsersInfoData<Username extends string> = {
  data: { 
    requestedUsername: Username,
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}
export type PrettifiedUsernamesToUsersInfoData<Username extends string> = {
  [Key in Username]: {
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  } | undefined
}

// POST /v1/users
export type RawUserIdsToUsersInfoData<UserId extends Identifier> = ObjectPrettify<{
  data: { 
    hasVerifiedBadge: boolean,
    id: UserId,
    name: string,
    displayName: string
  }[]
}>
export type PrettifiedUserIdsToUsersInfoData<UserId extends Identifier> = {
  [Key in UserId]: {
    hasVerifiedBadge: boolean,
    name: string,
    displayName: string
  }
}
//////////////////////////////////////////////////////////////////////////////////


// [ Usernames ] /////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}/username-history ? limit={limit} & sortOrder={sortOrder} & cursor={cursor}
export type RawUsernameHistoryData = ObjectPrettify<{
  previousPageCursor: string,
  nextPageCursor: string,
  data: { name: string }[]
}>
//////////////////////////////////////////////////////////////////////////////////


// [ User Search ] ///////////////////////////////////////////////////////////////
// GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
export type RawUserSearchData = ObjectPrettify<{
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

export type PrettifiedUserSearchData = ObjectPrettify<{
  previousUsernames: string[],
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}>[]
//////////////////////////////////////////////////////////////////////////////////

