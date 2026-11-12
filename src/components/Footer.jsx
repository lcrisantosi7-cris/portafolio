import { useTranslation } from 'react-i18next'

const LILIAN_URL = 'https://www.behance.net/gallery/257987643/PORTAFOLIO-2026-DISENO-GRAFICO'

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="border-t border-white/10 px-6 py-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 font-mono text-sm">
                    <img src="/assets/logos/logo.svg" alt="" width="24" height="24" />
                    <span>{'<coded_by />'} Luis Crisanto</span>
                </p>

                <a
                    href={LILIAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('footer.creditAria')}
                    className="flex items-center gap-2 text-sm text-cream-100/80 hover:text-cream-100"
                >
                    <img src="/assets/logos/logo_lilianG.svg" alt="" width="24" height="24" />
                    <span>
                        {t('footer.designBy')} Lilian Gutiérrez
                    </span>
                </a>

                <small className="text-cream-100/60">{t('footer.rights')}</small>
            </div>
        </footer>
    )
}