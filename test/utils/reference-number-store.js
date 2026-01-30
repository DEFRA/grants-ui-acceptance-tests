import { world } from '@wdio/cucumber-framework'

class ReferenceNumberStore {
  get current() {
    const refs = world.referenceNumbers || []
    return refs[refs.length - 1]
  }

  get first() {
    return world.referenceNumbers?.[0]
  }

  push(referenceNumber) {
    world.referenceNumbers = world.referenceNumbers || []
    world.referenceNumbers.push(referenceNumber)
  }
}

export default new ReferenceNumberStore()
