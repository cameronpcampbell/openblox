
# authenticatedUserSubscriptionsPermissionsForUniverse
Gets permissions the authenticated user can perform of a specified universes subscriptions.


## Parameters
| Name       | Type       | Description                                                 |
| :--------- | :--------- | :---------------------------------------------------------- |
| universeId | Identifier | The id of the universe to get subscription permissions for. |



## Example
```js copy showLineNumbers
const { data: perms } = await ClassicSubscriptionsApi.authenticatedUserSubscriptionsPermissionsForUniverse({
  universeId: 5795192361,
}); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/experiences/{universeId}/experience-subscriptions/permission
```
  