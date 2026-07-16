/**
 * Vercel Serverless Function — Support chat via xAI (SpaceXAI / Grok)
 * Env: XAI_API_KEY (set in Vercel → Settings → Environment Variables)
 */

const SYSTEM_PROMPT = `You are Dominion Support, the helpful assistant for the mobile game Dino Dominion and its official website.

Tone: friendly, short, clear. English by default; reply in German if the user writes German.

You help with:
- Android APK download & install (large file, Wi‑Fi recommended, unknown sources)
- Account ID login on the website (no password; ID from game Settings; commander name loads from cloud)
- Daily login rewards & roulette (speed ups; sync to game inventory when the app is open)
- Game basics: build base, heroes (Nyra Vale), dinos, troops, campaign, alliances
- Community: Discord/Forum may be "coming soon" if not linked yet

Rules:
- Do NOT invent store links, official Discord invites, or account passwords.
- Do NOT claim you can create game accounts on the website.
- Keep answers under ~120 words unless the user asks for detail.
- If unsure, say so and suggest Download, Play, Features, or Bestiary pages.
`

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    return res.status(503).json({
      error: 'AI not configured',
      code: 'NO_API_KEY',
    })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const incoming = Array.isArray(body.messages) ? body.messages : []

    // Sanitize / limit conversation
    const messages = incoming
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-12)
      .map((m) => ({
        role: m.role,
        content: m.content.trim().slice(0, 2000),
      }))

    if (messages.length === 0) {
      return res.status(400).json({ error: 'No messages' })
    }

    const last = messages[messages.length - 1]
    if (last.role !== 'user') {
      return res.status(400).json({ error: 'Last message must be from user' })
    }

    const payload = {
      model: 'grok-4.5',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.6,
      max_tokens: 450,
    }

    const upstream = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await upstream.json().catch(() => ({}))

    if (!upstream.ok) {
      const msg =
        data?.error?.message ||
        data?.error ||
        `xAI error ${upstream.status}`
      return res.status(upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502).json({
        error: String(msg),
        code: 'XAI_ERROR',
      })
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      'Sorry, I could not generate a reply. Please try again.'

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('[api/chat]', err)
    return res.status(500).json({
      error: err?.message || 'Server error',
      code: 'SERVER_ERROR',
    })
  }
}
