# SQA Playwright & API Automation Project

## Project Overview

This project contains automated functional, end-to-end, and API test scenarios developed as part of the Software Quality Assurance (SQA) project.

The project covers:

- **Part A:** UI Test Automation
- **Part B:** UI Test Automation and Validation
- **Part C:** API Automation using Postman and Newman

The UI automation is developed using **Playwright** for the Tricentis Demo Web Shop application.

The API automation is developed using **Postman** for the JSONPlaceholder API and executed from the command line using **Newman**.

The project follows the **Page Object Model (POM)** design pattern for UI automation to improve code reusability, readability, maintainability, and separation of test logic from page interaction logic.

---

# Technology Stack

## UI Automation

- JavaScript
- Node.js
- Playwright
- Playwright Test
- Page Object Model (POM)

## API Automation

- Postman
- JSONPlaceholder REST API
- Newman
- Newman HTML Extra Reporter
- Newman Allure Reporter
- Allure Commandline

## Version Control

- Git
- GitHub

---

# Project Structure

```text
SQA-Playwright-Automation/
│
├── api-tests/
│   └── JSONPlaceholder-API-Collection.json
│
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── ProductSearchPage.js
│   ├── RegisterPage.js
│   └── SearchPage.js
│
├── tests/
│   ├── example.spec.js
│   ├── q1-invalid-login.spec.js
│   ├── q2-register.spec.js
│   ├── q3-e2e-checkout.spec.js
│   └── q3-e2e.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

# Part A & B - UI Automation

The UI automation covers the following scenarios:

- **Q1:** Invalid Login Validation
- **Q2:** New Customer Registration and Add Product to Cart
- **Q3:** Product Search to Order Confirmation

---

# Q1 - Invalid Login Validation

## Objective

Verify that attempting to log in with invalid credentials displays the appropriate error messages and does not authenticate the user.

## Test File

```text
tests/q1-invalid-login.spec.js
```

## Test Flow

1. Navigate to the login page.
2. Enter an invalid email address.
3. Enter an invalid password.
4. Submit the login form.
5. Verify that the login error message is displayed.
6. Verify that the "No customer account found" message is displayed.
7. Verify that the user remains logged out.

## Run Q1

```bash
npx playwright test tests/q1-invalid-login.spec.js
```

## Run Q1 with Browser Visible

```bash
npx playwright test tests/q1-invalid-login.spec.js --headed
```

---

# Q2 - New Customer Registration and Add Product to Cart

## Objective

Verify that a new customer can successfully register and add a product to the shopping cart.

## Test File

```text
tests/q2-register.spec.js
```

## Test Flow

1. Navigate to the registration page.
2. Register a new customer using a dynamically generated unique email address.
3. Verify successful registration.
4. Verify that the user is logged in.
5. Navigate to the Apparel category.
6. Select a product.
7. Verify the product details page.
8. Add the product to the shopping cart.
9. Verify the successful add-to-cart notification.
10. Open the shopping cart.
11. Verify the correct product is present.
12. Verify that the default quantity is 1.

## Run Q2

```bash
npx playwright test tests/q2-register.spec.js
```

## Run Q2 with Browser Visible

```bash
npx playwright test tests/q2-register.spec.js --headed
```

---

# Q3 - Product Search to Order Confirmation

## Objective

Verify the complete customer purchase workflow from product search through successful order confirmation.

## Test File

```text
tests/q3-e2e.spec.js
```

## Test Flow

1. Search for a product.
2. Select the product.
3. Add the product to the shopping cart.
4. Proceed to checkout.
5. Checkout as a guest.
6. Enter billing information.
7. Continue through the shipping address step.
8. Select a shipping method.
9. Select a payment method.
10. Continue through payment information.
11. Confirm the order.
12. Verify successful order completion.
13. Retrieve the order number.
14. Open the order details page.

## Browser Coverage

Q3 is configured to run on:

- Chromium
- Firefox
- WebKit

## Run Q3

```bash
npx playwright test tests/q3-e2e.spec.js
```

## Run Q3 with Browser Visible

```bash
npx playwright test tests/q3-e2e.spec.js --headed
```

---

# Running All UI Tests

To execute all Playwright tests:

```bash
npx playwright test
```

To run all UI tests with browsers visible:

```bash
npx playwright test --headed
```

## Run on Chromium

```bash
npx playwright test --project=chromium
```

## Run on Firefox

```bash
npx playwright test --project=firefox
```

## Run on WebKit

```bash
npx playwright test --project=webkit
```

---

# Playwright HTML Report

After executing the Playwright tests, open the HTML report using:

```bash
npx playwright show-report
```

The Playwright HTML report provides:

- Test execution results
- Passed and failed tests
- Test duration
- Browser information
- Error details
- Screenshots and traces when available

Screenshots and traces are only displayed when they are generated by the Playwright configuration or when a test failure produces the corresponding artifacts.

---

# Part C - API Automation

## API Under Test

The API automation uses the JSONPlaceholder REST API:

```text
https://jsonplaceholder.typicode.com/users
```

The API collection is created using **Postman** and is executable locally using **Newman**.

## Collection File

```text
api-tests/JSONPlaceholder-API-Collection.json
```

---

# API Test Scenarios

The API automation contains three requests.

## 1. Get All Users

### Method

```text
GET
```

### Endpoint

```text
https://jsonplaceholder.typicode.com/users
```

### Validations

The test verifies:

- HTTP status code is `200`.
- Response is a non-empty array.
- Response contains user information.
- Every user contains:
  - `id`
  - `name`
  - `email`
- User ID, name, and email are not empty.

---

## 2. Get User By ID

The ID of a user is selected from the GET All Users response and stored in a local variable.

The stored ID is then used dynamically in the endpoint:

```text
/users/{id}
```

For example:

```text
https://jsonplaceholder.typicode.com/users/1
```

### Validations

The test verifies:

- HTTP status code is `200`.
- Response contains user information.
- Returned ID matches the saved user ID.
- User name is not empty.
- User email is not empty.

---

## 3. Update User

### Method

```text
PUT
```

The saved user ID variable is used in the endpoint.

Example:

```text
https://jsonplaceholder.typicode.com/users/1
```

The request updates:

- `name`
- `email`
- `company.name`

Dynamic data is used for the updated values.

### Validations

The test verifies:

- HTTP status code is `200`.
- Returned ID matches the saved user ID.
- Phone is not empty.
- Returned name matches the updated name.
- Returned email matches the updated email.
- Returned company name matches the updated company name.

---

# API Assertion Summary

The API collection contains:

```text
3 requests
14 assertions
0 failed assertions
```

Every API request includes an HTTP status code validation, as required by the assignment.

---

# Running API Tests with Newman

Newman is used to execute the Postman collection from the command line.

## Run API Collection

From the project root:

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json"
```

