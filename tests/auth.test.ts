import * as OpenBlox from "../src/index";

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
  });

  test.todo("open cloud auth");
});
