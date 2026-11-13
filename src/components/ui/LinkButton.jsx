import { TransitionLink } from '../TransitionLink'

const BASE =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,transform,box-shadow] duration-300'

const VARIANTS = {
    primary:
        'bg-flame-500 text-navy-950 hover:-translate-y-0.5 hover:bg-flame-400 hover:shadow-[0_12px_30px_-10px_rgba(255,106,19,0.8)]',
    ghost: 'text-cream-100 ring-1 ring-white/25 hover:-translate-y-0.5 hover:bg-white/10',
}

export default function LinkButton({ to, href, variant = 'primary', className = '', children, ...rest }) {
    const classes = `${BASE} ${VARIANTS[variant]} ${className}`

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
                {children}
            </a>
        )
    }

    return (
        <TransitionLink to={to} className={classes} {...rest}>
            {children}
        </TransitionLink>
    )
}