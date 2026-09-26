const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

test("Q1: Invalid Login Validation", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // =========================
  // 1. Navigate to the login page
  // =========================
  await loginPage.navigate();

  // =========================
  // 2. Attempt login using invalid credentials
  // =========================
  await loginPage.login(
    "invaliduser123@example.com",
    "WrongPassword123"
  );

  // =========================
  // 3. Verify the login error message
  // =========================
  await expect(loginPage.errorMessage).toContainText(
    "Login was unsuccessful. Please correct the errors and try again."
  );

  await expect(loginPage.errorMessage).toContainText(
    "No customer account found"
  );

  // =========================
  // 4. Verify the user remains unauthenticated
  // =========================
  // The Login link should still be visible because the invalid
  // credentials must not create an authenticated session.
  await expect(loginPage.loginLink).toBeVisible();

  // =========================
  // 5. Verify the user remains on the login page
  // =========================
  // A failed login should not redirect the user to an authenticated
  // account or other protected page.
  await expect(page).toHaveURL(/login/i);
});