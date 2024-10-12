// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { JobSearchFilter, PrettifiedCreatorExperiencesData, PrettifiedCreatorProfileData, PrettifiedJobSearchData, RawCreatorExperiencesData, RawCreatorProfileData, RawJobSearchData, RawUsersAreIdVerifiedData } from "./talent.types"
import type { SortOrder } from "../../../utils/utils.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicTalent", baseUrl: "https://apis.roblox.com/talent" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets profile information about someones talent hub profile.
 * @endpoint GET /v1/users/{userId}/profile
 * 
 * @param userId The id of the user to get verification info about.
 * 
 * @example const { data:profile } = await ClassicTalentApi.creatorProfile({ userId: 45348281 })
 * @exampleData {"creatorUserId":45348281,"createdUtc":"2021-08-13T01:21:19.146Z","updatedUtc":"2024-05-05T01:24:58.442Z","isPublic":true,"isContactAllowed":false,"creatorDescription":"Lorem ipsum dolor sit amet.","isOpenToWork":false,"interestDescription":"","linkTypes":["DeveloperForum","Roblox","Twitter"],"preferredContactLinkType":"DeveloperForum","socialLinks":[],"jobTypes":[],"skillTypes":["Programmer"],"requiresAction":"NoAction"}
 * @exampleRawBody {"data":[{"creatorUserId":45348281,"createdUtc":"2021-08-13T01:21:19.1463527Z","updatedUtc":"2024-05-05T01:24:58.4421938Z","isPublic":true,"isContactAllowed":false,"creatorDescription":"Lorem ipsum dolor sit amet.","isOpenToWork":false,"interestDescription":"","linkTypes":["DeveloperForum","Roblox","Twitter"],"preferredContactLinkType":"DeveloperForum","socialLinks":[],"jobTypes":[],"skillTypes":["Programmer"],"requiresAction":"NoAction"}]}
 */
export const creatorProfile = createApiMethod(async <UserId extends Identifier>(
  { userId }: { userId: UserId }
): ApiMethod<RawCreatorProfileData<UserId>, PrettifiedCreatorProfileData<UserId>> => ({
  path: `/v1/users/${userId}/profile`,
  method: "GET",
  name: "creatorProfile",

  formatRawDataFn: ({ data }) => cloneAndMutateObject(data[0], obj => {
    obj.createdUtc = new Date(obj.createdUtc)
    obj.updatedUtc = new Date(obj.updatedUtc)
  })
}))

/**
 * Gets someones work history (experiences / games) from their talent hub profile.
 * @endpoint GET /v1/users/{userId}/experiences
 * 
 * @param userId The id of the user to get verification info about.
 * @param sortOrder The order the results are sorted it.
 * @param limit The number of results to be returned
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:experiences } = await ClassicTalentApi.creatorExperiences({ userId: 45348281 })
 * @exampleData [{"experienceId":21126,"creatorUserId":45348281,"createdUtc":"2022-01-16T16:09:30.161Z","updatedUtc":"2022-07-29T12:23:28.866Z","projectName":"RoCamping","experienceDescription":"RoCamping was my first game, it was a survival game where you built a shelter and tried to survive. My role was the manage the project as well as script and create the UI .","jobRole":"Programmer & UI Designer","teamName":"","experienceMedia":[],"experienceLinks":["[The Game](https://www.roblox.com/games/4922741943/RoCamping)"],"teamId":null,"robloxExperienceIds":[],"robloxAssetIds":[],"startedUtc":"2020-03-31T23:00:00.000Z","endedUtc":"2020-09-30T23:00:00.000Z","isCurrent":false}]
 * @exampleRawBody {"data":[{"experienceId":21126,"creatorUserId":45348281,"createdUtc":"2022-01-16T16:09:30.1614813Z","updatedUtc":"2022-07-29T12:23:28.8660325Z","projectName":"RoCamping","experienceDescription":"RoCamping was my first game, it was a survival game where you built a shelter and tried to survive. My role was the manage the project as well as script and create the UI .","jobRole":"Programmer & UI Designer","teamName":"","experienceMedia":[],"experienceLinks":["[The Game](https://www.roblox.com/games/4922741943/RoCamping)"],"teamId":null,"robloxExperienceIds":[],"robloxAssetIds":[],"startedUtc":"2020-03-31T23:00:00Z","endedUtc":"2020-09-30T23:00:00Z","isCurrent":false}],"nextPageCursor":null,"previousPageCursor":null}
 */
export const creatorExperiences = createApiMethod(async <UserId extends Identifier>(
  { userId, sortOrder, limit, cursor }: { userId: UserId, sortOrder?: SortOrder, limit?: number, cursor?: string }
): ApiMethod<RawCreatorExperiencesData, PrettifiedCreatorExperiencesData> => ({
  path: `/v1/users/${userId}/experiences`,
  method: "GET",
  searchParams: { sortOrder, limit, cursor },
  name: "creatorExperiences",

  formatRawDataFn: ({ data }) => data.map(experienceData => cloneAndMutateObject(experienceData, obj => {
    obj.createdUtc = new Date(obj.createdUtc)
    obj.updatedUtc = new Date(obj.updatedUtc)
    obj.startedUtc = new Date(obj.startedUtc)

    const endedUtc = obj.endedUtc
    if (endedUtc) obj.endedUtc = new Date(endedUtc)
  }))
}))

