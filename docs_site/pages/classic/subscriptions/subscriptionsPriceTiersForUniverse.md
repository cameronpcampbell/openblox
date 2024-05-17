
# subscriptionsPriceTiersForUniverse
Gets all of the availible price tiers that a universe's subscriptions can have.


## Parameters
| Name       | Type       | Description             |
| :--------- | :--------- | :---------------------- |
| universeId | Identifier | The id of the universe. |



## Example
```js copy showLineNumbers
const { data: tiers } = await ClassicSubscriptionsApi.subscriptionsPriceTiersForUniverse({ universeId: 5795192361 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/experiences/{universeId}/experience-subscriptions/prices
```
  