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
import type { FirstChild, NonEmptyArray } from "../../lib/lib.types"
import type { ApiMethods } from "../../lib/apis/apis.types"
import { AgResponse } from "../../lib/http/httpAdapters/httpAdapters.utils"
import { FetchAdapterConfig } from "../../lib/http/httpAdapters/httpAdapters.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class UsersApiClass {
  baseUrl: `https://${string}`
  http: HttpHelper
  name: string
  apiCacheMiddleware: any
  httpAdapter: unknown

  constructor(
    { cookie, apiCacheMiddleware, csrfRetries, httpAdapter }:
    { cookie?: string, apiCacheMiddleware?: any, csrfRetries?: number, httpAdapter?: FetchAdapterConfig<any> }
  ) {
    this.baseUrl = "https://users.roblox.com"
    this.name = "UsersApiClass"
    this.apiCacheMiddleware = apiCacheMiddleware

    this.httpAdapter = httpAdapter

    this.http = new HttpHelper({baseUrl: this.baseUrl, cookie, apiCacheMiddleware, csrfRetries, httpAdapter})
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
   * 
   * @example const { data:birthdate } = await client.apis.UsersApi.authenticatedUserBirthdate();
   * @exampleData 2005-02-03T00:00:00.000Z
   * @exampleRawData { birthMonth: 2, birthDay: 3, birthYear: 2005 }
   */
  authenticatedUserBirthdate = async (): Promise<
    { data: FormattedAuthenticatedUserBirthdateData, rawData: AuthenticatedUserBirthdateData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AuthenticatedUserBirthdateData>("/v1/birthdate", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: createDateTimeObjectFromBirthdate(rawData), rawData, res  }
    }, [400])
  }

  /**
   * Gets the description for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/description
   * @tags [ "Auth Needed" ]
   * 
   * @example const { data:description } = await client.apis.UsersApi.authenticatedUserDescription();
   * @exampleData Lorem ipsum dolor sit amet consectetur adipiscing elit.
   * @exampleRawData { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit." }
   */
  authenticatedUserDescription = async (): Promise<
    { data: FormattedAuthenticatedUserDescriptionData, rawData: AuthenticatedUserDescriptionData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AuthenticatedUserDescriptionData>("/v1/description", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData.description, rawData, res  }
    }, [400])
  }

  /**
   * Gets the gender for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/gender
   * @tags [ "Auth Needed" ]
   * 
   * @example const { data:description } = await client.apis.UsersApi.authenticatedUserGender();
   * @exampleData Male
   * @exampleRawData { gender: 2 }
   */
  authenticatedUserGender = async (): Promise<
    { data: FormattedAuthenticatedUserGenderData, rawData: AuthenticatedUserGenderData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AuthenticatedUserGenderData>("/v1/gender", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const gender = rawData.gender
      const formattedGender: FormattedAuthenticatedUserGenderData = gender === 3 ? "Female" : gender === 2 ? "Male" : "Unset"
      
      return { data: formattedGender, rawData, res  }
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
   * @example const { data:wasValidated } = await UsersApi.validateDisplayNameForNewUser("helloworld", "2023-07-27T04:14:57+0000");
   * @exampleData true
   * @exampleRawData {}
   */
  validateDisplayNameForNewUser = async (displayName:string, birthdate: string): Promise<
    { data: FormattedValidateDisplayNameForNewUserData, rawData: ValidateDisplayNameForNewUserData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<ValidateDisplayNameForNewUserData>("/v1/display-names/validate", {
        searchParams: { displayName, birthdate },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: !!rawData, rawData, res }
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
   * @example const { data:wasValidated } = await UsersApi.validateDisplayNameForExistingUser("helloworld", 45348281);
   * @exampleData true
   * @exampleRawData {}
   */
  validateDisplayNameForExistingUser = async (displayName:string, userId: number): Promise<
    { data: FormattedValidateDisplayNameForExistingUserData, rawData: ValidateDisplayNameForExisitingUserData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<ValidateDisplayNameForExisitingUserData>(`/v1/users/${userId}/display-names/validate`, {
        searchParams: { displayName },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: !!rawData, rawData, res }
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
   * @example
   * const setDisplayName = async (displayName: string, userId: number) => {
   *   try {
   *     await client.apis.UsersApi.setDisplayNameForAuthenticatedUser(displayName, userId);
   *     return true;
   *   } catch { return false };
   * };
   * const wasDisplayNameSet = await setDisplayName("myCoolNewDisplayName", 45348281);
   * @exampleData true
   * @exampleRawData {}
   */
  setDisplayNameForAuthenticatedUser = async (newDisplayName:string, userId: number): Promise<
    { data: FormattedSetDisplayNameForAuthenticatedUserData, rawData: SetDisplayNameForAuthenticatedUserData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.patch<SetDisplayNameForAuthenticatedUserData>(`/v1/users/${userId}/display-names`, {
        body: { newDisplayName },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: !!rawData, rawData, res }
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
   * 
   * @example const { data:detailedUserInfo } = await UsersApi.detailedUserInfo(45348281);
   * @exampleData { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", created: "2013-07-13T07:50:00.083Z", isBanned: false, externalAppDisplayName: null, hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" }
   * @exampleRawData { description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", created: "2013-07-13T07:50:00.083Z", isBanned: false, externalAppDisplayName: null, hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" }
   */
  detailedUserInfo = async (userId: number): Promise<
    { data: FormattedDetailedUserInfoData, rawData: DetailedUserInfoData }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<DetailedUserInfoData>(`/v1/users/${userId}`, {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData = {...rawData} as any
      formattedData.created = new Date(formattedData.created)

      return { data: formattedData, rawData, res }
    }, [404])
  }

  /**
   * Gets minimal information about the currently authenticated user.
   * @category Users
   * @endpoint GET /v1/users/authenticated
   * @tags [ "Auth Needed" ]
   * 
   * @example const { data:minimalInfo } = await client.apis.UsersApi.authenticatedUserMinimalInfo();
   * @exampleData { id: 45348281, name: "MightyPart", displayName: "MightyPart" }
   * @exampleRawData { id: 45348281, name: "MightyPart", displayName: "MightyPart" }
   */
  authenticatedUserMinimalInfo = async (): Promise<
    { data: AuthenticatedUserMinimalInfoData, rawData: AuthenticatedUserMinimalInfoData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AuthenticatedUserMinimalInfoData>("/v1/users/authenticated", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData, rawData, res }
    }, [])
  }

  /**
   * Gets the currently authenticated user's age bracket.
   * @category Users
   * @endpoint GET /v1/users/authenticated/age-bracket
   * @tags [ "Auth Needed" ]
   * 
   * @example const { data:ageBracket } = await client.apis.UsersApi.authenticatedUserAgeBracket();
   * @exampleData 13+
   * @exampleRawData { ageBracket: 0 }
   */
  authenticatedUserAgeBracket = async (): Promise<
    { data: FormattedAuthenticatedUserAgeBracketData, rawData: AuthenticatedUserAgeBracketData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AuthenticatedUserAgeBracketData>("/v1/users/authenticated/age-bracket", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedAuthenticatedUserAgeBracketData = rawData?.ageBracket === 0 ? "13+" : "<13"

      return { data: formattedData, rawData, res }
    }, [])
  }

  /**
   * Gets the currently authenticated user's country code.
   * @category Users
   * @endpoint GET /v1/users/authenticated/country-code
   * @tags [ "Auth Needed" ]
   * 
   * @example const { data:countryCode } = await client.apis.UsersApi.authenticatedUserCountryCode();
   * @exampleData DE
   * @exampleRawData { countryCode: "DE" }
   */
  authenticatedUserCountryCode = async (): Promise<
    { data: FormattedAuthenticatedUserCountryCodeData, rawData: AuthenticatedUserCountryCodeData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AuthenticatedUserCountryCodeData>("/v1/users/authenticated/country-code", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData.countryCode, rawData, res }
    }, [])
  }

  /**
   * Gets the currently authenticated user's roles.
   * @category Users
   * @endpoint GET /v1/users/authenticated/roles
   * @tags [ "Auth Needed" ]
   * 
   * @example const { data:userRoles } = await client.apis.UsersApi.authenticatedUserRoles();
   * @exampleData [ "BetaTester" ]
   * @exampleRawData { roles: [ "BetaTester" ] }
   */
  authenticatedUserRoles = async (): Promise<
    { data: FormattedAuthenticatedUserRolesData, rawData: AuthenticatedUserRolesData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<AuthenticatedUserRolesData>("/v1/users/authenticated/roles", {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData.roles, rawData, res }
    }, [])
  }
  
  /**
   * Gets minimal information about multiple users from their usernames.
   * @category Users
   * @endpoint POST /v1/usernames/users
   * 
   * @param usernames The usernames of the users to get info about.
   * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
   * 
   * @example const { data:usersInfo } = await UsersApi.usernamesToUsersInfo(["MightyPart"], false);
   * @exampleData { MightyPart: { hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } }
   * @exampleRawData { data: [ { requestedUsername: "MightyPart", hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } ] }
   */
  usernamesToUsersInfo = async <Username extends string>(
    usernames: NonEmptyArray<Username>, excludeBannedUsers: boolean=false
  ): Promise<{
    data: Record<Username, FirstChild<FormattedUsernamesToUsersInfoData>>, rawData: UsernamesToUsersInfoData, res: unknown
  }> => { 
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.post<UsernamesToUsersInfoData>("/v1/usernames/users", {
        body: { usernames, excludeBannedUsers },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "requestedUsername",
        async ({ hasVerifiedBadge, id, name, displayName }) => ({ hasVerifiedBadge, id, name, displayName })
      )

      return { data: formattedData, rawData, res }
    }, [400])   
  }

  /**
   * Gets minimal information about multiple users from their ids.
   * @category Users
   * @endpoint POST /v1/users
   * 
   * @param userIds The ids of the users to get info about.
   * @param excludeBannedUsers Dictates if info about banned users should be excluded from the returned data. (defaults to false).
   * 
   * @example const { data:usersInfo } = await UsersApi.userIdsToUsersInfo([45348281], false);
   * @exampleData { "45348281": { hasVerifiedBadge: false, name: "MightyPart", displayName: "MightyPart" } }
   * @exampleRawData { data: [ { hasVerifiedBadge: false, id: 45348281, name: "MightyPart", displayName: "MightyPart" } ] }
   */
  userIdsToUsersInfo = async <UserId extends number>(
    userIds: NonEmptyArray<UserId>, excludeBannedUsers: boolean=false
  ): Promise<{
    data: Record<UserId, FirstChild<FormattedUserIdsToUsersInfoData>>, rawData: UserIdsToUsersInfoData, res?: AgResponse
  }> => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.post<UserIdsToUsersInfoData>("/v1/users", {
        body: { userIds, excludeBannedUsers },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "id",
        async ({ hasVerifiedBadge, name, displayName }) => ({ hasVerifiedBadge, name, displayName })
      )

      return { data: formattedData, rawData, res }
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
   * @example const { data:previousUsernames } = await UsersApi.usernameHistory(45348281, 50, "Desc");
   * @exampleData [ "NamelessGuy2005", "parrrty" ]
   * @exampleRawData { previousPageCursor: null, nextPageCursor: null, data: [ { name: "NamelessGuy2005" }, { name: "parrrty" } ] }
   */
  usernameHistory = async (userId: number, limit:10|25|50|100=100, sortOrder:"Asc"|"Desc"="Asc", cursor?: string): Promise<
    { data: FormattedUsernameHistoryData, rawData: UsernameHistoryData, cursors: { previous: string, next: string }, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<UsernameHistoryData>(`/v1/users/${userId}/username-history`, {
        searchParams: { limit, sortOrder, cursor },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData: FormattedUsernameHistoryData = await map(
        rawData.data, async usernameData => usernameData.name
      )

      return { data: formattedData, rawData, cursors: { previous: rawData.previousPageCursor, next: rawData.nextPageCursor }, res }
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
   * 
   * @example const { data:searchResults } = await UsersApi.search("MightyPart", 10);
   * @exampleData [ { "previousUsernames": [ "parrrty", "NamelessGuy2005" ], "hasVerifiedBadge": false, "id": 45348281, "name": "MightyPart", "displayName": "MightyPart" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 2655994471, "name": "MightyPartJr", "displayName": "MightyPartJr" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 109174199, "name": "MightyPartyAnimal", "displayName": "jonny" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 151051171, "name": "MightyPartygirl101", "displayName": "india" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 3886457808, "name": "mightypartxl", "displayName": "mightypartxl" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 31488865, "name": "mightypartyrocker101", "displayName": "mightypartyrocker101" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 35463215, "name": "mightyparty3", "displayName": "mightyparty3" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 152196440, "name": "MightyPartygirl234", "displayName": "MightyPartygirl234" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 141415414, "name": "MightyPartygod49", "displayName": "MightyPartygod49" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 153951993, "name": "Mightypartylove", "displayName": "Mightypartylove" } ]
   * @exampleRawData { previousPageCursor: null, nextPageCursor: 'eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImtleXdvcmQ6TWlnaHR5UGFydCIsImNvdW50IjoxMH0KNzU4ZDExMWU1NjYwZGI1YWQ3ZDk4ZTJhMzI3ZTQzNjA0ZjdkYzI0NGRjODlkMWY1YjczMDBjY2E3NDI4YmMxOQ==', data: [ { "previousUsernames": [ "parrrty", "NamelessGuy2005" ], "hasVerifiedBadge": false, "id": 45348281, "name": "MightyPart", "displayName": "MightyPart" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 2655994471, "name": "MightyPartJr", "displayName": "MightyPartJr" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 109174199, "name": "MightyPartyAnimal", "displayName": "jonny" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 151051171, "name": "MightyPartygirl101", "displayName": "india" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 3886457808, "name": "mightypartxl", "displayName": "mightypartxl" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 31488865, "name": "mightypartyrocker101", "displayName": "mightypartyrocker101" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 35463215, "name": "mightyparty3", "displayName": "mightyparty3" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 152196440, "name": "MightyPartygirl234", "displayName": "MightyPartygirl234" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 141415414, "name": "MightyPartygod49", "displayName": "MightyPartygod49" }, { "previousUsernames": [], "hasVerifiedBadge": false, "id": 153951993, "name": "Mightypartylove", "displayName": "Mightypartylove" } ] }
   */
  search = async (keyword:string, limit:10|25|50|100=100, cursor?:string): Promise<
    { data: FormattedSearchData, rawData: SearchData, cursors: { previous: string, next: string }, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<SearchData>(`/v1/users/search`, {
        searchParams: { keyword, limit, cursor },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { data: rawData.data, rawData, cursors: { previous: rawData.previousPageCursor, next: rawData.nextPageCursor }, res }
    }, [400])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


export const UsersApi = new UsersApiClass({}) as ApiMethods<UsersApiClass>