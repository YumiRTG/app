const ENDPOINT = 'https://europe-west1-dinodominion-289b0.cloudfunctions.net/profileReportWeb'

export function createReportHandler(request = fetch) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Content-Type', 'application/json')
    const reply = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)) }
    if (req.method !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' })
    let body
    try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body } catch { return reply(400, { ok: false, error: 'invalid_report_link' }) }
    if (!body || !/^[a-f0-9]{64}$/.test(body.ticket ?? '') || !['get', 'report'].includes(body.action))
      return reply(400, { ok: false, error: 'invalid_report_link' })
    try {
      const upstream = await request(ENDPOINT, {
        method: 'POST', signal: AbortSignal.timeout(25000),
        headers: { 'Content-Type': 'application/json', 'X-Action': body.action },
        body: JSON.stringify({ ticket: body.ticket, reason: body.reason, comment: body.comment, requestId: body.requestId }),
      })
      const data = await upstream.json()
      return reply(upstream.status, data)
    } catch { return reply(503, { ok: false, error: 'service_unavailable' }) }
  }
}
export default createReportHandler()
