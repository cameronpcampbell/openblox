// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier, ISODateTime, ObjectPrettify, UnionPrettify } from "typeforge"
//////////////////////////////////////////////////////////////////////////////////

export type OrgRoleColor = UnionPrettify<"Blue" | "Green" | "Purple" | "Yellow" | "Orange"  | "Red"  | "LightOrange" | "Pink" | "Teal">

type OrgRole<
  OrgId extends Identifier, TemporalType,
  RoleName extends string = string, RoleColor extends OrgRoleColor = OrgRoleColor
> = ObjectPrettify<{
  id: Identifier,
  organizationId: OrgId,
  name: RoleName,
  color: RoleColor,
  updatedTime: TemporalType
}>

export type OrgRolePermission = UnionPrettify<{
  category: "Organization",
  operation: "ManageMembers",
  enabled: boolean,
} | {
  category: "Organization",
  operation: "ManageRoles",
  enabled: boolean,
} | {
  category: "Organization",
  operation: "Configure",
  enabled: boolean,
} | {
  category: "Experience",
  operation: "Play",
  enabled: boolean,
} | {
  category: "Experience",
  operation: "Edit",
  enabled: boolean,
} | {
  category: "Experience",
  operation: "ViewAnalytics",
  enabled: boolean,
}>

// GET /v1/organizations ---------------------------------------------------------------------------------------------
export type OrgInfoForGroupData<GroupId extends Identifier> = {
  id: Identifier,
  groupId: GroupId
}
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/organizations/${orgId}/roles ------------------------------------------------------------------------------
export type RawOrgRolesData<OrgId extends Identifier> = {
  roles: OrgRole<OrgId, ISODateTime>[],
  pageToken: string
}

export type PrettifiedOrgRolesData<OrgId extends Identifier> = OrgRole<OrgId, Date>[]
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/organizations/{orgId}/roles/{roleId}/permissions ----------------------------------------------------------
export type PrettifiedOrgRolePermissionsData = OrgRolePermission[]

export type RawOrgRolePermissionsData = {
  permissions: OrgRolePermission[]
}
// -------------------------------------------------------------------------------------------------------------------


// PATCH /v1/organizations/{orgId}/roles/{roleId}/permissions --------------------------------------------------------
export type OverwriteOrgRolePermissions_NewPermissions = ObjectPrettify<{
  manageMembers: boolean,
  manageRoles: boolean,
  configure: boolean,
  play: boolean,
  edit: boolean,
  viewAnalytics: boolean
}>
// -------------------------------------------------------------------------------------------------------------------


// GET /v1/organizations/{orgId}/roles/{roleId}/users AND GET /v1/organizations/{orgId}/users --------------------------
type OrgMembersData<OrgId extends Identifier, TemporalType> = {
  userId: Identifier,
  roles: OrgRole<OrgId, TemporalType>[]
}[]

export type RawOrgMembersData<OrgId extends Identifier> = {
  users: OrgMembersData<OrgId, ISODateTime>,
  pageToken: string
}

export type PrettifiedOrgMembersData<OrgId extends Identifier> = OrgMembersData<OrgId, Date>
// -------------------------------------------------------------------------------------------------------------------


//  GET /v1/organizations/{orgId}/users/{userId}/permissions ---------------------------------------------------------
export type OrgMemberPermissionsData = {
  isOwner: boolean,
  canConfigureOrganization: boolean,
  canManageRoles: boolean,
  canManageMembers: boolean,
  canViewAnalytics: boolean,
  canPlayExperiences: boolean,
  canEditExperiences: boolean
}
// -------------------------------------------------------------------------------------------------------------------


// POST /v1/organizations/${orgId}/roles -----------------------------------------------------------------------------
export type RawCreateOrgRoleData<
  OrgId extends Identifier, RoleName extends string, RoleColor extends OrgRoleColor
> = OrgRole<OrgId, ISODateTime, RoleName, RoleColor>

export type PrettifiedCreateOrgRoleData<
  OrgId extends Identifier, RoleName extends string, RoleColor extends OrgRoleColor
> = OrgRole<OrgId, Date, RoleName, RoleColor>
// -------------------------------------------------------------------------------------------------------------------