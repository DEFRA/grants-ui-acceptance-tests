import allure from 'allure-commandline'
import { browser } from '@wdio/globals'

process.env.DEFRA_ID_USER_PASSWORD ??= 'x'
process.env.GRANTS_UI_BACKEND_AUTH_TOKEN ??= 'auth_token'
process.env.GRANTS_UI_BACKEND_ENCRYPTION_KEY ??= 'encryption_key'
process.env.APPLICATION_LOCK_TOKEN_SECRET ??= 'dev-lock-secret'

export const config = {
  baseUrl: `http://localhost:3000`,
  baseBackendUrl: `http://localhost:3001`,
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      'wdio:chromedriverOptions': {
        version: '147'
      },
      'goog:chromeOptions': {
        args: ['--no-sandbox', '--disable-infobars', '--disable-gpu', '--window-size=1920,1080', '--ignore-certificate-errors']
      }
    }
  ],
  runner: 'local',
  specs: ['./test/features/**/*.feature'],
  exclude: [],
  logLevel: 'info',
  logLevels: {
    webdriver: 'error'
  },
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        useCucumberStepReporter: true
      }
    ]
  ],
  cucumberOpts: {
    require: ['./test/steps/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tags: '',
    timeout: 180000,
    ignoreUndefinedDefinitions: false
  },
  onComplete: function (exitCode, config, capabilities, results) {
    const generation = allure(['generate', 'allure-results', '--clean'])

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(new Error('Could not generate Allure report, timeout exceeded')), 30000)

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)

        if (exitCode !== 0) {
          return reject(new Error(`Could not generate Allure report, exited with code: ${exitCode}`))
        }

        resolve()
      })
    })
  },
  afterScenario: async function (world, result, context) {
    await browser.reloadSession()
  }
}
