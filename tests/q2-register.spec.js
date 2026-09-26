const { test, expect } = require("@playwright/test");
const RegisterPage = require("../pages/RegisterPage");
const ProductPage = require("../pages/ProductPage");

test("Q2: Register New Customer and Add Product to Cart", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const productPage = new ProductPage(page);

  // Generate unique email to prevent duplicate account registration errors
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  // Step 1: Register New Customer
  await registerPage.navigate();
  await registerPage.registerUser({
    gender: "female",
    firstName: "Test",
    lastName: "User",
    email: uniqueEmail,
    password: "Password123!",
  });

  // Verify registration successful
  await expect(registerPage.resultMessage).toContainText("Your registration completed");
  await registerPage.continueButton.click();

  // Verify user is logged in (Account link displays registered email)
  await expect(registerPage.accountLink).toHaveText(uniqueEmail);

  // Step 2: Navigate to Category & Select Product
  await productPage.navigateToApparelCategory();
  
  // Store the name of the product before navigating
  const expectedProductName = await productPage.productItemLink.innerText();
  await productPage.selectFirstProduct();

  // Verify product details page opened
  await expect(productPage.productTitleHeading).toHaveText(expectedProductName);

  // Step 3: Add Product to Shopping Cart
  await productPage.addCurrentProductToCart();

  // Verify success banner notification
  await expect(productPage.notificationSuccess).toContainText(
    "The product has been added to your shopping cart"
  );

  // Step 4: Verify Product and Quantity in Shopping Cart
  await productPage.goToCart();

  await expect(productPage.cartItemRow).toBeVisible();
  await expect(productPage.cartProductName).toContainText(expectedProductName);
  
  // Verify default quantity is 1
  const quantityValue = await productPage.cartProductQty.getAttribute("value");
  expect(quantityValue).toBe("1");
});