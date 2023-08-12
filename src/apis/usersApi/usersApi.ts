// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { map } from "p-iteration"

import { HttpHelper, HttpHelperType } from "../../utils/httpHelper"
import { createDateTimeObjectFromBirthdate, createObjectMapByKeyWithMiddleware, createSearchParams } from "../..//utils"
import { HandleApiErrors } from "../../utils/handleApiErrors"
import { UnexpectedError } from "../../errors"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type {
  AuthenticatedUserAgeBracketData,
  AuthenticatedUserBirthdateData, AuthenticatedUserCountryCodeData, AuthenticatedUserDescriptionData, AuthenticatedUserGenderData, AuthenticatedUserMinimalInfoData, AuthenticatedUserRolesData, DetailedUserInfoData, FormattedAuthenticatedUserAgeBracketData, FormattedAuthenticatedUserBirthdateData, FormattedAuthenticatedUserCountryCodeData, FormattedAuthenticatedUserDescriptionData, FormattedAuthenticatedUserGenderData, FormattedAuthenticatedUserRolesData, FormattedDetailedUserInfoData, FormattedSearchData, FormattedSetDisplayNameForAuthenticatedUserData, FormattedUserIdsToUsersInfoData, FormattedUsernameHistoryData, FormattedUsernamesToUsersInfoData, FormattedValidateDisplayNameForExistingUserData, FormattedValidateDisplayNameForNewUserData, SearchData, SetDisplayNameForAuthenticatedUserData, UserIdsToUsersInfoData, UsernameHistoryData, UsernamesToUsersInfoData, ValidateDisplayNameForExisitingUserData, ValidateDisplayNameForNewUserData
} from "./usersApiTypes"

