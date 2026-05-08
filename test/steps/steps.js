import { Given, When, Then } from '@wdio/cucumber-framework'
import { pollForSuccess } from '../utils/polling'
import Backend from '../utils/backend'
import AutocompleteField from '../page-objects/auto-complete.field'
import DatePartsField from '../page-objects/date-parts.field'
import MonthYearField from '../page-objects/month-year.field'

Given('there is no application state stored for CRN {string} and SBI {string} and grant {string}', async (crn, sbi, grantCode) => {
  await Backend.deleteState(crn, sbi, grantCode)
})

Given('(the user )navigates to {string}', async (page) => {
  await browser.url(page)
})

Given('(the user )completes any login process as CRN {string}', async (crn) => {
  const isLoginRequired = await pollForSuccess(async () => await $(`//*[contains(text(), 'Sign in to')]`).isExisting(), 5)

  if (isLoginRequired) {
    await $(`//input[@id='crn']`).setValue(crn)
    await $(`//input[@id='password']`).setValue(process.env.DEFRA_ID_USER_PASSWORD)
    await $(`//button[@type='submit']`).click()
    // allow extra time for Defra ID sign in to succeed
    await expect(browser).not.toHaveUrl(expect.stringContaining('b2clogin.com'), { wait: 20000 })
  }
})

When('(the user )clicks on {string}', async (text) => {
  await $(`//*[contains(text(),'${text}')]`).click()
})

When('the user selects {string}', async (text) => {
  const element = await $(`aria/${text}`)
  if (!(await element.isSelected())) {
    await element.click()
  }
})

When('the user selects {string} for {string}', async (text, label) => {
  await $(`//label[contains(text(),'${label}')]/following::select`).selectByVisibleText(text)
})

When('(the user )selects the following', async (dataTable) => {
  await Promise.all(await $$(`//input[@type='checkbox' and @checked]`).map(async (e) => await e.click()))
  for (const row of dataTable.raw()) {
    await $(`aria/${row[0]}`).click()
  }
})

When('(the user )continues', async () => {
  await $(`aria/Continue`).click()
})

When('(the user )enters {string} for {string}', async (text, label) => {
  await $(`//label[contains(text(),'${label}')]/following::input[@type='text']`).setValue(text)
})

When('(the user )enters {string} for MultilineTextField {string}', async (text, label) => {
  await $(`//label[contains(text(),'${label}')]/following::textarea`).setValue(text)
})

When('the user enters the following', async (dataTable) => {
  for (const row of dataTable.hashes()) {
    const element = await $(`//label[contains(text(),'${row.FIELD}')]/following::*[name()='input' or name()='select'][1]`)
    const tag = await element.getTagName()
    if (tag === 'select') {
      await element.selectByVisibleText(row.VALUE)
    } else {
      await element.setValue(row.VALUE)
    }
  }
})

When('(the user )confirms and sends', async () => {
  await $(`//button[contains(text(),'Confirm and send')]`).click()
})

When('(the user )selects {string} for AutocompleteField {string}', async (value, label) => {
  const autocompleteField = new AutocompleteField(label)
  await autocompleteField.clear()
  await autocompleteField.select(value)
})

When('(the user )enters the date in a week for DatePartsField {string}', async (id) => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  const datePartsField = new DatePartsField(id)
  await datePartsField.setDateUTC(date)
})

When('(the user )enters month {string} and year {string} for MonthYearField {string}', async (month, year, id) => {
  const monthYearField = new MonthYearField(id)
  await monthYearField.set(month, year)
})

Then('(the user )should see heading {string}', async (text) => {
  if (text.indexOf("'") > -1) {
    text = text.substring(0, text.indexOf("'"))
  }
  await expect($(`//h1[contains(text(),'${text}')]`)).toBeDisplayed()
})

Then('(the user )should see label heading {string}', async (text) => {
  if (text.indexOf("'") > -1) {
    text = text.substring(0, text.indexOf("'"))
  }
  await expect($(`//h1/label[contains(text(),'${text}')]`)).toBeDisplayed()
})

Then('(the user )should (still )be (back )at URL {string}', async (expectedPath) => {
  await expect(browser).toHaveUrl(expect.stringContaining(expectedPath))
})

Then('(the user )should see a/an {string} reference number for their application', async (prefix) => {
  const selector = $('//h1/following-sibling::div[1]/strong')
  await expect(selector).toHaveText(expect.stringContaining(prefix))
})
