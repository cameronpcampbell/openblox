// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
import { cloneAndMutateObject } from "../../../utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { OrgInfoForGroupData, OrgMemberPermissionsData, OrgRoleColor, OverwriteOrgRolePermissions_NewPermissions, PrettifiedCreateOrgInvitationData, PrettifiedCreateOrgRoleData, PrettifiedOrgInvitations, PrettifiedOrgMembersData, PrettifiedOrgRoleMetadataData, PrettifiedOrgRolePermissionsData, PrettifiedOrgRolesData, PrettifiedUpdateOrgRoleData, RawCreateOrgInvitationData, RawCreateOrgRoleData, RawOrgInvitations, RawOrgMembersData, RawOrgRoleMetadataData, RawOrgRolePermissionsData, RawOrgRolesData, RawUpdateOrgRoleData } from "./organizations.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicOrganizations", baseUrl: "https://apis.roblox.com/orgs" })

const permissionsCategory = {
  manageMembers: "Organization",
  manageRoles: "Organization",
  configure: "Organization",
  play: "Experience",
  edit: "Experience",
  viewAnalytics: "Experience"
} satisfies { [Key in keyof OverwriteOrgRolePermissions_NewPermissions]: string }
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets organization info for a group.
 * @endpoint GET /v1/organizations
 * 
 * @param groupId The ID of the group to get organization info about.
 * 
 * @example const { data:orgInfo } = await ClassicOrganizationsApi.orgInfoForGroup({ groupId: 15842838 })
 * @exampleData { id: "4244556007738484576", groupId: "15842838" }
 * @exampleRawBody { id: "4244556007738484576", groupId: "15842838" }
 */
export const orgInfoForGroup = createApiMethod(async <GroupId extends Identifier>(
  { groupId }: { groupId: GroupId }
): ApiMethod<OrgInfoForGroupData<GroupId>> => ({
  method: "GET",
  path: `/v1/organizations`,
  searchParams: { groupId },
  name: "orgInfoForGroup"
}))


/**
 * Gets a page of roles for an organization.
 * @endpoint GET /v1/organizations/{orgId}/roles
 * 
 * @param orgId The ID of the organization to get roles for.
 * @param limit The maximum amount of roles to return.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:roles } = await ClassicOrganizationsApi.orgRoles({ orgId: "4244556007738484576" })
 * @exampleData [{"id":"2011766837304130930","organizationId":"4244556007738484576","name":"New Role 7275","color":"Green","updatedTime":"2024-05-31T02:34:51.832Z"},{"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime":"2024-05-31T01:24:02.823Z"},{"id":"3456593169348895666","organizationId":"4244556007738484576","name":"Tester","color":"Teal","updatedTime":"2024-05-31T01:24:02.827Z"}]
 * @exampleRawBody {"roles":[{"id":"2011766837304130930","organizationId":"4244556007738484576","name":"New Role 7275","color":"Green","updatedTime":"2024-05-31T02:34:51.8329242Z"},{"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime":"2024-05-31T01:24:02.8238408Z"},{"id":"3456593169348895666","organizationId":"4244556007738484576","name":"Tester","color":"Teal","updatedTime":"2024-05-31T01:24:02.8271342Z"}],"pageToken":""}
 */
export const orgRoles = createApiMethod(async <OrgId extends Identifier>(
  { orgId, limit = 10, cursor }: { orgId: OrgId, limit?: number, cursor?: string }
): ApiMethod<RawOrgRolesData<OrgId>, PrettifiedOrgRolesData<OrgId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/roles`,
  searchParams: { MaxPageSize: limit, PageToken: cursor },
  name: "orgRoles",

  formatRawDataFn: ({ roles }) => roles.map(role => cloneAndMutateObject(role, obj => {
    obj.updatedTime = new Date(obj.updatedTime)
  })),

  getCursorsFn: ({ pageToken }) => [ null, pageToken ]
}))


/**
 * Gets permissions for a specific role of an organization.
 * @endpoint GET /v1/organizations/{orgId}/roles/{roleId}/permissions
 * 
 * @param orgId The ID of the organization to get a roles permissions for.
 * @param roleId The ID of the role to get permissions for.
 * 
 * @example
 * const { data:perms } = await ClassicOrganizationsApi.orgRolePermissions({
 *   orgId: "4244556007738484576", roleId: "2011766837304130930"
 * })
 * @exampleData [{"category":"Organization","operation":"ManageMembers","enabled":false},{"category":"Organization","operation":"ManageRoles","enabled":false},{"category":"Organization","operation":"Configure","enabled":false},{"category":"Experience","operation":"Play","enabled":false},{"category":"Experience","operation":"Edit","enabled":false},{"category":"Experience","operation":"ViewAnalytics","enabled":false}]
 * @exampleRawBody {"permissions":[{"category":"Organization","operation":"ManageMembers","enabled":false},{"category":"Organization","operation":"ManageRoles","enabled":false},{"category":"Organization","operation":"Configure","enabled":false},{"category":"Experience","operation":"Play","enabled":false},{"category":"Experience","operation":"Edit","enabled":false},{"category":"Experience","operation":"ViewAnalytics","enabled":false}]}
 */
export const orgRolePermissions = createApiMethod(async (
  { orgId, roleId }: { orgId: Identifier, roleId: Identifier }
): ApiMethod<RawOrgRolePermissionsData, PrettifiedOrgRolePermissionsData> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/roles/${roleId}/permissions`,
  name: "orgRolePermissions",

  formatRawDataFn: ({ permissions }) => permissions
}))


