// [ Modules ] ///////////////////////////////////////////////////////////////////
import { UsersApi } from "../../apis/cloud"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ArrayNonEmptyIfConst, UrlSecure, ArrayToUnion, Identifier, ObjectKeepKeys, ObjectPrettify, ObjectPrettifyDeep, UnionPrettify, UnionToArray } from "typeforge"
import type { PrettifiedUserInfoData, UserThumbnailSize } from "../../apis/cloud/users/users.types"


type UnionKeepTypes<U, ToKeep> = U extends ToKeep ? U : never
type UnionRemoveTypes<U, ToKeep> = U extends ToKeep ? never : U


type UserInfoField = ArrayToUnion<typeof userInfoFields>
type UserThumbnailField = "thumbnail" | `thumbnail/${UserThumbnailSize}` | `thumbnail/${UserThumbnailSize}/${"PNG" | "JPEG"}` | `thumbnail/${UserThumbnailSize}/${"PNG" | "JPEG"}/${"ROUND" | "SQUARE"}`
type UsersField = UnionPrettify<UserInfoField | UserThumbnailField>


type CleanObject<
  Obj extends Record<any, any>, Field extends string,
  _ExludedIrrelevantKeys = ObjectPrettify<Partial<ObjectKeepKeys<Obj, Field>>>,
  // @ts-ignore | `UnionToArray<Field>` is an array. `_ExludedIrrelevantKeys[Field]` is typesafe.
  _MaybeNoObject = UnionToArray<Field>["length"] extends 1 ? _ExludedIrrelevantKeys[Field] : _ExludedIrrelevantKeys
> = _MaybeNoObject
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const UsersApi_userInfo = UsersApi.userInfo
const UsersApi_userThumbnail = UsersApi.userThumbnail

const userInfoFields = [ "createTime", "id", "name", "displayName", "about", "locale", "premium", "idVerified", "socialNetworkProfiles" ] as const
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
const shellFn = (...args: any) => null

function uniq_fast(a: any[]) {
  var seen: any = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
       var item = a[i];
       if(seen[item] !== 1) {
             seen[item] = 1;
             out[j++] = item;
       }
  }
  return out;
}


// Users Info --------------------------------------------------------------------
const getUserInfoSingle_forId = async (userId: Identifier, data: any, fields: ArrayNonEmptyIfConst<UserInfoField>) => {
  const { data:userInfo } = await UsersApi_userInfo({ userId })
  data[userId] = userInfo[fields[0]]
}

const getUserInfoMulti_forId = async (userId: Identifier, data: any, fields: ArrayNonEmptyIfConst<UserInfoField>) => {
  const data_userId = data[userId]
  const { data:userInfo } = await UsersApi_userInfo({ userId });
  (fields as ArrayNonEmptyIfConst<UserInfoField>).forEach(field => data_userId[field] = userInfo[field])
}

const getUsersInfo_forIds = (
  fields: ArrayNonEmptyIfConst<UserInfoField>, getUserInfo_forId: typeof getUserInfoSingle_forId | typeof getUserInfoMulti_forId
) => (
  async (userIds: ArrayNonEmptyIfConst<Identifier>, data: any) => {
    await Promise.all(userIds.map(userId => getUserInfo_forId(userId, data, fields)))
  }
)
// -------------------------------------------------------------------------------


// User Thumbnails ---------------------------------------------------------------
const getUserThumbnailSingle_forId = async (
  userId: Identifier, data: any, data_userId: any, thumbnail: string,
  size?: UserThumbnailSize, format?: "PNG" | "JPEG", shape?: "ROUND" | "SQUARE"
) => {
  const { data:userThumbnail } = await UsersApi_userThumbnail({ userId, size, format, shape })
  if (!userThumbnail.done) return
  data[userId] = userThumbnail.response.imageUri
}

const getUserThumbnailMulti_forId = async (
  userId: Identifier, data: any, data_userId: any, thumbnail: string,
  size?: UserThumbnailSize, format?: "PNG" | "JPEG", shape?: "ROUND" | "SQUARE"
) => {
  const { data:userThumbnail } = await UsersApi_userThumbnail({ userId, size, format, shape })
  if (!userThumbnail.done) return
  data_userId[thumbnail] = userThumbnail.response.imageUri
}

const getUsersThumbnail_forIds = async (
  userIds: ArrayNonEmptyIfConst<Identifier>, data: any, getUserThumbnail_forId: typeof getUserThumbnailMulti_forId | typeof getUserThumbnailSingle_forId,
  thumnail: string, size?: UserThumbnailSize, format?: "PNG" | "JPEG", shape?: "ROUND" | "SQUARE"
) => {
  return await Promise.all(userIds.map(userId => getUserThumbnail_forId(userId, data, data[userId], thumnail, size, format, shape)))
}

const getUsersThumbnails_forIds = (
  fields: string[][], getUserThumbnail_forId: typeof getUserThumbnailMulti_forId | typeof getUserThumbnailSingle_forId
) => (
  async (userIds: ArrayNonEmptyIfConst<Identifier>, data: any) => {
    await Promise.all(fields.map(field => getUsersThumbnail_forIds(
      userIds, data, getUserThumbnail_forId, field?.[0] as any as string,
      field?.[2] as any as UserThumbnailSize, field?.[3] as any as "PNG" | "JPEG", field?.[4] as any as "ROUND" | "SQUARE", 
    )))
  }
)
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////


export const Users = {
  get: <Field extends UsersField>(fields: ArrayNonEmptyIfConst<Field>) => {
    fields = uniq_fast(fields) as ArrayNonEmptyIfConst<Field>
    const isSingleField = (fields as Field[]).length == 1

    const usersInfoFields =
      (fields as Field[]).filter(field => userInfoFields.includes(field as UserInfoField)) as any as ArrayNonEmptyIfConst<UserInfoField>
    const thisGetUsersInfo_forIds = usersInfoFields.length
      ? getUsersInfo_forIds(usersInfoFields, isSingleField ? getUserInfoSingle_forId : getUserInfoMulti_forId) : shellFn

    const userThumbnailFields = (fields as Field[]).filter(field => field.startsWith("thumbnail")).map(field => [ field, ...field.split("/") ])
    const thisGetUsersThumbnails_forIds = userThumbnailFields.length
      ? getUsersThumbnails_forIds(userThumbnailFields, isSingleField ? getUserThumbnailSingle_forId : getUserThumbnailMulti_forId) : shellFn

    const createData = isSingleField
      ? (userIds: ArrayNonEmptyIfConst<Identifier>) => ({})
      : (userIds: ArrayNonEmptyIfConst<Identifier>) => { const data: any = {}; userIds.forEach(userId => data[userId] = {}); return data }

    return {
      forIds: async <UserId extends Identifier>(userIds: ArrayNonEmptyIfConst<UserId>): Promise<{
        data: ObjectPrettifyDeep<{
          [Id in UserId]: CleanObject<
            PrettifiedUserInfoData<Id> &
            { [Key in UnionKeepTypes<Field, `thumbnail${string}`>]: UrlSecure },
            Field
          >
        }>
      }> => {
        const data: any = createData(userIds)

        await Promise.all([
          thisGetUsersInfo_forIds(userIds, data),
          thisGetUsersThumbnails_forIds(userIds, data)
        ])

        return { data }
      }
    }
  }
}