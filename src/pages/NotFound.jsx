import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import LinkButton from '../components/ui/LinkButton'

export default function NotFound() {
    const { t } = useTranslation()

    return (
        <section className="mx-auto flex min-h-svh max-w-5xl flex-col items-start justify-center px-6">
            <PageMeta title={t('pages.notFound.title')} />
            <p
                aria-hidden="true"
                className="font-display text-[length:clamp(6rem,22vw,16rem)] font-extrabold leading-none tracking-[-0.04em] text-flame-gradient"
            >
                404
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">{t('pages.notFound.title')}</h1>
            <p className="mt-4 max-w-md text-lg text-cream-100/70">{t('pages.notFound.text')}</p>
            <LinkButton to="/" className="mt-10">
                {t('pages.notFound.back')}
            </LinkButton>
        </section>
    )
}