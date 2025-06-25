# grants-ui-acceptance-tests

This acceptance test suite is maintained by Grants Application Enablement (GAE) team, covering:

- Non-land based grant application journeys served by `grants-ui`
- General `grants-ui` components maintained by GAE

## Running the test suite

There are 2 WebdriverIO config files:

```bash
wdio.local.conf.js
------------------
# used to run tests locally using a local instance of Chrome
npm run test:local
```

```bash
wdio.conf.js
------------
# used to run tests in the portal aghainst the hosted Chrome instance
```

### Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

#### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
