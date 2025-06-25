import TaskSummaryAnswer from '../dto/task-summary-answer'

class TaskSummaryPage {
  async groupName() {
    return (await $(`//h2[@class='govuk-heading-m']`).getText()).trim()
  }

  async answers() {
    return await Promise.all(
      await $$(`//dl[@class='govuk-summary-list']/div`).map(async (e) => {
        return new TaskSummaryAnswer((await e.$('dt').getText()).trim(), (await e.$$('dd')[0].getText()).trim())
      })
    )
  }
}

export default new TaskSummaryPage()
