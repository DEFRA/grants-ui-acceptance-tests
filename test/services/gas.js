import { mockServerClient } from 'mockserver-client'

class Gas {
  async getRequestWithReferenceNumber(referenceNumber) {
    const client = mockServerClient(process.env.MOCKSERVER_HOST, process.env.MOCKSERVER_PORT)
    const requests = await client.retrieveRecordedRequests({
      path: '/grants/[^/]+/applications'
    })
    return requests.find((r) => r.body.json.metadata.clientRef === referenceNumber.toLowerCase())
  }

  async setOneTimeResponse(sbi, httpStatusCode) {
    const client = mockServerClient(process.env.MOCKSERVER_HOST, process.env.MOCKSERVER_PORT)
    await client.mockAnyResponse({
      id: `applications-sbi-${sbi}-${httpStatusCode}`,
      priority: 999,
      httpRequest: {
        method: 'POST',
        path: '/grants/[^/]+/applications',
        body: {
          type: 'JSON',
          json: {
            metadata: {
              sbi: sbi
            }
          }
        }
      },
      httpResponse: {
        statusCode: httpStatusCode
      },
      times: {
        remainingTimes: 1,
        unlimited: false
      }
    })
  }
}

export default new Gas()
