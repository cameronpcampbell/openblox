// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { map } from "p-iteration"

import { apiFuncBaseHandler as baseHandler, buildApiMethodResponse as buildResponse, createFormattedData, dataIsSuccess } from "../../apis.utils"
import { cloneAndMutateObject, createDateTimeObjectFromBirthdate, createObjectMapByKeyWithMiddleware } from "../../../utils"
import { getCacheSettingsOverride, getCredentialsOverride } from "../../../config/config"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type {
  AuthenticatedUserAgeBracketData,
  AuthenticatedUserBirthdateData, AuthenticatedUserCountryCodeData, AuthenticatedUserDescriptionData, AuthenticatedUserGenderData, AuthenticatedUserInfoData, AuthenticatedUserRolesData, FormattedAuthenticatedUserAgeBracketData, FormattedAuthenticatedUserBirthdateData, FormattedAuthenticatedUserCountryCodeData, FormattedAuthenticatedUserDescriptionData, FormattedAuthenticatedUserGenderData, FormattedAuthenticatedUserRolesData, FormattedSearchData, FormattedUserIdsToUsersInfoData, FormattedUserInfoData, FormattedUsernameHistoryData, FormattedUsernamesToUsersInfoData, FormattedValidateDisplayNameForExistingUserData, FormattedValidateDisplayNameForNewUserData, SearchData, UserIdsToUsersInfoData, RawUserInfoData, UsernameHistoryData, UsernamesToUsersInfoData, ValidateDisplayNameForExisitingUserData, ValidateDisplayNameForNewUserData
} from "./usersApi.types"
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import type { ApiMethodResponse, SortOrder } from "../../apis.types"
import type { NonEmptyArray } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const baseUrl = "https://users.roblox.com"
const apiName = "ClassicUsersApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = ["setDisplayNameForAuthenticatedUser"]


// [ ACCOUNT INFORMATION ] ///////////////////////////////////////////////////////////////////////////////////////////
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
export async function authenticatedUserBirthdate(this: ThisAllOverrides): ApiMethodResponse<
  AuthenticatedUserBirthdateData, FormattedAuthenticatedUserBirthdateData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {

    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserBirthdateData>(`${baseUrl}/v1/birthdate`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserBirthdate")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: () => createDateTimeObjectFromBirthdate(rawBody), rawBody, response, cache: cache })
  }, [400])
}

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
export async function authenticatedUserDescription(this: ThisAllOverrides): ApiMethodResponse<
  AuthenticatedUserDescriptionData, FormattedAuthenticatedUserDescriptionData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {

    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserDescriptionData>(`${baseUrl}/v1/description`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserDescription")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: rawBody.description, rawBody, response, cache })
  }, [400])
}

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
export async function authenticatedUserGender(this: ThisAllOverrides): ApiMethodResponse<
  AuthenticatedUserGenderData, FormattedAuthenticatedUserGenderData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {

    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserGenderData>(`${baseUrl}/v1/gender`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserGender")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = (): FormattedAuthenticatedUserGenderData => {
      const gender = rawBody.gender
      return gender === 3 ? "Female" : gender === 2 ? "Male" : "Unset"
    }
    
    return buildResponse({ data: getFormattedData, rawBody, response, cache })
  }, [400])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Validates a display name for a new user (NOTE: This does not change the display name).
 * @category Display Names
 * @endpoint GET /v1/display-names/validate
 * @detailedEndpoint GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
 * 
 * @param displayName The display name to be validated.
 * @param birthdate The birthdate of the new user.
 * 
 * @example const { data:wasValidated } = await ClassicUsersApi.validateDisplayNameForNewUser("helloworld", "2023-07-27T04:14:57+0000");
 * @exampleData true
 * @exampleRawBody {}
 */
export async function validateDisplayNameForNewUser(this: ThisAllOverrides, displayName:string, birthdate: string): ApiMethodResponse<
  ValidateDisplayNameForNewUserData, FormattedValidateDisplayNameForNewUserData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<ValidateDisplayNameForNewUserData>(`${baseUrl}/v1/display-names/validate`, {
      searchParams: { displayName, birthdate },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "validateDisplayNameForNewUser")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: () => dataIsSuccess(rawBody), rawBody, response, cache })
  }, [400])
}

