import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { setLenis } from '../lib/lenisStore'
import useReducedMotion from '../hooks/useReducedMotion'

export default function SmoothScroll() {
    const reduced = useReducedMotion()

    useEffect(() => {
        if (reduced) return

        const lenis = new Lenis({ lerp: 0.1 })
        setLenis(lenis)
        lenis.on('scroll', ScrollTrigger.update)

        const tick = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(tick)
            lenis.destroy()
            setLenis(null)
        }
    }, [reduced])

    return null
}