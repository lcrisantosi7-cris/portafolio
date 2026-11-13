import { useTranslation } from 'react-i18next'

const C = 400
const toRad = (deg) => (deg * Math.PI) / 180

const NODES = [
    { id: 'backend', r: 230, angle: 215, duration: 160, dashed: false },
    { id: 'frontend', r: 290, angle: 330, duration: 210, dashed: false },
    { id: 'vision', r: 345, angle: 100, duration: 260, dashed: false },
    { id: 'cloud', r: 392, angle: 195, duration: 320, dashed: true },
]

export default function OrbitDiagram({ className = '' }) {
    const { t } = useTranslation()

    return (
        <svg viewBox="0 0 800 800" role="img" aria-label={t('hero.orbitAria')} className={className}>
            {NODES.map(({ id, r, angle, duration, dashed }, i) => {
                const x = C + r * Math.cos(toRad(angle))
                const y = C + r * Math.sin(toRad(angle))
                const outward = x >= C ? 1 : -1
                const direction = i % 2 ? 'reverse' : 'normal'

                return (
                    <g key={id} className="orbit-in">
                        <circle
                            className={`orbit-ring ${dashed ? 'stroke-flame-400/40' : 'stroke-azure-400/30'}`}
                            data-draw={dashed ? undefined : ''}
                            cx={C}
                            cy={C}
                            r={r}
                            fill="none"
                            strokeWidth="1"
                            {...(dashed ? { strokeDasharray: '3 9' } : { pathLength: 1, strokeDasharray: 1 })}
                        />
                        <g
                            className="animate-orbit"
                            style={{
                                transformOrigin: `${C}px ${C}px`,
                                animationDuration: `${duration}s`,
                                animationDirection: direction,
                            }}
                        >
                            <g transform={`translate(${x} ${y})`}>
                                <circle r="14" className="fill-none stroke-flame-500/35" strokeWidth="1" />
                                <circle r="4.5" className={dashed ? 'fill-flame-400' : 'fill-flame-500'} />
                                <g
                                    className="animate-orbit-rev max-sm:hidden"
                                    style={{
                                        transformOrigin: '0px 0px',
                                        animationDuration: `${duration}s`,
                                        animationDirection: direction,
                                    }}
                                >
                                    <text
                                        x={outward * 24}
                                        y="5"
                                        textAnchor={outward > 0 ? 'start' : 'end'}
                                        fontSize="15"
                                        letterSpacing="1.2"
                                        className="fill-cream-100 font-mono"
                                    >
                                        {t(`hero.nodes.${id}`)}
                                    </text>
                                </g>
                            </g>
                        </g>
                    </g>
                )
            })}
        </svg>
    )
}