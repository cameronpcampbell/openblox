import type { Identifier, UrlSecure } from "typeforge"


// GET /v1/userinfo --------------------------------------------------------------------------------------------------
export type UserInfoData = {
  sub: Identifier,
  name: string,
  nickname: string,
  preferred_username: string,
  created_at: number,
  profile: `https://www.roblox.com/users/${Identifier}/profile`,
  picture: UrlSecure
}
// -------------------------------------------------------------------------------------------------------------------