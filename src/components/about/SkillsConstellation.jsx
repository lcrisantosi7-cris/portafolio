import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../../lib/gsap'
import { TransitionLink } from '../TransitionLink'
import { TIERS, SKILLS, EDGES } from '../../data/skills'
import { projects } from '../../data/projects'

const C = 400
const toRad = (deg) => (deg * Math.PI) / 180

const TIER_STYLE = {
    core: { dot: 'fill-flame-500', ring: 'stroke-flame-500/50', swatch: 'bg-flame-500', r: 7 },
    proficient: { dot: 'fill-flame-400', ring: 'stroke-flame-400/40', swatch: 'bg-flame-400', r: 6 },
    inProjects: { dot: 'fill-azure-400', ring: 'stroke-azure-400/40', swatch: 'bg-azure-400', r: 5 },
    exploring: { dot: 'fill-cream-100/80', ring: 'stroke-cream-100/25', swatch: 'bg-cream-100/80', r: 4.5 },
    learning: { dot: 'fill-glow-300', ring: 'stroke-glow-300/45', swatch: 'bg-glow-300', r: 5 },
}

const POS = {}
TIERS.forEach((tier) => {
    const items = SKILLS.filter((s) => s.tier === tier.id)
    items.forEach((s, i) => {
        const angle = tier.start + (i * 360) / items.length
        POS[s.id] = {
            angle,
            x: C + tier.radius * Math.cos(toRad(angle)),
            y: C + tier.radius * Math.sin(toRad(angle)),
        }
    })
})

const NEIGHBORS = {}
EDGES.forEach(([a, b]) => {
    ; (NEIGHBORS[a] ||= new Set()).add(b)
        ; (NEIGHBORS[b] ||= new Set()).add(a)
})

function labelProps(angle) {
    const dx = Math.cos(toRad(angle))
    const dy = Math.sin(toRad(angle))
    if (Math.abs(dx) < 0.36) return { x: 0, y: dy < 0 ? -20 : 28, anchor: 'middle' }
    return { x: dx > 0 ? 16 : -16, y: 5, anchor: dx > 0 ? 'start' : 'end' }
}

