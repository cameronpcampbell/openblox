
# batchAcceptGroupJoinRequests
Batch accepts join requests.


## Parameters
| Name    | Type                      | Description                                             |
| :------ | :------------------------ | :------------------------------------------------------ |
| groupId | Identifier                | The id of the group to batch accepts join requests for. |
| userIds | ArrayNonEmpty<Identifier> | The ids of the user to accept.                          |



## Example
```js copy showLineNumbers
const { data: success } = await ClassicGroupsApi.batchAcceptGroupJoinRequests({
  groupId: 5850082,
  userIds: [2655994471],
}); 
```

## Endpoint
```ansi
[38;5;117mPOST[0m[2;33m[0m /v1/groups/{groupId}/join-requests
```
  