
# groupPayoutsInfo
Gets a list of the group payout percentages.


## Parameters
| Name    | Type       | Description          |
| :------ | :--------- | :------------------- |
| groupId | Identifier | The id of the group. |



## Example
```js copy showLineNumbers
const { data: payouts } = await ClassicGroupsApi.groupPayoutsInfo({ groupId: 5850082 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/payouts
```
  