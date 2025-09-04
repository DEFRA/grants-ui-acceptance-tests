import { Given } from '@wdio/cucumber-framework'
import { pollForSuccess } from '../services/polling'

Given('(the user )navigates to {string}', async (page) => {
  await browser.url(page)
})

Given('(the user )completes any login process as CRN {string}', async (crn) => {
  const isLoginRequired = await pollForSuccess(async () => await $(`//h1/span[contains(text(), 'Sign in')]`).isExisting(), 5)

  if (isLoginRequired) {
    await $(`//input[@id='crn']`).setValue(crn)
    await $(`//input[@id='password']`).setValue(process.env.DEFRA_ID_USER_PASSWORD)
    await $(`//button[@type='submit']`).click()
    // allow extra time for Defra ID login to succeed
    await expect(browser).not.toHaveUrl(expect.stringContaining('b2clogin.com'), { wait: 20000 })
  }
})

Given('(the user )starts a new browser session', async () => {
  await browser.reloadSession()
})
