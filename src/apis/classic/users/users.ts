// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware, dataIsSuccess } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ISODateTime, ArrayNonEmptyIfConst } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { SortOrder } from "../../../utils/utils.types"
import type { AuthenticatedUserInfoData, PrettifiedAuthenticatedUserAgeBracketData, PrettifiedAuthenticatedUserCountryCodeData, PrettifiedAuthenticatedUserGenderData, PrettifiedUserSearchData, PrettifiedUserIdsToUsersInfoData, PrettifiedUserInfoData, PrettifiedUsernamesToUsersInfoData, RawAuthenticatedUserAgeBracketData, RawAuthenticatedUserBirthdateData, RawAuthenticatedUserCountryCodeData, RawAuthenticatedUserDescriptionData, RawAuthenticatedUserGenderData, RawAuthenticatedUserRolesData, RawUserSearchData, RawUserIdsToUsersInfoData, RawUserInfoData, RawUsernameHistoryData, RawUsernamesToUsersInfoData } from "./users.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicUsers", baseUrl: "https://users.roblox.com" })
//////////////////////////////////////////////////////////////////////////////////


// [ Account Information ] ///////////////////////////////////////////////////////
/**
 * Gets the birthdate for the currently authenticated user.
 * @category Account Information
 * @endpoint GET /v1/birthdate
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:birthdate } = await ClassicUsersApi.authenticatedUserBirthdate();
 * @exampleData 2005-02-03T00:00:00.000Z
 * @exampleRawBody { birthMonth: 2, birthDay: 3, birthYear: 2005 }
 */
export const authenticatedUserBirthdate = createApiMethod(async  (
): ApiMethod<RawAuthenticatedUserBirthdateData, Date> => ({
  path: `/v1/birthdate`,
  method: "GET",
  name: "authenticatedUserBirthdate",

  formatRawDataFn: (rawData) => new Date(rawData.birthYear, rawData.birthMonth - 1, rawData.birthDay)
}))

/**
 * Gets the description for the currently authenticated user.
 * @category Account Information
 * @endpoint GET /v1/description
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:description } = await ClassicUsersApi.authenticatedUserDescription();
 * @exampleData Lorem ipsum dolor sit amet consectetur adipiscing elit.
 * @exampleRawBody { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit." }
 */
export const authenticatedUserDescription = createApiMethod(async  (
): ApiMethod<RawAuthenticatedUserDescriptionData, string> => ({
  path: `/v1/description`,
  method: "GET",
  name: "authenticatedUserDescription",

  formatRawDataFn: (rawData) => rawData.description
}))

/**
 * Gets the gender for the currently authenticated user.
 * @category Account Information
 * @endpoint GET /v1/gender
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:description } = await ClassicUsersApi.authenticatedUserGender();
 * @exampleData Male
 * @exampleRawBody { gender: 2 }
 */
export const authenticatedUserGender = createApiMethod(async (
): ApiMethod<RawAuthenticatedUserGenderData, PrettifiedAuthenticatedUserGenderData> => ({
  path: `/v1/gender`,
  method: "GET",
  name: "authenticatedUserGender",

  formatRawDataFn: ({ gender }) => gender == 3 ? "Female" : gender == 2 ? "Male" : "Unset"
}))
//////////////////////////////////////////////////////////////////////////////////


// [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////
/**
 * Validates a display name for a new user (NOTE: This does not change the display name).
 * @category Display Names
 * @endpoint GET /v1/display-names/validate
 * @detailedEndpoint GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
 * 
 * @param displayName The display name to be validated.
 * @param birthdate The birthdate of the new user.
 * 
 * @example const { data:displayNameIsValid } = await ClassicUsersApi.validateDisplayNameForNewUser({ displayName: "Hello", birthdate: "2023-07-27T04:14:57+0000" })
 * @exampleData true
 * @exampleRawBody {}
 */
