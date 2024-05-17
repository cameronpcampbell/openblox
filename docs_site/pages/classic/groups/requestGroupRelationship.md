
# requestGroupRelationship
Sends a group relationship request to a group.


## Parameters
| Name                  | Type                  | Description                                         |
| :-------------------- | :-------------------- | :-------------------------------------------------- |
| groupId               | Identifier            | The id of the group to send a request for.          |
| groupRelationshipType | GroupRelationshipType | The type of group relationship to request.          |
| relatedGroupId        | Identifier            | The id of the group to request a relationship with. |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.requestGroupRelationship({
  groupId: 5850082,
  groupRelationshipType: "Allies",
  relatedGroupId: 3843784,
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/groups/{groupId}/relationships/{groupRelationshipType}/{relatedGroupId}
```
  