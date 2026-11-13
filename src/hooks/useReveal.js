import { gsap, useGSAP } from '../lib/gsap'

export default function useReveal(scope, { selector = '[data-reveal]', start = 'top 75%', stagger = 0.1 } = {}) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia(scope.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from(selector, {
                    opacity: 0,
                    y: 36,
                    duration: 0.9,
                    ease: 'power3.out',
                    stagger,
                    scrollTrigger: { trigger: scope.current, start },
                })
            })

            return () => mm.revert()
        },
        { scope },
    )
}