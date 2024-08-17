import type { ArrayPrettify, Identifier, ISODateTime, ObjectPrettify, UnionPrettify } from "typeforge"


export type OrgRoleColor = UnionPrettify<"Blue" | "Green" | "Purple" | "Yellow" | "Orange"  | "Red"  | "LightOrange" | "Pink" | "Teal">

type OrgRole<
  OrgId extends Identifier, TemporalType,
  RoleName extends string = string, RoleColor extends OrgRoleColor = OrgRoleColor,
  RoleId extends Identifier = Identifier
> = ObjectPrettify<{
  id: RoleId,
  organizationId: OrgId,
  name: RoleName,
  color: RoleColor,
  updatedTime: TemporalType
}>

type OrgInvitation<OrgId extends Identifier, UserId extends Identifier, TemporalType> =  ObjectPrettify<{
  id: Identifier,
  organizationId: OrgId,
  recipientUserId: UserId,
  senderUserId: Identifier,
  invitationStatusType: "Open",
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


// GET /v1/organizations/{orgId}/roles/{roleId}/metadata -------------------------------------------------------------
export type RawOrgRoleMetadataData<
  OrgId extends Identifier, RoleId extends Identifier
> = OrgRole<OrgId, ISODateTime, string, OrgRoleColor, RoleId>

export type PrettifiedOrgRoleMetadataData<
  OrgId extends Identifier, RoleId extends Identifier
> = OrgRole<OrgId, Date, string, OrgRoleColor, RoleId>
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


// GET /v1/organizations/{orgId}/invitations -------------------------------------------------------------------------
export type RawOrgInvitations<OrgId extends Identifier> = {
  invitations: OrgInvitation<OrgId, Identifier, ISODateTime>[],
  pageToken: string
}

export type PrettifiedOrgInvitations<OrgId extends Identifier> = ArrayPrettify<OrgInvitation<OrgId, Identifier, Date>[]>
// -------------------------------------------------------------------------------------------------------------------


// POST /v1/organizations/{userId}/invitations -----------------------------------------------------------------------
export type RawCreateOrgInvitationData<OrgId extends Identifier, UserId extends Identifier> = OrgInvitation<OrgId, UserId, ISODateTime>

export type PrettifiedCreateOrgInvitationData<OrgId extends Identifier, UserId extends Identifier> = OrgInvitation<OrgId, UserId, Date>
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


// PATCH /v1/organizations/${orgId}/roles/${roleId}/metadata ---------------------------------------------------------
export type RawUpdateOrgRoleData<
  OrgId extends Identifier, RoleId extends Identifier, RoleName extends string, RoleColor extends OrgRoleColor
> = OrgRole<OrgId, ISODateTime, RoleName, RoleColor, RoleId>

export type PrettifiedUpdateOrgRoleData<
  OrgId extends Identifier, RoleId extends Identifier, RoleName extends string, RoleColor extends OrgRoleColor
> = OrgRole<OrgId, Date, RoleName, RoleColor, RoleId>
// -------------------------------------------------------------------------------------------------------------------