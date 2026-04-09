// Early-access form backend for datashuttle.ai.
//
// Exposes POST /api/early-access. Validates the submitted email and relays
// the submission to hello@datashuttle.ai via the Resend API. Nginx in front
// of the static site proxies /api/ to this process (default port 3001).
//
// Env:
//   PORT             — listen port (default 3001)
//   RESEND_API_KEY   — Resend API key (required)
//   RESEND_FROM      — verified sender address (default "DataShuttle <noreply@datashuttle.ai>")
//   RESEND_TO        — recipient address (default "hello@datashuttle.ai")

import http from 'node:http'
import { Resend } from 'resend'

const PORT = Number(process.env.PORT ?? 3001)
const API_KEY = process.env.RESEND_API_KEY
const FROM = process.env.RESEND_FROM ?? 'DataShuttle <noreply@datashuttle.ai>'
const TO = process.env.RESEND_TO ?? 'hello@datashuttle.ai'

if (!API_KEY) {
  console.error('[early-access] RESEND_API_KEY is not set; refusing to start')
  process.exit(1)
}

const resend = new Resend(API_KEY)

// RFC 5322-lite. Keeps false positives low without pulling a full parser.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Cache-Control': 'no-store',
  })
  res.end(payload)
}

async function readJsonBody(req, limit = 4 * 1024) {
  return await new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(new Error('payload too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('invalid json'))
      }
    })
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  // Nginx strips nothing — we see the full /api/early-access path.
  if (req.method === 'GET' && (req.url === '/health' || req.url === '/api/health')) {
    return json(res, 200, { ok: true })
  }

  if (req.url !== '/api/early-access' && req.url !== '/early-access') {
    return json(res, 404, { error: 'not_found' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'method_not_allowed' })
  }

  let body
  try {
    body = await readJsonBody(req)
  } catch (err) {
    return json(res, 400, { error: 'bad_request', detail: err.message })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json(res, 400, { error: 'invalid_email' })
  }

  const ip = req.headers['x-real-ip'] ?? req.socket.remoteAddress ?? 'unknown'
  const ua = req.headers['user-agent'] ?? 'unknown'

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Early access request: ${email}`,
      text: [
        `New early-access request.`,
        ``,
        `Email: ${email}`,
        `IP:    ${ip}`,
        `UA:    ${ua}`,
        `Time:  ${new Date().toISOString()}`,
      ].join('\n'),
    })
    if (error) {
      console.error('[early-access] resend error', error)
      return json(res, 502, { error: 'email_failed' })
    }
  } catch (err) {
    console.error('[early-access] resend threw', err)
    return json(res, 502, { error: 'email_failed' })
  }

  return json(res, 200, { ok: true })
})

server.listen(PORT, () => {
  console.log(`[early-access] listening on :${PORT}`)
})
