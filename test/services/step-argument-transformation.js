import { world } from '@wdio/cucumber-framework'

export function transformStepArgument(value) {
  if (value === '{DATE IN A WEEK}') {
    const date = new Date()
    date.setDate(date.getUTCDate() + 7)
    return `${date.getUTCDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getUTCFullYear()}`
  }
  if (value === '{REFERENCE NUMBER}') {
    if (!world.referenceNumber) {
      throw new Error('world.referenceNumber not set by earlier step')
    }
    return world.referenceNumber
  }

  return value
}
