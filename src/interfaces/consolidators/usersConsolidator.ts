// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import uniq from "lodash.uniq"

import { arrayEntriesAreType, arrayIsolate, cloneAndMutateObject, createObjectMapByKeyWithMiddleware, mapArgsToPromises, mutateObject, objectIsolateWhereKeys, processSpread } from "../../utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AvatarFullSize, AvatarBustSize, AvatarHeadshotSize, BatchRequest, BatchType } from "../../apis/classic/thumbnailsApi/thumbnailsApi.types"
import { ThumbnailsApi, UsersApi } from "../../apis/classic"
import { Override } from ".."
import { AnyObject, ArrayToUnion, NonEmptyArray, PrettifyKeyof } from "../../utils/utils.types"
import merge from "lodash.merge"
import { forEach } from "p-iteration"

type AvatarFields =
  `avatarFull[${AvatarFullSize}]` | `avatarFull[${AvatarFullSize}][${"Png"|"Jpeg"}]` | `avatarFull[${AvatarFullSize}][${"Png"|"Jpeg"}][Circular]` |

  `avatarBust[${AvatarBustSize}]` | `avatarBust[${AvatarFullSize}][${"Png"|"Jpeg"}]` | `avatarBust[${AvatarFullSize}][${"Png"|"Jpeg"}][Circular]` |

  `AvatarHeadshot[${AvatarHeadshotSize}]` | `avatarHeadshot[${AvatarHeadshotSize}][${"Png"|"Jpeg"}]`  | `avatarHeadshot[${AvatarHeadshotSize}][${"Png"|"Jpeg"}][Circular]`

type UserInfoFields = "description" | "created" | "isBanned" | "externalAppDisplayName" | "hasVerifiedBadge" | "id" | "name" | "displayName"

type Fields = AvatarFields | UserInfoFields | "usernameHistory"

type StartsWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${infer _Rest}` ? true : false;

type UsersConsolidatorReturns<InputTargets extends string|number, InputFields extends Fields> = PrettifyKeyof<Record<InputTargets, {
  [Field in InputFields]:
    StartsWith<Field, "avatar"> extends true ? string :
     Field extends "usernameHistory" ? string[] :
      Field extends "description" | "created" | "isBanned" | "externalAppDisplayName" | "hasVerifiedBadge" | "name" | "displayName" ? string :
        Field extends "id" ? number :
          unknown
}>>;

type TupleLength<T extends any[]> = T['length']
type ProcessSpread<Spread extends any[]> =
  TupleLength<Spread> extends 1 ?
    Spread[0] extends any[] ?
      ArrayToUnion<Spread[0]> :
    ArrayToUnion<Spread> :
  ArrayToUnion<Spread>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Fields returned by the "GET https://users.roblox.com/v1/users/{userId}" endpoint.
const userInfoSingleGetFields = [ "description", "created", "isBanned", "externalAppDisplayName", "hasVerifiedBadge", "id", "name", "displayName" ]

// Fields returned by the "POST https://users.roblox.com/v1/usernames/users" and "POST https://users.roblox.com/v1/users" endpoints.
const userInfoMultiGetFields = [ "hasVerifiedBadge", "id", "name", "displayName" ]

// Fields returned by only the "GET https://users.roblox.com/v1/users/{userId}" and which are not returned by either the "POST https://users.roblox.com/v1/usernames/users" or "POST https://users.roblox.com/v1/users" endpoints.
const userInfoSingleGetOnlyFields = userInfoSingleGetFields.filter(item => !userInfoMultiGetFields.includes(item))

const avatarFieldToBatchType: { [key: string]: BatchType } = {
  avatarFull: "Avatar",
  avatarBust: "AvatarBust",
  avatarHeadshot: "AvatarHeadShot"
}

// Overrides the api endpoints to make sure caching is disabled as consolidators handle their own caching.
const ThumbnailsApi_batch = Override(ThumbnailsApi.batch, { cacheSettings: "!" })
const UsersApi_userInfo = Override(UsersApi.userInfo, { cacheSettings: "!" })
const UsersApi_userIdsToUsersInfo = Override(UsersApi.userIdsToUsersInfo, { cacheSettings: "!" })
const UsersApi_usernamesToUsersInfo = Override(UsersApi.usernamesToUsersInfo, { cacheSettings: "!" })
const UsersApi_usernameHistory = Override(UsersApi.usernameHistory, { cacheSettings: "!" })


// [ HELPER FUNCTIONS ] //////////////////////////////////////////////////////////////////////////////////////////////
// Avatars -----------------------------------------------------------------------------------------------------------
const getAvatars = async (targetsIds: number[], fields:AvatarFields[]) => {
  //console.log("avatars")

  let requests: BatchRequest[] = []

  fields.forEach(field => {
    const type = field.split("[")[0]
    const [ size, format, circular ] = field.match(/\[([^\]]+)\]/g)?.map(param => param.replaceAll(/^\[/g, "").replaceAll(/\]$/g, "")) || []

    targetsIds.forEach(targetId => requests.push({
      targetId,
      type: avatarFieldToBatchType[type],
      size: size,
      format: format || "Png",
      isCircular: circular ? true : false,
      requestId: field
    }))
  })

  // TODO: this methods formatted data type needs fixing.
  const { data } = await ThumbnailsApi_batch(requests)
  
  let formattedData: AnyObject = {}
  Object.entries(data).forEach(([ batchTypeKey, batchTypeValue ]) => {
    Object.entries(batchTypeValue).forEach(([ targetId, { requestId, imageUrl } ]) => {
      if (!formattedData[targetId]) formattedData[targetId] = {}
      formattedData[targetId][requestId as string] = imageUrl
    })
  })

  return formattedData
}
// -------------------------------------------------------------------------------------------------------------------


// Username History --------------------------------------------------------------------------------------------------
const getUsernameHistory = async (targetId: number) => {
  //console.log("username history")
  return {
    id: targetId,
    usernameHistory: (await UsersApi_usernameHistory(targetId)).data
  }
}
const getManyUsernameHistories = async (targetsIds: number[]) => {
  return await createObjectMapByKeyWithMiddleware(
    await Promise.all(await mapArgsToPromises(targetsIds, getUsernameHistory)), "id"
  )
}
// -------------------------------------------------------------------------------------------------------------------


// Users Info --------------------------------------------------------------------------------------------------------
const singleGetUserInfo = async (targetId: number) => {
  return (await UsersApi_userInfo(targetId)).data
}
const singleGetManyUsersInfo = async (targetsIds: number[], fields:UserInfoFields[]) => {
  //console.log("singleget")
  return await createObjectMapByKeyWithMiddleware(
    await Promise.all(await mapArgsToPromises(targetsIds, singleGetUserInfo)),
    "id", async item => await objectIsolateWhereKeys(item, fields)
  )
}

const multiGetManyUsersInfo = async (targets: string[] | number[], fields:UserInfoFields[], targetsType:"IDS"|"USERNAMES") => {
  //console.log("multiget")
  return await createObjectMapByKeyWithMiddleware(
    targetsType == "IDS" ?
      (await UsersApi_userIdsToUsersInfo(targets as NonEmptyArray<number>)).rawData.data
    :
    (await UsersApi_usernamesToUsersInfo(targets as NonEmptyArray<string>)).rawData.data,
    "id", async item => await objectIsolateWhereKeys(item, targetsType == "USERNAMES" ? [...fields, "requestedUsername"] : fields)
  )
}
// -------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UsersConsolidator = {
  get: <InputFields extends Fields[]|[Fields[]]>(..._fields: InputFields) => {
    return {
      for: async <InputTargets extends string[]|number[]|[string[]]|[number[]]>(..._targets: InputTargets): Promise<
        // @ts-expect-error | False-positive type mismatch. 
       { data: UsersConsolidatorReturns<ProcessSpread<InputTargets>, ProcessSpread<InputFields>> }
      > => {
        const [ fields, targets ] = [ uniq(processSpread(..._fields)), uniq(processSpread(..._targets)) ]

        const targetsType = await arrayEntriesAreType(targets, "string") ? "USERNAMES" : "IDS"
        const includedUserInfoSingleOnlyGetFields = await arrayIsolate(fields, userInfoSingleGetOnlyFields)
        const includedUserInfoMultiGetFields = await arrayIsolate(fields, userInfoMultiGetFields)
        const hasNonUserInfoMultiGetFields = fields.filter(field => !userInfoMultiGetFields.includes(field)).length

        /* some user info can only be fetched one user per request, so if any fields
           contain any such info then it sets the endpoint type to 'SINGLE' */
        const getUserInfoEndpointType: "MULTI" | "SINGLE" | null =
        includedUserInfoSingleOnlyGetFields.length ? "SINGLE"
          : includedUserInfoMultiGetFields.length ? "MULTI" : null

        // gets the fields that pertain to avatars.
        const avatarFields = fields.filter(item => item.startsWith("avatar")) as AvatarFields[]

        /* If the targets are usernames and if there are any fields that are not in the `userInfoMultiGetFields` array then it converts said
          targets to ids. If all of the fields are in the `userInfoMultiGetFields` array then there is no need to convert the targets to ids
          since the data for all those fields can be requested via usernames.
          
          NOTE: The data for the fields in the `userInfoSingleGetOnlyFields` array can only be obtained by using ids whereas the data for the
          fields in the `userInfoMultiGetFields` array can be obtained by using usernames or ids. So if the targets are usernames and if any field
          is in the `userInfoSingleGetOnlyFields` array, then 1 extra request will be made to Roblox's api and consequently the `UsersConsolidator`
          function will take a bit longer to complete.  */
        let properTargets: number[] | string[]
        let saved_multiGetManyUsersInfo
        if (targetsType == "USERNAMES" && hasNonUserInfoMultiGetFields) { // Converts usernames to ids.
          saved_multiGetManyUsersInfo = await multiGetManyUsersInfo(
            targets as string[], [...includedUserInfoMultiGetFields, "requestedUsername"], "USERNAMES"
          )
          properTargets = Object.keys(saved_multiGetManyUsersInfo)
        
        } else {  // Keeps usernames.
          properTargets = targets as string[]
        }

        /* Fetches data for fields concurrently via promises.
           TODO: Change from Promises to Effect for better error handling. */
        let data: AnyObject = merge(...await Promise.all([
          avatarFields.length ? getAvatars(properTargets as unknown as number[], avatarFields) : undefined,

          getUserInfoEndpointType == "SINGLE" ?
            singleGetManyUsersInfo(properTargets as unknown as number[], [
              ...includedUserInfoSingleOnlyGetFields,
              ...includedUserInfoMultiGetFields,
              targetsType == "USERNAMES" && "requestedUsername"
            ])
          : getUserInfoEndpointType == "MULTI" &&
            (saved_multiGetManyUsersInfo ?? multiGetManyUsersInfo(properTargets, includedUserInfoMultiGetFields, targetsType)),

          fields.includes("usernameHistory") ? getManyUsernameHistories(properTargets as unknown as number[]) : undefined
        ]))

        if (targetsType == "USERNAMES") {
          const formattedData: AnyObject  = {}
          await forEach(Object.entries(data), async ([ key, value ]) => {
            formattedData[value.requestedUsername] = mutateObject(value, obj => delete obj.requestedUsername)
          })
          data = formattedData
        }

        return { data } as any
      }
    }
  }
}
