const { test, expect } = require("@playwright/test");

const ProductSearchPage = require("../pages/ProductSearchPage");
const ProductPage = require("../pages/ProductPage");
const CheckoutPage = require("../pages/CheckoutPage");

test("Q3: Product Search to Order Confirmation E2E", async ({ page }) => {
  const searchPage = new ProductSearchPage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  // ==========================================
  // Step 1: Search for Product
  // ==========================================

  await searchPage.navigate();

  await searchPage.searchProduct("14.1-inch Laptop");

  // Verify correct product appears
  await expect(searchPage.searchResultProduct).toContainText(
    "14.1-inch Laptop"
  );

  // ==========================================
  // Step 2: Open Product
  // ==========================================

  await searchPage.openProduct();

  await expect(productPage.productTitleHeading).toHaveText(
    "14.1-inch Laptop"
  );

  // ==========================================
  // Step 3: Increase Quantity
  // ==========================================

  await productPage.increaseQuantity(2);

  await expect(productPage.quantityInput).toHaveValue("2");

  // ==========================================
  // Step 4: Add Product to Cart
  // ==========================================

  await productPage.addCurrentProductToCart();

  await expect(productPage.notificationSuccess).toContainText(
    "The product has been added to your shopping cart"
  );

  // ==========================================
  // Step 5: Open Shopping Cart
  // ==========================================

  await productPage.goToCart();

  // Verify quantity is 2
  await expect(productPage.cartProductQty).toHaveValue("2");

  // ==========================================
  // Step 6: Agree to Terms
  // ==========================================

  await productPage.agreeToTerms();

  await expect(productPage.termsCheckbox).toBeChecked();

  // ==========================================
  // Step 7: Checkout
  // ==========================================

  await productPage.checkout();

  // ==========================================
  // Step 8: Checkout as Guest
  // ==========================================

  await checkoutPage.checkoutAsGuest();

  // ==========================================
  // Step 9: Fill Billing Address
  // ==========================================

  await checkoutPage.fillBillingAddress();

  await checkoutPage.continueBilling();

  // ==========================================
  // Step 10: Shipping Address
  // ==========================================

  await checkoutPage.continueShippingAddress();

  // ==========================================
  // Step 11: Shipping Method
  // ==========================================

  await checkoutPage.continueShippingMethod();

  // ==========================================
  // Step 12: Payment Method
  // ==========================================

  await checkoutPage.continuePaymentMethod();

  // ==========================================
  // Step 13: Payment Information
  // ==========================================

  await checkoutPage.continuePaymentInformation();

  // ==========================================
  // Step 14: Confirm Order
  // ==========================================

  await checkoutPage.confirmOrder();

  // ==========================================
  // Step 15: Verify Order Confirmation
  // ==========================================

  await expect(checkoutPage.orderCompletedMessage).toContainText(
    "Your order has been successfully processed"
  );

  // Verify order number exists
  await expect(checkoutPage.orderNumber).toBeVisible();

  const orderNumber = await checkoutPage.getOrderNumber();

  console.log("Order Number:", orderNumber);

  // ==========================================
  // Step 16: Open Order Details
  // ==========================================

  await checkoutPage.openOrderDetails();

  // Verify order details page
  await expect(page).toHaveURL(/orderdetails/);

  console.log("Order details opened successfully.");
});