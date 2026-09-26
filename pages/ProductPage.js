const { expect } = require("@playwright/test");
class ProductPage {
  constructor(page) {
    this.page = page;

    // =========================
    // Q2 - Category
    // =========================
    this.apparelCategoryLink = page.locator(
      "ul.top-menu a[href='/apparel-shoes']"
    );

    // =========================
    // Q3 - Product Search
    // =========================
    this.searchInput = page.locator("#small-searchterms");
    this.searchButton = page.locator("input.search-box-button");

    // Search result product
    this.searchResultProduct = page.locator(
      ".product-item h2 a"
    );

    // =========================
    // Q2 - Product
    // =========================
    this.productItemLink = page.locator(
      ".product-item h2 a"
    ).first();

    this.productTitleHeading = page.locator(
      ".product-name h1"
    );

    this.addToCartButton = page.locator(
      "input[id^='add-to-cart-button']"
    );

    this.notificationSuccess = page.locator(
      "#bar-notification .content"
    );

    // =========================
    // Q2/Q3 - Shopping Cart
    // =========================
    this.shoppingCartLink = page.locator(
      "a.ico-cart"
    ).first();

    // =========================
    // Q2 - Cart
    // =========================
    this.cartItemRow = page.locator(
      ".cart-item-row"
    );

    this.cartProductName = page.locator(
      ".product-name"
    );

    this.cartProductQty = page.locator(
      "input.qty-input"
    );

    // =========================
    // Q3 - Product Page
    // =========================
    this.quantityInput = page.locator(
      "input.qty-input"
    ).first();

    // =========================
    // Q3 - Shopping Cart Checkout
    // =========================
    this.termsCheckbox = page.locator(
      "#termsofservice"
    );

    this.checkoutButton = page.locator(
  "input.button-1.checkout-button, button.checkout-button"
    );
  }

  // =========================
  // Q2 - Category
  // =========================

  async navigateToApparelCategory() {
    await this.apparelCategoryLink.click();
  }

  // =========================
  // Q3 - Search
  // =========================

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async selectSearchResult(productName) {
    await this.page
      .locator(".product-item h2 a")
      .filter({ hasText: productName })
      .first()
      .click();
  }

  // =========================
  // Product
  // =========================

  async selectFirstProduct() {
    await this.productItemLink.click();
  }

  async addCurrentProductToCart() {
    await this.addToCartButton.click();
  }

  // =========================
  // Shopping Cart
  // =========================

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  // =========================
  // Q3 - Quantity
  // =========================

  async increaseQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  // =========================
  // Q3 - Checkout
  // =========================

  async agreeToTerms() {
  if (!(await this.termsCheckbox.isChecked())) {
    await this.termsCheckbox.click({ force: true });
  }

  await expect(this.termsCheckbox).toBeChecked();
}

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = ProductPage;