/**
 * Validates a display name for an existing user (NOTE: This does not change the display name).
 * @category Display Names
 * @endpoint GET /v1/users/{userId}/display-names/validate
 * @detailedEndpoint GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
 * 
 * @param displayName The display name to be validated.
 * @param userId The id of the existing user.
 * 
 * @example const { data:wasValidated } = await ClassicUsersApi.validateDisplayNameForExistingUser("helloworld", 45348281);
 * @exampleData true
 * @exampleRawBody {}
 */
export async function validateDisplayNameForExistingUser(this: ThisAllOverrides, displayName:string, userId: number): ApiMethodResponse<
  ValidateDisplayNameForExisitingUserData, FormattedValidateDisplayNameForExistingUserData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<ValidateDisplayNameForExisitingUserData>(`${baseUrl}/v1/users/${userId}/display-names/validate`, {
      searchParams: { displayName },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "validateDisplayNameForExistingUser")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: () => dataIsSuccess(rawBody), rawBody, response, cache })
  }, [400, 403])
}

/**
 * Sets the display name for the currently authenticated user.
 * @category Display Names
 * @endpoint PATCH /v1/users/{userId}/display-names
 * @tags [ "Auth Needed", "XCSRF" ]
 * 
 * @param newDisplayName The new display name for the authenticated user.
 * @param userId The id of the currently authenticated user (the endpoint requires this for some reason).
 * 
 * @example const { data:success } = await ClassicUsersApi.authenticatedUserSetDisplayName("myCoolNewDisplayName", 45348281);
 * @exampleData true
 * @exampleRawBody {}
 */
export async function authenticatedUserSetDisplayName(this: ThisAllOverrides, newDisplayName:string, userId: number): ApiMethodResponse<
  {}, boolean
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.patch<{}>(`${baseUrl}/v1/users/${userId}/display-names`, {
      body: { newDisplayName },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserSetDisplayName")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: () => dataIsSuccess(rawBody), rawBody, response, cache })
  }, [400, 403])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets information about a user from their id.
 * @category Users
 * @endpoint GET /v1/users/{userId}
 * 
 * @param userId The id of the user to get detailed info about.
 * 
 * @example const { data:userInfo } = await ClassicUsersApi.userInfo(45348281);
 * @exampleData { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", created: "2013-07-13T07:50:00.083Z", isBanned: false, externalAppDisplayName: null, hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" }
 * @exampleRawBody { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", created: "2013-07-13T07:50:00.083Z", isBanned: false, externalAppDisplayName: null, hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" }
 */
export async function userInfo<UserId extends number>(this: ThisAllOverrides, userId: UserId): ApiMethodResponse<
  RawUserInfoData<UserId>, FormattedUserInfoData<UserId>
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {

    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<RawUserInfoData<UserId>>(`${baseUrl}/v1/users/${userId}`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "userInfo")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => cloneAndMutateObject<RawUserInfoData<UserId>, FormattedUserInfoData<UserId>>(
      rawBody, obj => obj.created = new Date(obj.created)
    )

    return buildResponse({ data: getFormattedData, rawBody, response, cache })
  }, [404])
}

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
export async function authenticatedUserInfo(this: ThisAllOverrides): ApiMethodResponse<AuthenticatedUserInfoData> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserInfoData>(`${baseUrl}/v1/users/authenticated`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserInfo")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: rawBody, rawBody, response, cache })
  }, [])
}

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
export async function authenticatedUserAgeBracket(this: ThisAllOverrides): ApiMethodResponse<
  AuthenticatedUserAgeBracketData, FormattedAuthenticatedUserAgeBracketData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserAgeBracketData>(`${baseUrl}/v1/users/authenticated/age-bracket`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserAgeBracket")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: () => rawBody.ageBracket === 0 ? "13+" : "<13", rawBody, response, cache })
  }, [])
}

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
export async function authenticatedUserCountryCode(this: ThisAllOverrides): ApiMethodResponse<
  AuthenticatedUserCountryCodeData, FormattedAuthenticatedUserCountryCodeData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserCountryCodeData>(`${baseUrl}/v1/users/authenticated/country-code`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserCountryCode")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: rawBody.countryCode, rawBody, response, cache })
  }, [])
}

