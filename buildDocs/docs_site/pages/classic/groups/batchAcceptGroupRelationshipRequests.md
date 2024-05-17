
# batchAcceptGroupRelationshipRequests
Batch accepts relationship requests.


## Parameters
| Name                  | Type                  | Description                                                    |
| :-------------------- | :-------------------- | :------------------------------------------------------------- |
| groupId               | Identifier            | The id of the group to batch accept relationship requests for. |
| groupRelationshipType | GroupRelationshipType | The type of group relationship to batch accept for.            |
| groupIds              | Identifier[]          | The ids of the groups to accept.                               |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.batchAcceptGroupRelationshipRequests({
  groupId: 5850082,
  groupRelationshipType: "Allies",
  groupIds: [15842838],
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests
```
  