A successful execution should show:

```text
3 requests
0 failed
14 assertions
0 failed
```

---

# Newman HTML Report

The Newman HTML Extra Reporter can be used to generate a detailed HTML report.

Run:

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json" -r cli,htmlextra
```

The generated report is stored under:

```text
newman/
```

The `newman/` directory is excluded from Git using `.gitignore` because reports are generated locally during execution.

---

# Allure Reporting

Allure reporting is also configured for the API automation.

The project includes:

- `newman-reporter-allure`
- `allure-commandline`

## Generate Allure Results

Run:

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json" -r cli,allure
```

This generates Allure result files under:

```text
allure-results/
```

## Generate Allure HTML Report

After generating the results:

```bash
npx allure generate allure-results --clean -o allure-report
```

## Open the Allure Report

```bash
npx allure open allure-report
```

The Allure report provides a visual summary of API test execution, including:

- Passed and failed tests
- Test cases
- Assertions
- Execution information
- Test duration
- Request-level results

Generated Allure results and reports are excluded from Git using `.gitignore`.

---

# API Command-Line Execution

A complete API execution can be performed using:

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json"
```

For an HTML report:

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json" -r cli,htmlextra
```

For Allure results:

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json" -r cli,allure
```

Then generate the Allure report:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the Allure report:

```bash
npx allure open allure-report
```

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/Promitpolok/SQA-Playwright-Automation.git
```

