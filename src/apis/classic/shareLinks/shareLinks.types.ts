import type { Identifier } from "typeforge"


// POST /v1/resolve-link ---------------------------------------------------------------------------------------------
export type ShareLinkInfo = {
  experienceInviteData: null,
  friendInviteData: null,
  notificationExperienceInviteData: null,
  profileLinkResolutionResponseData: null,
  screenshotInviteData: null,
  privateServerInviteData: {
    status: "Valid",
    ownerUserId: Identifier,
    universeId: Identifier,
    privateServerId: Identifier,
    linkCode: Identifier,
    placeId: Identifier,
  },
  experienceDetailsInviteData: null,
  avatarItemDetailsData: null,
  contentPostData: null,
  experienceAffiliateData: null,
}
// -------------------------------------------------------------------------------------------------------------------



