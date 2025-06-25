import { When } from '@wdio/cucumber-framework'
import ScoreResultsPage from '../page-objects/score-results.page'
import TaskListPage from '../page-objects/task-list.page'

When('(the user )clicks on {string}', async (text) => {
  await $(`//*[contains(text(),'${text}')]`).click()
})

When('the user selects {string}', async (text) => {
  const element = await $(`aria/${text}`)
  if (!(await element.isSelected())) {
    await element.click()
  }
})

When('(the user )selects the following', async (dataTable) => {
  for (const row of dataTable.raw()) {
    const element = await $(`aria/${row[0]}`)
    if (!(await element.isSelected())) {
      await element.click()
    }
  }
})

When('(the user )continues', async () => {
  await $(`aria/Continue`).click()
})

When('(the user )confirms and continues', async () => {
  await $(`aria/Confirm and continue`).click()
})

When('(the user )submits their form', async () => {
  await $(`aria/Send`).click()
})

When('(the user )navigates backward', async () => {
  await $(`//a[@class='govuk-back-link']`).click()
})

When('(the user )chooses to change their {string} answer', async (topic) => {
  await ScoreResultsPage.changeAnswerFor(topic)
})

When('(the user )enters {string} for {string}', async (text, label) => {
  await $(`//label[contains(text(),'${label}')]/following::input[@type='text']`).setValue(text)
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

When('(the user )selects task {string}', async (taskName) => {
  await TaskListPage.selectTask(taskName)
})
