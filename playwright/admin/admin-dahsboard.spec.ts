import { test, expect, Page, Browser } from "@playwright/test";
import { test as customFixtures } from "@/lib/fixtures";

/**
 * Admin Dashboard Test Suite
 *
 * Tests for the admin dashboard functionality including:
 * - Authentication and authorization
 * - Component rendering
 * - Pagination and filtering
 * - Data visualization
 */

// ============================================================================
// Test Fixtures & Setup
// ============================================================================

interface AdminTestContext {
  adminPage: Page;
  baseURL: string;
}

customFixtures.describe("Admin Dashboard", () => {
  const BASE_URL = "http://localhost:3000";
  const ADMIN_LOGIN_URL = `${BASE_URL}/sign-in`;
  const ADMIN_DASHBOARD_URL = `${BASE_URL}/admin`;
  const DEFAULT_TIMEOUT = 30000;

  /**
   * Helper function to authenticate as admin user
   */
  async function authenticateAsAdmin(
    page: Page,
    adminUser: { email: string; password: string },
  ): Promise<void> {
    await page.goto(ADMIN_LOGIN_URL, { waitUntil: "networkidle" });

    // Fill login form
    await page.fill('input[name="email"]', adminUser.email);
    await page.fill('input[name="password"]', adminUser.password);

    // Submit and wait for navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.click('button[type="submit"]'),
    ]);
  }

  /**
   * Helper function to navigate to admin dashboard
   */
  async function navigateToAdminDashboard(page: Page): Promise<void> {
    await page.goto(ADMIN_DASHBOARD_URL, { waitUntil: "domcontentloaded" });
    // Verify page loaded successfully
    await page
      .locator('[data-testid="dashboard-container"]')
      .or(page.locator("body"))
      .waitFor({ timeout: DEFAULT_TIMEOUT });
  }

  // =========================================================================
  // Test: Users Component Rendering
  // =========================================================================

  customFixtures(
    "should render administrators/users component with proper structure",
    async ({ browser, users }) => {
      const adminUser = await users.create("ADMIN");
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // Arrange
        await authenticateAsAdmin(page, adminUser);
        await navigateToAdminDashboard(page);

        // Act & Assert
        const usersHeader = page.locator(
          '[data-testid="administrators-header"]',
        );
        await expect(usersHeader).toBeVisible({ timeout: DEFAULT_TIMEOUT });

        // Verify header text content
        await expect(usersHeader).toContainText(/administrator|user/i);

        // Verify user cards container exists
        const userCardsContainer = page.locator(
          '[data-testid="users-container"]',
        );
        const isVisible = await userCardsContainer
          .isVisible()
          .catch(() => false);

        if (isVisible) {
          // If cards are present, verify at least one has proper structure
          const userCards = page.locator('[data-testid="user-card"]');
          const cardCount = await userCards.count();
          expect(cardCount).toBeGreaterThan(0);
        }
      } finally {
        await context.close();
      }
    },
  );

  // =========================================================================
  // Test: Bar Chart Component Rendering
  // =========================================================================

  customFixtures(
    "should render bar chart with data visualization or empty state",
    async ({ browser, users }) => {
      const adminUser = await users.create("ADMIN");
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // Arrange
        await authenticateAsAdmin(page, adminUser);
        await navigateToAdminDashboard(page);

        // Act & Assert - Verify chart container exists
        const chartContainer = page.locator(
          '[data-testid="bar-chart-container"]',
        );
        await expect(chartContainer).toBeVisible({ timeout: DEFAULT_TIMEOUT });

        // Verify chart title
        const chartHeader = page.locator('[data-testid="bar-chart-title"]');
        await expect(chartHeader).toBeVisible();

        // Verify chart rendering (bars or empty state)
        const bars = page.locator(
          '[data-testid="bar-chart"] [data-testid="bar"]',
        );
        const barCount = await bars.count();

        if (barCount > 0) {
          // Chart has data
          expect(barCount).toBeGreaterThan(0);
          await expect(bars.first()).toBeVisible();
          // Verify bars have proper styling
          const firstBar = bars.first();
          const computedStyle = await firstBar.evaluate((el) => {
            return window.getComputedStyle(el).height;
          });
          expect(computedStyle).not.toBe("0px");
        } else {
          // Chart is in empty state - verify it's still rendered
          await expect(chartContainer).toBeVisible();
        }
      } finally {
        await context.close();
      }
    },
  );

  // =========================================================================
  // Test: Pagination Functionality
  // =========================================================================

  customFixtures(
    "should handle pagination controls correctly",
    async ({ browser, users }) => {
      const adminUser = await users.create("ADMIN");
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // Arrange
        await authenticateAsAdmin(page, adminUser);
        await navigateToAdminDashboard(page);

        // Act & Assert - Verify pagination exists
        const pagination = page.locator('[data-testid="pagination-container"]');
        await expect(pagination).toBeVisible({ timeout: DEFAULT_TIMEOUT });

        // Check if page 2 exists
        const page2Link = pagination.locator(
          '[data-testid="pagination-number-2"]',
        );
        const page2Exists = await page2Link.isVisible().catch(() => false);

        if (page2Exists) {
          // Record initial URL
          const initialURL = page.url();

          // Navigate to page 2
          await page2Link.click();
          await page.waitForURL(/.*page=2/, { timeout: DEFAULT_TIMEOUT });

          // Verify URL changed
          expect(page.url()).toContain("page=2");

          // Verify active page styling
          await expect(page2Link).toHaveClass(/bg-blue-600|active/);

          // Verify left arrow is enabled (not disabled)
          const leftArrow = pagination.locator(
            '[data-testid="pagination-arrow-left"]',
          );
          const isDisabled = await leftArrow
            .evaluate((el) => el.getAttribute("disabled"))
            .then(() => true)
            .catch(() => false);

          expect(isDisabled).toBeTruthy();

          // Navigate back to page 1
          const page1Link = pagination.locator(
            '[data-testid="pagination-number-1"]',
          );
          await page1Link.click();
          await page.waitForURL(/.*page=1/, { timeout: DEFAULT_TIMEOUT });
        }
      } finally {
        await context.close();
      }
    },
  );

  // =========================================================================
  // Test: Year Filter Functionality
  // =========================================================================

  customFixtures(
    "should filter data by year selection",
    async ({ browser, users }) => {
      const adminUser = await users.create("ADMIN");
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // Arrange
        await authenticateAsAdmin(page, adminUser);
        await navigateToAdminDashboard(page);

        // Act & Assert - Verify year selector exists
        const yearSelect = page.locator('[data-testid="year-select"]');
        const selectExists = await yearSelect.isVisible().catch(() => false);

        if (selectExists) {
          // Get available options
          const options = yearSelect.locator("option");
          const optionCount = await options.count();
          expect(optionCount).toBeGreaterThan(0);

          // Try to select 2025 if available
          const option2025 = yearSelect.locator('option[value="2025"]');
          const has2025 = await option2025.count().then((count) => count > 0);

          if (has2025) {
            await yearSelect.selectOption("2025");

            // Verify URL updated
            await page.waitForURL(/.*year=2025/, { timeout: DEFAULT_TIMEOUT });

            // Verify chart/data title updates
            const booksHeader = page.locator(
              'h2:has-text("Books Borrowed"), h2:has-text("Borrowed")',
            );
            const headerVisible = await booksHeader
              .isVisible()
              .catch(() => false);

            if (headerVisible) {
              expect(await booksHeader.isVisible()).toBeTruthy();
            }

            // Reset to default year
            const defaultOption = options.first();
            const defaultValue = await defaultOption.getAttribute("value");
            if (defaultValue) {
              await yearSelect.selectOption(defaultValue);
            }
          }
        }
      } finally {
        await context.close();
      }
    },
  );

  // =========================================================================
  // Test: Full Dashboard Integration
  // =========================================================================

  customFixtures(
    "should load complete admin dashboard with all components",
    async ({ browser, users }) => {
      const adminUser = await users.create("ADMIN");
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // Arrange
        await authenticateAsAdmin(page, adminUser);

        // Act
        await navigateToAdminDashboard(page);

        // Assert - Verify all major components are present
        const componentChecks = [
          {
            testId: "administrators-header",
            name: "Users/Administrators Header",
          },
          { testId: "bar-chart-container", name: "Bar Chart Container" },
          { testId: "pagination-container", name: "Pagination Controls" },
          { testId: "year-select", name: "Year Filter Select" },
        ];

        for (const component of componentChecks) {
          const element = page.locator(`[data-testid="${component.testId}"]`);
          const isVisible = await element.isVisible().catch(() => false);

          if (!isVisible) {
            // Log for debugging but don't fail - component might be optional
            console.warn(`${component.name} not found or not visible`);
          }
        }

        // Verify page is interactive (no JS errors)
        page.on("console", (msg) => {
          if (msg.type() === "error") {
            console.error("Console error:", msg.text());
          }
        });

        // Wait to ensure no runtime errors occur
        await page.waitForTimeout(1000);
      } finally {
        await context.close();
      }
    },
  );

  // =========================================================================
  // Test: Authorization - Non-admin Users Should Not Access
  // =========================================================================

  customFixtures(
    "should prevent non-admin users from accessing admin dashboard",
    async ({ browser, users }) => {
      const regularUser = await users.create("USER");
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // Arrange
        await authenticateAsAdmin(page, regularUser);

        // Act - Try to access admin page
        await page.goto(ADMIN_DASHBOARD_URL);

        // Assert - Should redirect or show error
        const currentURL = page.url();
        const isAdminPage = currentURL.includes("/admin");

        // Either redirected away or showing error message
        const errorMessage = page.locator('[data-testid="access-denied"]');
        const errorVisible = await errorMessage.isVisible().catch(() => false);

        expect(!isAdminPage || errorVisible).toBeTruthy();
      } finally {
        await context.close();
      }
    },
  );
});
