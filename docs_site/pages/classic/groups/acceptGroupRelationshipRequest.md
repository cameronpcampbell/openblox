
# acceptGroupRelationshipRequest
Accepts a group relationship request.


## Parameters
| Name                  | Type                  | Description                                        |
| :-------------------- | :-------------------- | :------------------------------------------------- |
| groupId               | Identifier            | The id of the group to accept for.                 |
| groupRelationshipType | GroupRelationshipType | The type of group relationship to accept.          |
| relatedGroupId        | Identifier            | The id of the group to accept a relationship with. |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.acceptGroupRelationshipRequest({
  groupId: 5850082,
  groupRelationshipType: "Allies",
  relatedGroupId: 3843784,
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests/{relatedGroupId}
```
  