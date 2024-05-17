
# setGroupDescription
Sets group description.


## Parameters
| Name           | Type           | Description                                     |
| :------------- | :------------- | :---------------------------------------------- |
| groupId        | Identifier     | The id of the group to set the description for. |
| newDescription | NewDescription | The content of the new description.             |



## Example
```js copy showLineNumbers
const { data: newDescription } = await ClassicGroupsApi.setGroupDescription({
  groupId: 5850082,
  newDescription: "Hello World!",
}); 
```

## Endpoint
```ansi
[38;5;216mPATCH[0m[2;33m[0m /v1/groups/{groupId}/description
```
  