import type { FirstChild, NonEmptyArray } from "../../utils/utilityTypes"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class UsersApiClass {
  baseUrl: string
  http: HttpHelperType

  constructor(cookie?:string) {
    this.baseUrl = "https://users.roblox.com"

    this.http = new HttpHelper(this.baseUrl, cookie)
  }


  // [ ACCOUNT INFORMATION ] ///////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the birthdate for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/birthdate
   */
  authenticatedUserBirthdate = async (): Promise<
    { data: FormattedAuthenticatedUserBirthdateData, rawData: AuthenticatedUserBirthdateData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AuthenticatedUserBirthdateData>("/v1/birthdate")
      return { data: createDateTimeObjectFromBirthdate(rawData), rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  /**
   * Gets the description for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/description
   */
  authenticatedUserDescription = async (): Promise<
    { data: FormattedAuthenticatedUserDescriptionData, rawData: AuthenticatedUserDescriptionData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AuthenticatedUserDescriptionData>("/v1/description")
      return { data: rawData.description, rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  /**
   * Gets the gender for the currently authenticated user.
   * @category Account Information
   * @endpoint GET /v1/gender
   */
  authenticatedUserGender = async (): Promise<
    { data: FormattedAuthenticatedUserGenderData, rawData: AuthenticatedUserGenderData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AuthenticatedUserGenderData>("/v1/gender")
      const rawGender = rawData.gender
      const gender = rawGender === 3 ? "Female" : rawGender === 2 ? "Male" : "Unset"
      return { data: gender, rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Validates a display name for a new user.
   * @category Display Names
   * @endpoint GET /v1/display-names/validate
   * @detailedEndpoint GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
   */
  validateDisplayNameForNewUser = async (displayName:string, birthdate: string): Promise<
    { data: FormattedValidateDisplayNameForNewUserData, rawData: ValidateDisplayNameForNewUserData }
  > => {
    try {
      const searchParams = await createSearchParams({ displayName, birthdate })

      const { data:rawData } = await this.http.get<ValidateDisplayNameForNewUserData>(`/v1/display-names/validate?${searchParams}`)
      return {data: !!rawData, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  /**
   * Validates a display name for an existing user.
   * @category Display Names
   * @endpoint GET /v1/users/{userId}/display-names/validate
   * @detailedEndpoint GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
   */
  validateDisplayNameForExistingUser = async (displayName:string, userId: number): Promise<
    { data: FormattedValidateDisplayNameForExistingUserData, rawData: ValidateDisplayNameForExisitingUserData }
  > => {
    try {
      const searchParams = await createSearchParams({ displayName })

      const { data:rawData } = await this.http.get<ValidateDisplayNameForExisitingUserData>(`/v1/users/${userId}/display-names/validate?${searchParams}`)
      return {data: !!rawData, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  /**
   * Sets the display name for a new user.
   * @category Display Names
   * @endpoint PATCH /v1/users/{userId}/display-names
   */
  setDisplayNameForAuthenticatedUser = async (newDisplayName:string, userId: number): Promise<
    { data: FormattedSetDisplayNameForAuthenticatedUserData, rawData: SetDisplayNameForAuthenticatedUserData }
  > => {
    try {
      const { data:rawData } = await this.http.patch<SetDisplayNameForAuthenticatedUserData>(`/v1/users/${userId}/display-names`, { newDisplayName })
      return {data: !!rawData, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets detailed information about a user from their id.
   * @category Users
   * @endpoint GET /v1/users/{userId}
   */
  detailedUserInfo = async (userId: number): Promise<
    { data: FormattedDetailedUserInfoData, rawData: DetailedUserInfoData }
  > => {
    try {
      const { data:rawData } = await this.http.get<DetailedUserInfoData>(`/v1/users/${userId}`)

      const formattedData = {...rawData} as any
      formattedData.created = new Date(formattedData.created)
      return {data: formattedData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [404])
      throw new UnexpectedError(error)
    }
  }

  /**
   * Gets minimal information about the currently authenticated user.
   * @category Users
   * @endpoint GET /v1/users/authenticated
   */
  authenticatedUserMinimalInfo = async (): Promise<
    { data: AuthenticatedUserMinimalInfoData, rawData: AuthenticatedUserMinimalInfoData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AuthenticatedUserMinimalInfoData>("/v1/users/authenticated")
      return {data: rawData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  /**
   * Gets the currently authenticated user's age bracket.
   * @category Users
   * @endpoint GET /v1/users/authenticated/age-bracket
   */
  authenticatedUserAgeBracket = async (): Promise<
    { data: FormattedAuthenticatedUserAgeBracketData, rawData: AuthenticatedUserAgeBracketData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AuthenticatedUserAgeBracketData>("/v1/users/authenticated/age-bracket")
      const rawAgeBracket = rawData?.ageBracket
      const ageBracket = rawAgeBracket === 0 ? "13+" : "<13"
      return {data: ageBracket, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  /**
   * Gets the currently authenticated user's country code.
   * @category Users
   * @endpoint GET /v1/users/authenticated/country-code
   */
  authenticatedUserCountryCode = async (): Promise<
    { data: FormattedAuthenticatedUserCountryCodeData, rawData: AuthenticatedUserCountryCodeData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AuthenticatedUserCountryCodeData>("/v1/users/authenticated/country-code")
      return {data: rawData.countryCode, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  /**
   * Gets the currently authenticated user's roles.
   * @category Users
   * @endpoint GET /v1/users/authenticated/roles
   */
  authenticatedUserRoles = async (): Promise<
    { data: FormattedAuthenticatedUserRolesData, rawData: AuthenticatedUserRolesData }
  > => {
    try {
      const { data:rawData } = await this.http.get<AuthenticatedUserRolesData>("/v1/users/authenticated/roles")
      return {data: rawData.roles, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }
  
  /**
   * Gets minimal information about multiple users from their usernames.
   * @category Users
   * @endpoint POST /v1/usernames/users
   */
  usernamesToUsersInfo = async <Username extends string>(
    usernames: NonEmptyArray<Username>, excludeBannedUsers: boolean=false
  ): Promise<
    {data: Record<Username, FirstChild<FormattedUsernamesToUsersInfoData>>, rawData: UsernamesToUsersInfoData }
  > => {
    try {
      const { data:rawData } = await this.http.post<UsernamesToUsersInfoData>(
        "/v1/usernames/users", { usernames, excludeBannedUsers }
      )

      const formattedData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "requestedUsername",
        async ({ hasVerifiedBadge, id, name, displayName }) => ({ hasVerifiedBadge, id, name, displayName })
      )

      return {data: formattedData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  /**
   * Gets minimal information about multiple users from their ids.
   * @category Users
   * @endpoint POST /v1/users
   */
  userIdsToUsersInfo = async <UserId extends number>(
    userIds: NonEmptyArray<UserId>, excludeBannedUsers: boolean=false
  ): Promise<
    { data: Record<UserId, FirstChild<FormattedUserIdsToUsersInfoData>>, rawData: UserIdsToUsersInfoData }
  > => {
    try {
      const { data:rawData } = await this.http.post<UserIdsToUsersInfoData>(
        "/v1/users", { userIds, excludeBannedUsers }
      )

      const formattedData = await createObjectMapByKeyWithMiddleware(
        rawData.data, "id",
        async ({ hasVerifiedBadge, name, displayName }) => ({ hasVerifiedBadge, name, displayName })
      )

      return {data: formattedData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  testingKek = async () => {
    console.log("testingKek")
  }

  // [ USERNAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets minimal information about multiple users from their ids.
   * @category Usernames
   * @endpoint GET /v1/users/{userId}/username-history
   * @detailedEndpoint GET /v1/users/{userId}/username-history ? limit={limit} & sortOrder={sortOrder} & cursor={cursor}
   */
  usernameHistory = async (userId: number, limit:10|25|50|100=100, sortOrder:"Asc"|"Desc"="Asc", cursor?: string): Promise<
    { data: FormattedUsernameHistoryData, rawData: UsernameHistoryData, cursors: { previous: string, next: string } }
  > => {
    try {
      const searchParams = await createSearchParams({ limit, sortOrder, cursor })
      const { data:rawData } = await this.http.get<UsernameHistoryData>(
        `/v1/users/${userId}/username-history?${searchParams}`
      )

      const formattedData: FormattedUsernameHistoryData = await map(
        rawData.data, async usernameData => usernameData.name
      )

      return {data: formattedData, rawData, cursors: { previous: rawData.previousPageCursor, next: rawData.nextPageCursor } }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets minimal information about multiple users from their ids.
   * @category Usernames
   * @endpoint  GET /v1/users/search
   * @detailedEndpoint GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
   */
  search = async (keyword:string, limit:10|25|50|100=100, cursor?:string): Promise<
    { data: FormattedSearchData, rawData: SearchData, cursors: { previous: string, next: string } }
  > => {
    try {
      const searchParams = await createSearchParams({ keyword, limit, cursor })
      const { data:rawData } = await this.http.get<SearchData>(`/v1/users/search?${searchParams}`)

      return { data: rawData.data, rawData, cursors: { previous: rawData.previousPageCursor, next: rawData.nextPageCursor } }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const UsersApi = new UsersApiClass()