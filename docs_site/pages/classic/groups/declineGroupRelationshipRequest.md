
# declineGroupRelationshipRequest
Declines a group relationship request.


## Parameters
| Name                  | Type                  | Description                                         |
| :-------------------- | :-------------------- | :-------------------------------------------------- |
| groupId               | Identifier            | The id of the group to decline for.                 |
| groupRelationshipType | GroupRelationshipType | The type of group relationship to decline.          |
| relatedGroupId        | Identifier            | The id of the group to decline a relationship with. |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.declineGroupRelationshipRequest({
  groupId: 5850082,
  groupRelationshipType: "Allies",
  relatedGroupId: 3843784,
}); 
```

## Endpoint
```ansi
[38;5;9mDELETE[0m[2;33m[0m /v1/groups/{groupId}/relationships/{groupRelationshipType}/requests/{relatedGroupId}
```
  