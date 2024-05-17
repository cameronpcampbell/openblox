
# jobSearch
Searches talent hub job posts.


## Parameters
| Name   | Type  | Description                                                   |
| :----- | :---- | :------------------------------------------------------------ |
| query  | ?     | The query to search for.                                      |
| limit  | ?     | The maxium amount of items to return.                         |
| filter | ?     | Filter the returned job posts to match specific requirements. |
| cursor | ?     | The paging cursor for the previous or next page.              |



## Example
```js copy showLineNumbers
const { data: jobSearchData } = await ClassicTalentApi.jobSearch({ query: "simulator", limit: 1, cursor: 1 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/search/jobs
```
  