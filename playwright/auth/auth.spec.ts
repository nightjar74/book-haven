import { expect } from "@playwright/test";
import { test } from "@/lib/fixtures";

test.describe("Auth & Role Validation", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("Should handle duplicates and enforce RBAC", async ({
    page,
    users,
    browser,
  }) => {
    const adminUser = await users.create("ADMIN");
    const regularUser = await users.create("USER");

    // TEST 1: Duplicate User Logic
    await page.goto("http://localhost:3000/sign-up");
    await page.fill('input[name="email"]', regularUser.email);
    await page.fill('input[name="password"]', "NewPass123!");
    await page.fill('input[name="fullName"]', "Duplicate User");
    await page.click('button[type="submit"]');
    await page.waitForSelector('text="User already exists"', {
      timeout: 50000,
    });

    // TEST 2: Regular User Access
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();

    await userPage.goto("http://localhost:3000/sign-in");
    await userPage.fill('input[name="email"]', regularUser.email);
    await userPage.fill('input[name="password"]', regularUser.password);
    await userPage.click('button[type="submit"]');
    await userPage.waitForURL("http://localhost:3000");

    await userPage.goto("http://localhost:3000/admin");
    await expect(userPage).not.toHaveURL("/admin");
    await userPage.close();

    // TEST 3: Admin User Access
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    await adminPage.goto("http://localhost:3000/sign-in");
    await adminPage.fill('input[name="email"]', adminUser.email);
    await adminPage.fill('input[name="password"]', adminUser.password);
    await adminPage.click('button[type="submit"]');
    await adminPage.waitForURL("http://localhost:3000");

    await adminPage.goto("http://localhost:3000/admin");
    const adminHeader = adminPage.getByTestId("admin-header-name");
    await expect(adminHeader).toBeVisible();
    await expect(adminHeader).toContainText(adminUser.name);
    await adminPage.close();
  });
});
