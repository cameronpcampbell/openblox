// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { ClassicGroupsApi } from "../../classic"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { addExistingApiMethod } = createApiGroup({ name: "LegacyGroups", baseUrl: "https://apis.roblox.com/legacy-groups" })
//////////////////////////////////////////////////////////////////////////////////


// [ Groups ] /////////////////////////////////////////////////////////////////////
/**
 * Gets audit log entries for a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}/audit-log
 * 
 * @param groupId The id of the group.
 * @param actionType The action to filter the audit logs by. (no filter will be applied if actionType is undefined).
 * @param userId Filter for specific user by their id.
 * @param limit The number of results to be returned.
 * @param sortOrder The order that the results are sorted in.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:auditLog } = await LegacyGroupsApi.groupAuditLogs({ groupId: 5850082 })
 * @exampleData { previousPageCursor: null, nextPageCursor: null, data: [ { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 6333562, TargetGroupName: "Mine Ways Talk Show" }, created: "2020-05-18T12:06:34Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 5257567, TargetGroupName: "The X1 Team" }, created: "2020-05-13T13:52:57Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "Accept Ally Request", description: { TargetGroupId: 5894486, TargetGroupName: "Sky-Blox Studio" }, created: "2020-05-13T13:52:56Z" } ] }
 * @exampleRawBody [ { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 6333562, targetGroupName: "Mine Ways Talk Show" }, created: "2020-05-18T12:06:34Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 5257567, targetGroupName: "The X1 Team" }, created: "2020-05-13T13:52:57Z" }, { actor: { user: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, role: { id: 38353811, name: "NamelessGuy2005 - Scriptor", rank: 255 } }, actionType: "AcceptAllyRequest", description: { targetGroupId: 5894486, targetGroupName: "Sky-Blox Studio" }, created: "2020-05-13T13:52:56Z" } ]
 */
export const groupAuditLogs = addExistingApiMethod(ClassicGroupsApi.groupAuditLogs)


/**
 * Gets group policy info used for compliance.
 * @category Groups
 * @endpoint GET /v1/groups/policies
 * @tags [ "Cookie" ]
 * 
 * @param groupIds the ids of groups to get policy info for.
 * 
 * @example const { data:policyInfo } = await LegacyGroupsApi.groupsPolicyInfo({ groupIds: [ 5850082 ] })
 * @exampleData { "5850082": { canViewGroup: true } }
 * @exampleRawBody { groups: [ { canViewGroup: true, groupId: 5850082 } ] }
 */
export const groupsPolicyInfo = addExistingApiMethod(ClassicGroupsApi.groupsPolicyInfo)


/**
 * Gets settings for a group.
 * @category Groups
 * @endpoint GET /v1/groups/{groupId}/settings
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to get settings for.
 * 
 * @example const { data:settings } = await LegacyGroupsApi.groupSettings({ groupId: 5850082 })
 * @exampleData { isApprovalRequired: true, isBuildersClubRequired: false, areEnemiesAllowed: true, areGroupFundsVisible: false, areGroupGamesVisible: true, isGroupNameChangeEnabled: true }
 * @exampleRawBody { isApprovalRequired: true, isBuildersClubRequired: false, areEnemiesAllowed: true, areGroupFundsVisible: false, areGroupGamesVisible: true, isGroupNameChangeEnabled: true }
 */
export const groupSettings = addExistingApiMethod(ClassicGroupsApi.groupSettings)


/**
 * Sets settings for a group.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/settings
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group.
 * @param newSettings The new settings for the group.
 * 
 * @example const { data:success } = await LegacyGroupsApi.setGroupSettings({ groupId: 5850082, newSettings: {
    isApprovalRequired: true,
    isBuildersClubRequired: false,
    areEnemiesAllowed: true,
    areGroupFundsVisible: false,
    areGroupGamesVisible: true, isGroupNameChangeEnabled: true
  }})
 * @exampleData boolean
 * @exampleRawBody {}
 */
export const setGroupSettings = addExistingApiMethod(ClassicGroupsApi.setGroupSettings)


/**
 * Sets group shout (status).
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/status
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the shout for.
 * @param message The content of the new shout.
 * 
 * @example const { data:newShout } = await LegacyGroupsApi.setGroupShout({ groupId: 5850082, newShout: "Hello World!" })
 * @exampleData { body: "Hello World!", poster: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, created: 2020-03-31T18:36:51.607Z, updated: 2023-09-15T16:21:00.272Z }
 * @exampleRawBody { body: "Hello World!", poster: { hasVerifiedBadge: false, userId: 45348281, username: "MightyPart", displayName: "MightyPart" }, created: "2020-03-31T18:36:51.607Z", updated: "2023-09-15T16:21:00.272Z" }
 */
export const setGroupShout = addExistingApiMethod(ClassicGroupsApi.setGroupShout)


/**
 * Sets group description.
 * @category Groups
 * @endpoint PATCH /v1/groups/{groupId}/description
 * @tags [ "Cookie" ]
 * 
 * @param groupId The id of the group to set the description for.
 * @param newDescription The content of the new description.
 * 
 * @example const { data:newDescription } = await LegacyGroupsApi.setGroupDescription({ groupId: 5850082, newDescription: "Hello World!" })
 * @exampleData "Hello World!"
 * @exampleRawBody { newDescription: "Hello World!" }
 */
export const setGroupDescription = addExistingApiMethod(ClassicGroupsApi.setGroupDescription)
//////////////////////////////////////////////////////////////////////////////////