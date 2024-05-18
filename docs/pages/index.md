# Openblox

Openblox allows your typescript (and javascript) codebase to communicate with the Roblox API extemely easily.

It wraps over 100+ Roblox API endpoints, each with its own strictly typed response data. Typings were written manually as opposed to programatically generating them to ensure the strictest possible type-safety.

- Automatically handles csrf tokens.

- Prettifies / formats responses from the Roblox API to be developer friendly as possible, and to maintain a consistant (see Prettification).
- All results from Openblox methods return the underlying http response with it.

- Easily iterate over paginated endpoints (see Pagination).

- Each Openblox method utilises only one Roblox API endpoint to ensure clarity and efficiency in your codebase.

- Scarcely utilise classes to allow for treeshaking.