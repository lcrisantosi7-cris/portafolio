import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useReveal from '../../hooks/useReveal'
import { TransitionLink } from '../TransitionLink'
import LinkButton from '../ui/LinkButton'
import { projects } from '../../data/projects'

const FEATURED = projects.filter((p) => p.tier === 'featured')

const PLANETS = {
    alfapet:
        'radial-gradient(circle at 30% 30%, #cfe0ff 0%, #6d97e6 24%, #1d4f94 55%, #071a33 100%)',
    educore:
        'radial-gradient(circle at 30% 30%, #fff3dc 0%, #e8cfa0 24%, #a8845a 55%, #2a1d14 100%)',
}

export default function OtherWorlds() {
    const { t } = useTranslation()
    const root = useRef(null)

    useReveal(root)

    return (
        <section
            ref={root}
            aria-labelledby="worlds-title"
            className="relative overflow-hidden bg-void-950 px-6 py-28 md:py-36"
        >
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                            {t('worlds.eyebrow')}
                        </p>
                        <h2
                            id="worlds-title"
                            data-reveal="mask"
                            className="mt-4 font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-cream-100 text-[length:clamp(3rem,7vw,6rem)]"
                        >
                            {t('worlds.title')}
                        </h2>
                    </div>
                    <div data-reveal>
                        <LinkButton to="/projects" variant="ghost">
                            {t('worlds.all')}
                        </LinkButton>
                    </div>
                </div>

                <ul className="mt-14 grid gap-6 md:grid-cols-2">
                    {FEATURED.map((project) => (
                        <li
                            key={project.slug}
                            data-reveal
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(11,42,82,0.5),rgba(4,10,22,0.84))] p-8 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-flame-500/35 hover:shadow-[0_30px_80px_-48px_rgba(255,106,19,0.2)] md:p-10"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute -right-16 -top-16 size-56 rounded-full opacity-90 transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-2 group-hover:scale-110"
                                style={{ background: PLANETS[project.slug] }}
                            />

                            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                                {project.year} · {t(`status.${project.status}`)}
                            </p>

                            <h3 className="relative mt-16 font-display text-4xl font-bold">
                                <TransitionLink
                                    to={`/projects/${project.slug}`}
                                    className="after:absolute after:inset-0 after:content-['']"
                                >
                                    {project.name}
                                </TransitionLink>
                            </h3>

                            <p className="relative mt-4 max-w-md text-cream-100/75">{t(`worlds.${project.slug}`)}</p>

                            <ul className="relative mt-6 flex flex-wrap gap-2">
                                {project.stack.slice(0, 4).map((tech) => (
                                    <li key={tech} className="rounded-full px-3 py-1 font-mono text-xs text-cream-100/70 ring-1 ring-white/15">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}