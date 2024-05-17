
# userSearch
Searched for users.


## Parameters
| Name    | Type   | Description                                      |
| :------ | :----- | :----------------------------------------------- |
| keyword | string | The keyword to search users by.                  |
| limit   | ?      | The number of results to be returned             |
| cursor  | ?      | The paging cursor for the previous or next page. |



## Example
```js copy showLineNumbers
const { data: searchResults } = await ClassicUsersApi.userSearch({ keyword: "MightyPart", limit: 10 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/search
```
  