/**
 * Gets the currently authenticated user's roles.
 * @category Users
 * @endpoint GET /v1/users/authenticated/roles
 * @tags [ "Auth Needed" ]
 * 
 * @example const { data:userRoles } = await ClassicUsersApi.authenticatedUserRoles();
 * @exampleData [ "BetaTester" ]
 * @exampleRawBody { roles: [ "BetaTester" ] }
 */
export async function authenticatedUserRoles(this: ThisAllOverrides): ApiMethodResponse<
  AuthenticatedUserRolesData, FormattedAuthenticatedUserRolesData
> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<AuthenticatedUserRolesData>(`${baseUrl}/v1/users/authenticated/roles`, {
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "authenticatedUserRoles")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse({ data: rawBody.roles, rawBody, response, cache })
  }, [])
}

/**
 * Gets information about multiple users from their usernames.
 * @category Users
 * @endpoint POST /v1/usernames/users
 * 
 * @param usernames The usernames of the users to get info about.
 * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
 * 
 * @example const { data:usersInfo } = await ClassicUsersApi.usernamesToUsersInfo(["MightyPart"], false);
 * @exampleData { MightyPart: { hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } }
 * @exampleRawBody { data: [ { requestedUsername: "MightyPart", hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } ] }
 */
export async function usernamesToUsersInfo<Username extends string>(
  this: ThisAllOverrides, usernames: NonEmptyArray<Username>, excludeBannedUsers: boolean=false
): ApiMethodResponse<UsernamesToUsersInfoData, FormattedUsernamesToUsersInfoData<Username>> { 
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.post<UsernamesToUsersInfoData>(`${baseUrl}/v1/usernames/users`, {
      body: { usernames, excludeBannedUsers },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "usernamesToUsersInfo")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => createObjectMapByKeyWithMiddleware(
      rawBody.data, "requestedUsername",
      ({ hasVerifiedBadge, id, name, displayName }) => ({ hasVerifiedBadge, id, name, displayName })
    )

    return buildResponse({ data: getFormattedData, rawBody, response, cache })
  }, [400])   
}

/**
 * Gets information about multiple users from their ids.
 * @category Users
 * @endpoint POST /v1/users
 * 
 * @param userIds The ids of the users to get info about.
 * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
 * 
 * @example const { data:usersInfo } = await ClassicUsersApi.userIdsToUsersInfo([45348281], false);
 * @exampleData { "45348281": { hasVerifiedBadge: false, name: "MightyPart", displayName: "MightyPart" } }
 * @exampleRawBody { data: [ { hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } ] }
 */
export async function userIdsToUsersInfo<UserId extends number>(
  this: ThisAllOverrides, userIds: NonEmptyArray<UserId>, excludeBannedUsers: boolean=false
): ApiMethodResponse<UserIdsToUsersInfoData, FormattedUserIdsToUsersInfoData<UserId>> {
  const overrides = this
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.post<UserIdsToUsersInfoData>(`${baseUrl}/v1/users`, {
      body: { userIds, excludeBannedUsers },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "userIdsToUsersInfo")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => createObjectMapByKeyWithMiddleware(
      rawBody.data, "id",
      ({ hasVerifiedBadge, name, displayName }) => ({ hasVerifiedBadge, name, displayName })
    )

    return buildResponse({ data: getFormattedData, rawBody, response, cache })
  }, [400])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ USERNAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////
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
 * @example const { data:previousUsernames } = await ClassicUsersApi.usernameHistory(45348281, 50, "Desc");
 * @exampleData [ "NamelessGuy2005", "parrrty" ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: null, data: [ { name: "NamelessGuy2005" }, { name: "parrrty" } ] }
 */
