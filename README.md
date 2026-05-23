# Playwright Automation Framework

## Overview
This project contains sample automated test scripts for login functionality using Playwright and TypeScript.

Test website: https://demo.realworld.show

## Features
- Data-driven testing
- Page Object Model (POM)
- Reusable utilities (env variables, helpers)

## How to Run
- npm install
- npx playwright test tests-playwright/auth/test-login-data-driven.spec.ts
- npx playwright test tests-playwright/auth/test-login.spec.ts
- npx playwright test tests-playwright/auth/test-logout.spec.ts
- npx playwright test tests-playwright/features/test-publish-new-article.spec.ts
- npx playwright test tests-playwright/features/test-post-comment.spec.ts
- npx playwright test tests-playwright/features/test-update-article.spec.ts