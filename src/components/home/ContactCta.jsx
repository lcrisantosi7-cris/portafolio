import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useReveal from '../../hooks/useReveal'
import LinkButton from '../ui/LinkButton'

export default function ContactCta() {
    const { t } = useTranslation()
    const root = useRef(null)

    useReveal(root)

    return (
        <section
            ref={root}
            aria-labelledby="cta-title"
            className="relative overflow-hidden bg-void-950 px-6 py-32 text-center md:py-48"
            style={{ backgroundImage: 'radial-gradient(60% 55% at 50% 115%, rgba(255,106,19,0.22), transparent 70%)' }}
        >
            <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                {t('cta.eyebrow')}
            </p>
            <h2
                id="cta-title"
                data-reveal="mask"
                className="mx-auto mt-6 font-display font-condensed font-extrabold uppercase leading-[0.9] text-cream-100 text-[length:clamp(3.5rem,13vw,11rem)]"
            >
                {t('cta.title')}
            </h2>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-cream-100/70">
                {t('cta.text')}
            </p>
            <div data-reveal className="mt-10">
                <LinkButton to="/contact">{t('nav.contactCta')}</LinkButton>
            </div>
        </section>
    )
}