import { mockServerClient } from 'mockserver-client'

class Gas {
  async getApplicationSubmission(referenceNumber) {
    const client = mockServerClient(process.env.MOCKSERVER_HOST, process.env.MOCKSERVER_PORT)
    const requests = await client.retrieveRecordedRequests({
      path: '/grants/[^/]+/applications'
    })
    return requests.find((r) => r.body.json.metadata.clientRef === referenceNumber.toLowerCase())
  }

  async setApplicationSubmissionResponse(sbi, httpStatusCode, errorText) {
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
        statusCode: httpStatusCode,
        body: {
          type: "JSON",
          json: {
            error: errorText
          }
        }
      },
      times: {
        remainingTimes: 1,
        unlimited: false
      }
    })
  }

  async setStatusQueryResponse(referenceNumber, gasStatus) {
    const client = mockServerClient(process.env.MOCKSERVER_HOST, process.env.MOCKSERVER_PORT)
    await client.mockAnyResponse({
      id: `applications-${referenceNumber}-status`,
      priority: 999,
      httpRequest: {
        method: 'GET',
        path: `/grants/[^/]+/applications/${referenceNumber.toLowerCase()}/status`
      },
      httpResponse: {
        statusCode: 200,
        body: {
          type: "JSON",
          json: {
            status: gasStatus
          }
        }
      },
      times: {
        remainingTimes: 1,
        unlimited: false
      }
    })
  }
}

export default new Gas()
