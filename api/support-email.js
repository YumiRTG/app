/**
 * Vercel Serverless — send support form to your inbox.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   SUPPORT_TO_EMAIL   required — your inbox (e.g. you@gmail.com)
 *   RESEND_API_KEY     optional — if set, send via Resend (recommended)
 *
 * Without RESEND_API_KEY, uses FormSubmit.co (free). First message ever
 * sent to a new address needs a one-time confirmation click in your inbox.
 */

const DEFAULT_TO = 'andre.miethke74@gmail.com'

function sendJson(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.end(JSON.stringify(data))
}

function parseBody(req) {
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}')
    } catch {
      return null
    }
  }
  if (!body || typeof body !== 'object') return {}
  return body
}

function clean(str, max) {
  return String(str ?? '')
    .trim()
    .slice(0, max)
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export default async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      return res.end()
    }

    if (req.method !== 'POST') {
      return sendJson(res, 405, { error: 'Method not allowed' })
    }

    const body = parseBody(req)
    if (body === null) {
      return sendJson(res, 400, { error: 'Invalid JSON body' })
    }

    // Honeypot — bots fill this; humans never see it
    if (clean(body.website, 200)) {
      return sendJson(res, 200, { ok: true })
    }

    const name = clean(body.name, 80)
    const email = clean(body.email, 120).toLowerCase()
    const accountId = clean(body.accountId, 80)
    const message = clean(body.message, 4000)
    const lastQuestion = clean(body.lastQuestion, 1000)
    const chatSummary = clean(body.chatSummary, 3000)

    if (!email || !isEmail(email)) {
      return sendJson(res, 400, { error: 'A valid email is required so we can reply.' })
    }
    if (!message || message.length < 5) {
      return sendJson(res, 400, { error: 'Please describe your issue (at least a few words).' })
    }

    const to = clean(process.env.SUPPORT_TO_EMAIL, 120) || DEFAULT_TO
    const subject = clean(body.subject, 120) || 'Dino Dominion — Support request'
    const lines = [
      'New support request from the website chat',
      '========================================',
      '',
      `From name:  ${name || '(not given)'}`,
      `Reply-to:   ${email}`,
      `Account ID: ${accountId || '(not given)'}`,
      `Time (UTC): ${new Date().toISOString()}`,
      '',
      '--- Message ---',
      message,
      '',
    ]
    if (lastQuestion) {
      lines.push('--- Last chat question ---', lastQuestion, '')
    }
    if (chatSummary) {
      lines.push('--- Recent chat ---', chatSummary, '')
    }
    const text = lines.join('\n')

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const upstream = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Dino Dominion Support <onboarding@resend.dev>',
          to: [to],
          reply_to: email,
          subject: `[Support] ${subject}`,
          text,
        }),
      })
      const data = await upstream.json().catch(() => ({}))
      if (!upstream.ok) {
        console.error('[api/support-email] Resend error', upstream.status, data)
        return sendJson(res, 502, {
          error: data?.message || `Email provider error (${upstream.status})`,
          code: 'RESEND_ERROR',
        })
      }
      return sendJson(res, 200, { ok: true, via: 'resend' })
    }

    // Free fallback: FormSubmit (no API key). Activate once via email link.
    const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`
    const upstream = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: name || 'Player',
        email,
        _replyto: email,
        _subject: `[Support] ${subject}`,
        message: text,
        accountId: accountId || 'n/a',
        _template: 'table',
        _captcha: 'false',
      }),
    })

    const data = await upstream.json().catch(() => ({}))
    if (!upstream.ok) {
      console.error('[api/support-email] FormSubmit error', upstream.status, data)
      return sendJson(res, 502, {
        error:
          data?.message ||
          'Could not send email. If this is the first time, check the support inbox for a FormSubmit activation link.',
        code: 'FORMSUBMIT_ERROR',
      })
    }

    return sendJson(res, 200, { ok: true, via: 'formsubmit' })
  } catch (err) {
    console.error('[api/support-email] crash', err)
    return sendJson(res, 500, {
      error: err?.message || 'Server error',
      code: 'SERVER_ERROR',
    })
  }
}
