# grants-ui-acceptance-tests

CDP smoke test for [grants-ui](https://github.com/DEFRA/grants-ui), maintained by the Grants UI team.

> **Note:** The main acceptance test suite has been moved into the [grants-ui](https://github.com/DEFRA/grants-ui) repository for synchronicity with the application code. This repo now contains a single end-to-end smoke test that runs against CDP to verify a full `example-grant-with-auth` journey through to submission.

## What This Tests

A single scenario in `test/features/smoke-test.feature` that walks the full `example-grant-with-auth` journey from start page through to submission.

## Technology Stack

- **WebdriverIO** - Browser automation framework
- **Cucumber** - BDD test scenario written in Gherkin
- **Allure** - Test reporting
- **Node.js 20+** - Runtime environment

## Prerequisites

- Node.js `>=20.11.1` (check with `node --version`)
- npm (comes with Node.js)
- Chrome browser (for local testing)
- Access to a running instance of `grants-ui`

## Quick Start

```bash
git clone https://github.com/DEFRA/grants-ui-acceptance-tests.git
cd grants-ui-acceptance-tests
npm install
npm run test:local
```

Local environment variables for the stack stood up by the [grants-ui compose file](https://github.com/DEFRA/grants-ui/blob/main/compose.yml) are set in `wdio.local.conf.js`.

## Running Tests

### Local - wdio.local.conf.js

```bash
npm run test:local
```

Runs against `http://localhost:3000` / `http://localhost:3001`. Uses a visible Chrome browser and generates an Allure report on completion.

### CDP Portal - wdio.conf.js

```bash
npm run test
```

Runs via the CDP portal against the configured CDP environment.

## Project Structure

```
grants-ui-acceptance-tests/
├── test/
│   ├── features/       # Gherkin scenario
│   ├── steps/          # Step definitions
│   ├── page-objects/   # Field/page interaction helpers
│   └── utils/          # Backend auth and polling utilities
├── wdio.conf.js        # CDP configuration
└── wdio.local.conf.js  # Local configuration (env vars included)
```

## Test Reports

After running tests, the report is generated in `allure-report/`. Reports are automatically published to the CDP portal when running via the portal.

```bash
npm run clean   # Remove allure-results and allure-report directories
npm run report  # Regenerate the Allure report manually
```

## Troubleshooting

### Tests Won't Run

- Ensure you have the correct Node.js version: `node --version` should be `>=20.11.1`
- Verify `grants-ui` is running and accessible

### Authentication Failures

- Check `DEFRA_ID_USER_PASSWORD` in `wdio.local.conf.js`
- Ensure backend auth token and encryption key match your `grants-ui-backend` instance

### Chromedriver Issues

- WebdriverIO will automatically download the correct ChromeDriver
- Ensure Chrome browser is installed and up to date

## Related Repositories

- [grants-ui](https://github.com/DEFRA/grants-ui) - The main grants application UI service (also contains the full acceptance test suite)
- [grants-ui-backend](https://github.com/DEFRA/grants-ui-backend) - The grants-ui backend service accessing MongoDB storage

## Support

For questions or issues, please contact the Grants Application Enablement (GAE) team.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3
