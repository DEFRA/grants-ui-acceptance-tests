import { Given } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'
import { pollForSuccess } from '../services/polling'
import { getGrantsUiBackendAuthorizationToken } from '../services/backend-auth-helper'

Given('the user navigates to {string}', async (page) => {
  await browser.url(page)
})

Given('(the user )completes any login process as CRN {string}', async (crn) => {
  const isLoginRequired = await pollForSuccess(async () => {
    return await $(`//h1/span[contains(text(), 'Sign in')]`).isExisting()
  }, 5)

  if (isLoginRequired) {
    await $(`//input[@id='crn']`).setValue(crn, { wait: 20000 })
    await $(`//input[@id='password']`).setValue(process.env.DEFRA_ID_USER_PASSWORD, { wait: 20000 })
    await $(`//button[@type='submit']`).click({ wait: 20000 })
    // allow extra time for Defra ID login to succeed
    await expect(browser).not.toHaveUrl(expect.stringContaining('b2clogin.com'), { wait: 20000 })
  }
})

Given('there is no Save and Return data stored for CRN {string} and SBI {string} and grant {string}', async (crn, sbi, grant) => {
  const response = await fetch(`${browser.options.baseBackendUrl}/state?businessId=${sbi}&userId=${crn}&grantId=${grant}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${getGrantsUiBackendAuthorizationToken()}`
    }
  })

  await expect(response.status === 200 || response.status === 404).toBe(true)
})