export async function usernameHistory(this: ThisAllOverrides, userId: number, limit:10|25|50|100=100, sortOrder:SortOrder="Asc", cursor?: string): (
  ApiMethodResponse<UsernameHistoryData, FormattedUsernameHistoryData, "PAGINATED">
) {
  const overrides = this
  return await baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<UsernameHistoryData>(`${baseUrl}/v1/users/${userId}/username-history`, {
      searchParams: { limit, sortOrder, cursor },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "usernameHistory")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    const getFormattedData = () => rawBody.data.map(usernameData => usernameData.name)

    return buildResponse({ data: getFormattedData, rawBody, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, response, cache })
  }, [400]) as any
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
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
 * @example const { data:searchResults } = await ClassicUsersApi.userSearch("MightyPart", 10);
 * @exampleData [ { "previousUsernames": [ "parrrty", "NamelessGuy2005" ], "hasVerifiedBadge": false, "id": 45348281, "name": "MightyPart", "displayName": "MightyPart" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 2655994471, "name": "MightyPartJr", "displayName": "MightyPartJr" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 109174199, "name": "MightyPartyAnimal", "displayName": "jonny" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 151051171, "name": "MightyPartygirl101", "displayName": "india" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 3886457808, "name": "mightypartxl", "displayName": "mightypartxl" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 31488865, "name": "mightypartyrocker101", "displayName": "mightypartyrocker101" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 35463215, "name": "mightyparty3", "displayName": "mightyparty3" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 152196440, "name": "MightyPartygirl234", "displayName": "MightyPartygirl234" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 141415414, "name": "MightyPartygod49", "displayName": "MightyPartygod49" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 153951993, "name": "Mightypartylove", "displayName": "Mightypartylove" } ]
 * @exampleRawBody { previousPageCursor: null, nextPageCursor: 'eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImtleXdvcmQ6TWlnaHR5UGFydCIsImNvdW50IjoxMH0KNzU4ZDExMWU1NjYwZGI1YWQ3ZDk4ZTJhMzI3ZTQzNjA0ZjdkYzI0NGRjODlkMWY1YjczMDBjY2E3NDI4YmMxOQ==', data: [ { "previousUsernames": [ "parrrty", "NamelessGuy2005" ], "hasVerifiedBadge": false, "id": 45348281, "name": "MightyPart", "displayName": "MightyPart" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 2655994471, "name": "MightyPartJr", "displayName": "MightyPartJr" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 109174199, "name": "MightyPartyAnimal", "displayName": "jonny" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 151051171, "name": "MightyPartygirl101", "displayName": "india" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 3886457808, "name": "mightypartxl", "displayName": "mightypartxl" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 31488865, "name": "mightypartyrocker101", "displayName": "mightypartyrocker101" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 35463215, "name": "mightyparty3", "displayName": "mightyparty3" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 152196440, "name": "MightyPartygirl234", "displayName": "MightyPartygirl234" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 141415414, "name": "MightyPartygod49", "displayName": "MightyPartygod49" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 153951993, "name": "Mightypartylove", "displayName": "Mightypartylove" } ] }
 */
export async function userSearch(this: ThisAllOverrides, keyword:string, limit:10|25|50|100=100, cursor?:string): ApiMethodResponse<
  SearchData, FormattedSearchData, "PAGINATED"
> {
  const overrides = this
  
  return baseHandler(async function(this: ThisProfile) {
    const { body:rawBody, response, cachedResultType:cache } = await this.http.get<SearchData>(`${baseUrl}/v1/users/search`, {
      searchParams: { keyword, limit, cursor },
      cacheSettings: this.cacheAdapter && (getCacheSettingsOverride(overrides) || await this.findSettings(apiName, "userSearch")),
      credentialsOverride: getCredentialsOverride(overrides)
    })

    return buildResponse(
      { data: rawBody.data, rawBody, cursors: { previous: rawBody.previousPageCursor, next: rawBody.nextPageCursor }, response, cache }
    )
  }, [400])
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////