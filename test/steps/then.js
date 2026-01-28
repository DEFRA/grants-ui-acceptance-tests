import { Then } from '@wdio/cucumber-framework'
import { analyzeAccessibility } from '../services/accessibility'
import { pollForSuccess } from '../services/polling'
import referenceNumbers from '../services/reference-number-store'
import { transformStepArgument } from '../services/step-argument-transformation'
import AutocompleteField from '../page-objects/auto-complete.field'
import DefraAccountBar from '../page-objects/defra-account-bar'
import SummaryAnswer from '../dto/summary-answer'
import SummaryPage from '../page-objects/summary.page'
import Task from '../dto/task'
import TaskListGroup from '../dto/task-list-group'
import TaskListPage from '../page-objects/task-list.page'
import TaskSummaryAnswer from '../dto/task-summary-answer'
import TaskSummaryPage from '../page-objects/task-summary.page'

Then('the footer should contain the following links', async (dataTable) => {
  for (const row of dataTable.hashes()) {
    const linkText = row.TEXT
    const url = row.URL
    const link = $(`//footer//a[contains(text(),'${linkText}')]`)
    await expect(link).toBeDisplayed()
    if (url) {
      await expect(link).toHaveAttribute('href', url)
    }
  }
})

Then('the page is analyzed for accessibility', async () => {
  await analyzeAccessibility()
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

Then('(the user )should see banner {string}', async (text) => {
  if (text.indexOf("'") > -1) {
    text = text.substring(0, text.indexOf("'"))
  }
  await expect($(`//span[@class='govuk-service-navigation__service-name']/a`)).toHaveText(text)
})

Then('(the user )should see section title {string}', async (text) => {
  if (text.indexOf("'") > -1) {
    text = text.substring(0, text.indexOf("'"))
  }
  await expect($(`//h2[@id='section-title']`)).toHaveText(text)
})

Then('(the user )should (still )be at URL {string}', async (expectedPath) => {
  await expect(browser).toHaveUrl(expect.stringContaining(expectedPath))
})

Then('(the user )should see the following answers', async (dataTable) => {
  const expectedAnswers = []
  let summaryAnswer = {}

  for (const row of dataTable.hashes()) {
    const question = row.QUESTION
    const answer = transformStepArgument(row.ANSWER)

    if (question) {
      summaryAnswer = new SummaryAnswer(question)
      expectedAnswers.push(summaryAnswer)
    }

    if (answer) {
      summaryAnswer.answers.push(answer)
    }
  }

  const actualAnswers = await SummaryPage.answers()
  await expect(actualAnswers).toEqual(expectedAnswers)
})

Then('(the user )should see error {string}', async (text) => {
  await expect($(`//div[@class="govuk-error-summary"]//a[contains(text(),'${text}')]`)).toBeDisplayed()
})

Then('(the user )should see the following errors', async (dataTable) => {
  const expectedErrors = dataTable.raw().map((row) => row[0])
  let actualErrors = []

  await pollForSuccess(async () => {
    // allow time for page to reload and render
    actualErrors = await Promise.all(await $$('//div[@class="govuk-error-summary"]//a').map(async (e) => await e.getText()))
    return actualErrors.length === expectedErrors.length
  })

  await expect(actualErrors).toEqual(expectedErrors)
})

Then('(the user )should see a/an {string} reference number for their application', async (prefix) => {
  const selector = $('//h1/following-sibling::div[1]/strong')
  await expect(selector).toHaveText(expect.stringContaining(prefix))

  referenceNumbers.push(await selector.getText())
})

Then('(the user )should see body {string}', async (text) => {
  await expect($(`//p[@class='govuk-body' and contains(text(),'${text}')]`)).toBeDisplayed()
})

Then('(the user )should see hint {string}', async (text) => {
  await expect($(`//div[@class="govuk-hint" and contains(text(),'${text}')]`)).toBeDisplayed()
})

Then('(the user )should see warning {string}', async (text) => {
  await expect($(`//div[@class='govuk-warning-text']//strong[text()[contains(.,'${text}')]]`)).toBeDisplayed()
})

Then('(the user )should see the following task list', async (dataTable) => {
  const expectedGroups = []
  let group = null

  for (const row of dataTable.raw()) {
    if (!row[0]) {
      continue
    }

    if (!row[1]) {
      group = new TaskListGroup(row[0], [])
      expectedGroups.push(group)
    } else {
      group.tasks.push(new Task(row[0], row[1]))
    }
  }

  const actualGroups = await TaskListPage.groups()
  await expect(actualGroups).toEqual(expectedGroups)
})

Then('(the user )should see the following task summary', async (dataTable) => {
  const expectedAnswers = await Promise.all(
    dataTable.raw().map(async (row) => {
      return new TaskSummaryAnswer(row[0], row[1])
    })
  )
  await expect(expectedAnswers).toEqual(await TaskSummaryPage.answers())
})

Then('(the user )should see {string} as the selected radio option', async (option) => {
  await expect($(`//label[contains(text(),'${option}')]/preceding-sibling::input[@type='radio']`)).toBeSelected()
})

Then('(the user )should see {string} selected for AutocompleteField {string}', async (expectedOption, label) => {
  const autocompleteField = new AutocompleteField(label)
  const actualOption = await autocompleteField.getSelectedOption()
  await expect(actualOption).toEqual(expectedOption)
})

Then('(the user )should see SBI {string} as the logged in organisation', async (expectedSbi) => {
  const actualSbi = await DefraAccountBar.sbi()
  await expect(actualSbi).toEqual(expectedSbi)
})
