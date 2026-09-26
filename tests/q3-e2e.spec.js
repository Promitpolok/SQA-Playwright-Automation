const { test, expect } = require("@playwright/test");

const ProductSearchPage = require("../pages/ProductSearchPage");
const ProductPage = require("../pages/ProductPage");
const CheckoutPage = require("../pages/CheckoutPage");

test("Q3: Product Search to Order Confirmation E2E", async ({ page }) => {
  const searchPage = new ProductSearchPage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  // =========================
  // 1. Search Product
  // =========================

  await searchPage.navigate();

  const productName = "14.1-inch Laptop";

  await searchPage.searchProduct(productName);

  await expect(searchPage.searchResultProduct).toContainText(
    productName
  );

  // =========================
  // 2. Open Product
  // =========================

  await searchPage.openProduct(productName);

  await expect(productPage.productTitleHeading).toHaveText(
    productName
  );

  // =========================
  // 3. Increase Quantity
  // =========================

  await productPage.increaseQuantity(2);

  await expect(productPage.quantityInput).toHaveValue("2");

  // =========================
  // 4. Add to Cart
  // =========================

  await productPage.addCurrentProductToCart();

  await expect(productPage.notificationSuccess).toContainText(
    "The product has been added to your shopping cart"
  );

  // =========================
  // 5. Open Shopping Cart
  // =========================

  await productPage.goToCart();

  await expect(productPage.cartItemRow).toBeVisible();

  await expect(productPage.cartProductName).toContainText(
    productName
  );

  await expect(productPage.cartProductQty).toHaveValue("2");

  // =========================
  // 6. Agree to Terms
  // =========================

  await productPage.agreeToTerms();

  await expect(productPage.termsCheckbox).toBeChecked();

  // =========================
  // 7. Checkout
  // =========================

  await productPage.checkout();

  // =========================
  // 8. Checkout as Guest
  // =========================

  await checkoutPage.checkoutAsGuest();

  // =========================
  // 9. Fill Billing Address
  // =========================

  await checkoutPage.fillBillingAddress();

  await checkoutPage.continueBilling();

  // =========================
  // 10. Shipping Address
  // =========================

  await checkoutPage.continueShippingAddress();

  // =========================
  // 11. Shipping Method
  // =========================

  await checkoutPage.continueShippingMethod();

  // =========================
  // 12. Payment Method
  // =========================

  await checkoutPage.continuePaymentMethod();

  // =========================
  // 13. Payment Information
  // =========================

  await checkoutPage.continuePaymentInformation();

  // =========================
  // 14. Confirm Order
  // =========================

  await checkoutPage.confirmOrder();

  // =========================
  // 15. Verify Order Confirmation
  // =========================

  await expect(checkoutPage.orderCompletedMessage).toBeVisible();

  await expect(checkoutPage.orderCompletedMessage).toContainText(
    "Your order has been successfully processed"
  );

  // Verify order completion
await expect(checkoutPage.orderCompletedMessage).toBeVisible({
  timeout: 10000,
});

// Verify successful order completion
await checkoutPage.verifyOrderCompleted();

console.log("Order completed successfully.");

  // =========================
  // 16. Open Order Details
  // =========================

  await checkoutPage.openOrderDetails();

  await expect(page).toHaveURL(/orderdetails/);

  console.log("Order details opened successfully.");
});