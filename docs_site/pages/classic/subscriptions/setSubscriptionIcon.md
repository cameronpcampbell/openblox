
# setSubscriptionIcon
Sets the icon of a subscription.


## Parameters
| Name       | Type       | Description                                          |
| :--------- | :--------- | :--------------------------------------------------- |
| universeId | Identifier | The id of the universe to create a subscription for. |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicSubscriptionsApi.setSubscriptionIcon({
  universeId: 5795192361,
  subscriptionId: "3656348821302804581",
  actingUserId: 45348281,
  icon: "./src/image.png",
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/experiences/{universeId}/experience-subscriptions/{subscriptionId}/upload-image
```
  