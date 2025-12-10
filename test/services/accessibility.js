import AxeBuilder from '@axe-core/webdriverio'
import allureReporter from '@wdio/allure-reporter'

const IGNORED_VIOLATIONS = ['Ensure all page content is contained by landmarks']

export async function analyzeAccessibility() {
  const results = await new AxeBuilder({ client: browser }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()

  allureReporter.addAttachment(`WCAG Analysis`, JSON.stringify(results.violations, null, 2), 'application/json')

  const unexpectedViolations = results.violations.filter((violation) => !IGNORED_VIOLATIONS.includes(violation.description))

  expect(unexpectedViolations).toEqual([])
}
