// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiFuncBaseHandler as BaseHandler, buildApiMethodResponse as buildResponse } from "../../../apis/apis.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { Config, ThisAllOverrides } from "../../../config/config.types"
import { cloneAndMutateObject } from "../../../utils"
import { Identifier } from "../../../utils/utils.types"
import type { ApiMethodResponse } from "../../apis.types"
import type { RawUserInfoData, FormattedUserInfoData } from "./usersApi.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const baseUrl = "https://apis.roblox.com/cloud"
const apiName = "UsersApi"
type ThisProfile = Config<typeof apiName>

// All api methods that should not be cached (methods that update/set
// data - basically any request that isnt `GET` except in some special circumstances)
export const shouldNotCacheMethods = []


// [ USERS ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Get a user’s basic and advanced information. No additional scopes are required to access a user’s public information.
 * @category Users
 * @endpoint GET /v2/users/${userId}
 * @tags [ "CloudKey Needed" ]
 * 
 * @param userId The id of the user to get info for.
 * 
 * @example const { data:userInfo } = await UsersApi.userInfo(45348281)
 * @exampleData  { path: "users/45348281", createTime: 2013-07-13T07:50:00.083Z, id: "45348281", name: "MightyPart", displayName: "MightyPart", about: "football nothing to is push sudden national", locale: "en_us", premium: false, verified: false }
 * @exampleRawBody { path: "users/45348281", createTime: "2013-07-13T07:50:00.083Z", id: "45348281", name: "MightyPart", displayName: "MightyPart", about: "football nothing to is push sudden national", locale: "en_us", premium: false, verified: false }
 */
export async function userInfo<UserId extends Identifier>(
  this: ThisAllOverrides, userId: Identifier
): ApiMethodResponse<RawUserInfoData<UserId>, FormattedUserInfoData<UserId>> {
  const overrides = this
  return BaseHandler(async function(this: ThisProfile) {
    const { rawBody, response, cacheMetadata } = await this.http.get<RawUserInfoData<UserId>>(
      `${baseUrl}/v2/users/${userId}`, {
        apiName, methodName: "userInfo", overrides
      }
    )

    const getFormattedData = () => cloneAndMutateObject<RawUserInfoData<UserId>, FormattedUserInfoData<UserId>>(
      rawBody, obj => obj.createTime = new Date(obj.createTime)
    )

    return buildResponse({ rawBody, data: getFormattedData, response, cacheMetadata })
  })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////