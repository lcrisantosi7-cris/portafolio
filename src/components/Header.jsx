import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { TransitionLink, TransitionNavLink } from './TransitionLink'
import LanguageToggle from './LanguageToggle'
import { getLenis } from '../lib/lenisStore'
import LocalTime from './LocalTime'

const NAV = [
    { to: '/', key: 'home', end: true },
    { to: '/about', key: 'about' },
    { to: '/projects', key: 'projects' },
]

const isItemActive = (item, pathname) =>
    item.end ? pathname === item.to : pathname.startsWith(item.to)

export default function Header() {
    const { t, i18n } = useTranslation()
    const { pathname } = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [open, setOpen] = useState(false)
    const [indicator, setIndicator] = useState({ x: 0, w: 0, ready: false })

    const listRef = useRef(null)
    const toggleRef = useRef(null)
    const menuRef = useRef(null)
    const openRef = useRef(false)

    const activeIndex = NAV.findIndex((item) => isItemActive(item, pathname))

    // Mostrar/ocultar según la dirección del scroll
    useEffect(() => {
        let last = window.scrollY
        let ticking = false

        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                const y = window.scrollY
                setScrolled(y > 24)
                if (Math.abs(y - last) > 6) {
                    setHidden(y > 160 && y > last && !openRef.current)
                    last = y
                }
                ticking = false
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Al cambiar de página: cerrar menú y volver a mostrar el header
    const [lastPath, setLastPath] = useState(pathname)
    if (lastPath !== pathname) {
        setLastPath(pathname)
        setOpen(false)
        setHidden(false)
    }
    // Menú móvil: bloquear scroll, foco, Escape y trampa de foco
    useEffect(() => {
        openRef.current = open
        if (!open) return

        const lenis = getLenis()
        lenis?.stop()
        const previousOverflow = document.documentElement.style.overflow
        document.documentElement.style.overflow = 'hidden'

        const focusables = () => [
            toggleRef.current,
            ...menuRef.current.querySelectorAll('a[href], button:not([disabled])'),
        ]
        focusables()[1]?.focus()

        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false)
                toggleRef.current?.focus()
                return
            }
            if (e.key !== 'Tab') return
            const items = focusables()
            const first = items[0]
            const last = items[items.length - 1]
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.documentElement.style.overflow = previousOverflow
            lenis?.start()
        }
    }, [open])

    // Indicador deslizante del enlace activo
    const measure = useCallback(() => {
        const el = listRef.current?.querySelectorAll('[data-nav-item]')[activeIndex]
        setIndicator(
            el ? { x: el.offsetLeft, w: el.offsetWidth, ready: true } : (s) => ({ ...s, ready: false }),
        )
    }, [activeIndex])

    useLayoutEffect(() => {
        measure()
        const observer = new ResizeObserver(measure)
        if (listRef.current) observer.observe(listRef.current)
        document.fonts?.ready.then(measure)
        return () => observer.disconnect()
    }, [measure, i18n.resolvedLanguage])

    const ease = 'ease-[cubic-bezier(.22,1,.36,1)]'

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ${ease} sm:px-5 sm:pt-4 ${hidden ? '-translate-y-[130%] focus-within:translate-y-0' : 'translate-y-0'
                    }`}
            >
                <div
                    className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pl-4 pr-2 ring-1 backdrop-blur-xl transition-[background-color,box-shadow] duration-500 ${scrolled || open
                        ? 'bg-navy-950/75 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] ring-white/15'
                        : 'bg-white/[0.03] ring-white/10'
                        }`}
                >
                    <TransitionLink to="/" aria-label={t('nav.homeAria')} className="flex items-center gap-2.5">
                        <img src="/assets/logos/logo.svg" alt="" width="30" height="30" />
                        <span className="font-display text-lg font-bold tracking-tight">
                            Lux<span className="text-flame-500">.dev</span>
                        </span>
                    </TransitionLink>

                    <nav aria-label={t('nav.label')} className="hidden md:block">
                        <ul ref={listRef} className="relative flex items-center">
                            <span
                                aria-hidden="true"
                                className={`absolute inset-y-0 left-0 rounded-full bg-white/10 ring-1 ring-white/10 transition-[transform,width,opacity] duration-500 ${ease}`}
                                style={{
                                    transform: `translateX(${indicator.x}px)`,
                                    width: indicator.w,
                                    opacity: indicator.ready ? 1 : 0,
                                }}
                            />
                            {NAV.map(({ to, key, end }) => (
                                <li key={key} data-nav-item>
                                    <TransitionNavLink
                                        to={to}
                                        end={end}
                                        className={({ isActive }) =>
                                            `relative z-10 block rounded-full px-4 py-2 text-sm transition-colors ${isActive ? 'text-cream-100' : 'text-cream-100/65 hover:text-cream-100'
                                            }`
                                        }
                                    >
                                        {t(`nav.${key}`)}
                                    </TransitionNavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <p className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-cream-100/70 ring-1 ring-white/10 xl:flex">
                        <span aria-hidden="true" className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                        </span>
                        {t('nav.status')}
                        <span aria-hidden="true" className="text-cream-100/30">·</span>
                        <LocalTime /> {t('nav.statusPlace')}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="hidden md:block">
                            <LanguageToggle />
                        </div>

                        <TransitionNavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 text-sm font-medium text-navy-950 transition-[background-color,transform,box-shadow] duration-300 ${isActive
                                    ? 'bg-flame-400'
                                    : 'bg-flame-500 hover:-translate-y-px hover:bg-flame-400 hover:shadow-[0_8px_24px_-8px_rgba(255,106,19,0.8)]'
                                }`
                            }
                        >
                            {t('nav.contactCta')}
                        </TransitionNavLink>

                        <button
                            ref={toggleRef}
                            type="button"
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
                            onClick={() => setOpen((v) => !v)}
                            className="grid size-10 place-items-center rounded-full ring-1 ring-white/15 md:hidden"
                        >
                            <span className="relative block h-3 w-5">
                                <span
                                    className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-cream-100 transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''
                                        }`}
                                />
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-cream-100 transition-transform duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''
                                        }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <div
                id="mobile-menu"
                ref={menuRef}
                className={`fixed inset-0 z-40 flex flex-col justify-between bg-navy-950/95 px-6 pb-8 pt-28 backdrop-blur-2xl transition-[opacity,visibility] duration-500 md:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
            >
                <nav aria-label={t('nav.label')}>
                    <ul className="space-y-2">
                        {NAV.map(({ to, key, end }, i) => (
                            <li key={key} className="overflow-hidden">
                                <TransitionNavLink
                                    to={to}
                                    end={end}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `block font-display text-6xl font-extrabold leading-[0.95] tracking-[-0.02em] transition-[transform,opacity] duration-700 ${ease} ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                        } ${isActive ? 'text-flame-500' : 'text-cream-100'}`
                                    }
                                    style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
                                >
                                    {t(`nav.${key}`)}
                                </TransitionNavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center justify-between">
                    <LanguageToggle />
                    <span className="font-mono text-xs text-cream-100/50">© 2026 LC.dev</span>
                </div>
            </div>
        </>
    )
}