export default function SkillsConstellation() {
    const { t } = useTranslation()
    const root = useRef(null)
    const [active, setActive] = useState(null)

    const skill = SKILLS.find((s) => s.id === active)
    const related = active ? NEIGHBORS[active] : null
    const isLit = (id) => !active || id === active || related?.has(id)
    const used = skill?.usedIn.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean) ?? []

    useGSAP(
        () => {
            const mm = gsap.matchMedia(root.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const st = { trigger: root.current, start: 'top 70%', once: true }
                gsap.fromTo(
                    '[data-ring-draw]',
                    { strokeDashoffset: 1 },
                    { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.15, scrollTrigger: st },
                )
                gsap.from('[data-edges]', { opacity: 0, duration: 1, delay: 0.6, scrollTrigger: st })
                gsap.from('[data-pop]', { opacity: 0, duration: 0.6, stagger: 0.04, delay: 0.3, scrollTrigger: st })
            })

            return () => mm.revert()
        },
        { scope: root },
    )

    return (
        <section
            ref={root}
            aria-labelledby="constellation-title"
            className="relative overflow-hidden bg-void-950 px-6 py-24 md:py-32"
            style={{ backgroundImage: 'radial-gradient(60% 50% at 50% 50%, rgba(29,79,148,0.22), transparent 70%)' }}
        >
            <div className="mx-auto max-w-7xl">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                    {t('about.constellation.eyebrow')}
                </p>
                <h2
                    id="constellation-title"
                    className="mt-4 font-display font-condensed font-extrabold uppercase leading-[0.9] text-cream-100 text-[length:clamp(3rem,7vw,6rem)]"
                >
                    {t('about.constellation.title')}
                </h2>
                <p className="mt-5 max-w-2xl text-lg text-cream-100/75">{t('about.constellation.text')}</p>

                {/* Móvil: lista agrupada por nivel */}
                <div className="mt-12 space-y-8 md:hidden">
                    {TIERS.map((tier) => (
                        <div key={tier.id}>
                            <h3 className="flex items-center gap-2 font-display text-xl font-bold">
                                <span className={`size-2.5 rounded-full ${TIER_STYLE[tier.id].swatch}`} />
                                {t(`about.tiers.${tier.id}.name`)}
                            </h3>
                            <p className="mt-1 text-sm text-cream-100/65">{t(`about.tiers.${tier.id}.desc`)}</p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {SKILLS.filter((s) => s.tier === tier.id).map((s) => (
                                    <li key={s.id} className="rounded-full px-3 py-1 font-mono text-xs ring-1 ring-white/15">
                                        {s.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Escritorio: constelación interactiva */}
                <div className="mt-12 hidden gap-10 md:grid lg:grid-cols-[1fr_340px]">
                    <svg
                        viewBox="-110 -10 1020 820"
                        role="group"
                        aria-label={t('about.constellation.aria')}
                        className="h-auto w-full overflow-visible"
                    >
                        <rect x="-110" y="-10" width="1020" height="820" fill="transparent" onClick={() => setActive(null)} />

                        {TIERS.map((tier) => {
                            const dashed = tier.id === 'learning'
                            return (
                                <circle
                                    key={tier.id}
                                    data-ring-draw={dashed ? undefined : ''}
                                    cx={C}
                                    cy={C}
                                    r={tier.radius}
                                    fill="none"
                                    strokeWidth="1"
                                    className={dashed ? 'stroke-glow-300/40' : 'stroke-white/12'}
                                    {...(dashed ? { strokeDasharray: '3 9' } : { pathLength: 1, strokeDasharray: 1 })}
                                />
                            )
                        })}

                        <circle cx={C} cy={C} r="26" className="fill-none stroke-flame-500/30" strokeWidth="1" />
                        <circle cx={C} cy={C} r="11" className="fill-flame-500" />

                        <g data-edges>
                            {EDGES.map(([a, b]) => {
                                const hot = active && (a === active || b === active)
                                return (
                                    <line
                                        key={`${a}-${b}`}
                                        x1={POS[a].x}
                                        y1={POS[a].y}
                                        x2={POS[b].x}
                                        y2={POS[b].y}
                                        strokeWidth={hot ? 1.6 : 1}
                                        className={`transition-[stroke,opacity] duration-300 ${hot ? 'stroke-flame-500' : 'stroke-azure-400/20'
                                            } ${active && !hot ? 'opacity-30' : ''}`}
                                    />
                                )
                            })}
                        </g>

                        {SKILLS.map((s) => {
                            const p = POS[s.id]
                            const st = TIER_STYLE[s.tier]
                            const lp = labelProps(p.angle)
                            const isActive = active === s.id

                            return (
                                <g key={s.id} data-pop transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
                                    <g
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${s.label}, ${t(`about.tiers.${s.tier}.name`)}`}
                                        aria-pressed={isActive}
                                        onMouseEnter={() => setActive(s.id)}
                                        onMouseLeave={() => setActive(null)}
                                        onFocus={() => setActive(s.id)}
                                        onBlur={() => setActive(null)}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setActive(s.id)
                                        }}
                                        className={`cursor-pointer outline-none transition-opacity duration-300 ${isLit(s.id) ? 'opacity-100' : 'opacity-25'
                                            }`}
                                    >
                                        <circle r="24" fill="transparent" />
                                        <circle
                                            r={isActive ? 16 : 11}
                                            className={`fill-none ${isActive ? 'stroke-flame-500' : st.ring}`}
                                            strokeWidth="1"
                                        />
                                        <circle r={st.r} className={st.dot} />
                                        <text
                                            x={lp.x}
                                            y={lp.y}
                                            textAnchor={lp.anchor}
                                            fontSize="15"
                                            letterSpacing="1"
                                            className="select-none fill-cream-100 font-mono"
                                            stroke="rgba(3,6,15,0.9)"
                                            strokeWidth="4"
                                            strokeLinejoin="round"
                                            style={{ paintOrder: 'stroke' }}
                                        >
                                            {s.label}
                                        </text>
                                    </g>
                                </g>
                            )
                        })}
                    </svg>

                    <div
                        aria-live="polite"
                        className="self-start rounded-3xl bg-navy-900/60 p-8 ring-1 ring-white/10 lg:sticky lg:top-28"
                    >
                        {skill ? (
                            <div>
                                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                                    <span className={`size-2.5 rounded-full ${TIER_STYLE[skill.tier].swatch}`} />
                                    {t(`about.tiers.${skill.tier}.name`)}
                                </p>
                                <h3 className="mt-3 font-display text-4xl font-bold">{skill.label}</h3>

                                {used.length > 0 ? (
                                    <>
                                        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-cream-100/60">
                                            {t('about.constellation.usedIn')}
                                        </p>
                                        <ul className="mt-3 space-y-2">
                                            {used.map((p) => (
                                                <li key={p.slug}>
                                                    <TransitionLink to={`/projects/${p.slug}`} className="underline underline-offset-4">
                                                        {p.name}
                                                    </TransitionLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <p className="mt-6 text-cream-100/70">
                                        {skill.tier === 'learning'
                                            ? t('about.constellation.learningNote')
                                            : t('about.constellation.noProject')}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div>
                                <p className="text-cream-100/70">{t('about.constellation.hint')}</p>
                                <ul className="mt-6 space-y-5">
                                    {TIERS.map((tier) => (
                                        <li key={tier.id} className="flex gap-3">
                                            <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${TIER_STYLE[tier.id].swatch}`} />
                                            <span>
                                                <span className="block font-display text-lg font-bold">
                                                    {t(`about.tiers.${tier.id}.name`)}
                                                </span>
                                                <span className="block text-sm text-cream-100/65">{t(`about.tiers.${tier.id}.desc`)}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}