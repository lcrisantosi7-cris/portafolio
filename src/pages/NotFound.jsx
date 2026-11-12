import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import { TransitionLink } from '../components/TransitionLink'

export default function NotFound() {
    const { t } = useTranslation()

    return (
        <section className="mx-auto flex min-h-svh max-w-3xl flex-col items-start justify-center px-6">
            <PageMeta title={t('pages.notFound.title')} />
            <h1 className="text-4xl font-bold">{t('pages.notFound.title')}</h1>
            <p className="mt-4 text-cream-100/70">{t('pages.notFound.text')}</p>
            <TransitionLink to="/" className="mt-8 underline underline-offset-4">
                {t('pages.notFound.back')}
            </TransitionLink>
        </section>
    )
}