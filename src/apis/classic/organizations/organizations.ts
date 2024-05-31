// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
import type { OrgInfoForGroupData, OrgMemberPermissionsData, OrgRoleColor, OrgRolePermission, OverwriteOrgRolePermissions_NewPermissions, PrettifiedCreateOrgRoleData, PrettifiedOrgMembersData, PrettifiedOrgRolePermissionsData, PrettifiedOrgRolesData, RawCreateOrgRoleData, RawOrgMembersData, RawOrgRolePermissionsData, RawOrgRolesData } from "./organizations.types"
import { cloneAndMutateObject } from "~/utils/utils"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const addApiMethod = createApiGroup({ groupName: "ClassicOrganizations", baseUrl: "https://apis.roblox.com/orgs" })

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
export const orgInfoForGroup = addApiMethod(async <GroupId extends Identifier>(
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
export const orgRoles = addApiMethod(async <OrgId extends Identifier>(
  { orgId, limit = 10, cursor }: { orgId: OrgId, limit?: number, cursor?: string }
): ApiMethod<RawOrgRolesData<OrgId>, PrettifiedOrgRolesData<OrgId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/roles`,
  searchParams: { MaxPageSize: limit, PageToken: cursor },
  name: "orgRoles",

  prettifyFn: ({ roles }) => roles.map(role => cloneAndMutateObject(role, obj => {
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
export const orgRolePermissions = addApiMethod(async (
  { orgId, roleId }: { orgId: Identifier, roleId: Identifier }
): ApiMethod<RawOrgRolePermissionsData, PrettifiedOrgRolePermissionsData> => ({
  path: `/v1/organizations/${orgId}/roles/${roleId}/permissions`,
  method: "GET",
  name: "orgRolePermissions",

  prettifyFn: ({ permissions }) => permissions
}))


/**
 * Overwrites permissions for a role of an organizations.
 * @endpoint POST /v1/organizations/{orgId}/roles/{roleId}/permissions
 * 
 * @param orgId The ID of the organization to overwrite a roles permissions in.
 * @param roleid The ID of the group to overwrite permissions for.
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
 * @exampleData { success: true }
 * @exampleRawBody true
 */
export const overwriteOrgRolePermissions = addApiMethod(async (
  { orgId, roleId, newPermissions }: { orgId: Identifier, roleId: Identifier, newPermissions: OverwriteOrgRolePermissions_NewPermissions }
): ApiMethod<{ success: boolean }, boolean> => ({
  path: `/v1/organizations/${orgId}/roles/${roleId}/permissions`,
  method: "PATCH",
  body: {
    permissions: Object.entries(newPermissions).map(([ key, value ]) => ({
      category: permissionsCategory[key as keyof typeof permissionsCategory],
      operation: key.charAt(0).toUpperCase() + key.slice(1),
      enabled: value
    }))
  },
  name: "overwriteOrgRolePermissions",

  prettifyFn: ({ success }) => success
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
export const orgRoleMembers = addApiMethod(async <OrgId extends Identifier>(
  { orgId, roleId, limit = 10, cursor }: { orgId: Identifier, roleId: Identifier, limit?: number, cursor?: string }
): ApiMethod<RawOrgMembersData<OrgId>, PrettifiedOrgMembersData<OrgId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/roles/${roleId}/users`,
  searchParams: { MaxPageSize: limit, PageToken: cursor },
  name: `orgRoleMembers`,

  prettifyFn: ({ users }) => users.map(({ roles, ...rest }) => (
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
export const orgMembers = addApiMethod(async <OrgId extends Identifier>(
  { orgId, limit = 10, cursor }: { orgId: OrgId, limit?: number, cursor?: string }
): ApiMethod<RawOrgMembersData<OrgId>, PrettifiedOrgMembersData<OrgId>> => ({
  method: "GET",
  path: `/v1/organizations/${orgId}/users`,
  searchParams: { MaxPageSize: limit, PageToken: cursor },
  name: "orgMembers",

  prettifyFn: ({ users }) => users.map(({ roles, ...rest }) => (
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
export const orgMemberPermissions = addApiMethod(async (
  { orgId, userId }: { orgId: Identifier, userId: Identifier }
): ApiMethod<OrgMemberPermissionsData> => ({
  path: `/v1/organizations/${orgId}/users/${userId}/permissions`,
  method: "GET",
  name: "orgMemberPermissions"
}))


/**
 * Gives an organization member a specific role.
 * @endpoint POST /v1/organizations/{orgId}/users/{userId}/roles/{roleId}
 * 
 * @param orgId The ID of the organization to give a user a role in.
 * @param userId The ID of the user to give a role to.
 * @param roleId The ID of the role to be given.
 * 
 * @example
 * const { data:success } = await ClassicOrganizationsApi.giveOrgMemberRole({
     orgId: "4244556007738484576", userId: 45348281, roleId: "914257001913009232"
   })
 * @exampleData { success: true }
 * @exampleRawBody true
 */
export const giveOrgMemberRole = addApiMethod(async (
  { orgId, userId, roleId }: { orgId: Identifier, userId: Identifier, roleId: Identifier }
): ApiMethod<{ success: boolean }, boolean> => ({
  path: `/v1/organizations/${orgId}/users/${userId}/roles/${roleId}`,
  method: "POST",
  name: "giveOrgMemberRole",

  prettifyFn: ({ success }) => success
}))


/**
 * Deletes a role from a specific organization.
 * @endpoint POST /v1/organizations/{orgId}/users/{userId}/roles/{roleId}
 * 
 * @param orgId The ID of the organization to delete a role from.
 * @param roleId The ID of the role to be deleted.
 * 
 * @example
 * const { data:success } = await ClassicOrganizationsApi.deleteOrgRole({
     orgId: "4244556007738484576", roleId: "3960412067952396265"
   })
 * @exampleData { success: true }
 * @exampleRawBody true
 */
export const deleteOrgRole = addApiMethod(async (
  { orgId, roleId }: { orgId: Identifier, roleId: Identifier }
): ApiMethod<{ success: boolean }, boolean> => ({
  method: "DELETE",
  path: `/v1/organizations/${orgId}/roles/${roleId}`,
  name: "deleteOrgRole",

  prettifyFn: ({ success }) => success
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
 * const { data, response:{body} } = await ClassicOrganizationsApi.createOrgRole({
     orgId: "4244556007738484576", roleName: "Admin", roleColor: "LightOrange"
   })
 * @exampleData {"id":"4508567586590971666","organizationId":"4244556007738484576","name":"Admin","color":"LightOrange","updatedTime":2024-05-31T03:25:37.841Z}
 * @exampleRawBody {"id":"4508567586590971666","organizationId":"4244556007738484576","name":"Admin","color":"LightOrange","updatedTime":"2024-05-31T03:25:37.8410158Z"}
 */
export const createOrgRole = addApiMethod(async <OrgId extends Identifier, RoleName extends string, RoleColor extends OrgRoleColor>(
  { orgId, roleName, roleColor }: { orgId: OrgId, roleName: RoleName, roleColor: RoleColor }
): ApiMethod<RawCreateOrgRoleData<OrgId, RoleName, RoleColor>, PrettifiedCreateOrgRoleData<OrgId, RoleName, RoleColor>> => ({
  method: "POST",
  path: `/v1/organizations/${orgId}/roles`,
  body: { name: roleName, color: roleColor },
  name: "createOrgRole",

  prettifyFn: (role) => cloneAndMutateObject(role, obj => obj.updatedTime = new Date(obj.updatedTime))
}))