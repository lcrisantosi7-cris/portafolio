import { gsap, useGSAP } from '../lib/gsap'

export default function useReveal(scope, { selector = '[data-reveal]', start = 'top 75%', stagger = 0.1 } = {}) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia(scope.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const scrollTrigger = { trigger: scope.current, start }

                // Títulos: se descubren como una máscara que sube
                gsap.from(`${selector}[data-reveal="mask"]`, {
                    clipPath: 'inset(0 0 100% 0)',
                    yPercent: 30,
                    duration: 1.1,
                    ease: 'expo.out',
                    stagger,
                    clearProps: 'clipPath,transform',
                    scrollTrigger,
                })

                // Resto: aparecen con un desplazamiento corto
                gsap.from(`${selector}:not([data-reveal="mask"])`, {
                    opacity: 0,
                    y: 36,
                    duration: 1,
                    ease: 'expo.out',
                    stagger,
                    scrollTrigger,
                })
            })

            return () => mm.revert()
        },
        { scope },
    )
}