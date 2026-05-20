import { Page, TestInfo } from "@playwright/test";
import { homePage } from "../functions/homePageMethods";
import { navbarPage } from "../functions/navigationMethods";
import { privacyPolicyCookie } from "../functions/modals/privacyPolicyCookie";
import { ScreenshotHelper } from "./screenshot";
import { loginPage } from "main/functions/loginPageMethod";

/**
 * Central lazy-load Page Object provider.
 *
 * Page objects are instantiated only on first access and cached for the
 * lifetime of the manager instance.  A **single** `ScreenshotHelper` is
 * shared across every page object so the step counter stays consistent.
 */
export class PageManager {
  private readonly page: Page;
  private readonly testInfo: TestInfo;

  /** Shared screenshot helper – one step counter for the whole test. */
  readonly screenshot: ScreenshotHelper;

  private _homePage?: homePage;
  private _navbarPage?: navbarPage;
  private _privacyPolicyCookie?: privacyPolicyCookie;
  private _loginPage?: loginPage;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.screenshot = new ScreenshotHelper(testInfo);
  }

  get thisPage(): Page {
    return this.page;
  }

  /** Home page – lazy-loaded on first access */
  get home(): homePage {
    if (!this._homePage) {
      this._homePage = new homePage(this.page, this.testInfo, this.screenshot);
    }
    return this._homePage;
  }

  /** Navigation bar – lazy-loaded on first access */
  get navbar(): navbarPage {
    if (!this._navbarPage) {
      this._navbarPage = new navbarPage(this.page);
    }
    return this._navbarPage;
  }

  /** Privacy-policy / cookie modal – lazy-loaded on first access */
  get privacyCookie(): privacyPolicyCookie {
    if (!this._privacyPolicyCookie) {
      this._privacyPolicyCookie = new privacyPolicyCookie(this.page);
    }
    return this._privacyPolicyCookie;
  }

  /** Sauce Demo Login Page – lazy-loaded on first access */
get loginPage(): loginPage {
  if (!this._loginPage) {
    this._loginPage = new loginPage(
      this.page,
      this.testInfo,
      this.screenshot
    );
  }
  return this._loginPage;
  }
}
