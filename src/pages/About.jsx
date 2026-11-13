import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Intro from '../components/about/Intro'
import SkillsConstellation from '../components/about/SkillsConstellation'
import Education from '../components/about/Education'

export default function About() {
    const { t } = useTranslation()

    return (
        <>
            <PageMeta title={t('nav.about')} />
            <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')}>
                {t('about.lead')}
            </PageHero>
            <Intro />
            <SkillsConstellation />
            <Education />
        </>
    )
}