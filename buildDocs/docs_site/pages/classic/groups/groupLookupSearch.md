
# groupLookupSearch
Search for groups by keyword.


## Parameters
| Name      | Type   | Description                      |
| :-------- | :----- | :------------------------------- |
| groupName | string | The name of the group to lookup. |



## Example
```js copy showLineNumbers
const { data: results } = await ClassicGroupsApi.groupLookupSearch({ groupName: "MightyPart Games" }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/search/lookup
```
  