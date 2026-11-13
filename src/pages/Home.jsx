import { useEffect } from 'react'
import PageMeta from '../components/PageMeta'
import Hero from '../components/home/Hero'
import Manifesto from '../components/home/Manifesto'
import StarProject from '../components/home/StarProject'
import OtherWorlds from '../components/home/OtherWorlds'
import ContactCta from '../components/home/ContactCta'
import { ScrollTrigger } from '../lib/gsap'

export default function Home() {
    // Las fuentes cambian la altura de las secciones: recalcular los triggers
    useEffect(() => {
        document.fonts?.ready.then(() => ScrollTrigger.refresh())
    }, [])

    return (
        <>
            <PageMeta />
            <Hero />
            <Manifesto />
            <StarProject />
            <OtherWorlds />
            <ContactCta />
        </>
    )
}