// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { UserInfoData } from "./oauth.types"
import { ClassicGroupsApi } from "../../classic"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "OAuth", baseUrl: "https://apis.roblox.com/oauth" })
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets user information from the current access token.
 * @endpoint GET /v1/userinfo
 * 
 * @example const { data:userInfo } = await OAuthApi.userInfo.bind({ oauthToken: "SENSITIVE_INFO" })()
 * @exampleData {"sub":"45348281","name":"Mighty","nickname":"Mighty","preferred_username":"MightyPart","created_at":1373701800,"profile":"https://www.roblox.com/users/45348281/profile","picture":"https://tr.rbxcdn.com/30DAY-AvatarHeadshot-11BD4BBC67E3F95A4F4BED256CFB4591-Png/150/150/AvatarHeadshot/Png/noFilter"}
 * @exampleRawBody {"sub":"45348281","name":"Mighty","nickname":"Mighty","preferred_username":"MightyPart","created_at":1373701800,"profile":"https://www.roblox.com/users/45348281/profile","picture":"https://tr.rbxcdn.com/30DAY-AvatarHeadshot-11BD4BBC67E3F95A4F4BED256CFB4591-Png/150/150/AvatarHeadshot/Png/noFilter"}
 */
export const userInfo = createApiMethod(async (
): ApiMethod<UserInfoData> => ({
  method: "GET",
  path: `/v1/userinfo`,
  name: `userInfo`,
}))