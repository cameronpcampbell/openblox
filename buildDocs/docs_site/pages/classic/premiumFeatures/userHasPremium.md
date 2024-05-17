
# userHasPremium
Gets the followers count for a specific user.


## Parameters
| Name   | Type       | Description                                       |
| :----- | :--------- | :------------------------------------------------ |
| userId | Identifier | The id of the user to get the follower count for. |



## Example
```js copy showLineNumbers
const { data: hasPremium } = await ClassicPremiumFeaturesApi.userHasPremium({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/validate-membership
```
  