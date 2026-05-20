import { test, expect } from "../main/utils/base.fixture";
import userData from "../data/user.json";

test.describe.configure({ mode: "serial" });

test.describe("SauceDemo Inventory Test Suite", {
  annotation: { type: "category", description: "SauceDemo Inventory" },
}, () => {

  test.beforeEach(async ({ pm, page }) => {
    await page.goto(process.env.BASE_URL!);
  });

  test("Verify add Item and validate item count", async ({ pm }) => {
    await pm.loginPage.login(
      userData.sauceDemo.validUser.username,
      userData.sauceDemo.validUser.password
    );

    await pm.sauceDemoInventoryPage.addBackpackAndOpenCart();
    await pm.sauceDemoInventoryPage.verifyCartBadgeCount("1");
  });

});