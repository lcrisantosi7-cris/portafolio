import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useReveal from '../../hooks/useReveal'

const PHOTOS = [
    '/assets/images/luis-cutout.webp',
    '/assets/images/luis-cutout.png',
    '/assets/images/luis-original.jpg',
]
const FACTS = ['studies', 'focus', 'learning', 'country']

export default function Intro() {
    const { t } = useTranslation()
    const root = useRef(null)
    const [index, setIndex] = useState(0)
    const src = PHOTOS[index]

    useReveal(root)

    return (
        <section
            ref={root}
            className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:py-28 lg:grid-cols-[1fr_420px] lg:items-center"
        >
            <div className="space-y-6 text-xl leading-relaxed text-cream-100/85 md:text-2xl">
                <p data-reveal>{t('about.p1')}</p>
                <p data-reveal>{t('about.p2')}</p>
                <p data-reveal>{t('about.p3')}</p>

                <dl data-reveal className="grid gap-6 pt-6 sm:grid-cols-2">
                    {FACTS.map((key) => (
                        <div key={key} className="border-t border-white/10 pt-4">
                            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                                {t(`about.facts.${key}Label`)}
                            </dt>
                            <dd className="mt-2 text-base text-cream-100">{t(`about.facts.${key}`)}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div data-reveal className="relative mx-auto w-full max-w-sm">
                <div
                    aria-hidden="true"
                    className="absolute -inset-5 rounded-t-[999px] border border-dashed border-flame-400/30"
                />
                <div
                    className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] ring-1 ring-white/15"
                    style={{ background: 'linear-gradient(180deg, #1d4f94 0%, #071a33 55%, #b53209 135%)' }}
                >
                    <div className="grain" />
                    {src && (
                        <img
                            src={src}
                            alt={t('about.photoAlt')}
                            loading="lazy"
                            decoding="async"
                            onError={() => setIndex((i) => i + 1)}
                            className="absolute inset-x-0 bottom-0 h-[94%] w-full object-contain object-bottom"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}