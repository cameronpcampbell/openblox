
# groupSearch
Search for groups by keyword.


## Parameters
| Name                 | Type   | Description                                                   |
| :------------------- | :----- | :------------------------------------------------------------ |
| keyword              | string | The keyword or phrase to use as the search parameter.         |
| prioritizeExactMatch | ?      | Whether or not to prioritize the exact match for the keyword. |
| limit                | ?      | The number of results to be returned.                         |
| cursor               | ?      | The paging cursor for the previous or next page.              |



## Example
```js copy showLineNumbers
const { data: results } = await ClassicGroupsApi.groupSearch({
  keyword: "MightyPart Games",
  prioritizeExactMatch: true,
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/groups/search
```
  