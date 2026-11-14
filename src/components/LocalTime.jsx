import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LocalTime() {
    const { i18n } = useTranslation()
    const locale = i18n.resolvedLanguage === 'en' ? 'en-US' : 'es-PE'
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30_000)
        return () => clearInterval(id)
    }, [])

    const text = new Intl.DateTimeFormat(locale, {
        timeZone: 'America/Lima',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).format(now)

    return <span className="tabular-nums">{text}</span>
}