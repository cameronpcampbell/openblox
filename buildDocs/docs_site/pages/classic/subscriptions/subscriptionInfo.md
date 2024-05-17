
# subscriptionInfo
Gets information about a subscription for a specified universe.


## Parameters
| Name           | Type           | Description                        |
| :------------- | :------------- | :--------------------------------- |
| universeId     | UniverseId     | The id of the universe.            |
| subscriptionId | SubscriptionId | The id of the subscription to get. |



## Example
```js copy showLineNumbers
const { data: subscription } = await ClassicSubscriptionsApi.subscriptionInfo({
  universeId: 5795192361,
  subscriptionId: "3656348821302804581",
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId}
```
  