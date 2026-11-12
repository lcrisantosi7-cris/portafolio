import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout() {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const mainRef = useRef(null)
    const first = useRef(true)

    // Accesibilidad: al cambiar de página, el foco pasa al contenido
    useEffect(() => {
        if (first.current) {
            first.current = false
            return
        }
        mainRef.current?.focus({ preventScroll: true })
    }, [pathname])

    return (
        <>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:bg-flame-500 focus:px-4 focus:py-2 focus:text-navy-950"
            >
                {t('a11y.skip')}
            </a>
            <Header />
            <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}