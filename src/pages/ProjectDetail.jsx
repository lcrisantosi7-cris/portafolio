import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import NotFound from './NotFound'
import { projects } from '../data/projects'

export default function ProjectDetail() {
    const { slug } = useParams()
    const { t } = useTranslation()
    const project = projects.find((p) => p.slug === slug && p.caseStudy)

    if (!project) return <NotFound />

    return (
        <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
            <PageMeta title={project.name} />
            <h1 className="text-4xl font-bold">{project.name}</h1>
            {project.status && (
                <p className="mt-2 text-flame-500">{t(`status.${project.status}`)}</p>
            )}

            <h2 className="mt-10 text-lg font-semibold">{t('pages.stack')}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-white/15 px-3 py-1 text-sm">
                        {tech}
                    </li>
                ))}
            </ul>

            <p className="mt-10 flex flex-wrap gap-6">
                {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        {t('pages.repo')}
                    </a>
                )}
                {project.deployUrl && (
                    <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        {t('pages.live')}
                    </a>
                )}
            </p>
        </article>
    )
}