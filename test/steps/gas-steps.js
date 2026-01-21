import { Given, Then } from '@wdio/cucumber-framework'
import Gas from '../services/gas'
import referenceNumbers from '../services/reference-number-store'

Given('the next application submitted to GAS for SBI {string} will return HTTP {int} {string} for {int} requests', async (sbi, httpStatusCode, errorText, times) => {
  await Gas.setApplicationSubmissionResponse(sbi, httpStatusCode, errorText, times)
})

Given('the application status in GAS is now {string}', async (gasStatus) => {
  if (!referenceNumbers.current) {
    throw new Error('No reference number stored by earlier step')
  }

  await Gas.setStatusQueryResponse(referenceNumbers.current, gasStatus)
})

Given('the application status for {string} in GAS is now {string}', async (referenceNumber, gasStatus) => {
  await Gas.setStatusQueryResponse(referenceNumber, gasStatus)
})

Then('the reference number along with SBI {string} and CRN {string} should be submitted to GAS', async (sbi, crn) => {
  if (!browser.options.isCI) {
    console.log('Skipping submitted Reference Number checks as not in CI')
    return
  }

  if (!referenceNumbers.current) {
    throw new Error('No reference number stored by earlier step')
  }

  const request = await Gas.getApplicationSubmission(referenceNumbers.current)
  expect(request).not.toBeNull()
  expect(request.body.json.metadata.clientRef).toEqual(referenceNumbers.current.toLowerCase())
  expect(request.body.json.metadata.sbi).toEqual(sbi)
  expect(request.body.json.metadata.crn).toEqual(crn)
  expect(request.body.json.answers.referenceNumber).toEqual(referenceNumbers.current)
})
