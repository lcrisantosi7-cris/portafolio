import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useReveal from '../../hooks/useReveal'
import { TransitionLink } from '../TransitionLink'
import { projects } from '../../data/projects'

const STUDY = ['ucv', 'courses', 'aws']
const BUILT = projects.filter((p) => p.caseStudy).sort((a, b) => a.year - b.year)

function Dot() {
    return (
        <span
            aria-hidden="true"
            className="absolute -left-[2.375rem] top-1.5 size-3 rounded-full bg-flame-500 ring-4 ring-void-950"
        />
    )
}

export default function Education() {
    const { t } = useTranslation()
    const root = useRef(null)

    useReveal(root)

    return (
        <section ref={root} aria-labelledby="education-title" className="bg-void-950 px-6 py-24 md:py-32">
            <div className="mx-auto max-w-7xl">
                <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                    {t('about.education.eyebrow')}
                </p>
                <h2
                    id="education-title"
                    data-reveal
                    className="mt-4 font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-cream-100 text-[length:clamp(3rem,7vw,6rem)]"
                >
                    {t('about.education.title')}
                </h2>

                <div className="mt-14 grid gap-16 md:grid-cols-2">
                    <div data-reveal>
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                            {t('about.education.studyTitle')}
                        </h3>
                        <ol className="relative mt-8 space-y-10 border-l border-white/15 pl-8">
                            {STUDY.map((key) => {
                                const status = t(`about.education.${key}.status`)
                                return (
                                    <li key={key} className="relative">
                                        <Dot />
                                        <p className="font-display text-2xl font-bold">{t(`about.education.${key}.title`)}</p>
                                        {status && (
                                            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-glow-300">{status}</p>
                                        )}
                                        <p className="mt-2 max-w-md text-cream-100/75">{t(`about.education.${key}.text`)}</p>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>

                    <div data-reveal>
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                            {t('about.education.buildTitle')}
                        </h3>
                        <ol className="relative mt-8 space-y-10 border-l border-white/15 pl-8">
                            {BUILT.map((p) => (
                                <li key={p.slug} className="relative">
                                    <Dot />
                                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-glow-300">{p.year}</p>
                                    <p className="mt-1 font-display text-2xl font-bold">
                                        <TransitionLink to={`/projects/${p.slug}`} className="underline-offset-4 hover:underline">
                                            {p.name}
                                        </TransitionLink>
                                    </p>
                                    <p className="mt-2 max-w-md text-cream-100/75">{t(`projectsIndex.summary.${p.slug}`)}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}