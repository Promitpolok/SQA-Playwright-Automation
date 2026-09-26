class ProductSearchPage {
  constructor(page) {
    this.page = page;

    // =========================
    // Search
    // =========================
    this.searchInput = page.locator("#small-searchterms");

    this.searchButton = page.locator(
      "input.search-box-button"
    );

    // =========================
    // Search Results
    // =========================
    this.searchResults = page.locator(
      ".product-item"
    );

    this.searchResultProduct = page.locator(
      ".product-item h2 a"
    );
  }

  // =========================
  // Navigate to Demo Web Shop
  // =========================

  async navigate() {
    await this.page.goto(
      "https://demowebshop.tricentis.com/"
    );
  }

  // =========================
  // Search Product
  // =========================

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  // =========================
  // Open Product from Search
  // =========================

  async openProduct(productName = "14.1-inch Laptop") {
    await this.page
      .locator(".product-item h2 a")
      .filter({ hasText: productName })
      .first()
      .click();
  }
}

module.exports = ProductSearchPage;