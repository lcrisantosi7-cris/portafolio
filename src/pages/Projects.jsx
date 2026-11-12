import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import { TransitionLink } from '../components/TransitionLink'
import { projects } from '../data/projects'

export default function Projects() {
    const { t } = useTranslation()

    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-32">
            <PageMeta title={t('nav.projects')} />
            <h1 className="text-4xl font-bold">{t('nav.projects')}</h1>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <li key={project.slug} className="rounded-lg border border-white/10 p-5">
                        <h2 className="text-xl font-semibold">{project.name}</h2>
                        {project.status && (
                            <p className="mt-1 text-sm text-flame-500">{t(`status.${project.status}`)}</p>
                        )}
                        {project.caseStudy && (
                            <TransitionLink
                                to={`/projects/${project.slug}`}
                                className="mt-4 inline-block underline underline-offset-4"
                            >
                                {t('pages.viewCase')}
                            </TransitionLink>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}