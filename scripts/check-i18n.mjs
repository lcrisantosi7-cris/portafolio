// Uso: node scripts/check-i18n.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const LOCALES = join(ROOT, 'src', 'i18n', 'locales')
const SRC = join(ROOT, 'src')
const LANGS = ['es', 'en']

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

function deepMerge(target, source) {
    for (const [key, value] of Object.entries(source)) {
        target[key] = isObject(value) && isObject(target[key]) ? deepMerge(target[key], value) : value
    }
    return target
}

function flatten(obj, prefix = '', out = new Set()) {
    for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key
        if (isObject(value)) flatten(value, path, out)
        else out.add(path)
    }
    return out
}

function loadLang(lang) {
    const files = readdirSync(LOCALES)
        .filter((f) => f.startsWith(lang) && f.endsWith('.json'))
        .sort()
    const merged = {}
    const problems = []

    for (const file of files) {
        try {
            const raw = readFileSync(join(LOCALES, file), 'utf8')
            if (raw.charCodeAt(0) === 0xfeff) problems.push(`${file} tiene BOM (guárdalo como UTF-8 sin BOM)`)
            deepMerge(merged, JSON.parse(raw.replace(/^\uFEFF/, '')))
        } catch (err) {
            problems.push(`JSON inválido en ${file}: ${err.message}`)
        }
    }
    return { files, keys: flatten(merged), problems }
}

function* walk(dir) {
    for (const name of readdirSync(dir)) {
        const full = join(dir, name)
        if (statSync(full).isDirectory()) {
            if (full !== LOCALES) yield* walk(full)
        } else if (/\.(jsx?|tsx?)$/.test(name)) {
            yield full
        }
    }
}

const add = (map, key, file) => map.set(key, [...(map.get(key) ?? []), file])

const used = new Map()
const dynamic = new Map()
const re = /\bt\(\s*(['"`])([^'"`]+)\1/g

for (const file of walk(SRC)) {
    const rel = relative(ROOT, file)
    for (const m of readFileSync(file, 'utf8').matchAll(re)) {
        const key = m[2]
        if (key.includes('${')) {
            const prefix = key.slice(0, key.indexOf('${'))
            if (prefix) add(dynamic, prefix, rel)
        } else {
            add(used, key, rel)
        }
    }
}

let failed = false
const loaded = {}

for (const lang of LANGS) {
    const { files, keys, problems } = loadLang(lang)
    loaded[lang] = keys
    console.log(`\n== ${lang.toUpperCase()} ==`)
    console.log('Archivos:', files.join(', ') || '(ninguno)')
    console.log('Claves cargadas:', keys.size)

    for (const p of problems) {
        failed = true
        console.log('PROBLEMA:', p)
    }

    const exists = (k) => keys.has(k) || [...keys].some((x) => x.startsWith(`${k}.`))
    const missing = [...used.keys()].filter((k) => !exists(k))
    const missingPrefix = [...dynamic.keys()].filter((p) => ![...keys].some((x) => x.startsWith(p)))

    for (const k of missing) {
        failed = true
        console.log(`FALTA: ${k}   (usada en ${[...new Set(used.get(k))].join(', ')})`)
    }
    for (const p of missingPrefix) {
        failed = true
        console.log(`FALTA grupo dinámico: ${p}*   (usado en ${[...new Set(dynamic.get(p))].join(', ')})`)
    }
    if (!missing.length && !missingPrefix.length) console.log('Todas las claves usadas existen.')
}

const onlyEs = [...loaded.es].filter((k) => !loaded.en.has(k))
const onlyEn = [...loaded.en].filter((k) => !loaded.es.has(k))
if (onlyEs.length || onlyEn.length) {
    console.log('\n== PARIDAD ES/EN ==')
    onlyEs.forEach((k) => console.log('Solo en ES:', k))
    onlyEn.forEach((k) => console.log('Solo en EN:', k))
}

process.exit(failed ? 1 : 0)