/**
 * Gets metadata for a specific role of an organization.
 * @endpoint GET /v1/organizations/{orgId}/roles/{roleId}/metadata
 * 
 * @param orgId The ID of the organization to get a roles metadata for.
 * @param roleId The ID of the role to get metadata for.
 * 
 * @example const { data:metadata } = await ClassicOrganizationsApi.orgRoleMetadata({
 *   orgId: "4244556007738484576", roleId: "914257001913009232"
 * })
 * @exampleData {"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime": 2024-05-31T01:24:02.823Z}
 * @exampleRawBody {"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime":"2024-05-31T01:24:02.823Z"}
 */
export const orgRoleMetadata = createApiMethod(async <OrgId extends Identifier, RoleId extends Identifier>(
  { orgId, roleId }: { orgId: OrgId, roleId: RoleId }
): ApiMethod<RawOrgRoleMetadataData<OrgId, RoleId>, PrettifiedOrgRoleMetadataData<OrgId, RoleId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/roles/${roleId}/metadata`,
  name: "orgRoleMetadata",

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.updatedTime = new Date(obj.updatedTime)),
}))


/**
 * Overwrites permissions for a role of an organizations.
 * @endpoint PATCH /v1/organizations/{orgId}/roles/{roleId}/permissions
 * 
 * @param orgId The ID of the organization to overwrite a roles permissions in.
 * @param roleId The ID of the group to overwrite permissions for.
 * @param newPermissions The new permissions to assign to the role.
 * 
 * @example
 * const { data:success } = await ClassicOrganizationsApi.overwriteOrgRolePermissions({
     orgId: "4244556007738484576", roleId: "4500991930780611394", newPermissions: {
       manageMembers: true,
       manageRoles: true,
       configure: true,
       play: true,
       edit: true,
       viewAnalytics: true
     }
   })
 * @exampleData true
 * @exampleRawBody { success: true }
 */
export const overwriteOrgRolePermissions = createApiMethod(async (
  { orgId, roleId, newPermissions }: { orgId: Identifier, roleId: Identifier, newPermissions: OverwriteOrgRolePermissions_NewPermissions }
): ApiMethod<{ success: boolean }, boolean> => ({
  method: "PATCH",
  path: `/v1/organizations/${orgId}/roles/${roleId}/permissions`,
  body: {
    permissions: Object.entries(newPermissions).map(([ key, value ]) => ({
      category: permissionsCategory[key as keyof typeof permissionsCategory],
      operation: key.charAt(0).toUpperCase() + key.slice(1),
      enabled: value
    }))
  },
  name: "overwriteOrgRolePermissions",

  formatRawDataFn: ({ success }) => success
}))


/**
 * Gets a page of members for a specific role in an organization.
 * @endpoint GET /v1/organizations/{orgId}/roles/{roleId}/users
 * 
 * @param orgId The ID of the organization to get members for.
 * @param limit The maximum amount of members to return.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example
 * const { data:members } = await ClassicOrganizationsApi.orgRoleMembers({
     orgId: "4244556007738484576", roleId: "4500991930780611394"
   })
 * @exampleData [{"userId":"45348281","roles":[{"id":"4500991930780611394","organizationId":"4244556007738484576","name":"Orange","color":"Orange","updatedTime":2024-05-31T03:13:24.753Z}]}]
 * @exampleRawBody {"users":[{"userId":"45348281","roles":[{"id":"4500991930780611394","organizationId":"4244556007738484576","name":"Orange","color":"Orange","updatedTime":"2024-05-31T03:13:24.7539993Z"}]}],"pageToken":""}
 */
export const orgRoleMembers = createApiMethod(async <OrgId extends Identifier>(
  { orgId, roleId, limit = 10, cursor }: { orgId: Identifier, roleId: Identifier, limit?: number, cursor?: string }
): ApiMethod<RawOrgMembersData<OrgId>, PrettifiedOrgMembersData<OrgId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/roles/${roleId}/users`,
  searchParams: { MaxPageSize: limit, PageToken: cursor },
  name: `orgRoleMembers`,

  formatRawDataFn: ({ users }) => users.map(({ roles, ...rest }) => (
    {
      ...rest,
      roles: roles.map(role => cloneAndMutateObject(role, obj => {
        obj.updatedTime = new Date(obj.updatedTime)
      }))
    }
  )),

  getCursorsFn: ({ pageToken }) => [ null, pageToken ]
}))


