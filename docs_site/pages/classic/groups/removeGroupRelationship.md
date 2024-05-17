
# removeGroupRelationship
Removes an already existing group relationship


## Parameters
| Name                  | Type                  | Description                                          |
| :-------------------- | :-------------------- | :--------------------------------------------------- |
| groupId               | Identifier            | The id of the group to remove the relationship from. |
| groupRelationshipType | GroupRelationshipType | The type of group relationship to remove.            |
| relatedGroupId        | Identifier            | The id of the group to remove.                       |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.removeGroupRelationship({
  groupId: 5850082,
  groupRelationshipType: "Allies",
  relatedGroupId: 3843784,
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/groups/{groupId}/relationships/{groupRelationshipType}/{relatedGroupId}
```
  