
# groupRolesFromIds
Gets a list of roles from role ids.


## Parameters
| Name    | Type  | Description              |
| :------ | :---- | :----------------------- |
| roleIds |       | The ids of roles to get. |



## Example
```js copy showLineNumbers
const { data: roles } = await ClassicGroupsApi.groupRolesFromIds([38353811]); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/roles
```
  