// [ Modules ] ///////////////////////////////////////////////////////////////////
import { createApiGroup } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Types ] /////////////////////////////////////////////////////////////////////
import type { Identifier } from "typeforge"

import type { ApiMethod } from "../../apiGroup"
//////////////////////////////////////////////////////////////////////////////////


// [ Variables ] /////////////////////////////////////////////////////////////////
const { createApiMethod } = createApiGroup({ name: "Messaging", baseUrl: "https://apis.roblox.com/messaging-service" })
//////////////////////////////////////////////////////////////////////////////////


/**
 * Publishes a message to all servers of a universe.
 * @endpoint POST /v1/universes/{universeId}/topics/{topic}
 * @tags [ "Cloud Key" ]
 * 
 * @example
 * // Openblox (Typescript Code) - Sending Message
 * type Message = { targetId: number, reason: string };
   await MessagingApi.publishMessage<Message>({
     universeId: 5097539509, topic: "kickPlr",
     message: { targetId: 45348281, reason: "You smell kinda funny." }
   });

   /* Roblox Luau Code - Recieving The Message Above
   local MessagingService = game:GetService("MessagingService")
   local HttpService = game:GetService("HttpService")
   local Players = game:GetService("Players")

   MessagingService:SubscribeAsync("kickPlr", function(msg)
       local data = HttpService:JSONDecode(msg.Data)
        
       local plr = Players:GetPlayerByUserId(data.targetId)
       if not plr then return end
       
       plr:Kick(`You have been kicked for: "{data.reason}"`)
   end) *\/
 * @exampleData true
 * @exampleRawBody ""
 */
export const publishMessage = createApiMethod(async <Message extends string | Record<any, any>>(
  { universeId, topic, message }: { universeId: Identifier, topic: string, message: Message }
): ApiMethod<"", true> => ({
  path: `/v1/universes/${universeId}/topics/${topic}`,
  method: "POST",
  body: { message: JSON.stringify(message) },
  name: "publishMessage",

  formatRawDataFn: () => true
}))