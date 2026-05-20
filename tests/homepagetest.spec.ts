// import { test, expect } from "main/utils/base.fixture";

// const formData = {
//   name: "ronel",
//   emailAddress: "jamestester@gmail.com.com",
//   contactNumber: "09876543211",
//   companyName: "stratpoint technologies",
//   jobTitle: "QA",
//   service: "Quality Assurance",
//   message: "this is a ultra long message",
// };

// test.describe.configure({ mode: 'serial' });
// test.describe("Home Page test suite", {
//   annotation: { type: 'category', description: 'report' },
// }, () => {

//   test.beforeEach(async ({ pm,page }) => {
//     // await pm.navbar.navigate();
//     await page.goto('https://stratpoint.com/');
//     await pm.navbar.navbar_link("home");
//     await pm.privacyCookie.handleCookieModal();
//   });

//   test("Verify section headers @regression", async ({ pm }) => {
//     await pm.home.verify_header();
//     await pm.home.privacy_policy_page();
//     await pm.home.fill_lets_connect_form(formData);
//   });
// });
