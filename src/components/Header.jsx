import { useTranslation } from 'react-i18next'
import { TransitionLink, TransitionNavLink } from './TransitionLink'
import LanguageToggle from './LanguageToggle'

const NAV = [
    { to: '/', key: 'home', end: true },
    { to: '/about', key: 'about' },
    { to: '/projects', key: 'projects' },
    { to: '/contact', key: 'contact' },
]

export default function Header() {
    const { t } = useTranslation()

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-navy-950/70 backdrop-blur">
            <nav
                aria-label={t('nav.label')}
                className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3"
            >
                <TransitionLink to="/" aria-label={t('nav.homeAria')} className="flex items-center gap-2">
                    <img src="/assets/logos/logo.svg" alt="" width="32" height="32" />
                    <span className="font-semibold">Lux.dev</span>
                </TransitionLink>

                <ul className="flex items-center gap-4 text-sm sm:gap-6">
                    {NAV.map(({ to, key, end }) => (
                        <li key={key}>
                            <TransitionNavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    isActive ? 'text-flame-500' : 'text-cream-100/80 hover:text-cream-100'
                                }
                            >
                                {t(`nav.${key}`)}
                            </TransitionNavLink>
                        </li>
                    ))}
                </ul>

                <LanguageToggle />
            </nav>
        </header>
    )
}