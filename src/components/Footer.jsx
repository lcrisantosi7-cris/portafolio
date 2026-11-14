import { useTranslation } from 'react-i18next'
import { scrollToTop } from '../lib/lenisStore'
import { links } from '../data/links'

const LILIAN_URL = 'https://www.behance.net/gallery/257987643/PORTAFOLIO-2026-DISENO-GRAFICO'

export default function Footer() {
    const { t } = useTranslation()
    const linkCls = 'text-sm text-cream-100/70 transition-colors hover:text-flame-400'

    return (
        <footer className="border-t border-white/10 px-6 pb-10 pt-16">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="max-w-xl font-display text-3xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-5xl">
                            {t('footer.line')}
                        </p>
                        <a
                            href={`mailto:${links.email}`}
                            className="mt-5 inline-block text-lg text-flame-400 underline-offset-4 hover:underline"
                        >
                            {links.email}
                        </a>
                    </div>

                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                        <li>
                            <a href={links.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
                                GitHub ↗
                            </a>
                        </li>
                        <li>
                            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
                                LinkedIn ↗
                            </a>
                        </li>
                        <li>
                            <button type="button" onClick={scrollToTop} className={linkCls}>
                                {t('footer.top')} ↑
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-center gap-2 text-sm">
                        <img src="/assets/logos/logo.svg" alt="" width="24" height="24" />
                        <span>Luis Crisanto</span>
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
            </div>
        </footer>
    )
}