import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../../lib/gsap'

const C = 400
const toRad = (deg) => (deg * Math.PI) / 180

// Ángulos en grados SVG (0° = derecha, 90° = abajo). Zonas libres de nombre, cabeza y texto.
const NODES = [
    { id: 'backend', r: 230, angle: 196, side: 'left', drift: 6, duration: 11 },
    { id: 'frontend', r: 290, angle: 346, side: 'right', drift: 6, duration: 13 },
    { id: 'vision', r: 345, angle: 4, side: 'right', drift: 5, duration: 15 },
    { id: 'cloud', r: 392, angle: 16, side: 'right', drift: 4, duration: 17, dashed: true },
]

const pointAt = (r, angle) => ({
    x: C + r * Math.cos(toRad(angle)),
    y: C + r * Math.sin(toRad(angle)),
})

const translateAt = (r, angle) => {
    const { x, y } = pointAt(r, angle)
    return `translate(${x.toFixed(2)} ${y.toFixed(2)})`
}

export default function OrbitDiagram({ className = '' }) {
    const { t } = useTranslation()
    const root = useRef(null)

    useGSAP(
        () => {
            const mm = gsap.matchMedia(root.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                NODES.forEach(({ id, r, angle, drift, duration }, i) => {
                    const el = root.current.querySelector(`[data-node="${id}"]`)
                    const state = { a: -drift }
                    const place = () => el.setAttribute('transform', translateAt(r, angle + state.a))

                    place()
                    gsap.to(state, {
                        a: drift,
                        duration,
                        ease: 'sine.inOut',
                        yoyo: true,
                        repeat: -1,
                        delay: -i * 2.3,
                        onUpdate: place,
                    })
                })
            })

            return () => mm.revert()
        },
        { scope: root },
    )

    return (
        <svg ref={root} viewBox="0 0 800 800" role="img" aria-label={t('hero.orbitAria')} className={className}>
            {NODES.map(({ id, r, angle, side, dashed }) => {
                const label = side === 'left' ? { x: -22, anchor: 'end' } : { x: 22, anchor: 'start' }

                return (
                    <g key={id} className="orbit-in">
                        <circle
                            data-draw={dashed ? undefined : ''}
                            cx={C}
                            cy={C}
                            r={r}
                            fill="none"
                            strokeWidth="1"
                            className={dashed ? 'stroke-flame-400/45' : 'stroke-azure-400/35'}
                            {...(dashed ? { strokeDasharray: '3 9' } : { pathLength: 1, strokeDasharray: 1 })}
                        />
                        <g data-node={id} transform={translateAt(r, angle)}>
                            <circle r="15" className="fill-none stroke-flame-500/35" strokeWidth="1" />
                            <circle r="4.5" className={dashed ? 'fill-flame-400' : 'fill-flame-500'} />
                            <text
                                className="orbit-label fill-cream-100 font-mono"
                                x={label.x}
                                y="5"
                                textAnchor={label.anchor}
                                fontSize="15"
                                letterSpacing="1.4"
                                stroke="rgba(3,6,15,0.85)"
                                strokeWidth="4"
                                strokeLinejoin="round"
                                style={{ paintOrder: 'stroke' }}
                            >
                                {t(`hero.nodes.${id}`)}
                            </text>
                        </g>
                    </g>
                )
            })}
        </svg>
    )
}