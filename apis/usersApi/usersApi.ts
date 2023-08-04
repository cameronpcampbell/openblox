// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { map } from "p-iteration"

import { HttpHelper, HttpHelperType } from "../../httpHelper"
import { CreateDateTimeObjectFromBirthdate, CreateObjectMapByKeyWithMiddleware, createSearchParams } from "../../utils"
import { HandleApiErrors } from "../handleApiErrors"
import { UnexpectedError } from "../../errors"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type {
  AuthenticatedUserAgeBracketData,
  AuthenticatedUserBirthdateData, AuthenticatedUserCountryCodeData, AuthenticatedUserDescriptionData, AuthenticatedUserGenderData, AuthenticatedUserMinimalInfoData, AuthenticatedUserRolesData, DetailedUserInfoData, RawAuthenticatedUserAgeBracketData, RawAuthenticatedUserBirthdateData, RawAuthenticatedUserCountryCodeData, RawAuthenticatedUserDescriptionData, RawAuthenticatedUserGenderData, RawAuthenticatedUserMinimalInfoData, RawAuthenticatedUserRolesData, RawDetailedUserInfoData, RawSearchData, RawSetDisplayNameForAuthenticatedUserData, RawUserIdsToUsersInfoData, RawUsernameHistoryData, RawUsernamesToUsersInfoData, RawValidateDisplayNameForExisitingUserData, RawValidateDisplayNameForNewUserData, SearchData, SetDisplayNameForAuthenticatedUserData, UserIdsToUsersInfoData, UsernameHistoryData, UsernamesToUsersInfoData, ValidateDisplayNameForExistingUserData, ValidateDisplayNameForNewUserData
} from "./usersApiTypes"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class UsersApiClass {
  baseUrl: string
  http: HttpHelperType

  constructor(cookie?:string) {
    this.baseUrl = "https://users.roblox.com"

    this.http = new HttpHelper(this.baseUrl, cookie)
  }


  // [ ACCOUNT INFORMATION ] ///////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/birthdate
  async authenticatedUserBirthdate(): Promise<
    { data: AuthenticatedUserBirthdateData, rawData: RawAuthenticatedUserBirthdateData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserBirthdateData>("/v1/birthdate")
      return { data: CreateDateTimeObjectFromBirthdate(rawData), rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/description
  async authenticatedUserDescription(): Promise<
    { data: AuthenticatedUserDescriptionData, rawData: RawAuthenticatedUserDescriptionData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserDescriptionData>("/v1/description")
      return { data: rawData.description, rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/gender
  async authenticatedUserGender(): Promise<
    { data: AuthenticatedUserGenderData, rawData: RawAuthenticatedUserGenderData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserGenderData>("/v1/gender")
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
  // GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
  async validateDisplayNameForNewUser(displayName:string, birthdate: string): Promise<
    { data: ValidateDisplayNameForNewUserData, rawData: RawValidateDisplayNameForNewUserData }
  > {
    try {
      const searchParams = await createSearchParams({ displayName, birthdate })

      const { data:rawData } = await this.http.get<RawValidateDisplayNameForNewUserData>(`/v1/display-names/validate?${searchParams}`)
      return {data: !!rawData, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
  async validateDisplayNameForExistingUser(displayName:string, userId: number): Promise<
    { data: ValidateDisplayNameForExistingUserData, rawData: RawValidateDisplayNameForExisitingUserData }
  > {
    try {
      const searchParams = await createSearchParams({ displayName })

      const { data:rawData } = await this.http.get<RawValidateDisplayNameForExisitingUserData>(`/v1/users/${userId}/display-names/validate?${searchParams}`)
      return {data: rawData as ValidateDisplayNameForExistingUserData, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // PATCH /v1/users/{userId}/display-names
  async setDisplayNameForAuthenticatedUser(newDisplayName:string, userId: number): Promise<
    { data: SetDisplayNameForAuthenticatedUserData, rawData: RawSetDisplayNameForAuthenticatedUserData }
  > {
    try {
      const { data:rawData } = await this.http.patch<RawSetDisplayNameForAuthenticatedUserData>(`/v1/users/${userId}/display-names`, { newDisplayName })
      return {data: rawData as SetDisplayNameForAuthenticatedUserData, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/users/{userId}
  async detailedUserInfo(userId: number): Promise<
    { data: DetailedUserInfoData, rawData: RawDetailedUserInfoData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawDetailedUserInfoData>(`/v1/users/${userId}`)

      const formattedData = {...rawData} as any
      formattedData.created = new Date(formattedData.created)
      return {data: formattedData as DetailedUserInfoData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [404])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated
  async authenticatedUserMinimalInfo(): Promise<
    { data: AuthenticatedUserMinimalInfoData, rawData: RawAuthenticatedUserMinimalInfoData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserMinimalInfoData>("/v1/users/authenticated")
      return {data: rawData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated/age-bracket
  async authenticatedUserAgeBracket(): Promise<
    { data: AuthenticatedUserAgeBracketData, rawData: RawAuthenticatedUserAgeBracketData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserAgeBracketData>("/v1/users/authenticated/age-bracket")
      const rawAgeBracket = rawData?.ageBracket
      const ageBracket = rawAgeBracket === 0 ? "13+" : "<13"
      return {data: ageBracket, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated/country-code
  async authenticatedUserCountryCode(): Promise<
    { data: AuthenticatedUserCountryCodeData, rawData: RawAuthenticatedUserCountryCodeData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserCountryCodeData>("/v1/users/authenticated/country-code")
      return {data: rawData.countryCode, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated/roles
  async authenticatedUserRoles(): Promise<
    { data: AuthenticatedUserRolesData, rawData: RawAuthenticatedUserRolesData }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserRolesData>("/v1/users/authenticated/roles")
      return {data: rawData.roles, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // POST /v1/usernames/users
  async usernamesToUsersInfo(usernames: string[], excludeBannedUsers: boolean=false): Promise<
    { data: UsernamesToUsersInfoData, rawData: RawUsernamesToUsersInfoData }
  > {
    try {
      const { data:rawData } = await this.http.post<RawUsernamesToUsersInfoData>(
        "/v1/usernames/users", { usernames, excludeBannedUsers }
      )
      const formattedData: UsernamesToUsersInfoData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "requestedUsername", (
        async ({hasVerifiedBadge, id, name, displayName}) => ({ hasVerifiedBadge, id, name, displayName })
      ))
      return {data: formattedData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // POST /v1/users
  async userIdsToUsersInfo(userIds: number[], excludeBannedUsers: boolean=false): Promise<
    { data: UserIdsToUsersInfoData, rawData: RawUserIdsToUsersInfoData }
  > {
    try {
      const { data:rawData } = await this.http.post<RawUserIdsToUsersInfoData>(
        "/v1/users", { userIds, excludeBannedUsers }
      )
      const formattedData: UserIdsToUsersInfoData = await CreateObjectMapByKeyWithMiddleware(rawData.data, "id", (
        async ({hasVerifiedBadge, name, displayName}) => ({ hasVerifiedBadge, name, displayName })
      ))
      return {data: formattedData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  // [ USERNAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/users/{userId}/username-history ? limit={limit} & sortOrder={sortOrder} & cursor={cursor}
  async usernameHistory(userId: number, limit:10|25|50|100=100, sortOrder:"Asc"|"Desc"="Asc", cursor?: string): Promise<
    { data: UsernameHistoryData, rawData: RawUsernameHistoryData, cursors: { previous: string, next: string } }
  > {
    try {
      const searchParams = await createSearchParams({ limit, sortOrder, cursor })

      const { data:rawData } = await this.http.get<RawUsernameHistoryData>(`/v1/users/${userId}/username-history?${searchParams}`)
      const formattedData: UsernameHistoryData = await map(rawData.data, async usernameData => usernameData.name)
      return {data: formattedData, rawData, cursors: { previous: rawData.previousPageCursor, next: rawData.nextPageCursor } }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
  async search(keyword:string, limit:10|25|50|100=100, cursor?:string): Promise<
    { data: SearchData, rawData: RawSearchData, cursors: { previousPageCursor: string, nextPageCursor: string } }
  > {
    try {
      const searchParams = await createSearchParams({ keyword, limit, cursor })

      const { data:rawData } = await this.http.get<RawSearchData>(`/v1/users/search?${searchParams}`)
      return { data: rawData.data, rawData, cursors: { previousPageCursor: rawData.previousPageCursor, nextPageCursor: rawData.nextPageCursor } }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const UsersApi = new UsersApiClass()