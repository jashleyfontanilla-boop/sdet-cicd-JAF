import { test, expect } from "../main/utils/base.fixture";
import userData from "../data/user.json";

test.describe.configure({ mode: "serial" });

test.describe("SauceDemo Login Test Suite", {
  annotation: { type: "category", description: "SauceDemo Login" },
}, () => {

  test.beforeEach(async ({ pm, page }) => {
    await page.goto(process.env.BASE_URL!);
  });

  test("Verify user can login using valid credentials @regression", async ({ pm }) => {
    await pm.loginPage.login(
      userData.sauceDemo.validUser.username,
      userData.sauceDemo.validUser.password
      
    );

    await pm.loginPage.verifySuccessfulLogin();
  });

  test("Verify error message for invalid credentials @regression", async ({ pm }) => {
    await pm.loginPage.login(
      userData.sauceDemo.invalidUser.username,
      userData.sauceDemo.invalidUser.password
    );

    await pm.loginPage.verifyLoginError();
  });

  test("Verify locked out user cannot login @regression", async ({ pm }) => {
    await pm.loginPage.login(
      userData.sauceDemo.lockedOutUser.username,
      userData.sauceDemo.lockedOutUser.password
    );

    await pm.loginPage.verifyLockedOutAccount();
  });
});