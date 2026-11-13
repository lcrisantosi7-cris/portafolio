import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'
import esPages from './locales/es.pages.json'
import enPages from './locales/en.pages.json'

const STORAGE_KEY = 'lux-lang'
const SUPPORTED = ['es', 'en']

function readStored() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEY)
        return SUPPORTED.includes(value) ? value : null
    } catch {
        return null
    }
}

function writeStored(lng) {
    try {
        window.localStorage.setItem(STORAGE_KEY, lng)
    } catch {
        /* almacenamiento no disponible */
    }
}

i18n.use(initReactI18next).init({
    resources: {
        es: { translation: { ...es, ...esPages } },
        en: { translation: { ...en, ...enPages } },
    },
    lng: readStored() ?? 'es',
    fallbackLng: 'es',
    supportedLngs: SUPPORTED,
    interpolation: { escapeValue: false },
})

function syncLanguage(lng) {
    document.documentElement.lang = lng
    writeStored(lng)
}

syncLanguage(i18n.language)
i18n.on('languageChanged', syncLanguage)

export default i18n