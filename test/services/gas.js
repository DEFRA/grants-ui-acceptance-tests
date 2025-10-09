import { mockServerClient } from 'mockserver-client'

class Gas {
  async getRequestWithReferenceNumber(referenceNumber) {
    const client = mockServerClient(process.env.MOCKSERVER_HOST, process.env.MOCKSERVER_PORT)
    const requests = await client.retrieveRecordedRequests({
      path: '/grants/[^/]+/applications'
    })
    return requests.find((r) => r.body.json.metadata.clientRef === referenceNumber.toLowerCase())
  }
}

export default new Gas()
