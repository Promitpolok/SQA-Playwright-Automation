class RegisterPage {
  constructor(page) {
    this.page = page;

    // Form Field Locators
    this.genderMale = page.locator("#gender-male");
    this.genderFemale = page.locator("#gender-female");
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.confirmPasswordInput = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");

    // Post-Registration Locators
    this.resultMessage = page.locator(".result");
    this.continueButton = page.locator("input.register-continue-button");
    this.accountLink = page.locator("a.account").first();
  }

  async navigate() {
    await this.page.goto("https://demowebshop.tricentis.com/register");
  }

  async registerUser(userData) {
    // Select gender dynamically based on userData (defaults to female)
    if (userData.gender === "male") {
      await this.genderMale.click();
    } else {
      await this.genderFemale.click();
    }

    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
    await this.confirmPasswordInput.fill(userData.password);
    await this.registerButton.click();
  }
}

module.exports = RegisterPage;
