import { Given } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'
import { pollForSuccess } from '../services/polling'

Given('the user navigates to {string}', async (page) => {
  await browser.url(page)

  const isLoginRequired = await pollForSuccess(async () => {
    return await $(`//h1/span[contains(text(), 'Sign in')]`).isExisting()
  }, 5)

  if (isLoginRequired) {
    await $(`//input[@id='crn']`).setValue('1100664912')
    await $(`//input[@id='password']`).setValue(process.env.DEFRA_ID_USER_PASSWORD)
    await $(`//button[@type='submit']`).click()
  }
})
