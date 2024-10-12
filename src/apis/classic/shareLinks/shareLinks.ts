// [ Modules ] ///////////////////////////////////////////////////////////////////
import {  } from "typeforge"
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { ApiMethod } from "../../apiGroup"
import type { ShareLinkInfo } from "./shareLinks.types"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "ClassicShareLinks", baseUrl: "https://apis.roblox.com/sharelinks" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Gets information about a share link.
 * @endpoint POST /v1/resolve-link
 * 
 * @param shareLinkId The ID (code) of the share link.
 * 
 * @example const { data:linkInfo } = await ClassicShareLinksApi.shareLinkInfo({ shareLinkId: "0629f8e684039c4d800a1a03623e7a6f" })
 * @exampleData {"experienceInviteData":null,"friendInviteData":null,"notificationExperienceInviteData":null,"profileLinkResolutionResponseData":null,"screenshotInviteData":null,"privateServerInviteData":{"status":"Valid","ownerUserId":45348281,"universeId":6430220996,"privateServerId":1630945839,"linkCode":"67771413747491684286858666824242","placeId":18980972074},"experienceDetailsInviteData":null,"avatarItemDetailsData":null,"contentPostData":null,"experienceAffiliateData":null}
 * @exampleRawBody {"experienceInviteData":null,"friendInviteData":null,"notificationExperienceInviteData":null,"profileLinkResolutionResponseData":null,"screenshotInviteData":null,"privateServerInviteData":{"status":"Valid","ownerUserId":45348281,"universeId":6430220996,"privateServerId":1630945839,"linkCode":"67771413747491684286858666824242","placeId":18980972074},"experienceDetailsInviteData":null,"avatarItemDetailsData":null,"contentPostData":null,"experienceAffiliateData":null}
 */
export const shareLinkInfo = createApiMethod(async (
  { shareLinkId }: { shareLinkId: string }
): ApiMethod<ShareLinkInfo> => ({
  method: "POST",
  path: `/v1/resolve-link`,
  body: {
    linkId: shareLinkId,
    linkType: "Server"
  },
  name: `shareLinkInfo`,
}))
