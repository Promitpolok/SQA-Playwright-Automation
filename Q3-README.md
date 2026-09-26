# Q3 End-to-End Checkout Automation

This test validates the complete product purchase workflow using Playwright.

## Scenario

1. Search for a product.
2. Select the product.
3. Add the product to the shopping cart.
4. Proceed to checkout as a guest.
5. Enter billing/shipping information.
6. Select shipping and payment methods.
7. Confirm the order.
8. Verify successful order completion.
9. Open the order details page.

## Test File

- tests/q3-e2e.spec.js

## Page Objects

- pages/ProductPage.js
- pages/ProductSearchPage.js
- pages/CartPage.js
- pages/CheckoutPage.js

## Browsers

The test is configured to run on Chromium, Firefox, and WebKit.

## Run

npx playwright test tests/q3-e2e.spec.js

## Run with browser visible

npx playwright test tests/q3-e2e.spec.js --headed

## Generate HTML report

npx playwright test tests/q3-e2e.spec.js

## Open report

npx playwright show-report
