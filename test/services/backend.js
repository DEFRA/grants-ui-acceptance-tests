import { getBackendAuthorizationToken } from './backend-auth-helper'

class Backend {
  async delete(sbi, grantCode) {
    const response = await fetch(`${browser.options.baseBackendUrl}/state?sbi=${sbi}&grantCode=${grantCode}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getBackendAuthorizationToken()}`
      }
    })
    await expect(response.status === 200 || response.status === 404).toBe(true)
  }

  async get(sbi, grantCode) {
    const response = await fetch(`${browser.options.baseBackendUrl}/state?sbi=${sbi}&grantCode=${grantCode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getBackendAuthorizationToken()}`
      }
    })
    await expect(response.status === 200).toBe(true)
    return await response.json()
  }
}

export default new Backend()
