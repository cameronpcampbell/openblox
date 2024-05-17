
# batchDeclineGroupRelationshipRequests
Batch declines relationship requests.


## Parameters
| Name                  | Type                  | Description                                                     |
| :-------------------- | :-------------------- | :-------------------------------------------------------------- |
| groupId               | Identifier            | The id of the group to batch decline relationship requests for. |
| groupRelationshipType | GroupRelationshipType | The type of group relationship to batch decline for.            |
| groupIds              | Identifier[]          | The ids of the groups to decline.                               |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.batchDeclineGroupRelationshipRequests({
  groupId: 5850082,
  groupRelationshipType: "Allies",
  groupIds: [15842838],
}); 
```

## Endpoint
```ansi
[38;5;9mDELETE[0m[2;33m[0m /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests
```
  