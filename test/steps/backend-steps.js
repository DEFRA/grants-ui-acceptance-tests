import { Given, Then } from '@wdio/cucumber-framework'
import Backend from '../services/backend'

Given('there is no application state stored for SBI {string} and grant {string}', async (sbi, grantCode) => {
  await Backend.delete(sbi, grantCode)
})

Then('there should be application state stored for SBI {string} and grant {string}', async (sbi, grantCode) => {
  await Backend.get(sbi, grantCode)
})
