# grants-ui-acceptance-tests

This acceptance test suite is maintained by Grants Application Enablement (GAE) team, covering:

- Non-land based grant application journeys served by `grants-ui`
- General `grants-ui` components maintained by GAE

## Running the test suite

There are 3 WebdriverIO config files:

### wdio.local.conf.js

```bash
npm run test:local
```

Used to run individual tests locally using your local install of Chrome. You must provide the following environment variables in your environment, e.g. in an `.env` file:

- DEFRA_ID_USER_PASSWORD
- GRANTS_UI_BACKEND_AUTH_TOKEN
- GRANTS_UI_BACKEND_ENCRYPTION_KEY

See [.env.example](.env.example) for an example that will work with a local instance of `grants-ui` stood up with the service [compose file](https://github.com/DEFRA/grants-ui/blob/main/compose.yml).

### wdio.conf.js

Used to run tests in the CDP portal. Only scenarios tagged `@cdp` are run.

### wdio.ci.conf.js

Used to run tests in the `grants-ui` CI pipeline. Only scenarios tagged `@ci` are run.

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
