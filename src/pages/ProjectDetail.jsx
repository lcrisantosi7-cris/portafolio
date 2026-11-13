import { useRef } from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import PipelineDiagram from '../components/project/PipelineDiagram'
import LinkButton from '../components/ui/LinkButton'
import { TransitionLink } from '../components/TransitionLink'
import useRevealEach from '../hooks/useRevealEach'
import { getProjectImages } from '../lib/projectImages'
import { projects } from '../data/projects'
import NotFound from './NotFound'

const CASES = projects.filter((p) => p.caseStudy)

function CaseSection({ n, label, children }) {
    return (
        <section
            data-reveal
            className="grid gap-6 border-t border-white/10 py-14 md:grid-cols-[220px_1fr] md:gap-12 md:py-20"
        >
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400 md:sticky md:top-28 md:self-start">
                <span className="text-cream-100/40">{n}</span> {label}
            </h2>
            <div>{children}</div>
        </section>
    )
}

function CaseStudy({ project }) {
    const { t } = useTranslation()
    const root = useRef(null)
    useRevealEach(root)

    const base = `cases.${project.slug}`
    const how = t(`${base}.how`, { returnObjects: true })
    const pipeline = project.diagram === 'pipeline' ? t(`${base}.pipeline`, { returnObjects: true }) : null
    const images = getProjectImages(project.slug)
    const next = CASES[(CASES.findIndex((p) => p.slug === project.slug) + 1) % CASES.length]

    let counter = 0
    const num = () => String(++counter).padStart(2, '0')

    return (
        <article ref={root}>
            <PageMeta title={project.name} description={t(`${base}.tagline`)} />
            <PageHero eyebrow={`${project.year} · ${t(`status.${project.status}`)}`} title={project.name}>
                {t(`${base}.tagline`)}
            </PageHero>

            <div className="mx-auto max-w-7xl px-6 pb-12">
                <div data-reveal className="flex flex-col gap-6 pb-14 md:flex-row md:items-center md:justify-between">
                    <ul className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <li key={tech} className="rounded-full px-3 py-1 font-mono text-xs text-cream-100/80 ring-1 ring-white/15">
                                {tech}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                        {project.deployUrl && <LinkButton href={project.deployUrl}>{t('caseUi.live')}</LinkButton>}
                        {project.repoUrl && (
                            <LinkButton href={project.repoUrl} variant="ghost">
                                {t('caseUi.repo')}
                            </LinkButton>
                        )}
                    </div>
                </div>

                <CaseSection n={num()} label={t('caseUi.problem')}>
                    <p className="text-2xl leading-snug md:text-3xl">{t(`${base}.problem`)}</p>
                </CaseSection>

                <CaseSection n={num()} label={t('caseUi.solution')}>
                    <p className="text-2xl leading-snug md:text-3xl">{t(`${base}.solution`)}</p>
                </CaseSection>

                {pipeline && (
                    <CaseSection n={num()} label={t('caseUi.pipeline')}>
                        <PipelineDiagram steps={pipeline} />
                    </CaseSection>
                )}

                <CaseSection n={num()} label={t('caseUi.why')}>
                    <p className="max-w-3xl text-xl leading-relaxed text-cream-100/85">{t(`${base}.why`)}</p>
                </CaseSection>

                <CaseSection n={num()} label={t('caseUi.how')}>
                    {Array.isArray(how) && (
                        <ol className="max-w-3xl space-y-5">
                            {how.map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <span className="pt-1.5 font-mono text-xs text-flame-400">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-lg text-cream-100/85">{item}</span>
                                </li>
                            ))}
                        </ol>
                    )}
                </CaseSection>

                {images.length > 0 && (
                    <CaseSection n={num()} label={t('caseUi.gallery')}>
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {images.map((img, i) => {
                                const caption = t(`${base}.shots.${img.name}`, { defaultValue: '' })
                                return (
                                    <li key={img.url} className={i === 0 ? 'sm:col-span-2' : ''}>
                                        <figure className="overflow-hidden rounded-2xl bg-navy-900/60 ring-1 ring-white/10">
                                            <img
                                                src={img.url}
                                                alt={caption || `${project.name} ${i + 1}`}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full"
                                            />
                                            {caption && (
                                                <figcaption className="px-4 py-3 font-mono text-xs text-cream-100/70">{caption}</figcaption>
                                            )}
                                        </figure>
                                    </li>
                                )
                            })}
                        </ul>
                    </CaseSection>
                )}

                <CaseSection n={num()} label={t('caseUi.result')}>
                    <p className="max-w-3xl text-xl leading-relaxed text-cream-100/85">{t(`${base}.result`)}</p>
                </CaseSection>

                <CaseSection n={num()} label={t('caseUi.learned')}>
                    <p className="max-w-3xl text-xl leading-relaxed text-cream-100/85">{t(`${base}.learned`)}</p>
                </CaseSection>

                <section data-reveal className="border-t border-white/10 py-20 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">{t('caseUi.next')}</p>
                    <TransitionLink
                        to={`/projects/${next.slug}`}
                        className="mt-4 inline-block font-display font-condensed font-extrabold uppercase leading-[0.9] text-flame-gradient text-[length:clamp(3rem,10vw,8rem)]"
                    >
                        {next.name}
                    </TransitionLink>
                    <div className="mt-8">
                        <LinkButton to="/projects" variant="ghost">
                            {t('caseUi.all')}
                        </LinkButton>
                    </div>
                </section>
            </div>
        </article>
    )
}

export default function ProjectDetail() {
    const { slug } = useParams()
    const project = CASES.find((p) => p.slug === slug)

    if (!project) return <NotFound />
    return <CaseStudy key={project.slug} project={project} />
}