import { gsap, useGSAP } from '../lib/gsap'

export default function useRevealEach(scope, { selector = '[data-reveal]', start = 'top 88%' } = {}) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia(scope.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.utils.toArray(selector, scope.current).forEach((el) => {
                    gsap.from(el, {
                        opacity: 0,
                        y: 36,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start, once: true },
                    })
                })
            })

            return () => mm.revert()
        },
        { scope },
    )
}