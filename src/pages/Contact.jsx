import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import { links } from '../data/links'

export default function Contact() {
    const { t } = useTranslation()

    return (
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
            <PageMeta title={t('nav.contact')} />
            <h1 className="text-4xl font-bold">{t('nav.contact')}</h1>
            <p className="mt-4 text-cream-100/70">{t('pages.contactForm')}</p>

            <h2 className="mt-10 text-lg font-semibold">{t('pages.links')}</h2>
            <ul className="mt-3 space-y-2">
                <li>
                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        GitHub
                    </a>
                </li>
                <li>
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        LinkedIn
                    </a>
                </li>
                <li>
                    <a href={`mailto:${links.email}`} className="underline underline-offset-4">
                        {links.email}
                    </a>
                </li>
            </ul>
        </section>
    )
}