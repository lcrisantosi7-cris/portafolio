import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../../lib/gsap'
import LinkButton from '../ui/LinkButton'
import Starfield from './Starfield'
import OrbitDiagram from './OrbitDiagram'

const PHOTO_SOURCES = ['/assets/images/luis-cutout.png', '/assets/images/luis-original.jpg']
const FADE_MASK = 'linear-gradient(to top, transparent 0%, #000 22%)'

export default function Hero() {
    const { t } = useTranslation()
    const root = useRef(null)
    const [photoIndex, setPhotoIndex] = useState(0)
    const photoSrc = PHOTO_SOURCES[photoIndex]
    const isCutout = photoIndex === 0

    useGSAP(
        () => {
            const mm = gsap.matchMedia(root.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // Intro (≈2 s, se salta con clic o tecla)
                const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
                intro
                    .from('[data-hero="nebula"]', { opacity: 0, duration: 1.2 }, 0)
                    .from('[data-hero="planet"]', { yPercent: 9, opacity: 0, duration: 1.4, ease: 'power4.out' }, 0.1)
                    .from('.orbit-in', { scale: 0.82, opacity: 0, svgOrigin: '400 400', duration: 1.2, stagger: 0.12 }, 0.3)
                    .fromTo(
                        '[data-draw]',
                        { strokeDashoffset: 1 },
                        { strokeDashoffset: 0, duration: 1.6, stagger: 0.12, ease: 'power2.inOut' },
                        0.3,
                    )
                    .from('[data-hero="name-line"]', { yPercent: 105, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.45)
                    .from('[data-hero="photo"]', { opacity: 0, yPercent: 6, duration: 1.1 }, 0.7)
                    .from('[data-hero="fade"]', { opacity: 0, y: 18, duration: 0.8, stagger: 0.1 }, 1.0)

                const skip = () => intro.progress(1)
                window.addEventListener('pointerdown', skip, { once: true })
                window.addEventListener('keydown', skip, { once: true })

                // Scroll: el planeta crece y eclipsa, las capas se separan
                const trigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
                gsap.to('[data-scroll="planet"]', { y: -120, scale: 1.35, ease: 'none', scrollTrigger: trigger })
                gsap.to('[data-scroll="name"]', { y: -90, ease: 'none', scrollTrigger: trigger })
                gsap.to('[data-scroll="photo"]', { y: -40, ease: 'none', scrollTrigger: trigger })
                gsap.to('[data-scroll="orbit"]', { y: 60, scale: 1.08, ease: 'none', scrollTrigger: trigger })
                gsap.to('[data-scroll="copy"]', {
                    y: -30,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: { ...trigger, end: '60% top' },
                })

                return () => {
                    window.removeEventListener('pointerdown', skip)
                    window.removeEventListener('keydown', skip)
                }
            })

            // Parallax con el cursor (solo mouse)
            mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
                const layers = gsap.utils.toArray('[data-depth]', root.current).map((el) => ({
                    depth: parseFloat(el.dataset.depth),
                    x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
                    y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
                }))

                const onMove = (e) => {
                    const nx = e.clientX / window.innerWidth - 0.5
                    const ny = e.clientY / window.innerHeight - 0.5
                    layers.forEach((l) => {
                        l.x(nx * l.depth)
                        l.y(ny * l.depth)
                    })
                }

                window.addEventListener('pointermove', onMove)
                return () => window.removeEventListener('pointermove', onMove)
            })

            return () => mm.revert()
        },
        { scope: root },
    )

    return (
        <section
            ref={root}
            aria-labelledby="hero-title"
            className="relative isolate h-svh min-h-[640px] overflow-hidden bg-void-950"
        >
            {/* Fondo: nebulosa + estrellas */}
            <div
                data-hero="nebula"
                aria-hidden="true"
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'radial-gradient(60% 50% at 78% 28%, rgba(29,79,148,0.55) 0%, transparent 70%), radial-gradient(45% 40% at 12% 18%, rgba(255,106,19,0.14) 0%, transparent 70%), linear-gradient(180deg, #071a33 0%, #040a16 55%, #03060f 100%)',
                }}
            />
            <Starfield className="z-[1]" />

            {/* Planeta: horizonte naranja que ilumina */}
            <div
                data-scroll="planet"
                data-hero="planet"
                aria-hidden="true"
                className="absolute inset-x-[-18%] top-[68%] z-[2]"
            >
                <div
                    data-depth="24"
                    className="relative aspect-square w-full overflow-hidden rounded-full"
                    style={{
                        background:
                            'radial-gradient(ellipse 55% 36% at 52% 0%, #ffd9a3 0%, #ffa24a 9%, #ff6a13 22%, #b53209 36%, #4a1520 50%, #0a1226 72%)',
                        boxShadow: '0 -24px 120px 10px rgba(255,106,19,0.45), inset 0 18px 60px rgba(255,214,160,0.35)',
                    }}
                >
                    <div className="grain" />
                </div>
            </div>

            {/* Órbitas: mapa de mis áreas */}
            <div
                data-scroll="orbit"
                className="pointer-events-none absolute inset-0 z-[3] grid place-items-center pt-[10svh]"
            >
                <div data-depth="12" className="w-[min(125vmin,1050px)]">
                    <OrbitDiagram className="h-auto w-full overflow-visible" />
                </div>
            </div>

            {/* Nombre: queda detrás de la foto */}
            <h1
                id="hero-title"
                data-scroll="name"
                className="pointer-events-none absolute inset-x-0 top-[12svh] z-[4] flex select-none flex-col items-center font-display font-condensed font-extrabold uppercase leading-[0.9] tracking-[-0.01em] text-[length:clamp(5rem,21vw,12rem)] md:top-[15svh] md:flex-row md:justify-center md:gap-[0.22em] md:text-[length:clamp(5rem,12.6vw,15rem)]"
            >
                <span className="block overflow-hidden py-[0.03em]">
                    <span data-hero="name-line" className="block text-flame-gradient">
                        Luis
                    </span>
                </span>
                <span className="block overflow-hidden py-[0.03em]">
                    <span data-hero="name-line" className="block text-flame-gradient">
                        Crisanto
                    </span>
                </span>
            </h1>

            {/* Foto */}
            <div
                data-scroll="photo"
                data-hero="photo"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex justify-center"
            >
                <div data-depth="-14" className="relative">
                    {photoSrc && (
                        <img
                            src={photoSrc}
                            alt={t('hero.photoAlt')}
                            fetchPriority="high"
                            decoding="async"
                            onError={() => setPhotoIndex((i) => i + 1)}
                            className={
                                isCutout
                                    ? 'block h-[66svh] w-auto max-w-none md:h-[84svh]'
                                    : 'block h-[60svh] w-auto max-w-none rounded-t-[999px] object-cover md:h-[76svh]'
                            }
                            style={{
                                maskImage: FADE_MASK,
                                WebkitMaskImage: FADE_MASK,
                                filter: isCutout
                                    ? 'drop-shadow(0 0 1.5px rgba(255,170,90,0.9)) drop-shadow(0 0 70px rgba(255,106,19,0.3))'
                                    : undefined,
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Desvanecido inferior hacia la siguiente sección */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-void-950 to-transparent"
            />

            {/* Texto y llamadas a la acción */}
            <div
                data-scroll="copy"
                className="absolute inset-x-0 bottom-0 z-[6] bg-gradient-to-t from-void-950/90 via-void-950/55 to-transparent px-5 pb-8 pt-24 md:bg-none md:px-12 md:pb-14 md:pt-0"
            >
                <div className="mx-auto flex max-w-[1500px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-md">
                        <p
                            data-hero="fade"
                            className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300"
                        >
                            {t('hero.eyebrow')}
                        </p>
                        <p data-hero="fade" className="mt-3 text-lg leading-snug text-cream-100/85 md:text-xl">
                            {t('hero.tagline')}
                        </p>
                        <div data-hero="fade" className="mt-6 flex flex-wrap gap-3">
                            <LinkButton to="/projects/retailvision">{t('hero.ctaProject')}</LinkButton>
                            <LinkButton to="/contact" variant="ghost">
                                {t('hero.ctaContact')}
                            </LinkButton>
                        </div>
                    </div>

                    <div
                        data-hero="fade"
                        aria-hidden="true"
                        className="hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-cream-100/60 md:flex"
                    >
                        <span>{t('hero.scroll')}</span>
                        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
                            <span className="absolute inset-x-0 top-0 h-1/2 animate-scrollcue bg-flame-500" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}