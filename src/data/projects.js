export const STATUS = {
    IMPLEMENTED: 'implemented',
    IN_DEVELOPMENT: 'inDevelopment',
}

const PLANET = {
    retailvision:
        'radial-gradient(circle at 32% 28%, #ffe2b8 0%, #ffa24a 14%, #ff6a13 34%, #b53209 58%, #3a1019 80%, #0a1226 100%)',
    alfapet: 'radial-gradient(circle at 30% 30%, #cfe0ff 0%, #6d97e6 24%, #1d4f94 55%, #071a33 100%)',
    educore: 'radial-gradient(circle at 30% 30%, #fff3dc 0%, #e8cfa0 24%, #a8845a 55%, #2a1d14 100%)',
}

export const projects = [
    {
        slug: 'retailvision',
        name: 'RetailVision Analytics',
        year: 2026,
        tier: 'star',
        status: STATUS.IMPLEMENTED,
        caseStudy: true,
        diagram: 'pipeline',
        planet: PLANET.retailvision,
        stack: ['Python', 'FastAPI', 'YOLOv8', 'OpenCV', 'React', 'Vite', 'Recharts'],
        repoUrl: 'https://github.com/lcrisantosi7-cris/retailvision-analytics',
        deployUrl: null,
    },
    {
        slug: 'alfapet',
        name: 'AlfaPet',
        year: 2026,
        tier: 'featured',
        status: STATUS.IMPLEMENTED,
        caseStudy: true,
        planet: PLANET.alfapet,
        stack: ['React', 'TypeScript', 'React Router', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Zod'],
        repoUrl: 'https://github.com/lcrisantosi7-cris/AlfaPet',
        deployUrl: 'https://alfapet.vercel.app',
    },
    {
        slug: 'educore',
        name: 'EduCore',
        year: 2024,
        tier: 'featured',
        status: STATUS.IMPLEMENTED,
        caseStudy: true,
        planet: PLANET.educore,
        stack: ['PHP', 'PostgreSQL', 'Supabase', 'JavaScript'],
        repoUrl: 'https://github.com/lcrisantosi7-cris/Sistema-Gestion-Escolar',
        deployUrl: null,
    },
    {
        slug: 'plantmilk',
        name: 'PlantMilk',
        year: 2026, // por verificar
        tier: 'secondary',
        status: STATUS.IN_DEVELOPMENT, // por verificar
        caseStudy: false,
        stack: [], // por verificar con el repositorio
        repoUrl: 'https://github.com/lcrisantosi7-cris/plantmilk',
        deployUrl: 'https://plantmilk.lovable.app',
    },
    {
        slug: 'winterbeauty',
        hidden: true, // oculto hasta tener datos reales
        name: 'WinterBeauty',
        year: null,
        tier: 'secondary',
        status: STATUS.IN_DEVELOPMENT,
        caseStudy: false,
        stack: [],
        repoUrl: null,
        deployUrl: null,
    },
    {
        slug: 'nexusiq',
        hidden: true, // oculto hasta tener datos reales
        name: 'NexusIQ',
        year: null,
        tier: 'secondary',
        status: STATUS.IN_DEVELOPMENT,
        caseStudy: false,
        stack: [],
        repoUrl: null,
        deployUrl: null,
    },
]