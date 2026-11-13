const files = import.meta.glob('../assets/projects/*/*.{webp,png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
})

const bySlug = {}

for (const [path, url] of Object.entries(files)) {
    const match = path.match(/projects\/([^/]+)\/([^/]+)$/)
    if (!match) continue
    const [, slug, file] = match
        ; (bySlug[slug] ||= []).push({ url, name: file.replace(/\.[^.]+$/, '').toLowerCase() })
}

const PRIORITY = ['dashboard']
const rank = (name) => {
    const i = PRIORITY.indexOf(name)
    return i === -1 ? 99 : i
}

export function getProjectImages(slug) {
    return [...(bySlug[slug] ?? [])].sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name))
}