import { useTranslation } from 'react-i18next'

const LANGS = ['es', 'en']

export default function LanguageToggle() {
    const { i18n, t } = useTranslation()
    const current = i18n.resolvedLanguage

    return (
        <div role="group" aria-label={t('lang.label')} className="flex items-center gap-1 text-sm">
            {LANGS.map((lng) => (
                <button
                    key={lng}
                    type="button"
                    lang={lng}
                    aria-pressed={current === lng}
                    onClick={() => i18n.changeLanguage(lng)}
                    className={`rounded px-2 py-1 transition-colors ${current === lng ? 'bg-flame-500 text-navy-950' : 'text-cream-100/70 hover:text-cream-100'
                        }`}
                >
                    {lng.toUpperCase()}
                </button>
            ))}
        </div>
    )
}