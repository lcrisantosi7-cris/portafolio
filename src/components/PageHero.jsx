import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import Starfield from './home/Starfield'

export default function PageHero({ eyebrow, title, children }) {
    const root = useRef(null)

    useGSAP(
        () => {
            const mm = gsap.matchMedia(root.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from('[data-line]', { yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.1, delay: 0.15 })
                gsap.from('[data-fade]', { opacity: 0, y: 16, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.45 })
                gsap.to('[data-planet]', {
                    yPercent: 16,
                    ease: 'none',
                    scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
                })
            })

            return () => mm.revert()
        },
        { scope: root },
    )

    return (
        <header ref={root} className="relative isolate overflow-hidden px-6 pb-20 pt-36 md:pb-28 md:pt-48">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        'radial-gradient(60% 70% at 85% 0%, rgba(29,79,148,0.35) 0%, transparent 70%), linear-gradient(180deg, #050f1f 0%, #03060f 100%)',
                }}
            />
            <Starfield className="-z-10 opacity-70" />
            <div
                data-planet
                aria-hidden="true"
                className="absolute -right-[18%] -top-[30%] -z-10 aspect-square w-[min(70vw,720px)] overflow-hidden rounded-full"
                style={{
                    background:
                        'radial-gradient(circle at 30% 70%, #ffe2b8 0%, #ffa24a 10%, #ff6a13 28%, #b53209 52%, #3a1019 76%, #0a1226 100%)',
                    boxShadow: '0 0 140px 20px rgba(255,106,19,0.3)',
                }}
            >
                <div className="grain" />
            </div>

            <div className="mx-auto max-w-7xl">
                <p data-fade className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                    {eyebrow}
                </p>
                <h1 className="mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-[length:clamp(2.75rem,8vw,7rem)]">
                    <span className="block overflow-hidden py-[0.04em]">
                        <span data-line className="block text-flame-gradient">
                            {title}
                        </span>
                    </span>
                </h1>
                {children && (
                    <p data-fade className="mt-6 max-w-2xl text-lg text-cream-100/80 md:text-xl">
                        {children}
                    </p>
                )}
            </div>
        </header>
    )
}