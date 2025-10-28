import { Given, Then, world } from '@wdio/cucumber-framework'
import Gas from '../services/gas'

Given('the next application submitted to GAS for SBI {string} will return HTTP {int} {string}', async (sbi, httpStatusCode, errorText) => {
  await Gas.setApplicationSubmissionResponse(sbi, httpStatusCode, errorText)
})

Given('the application status in GAS is now {string}', async (gasStatus) => {
  if (!world.referenceNumber) {
    throw new Error('world.referenceNumber not set by earlier step')
  }

  await Gas.setStatusQueryResponse(world.referenceNumber, gasStatus)
})

Then('the reference number along with SBI {string} and CRN {string} should be submitted to GAS', async (sbi, crn) => {
  if (!browser.options.isCI) {
    console.log('Skipping submitted Reference Number checks as not in CI')
    return
  }

  console.log('Running submitted Reference Number checks')

  if (!world.referenceNumber) {
    throw new Error('world.referenceNumber not set by earlier step')
  }

  const request = await Gas.getApplicationSubmission(world.referenceNumber)
  expect(request).not.toBeNull()
  expect(request.body.json.metadata.clientRef).toEqual(world.referenceNumber.toLowerCase())
  expect(request.body.json.metadata.sbi).toEqual(sbi)
  expect(request.body.json.metadata.crn).toEqual(crn)
  expect(request.body.json.answers.referenceNumber).toEqual(world.referenceNumber)
})
