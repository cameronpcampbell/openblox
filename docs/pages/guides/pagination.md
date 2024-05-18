# Pagination
Openblox makes it easy to iterate over multiple pages of certain endpoints.

## Which Openblox Methods Are Paginated?
If a method has an optional `cursor` parameter and returns `cursors` in its result then its probably paginated.

## Example
The following example fetches a users username history across all pages.

```ts
import "dotenv/config"
import { ClassicUsersApi } from "openblox/classic"

const USER_ID = 45348281

;(async () => {
    const allPastUsernames = []

    for await (const { data:nameHistory } of await ClassicUsersApi.usernameHistory({ userId: USER_ID, limit: 100 })) {
      allPastUsernames.push(...nameHistory)
    }

    console.log(allPastUsernames)
})()
```