## 2. Navigate to the Project

```bash
cd SQA-Playwright-Automation
```

## 3. Install Node.js Dependencies

```bash
npm install
```

## 4. Install Playwright Browsers

```bash
npx playwright install
```

The required Newman and Allure packages are installed through `npm install`.

---

# Running the Complete Test Suite

## Run UI Tests

```bash
npx playwright test
```

## Run API Tests

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json"
```

The UI and API suites can therefore be executed independently from the command line.

---

# Reporting

The project supports the following reporting mechanisms.

## Playwright HTML Report

```bash
npx playwright show-report
```

## Newman HTML Report

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json" -r cli,htmlextra
```

## Allure API Report

Generate results:

```bash
npx newman run ".\api-tests\JSONPlaceholder-API-Collection.json" -r cli,allure
```

Generate the report:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the report:

```bash
npx allure open allure-report
```

---

# Test Architecture

## UI Automation

The UI automation follows the **Page Object Model (POM)** architecture.

Page-specific locators and reusable actions are maintained inside:

```text
pages/
```

The actual test scenarios are maintained inside:

```text
tests/
```

This separation makes the automation easier to:

- Maintain
- Reuse
- Debug
- Extend
- Read

## API Automation

The API automation is maintained as a Postman collection:

```text
api-tests/JSONPlaceholder-API-Collection.json
```

The collection contains:

- API requests
- Pre-request scripts
- Test scripts
- Dynamic variables
- Response assertions

The collection can be executed both through Postman and from the command line using Newman.

---

# Git Branching Strategy

The project uses separate branches for each question:

- `q1` - Q1 Invalid Login Validation
- `q2` - Q2 Registration and Add Product to Cart
- `q3` - Q3 Product Search to Order Confirmation
- `main` - Final integrated branch

Each question was developed in its respective branch and subsequently merged into the `main` branch.

This branching strategy provides a clear development history and demonstrates organized version control.

---

# Version Control

Git is used to track incremental development throughout the project.

Meaningful commits were created for individual development stages rather than submitting the entire automation project as a single commit.

Example commit history:

```text
Add Playwright E2E automation for Q3
Improve Q1 invalid login test
Improve Q2 registration and cart test
Document Q3 end-to-end checkout scenario
Add comprehensive project README
Fix README Markdown formatting
Add Part C API automation and reporting
Add Allure reporting for API tests
```

---

# Browser Coverage

The Playwright configuration supports the following browsers:

- Chromium
- Firefox
- WebKit

Cross-browser execution can be performed using the Playwright project options.

---

# Repository

GitHub Repository:

https://github.com/Promitpolok/SQA-Playwright-Automation

---

# Important Notes

- Q2 uses a dynamically generated email address to avoid duplicate registration conflicts.
- Q3 verifies the complete checkout workflow through order confirmation.
- Q3 supports Chromium, Firefox, and WebKit.
- Part C uses the JSONPlaceholder REST API.
- The API collection is stored under `api-tests/`.
- The API collection can be executed locally using Newman.
- Every API request validates its HTTP status code.
- The API automation uses a dynamically saved user ID between requests.
- The PUT request updates the required user fields: `name`, `email`, and `company.name`.
- Newman HTML reports are generated locally and excluded from version control.
- Allure results and generated Allure reports are excluded from version control.
- `node_modules` is excluded from version control through `.gitignore`.
- Generated Playwright reports and test results are excluded from version control through `.gitignore`.
