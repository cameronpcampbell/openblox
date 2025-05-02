# Openblox

Openblox allows your typescript (and javascript) codebase to communicate with the Roblox API extemely easily.

It wraps over 100+ Roblox API endpoints, each with its own strictly typed response data. Typings were written manually as opposed to programatically generating them to ensure the strictest possible type-safety.

- Automatically handles csrf tokens.

- Prettifies / formats responses from the Roblox API to be developer friendly as possible, and to maintain a consistant (see Prettification).
- All results from Openblox methods return the underlying http response with it.

- Easily iterate over paginated endpoints (see Pagination).

- Each Openblox method utilises only one Roblox API endpoint to ensure clarity and efficiency in your codebase.

- Scarcely utilise classes to allow for treeshaking.


<h3>Example Usage</h3>

```ts showLineNumbers copy
import "dotenv/config";
import { createOpenbloxConfig, setDefaultOpenbloxConfig } from "openblox/config";
import { UsersApi } from "openblox/cloud";
import { ClassicUsersApi } from "openblox/classic"; // Classic (BEDEV & BEDEV2) APIs will always be prefixed with `Classic`.


/*
Naming your Roblox Cookie environment variable `ROBLOX_COOKIE` will automatically
import it into your Openblox config, therefore voiding the need to set it in the config
manually. Similarly, naming your OpenCloud API Key environment variable `ROBLOX_CLOUD_KEY`
will also automatically import it into your Openblox config.
*/
setDefaultOpenbloxConfig(
    createOpenbloxConfig({
        cookie: process.env.ROBLOX_COOKIE as any,
        cloudKey: process.env.CLOUD_KEY as any
    })
)

(async () => {

  const { data:userInfo_classic } = await ClassicUsersApi.userInfo({ userId: 45348281 })

  const { data:userInfo_cloud } = await UsersApi.userInfo({ userId: 45348281 })

})
```
