# grants-ui-acceptance-tests

Automated acceptance test suite for Defra's grants application platform, maintained by the Grants Application Enablement (GAE) team.

## What This Tests

This test suite provides end-to-end testing coverage for:

- Non-land based grant application journeys served by [grants-ui](https://github.com/DEFRA/grants-ui)
- Reusable `grants-ui` components maintained by GAE
- User authentication flows via Defra ID
- Application lifecycle management
- Stubbed integration with other backend services (e.g. [GAS - Grant Application Service](https://github.com/DEFRA/fg-gas-backend))

## Technology Stack

- **WebdriverIO** - Browser automation framework
- **Cucumber** - BDD test scenarios written in Gherkin
- **Allure** - Test reporting
- **Node.js 20+** - Runtime environment

## Prerequisites

- Node.js `>=20.11.1` (check with `node --version`)
- npm (comes with Node.js)
- Chrome browser (for local testing)
- Access to a running instance of `grants-ui` (local or CDP)

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/DEFRA/grants-ui-acceptance-tests.git
cd grants-ui-acceptance-tests
npm install
```

### 2. Configure Environment

Copy the example environment file and configure it for your setup:

```bash
cp .env.example .env
```

Edit `.env` with your configuration. For local testing against a local `grants-ui` instance:

```bash
DEFRA_ID_USER_PASSWORD=x
GRANTS_UI_BACKEND_AUTH_TOKEN=auth_token
GRANTS_UI_BACKEND_ENCRYPTION_KEY=encryption_key
MOCKSERVER_HOST=localhost
MOCKSERVER_PORT=1080
```

See [.env.example](.env.example) for a full example that works with the [grants-ui compose file](https://github.com/DEFRA/grants-ui/blob/main/compose.yml).

### 3. Run Tests

Tag a scenario with `@runme` in a feature file, then:

```bash
npm run test:local
```

## Running the Test Suite

There are 3 WebdriverIO configuration files for different environments:

### Local Development - wdio.local.conf.js

```bash
npm run test:local
```

- Runs tests tagged with `@runme`
- Uses your local Chrome browser
- Pre-configured to run against [http://localhost:3000](http://localhost:3000) as stood up by the [grants-ui compose file](https://github.com/DEFRA/grants-ui/blob/main/compose.yml) file
- Used for local development of individual scenarios
- Requires environment variables configured in `.env`

### CDP Portal - wdio.conf.js

```bash
npm run test
```

- Runs tests tagged with `@cdp`
- Used for testing in CDP via the portal

### CI Pipeline - wdio.ci.conf.js

```bash
npm run test:ci
```

- Runs tests tagged with `@ci`
- Used in the `grants-ui` GitHub Actions CI pipeline
- Automated execution on creating and updating a `grants-ui` PR
- Can also be run from the `grants-ui' repository using the [CI script](https://github.com/DEFRA/grants-ui/blob/main/tools/run-acceptance-tests.sh) locally

## Project Structure

```
grants-ui-acceptance-tests/
├── test/
│   ├── features/                       # Gherkin feature files
│   │   ├── adding-value/
│   │   ├── example-grant-with-auth/    # Contains example use of reusable grants-ui components
│   │   ├── example-tasklist/
│   │   └── example-whitelist/
│   ├── steps/                          # Step definitions
│   │   ├── given.js
│   │   ├── when.js
│   │   ├── then.js
│   │   ├── backend-steps.js
│   │   └── gas-steps.js
│   ├── page-objects/                   # Page objects
│   ├── services/                       # Helper services
│   └── dto/                            # Data transfer objects
├── wdio.*.conf.js                      # WebdriverIO config files
└── .env                                # Local environment configuration
```

## Writing Tests

### Feature Files

Tests are written in Gherkin syntax in `.feature` files under `test/features/`. Example:

```gherkin
@runme
Scenario: Apply for a grant
  Given I am on the start page
  When I click "Start now"
  Then I should see "Check if you can apply"
```

### Tagging Strategy

Use tags to control which tests run in which environments:

- `@runme` - Run this scenario locally during development
- `@ci` - Run in CI pipeline
- `@cdp` - Run in CDP portal

### Step Definitions

Step definitions are located in `test/steps/`:
- [given.js](test/steps/given.js) - Setup steps
- [when.js](test/steps/when.js) - Action steps
- [then.js](test/steps/then.js) - Assertion steps
- [backend-steps.js](test/steps/backend-steps.js) - Backend interaction steps
- [gas-steps.js](test/steps/gas-steps.js) - Grant Application Service steps

## Test Reports

### Generating Reports

After running tests, the report will be generated in the `allure-report/` directory. Reports are automatically published to the CDP portal when running tests via the portal.

## Development Commands

### Code Quality

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Cleanup

```bash
npm run clean  # Remove allure-results and allure-report directories
```

## Troubleshooting

### Tests Won't Run

- Ensure you have the correct Node.js version: `node --version` should be >=20.11.1
- Check your `.env` file is configured correctly
- Verify `grants-ui` is running and accessible

### Authentication Failures

- Check `DEFRA_ID_USER_PASSWORD` in your `.env` file
- Ensure backend auth token and encryption key match your `grants-ui-backend` instance

### Chromedriver Issues

- WebdriverIO will automatically download the correct ChromeDriver
- Ensure Chrome browser is installed and up to date

## Contributing

When adding new tests:

1. Write feature files using clear, business-readable language
2. Reuse existing step definitions where possible
3. Add new page objects for new pages
4. Tag appropriately for the target environments
5. Ensure tests pass locally before committing
6. Follow the existing code style (enforced by ESLint/Prettier)
7. Submit a PR to the Grants Application Enablement (GAE) team

## Related Repositories

- [grants-ui](https://github.com/DEFRA/grants-ui) - The main grants application UI service
- [grants-ui-backend](https://github.com/DEFRA/grants-ui-backend) - The grants-ui backend service accessing MongoDB storage
- [ffc-grants-scoring](https://github.com/DEFRA/ffc-grants-scoring) - The grants scoring service

## Support

For questions or issues with this test suite, please contact the Grants Application Enablement (GAE) team.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

#### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
