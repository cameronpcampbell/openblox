
# inventoryItemsForUser


## Parameters
| Name   | Type       | Description                                                  |
| :----- | :--------- | :----------------------------------------------------------- |
| userId | Identifier | The id of the user to get the inventory items for.           |
| limit  | ?          | The maximum amount of items to return.                       |
| filter | ?          | Filters the returned inventory items by specified criterias. |
| cursor | ?          | A paging cursor for a specified page.                        |



## Example
```js copy showLineNumbers
const { data: inventoryItems } = await InventoryApi.inventoryItemsForUser({
  userId: 45348281,
  limit: 3,
  filter: { privateServers: true },
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v2/users/{userId}/inventory-items
```
  