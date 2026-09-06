import { OAuth2Client } from 'google-auth-library'
import { sendViaGmail, sendViaResend } from './support-email.js'

const AUDIENCE = 'https://app-dino-dominion.vercel.app/api/player-report-delivery'
const SERVICE_ACCOUNT = '143942581338-compute@developer.gserviceaccount.com'
const RECIPIENT = 'andre.miethke74@gmail.com'
const verifier = new OAuth2Client()

async function verifyToken(token) {
  const ticket = await verifier.verifyIdToken({ idToken: token, audience: AUDIENCE })
  return ticket.getPayload()
}
async function sendMail(mail) {
  const result = process.env.GMAIL_USER || process.env.GMAIL_APP_PASSWORD
    ? await sendViaGmail(mail) : await sendViaResend(mail)
  if (!result.ok) throw new Error('mail_provider_unavailable')
}

// Only the game's Google-signed service identity can use this existing mail delivery account.
export function createDeliveryHandler(verify = verifyToken, deliver = sendMail) {
  return async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    const reply = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)) }
    if (req.method !== 'POST') return reply(405, { ok: false })
    const bearer = /^Bearer (\S+)$/.exec(req.headers.authorization ?? '')
    if (!bearer) return reply(401, { ok: false })
    let identity
    try { identity = await verify(bearer[1]) } catch { return reply(403, { ok: false }) }
    if (identity?.email !== SERVICE_ACCOUNT || identity.email_verified !== true) return reply(403, { ok: false })
    let body
    try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body } catch { return reply(400, { ok: false }) }
    if (!body || typeof body.subject !== 'string' || body.subject.length > 250 ||
        typeof body.text !== 'string' || body.text.length > 12000 ||
        !/^<[a-f0-9]{64}@reports\.dinodominion>$/.test(body.messageId ?? '')) return reply(400, { ok: false })
    try {
      await deliver({ to: RECIPIENT, subject: body.subject, text: body.text, messageId: body.messageId })
      return reply(200, { ok: true })
    } catch (error) {
      console.error('[player-report-delivery]', error?.code || 'delivery_failed')
      return reply(503, { ok: false })
    }
  }
}
export default createDeliveryHandler()
