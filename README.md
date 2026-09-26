\# SQA Playwright Automation Project



\## Project Overview



This project contains automated functional and end-to-end test scenarios developed using Playwright for the Tricentis Demo Web Shop application.



The automation covers the following scenarios:



\- \*\*Q1:\*\* Invalid Login Validation

\- \*\*Q2:\*\* New Customer Registration and Add Product to Cart

\- \*\*Q3:\*\* Product Search to Order Confirmation



The project follows the \*\*Page Object Model (POM)\*\* design pattern to improve code reusability, readability, maintainability, and separation of test logic from page interaction logic.



\---



\## Technology Stack



\- JavaScript

\- Node.js

\- Playwright

\- Playwright Test

\- Page Object Model (POM)

\- Git

\- GitHub



\---



\## Project Structure



```text

SQA-Playwright-Automation/

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



\---



\# Test Scenarios



\## Q1 - Invalid Login Validation



\### Objective



Verify that attempting to log in with invalid credentials displays the appropriate error messages and does not authenticate the user.



\### Test File



```text

tests/q1-invalid-login.spec.js

```



\### Test Flow



1\. Navigate to the login page.

2\. Enter an invalid email address.

3\. Enter an invalid password.

4\. Submit the login form.

5\. Verify that the login error message is displayed.

6\. Verify that the "No customer account found" message is displayed.

7\. Verify that the user remains logged out.



\### Run Q1



```bash

npx playwright test tests/q1-invalid-login.spec.js

```



\### Run Q1 with Browser Visible



```bash

npx playwright test tests/q1-invalid-login.spec.js --headed

```



\---



\## Q2 - New Customer Registration and Add Product to Cart



\### Objective



Verify that a new customer can successfully register and add a product to the shopping cart.



\### Test File



```text

tests/q2-register.spec.js

```



\### Test Flow



1\. Navigate to the registration page.

2\. Register a new customer using a unique email address.

3\. Verify successful registration.

4\. Verify that the user is logged in.

5\. Navigate to the Apparel category.

6\. Select a product.

7\. Verify the product details page.

8\. Add the product to the shopping cart.

9\. Verify the successful add-to-cart notification.

10\. Open the shopping cart.

11\. Verify the correct product is present.

12\. Verify that the default quantity is 1.



\### Run Q2



```bash

npx playwright test tests/q2-register.spec.js

```



\### Run Q2 with Browser Visible



```bash

npx playwright test tests/q2-register.spec.js --headed

```



\---



\## Q3 - Product Search to Order Confirmation



\### Objective



Verify the complete customer purchase workflow from product search through successful order confirmation.



\### Test File



```text

tests/q3-e2e.spec.js

```



\### Test Flow



1\. Search for a product.

2\. Select the product.

3\. Add the product to the shopping cart.

4\. Proceed to checkout.

5\. Checkout as a guest.

6\. Enter billing information.

7\. Continue through the shipping address step.

8\. Select a shipping method.

9\. Select a payment method.

10\. Continue through payment information.

11\. Confirm the order.

12\. Verify successful order completion.

13\. Retrieve the order number.

14\. Open the order details page.



\### Browser Coverage



Q3 is configured to run on:



\- Chromium

\- Firefox

\- WebKit



\### Run Q3



```bash

npx playwright test tests/q3-e2e.spec.js

```



\### Run Q3 with Browser Visible



```bash

npx playwright test tests/q3-e2e.spec.js --headed

```



\---



\# Running All Tests



To execute all Playwright tests:



```bash

npx playwright test

```



To run all tests with browsers visible:



```bash

npx playwright test --headed

```



To run all tests on Chromium:



```bash

npx playwright test --project=chromium

```



To run all tests on Firefox:



```bash

npx playwright test --project=firefox

```



To run all tests on WebKit:



```bash

npx playwright test --project=webkit

```



\---



\# Playwright HTML Report



After executing the tests, open the Playwright HTML report using:



```bash

npx playwright show-report

```



The HTML report provides:



\- Test execution results

\- Passed and failed tests

\- Test duration

\- Browser information

\- Error details

\- Screenshots and traces when available



\---



\# Setup Instructions



\## 1. Clone the Repository



```bash

git clone https://github.com/Promitpolok/SQA-Playwright-Automation.git

```



\## 2. Navigate to the Project



```bash

cd SQA-Playwright-Automation

```



\## 3. Install Dependencies



```bash

npm install

```



\## 4. Install Playwright Browsers



```bash

npx playwright install

```



\## 5. Run the Tests



Run all tests:



```bash

npx playwright test

```



\---



\# Git Branching Strategy



The project uses separate branches for each question:



\- `q1` - Q1 Invalid Login Validation

\- `q2` - Q2 Registration and Add Product to Cart

\- `q3` - Q3 Product Search to Order Confirmation

\- `main` - Final integrated branch



Each question was developed in its respective branch and subsequently merged into the `main` branch.



This branching strategy provides a clear development history and demonstrates organized version control.



\---



\# Version Control



Git is used to track incremental development throughout the project.



Meaningful commits were created for individual development stages rather than submitting the entire automation project as a single commit.



Example commit history:



```text

Add Playwright E2E automation for Q3

Improve Q1 invalid login test

Improve Q2 registration and cart test

Document Q3 end-to-end checkout scenario

Add comprehensive project README

```



\---



\# Test Architecture



The project follows the \*\*Page Object Model (POM)\*\* architecture.



Page-specific locators and reusable actions are maintained inside the page classes under:



```text

pages/

```



The actual test scenarios are maintained separately under:



```text

tests/

```



This separation makes the automation easier to maintain, reuse, debug, and extend.



\---



\# Browser Coverage



The Playwright configuration supports the following browsers:



\- Chromium

\- Firefox

\- WebKit



Cross-browser execution can be performed using the Playwright project options.



\---



\# Repository



GitHub Repository:



https://github.com/Promitpolok/SQA-Playwright-Automation



\---



\# Notes



\- Q2 uses a dynamically generated email address to avoid duplicate registration conflicts.

\- Q3 verifies the complete checkout workflow through order confirmation.

\- The Playwright HTML report can be generated and viewed after test execution.

\- `node\_modules` and generated test reports are excluded from version control through `.gitignore`.

