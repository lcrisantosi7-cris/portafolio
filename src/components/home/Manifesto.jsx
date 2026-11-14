import { Fragment, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../../lib/gsap'

const KEYS = ['p1', 'p2', 'p3']

export default function Manifesto() {
    const { t, i18n } = useTranslation()
    const root = useRef(null)

    useGSAP(
        () => {
            const mm = gsap.matchMedia(root.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const words = gsap.utils.toArray('[data-word]', root.current)
                gsap.set(words, { opacity: 0.14 })

                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: root.current,
                            start: 'top top',
                            end: '+=150%',
                            scrub: 0.6,
                            pin: true,
                            anticipatePin: 1,
                        },
                    })
                    .from('[data-title]', { opacity: 0, y: 50, duration: 0.3 })
                    .to(words, { opacity: 1, stagger: 0.04, duration: 0.15 }, '>0.05')
            })

            return () => mm.revert()
        },
        { scope: root, dependencies: [i18n.resolvedLanguage], revertOnUpdate: true },
    )

    return (
        <section
            ref={root}
            aria-labelledby="manifesto-title"
            className="relative flex min-h-svh items-center overflow-hidden bg-void-950 px-6 py-24"
            style={{ backgroundImage: 'radial-gradient(70% 50% at 50% 115%, rgba(255,106,19,0.12), transparent 70%)' }}
        >
            <div className="mx-auto w-full max-w-5xl">
                <p data-title className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                    {t('manifesto.eyebrow')}
                </p>
                <h2
                    id="manifesto-title"
                    data-title
                    className="mt-4 font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-flame-gradient text-[length:clamp(3rem,9.5vw,9.5rem)]"
                >
                    {t('manifesto.title')}
                </h2>

                <div className="mt-10 max-w-3xl space-y-4 text-2xl leading-snug md:text-4xl">
                    {KEYS.map((key) => (
                        <p key={key}>
                            {t(`manifesto.${key}`)
                                .split(' ')
                                .map((word, i) => (
                                    <Fragment key={`${key}-${i}`}>
                                        <span data-word className="inline-block">
                                            {word}
                                        </span>{' '}
                                    </Fragment>
                                ))}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    )
}