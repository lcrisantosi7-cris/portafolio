import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import useReveal from '../hooks/useReveal'
import { links } from '../data/links'
import LocalTime from '../components/LocalTime'

const ENDPOINT = '/api/contact'
const MAX_LEN = 2000
const COOLDOWN_KEY = 'lux-contact-last'
const COOLDOWN_MS = 60_000

// Los valores deben coincidir con PROJECT_TYPES de api/contact.js
const TYPES = [
    { value: 'Oportunidad laboral', key: 'job' },
    { value: 'Backend & APIs', key: 'backend' },
    { value: 'Full Stack', key: 'fullstack' },
    { value: 'Visión por computadora', key: 'vision' },
    { value: 'Otro', key: 'other' },
]

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

async function sendMessage(payload) {
    let res
    try {
        res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
    } catch {
        throw Object.assign(new Error('offline'), { code: 'offline' })
    }

    const data = await res.json().catch(() => null)

    // Solo hay éxito si el backend lo confirma explícitamente
    if (res.ok && data?.ok === true) return

    throw Object.assign(new Error('failed'), {
        code: data?.code ?? (data ? 'send_failed' : 'unavailable'),
    })
}


function ContactCard() {
    const { t } = useTranslation()
    const [copied, setCopied] = useState(false)
    const timer = useRef(null)

    useEffect(() => () => clearTimeout(timer.current), [])

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(links.email)
            setCopied(true)
            clearTimeout(timer.current)
            timer.current = setTimeout(() => setCopied(false), 2000)
        } catch {
            window.location.href = `mailto:${links.email}`
        }
    }

    const row =
        'group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:ring-flame-500/40'

    return (
        <aside data-reveal className="self-start overflow-hidden rounded-3xl bg-navy-900/60 ring-1 ring-white/10">
            <div
                aria-hidden="true"
                className="relative h-28"
                style={{
                    background: 'radial-gradient(120% 160% at 85% 130%, #ffd9a3 0%, #ff6a13 32%, #b53209 62%, #3a1019 100%)',
                }}
            >
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
                        backgroundSize: '16px 16px',
                    }}
                />
            </div>

            <div className="px-6 pb-6">
                <div className="-mt-12 flex items-end gap-4">
                    <img
                        src="/assets/images/luis-cutout.webp"
                        alt=""
                        width="96"
                        height="96"
                        className="size-24 shrink-0 rounded-full bg-navy-800 object-cover object-top ring-4 ring-navy-900"
                    />
                    <div className="pb-1">
                        <p className="font-display text-xl font-bold leading-tight">Luis Crisanto</p>
                        <p className="text-sm text-cream-100/70">{t('contact.card.role')}</p>
                    </div>
                </div>

                <ul className="mt-6 space-y-2.5">
                    <li data-reveal className={row}>
                        <a href={`mailto:${links.email}`} className="min-w-0 break-all text-sm hover:text-flame-400">
                            {links.email}
                        </a>
                        <button
                            type="button"
                            onClick={copy}
                            aria-label={t('contact.copyAria')}
                            aria-live="polite"
                            className="shrink-0 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cream-100/80 ring-1 ring-white/20 transition-colors hover:ring-flame-500"
                        >
                            {copied ? t('contact.copied') : t('contact.copy')}
                        </button>
                    </li>
                    {[
                        { name: 'LinkedIn', url: links.linkedin },
                        { name: 'GitHub', url: links.github },
                    ].map((item) => (
                        <li key={item.name} data-reveal>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className={row}>
                                <span className="text-sm">{item.name}</span>
                                <span
                                    aria-hidden="true"
                                    className="text-cream-100/50 transition-transform group-hover:translate-x-0.5 group-hover:text-flame-400"
                                >
                                    ↗
                                </span>
                            </a>
                        </li>
                    ))}
                    <li
                        data-reveal
                        className="flex items-center justify-between px-4 pt-2 font-mono text-xs uppercase tracking-[0.2em] text-cream-100/60"
                    >
                        <span>{t('contact.localTime')}</span>
                        <LocalTime />
                    </li>
                </ul>

                {links.cv && (
                    <a
                        href={links.cv}
                        download
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium ring-1 ring-white/25 transition-colors hover:bg-white/10"
                    >
                        {t('contact.cv')}
                    </a>
                )}
            </div>
        </aside>
    )
}

const inputCls = (bad) =>
    `w-full rounded-xl bg-navy-900/70 px-4 py-3 text-cream-100 outline-none ring-1 transition placeholder:text-cream-100/35 focus:ring-2 focus:ring-flame-500 disabled:opacity-60 ${bad ? 'ring-red-400/70' : 'ring-white/10'
    }`

function Field({ id, label, error, right, children }) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.2em] text-cream-100/60">
                    {label}
                </label>
                {right}
            </div>
            {children}
            {error && (
                <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-red-300">
                    {error}
                </p>
            )}
        </div>
    )
}

