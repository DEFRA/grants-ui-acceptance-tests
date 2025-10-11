import { Given, Then } from '@wdio/cucumber-framework'
import { transformStepArgument } from '../services/step-argument-transformation'
import Backend from '../services/backend'

Given('there is no application state stored for SBI {string} and grant {string}', async (sbi, grantCode) => {
  await Backend.deleteState(sbi, grantCode)
})

Then('there should be application state stored for SBI {string} and grant {string}', async (sbi, grantCode) => {
  await Backend.getState(sbi, grantCode)
})

Then('the following application state should be stored for SBI {string} and grant {string}', async (sbi, grantCode, dataTable) => {
  const state = await Backend.getState(sbi, grantCode)
  for (const row of dataTable.hashes()) {
    expect(state[row.FIELD]).toEqual(transformStepArgument(row.VALUE))
  }
})

Then('the following application submission should be stored for SBI {string} and grant {string}', async (sbi, grantCode, dataTable) => {
  const submission = await Backend.getSubmissions(sbi, grantCode)
  for (const row of dataTable.hashes()) {
    expect(submission[0][row.FIELD]).toEqual(transformStepArgument(row.VALUE))
  }
})
