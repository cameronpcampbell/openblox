
# groupRelationships
Gets a group's relationships.


## Parameters
| Name                  | Type                  | Description                                                            |
| :-------------------- | :-------------------- | :--------------------------------------------------------------------- |
| groupId               | Identifier            | The id of the group.                                                   |
| groupRelationshipType | GroupRelationshipType | The group relationship type, "Enemies" or "Allies".                    |
| maxRows               | ?                     | The maximum number of rows for the page request, should be at least 1. |
| startRowIndex         | ?                     | The start index of the page request.                                   |



## Example
```js copy showLineNumbers
const { data: relationships } = await ClassicGroupsApi.groupRelationships({
  groupId: 5850082,
  groupRelationshipType: "Allies",
  maxRows: 1,
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/{groupId}/relationships/{groupRelationshipType}
```
  