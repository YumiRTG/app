import assert from 'node:assert/strict'
import test from 'node:test'
import { createReportHandler } from '../api/player-report.js'
import { createDeliveryHandler } from '../api/player-report-delivery.js'

const ticket = 'a'.repeat(64)
const identity = { email: '143942581338-compute@developer.gserviceaccount.com', email_verified: true }
const mail = { subject: 'Spielermeldung', text: 'Fixture only', messageId: `<${ticket}@reports.dinodominion>` }
async function invoke(handler, body, headers = {}, method = 'POST') {
  const response = { headers: {}, setHeader(key, value) { this.headers[key] = value }, end(value) { this.body = JSON.parse(value) } }
  await handler({ method, body, headers }, response)
  return response
}
const noCall = () => { throw new Error('Unexpected external request') }

test('report proxy rejects non-POST requests', async () => {
  assert.equal((await invoke(createReportHandler(noCall), {}, {}, 'GET')).statusCode, 405)
})
test('report proxy rejects malformed JSON, links and actions without contacting Firebase', async () => {
  for (const body of ['{', { ticket: 'short', action: 'get' }, { ticket, action: 'save' }]) {
    assert.equal((await invoke(createReportHandler(noCall), body)).statusCode, 400)
  }
})
test('report proxy forwards only the bound ticket and report fields', async () => {
  let forwarded
  const handler = createReportHandler(async (url, options) => {
    assert.equal(url, 'https://europe-west1-dinodominion-289b0.cloudfunctions.net/profileReportWeb')
    assert.equal(options.headers['X-Action'], 'report')
    forwarded = JSON.parse(options.body)
    return { status: 200, json: async () => ({ ok: true, reportId: ticket }) }
  })
  const response = await invoke(handler, { action: 'report', ticket, reason: 'spam', comment: 'Fixture', requestId: 'b'.repeat(32), targetId: 'forged', reporterId: 'forged', to: 'forged' })
  assert.deepEqual(Object.keys(forwarded).sort(), ['comment', 'reason', 'requestId', 'ticket'])
  assert.equal(response.statusCode, 200)
  assert.equal(response.headers['Cache-Control'], 'no-store')
})
test('report proxy preserves the global already-reported response', async () => {
  const handler = createReportHandler(async () => ({ status: 409, json: async () => ({ ok: false, error: 'already_reported' }) }))
  const response = await invoke(handler, { ticket, action: 'get' })
  assert.equal(response.statusCode, 409)
  assert.equal(response.body.error, 'already_reported')
})
test('report proxy returns a retryable error on unavailable or invalid upstream responses', async () => {
  for (const request of [async () => { throw new Error('offline') }, async () => ({ json: async () => { throw new Error('not JSON') } })]) {
    assert.deepEqual((await invoke(createReportHandler(request), { ticket, action: 'get' })).body, { ok: false, error: 'service_unavailable' })
  }
})
test('delivery requires POST and bearer identity', async () => {
  const handler = createDeliveryHandler(noCall, noCall)
  assert.equal((await invoke(handler, mail, {}, 'GET')).statusCode, 405)
  assert.equal((await invoke(handler, mail)).statusCode, 401)
})
test('delivery rejects invalid Google tokens without sending mail', async () => {
  const handler = createDeliveryHandler(async () => { throw new Error('invalid signature') }, noCall)
  assert.equal((await invoke(handler, mail, { authorization: 'Bearer invalid' })).statusCode, 403)
})
test('delivery rejects other service accounts and unverified identities', async () => {
  for (const payload of [null, { ...identity, email: 'someone@else.example' }, { ...identity, email_verified: false }, { ...identity, email_verified: 'true' }]) {
    const handler = createDeliveryHandler(async () => payload, noCall)
    assert.equal((await invoke(handler, mail, { authorization: 'Bearer fixture' })).statusCode, 403)
  }
})
test('trusted delivery validates payload and stable message ID', async () => {
  for (const body of [null, '{', { ...mail, messageId: 'arbitrary' }, { ...mail, subject: 'x'.repeat(251) }, { ...mail, text: 'x'.repeat(12001) }]) {
    const handler = createDeliveryHandler(async () => identity, noCall)
    assert.equal((await invoke(handler, body, { authorization: 'Bearer fixture' })).statusCode, 400)
  }
})
test('trusted delivery fixes the recipient and strips unsupported mail headers', async () => {
  let delivered
  const handler = createDeliveryHandler(async () => identity, async value => { delivered = value })
  const response = await invoke(handler, { ...mail, to: 'attacker@example.com', cc: 'attacker@example.com', html: '<script />' }, { authorization: 'Bearer fixture' })
  assert.equal(response.statusCode, 200)
  assert.deepEqual(delivered, { ...mail, to: 'andre.miethke74@gmail.com' })
})
test('provider failure remains retryable without exposing credentials', async () => {
  const handler = createDeliveryHandler(async () => identity, async () => { throw new Error('sensitive provider detail') })
  const response = await invoke(handler, mail, { authorization: 'Bearer fixture' })
  assert.equal(response.statusCode, 503)
  assert.deepEqual(response.body, { ok: false })
})
