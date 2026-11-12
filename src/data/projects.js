export const STATUS = {
    IMPLEMENTED: 'implemented',
    IN_DEVELOPMENT: 'inDevelopment',
}

export const projects = [
    {
        slug: 'retailvision',
        name: 'RetailVision Analytics',
        year: 2026,
        tier: 'star',
        status: STATUS.IMPLEMENTED,
        caseStudy: true,
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
        stack: ['PHP', 'PostgreSQL', 'Supabase', 'JavaScript'],
        repoUrl: 'https://github.com/lcrisantosi7-cris/Sistema-Gestion-Escolar',
        deployUrl: null,
    },
    {
        slug: 'plantmilk',
        name: 'PlantMilk',
        year: null, // por verificar
        tier: 'secondary',
        status: null, // por verificar
        caseStudy: false,
        stack: [], // por verificar con el repositorio
        repoUrl: 'https://github.com/lcrisantosi7-cris/plantmilk',
        deployUrl: null,
    },
    {
        slug: 'winterbeauty',
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