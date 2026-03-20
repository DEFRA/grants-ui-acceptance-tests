import SubmittedAnswer from '../dto/submitted-answer'

class PrintSubmittedApplicationPage {
  async referenceNumber() {
    return (await $(`//p[contains(text(),'Application number:')]/strong`).getText()).trim()
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

  async hasConfigurableContent(text) {
    return $(`//*[contains(.,'${text}')]`).isExisting()
  }
}

export default new PrintSubmittedApplicationPage()