export const validateDisplayNameForNewUser = createApiMethod(async  (
  { displayName, birthdate }: { displayName: string, birthdate: ISODateTime | Date }
): ApiMethod<{}, boolean> => ({
  path: `/v1/display-names/validate`,
  method: "GET",
  searchParams: { displayName, birthdate: birthdate instanceof Date ? birthdate.toISOString() : birthdate },
  name: "validateDisplayNameForNewUser",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))

/**
 * Validates a display name for an existing user (NOTE: This does not change the display name).
 * @category Display Names
 * @endpoint GET /v1/users/{userId}/display-names/validate
 * @detailedEndpoint GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
 * 
 * @param displayName The display name to be validated.
 * @param userId The id of the existing user.
 * 
 * @example const { data:displayNameIsValid } = await ClassicUsersApi.validateDisplayNameForExistingUser({ userId: 45348281, displayName: "Hello" })
 * @exampleData true
 * @exampleRawBody {}
 */
export const validateDisplayNameForExistingUser = createApiMethod(async  (
  { userId, displayName }: { userId: Identifier, displayName: string }
): ApiMethod<{}, boolean> => ({
  path: `/v1/users/${userId}/display-names/validate`,
  method: "GET",
  searchParams: { displayName },
  name: "validateDisplayNameForExistingUser",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))

/**
 * Sets the display name for the currently authenticated user.
 * @category Display Names
 * @endpoint PATCH /v1/users/{userId}/display-names
 * @tags [ "Auth Needed", "XCSRF" ]
 * 
 * @param newDisplayName The new display name for the authenticated user.
 * @param userId The id of the currently authenticated user (the endpoint requires this for some reason).
 * 
 * @example const { data:displayNameUpdated } = await ClassicUsersApi.authenticatedUserSetDisplayName({ userId: 45348281, newDisplayName: "LoremIpsum" })
 * @exampleData true
 * @exampleRawBody {}
 */
export const authenticatedUserSetDisplayName = createApiMethod(async  (
  { userId, newDisplayName }: { userId: Identifier, newDisplayName: string }
): ApiMethod<{}, boolean> => ({
  path: `/v1/users/${userId}/display-names`,
  method: "PATCH",
  body: { newDisplayName },
  name: "authenticatedUserSetDisplayName",

  formatRawDataFn: (rawData) => dataIsSuccess(rawData)
}))
//////////////////////////////////////////////////////////////////////////////////


// [ USERS ] /////////////////////////////////////////////////////////////////////
/**
 * Gets information about a user from their id.
 * @category Users
 * @endpoint GET /v1/users/{userId}
 * 
 * @param userId The id of the user to get detailed info about.
 * 
 * @example const { data:userInfo } = await ClassicUsersApi.userInfo({ userId: 45348281 });
 * @exampleData { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", created: 2013-07-13T07:50:00.083Z, isBanned: false, externalAppDisplayName: null, hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" }
 * @exampleRawBody { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", created: "2013-07-13T07:50:00.083Z", isBanned: false, externalAppDisplayName: null, hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" }
 */
export const userInfo = createApiMethod(async  <UserId extends Identifier>(
  { userId }: { userId: UserId }
): ApiMethod<RawUserInfoData<UserId>, PrettifiedUserInfoData<UserId>> => ({
  path: `/v1/users/${userId}`,
  method: "GET",
  name: "userInfo",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.created = new Date(obj.created))
}))

/**
 * Gets information about the currently authenticated user.
 * @category Users
 * @endpoint GET /v1/users/authenticated
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:userInfo } = await ClassicUsersApi.authenticatedUserInfo();
 * @exampleData { id: 45348281, name: "MightyPart", displayName: "MightyPart" }
 * @exampleRawBody { id: 45348281, name: "MightyPart", displayName: "MightyPart" }
 */
export const authenticatedUserInfo = createApiMethod(async (
): ApiMethod<AuthenticatedUserInfoData> => ({
  path: `/v1/users/authenticated`,
  method: "GET",
  name: "authenticatedUserInfo"
}))

/**
 * Gets the currently authenticated user's age bracket.
 * @category Users
 * @endpoint GET /v1/users/authenticated/age-bracket
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:ageBracket } = await ClassicUsersApi.authenticatedUserAgeBracket();
 * @exampleData 13+
 * @exampleRawBody { ageBracket: 0 }
 */
export const authenticatedUserAgeBracket = createApiMethod(async  (
): ApiMethod<RawAuthenticatedUserAgeBracketData, PrettifiedAuthenticatedUserAgeBracketData> => ({
  path: `/v1/users/authenticated/age-bracket`,
  method: "GET",
  name: "authenticatedUserAgeBracket",

  formatRawDataFn: ({ ageBracket }) => ageBracket == 0 ? "13+" : "<13"
}))


/**
 * Gets the currently authenticated user's country code.
 * @category Users
 * @endpoint GET /v1/users/authenticated/country-code
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:countryCode } = await ClassicUsersApi.authenticatedUserCountryCode();
 * @exampleData DE
 * @exampleRawBody { countryCode: "DE" }
 */
export const authenticatedUserCountryCode = createApiMethod(async  (
): ApiMethod<RawAuthenticatedUserCountryCodeData, PrettifiedAuthenticatedUserCountryCodeData> => ({
  path: `/v1/users/authenticated/country-code`,
  method: "GET",
  name: "authenticatedUserCountryCode",

  formatRawDataFn: ({ countryCode }) => countryCode
}))

/**
 * Gets the currently authenticated user's roles.
 * @category Users
 * @endpoint GET /v1/users/authenticated/roles
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:roles } = await ClassicUsersApi.authenticatedUserRoles();
 * @exampleData [ "BetaTester" ]
 * @exampleRawBody { roles: [ "BetaTester" ] }
 */
export const authenticatedUserRoles = createApiMethod(async  (
): ApiMethod<RawAuthenticatedUserRolesData, string[]> => ({
  path: `/v1/users/authenticated/roles`,
  method: "GET",
  name: "authenticatedUserRoles",

  formatRawDataFn: ({ roles }) => roles
}))

/**
 * Gets information about multiple users from their usernames.
 * @category Users
 * @endpoint POST /v1/usernames/users
 * 
 * @param usernames The usernames of the users to get info about.
 * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
 * 
 * @example const { data:usersInfo } = await ClassicUsersApi.usersInfoFromNames({ usernames: [ "MightyPart" ] });
 * @exampleData { MightyPart: { hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } }
 * @exampleRawBody { data: [ { requestedUsername: "MightyPart", hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } ] }
 */
export const usersInfoFromNames = createApiMethod(async <Username extends string>(
  { usernames, excludeBannedUsers = false }: { usernames: ArrayNonEmptyIfConst<Username>, excludeBannedUsers?: boolean }
): ApiMethod<RawUsernamesToUsersInfoData<Username>, PrettifiedUsernamesToUsersInfoData<Username>> => ({
  path: `/v1/usernames/users`,
  method: "POST",
  body: { usernames, excludeBannedUsers },
  name: "usernamesToUsersInfo",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(
    data, "requestedUsername",
    ({ hasVerifiedBadge, id, name, displayName }) => ({ hasVerifiedBadge, id, name, displayName })
  )
}))

/**
 * Gets information about multiple users from their ids.
 * @category Users
 * @endpoint POST /v1/users
 * 
 * @param userIds The ids of the users to get info about.
 * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
 * 
 * @example const { data:usersInfo } = await ClassicUsersApi.usersInfoFromIds({ userIds: [45348281] });
 * @exampleData { "45348281": { hasVerifiedBadge: false, name: "MightyPart", displayName: "MightyPart" } }
 * @exampleRawBody { data: [ { hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } ] }
 */
export const usersInfoFromIds = createApiMethod(async <UserId extends Identifier>(
  { userIds, excludeBannedUsers }: { userIds: ArrayNonEmptyIfConst<UserId>, excludeBannedUsers?: boolean }
): ApiMethod<RawUserIdsToUsersInfoData<UserId>, PrettifiedUserIdsToUsersInfoData<UserId>> => ({
  path: `/v1/users`,
  method: "POST",
  body: { userIds, excludeBannedUsers },
  name: "userIdsToUsersInfo",

  formatRawDataFn: ({ data }) => createObjectMapByKeyWithMiddleware(
    data, "id",
    ({ hasVerifiedBadge, name, displayName }) => ({ hasVerifiedBadge, name, displayName })
  )
}))
//////////////////////////////////////////////////////////////////////////////////


// [ Usernames ] /////////////////////////////////////////////////////////////////
/**
 * Gets a users previous usernames.
 * @category Usernames
 * @endpoint GET /v1/users/{userId}/username-history
 * @detailedEndpoint GET /v1/users/{userId}/username-history ? limit={limit} & sortOrder={sortOrder} & cursor={cursor}
 * 
 * @param userId The id of the user to get the username history for.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:previousUsernames } = await ClassicUsersApi.usernameHistory({ userId: 45348281 });
 * @exampleData [ "NamelessGuy2005", "parrrty" ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: null, data: [ { name: "NamelessGuy2005" }, { name: "parrrty" } ] }
 */
export const usernameHistory = createApiMethod(async (
  { userId, limit, sortOrder, cursor }
  :{ userId: Identifier, limit?: 10|25|50|100, sortOrder?: SortOrder, cursor?: string }
): ApiMethod<RawUsernameHistoryData, string[]> => ({
  path: `/v1/users/${userId}/username-history`,
  method: "GET",
  searchParams: { limit, sortOrder, cursor },
  name: "usernameHistory",

  formatRawDataFn: ({ data }) => data.map(({ name }) => name)
}))
//////////////////////////////////////////////////////////////////////////////////


// [ User Search ] ///////////////////////////////////////////////////////////////
/**
 * Searched for users.
 * @category Usernames
 * @endpoint  GET /v1/users/search
 * @detailedEndpoint GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
 * 
 * @param keyword The keyword to search users by.
 * @param limit The number of results to be returned
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:searchResults } = await ClassicUsersApi.userSearch({ keyword: "MightyPart", limit: 10 });
 * @exampleData [ { "previousUsernames": [ "parrrty", "NamelessGuy2005" ], "hasVerifiedBadge": false, "id": 45348281, "name": "MightyPart", "displayName": "MightyPart" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 2655994471, "name": "MightyPartJr", "displayName": "MightyPartJr" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 109174199, "name": "MightyPartyAnimal", "displayName": "jonny" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 151051171, "name": "MightyPartygirl101", "displayName": "india" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 3886457808, "name": "mightypartxl", "displayName": "mightypartxl" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 31488865, "name": "mightypartyrocker101", "displayName": "mightypartyrocker101" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 35463215, "name": "mightyparty3", "displayName": "mightyparty3" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 152196440, "name": "MightyPartygirl234", "displayName": "MightyPartygirl234" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 141415414, "name": "MightyPartygod49", "displayName": "MightyPartygod49" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 153951993, "name": "Mightypartylove", "displayName": "Mightypartylove" } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: 'eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImtleXdvcmQ6TWlnaHR5UGFydCIsImNvdW50IjoxMH0KNzU4ZDExMWU1NjYwZGI1YWQ3ZDk4ZTJhMzI3ZTQzNjA0ZjdkYzI0NGRjODlkMWY1YjczMDBjY2E3NDI4YmMxOQ==', data: [ { "previousUsernames": [ "parrrty", "NamelessGuy2005" ], "hasVerifiedBadge": false, "id": 45348281, "name": "MightyPart", "displayName": "MightyPart" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 2655994471, "name": "MightyPartJr", "displayName": "MightyPartJr" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 109174199, "name": "MightyPartyAnimal", "displayName": "jonny" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 151051171, "name": "MightyPartygirl101", "displayName": "india" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 3886457808, "name": "mightypartxl", "displayName": "mightypartxl" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 31488865, "name": "mightypartyrocker101", "displayName": "mightypartyrocker101" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 35463215, "name": "mightyparty3", "displayName": "mightyparty3" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 152196440, "name": "MightyPartygirl234", "displayName": "MightyPartygirl234" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 141415414, "name": "MightyPartygod49", "displayName": "MightyPartygod49" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 153951993, "name": "Mightypartylove", "displayName": "Mightypartylove" } ] }
 */
export const userSearch = createApiMethod(async (
  { keyword, limit, cursor }
  :{ keyword: string, limit?: 10|25|50|100, cursor?: string }
): ApiMethod<RawUserSearchData, PrettifiedUserSearchData> => ({
  path: `/v1/users/search`,
  method: "GET",
  searchParams: { keyword, limit, cursor },
  name: "userSearch",

  formatRawDataFn: ({ data }) => data
}))
//////////////////////////////////////////////////////////////////////////////////