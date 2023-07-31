// [ ACCOUNT INFORMATION ] ///////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/birthdate
export type AuthenticatedUserBirthdate = Date
export type RawAuthenticatedUserBirthdate = {
  birthMonth: number,
  birthDay: number,
  birthYear: number
}

// GET /v1/description
export type AuthenticatedUserDescription = string
export type RawAuthenticatedUserDescription = { description: string }

// GET /v1/gender
export type AuthenticatedUserGender = number
export type RawAuthenticatedUserGender = { gender: number }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
export type ValidateDisplayNameForNewUser = boolean
export type RawValidateDisplayNameForNewUser = {}

// GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
export type ValidateDisplayNameForExistingUser = ValidateDisplayNameForNewUser
export type RawValidateDisplayNameForExisitingUser = RawValidateDisplayNameForNewUser

// PATCH /v1/users/{userId}/display-names
export type SetDisplayNameForAuthenticatedUser = ValidateDisplayNameForNewUser
export type RawSetDisplayNameForAuthenticatedUser = RawValidateDisplayNameForNewUser
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/{userId}
export type DetailedUserInfo = {
  description: string,
  created: Date,
  isBanned: boolean,
  externalAppDisplayName: string,
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}
export type RawDetailedUserInfo = {
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
export type AuthenticatedUserMinimalInfo = {
  id: number,
  name: string,
  displayName: string
}
export type RawAuthenticatedUserMinimalInfo = AuthenticatedUserMinimalInfo

// GET /v1/users/authenticated/age-bracket
export type AuthenticatedUserAgeBracket = number
export type RawAuthenticatedUserAgeBracket = { ageBracket: number }

// GET /v1/users/authenticated/country-code
export type AuthenticatedUserCountryCode = string
export type RawAuthenticatedUserCountryCode = { countryCode: string }

// GET /v1/users/authenticated/roles
export type AuthenticatedUserRoles = string[]
export type RawAuthenticatedUserRoles = { roles: string[] }

// POST /v1/usernames/users
export type UsernamesToUsersInfo = { 
  [requestedUsername: string]: {
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }
}
export type RawUsernamesToUsersInfo = {
  data: { 
    requestedUsername: string,
    hasVerifiedBadge: boolean,
    id: number,
    name: string,
    displayName: string
  }[]
}

// POST /v1/users
export type UserIdsToUsersInfo = { 
  [userId: number]: {
    hasVerifiedBadge: boolean,
    name: string,
    displayName: string
  }
}
export type RawUserIdsToUsersInfo = {
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
export type UsernameHistory = string[]
export type RawUsernameHistory = {
  previousPageCursor: string,
  nextPageCursor: string,
  data: { name: string }[]
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
// GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
export type Search = {
  previousUsernames: string[],
  hasVerifiedBadge: boolean,
  id: number,
  name: string,
  displayName: string
}[]
export type RawSearch = {
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