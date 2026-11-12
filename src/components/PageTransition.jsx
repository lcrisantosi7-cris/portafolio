import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { gsap } from '../lib/gsap'
import { scrollToTop } from '../lib/lenisStore'
import { TransitionContext } from '../lib/transition'
import useReducedMotion from '../hooks/useReducedMotion'

export function TransitionProvider({ children }) {
    const overlayRef = useRef(null)
    const busyRef = useRef(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const reduced = useReducedMotion()

    // Al cambiar la ruta: subir al inicio y descubrir la página nueva
    useEffect(() => {
        scrollToTop()
        const overlay = overlayRef.current
        if (!overlay || overlay.style.visibility !== 'visible') return

        gsap.killTweensOf(overlay)
        gsap.to(overlay, {
            yPercent: -100,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
                overlay.style.visibility = 'hidden'
                busyRef.current = false
            },
        })
    }, [pathname])

    const go = useCallback(
        (to) => {
            if (busyRef.current) return
            const target = new URL(to, window.location.origin)

            if (reduced || target.pathname === pathname) {
                navigate(to)
                return
            }

            busyRef.current = true
            const overlay = overlayRef.current
            overlay.style.visibility = 'visible'
            gsap.set(overlay, { yPercent: 100 })
            gsap.to(overlay, {
                yPercent: 0,
                duration: 0.5,
                ease: 'power3.inOut',
                onComplete: () => navigate(to),
            })
        },
        [navigate, pathname, reduced],
    )

    const value = useMemo(() => ({ go }), [go])

    return (
        <TransitionContext.Provider value={value}>
            {children}
            {/* Telón provisional: su aspecto final se define en la dirección de arte */}
            <div
                ref={overlayRef}
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[100] bg-navy-900"
                style={{ visibility: 'hidden' }}
            />
        </TransitionContext.Provider>
    )
}