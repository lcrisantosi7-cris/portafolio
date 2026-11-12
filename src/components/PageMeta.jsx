import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function PageMeta({ title, description }) {
    const { t } = useTranslation()
    const fullTitle = title ? `${title} | Lux.dev` : t('meta.title')
    const fullDescription = description ?? t('meta.description')

    useEffect(() => {
        document.title = fullTitle

        let meta = document.querySelector('meta[name="description"]')
        if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('name', 'description')
            document.head.appendChild(meta)
        }
        meta.setAttribute('content', fullDescription)
    }, [fullTitle, fullDescription])

    return null
}