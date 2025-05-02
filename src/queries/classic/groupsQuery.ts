// [ Modules ] ///////////////////////////////////////////////////////////////////
import { ClassicEconomyApi, ClassicGroupsApi } from "../../apis/classic"
import { addObjectToFunction, pollForLatest } from "../queries.utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ObjectPrettify } from "typeforge"
import type { GroupAuditLogActionType, PrettifiedGroupAuditLogsData, PrettifiedGroupJoinRequests, PrettifiedGroupWallPostsData_V2 } from "../../apis/classic/groups/groups.types"
import { PrettifiedGroupTransactionHistoryData } from "../../apis/classic/economy/economy.types"
import { defaultOpenbloxConfig, OpenbloxConfig } from "../../config"

export type ClassicGroups_Events = {
  "auditLog": PrettifiedGroupAuditLogsData<GroupAuditLogActionType>[number],

  "joinRequest": ObjectPrettify<
    PrettifiedGroupJoinRequests[number] & {
      accept: VoidFunction,
      decline: VoidFunction
    }
  >,

  "wallPost": ObjectPrettify<
    PrettifiedGroupWallPostsData_V2[number] & {
      remove: VoidFunction
    }
  >,

  "transaction:sale": ObjectPrettify<PrettifiedGroupTransactionHistoryData<"Sale">>,

  "transaction:advanceRebate": ObjectPrettify<PrettifiedGroupTransactionHistoryData<"PublishingAdvanceRebates">>,
}

type EventType = keyof ClassicGroups_Events
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// [ Private Functions ] /////////////////////////////////////////////////////////
// Join Requests -----------------------------------------------------------------
const prepareJoinRequestsPage = async (
  joinReqs: PrettifiedGroupJoinRequests,
  handlerFn: (req: ClassicGroups_Events["joinRequest"]) => Promise<any>,
  userIdsToAccept: Identifier[], userIdsToDecline: Identifier[]
) => {
  await Promise.allSettled(
    joinReqs.map(joinReq => (async () => {
      let state: null | "accept" | "decline" = null

      await handlerFn({
        ...joinReq,
        accept: () => { state = "accept" },
        decline: () => { state = "decline" }
      })

      if (state == "accept") userIdsToAccept.push(joinReq.requester.userId)
      else if (state == "decline") userIdsToDecline.push(joinReq.requester.userId)
    })())
  )
}

const submitJoinRequestsPage = async (groupId: Identifier, userIdsToAccept: Identifier[], userIdsToDecline: Identifier[]) => {
  return await Promise.allSettled([
    userIdsToAccept.length ? ClassicGroupsApi.batchAcceptGroupJoinRequests({ groupId, userIds: userIdsToAccept }) : null,
    userIdsToDecline.length ? ClassicGroupsApi.batchDeclineGroupJoinRequests({ groupId, userIds: userIdsToDecline }) : null
  ])
}
// -------------------------------------------------------------------------------


// Wall Posts --------------------------------------------------------------------
const prepareAndSubmitWallPostsPage = async (
  wallPosts: PrettifiedGroupWallPostsData_V2,
  handlerFn: (req: ClassicGroups_Events["wallPost"]) => Promise<any>,
  groupId: Identifier
) => {
  const wallPostIdsToRemove: Identifier[] = []

  await Promise.allSettled(
    wallPosts.map(wallPost => (async () => {
      let toRemove: boolean = false

      await handlerFn({
        ...wallPost,
        remove: () => { toRemove = true },
      })

      if (toRemove) wallPostIdsToRemove.push(wallPost.id)
    })())
  )

  await Promise.allSettled(wallPostIdsToRemove.map(wallPostId => ClassicGroupsApi.removeGroupWallPost({ groupId, wallPostId })))
}
// -------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////

export const ClassicGroups = addObjectToFunction(
  async function(this: OpenbloxConfig | void, groupId: Identifier) {
    const config = this || defaultOpenbloxConfig

    return {
      on: <Name extends EventType>(
        eventName: Name,
        handlerFn: (data: ClassicGroups_Events[Name]) => any
      ): Name extends EventType ? Promise<void> : never => {
        switch (eventName) {
          case "auditLog": return pollForLatest(
            ClassicGroupsApi.groupAuditLogs, { groupId, limit: 25, sortOrder: "Desc" }, "created", config,
            async newResults => await Promise.allSettled(newResults.map(result => handlerFn(result as any)))
          ) as Name extends EventType ? Promise<void> : never

          case "joinRequest": return pollForLatest(
            ClassicGroupsApi.groupJoinRequests, { groupId, limit: 25, sortOrder: "Desc" }, "created", config,
            async joinReqs => {
              const userIdsToAccept: Identifier[] = [], userIdsToDecline: Identifier[] = []
              await prepareJoinRequestsPage(joinReqs, handlerFn as any, userIdsToAccept, userIdsToDecline)
              await submitJoinRequestsPage(groupId, userIdsToAccept, userIdsToDecline)
            }
          ) as Name extends EventType ? Promise<void> : never

          case "wallPost": return pollForLatest(
            ClassicGroupsApi.groupWallPosts_V2, { groupId, limit: 25, sortOrder: "Desc" }, "created", config,
            async wallPosts => await prepareAndSubmitWallPostsPage(wallPosts, handlerFn as any, groupId)
          ) as Name extends EventType ? Promise<void> : never

          case "transaction:sale": return pollForLatest(
            ClassicEconomyApi.groupTransactionHistory, { groupId, limit: 25, transactionType: "Sale" }, "created", config,
            async newResults => await Promise.allSettled(newResults.map(result => handlerFn(result as any)))
          ) as Name extends EventType ? Promise<void> : never

          case "transaction:advanceRebate": return pollForLatest(
            ClassicEconomyApi.groupTransactionHistory, { groupId, limit: 25, transactionType: "PublishingAdvanceRebates" }, "created", config,
            async newResults => await Promise.allSettled(newResults.map(result => handlerFn(result as any)))
          ) as Name extends EventType ? Promise<void> : never
        }

        return undefined as any as Name extends EventType ? Promise<void> : never
      },

      processJoinRequests: async (handlerFn: (req: ClassicGroups_Events["joinRequest"]) => Promise<any>) => {
        const userIdsToAccept: Identifier[] = [], userIdsToDecline: Identifier[] = []
        for await (const { data:joinReqs } of await ClassicGroupsApi.groupJoinRequests({ groupId, limit: 100, sortOrder: "Desc" })) {
          await prepareJoinRequestsPage(joinReqs, handlerFn, userIdsToAccept, userIdsToDecline)
        }
        await submitJoinRequestsPage(groupId, userIdsToAccept, userIdsToDecline)
      }
    }
  },

  {
    /*get: (fields: ArrayNonEmptyIfConst<string>) => ({
      forIds: async (userIds: ArrayNonEmptyIfConst<Identifier>) => "" as any
    })*/
  }
)