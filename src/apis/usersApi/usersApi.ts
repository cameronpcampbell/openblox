// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { map } from "p-iteration"

import { HttpHelper } from "../../lib/http/httpHelper"
import { createDateTimeObjectFromBirthdate, createObjectMapByKeyWithMiddleware, createSearchParams } from "../../lib/lib.utils"
import { FindSettings } from "../../lib/apis/cacheAdapters/cacheAdapters.utils"
import { ApiFuncBaseHandler as BaseHandler } from "../../lib/apis/apis.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type {
  AuthenticatedUserAgeBracketData,
  AuthenticatedUserBirthdateData, AuthenticatedUserCountryCodeData, AuthenticatedUserDescriptionData, AuthenticatedUserGenderData, AuthenticatedUserMinimalInfoData, AuthenticatedUserRolesData, DetailedUserInfoData, FormattedAuthenticatedUserAgeBracketData, FormattedAuthenticatedUserBirthdateData, FormattedAuthenticatedUserCountryCodeData, FormattedAuthenticatedUserDescriptionData, FormattedAuthenticatedUserGenderData, FormattedAuthenticatedUserRolesData, FormattedDetailedUserInfoData, FormattedSearchData, FormattedSetDisplayNameForAuthenticatedUserData, FormattedUserIdsToUsersInfoData, FormattedUsernameHistoryData, FormattedUsernamesToUsersInfoData, FormattedValidateDisplayNameForExistingUserData, FormattedValidateDisplayNameForNewUserData, SearchData, SetDisplayNameForAuthenticatedUserData, UserIdsToUsersInfoData, UsernameHistoryData, UsernamesToUsersInfoData, ValidateDisplayNameForExisitingUserData, ValidateDisplayNameForNewUserData
} from "./usersApi.types"
import type { HttpHelperType } from "../../lib/http/httpHelper"
import type { FirstChild, NonEmptyArray, PrettifyKeyof } from "../../lib/lib.types"
import type { ApiMethods } from "../../lib/apis/apis.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class UsersApiClass {
  baseUrl: `https://${string}`
  http: HttpHelperType
  name: string
  apiCacheMiddleware: any

  constructor(
    { cookie, apiCacheMiddleware, csrfRetries }:
    { cookie?: string, apiCacheMiddleware?: any, csrfRetries?: number }
  ) {
    this.baseUrl = "https://users.roblox.com"
    this.name = "UsersApiClass"
    this.apiCacheMiddleware = apiCacheMiddleware

    this.http = new HttpHelper({baseUrl: this.baseUrl, cookie, apiCacheMiddleware, csrfRetries})
  }

  getCallerFunctionName() {
    try {
      throw new Error();
    } catch (error: any) {
      const stackLines = error.stack.split('\n');
      const callerLine = stackLines[2];
      const functionName = (/at (\S+)/.exec(callerLine) as any)[1];
      const classRegex = new RegExp('^' + this.name + '\\.');
      return functionName.replace(classRegex, '');
    }
  }

  async findSettings(funcName: string) {
    return await FindSettings(this.apiCacheMiddleware?.arguments?.included, this.name, funcName)
  }


  // [ ACCOUNT INFORMATION ] ///////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the birthdate for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/birthdate
   * @tags [ "Auth Needed" ]
   */
  authenticatedUserBirthdate = async (): Promise<
    { data: FormattedAuthenticatedUserBirthdateData, rawData: AuthenticatedUserBirthdateData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AuthenticatedUserBirthdateData>("/v1/birthdate", undefined, cacheSettings)
      return { data: createDateTimeObjectFromBirthdate(rawData), rawData }
    }, [400])
  }

  /**
   * Gets the description for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/description
   * @tags [ "Auth Needed" ]
   */
  authenticatedUserDescription = async (): Promise<
    { data: FormattedAuthenticatedUserDescriptionData, rawData: AuthenticatedUserDescriptionData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AuthenticatedUserDescriptionData>("/v1/description", undefined, cacheSettings)
      return { data: rawData.description, rawData }
    }, [400])
  }

  /**
   * Gets the gender for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/gender
   * @tags [ "Auth Needed" ]
   */
  authenticatedUserGender = async (): Promise<
    { data: FormattedAuthenticatedUserGenderData, rawData: AuthenticatedUserGenderData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AuthenticatedUserGenderData>("/v1/gender", undefined, cacheSettings)
      const rawGender = rawData.gender
      const gender = rawGender === 3 ? "Female" : rawGender === 2 ? "Male" : "Unset"
      return { data: gender, rawData }
    }, [400])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Validates a display name for a new user.
   * @category Display Names
   * @endpoint GET /v1/display-names/validate
   * @detailedEndpoint GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
   * 
   * @param displayName The display name to be validated.
   * @param birthdate The birthdate of the new user.
   */
  validateDisplayNameForNewUser = async (displayName:string, birthdate: string): Promise<
    { data: FormattedValidateDisplayNameForNewUserData, rawData: ValidateDisplayNameForNewUserData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ displayName, birthdate })

      const { data:rawData } = await this.http.get<ValidateDisplayNameForNewUserData>(
        `/v1/display-names/validate?${searchParams}`, undefined, cacheSettings
      )
      return {data: !!rawData, rawData}
    }, [400])
  }

  /**
   * Validates a display name for an existing user.
   * @category Display Names
   * @endpoint GET /v1/users/{userId}/display-names/validate
   * @detailedEndpoint GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
   * 
   * @param displayName The display name to be validated.
   * @param userId The id of the existing user.
   */
  validateDisplayNameForExistingUser = async (displayName:string, userId: number): Promise<
    { data: FormattedValidateDisplayNameForExistingUserData, rawData: ValidateDisplayNameForExisitingUserData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ displayName })

      const { data:rawData } = await this.http.get<ValidateDisplayNameForExisitingUserData>(
        `/v1/users/${userId}/display-names/validate?${searchParams}`, undefined, cacheSettings
      )
      return {data: !!rawData, rawData}
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
   */
  setDisplayNameForAuthenticatedUser = async (newDisplayName:string, userId: number): Promise<
    { data: FormattedSetDisplayNameForAuthenticatedUserData, rawData: SetDisplayNameForAuthenticatedUserData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.patch<SetDisplayNameForAuthenticatedUserData>(
        `/v1/users/${userId}/display-names`, { newDisplayName }, undefined, undefined, cacheSettings
      )
      return {data: !!rawData, rawData}
    }, [400, 403])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets detailed information about a user from their id.
   * @category Users
   * @endpoint GET /v1/users/{userId}
   * 
   * @param userId The id of the user to get detailed info about.
   */
  detailedUserInfo = async (userId: number): Promise<
    { data: FormattedDetailedUserInfoData, rawData: DetailedUserInfoData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<DetailedUserInfoData>(`/v1/users/${userId}`, undefined, cacheSettings)

      const formattedData = {...rawData} as any
      formattedData.created = new Date(formattedData.created)
      return {data: formattedData, rawData}
    }, [404])
  }

  /**
   * Gets minimal information about the currently authenticated user.
   * @category Users
   * @endpoint GET /v1/users/authenticated
   * @tags [ "Auth Needed" ]
   */
  authenticatedUserMinimalInfo = async (): Promise<
    { data: AuthenticatedUserMinimalInfoData, rawData: AuthenticatedUserMinimalInfoData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AuthenticatedUserMinimalInfoData>("/v1/users/authenticated", undefined, cacheSettings)
      return {data: rawData, rawData}
    }, [])
  }

  /**
   * Gets the currently authenticated user's age bracket.
   * @category Users
   * @endpoint GET /v1/users/authenticated/age-bracket
   * @tags [ "Auth Needed" ]
   */
  authenticatedUserAgeBracket = async (): Promise<
    { data: FormattedAuthenticatedUserAgeBracketData, rawData: AuthenticatedUserAgeBracketData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AuthenticatedUserAgeBracketData>("/v1/users/authenticated/age-bracket", undefined, cacheSettings)
      const rawAgeBracket = rawData?.ageBracket
      const ageBracket = rawAgeBracket === 0 ? "13+" : "<13"
      return {data: ageBracket, rawData}
    }, [])
  }

  /**
   * Gets the currently authenticated user's country code.
   * @category Users
   * @endpoint GET /v1/users/authenticated/country-code
   * @tags [ "Auth Needed" ]
   */
  authenticatedUserCountryCode = async (): Promise<
    { data: FormattedAuthenticatedUserCountryCodeData, rawData: AuthenticatedUserCountryCodeData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AuthenticatedUserCountryCodeData>("/v1/users/authenticated/country-code", undefined, cacheSettings)
      return {data: rawData.countryCode, rawData}
    }, [])
  }

  /**
   * Gets the currently authenticated user's roles.
   * @category Users
   * @endpoint GET /v1/users/authenticated/roles
   * @tags [ "Auth Needed" ]
   */
  authenticatedUserRoles = async (): Promise<
    { data: FormattedAuthenticatedUserRolesData, rawData: AuthenticatedUserRolesData }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.get<AuthenticatedUserRolesData>("/v1/users/authenticated/roles", undefined, cacheSettings)
      return {data: rawData.roles, rawData}
    }, [])
  }
  
  /**
   * Gets minimal information about multiple users from their usernames.
   * @category Users
   * @endpoint POST /v1/usernames/users
   * 
   * @param usernames The usernames of the users to get info about.
   * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
   */
  usernamesToUsersInfo = async <Username extends string>(
    usernames: NonEmptyArray<Username>, excludeBannedUsers: boolean=false
  ): Promise<{
    data: Record<Username, FirstChild<FormattedUsernamesToUsersInfoData>>, rawData: UsernamesToUsersInfoData
  }> => { 
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.post<UsernamesToUsersInfoData>(
        "/v1/usernames/users", { usernames, excludeBannedUsers }, undefined, undefined, cacheSettings
      )

      const formattedData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "requestedUsername",
        async ({ hasVerifiedBadge, id, name, displayName }) => ({ hasVerifiedBadge, id, name, displayName })
      )

      return {data: formattedData, rawData}
    }, [400])   
  }

  /**
   * Gets minimal information about multiple users from their ids.
   * @category Users
   * @endpoint POST /v1/users
   * 
   * @param userIds The ids of the users to get info about.
   * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
   */
  userIdsToUsersInfo = async <UserId extends number>(
    userIds: NonEmptyArray<UserId>, excludeBannedUsers: boolean=false
  ): Promise<{
    data: Record<UserId, FirstChild<FormattedUserIdsToUsersInfoData>>, rawData: UserIdsToUsersInfoData
  }> => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const { data:rawData } = await this.http.post<UserIdsToUsersInfoData>(
        "/v1/users", { userIds, excludeBannedUsers }, undefined, undefined, cacheSettings
      )

      const formattedData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "id",
        async ({ hasVerifiedBadge, name, displayName }) => ({ hasVerifiedBadge, name, displayName })
      )

      return {data: formattedData, rawData}
    }, [400])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  // [ USERNAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets minimal information about multiple users from their ids.
   * @category Usernames
   * @endpoint GET /v1/users/{userId}/username-history
   * @detailedEndpoint GET /v1/users/{userId}/username-history ? limit={limit} & sortOrder={sortOrder} & cursor={cursor}
   * 
   * @param userId The id of the user to get the username history for.
   * @param limit The number of results to be returned.
   * @param sortOrder The order that the results are sorted in.
   * @param cursor The paging cursor for the previous or next page.
   */
  usernameHistory = async (userId: number, limit:10|25|50|100=100, sortOrder:"Asc"|"Desc"="Asc", cursor?: string): Promise<
    { data: FormattedUsernameHistoryData, rawData: UsernameHistoryData, cursors: { previous: string, next: string } }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ limit, sortOrder, cursor })
      const { data:rawData } = await this.http.get<UsernameHistoryData>(
        `/v1/users/${userId}/username-history?${searchParams}`, undefined, cacheSettings
      )

      const formattedData: FormattedUsernameHistoryData = await map(
        rawData.data, async usernameData => usernameData.name
      )

      return {data: formattedData, rawData, cursors: { previous: rawData.previousPageCursor, next: rawData.nextPageCursor } }
    }, [400])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets minimal information about multiple users from their ids.
   * @category Usernames
   * @endpoint  GET /v1/users/search
   * @detailedEndpoint GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
   * 
   * @param keyword The keyword to search users by.
   * @param limit The number of results to be returned
   * @param cursor The paging cursor for the previous or next page.
   */
  search = async (keyword:string, limit:10|25|50|100=100, cursor?:string): Promise<
    { data: FormattedSearchData, rawData: SearchData, cursors: { previous: string, next: string } }
  > => {
    return BaseHandler(async () => {
      const cacheSettings = this.apiCacheMiddleware ? await this.findSettings(this.getCallerFunctionName()) : undefined

      const searchParams = await createSearchParams({ keyword, limit, cursor })
      const { data:rawData } = await this.http.get<SearchData>(`/v1/users/search?${searchParams}`, undefined, cacheSettings)

      return { data: rawData.data, rawData, cursors: { previous: rawData.previousPageCursor, next: rawData.nextPageCursor } }
    }, [400])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


export const UsersApi = new UsersApiClass({}) as ApiMethods<UsersApiClass>