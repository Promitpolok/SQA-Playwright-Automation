const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

test("Q1: Invalid Login Validation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("invaliduser123@example.com", "WrongPassword123");

  // Verify error messages[cite: 1]
  await expect(loginPage.errorMessage).toContainText(
    "Login was unsuccessful. Please correct the errors and try again.",
  );
  await expect(loginPage.errorMessage).toContainText(
    "No customer account found",
  );

  // Verify user is not logged in (Top navigation link remains visible)
  await expect(loginPage.loginLink).toBeVisible();
});
