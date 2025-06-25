import { Then } from '@wdio/cucumber-framework'
import { pollForSuccess } from '../services/polling'
import ScoreResult from '../dto/score-result'
import ScoreResultsPage from '../page-objects/score-results.page'
import SummaryAnswer from '../dto/summary-answer'
import SummaryPage from '../page-objects/summary.page'
import Task from '../dto/task'
import TaskListGroup from '../dto/task-list-group'
import TaskListPage from '../page-objects/task-list.page'
import TaskSummaryAnswer from '../dto/task-summary-answer'
import TaskSummaryPage from '../page-objects/task-summary.page'

Then('(the user )should see heading {string}', async (text) => {
  if (text.indexOf("'") > -1) {
    text = text.substring(0, text.indexOf("'"))
  }
  await expect($(`//h1[contains(text(),'${text}')]`)).toBeDisplayed()
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

Then('(the user )should be at URL {string}', async (expectedPath) => {
  await expect(browser).toHaveUrl(expect.stringContaining(expectedPath))
})

Then('(the user )should see the following answers', async (dataTable) => {
  const expectedAnswers = []
  for (const row of dataTable.hashes()) {
    expectedAnswers.push(new SummaryAnswer(row.QUESTION, row.ANSWER))
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

Then('(the user )should see {string} for their project score', async (expectedScore) => {
  const actualScore = await ScoreResultsPage.score()
  await expect(actualScore).toEqual(expectedScore)
})

Then('(the user )should see the following score results', async (dataTable) => {
  const expectedScoreResults = []
  let scoreResult = {}

  for (const row of dataTable.hashes()) {
    const topic = row.TOPIC
    const answer = row.ANSWERS
    const score = row.SCORE
    const fundingPriority = row['FUNDING PRIORITIES']

    if (topic || score) {
      // allow for lack of topic, to be fixed in TGC-659
      scoreResult = new ScoreResult(topic, [], score, [])
      expectedScoreResults.push(scoreResult)
    }

    if (answer) {
      scoreResult.answers.push(answer)
    }

    if (fundingPriority) {
      scoreResult.fundingPriorities.push(fundingPriority)
    }
  }

  const actualScoreResults = await ScoreResultsPage.results()
  await expect(actualScoreResults).toEqual(expectedScoreResults)
})

Then('(the user )should see a/an {string} reference number for their application', async (prefix) => {
  const selector = $('//h1/following-sibling::div[1]/strong')
  await expect(selector).toHaveText(expect.stringContaining(prefix))
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