/**
 * Gets a page of members for an organization.
 * @endpoint GET /v1/organizations/{orgId}/users
 * 
 * @param orgId The ID of the organization to get members for.
 * @param limit The maximum amount of members to return.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:members } = await ClassicOrganizationsApi.orgMembers({ orgId: "4244556007738484576" })
 * @exampleData [{"userId":"45348281","roles":[{"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime":"2024-05-31T01:24:02.823Z"}]}]
 * @exampleRawBody {"users":[{"userId":"45348281","roles":[{"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime":"2024-05-31T01:24:02.8238408Z"}]}],"pageToken":""}
 */
export const orgMembers = createApiMethod(async <OrgId extends Identifier>(
  { orgId, limit = 10, cursor }: { orgId: OrgId, limit?: number, cursor?: string }
): ApiMethod<RawOrgMembersData<OrgId>, PrettifiedOrgMembersData<OrgId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/users`,
  searchParams: { MaxPageSize: limit, PageToken: cursor },
  name: "orgMembers",

  formatRawDataFn: ({ users }) => users.map(({ roles, ...rest }) => (
    {
      ...rest,
      roles: roles.map(role => cloneAndMutateObject(role, obj => {
        obj.updatedTime = new Date(obj.updatedTime)
      }))
    }
  )),

  getCursorsFn: ({ pageToken }) => [ null, pageToken ]
}))


/**
 * Gets a page of members for an organization.
 * @endpoint GET /v1/organizations/{orgId}/users
 * 
 * @param orgId The ID of the organization to get invitations for.
 * @param limit The maximum amount of roles to return.
 * @param cursor The paging cursor for the previous or next page.
 * 
 * @example const { data:invitations } = await ClassicOrganizationsApi.orgInvitations({ orgId: "4244556007738484576" })
 * @exampleData [{"id":"7659171709868310756","organizationId":"4244556007738484576","recipientUserId":"2655994471","senderUserId":"45348281","invitationStatusType":"Open","updatedTime":"2024-05-31T04:30:08.713Z"}]
 * @exampleRawBody {"invitations":[{"id":"7659171709868310756","organizationId":"4244556007738484576","recipientUserId":"2655994471","senderUserId":"45348281","invitationStatusType":"Open","updatedTime":"2024-05-31T04:30:08.713Z"}],"pageToken":""}
 */
export const orgInvitations = createApiMethod(async <OrgId extends Identifier>(
  { orgId, limit = 500, cursor }: { orgId: OrgId, limit?: number, cursor?: string }
): ApiMethod<RawOrgInvitations<OrgId>, PrettifiedOrgInvitations<OrgId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/invitations`,
  searchParams: { MaxPageSize: limit, PageToken: cursor },
  name: `orgInvitations`,

  formatRawDataFn: ({ invitations }) => invitations.map(invitation => cloneAndMutateObject(invitation, obj => (
    obj.updatedTime = new Date(obj.updatedTime)
  ))),

  getCursorsFn: ({ pageToken }) => [ null, pageToken ]
}))


/**
 * Invites a user to an organization.
 * @endpoint POST /v1/organizations/{orgId}/invitations
 * 
 * @param orgId The ID of the organization to invite a user to.
 * @param userId The ID of the user to invite to the organization.
 * 
 * @example
 * const { data:inviteInfo } = await ClassicOrganizationsApi.createOrgInvitation({
     orgId: "4244556007738484576", userId: 2655994471
   })
 * @exampleData [{"userId":"45348281","roles":[{"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime":"2024-05-31T01:24:02.823Z"}]}]
 * @exampleRawBody {"users":[{"userId":"45348281","roles":[{"id":"914257001913009232","organizationId":"4244556007738484576","name":"Developer","color":"LightOrange","updatedTime":"2024-05-31T01:24:02.8238408Z"}]}],"pageToken":""}
 */
