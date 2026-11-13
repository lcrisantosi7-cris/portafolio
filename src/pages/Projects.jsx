import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import { TransitionLink } from '../components/TransitionLink'
import useRevealEach from '../hooks/useRevealEach'
import { getProjectImages } from '../lib/projectImages'
import { projects, STATUS } from '../data/projects'

const star = projects.find((p) => p.tier === 'star')
const featured = projects.filter((p) => p.tier === 'featured')
const workshop = projects.filter((p) => p.tier === 'secondary')

function Chips({ items, limit }) {
    return (
        <ul className="mt-6 flex flex-wrap gap-2">
            {items.slice(0, limit).map((tech) => (
                <li key={tech} className="rounded-full px-3 py-1 font-mono text-xs text-cream-100/75 ring-1 ring-white/15">
                    {tech}
                </li>
            ))}
        </ul>
    )
}

function StarCard({ project }) {
    const { t } = useTranslation()
    const shot = getProjectImages(project.slug)[0]

    return (
        <article
            data-reveal
            className="group relative isolate overflow-hidden rounded-[2rem] bg-navy-900/50 p-8 ring-1 ring-white/10 transition-shadow duration-500 hover:ring-flame-500/40 md:p-14"
        >
            <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 -z-10 size-[28rem] overflow-hidden rounded-full opacity-90 transition-transform duration-1000 group-hover:scale-105"
                style={{ background: project.planet, boxShadow: '0 0 120px rgba(255,106,19,0.3)' }}
            >
                <div className="grain" />
            </div>

            <div className="grid items-end gap-10 lg:grid-cols-2">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                        {t('projectsIndex.starLabel')} · {project.year}
                    </p>
                    <h2 className="mt-4 font-display font-condensed font-extrabold uppercase leading-[0.9] text-[length:clamp(3rem,7vw,6.5rem)]">
                        <TransitionLink
                            to={`/projects/${project.slug}`}
                            className="text-flame-gradient after:absolute after:inset-0 after:content-['']"
                        >
                            {project.name}
                        </TransitionLink>
                    </h2>
                    <p className="mt-5 max-w-lg text-lg text-cream-100/80">{t(`projectsIndex.summary.${project.slug}`)}</p>
                    <Chips items={project.stack} limit={7} />
                    <p className="mt-8">
                        <span className="inline-flex rounded-full bg-flame-500 px-6 py-3 text-sm font-medium text-navy-950 transition-colors group-hover:bg-flame-400">
                            {t('projectsIndex.viewCase')} →
                        </span>
                    </p>
                </div>

                {shot && (
                    <img
                        src={shot.url}
                        alt={t('star.shotAlt')}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] lg:translate-y-6"
                    />
                )}
            </div>
        </article>
    )
}

function FeaturedCard({ project }) {
    const { t } = useTranslation()

    return (
        <li
            data-reveal
            className="group relative isolate overflow-hidden rounded-3xl bg-navy-900/60 p-8 ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:ring-flame-500/40 md:p-10"
        >
            <span
                aria-hidden="true"
                className="absolute -right-16 -top-16 -z-10 size-56 rounded-full opacity-90 transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-2 group-hover:scale-110"
                style={{ background: project.planet }}
            />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                {project.year} · {t(`status.${project.status}`)}
            </p>
            <h3 className="mt-16 font-display text-4xl font-bold">
                <TransitionLink to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {project.name}
                </TransitionLink>
            </h3>
            <p className="mt-4 max-w-md text-cream-100/75">{t(`projectsIndex.summary.${project.slug}`)}</p>
            <Chips items={project.stack} limit={5} />
        </li>
    )
}

export default function Projects() {
    const { t } = useTranslation()
    const root = useRef(null)

    useRevealEach(root)

    return (
        <>
            <PageMeta title={t('nav.projects')} />
            <PageHero eyebrow={t('projectsIndex.eyebrow')} title={t('projectsIndex.title')}>
                {t('projectsIndex.text')}
            </PageHero>

            <div ref={root} className="mx-auto max-w-7xl space-y-6 px-6 pb-28">
                <StarCard project={star} />

                <ul className="grid gap-6 md:grid-cols-2">
                    {featured.map((project) => (
                        <FeaturedCard key={project.slug} project={project} />
                    ))}
                </ul>

                <section data-reveal aria-labelledby="workshop-title" className="pt-16">
                    <h2
                        id="workshop-title"
                        className="font-display font-condensed font-extrabold uppercase leading-[0.9] text-cream-100 text-[length:clamp(2.5rem,6vw,5rem)]"
                    >
                        {t('projectsIndex.workshopTitle')}
                    </h2>

                    <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                        {workshop.map((project) => (
                            <li
                                key={project.slug}
                                className="grid gap-3 py-6 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-8"
                            >
                                <div>
                                    <h3 className="font-display text-2xl font-bold">{project.name}</h3>
                                    {project.status === STATUS.IN_DEVELOPMENT && (
                                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-glow-300">
                                            {t(`status.${project.status}`)}
                                        </p>
                                    )}
                                </div>
                                <p className="text-cream-100/75">
                                    {project.slug === 'plantmilk'
                                        ? t('projectsIndex.summary.plantmilk')
                                        : t('projectsIndex.noDescription')}
                                </p>
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm underline underline-offset-4"
                                    >
                                        {t('projectsIndex.repo')}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    )
}