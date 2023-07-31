// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { map } from "p-iteration"

import { HttpHelper, HttpHelperType } from "../../httpHelper"
import { CreateDateTimeObjectFromBirthdate, CreateObjectMapByKeyWithMiddleware, createSearchParams } from "../../utils"
import { HandleApiErrors } from "../handleApiErrors"
import { UnexpectedError } from "../../errors"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type {
  AuthenticatedUserAgeBracket,
  AuthenticatedUserBirthdate, AuthenticatedUserCountryCode, AuthenticatedUserDescription, AuthenticatedUserGender, AuthenticatedUserMinimalInfo, AuthenticatedUserRoles, DetailedUserInfo, RawAuthenticatedUserAgeBracket, RawAuthenticatedUserBirthdate, RawAuthenticatedUserCountryCode, RawAuthenticatedUserDescription, RawAuthenticatedUserGender, RawAuthenticatedUserMinimalInfo, RawAuthenticatedUserRoles, RawDetailedUserInfo, RawSearch, RawSetDisplayNameForAuthenticatedUser, RawUserIdsToUsersInfo, RawUsernameHistory, RawUsernamesToUsersInfo, RawValidateDisplayNameForExisitingUser, RawValidateDisplayNameForNewUser, Search, SetDisplayNameForAuthenticatedUser, UserIdsToUsersInfo, UsernameHistory, UsernamesToUsersInfo, ValidateDisplayNameForExistingUser, ValidateDisplayNameForNewUser
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
    { data: AuthenticatedUserBirthdate, rawData: RawAuthenticatedUserBirthdate }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserBirthdate>("/v1/birthdate")
      return { data: CreateDateTimeObjectFromBirthdate(rawData), rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/description
  async authenticatedUserDescription(): Promise<
    { data: AuthenticatedUserDescription, rawData: RawAuthenticatedUserDescription }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserDescription>("/v1/description")
      return { data: rawData?.description, rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/gender
  async authenticatedUserGender(): Promise<
    { data: AuthenticatedUserGender, rawData: RawAuthenticatedUserGender }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserGender>("/v1/gender")
      return { data: rawData?.gender, rawData }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ DISPLAY NAMES ] /////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/display-names/validate ? displayName={displayName} & birthdate={birthdate}
  async validateDisplayNameForNewUser(displayName:string, birthdate: string): Promise<
    { data: ValidateDisplayNameForNewUser, rawData: RawValidateDisplayNameForNewUser }
  > {
    try {
      const searchParams = await createSearchParams({ displayName, birthdate })

      const { data:rawData } = await this.http.get<RawValidateDisplayNameForNewUser>(`/v1/display-names/validate?${searchParams}`)
      return {data: !!rawData, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/{userId}/display-names/validate ? displayName={displayName}
  async validateDisplayNameForExistingUser(displayName:string, userId: number): Promise<
    { data: ValidateDisplayNameForExistingUser, rawData: RawValidateDisplayNameForExisitingUser }
  > {
    try {
      const searchParams = await createSearchParams({ displayName })

      const { data:rawData } = await this.http.get<RawValidateDisplayNameForExisitingUser>(`/v1/users/${userId}/display-names/validate?${searchParams}`)
      return {data: rawData as ValidateDisplayNameForExistingUser, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }

  // PATCH /v1/users/{userId}/display-names
  async setDisplayNameForAuthenticatedUser(newDisplayName:string, userId: number): Promise<
    { data: SetDisplayNameForAuthenticatedUser, rawData: RawSetDisplayNameForAuthenticatedUser }
  > {
    try {
      const { data:rawData } = await this.http.patch<RawSetDisplayNameForAuthenticatedUser>(`/v1/users/${userId}/display-names`, { newDisplayName })
      return {data: rawData as SetDisplayNameForAuthenticatedUser, rawData}

    } catch (error:any) {
      await HandleApiErrors(error, [400, 403])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/users/{userId}
  async detailedUserInfo(userId: number): Promise<
    { data: DetailedUserInfo, rawData: RawDetailedUserInfo }
  > {
    try {
      const { data:rawData } = await this.http.get<RawDetailedUserInfo>(`/v1/users/${userId}`)

      const formattedData = {...rawData} as any
      formattedData.created = new Date(formattedData.created)
      return {data: formattedData as DetailedUserInfo, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [404])
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated
  async authenticatedUserMinimalInfo(): Promise<
    { data: AuthenticatedUserMinimalInfo, rawData: RawAuthenticatedUserMinimalInfo }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserMinimalInfo>("/v1/users/authenticated")
      return {data: rawData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated/age-bracket
  async authenticatedUserAgeBracket(): Promise<
    { data: AuthenticatedUserAgeBracket, rawData: RawAuthenticatedUserAgeBracket }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserAgeBracket>("/v1/users/authenticated/age-bracket")
      return {data: rawData?.ageBracket, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated/country-code
  async authenticatedUserCountryCode(): Promise<
    { data: AuthenticatedUserCountryCode, rawData: RawAuthenticatedUserCountryCode }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserCountryCode>("/v1/users/authenticated/country-code")
      return {data: rawData?.countryCode, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // GET /v1/users/authenticated/roles
  async authenticatedUserRoles(): Promise<
    { data: AuthenticatedUserRoles, rawData: RawAuthenticatedUserRoles }
  > {
    try {
      const { data:rawData } = await this.http.get<RawAuthenticatedUserRoles>("/v1/users/authenticated/roles")
      return {data: rawData?.roles, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error)
      throw new UnexpectedError(error)
    }
  }

  // POST /v1/usernames/users
  async usernamesToUsersInfo(usernames: string[], includeBannedUsers: boolean =true): Promise<
    { data: UsernamesToUsersInfo, rawData: RawUsernamesToUsersInfo }
  > {
    try {
      const { data:rawData } = await this.http.post<RawUsernamesToUsersInfo>("/v1/usernames/users", { usernames })
      const formattedData: UsernamesToUsersInfo = await CreateObjectMapByKeyWithMiddleware(rawData.data, "requestedUsername", (
        async ({hasVerifiedBadge, id, name, displayName}) => ({ hasVerifiedBadge, id, name, displayName })
      ))
      return {data: formattedData, rawData}
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }

  // POST /v1/users
  async userIdsToUsersInfo(userIds: number[], includeBannedUsers: boolean =true): Promise<
    { data: UserIdsToUsersInfo, rawData: RawUserIdsToUsersInfo }
  > {
    try {
      const { data:rawData } = await this.http.post<RawUserIdsToUsersInfo>("/v1/users", { userIds })
      const formattedData: UserIdsToUsersInfo = await CreateObjectMapByKeyWithMiddleware(rawData.data, "id", (
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
    { data: UsernameHistory, rawData: RawUsernameHistory, cursors: { previousPageCursor: string, nextPageCursor: string } }
  > {
    try {
      const searchParams = await createSearchParams({ limit, sortOrder, cursor })

      const { data:rawData } = await this.http.get<RawUsernameHistory>(`/v1/users/${userId}/username-history?${searchParams}`)
      const formattedData: UsernameHistory = await map(rawData.data, async usernameData => usernameData.name)
      return {data: formattedData, rawData, cursors: { previousPageCursor: rawData.previousPageCursor, nextPageCursor: rawData.nextPageCursor } }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // [ USER SEARCH ] ///////////////////////////////////////////////////////////////////////////////////////////////////
  // GET /v1/users/search ? keyword={keyword} & limit={limit} & cursor={cursor}
  async search(keyword:string, limit:10|25|50|100=100, cursor?:string): Promise<
    { data: Search, rawData: RawSearch, cursors: { previousPageCursor: string, nextPageCursor: string } }
  > {
    try {
      const searchParams = await createSearchParams({ keyword, limit, cursor })

      const { data:rawData } = await this.http.get<RawSearch>(`/v1/users/search?${searchParams}`)
      return { data: rawData.data, rawData, cursors: { previousPageCursor: rawData.previousPageCursor, nextPageCursor: rawData.nextPageCursor } }
      
    } catch (error:any) {
      await HandleApiErrors(error, [400])
      throw new UnexpectedError(error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export const UsersApi = new UsersApiClass()