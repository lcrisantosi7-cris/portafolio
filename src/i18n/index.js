import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const STORAGE_KEY = 'lux-lang'
const SUPPORTED = ['es', 'en']

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    target[key] = isObject(value) && isObject(target[key]) ? deepMerge(target[key], value) : value
  }
  return target
}

// Une todos los archivos es*.json / en*.json de la carpeta locales
const collect = (modules) =>
  Object.keys(modules)
    .sort()
    .reduce((acc, path) => deepMerge(acc, structuredClone(modules[path])), {})

const es = collect(import.meta.glob('./locales/es*.json', { eager: true, import: 'default' }))
const en = collect(import.meta.glob('./locales/en*.json', { eager: true, import: 'default' }))

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
  resources: { es: { translation: es }, en: { translation: en } },
  lng: readStored() ?? 'es',
  fallbackLng: 'es',
  supportedLngs: SUPPORTED,
  interpolation: { escapeValue: false },
  saveMissing: import.meta.env.DEV,
  missingKeyHandler: (lngs, _ns, key) => {
    console.warn(`[i18n] Falta la clave "${key}" (${lngs.join(', ')})`)
  },
})

function syncLanguage(lng) {
  document.documentElement.lang = lng
  writeStored(lng)
}

syncLanguage(i18n.language)
i18n.on('languageChanged', syncLanguage)

export default i18n