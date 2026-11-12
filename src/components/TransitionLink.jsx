import { Link, NavLink } from 'react-router'
import { useTransition } from '../lib/transition'

function useGuardedClick(to, onClick, target) {
    const { go } = useTransition()

    return (e) => {
        onClick?.(e)
        if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            target === '_blank'
        ) {
            return
        }
        e.preventDefault()
        go(to)
    }
}

export function TransitionLink({ to, onClick, target, ...rest }) {
    const handleClick = useGuardedClick(to, onClick, target)
    return <Link to={to} target={target} onClick={handleClick} {...rest} />
}

export function TransitionNavLink({ to, onClick, target, ...rest }) {
    const handleClick = useGuardedClick(to, onClick, target)
    return <NavLink to={to} target={target} onClick={handleClick} {...rest} />
}