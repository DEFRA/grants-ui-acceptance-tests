import AxeBuilder from '@axe-core/webdriverio'
import allureReporter from '@wdio/allure-reporter'

export async function analyzeAccessibility() {
  const results = await new AxeBuilder({ client: browser }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()

  const url = await browser.getUrl()
  const pageName = url.split('/').filter(Boolean).pop()

  if (results.violations.length > 0) {
    allureReporter.addAttachment(`${pageName}-violations`, JSON.stringify(results.violations, null, 2), 'application/json')
  }

  const wcagViolations = results.violations.filter((violation) => violation.tags.some((tag) => tag.startsWith('wcag')))

  expect(wcagViolations).toEqual([])
}
