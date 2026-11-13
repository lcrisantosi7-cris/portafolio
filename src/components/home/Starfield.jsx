const STARS = Array.from({ length: 80 }, (_, i) => {
    const r = (n) => {
        const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
        return x - Math.floor(x)
    }
    return {
        id: i,
        left: r(1) * 100,
        top: r(2) * 100,
        size: 1 + r(3) * 1.6,
        opacity: 0.25 + r(4) * 0.55,
        twinkle: r(5) > 0.65,
        delay: r(6) * 6,
        duration: 3 + r(7) * 4,
    }
})

export default function Starfield({ className = '' }) {
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
            {STARS.map((s) => (
                <span
                    key={s.id}
                    className={`absolute rounded-full bg-cream-100 ${s.twinkle ? 'animate-twinkle' : ''}`}
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}
        </div>
    )
}