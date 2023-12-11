import { Identifier } from "../../../utils/utils.types";
import { PrettifyKeyof } from "../../../utils/utils.types";

type UserInfoData<UserId extends Identifier, TimeType> = PrettifyKeyof<{
  path: `users/${UserId}`,
  createTime: TimeType,
  id: UserId,
  name: string,
  displayName: string,
  about: string,
  locale?: string,
  premium?: boolean,
  verified?: boolean,
  socialNetworkProfiles?: {
    facebook: string,
    twitter: string,
    youtube: string,
    twitch: string,
    guilded: string,
    visibility: string
  }
}>

export type RawUserInfoData<UserId extends Identifier> = UserInfoData<UserId, string>

export type FormattedUserInfoData<UserId extends Identifier> = UserInfoData<UserId, Date>