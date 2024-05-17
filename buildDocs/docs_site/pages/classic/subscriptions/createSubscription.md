
# createSubscription
Creates a subscription for a specified universe.


## Parameters
| Name        | Type             | Description                                          |
| :---------- | :--------------- | :--------------------------------------------------- |
| universeId  | UniverseId       | The id of the universe to create a subscription for. |
| name        | Name             | The subscription name.                               |
| description | Description      | The subscription description.                        |
| type        | Type             | The subscription type.                               |
| price       | SubsriptionPrice | The subscription price.                              |



## Example
```js copy showLineNumbers
const { data } = await ClassicSubscriptionsApi.createSubscription({
  universeId: 5795192361,
  name: "Cool Subscription",
  description: "Lorem ipsum dolor sit amet.",
  type: "Durable",
  price: "$7.99",
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/experiences/{universeId}/experience-subscriptions
```
  