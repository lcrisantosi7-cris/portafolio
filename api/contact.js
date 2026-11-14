/* global process */
// Función serverless de Vercel. La API key vive SOLO aquí, en variables de entorno.
import { buildNotificationHtml, buildConfirmationHtml } from '../src/lib/emailTemplates.js'

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'
const NOTIFY_TO = process.env.CONTACT_TO || 'lcrisantosi7@gmail.com'
const SENDER_EMAIL = process.env.CONTACT_SENDER || 'lcrisantosi7@gmail.com'
const SENDER_NAME = 'LC.dev'

const MAX_LEN = 2000
const PROJECT_TYPES = ['Oportunidad laboral', 'Backend & APIs', 'Full Stack', 'Visión por computadora', 'Otro']

const DEFAULT_ORIGINS = ['https://luis-crisanto.vercel.app', 'http://localhost:5173', 'http://localhost:3000']
const ALLOWED_ORIGINS = [
    ...DEFAULT_ORIGINS,
    ...String(process.env.ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
]

// Límite básico por instancia. Para límites globales, usar Redis/KV o un WAF.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_IP = 3
const MAX_PER_EMAIL = 2
const hits = new Map()

const isLimited = (key, max) => {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS)

    // Purgar claves caducadas sin vaciar el mapa completo ni reiniciar límites.
    if (hits.size > 4500) {
        for (const [storedKey, timestamps] of hits) {
            const active = timestamps.filter((time) => now - time < WINDOW_MS)
            if (active.length) hits.set(storedKey, active)
            else hits.delete(storedKey)
            if (hits.size <= 4000) break
        }
    }

    if (recent.length >= max) {
        hits.set(key, recent)
        return true
    }
    if (!hits.has(key) && hits.size >= 5000) return true

    recent.push(now)
    hits.set(key, recent)
    return false
}

const clean = (value, max = MAX_LEN) =>
    String(value ?? '')
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/[<>]/g, '')
        .trim()
        .slice(0, max)

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

const getIp = (req) =>
    String(req.headers['x-vercel-forwarded-for'] ?? req.headers['x-real-ip'] ?? req.headers['x-forwarded-for'] ?? '')
        .split(',')[0]
        .trim() ||
    req.socket?.remoteAddress ||
    'unknown'

const fail = (res, status, code, error) => res.status(status).json({ ok: false, code, error })

async function sendBrevo(apiKey, { to, subject, html, replyTo }) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 10_000)
    try {
        const res = await fetch(BREVO_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json', 'api-key': apiKey },
            body: JSON.stringify({
                sender: { name: SENDER_NAME, email: SENDER_EMAIL },
                to: [{ email: to }],
                ...(replyTo ? { replyTo } : {}),
                subject,
                htmlContent: html,
            }),
            signal: ctrl.signal,
        })
        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err.message || `Brevo error ${res.status}`)
        }
    } finally {
        clearTimeout(timer)
    }
}

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('X-Content-Type-Options', 'nosniff')

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return fail(res, 405, 'method', 'Método no permitido.')
    }

    const origin = req.headers.origin
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
        return fail(res, 403, 'origin', 'Origen no permitido.')
    }

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
        console.error('[contact] Falta la variable BREVO_API_KEY')
        return fail(res, 500, 'config', 'El servicio de correo no está configurado.')
    }

    const contentLength = Number(req.headers['content-length'] ?? 0)
    if (Number.isFinite(contentLength) && contentLength > 12_000) {
        return fail(res, 413, 'too_large', 'El mensaje supera el tamaño permitido.')
    }

    let body = req.body
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body)
        } catch {
            body = null
        }
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return fail(res, 400, 'bad_request', 'Solicitud inválida.')
    }

    if (body.company) return res.status(200).json({ ok: true })

    if (typeof body.name !== 'string' || typeof body.email !== 'string' || typeof body.message !== 'string') {
        return fail(res, 400, 'bad_request', 'Completa los campos requeridos.')
    }

    const name = clean(body.name, 100).replace(/\s+/g, ' ')
    const email = clean(body.email, 200)
    const type = typeof body.type === 'string' && PROJECT_TYPES.includes(body.type) ? body.type : ''
    const message = clean(body.message)

    if (!name) return fail(res, 400, 'name', 'Escribe tu nombre.')
    if (name.length < 2) return fail(res, 400, 'name', 'El nombre debe tener al menos 2 caracteres.')
    if (!isValidEmail(email) || email.length > 200) return fail(res, 400, 'email', 'El correo no parece válido.')
    if (message.length < 10) return fail(res, 400, 'message', 'Cuéntame un poco más en el mensaje.')
    if (message.length > MAX_LEN) return fail(res, 400, 'message', 'El mensaje supera el límite permitido.')

    if (hits.size > 5000) {
        // Se ejecuta también antes de registrar nuevas claves para evitar crecimiento ilimitado.
        for (const [storedKey, timestamps] of hits) {
            const active = timestamps.filter((time) => Date.now() - time < WINDOW_MS)
            if (active.length) hits.set(storedKey, active)
            else hits.delete(storedKey)
            if (hits.size <= 4000) break
        }
    }

    if (isLimited(`ip:${getIp(req)}`, MAX_PER_IP) || isLimited(`em:${email.toLowerCase()}`, MAX_PER_EMAIL)) {
        res.setHeader('Retry-After', String(WINDOW_MS / 1000))
        return fail(res, 429, 'rate_limited', 'Demasiados mensajes seguidos. Intenta de nuevo en unos minutos.')
    }

    const fullMessage = type ? `Tipo de mensaje: ${type}\n\n${message}` : message

    try {
        await sendBrevo(apiKey, {
            to: NOTIFY_TO,
            subject: `📬 Nuevo mensaje de ${name}`,
            html: buildNotificationHtml(name, email, fullMessage),
            replyTo: { email, name },
        })
    } catch (err) {
        console.error('[contact] Falló la notificación:', err.message)
        return fail(res, 502, 'send_failed', 'No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.')
    }

    try {
        await sendBrevo(apiKey, {
            to: email,
            subject: `¡Gracias por escribirme, ${name}! — LC.dev`,
            html: buildConfirmationHtml(name),
        })
    } catch (err) {
        console.error('[contact] Falló la confirmación:', err.message)
    }

    return res.status(200).json({ ok: true })
}
