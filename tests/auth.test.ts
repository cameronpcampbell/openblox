import * as OpenBlox from "../src/index";

// Set a ROBLOX_COOKIE environment variable to test authenticated requests.
// Replace parameters with valid objects that your account has access to.

describe('OpenBlox Cookie Auth', () => {
  it('should use .env as default', async () => {
    const result = await OpenBlox.ClassicAPI.ClassicUsersApi.authenticatedUserInfo();
    expect(result.response.success).toBe(true);
  });

  it('should use context binded cookie', async () => {
    const cookie = process.env.ROBLOX_COOKIE;
    process.env.ROBLOX_COOKIE = undefined;
    
    const result = await OpenBlox.ClassicAPI.ClassicUsersApi.authenticatedUserInfo.bind({ cookie })();
    expect(result.response.success).toBe(true);
    
    // Restores original state for other tests.
    process.env.ROBLOX_COOKIE = cookie;
  });
  
  it('should use a csrf validated request', async () => {
    const result = await OpenBlox.ClassicAPI.ClassicGroupsApi.updateGroupMemberRole({ groupId: 101010, roleId: 101010, userId: 101010 });
    expect(result.response.success).toBe(true);
  });
  
  it('should use a csrf validated request using context binded cookie', async () => {
    const cookie = process.env.ROBLOX_COOKIE;
    process.env.ROBLOX_COOKIE = undefined;

    const result = await OpenBlox.ClassicAPI.ClassicGroupsApi.updateGroupMemberRole.bind({ cookie })({ groupId: 101010, roleId: 101010, userId: 101010 });
    expect(result.response.success).toBe(true);

    // Restores original state for other tests.
    process.env.ROBLOX_COOKIE = cookie;
  });

  test.todo("open cloud auth");
});
