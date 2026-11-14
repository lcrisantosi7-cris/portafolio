import { useRef } from 'react'
import { getProjectImages } from '../../lib/projectImages'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../../lib/gsap'
import useReveal from '../../hooks/useReveal'
import useReducedMotion from '../../hooks/useReducedMotion'
import LinkButton from '../ui/LinkButton'
import Starfield from './Starfield'
import { projects } from '../../data/projects'

const project = projects.find((p) => p.slug === 'retailvision')

export default function StarProject() {
    const { t } = useTranslation()
    const root = useRef(null)
    const reduced = useReducedMotion()
    const shot = getProjectImages('retailvision')[0]

    useReveal(root)

    useGSAP(
        () => {
            const mm = gsap.matchMedia(root.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from('[data-star-planet]', {
                    scale: 0.82,
                    opacity: 0,
                    duration: 1.4,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: root.current, start: 'top 70%' },
                })
                gsap.to('[data-star-shot]', {
                    y: -70,
                    ease: 'none',
                    scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
                })
            })

            return () => mm.revert()
        },
        { scope: root },
    )

    return (
        <section
            ref={root}
            aria-labelledby="star-title"
            className="relative isolate overflow-hidden bg-void-950 px-6 py-28 md:py-40"
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{ background: 'radial-gradient(50% 45% at 78% 50%, rgba(255,106,19,0.16) 0%, transparent 70%)' }}
            />
            <Starfield className="-z-10 opacity-60" />

            <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
                <div>
                    <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                        {t('star.eyebrow')}
                    </p>
                    <h2
                        id="star-title"
                        data-reveal="mask"
                        className="mt-4 font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-cream-100 text-[length:clamp(2.6rem,6.2vw,6.5rem)]"
                    >
                        RetailVision
                        <br />
                        <span className="text-flame-gradient">Analytics</span>
                    </h2>

                    <dl className="mt-10 max-w-xl space-y-8">
                        <div data-reveal>
                            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                                {t('star.problemLabel')}
                            </dt>
                            <dd className="mt-2 text-lg text-cream-100/85">{t('star.problem')}</dd>
                        </div>
                        <div data-reveal>
                            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                                {t('star.solutionLabel')}
                            </dt>
                            <dd className="mt-2 text-lg text-cream-100/85">{t('star.solution')}</dd>
                        </div>
                    </dl>

                    <ul data-reveal className="mt-8 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <li key={tech} className="rounded-full px-3 py-1 font-mono text-xs text-cream-100/80 ring-1 ring-white/15">
                                {tech}
                            </li>
                        ))}
                    </ul>

                    <div data-reveal className="mt-10 flex flex-wrap gap-3">
                        <LinkButton to="/projects/retailvision">{t('star.cta')}</LinkButton>
                        <LinkButton href={project.repoUrl} variant="ghost">
                            {t('star.repo')}
                        </LinkButton>
                    </div>
                </div>

                <div className="relative mx-auto aspect-square w-full max-w-[640px]">
                    <div
                        data-star-planet
                        aria-hidden="true"
                        className="absolute inset-[6%] overflow-hidden rounded-full"
                        style={{
                            background:
                                'radial-gradient(circle at 32% 28%, #ffe2b8 0%, #ffa24a 14%, #ff6a13 34%, #b53209 58%, #3a1019 80%, #0a1226 100%)',
                            boxShadow: '0 0 140px 20px rgba(255,106,19,0.35), inset -40px -50px 100px rgba(4,10,22,0.75)',
                        }}
                    >
                        <div className="grain" />
                    </div>

                    <svg
                        aria-hidden="true"
                        viewBox="0 0 100 100"
                        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                    >
                        <g transform="rotate(-24 50 50)">
                            <ellipse cx="50" cy="50" rx="54" ry="17" fill="none" stroke="rgba(109,151,230,0.4)" strokeWidth="0.25" />
                            {!reduced && (
                                <circle r="1.2" fill="#ff8a3d">
                                    <animateMotion
                                        dur="14s"
                                        repeatCount="indefinite"
                                        path="M104,50 A54,17 0 1,1 -4,50 A54,17 0 1,1 104,50"
                                    />
                                </circle>
                            )}
                        </g>
                    </svg>

                    {shot && (
                        <img
                            data-star-shot
                            src={shot.url}
                            alt={t('star.shotAlt')}
                            loading="lazy"
                            decoding="async"
                            className="absolute -bottom-4 right-[-4%] w-[78%] rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}