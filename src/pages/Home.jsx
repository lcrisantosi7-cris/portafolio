import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'

export default function Home() {
    const { t } = useTranslation()

    return (
        <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
            <PageMeta />
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">Luis Crisanto</h1>
            <p className="mt-4 text-cream-100/70">{t('pages.wip')}</p>
        </section>
    )
}