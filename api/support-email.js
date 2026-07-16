/**
 * Vercel Serverless — deliver support form to your inbox.
 *
 * Priority:
 *  1) Gmail SMTP  — env GMAIL_USER + GMAIL_APP_PASSWORD  (most reliable)
 *  2) Resend      — env RESEND_API_KEY (+ optional SUPPORT_TO_EMAIL)
 *  3) FormSubmit  — free fallback (needs one-time "Activate Form" email)
 *
 * SUPPORT_TO_EMAIL — inbox (default: andre.miethke74@gmail.com)
 */

import nodemailer from 'nodemailer'

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

function buildText({ name, email, accountId, message, lastQuestion, chatSummary }) {
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
  if (lastQuestion) lines.push('--- Last chat question ---', lastQuestion, '')
  if (chatSummary) lines.push('--- Recent chat ---', chatSummary, '')
  return lines.join('\n')
}

async function sendViaGmail({ to, replyTo, subject, text, fromUser }) {
  const user = clean(process.env.GMAIL_USER, 120) || fromUser
  const pass = clean(process.env.GMAIL_APP_PASSWORD, 120).replace(/\s+/g, '')
  if (!user || !pass) return { ok: false, skip: true }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"Dino Dominion Support" <${user}>`,
    to,
    replyTo,
    subject,
    text,
  })
  return { ok: true, via: 'gmail' }
}

async function sendViaResend({ to, replyTo, subject, text }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, skip: true }

  const upstream = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Dino Dominion Support <onboarding@resend.dev>',
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
  })
  const data = await upstream.json().catch(() => ({}))
  if (!upstream.ok) {
    return {
      ok: false,
      error: data?.message || `Resend error ${upstream.status}`,
    }
  }
  return { ok: true, via: 'resend' }
}

async function sendViaFormSubmit({ to, name, email, subject, text, accountId }) {
  const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`
  const upstream = await fetch(formSubmitUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'https://app-dino-dominion.vercel.app',
      Referer: 'https://app-dino-dominion.vercel.app/',
    },
    body: JSON.stringify({
      name: name || 'Player',
      email,
      _replyto: email,
      _subject: subject,
      message: text,
      accountId: accountId || 'n/a',
      _template: 'table',
      _captcha: 'false',
    }),
  })

  const data = await upstream.json().catch(() => ({}))
  const msg = String(data?.message || data?.error || '')
  const successFlag = data?.success
  const isSuccess =
    successFlag === true ||
    successFlag === 'true' ||
    /thank you|submitted|success/i.test(msg)

  if (isSuccess) return { ok: true, via: 'formsubmit' }

  // First-time setup: FormSubmit emails an activation link (often in spam)
  if (/activat/i.test(msg)) {
    return {
      ok: false,
      needsActivation: true,
      error:
        'FormSubmit needs a one-time activation. Check the support Gmail inbox AND spam for an email from formsubmit.co titled “Activate Form”, then click the link. After that, tickets will arrive normally.',
    }
  }

  // Server-side fetch sometimes blocked
  if (/web server|HTML files/i.test(msg)) {
    return {
      ok: false,
      error: 'Form backend blocked server send. Configure Gmail App Password (see README).',
    }
  }

  if (!upstream.ok) {
    return { ok: false, error: msg || `FormSubmit HTTP ${upstream.status}` }
  }

  return { ok: false, error: msg || 'FormSubmit did not accept the message.' }
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

    // Honeypot
    if (clean(body.website, 200)) {
      return sendJson(res, 200, { ok: true, via: 'honeypot' })
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
    const subject =
      `[Support] ` + (clean(body.subject, 120) || 'Dino Dominion website')
    const text = buildText({
      name,
      email,
      accountId,
      message,
      lastQuestion,
      chatSummary,
    })

    // 1) Gmail SMTP (recommended)
    try {
      const gmail = await sendViaGmail({
        to,
        replyTo: email,
        subject,
        text,
        fromUser: to,
      })
      if (gmail.ok) return sendJson(res, 200, { ok: true, via: gmail.via })
      if (!gmail.skip && gmail.error) {
        console.error('[api/support-email] gmail', gmail.error)
      }
    } catch (err) {
      console.error('[api/support-email] gmail crash', err?.message || err)
    }

    // 2) Resend
    try {
      const resend = await sendViaResend({
        to,
        replyTo: email,
        subject,
        text,
      })
      if (resend.ok) return sendJson(res, 200, { ok: true, via: resend.via })
      if (!resend.skip && resend.error) {
        console.error('[api/support-email] resend', resend.error)
      }
    } catch (err) {
      console.error('[api/support-email] resend crash', err?.message || err)
    }

    // 3) FormSubmit free fallback
    try {
      const fs = await sendViaFormSubmit({
        to,
        name,
        email,
        subject,
        text,
        accountId,
      })
      if (fs.ok) return sendJson(res, 200, { ok: true, via: fs.via })
      if (fs.needsActivation) {
        return sendJson(res, 503, {
          ok: false,
          needsActivation: true,
          error: fs.error,
          code: 'NEEDS_ACTIVATION',
        })
      }
      return sendJson(res, 502, {
        ok: false,
        error: fs.error || 'Email send failed',
        code: 'SEND_FAILED',
      })
    } catch (err) {
      console.error('[api/support-email] formsubmit crash', err?.message || err)
      return sendJson(res, 502, {
        ok: false,
        error: err?.message || 'Email send failed',
        code: 'SEND_FAILED',
      })
    }
  } catch (err) {
    console.error('[api/support-email] crash', err)
    return sendJson(res, 500, {
      error: err?.message || 'Server error',
      code: 'SERVER_ERROR',
    })
  }
}
