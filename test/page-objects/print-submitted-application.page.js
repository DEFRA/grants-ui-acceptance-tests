import SubmittedAnswer from '../dto/submitted-answer'

class PrintSubmittedApplicationPage {
  async referenceNumber() {
    const selector = `//p[contains(text(),'Application number:')]/strong`
    await $(selector).waitForDisplayed({ timeout: 5000, timeoutMsg: 'Application number element never displayed' })
    return (await $(selector).getText()).trim()
  }

  async sbiNumber() {
    return (await $(`//h2[text()='Application details']/following-sibling::dl//dt[contains(text(), 'SBI number')]/following-sibling::dd`).getText()).trim()
  }

  async submittedAnswers() {
    const submittedAnswers = []

    for (let i = 1; ; i++) {
      if (!(await $(`//h2[text()='Submitted answers']/following-sibling::dl/div[${i}]`).isExisting())) {
        break
      }

      const question = (await $(`//h2[text()='Submitted answers']/following-sibling::dl/div[${i}]/dt`).getText()).trim()
      const answer = (await $(`//h2[text()='Submitted answers']/following-sibling::dl/div[${i}]/dd[1]`).getText()).trim()
      submittedAnswers.push(new SubmittedAnswer(question, answer))
    }

    return submittedAnswers
  }
}

export default new PrintSubmittedApplicationPage()