export const createOrgInvitation = createApiMethod(async <OrgId extends Identifier, UserId extends Identifier>(
  { orgId, userId }: { orgId: OrgId, userId: UserId }
): ApiMethod<RawCreateOrgInvitationData<OrgId, UserId>, PrettifiedCreateOrgInvitationData<OrgId, UserId>> => ({
  method: "POST",
  path: `/v1/organizations/${orgId}/invitations`,
  body: { recipientUserId: userId },
  name: `createOrgInvitation`,

  formatRawDataFn: (rawData) => cloneAndMutateObject(rawData, obj => obj.updatedTime = new Date(obj.updatedTime))
}))

/**
 * Invites a user to an organization.
 * @endpoint DELETE /v1/organizations/{orgId}/invitations/{invitationId}
 * 
 * @param orgId The ID of the organization to invite a user to.
 * @param invitationId The ID of the invitation to remove.
 * 
 * @example
 * const { data:success } = await ClassicOrganizationsApi.removeOrgInvitation({
     orgId: "4244556007738484576", invitationId: "2985153037232505065"
   })
 * @exampleData true
 * @exampleRawBody { success: true }
 */
export const removeOrgInvitation = createApiMethod(async (
  { orgId, invitationId }: { orgId: Identifier, invitationId: Identifier }
): ApiMethod<{ success: boolean }, boolean> => ({
  method: "DELETE",
  path: `/v1/organizations/${orgId}/invitations/${invitationId}`,
  name: `removeOrgInvitation`,

  formatRawDataFn: ({ success }) => success
}))


/**
 * Gets permissions for a specific member of an organization.
 * @endpoint GET /v1/organizations/{orgId}/users/{userId}/permissions
 * 
 * @param orgId The ID of the organization to get a users permissions for.
 * @param userId The ID of the user to get permissions for.
 * 
 * @example const { data:perms } = await ClassicOrganizationsApi.orgMemberPermissions({ orgId: "4244556007738484576", userId: 45348281 })
 * @exampleData {"isOwner":true,"canConfigureOrganization":true,"canManageRoles":true,"canManageMembers":true,"canViewAnalytics":true,"canPlayExperiences":true,"canEditExperiences":true}
 * @exampleRawBody {"isOwner":true,"canConfigureOrganization":true,"canManageRoles":true,"canManageMembers":true,"canViewAnalytics":true,"canPlayExperiences":true,"canEditExperiences":true}
 */
