
# publishMessage
Publishes a message to all servers of a universe.



## Example
```js copy showLineNumbers
// Openblox (Typescript Code) - Sending Message
type Message = { targetId: number; reason: string };
await MessagingApi.publishMessage<Message>({
  universeId: 5097539509,
  topic: "kickPlr",
  message: { targetId: 45348281, reason: "You smell kinda funny." },
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
end) */ 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/universes/{universeId}/topics/{topic}
```
  