export default function Contact() {
    const { t } = useTranslation()
    const root = useRef(null)
    const doneRef = useRef(null)

    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [type, setType] = useState('')
    const [hp, setHp] = useState('')
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errorCode, setErrorCode] = useState('')
    const [touched, setTouched] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useReveal(root)

    const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
    const touch = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }))

    const errors = {
        name: form.name.trim() ? '' : t('contact.errors.name'),
        email: !form.email.trim()
            ? t('contact.errors.emailEmpty')
            : isValidEmail(form.email)
                ? ''
                : t('contact.errors.email'),
        message: form.message.trim().length < 10 ? t('contact.errors.message') : '',
    }
    const showErr = (field) => (touched[field] || submitted ? errors[field] : '')

    const reset = () => {
        setForm({ name: '', email: '', message: '' })
        setType('')
        setTouched({})
        setSubmitted(false)
        setErrorCode('')
        setStatus('idle')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (status === 'loading') return

        setSubmitted(true)
        if (errors.name || errors.email || errors.message) return

        // Campo trampa lleno: es un bot, se descarta en silencio
        if (hp) {
            setStatus('success')
            return
        }

        try {
            const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
            if (Date.now() - last < COOLDOWN_MS) {
                setErrorCode('cooldown')
                setStatus('error')
                return
            }
        } catch {
            /* almacenamiento no disponible */
        }

        setStatus('loading')
        setErrorCode('')

        try {
            await sendMessage({
                name: form.name,
                email: form.email,
                message: form.message,
                type,
                company: hp,
            })
            try {
                localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
            } catch {
                /* almacenamiento no disponible */
            }
            setStatus('success')
            setTimeout(() => doneRef.current?.focus(), 0)
        } catch (err) {
            setErrorCode(err.code ?? 'generic')
            setStatus('error')
        }
    }

    const loading = status === 'loading'
    const left = MAX_LEN - form.message.length
    const errorText = errorCode
        ? t(`contact.errors.${errorCode}`, { defaultValue: t('contact.errors.generic') })
        : ''

    return (
        <>
            <PageMeta title={t('nav.contact')} description={t('contact.metaDescription')} />
            <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')}>
                {t('contact.lead')}
            </PageHero>

            <div ref={root} className="mx-auto grid max-w-7xl gap-14 px-6 pb-28 lg:grid-cols-[340px_1fr] lg:gap-20">
                <ContactCard />

                <section data-reveal>
                    {status === 'success' ? (
                        <div role="status" className="rounded-3xl bg-navy-900/60 p-8 ring-1 ring-flame-500/40 md:p-12">
                            <h2
                                ref={doneRef}
                                tabIndex={-1}
                                className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-flame-gradient text-[length:clamp(2.5rem,6vw,4.5rem)] outline-none"
                            >
                                {t('contact.success.title')}
                            </h2>
                            <p className="mt-5 max-w-lg text-lg text-cream-100/80">{t('contact.success.text')}</p>
                            <button
                                type="button"
                                onClick={reset}
                                className="mt-8 rounded-full px-6 py-3 text-sm ring-1 ring-white/25 transition-colors hover:bg-white/10"
                            >
                                {t('contact.success.again')}
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="relative space-y-6 rounded-3xl bg-navy-900/40 p-6 ring-1 ring-white/10 md:p-10"
                        >
                            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                                <label>
                                    Company
                                    <input name="company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                                </label>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <Field id="name" label={t('contact.form.name')} error={showErr('name')}>
                                    <input
                                        id="name"
                                        autoComplete="name"
                                        value={form.name}
                                        onChange={update('name')}
                                        onBlur={touch('name')}
                                        disabled={loading}
                                        aria-invalid={!!showErr('name')}
                                        aria-describedby={showErr('name') ? 'name-err' : undefined}
                                        placeholder={t('contact.form.namePh')}
                                        className={inputCls(showErr('name'))}
                                    />
                                </Field>
                                <Field id="email" label={t('contact.form.email')} error={showErr('email')}>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={update('email')}
                                        onBlur={touch('email')}
                                        disabled={loading}
                                        aria-invalid={!!showErr('email')}
                                        aria-describedby={showErr('email') ? 'email-err' : undefined}
                                        placeholder={t('contact.form.emailPh')}
                                        className={inputCls(showErr('email'))}
                                    />
                                </Field>
                            </div>

                            <div>
                                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cream-100/60">
                                    {t('contact.form.type')}
                                </p>
                                <div role="group" aria-label={t('contact.form.typeAria')} className="flex flex-wrap gap-2">
                                    {TYPES.map((item) => (
                                        <button
                                            key={item.key}
                                            type="button"
                                            aria-pressed={type === item.value}
                                            disabled={loading}
                                            onClick={() => setType(type === item.value ? '' : item.value)}
                                            className={`rounded-full px-4 py-2 text-sm ring-1 transition-colors ${type === item.value
                                                ? 'bg-flame-500 text-navy-950 ring-flame-500'
                                                : 'text-cream-100/80 ring-white/15 hover:ring-white/40'
                                                }`}
                                        >
                                            {t(`contact.types.${item.key}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Field
                                id="message"
                                label={t('contact.form.message')}
                                error={showErr('message')}
                                right={
                                    <span className={`font-mono text-xs ${left < 100 ? 'text-red-300' : 'text-cream-100/50'}`}>
                                        {left}
                                    </span>
                                }
                            >
                                <textarea
                                    id="message"
                                    rows={6}
                                    maxLength={MAX_LEN}
                                    value={form.message}
                                    onChange={update('message')}
                                    onBlur={touch('message')}
                                    disabled={loading}
                                    aria-invalid={!!showErr('message')}
                                    aria-describedby={showErr('message') ? 'message-err' : undefined}
                                    placeholder={t('contact.form.messagePh')}
                                    className={`${inputCls(showErr('message'))} resize-none`}
                                />
                            </Field>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-flame-500 px-8 py-4 font-medium text-navy-950 transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-flame-400 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                            >
                                {loading ? t('contact.form.sending') : t('contact.form.send')}
                            </button>

                            <div aria-live="polite" className="min-h-6 text-sm">
                                {status === 'error' && errorText && (
                                    <p role="alert" className="text-red-300">
                                        {errorText}
                                    </p>
                                )}
                            </div>
                        </form>
                    )}
                </section>
            </div>
        </>
    )
}