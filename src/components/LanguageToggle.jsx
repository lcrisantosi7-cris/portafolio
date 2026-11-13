import { useTranslation } from 'react-i18next'

const LANGS = ['es', 'en']

export default function LanguageToggle() {
    const { i18n, t } = useTranslation()
    const current = i18n.resolvedLanguage

    return (
        <div role="group" aria-label={t('lang.label')} className="flex items-center rounded-full p-0.5 ring-1 ring-white/10">
            {LANGS.map((lng) => (
                <button
                    key={lng}
                    type="button"
                    lang={lng}
                    aria-pressed={current === lng}
                    onClick={() => i18n.changeLanguage(lng)}
                    className={`rounded-full px-2.5 py-1 font-mono text-xs transition-colors ${current === lng ? 'bg-white/15 text-cream-100' : 'text-cream-100/55 hover:text-cream-100'
                        }`}
                >
                    {lng.toUpperCase()}
                </button>
            ))}
        </div>
    )
}