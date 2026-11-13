export default function PipelineDiagram({ steps }) {
    if (!Array.isArray(steps)) return null

    return (
        <ol className="grid gap-8 md:grid-cols-5 md:gap-5">
            {steps.map((step, i) => (
                <li
                    key={step.title}
                    className="relative rounded-2xl bg-navy-900/60 p-5 ring-1 ring-white/10"
                >
                    <span className="font-mono text-xs text-flame-400">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
                    <p className="mt-1 font-mono text-xs text-cream-100/70">{step.text}</p>

                    {i < steps.length - 1 && (
                        <>
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 20 12"
                                className="absolute left-full top-1/2 hidden h-3 w-5 -translate-y-1/2 md:block"
                            >
                                <path d="M1 6h14M11 2l5 4-5 4" fill="none" stroke="#ff6a13" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 12 20"
                                className="absolute left-1/2 top-full h-5 w-3 -translate-x-1/2 md:hidden"
                            >
                                <path d="M6 1v14M2 11l4 5 4-5" fill="none" stroke="#ff6a13" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                        </>
                    )}
                </li>
            ))}
        </ol>
    )
}