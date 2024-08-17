import type { Identifier, UrlSecure, ISODateTime, ObjectPrettify, UnionPrettify } from "typeforge"


// GET https://apis.roblox.com/cloud/v2/users/${userId}
type UserInfoData_Locale = "sq_al" | "ar_001" | "bn_bd" | "nb_no" | "bs_ba" | "bg_bg" | "my_mm" | "zh_cn" | "zh_tw" | "hr_hr" | "cs_cz" | "da_dk" | "nl_nl" | "en_us" | "et_ee" | "fil_ph" | "fi_fi" | "fr_fr" | "ka_ge" | "de_de" | "el_gr" | "hi_in" | "hu_hu" | "id_id" | "it_it" | "ja_jp" | "kk_kz" | "km_kh" | "ko_kr" | "lv_lv" | "lt_lt" | "ms_my" | "pl_pl" | "pt_br" | "ro_ro" | "ru_ru" | "sr_rs" | "si_lk" | "sk_sk" | "sl_sl" | "es_es" | "sv_se" | "th_th" | "tr_tr" | "uk_ua" | "vi_vn"
type UserInfoData<UserId extends Identifier, TimeType> = {
  path: `users/${UserId}`,
  createTime: TimeType,
  id: UserId,
  name: string,
  displayName: string,
  about: string,
  locale: UserInfoData_Locale,
  premium?: boolean,
  idVerified?: boolean,
}
export type RawUserInfoData<UserId extends Identifier> = UserInfoData<UserId, ISODateTime> & {
  socialNetworkProfiles?: {
    facebook: string,
    twitter: string,
    youtube: string,
    twitch: string,
    guilded: string,
    visibility: "SOCIAL_NETWORK_VISIBILITY_UNSPECIFIED" | "NO_ONE" | "FRIENDS" | "FRIENDS_AND_FOLLOWING" | "FRIENDS_FOLLOWING_AND_FOLLOWERS" | "EVERYONE"
  }
}
export type PrettifiedUserInfoData<UserId extends Identifier> = ObjectPrettify<UserInfoData<UserId, Date> & {
  socialNetworkProfiles?: {
    facebook?: string,
    twitter?: string,
    youtube?: string,
    twitch?: string,
    guilded?: string,
    visibility: "SOCIAL_NETWORK_VISIBILITY_UNSPECIFIED" | "NO_ONE" | "FRIENDS" | "FRIENDS_AND_FOLLOWING" | "FRIENDS_FOLLOWING_AND_FOLLOWERS" | "EVERYONE"
  }
}>


export type UserThumbnailSize = UnionPrettify<48 | 50 | 60 | 75 | 100 | 110 | 150 | 180 | 352 | 420 | 720 | 420>

export type UserThumbnailData<UserId extends Identifier> = (
  {
    done: true,
    path: `users/${UserId}/operations/${string}`,
    response: {
      "@type": "apis.roblox.com/roblox.open_cloud.cloud.v2.GenerateUserThumbnailResponse",
      imageUri: UrlSecure
    }
  } |
  {
    done: false,
    path: `users/${UserId}/operations/${string}`,
    response?: undefined
  }
)


// POST /v2/users/${userId}/notifications ----------------------------------------------------------------------------
export type SendNotificationToUser_NotificationData<Parameters extends string> = {
  messageId: string,
  parameters: {
    [Key in Parameters]: string
  },
  launchData: string,
  analyticsCategory: string
}

export type NotificationData<UserId extends Identifier> = {
  path: `users/${UserId}/notifications/3ba56f57-b34d-4baa-9cc5-f872b0ead852`,
  id: "3ba56f57-b34d-4baa-9cc5-f872b0ead852"
}
// -------------------------------------------------------------------------------------------------------------------