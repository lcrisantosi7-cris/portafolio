import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'

export default function About() {
    const { t } = useTranslation()

    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-32">
            <PageMeta title={t('nav.about')} />
            <h1 className="text-4xl font-bold">{t('nav.about')}</h1>
            <p className="mt-4 text-cream-100/70">{t('pages.wip')}</p>
        </section>
    )
}