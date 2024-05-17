
# groupsPolicyInfo
Gets group policy info used for compliance.


## Parameters
| Name     | Type                   | Description                               |
| :------- | :--------------------- | :---------------------------------------- |
| groupIds | ArrayNonEmpty<GroupId> | the ids of groups to get policy info for. |



## Example
```js copy showLineNumbers
const { data: policyInfo } = await ClassicGroupsApi.groupsPolicyInfo({ groupIds: [5850082] }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/policies
```
  