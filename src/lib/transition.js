import { createContext, useContext } from 'react'

export const TransitionContext = createContext({ go: () => { } })

export const useTransition = () => useContext(TransitionContext)