/**
 * Gets ID verification status for a user that has a public talent hub profile.
 * @endpoint GET /v1/users/verification
 * 
 * @param userId The id of the user to get verification info about.
 * 
 * @example const { data:isIdVerified } = await ClassicTalentApi.creatorIsIdVerified({ userId: 45348281 })
 * @exampleData {"data":[{"userId":45348281,"isVerified":false}]}
 * @exampleRawBody false
 */
export const creatorIsIdVerified = createApiMethod(async <UserId extends Identifier>(
  { userId }: { userId: UserId }
): ApiMethod<RawUsersAreIdVerifiedData<UserId>, boolean> => ({
  path: `/v1/users/verification`,
  method: "GET",
  searchParams: { userIds: userId },
  name: "creatorIsIdVerified",

  formatRawDataFn: ({ data }) => (data[0] as RawUsersAreIdVerifiedData<UserId>["data"][number]).isVerified
}))


/**
 * Searches talent hub job posts.
 * @endpoint GET /v1/search/jobs
 * 
 * @param query The query to search for.
 * @param limit The maxium amount of items to return.
 * @param filter Filter the returned job posts to match specific requirements.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:jobSearchData } = await ClassicTalentApi.jobSearch({ query: "simulator", limit: 1, cursor: 1 })
 * @exampleData {"results":[{"id":"2428901580346619","jobPosterId":"419693467","title":"Frontend Scripter for a simulator game","description":"Hi I'm looking for 1 scripter that can work on the frontend script in my new game i already have a talented scripter that wanna focus on the backend but if you are good at booth we can se what we can do. The game function in a way where you collect different instruments and pets to become one of the best musicians in the game, if you want more information about the game, just ask. Below you can see pictures of models but also UI that we have right now but of course these are just a beginning and we will upgrade these.","jobType":"FullTime","paymentTypes":["RevenuePercent"],"skillTypes":["Scripting"],"publishedUtc":"2024-04-10T19:37:08.749Z","expiresUtc":"2024-07-09T19:37:08.749Z","minAgeRequirement":0,"isVerifiedRequirement":true,"isVerified":"true","paymentAmount":25,"paymentAmountType":"Total"}],"meta":{"page":{"totalPages":184,"totalResults":184,"current":1,"size":1}}}
 * @exampleRawBody {"meta":{"page":{"totalPages":184,"totalResults":184,"current":1,"size":1}},"results":[{"id":{"raw":"2428901580346619"},"jobPosterId":{"raw":"419693467"},"title":{"raw":"Frontend Scripter for a simulator game"},"description":{"raw":"Hi I'm looking for 1 scripter that can work on the frontend script in my new game i already have a talented scripter that wanna focus on the backend but if you are good at booth we can se what we can do. The game function in a way where you collect different instruments and pets to become one of the best musicians in the game, if you want more information about the game, just ask. Below you can see pictures of models but also UI that we have right now but of course these are just a beginning and we will upgrade these."},"jobType":{"raw":"FullTime"},"paymentTypes":{"raw":["RevenuePercent"]},"skillTypes":{"raw":["Scripting"]},"publishedUtc":{"raw":"2024-04-10T19:37:08.749Z"},"expiresUtc":{"raw":"2024-07-09T19:37:08.749Z"},"minAgeRequirement":{"raw":0},"isVerifiedRequirement":{"raw":"false"},"isVerified":{"raw":"true"},"paymentAmount":{"raw":25},"paymentAmountType":{"raw":"Total"},"_meta":{"score":0}}]}
 */
export const jobSearch = createApiMethod(async (
  { query = "", limit = 10, filter:{ jobType, paymentAmount, paymentTypes, skillTypes, isVerified = true } = {}, cursor }:
  { query?: string, limit?: number, filter?: JobSearchFilter, cursor?: number }
): ApiMethod<RawJobSearchData, PrettifiedJobSearchData> => ({
  path: `/v1/search/jobs`,
  method: "POST",
  name: "jobSearch",
  body: {
    query,
    page: { current: cursor, size: limit },
    filters: {
      all: [
        jobType && { jobType },
        paymentAmount && { paymentAmount },
        paymentTypes && { paymentTypes },
        { paymentAmountType: "Total" },
        skillTypes && { skillTypes },
        { isVerified: [ isVerified ? "true" : "false" ] },
      ].filter(e => e)
    },
    sort: [
      { attribute_score: "desc" },
      { _score: "desc" }
    ]
  },

  formatRawDataFn: ({ results, ...rest }) => {
    const prettifiedResults: PrettifiedJobSearchData["results"] = results.map(result => {
      const prettifiedResult: PrettifiedJobSearchData["results"][number] = {} as any
      const resultKeys = Object.keys(result), resultValues = Object.values(result) as any as ({ raw: unknown })[]

      resultKeys.forEach((key, i) => (
        key === "_meta" ? undefined : (prettifiedResult as any)[key as any] = resultValues[i as any]?.raw
      ))

      prettifiedResult.publishedUtc = new Date(prettifiedResult.publishedUtc)
      prettifiedResult.expiresUtc = new Date(prettifiedResult.expiresUtc)
      prettifiedResult.isVerifiedRequirement = prettifiedResult.isVerifiedRequirement ? true : false

      return prettifiedResult
    })

    return { results: prettifiedResults, ...rest }
  },

  getCursorsFn: () => ([ cursor || null, cursor ? cursor + 1 : 1 ])
}))