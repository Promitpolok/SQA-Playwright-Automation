const { expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.page = page;

    // =========================
    // Checkout as Guest
    // =========================

    this.checkoutAsGuestButton = page.locator(
      "input.button-1.checkout-as-guest-button"
    );

    // =========================
    // Billing Address
    // =========================

    this.firstNameInput = page.locator("#BillingNewAddress_FirstName");
    this.lastNameInput = page.locator("#BillingNewAddress_LastName");
    this.emailInput = page.locator("#BillingNewAddress_Email");
    this.countrySelect = page.locator("#BillingNewAddress_CountryId");
    this.stateSelect = page.locator("#BillingNewAddress_StateProvinceId");
    this.cityInput = page.locator("#BillingNewAddress_City");
    this.address1Input = page.locator("#BillingNewAddress_Address1");
    this.zipCodeInput = page.locator("#BillingNewAddress_ZipPostalCode");
    this.phoneInput = page.locator("#BillingNewAddress_PhoneNumber");

    this.billingContinueButton = page.locator(
      "#billing-buttons-container input.new-address-next-step-button"
    );

    // =========================
    // Shipping Address
    // =========================

    this.shippingAddressContinueButton = page.locator(
      "#shipping-buttons-container input.new-address-next-step-button"
    );

    // =========================
    // Shipping Method
    // =========================

    this.shippingMethodContinueButton = page.locator(
      "#shipping-method-buttons-container input.shipping-method-next-step-button"
    );

    // =========================
    // Payment Method
    // =========================

    this.paymentMethodContinueButton = page.locator(
      "#payment-method-buttons-container input.payment-method-next-step-button"
    );

    // =========================
    // Payment Information
    // =========================

    this.paymentInfoContinueButton = page.locator(
      "#payment-info-buttons-container input.payment-info-next-step-button"
    );

    // =========================
    // Confirm Order
    // =========================

    this.confirmOrderButton = page.locator(
      "#confirm-order-buttons-container input.confirm-order-next-step-button"
    );

    // =========================
    // Order Confirmation
    // =========================

    this.orderCompletedSection = page.locator(
      ".section.order-completed"
    );

    this.orderCompletedMessage = page.locator(
      ".section.order-completed .title"
    );

    this.orderDetailsLink = page.locator(
      "a[href*='/orderdetails']"
    );
  }

  // =========================
  // Checkout as Guest
  // =========================

  async checkoutAsGuest() {
    await this.checkoutAsGuestButton.click();
  }

  // =========================
  // Billing Address
  // =========================

  async fillBillingAddress() {
    await this.firstNameInput.fill("Test");
    await this.lastNameInput.fill("User");

    await this.emailInput.fill(
      `testcheckout_${Date.now()}@example.com`
    );

    await this.countrySelect.selectOption({
      label: "Bangladesh",
    });

    await this.cityInput.fill("Dhaka");
    await this.address1Input.fill("123 Test Street");
    await this.zipCodeInput.fill("1207");
    await this.phoneInput.fill("01700000000");
  }

  async continueBilling() {
    await this.billingContinueButton.click();
  }

  // =========================
  // Shipping Address
  // =========================

  async continueShippingAddress() {
    const shippingButton = this.page.locator(
      "#shipping-buttons-container input.new-address-next-step-button, " +
        "#shipping-buttons-container button"
    );

    if ((await shippingButton.count()) > 0) {
      await expect(shippingButton.first()).toBeVisible({
        timeout: 10000,
      });

      await shippingButton.first().click();
    } else {
      const shippingStep = this.page.locator(
        "li:has(h2:has-text('Shipping address'))"
      );

      const continueButton = shippingStep.getByRole("button", {
        name: "Continue",
      });

      await expect(continueButton).toBeVisible({
        timeout: 10000,
      });

      await continueButton.click();
    }
  }

  // =========================
  // Shipping Method
  // =========================

  async continueShippingMethod() {
    await expect(this.shippingMethodContinueButton).toBeVisible({
      timeout: 10000,
    });

    await this.shippingMethodContinueButton.click();
  }

  // =========================
  // Payment Method
  // =========================

  async continuePaymentMethod() {
    await expect(this.paymentMethodContinueButton).toBeVisible({
      timeout: 10000,
    });

    await this.paymentMethodContinueButton.click();
  }

  // =========================
  // Payment Information
  // =========================

  async continuePaymentInformation() {
    await expect(this.paymentInfoContinueButton).toBeVisible({
      timeout: 10000,
    });

    await this.paymentInfoContinueButton.click();
  }

  // =========================
  // Confirm Order
  // =========================

  async confirmOrder() {
    await expect(this.confirmOrderButton).toBeVisible({
      timeout: 10000,
    });

    await this.confirmOrderButton.click();

    // Wait for checkout completion
    await this.page.waitForURL(/\/checkout\/completed/, {
      timeout: 15000,
    });

    // Verify successful order completion
    await expect(this.orderCompletedSection).toBeVisible({
      timeout: 15000,
    });
  }

  // =========================
  // Order Confirmation
  // =========================

  async verifyOrderCompleted() {
    await expect(this.orderCompletedSection).toBeVisible({
      timeout: 10000,
    });
  }

  // =========================
  // Order Details
  // =========================

  async openOrderDetails() {
    await this.orderDetailsLink.click();
  }
}

module.exports = CheckoutPage;