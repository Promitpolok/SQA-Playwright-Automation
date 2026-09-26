const { test, expect } = require("@playwright/test");
const RegisterPage = require("../pages/RegisterPage");
const ProductPage = require("../pages/ProductPage");

test("Q2: Register New Customer and Add Product to Cart", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const productPage = new ProductPage(page);

  // Generate a unique email address for every test run.
  // This prevents the registration test from failing because
  // the email address was already registered in a previous run.
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  // =========================================================
  // 1. Register a New Customer
  // =========================================================
  await registerPage.navigate();

  await registerPage.registerUser({
    gender: "female",
    firstName: "Test",
    lastName: "User",
    email: uniqueEmail,
    password: "Password123!",
  });

  // Verify that the registration completed successfully.
  await expect(registerPage.resultMessage).toContainText(
    "Your registration completed"
  );

  // Continue from the registration result page.
  await expect(registerPage.continueButton).toBeVisible();
  await registerPage.continueButton.click();

  // Verify that the newly registered customer is logged in.
  // The account link should display the unique email used during registration.
  await expect(registerPage.accountLink).toHaveText(uniqueEmail);

  // =========================================================
  // 2. Navigate to Apparel Category and Select a Product
  // =========================================================
  await productPage.navigateToApparelCategory();

  // Capture the product name before opening the product details page.
  // This allows us to verify that the correct product was selected.
  const expectedProductName = await productPage.productItemLink.innerText();

  await productPage.selectFirstProduct();

  // Verify that the product details page displays the selected product.
  await expect(productPage.productTitleHeading).toHaveText(
    expectedProductName
  );

  // =========================================================
  // 3. Add the Product to the Shopping Cart
  // =========================================================
  await productPage.addCurrentProductToCart();

  // Verify that the application displays the successful
  // "added to shopping cart" notification.
  await expect(productPage.notificationSuccess).toContainText(
    "The product has been added to your shopping cart"
  );

  // =========================================================
  // 4. Verify Product and Quantity in Shopping Cart
  // =========================================================
  await productPage.goToCart();

  // Verify that the cart contains an item.
  await expect(productPage.cartItemRow).toBeVisible();

  // Verify that the product added to the cart is the same
  // product that was selected from the Apparel category.
  await expect(productPage.cartProductName).toContainText(
    expectedProductName
  );

  // Verify that the default product quantity is exactly 1.
  const quantityValue = await productPage.cartProductQty.getAttribute("value");
  expect(quantityValue).toBe("1");
});