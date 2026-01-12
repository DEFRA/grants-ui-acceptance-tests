import { getBackendAuthorizationToken } from './backend-auth-helper'
import { mintLockToken } from './lock-token'

class Backend {
  async deleteState(crn, sbi, grantCode) {
    const response = await fetch(`${browser.options.baseBackendUrl}/state?sbi=${sbi}&grantCode=${grantCode}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getBackendAuthorizationToken()}`,
        'x-application-lock-owner': mintLockToken(crn, sbi, grantCode)
      }
    })
    await expect(response.status === 200 || response.status === 404).toBe(true)
  }

  async getState(crn, sbi, grantCode) {
    const response = await fetch(`${browser.options.baseBackendUrl}/state?sbi=${sbi}&grantCode=${grantCode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getBackendAuthorizationToken()}`,
        'x-application-lock-owner': mintLockToken(crn, sbi, grantCode)
      }
    })
    await expect(response.status === 200).toBe(true)
    return await response.json()
  }

  async getSubmissions(crn, sbi, grantCode) {
    const response = await fetch(`${browser.options.baseBackendUrl}/submissions?sbi=${sbi}&grantCode=${grantCode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getBackendAuthorizationToken()}`,
        'x-application-lock-owner': mintLockToken(crn, sbi, grantCode)
      }
    })
    await expect(response.status === 200).toBe(true)
    return await response.json()
  }
}

export default new Backend()