export const orgMemberPermissions = createApiMethod(async (
  { orgId, userId }: { orgId: Identifier, userId: Identifier }
): ApiMethod<OrgMemberPermissionsData> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/users/${userId}/permissions`,
  name: "orgMemberPermissions"
}))


/**
 * Gives a specifc role to an organization member.
 * @endpoint POST /v1/organizations/{orgId}/users/{userId}/roles/{roleId}
 * 
 * @param orgId The ID of the organization to give a user a role in.
 * @param userId The ID of the user to give a role to.
 * @param roleId The ID of the role to be given.
 * 
 * @example
 * const { data:success } = await ClassicOrganizationsApi.giveRoleToOrgMember({
     orgId: "4244556007738484576", userId: 45348281, roleId: "914257001913009232"
   })
 * @exampleData { success: true }
 * @exampleRawBody true
 */
export const giveRoleToOrgMember = createApiMethod(async (
  { orgId, userId, roleId }: { orgId: Identifier, userId: Identifier, roleId: Identifier }
): ApiMethod<{ success: boolean }, boolean> => ({
  method: "POST",
  path: `/v1/organizations/${orgId}/users/${userId}/roles/${roleId}`,
  name: "giveRoleToOrgMember",

  formatRawDataFn: ({ success }) => success
}))


/**
 * Removes a specifc role from an organization member.
 * @endpoint DELETE /v1/organizations/{orgId}/users/{userId}/roles/{roleId}
 * 
 * @param orgId The ID of the organization to give a user a role in.
 * @param userId The ID of the user to give a role to.
 * @param roleId The ID of the role to be given.
 * 
 * @example
 * const { data:success } = await ClassicOrganizationsApi.removeRoleFromOrgMember({
     orgId: "4244556007738484576", userId: 45348281, roleId: "914257001913009232"
   })
 * @exampleData { success: true }
 * @exampleRawBody true
 */
export const removeRoleFromOrgMember = createApiMethod(async (
  { orgId, userId, roleId }: { orgId: Identifier, userId: Identifier, roleId: Identifier }
): ApiMethod<{ success: boolean }, boolean> => ({
  method: "DELETE",
  path: `/v1/organizations/${orgId}/users/${userId}/roles/${roleId}`,
  name: "removeRoleFromOrgMember",

  formatRawDataFn: ({ success }) => success
}))


/**
 * Creates a role in a specific organization.
 * @endpoint POST /v1/organizations/{orgId}/roles
 * 
 * @param orgId The ID of the organization to create a role in.
 * @param roleName The name for the new role.
 * @param roleColor The color for the new role.
 * 
 * @example
 * const { data } = await ClassicOrganizationsApi.createOrgRole({
     orgId: "4244556007738484576", roleName: "Admin", roleColor: "LightOrange"
   })
 * @exampleData {"id":"4508567586590971666","organizationId":"4244556007738484576","name":"Admin","color":"LightOrange","updatedTime":2024-05-31T03:25:37.841Z}
 * @exampleRawBody {"id":"4508567586590971666","organizationId":"4244556007738484576","name":"Admin","color":"LightOrange","updatedTime":"2024-05-31T03:25:37.8410158Z"}
 */
export const createOrgRole = createApiMethod(async <OrgId extends Identifier, RoleName extends string, RoleColor extends OrgRoleColor>(
  { orgId, roleName, roleColor }: { orgId: OrgId, roleName: RoleName, roleColor: RoleColor }
): ApiMethod<RawCreateOrgRoleData<OrgId, RoleName, RoleColor>, PrettifiedCreateOrgRoleData<OrgId, RoleName, RoleColor>> => ({
  method: "POST",
  path: `/v1/organizations/${orgId}/roles`,
  body: { name: roleName, color: roleColor },
  name: "createOrgRole",

  formatRawDataFn: (role) => cloneAndMutateObject(role, obj => obj.updatedTime = new Date(obj.updatedTime))
}))


/**
 * Updates an existing role in a specific organization.
 * @endpoint PATCH /v1/organizations/{orgId}/roles/{roleId}/metadata
 * 
 * @param orgId The ID of the organization to update a role in.
 * @param roleId The ID of the role to update.
 * @param roleName The new name for the role.
 * @param roleColor The new color for the role.
 * 
 * @example
 * const { data:updatedRoleInfo } = await ClassicOrganizationsApi.updateOrgRole({
     orgId: "4244556007738484576", roleId: "517896615410563397", roleName: "Admin", roleColor: "LightOrange"
   })
 * @exampleData {"id":"4508567586590971666","organizationId":"4244556007738484576","name":"Admin","color":"LightOrange","updatedTime":2024-05-31T03:25:37.841Z}
 * @exampleRawBody {"id":"4508567586590971666","organizationId":"4244556007738484576","name":"Admin","color":"LightOrange","updatedTime":"2024-05-31T03:25:37.8410158Z"}
 */
export const updateOrgRole = createApiMethod(async <
  OrgId extends Identifier, RoleId extends Identifier, RoleName extends string, RoleColor extends OrgRoleColor
>(
  { orgId, roleId, roleName, roleColor }: { orgId: OrgId, roleId: RoleId, roleName: RoleName, roleColor: RoleColor }
): ApiMethod<RawUpdateOrgRoleData<OrgId, RoleId, RoleName, RoleColor>, PrettifiedUpdateOrgRoleData<OrgId, RoleId, RoleName, RoleColor>> => ({
  method: "PATCH",
  path: `/v1/organizations/${orgId}/roles/${roleId}/metadata`,
  body: { name: roleName, color: roleColor },
  name: "createOrgRole",

  formatRawDataFn: (role) => cloneAndMutateObject(role, obj => obj.updatedTime = new Date(obj.updatedTime))
}))


/**
 * Deletes a role from a specific organization.
 * @endpoint DELETE /v1/organizations/{orgId}/roles/{roleId}
 * 
 * @param orgId The ID of the organization to delete a role from.
 * @param roleId The ID of the role to be deleted.
 * 
 * @example
 * const { data:success } = await ClassicOrganizationsApi.deleteOrgRole({
     orgId: "4244556007738484576", roleId: "3960412067952396265"
   })
 * @exampleData true
 * @exampleRawBody { success: true }
 */
   export const deleteOrgRole = createApiMethod(async (
    { orgId, roleId }: { orgId: Identifier, roleId: Identifier }
  ): ApiMethod<{ success: boolean }, boolean> => ({
    method: "DELETE",
    path: `/v1/organizations/${orgId}/roles/${roleId}`,
    name: "deleteOrgRole",
  
    formatRawDataFn: ({ success }) => success
  }))