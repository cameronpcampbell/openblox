// [ MODULES ] ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { forEach, map } from "p-iteration"

import { HttpHelper } from "../../lib/http/httpHelper"
import { cloneAndMutateObject, createObjectMapByKeyWithMiddleware } from "../../lib/lib.utils"
import { FindSettings } from "../../lib/apis/cacheAdapters/cacheAdapters.utils"
import { ApiFuncBaseHandler as BaseHandler } from "../../lib/apis/apis.utils"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [ TYPES ] /////////////////////////////////////////////////////////////////////////////////////////////////////////
import type { PrettifyKeyof } from "../../lib/lib.types"
import type { ApiMethods } from "../../lib/apis/apis.types"
import { FormattedGroupInfoData, GroupAuditLogActionType, GroupInfoData } from "./groupsApi.types"
import { SortOrder } from "../apis.types"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class GroupsApiClass {
  baseUrl: `https://${string}`
  http: HttpHelper
  name: string
  apiCacheMiddleware: any

  constructor(
    { cookie, apiCacheMiddleware, csrfRetries, httpAdapter }:
    { cookie?: string, apiCacheMiddleware?: any, csrfRetries?: number, httpAdapter?: any }
  ) {
    this.baseUrl = "https://groups.roblox.com"
    this.name = "GroupsApiClass"
    this.apiCacheMiddleware = apiCacheMiddleware

    this.http = new HttpHelper({baseUrl: this.baseUrl, cookie, apiCacheMiddleware, csrfRetries, httpAdapter})
  }

  private getCallerFunctionName() {
    try {
      throw new Error();
    } catch (error: any) {
      const stackLines = error.stack.split("\n");
      const callerLine = stackLines[2];
      const functionName = (/at (\S+)/.exec(callerLine) as any)[1];
      const classRegex = new RegExp("^" + this.name + "\\.");
      return functionName.replace(classRegex, "");
    }
  }

  private async findSettings(funcName: string) {
    return await FindSettings(this.apiCacheMiddleware?.arguments?.included, this.name, funcName)
  }


  // [ GROUPS ] ////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Gets information about a group. (NOTE: Auth is needed to see the group shout).
   * @category Groups
   * @endpoint GET /v1/groups/{groupId}
   * @tags [ "Auth Semi-Needed" ]
   * 
   * @param groupId The id of the group.
   * 
   * @example const { data:groupInfo } = await GroupsApi.groupInfo(5850082)
   * @exampleData { id: 5850082, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }
   * @exampleRawData { id: 5850082, name: "MightyPart Games", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", owner: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, shout: null, memberCount: 102, isBuildersClubOnly: false, publicEntryAllowed: true, hasVerifiedBadge: false }
   */
  groupInfo = async (groupId: number): Promise<
    { data: FormattedGroupInfoData, rawData: GroupInfoData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<GroupInfoData>(`/v1/groups/${groupId}`, {
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      const formattedData = cloneAndMutateObject<GroupInfoData, FormattedGroupInfoData>(rawData, obj => {
        if (!obj?.shout) return
        obj.shout.created = new Date(obj.shout.created); obj.shout.updated = new Date(obj.shout.updated)
      })

      return { rawData, data: formattedData, res }
    }, [])
  }

  /**
   * Gets information about a group.
   * @category Groups
   * @endpoint /v1/groups/{groupId}/audit-log
   * 
   * @param groupId The id of the group.
   * 
   * @example const { data:groupAuditLog } = await GroupsApi.groupAuditLog(5850082)
   * @exampleData 
   * @exampleRawData
   */
  groupAuditLog = async (
    groupId: number, actionType: GroupAuditLogActionType, limit: any, sortOrder: SortOrder="Asc", userId: number, cursor: string
  ): Promise<
    { data: GroupInfoData, rawData: GroupInfoData, res: unknown }
  > => {
    return BaseHandler(async () => {
      const { data:rawData, res } = await this.http.get<GroupInfoData>(`/v1/groups/{groupId}/audit-log`, {
        searchParams: { actionType, limit, sortOrder, userId, cursor },
        cacheSettings: this.apiCacheMiddleware && await this.findSettings(this.getCallerFunctionName())
      })

      return { rawData, data: rawData, res }
    }, [])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
}

export const GroupsApi = new GroupsApiClass({}) as ApiMethods<GroupsApiClass>


