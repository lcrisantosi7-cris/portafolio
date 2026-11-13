export const TIERS = [
    { id: 'core', radius: 100, start: 270 },
    { id: 'proficient', radius: 175, start: 90 },
    { id: 'inProjects', radius: 258, start: 250 },
    { id: 'exploring', radius: 328, start: 20 },
    { id: 'learning', radius: 386, start: 150 },
]

const ALL = ['retailvision', 'alfapet', 'educore']

export const SKILLS = [
    { id: 'javascript', label: 'JavaScript', tier: 'core', usedIn: ['educore'] },
    { id: 'react', label: 'React', tier: 'core', usedIn: ['retailvision', 'alfapet'] },
    { id: 'nodejs', label: 'Node.js', tier: 'core', usedIn: ['alfapet'] },

    { id: 'html', label: 'HTML', tier: 'proficient', usedIn: ['educore'] },
    { id: 'css', label: 'CSS', tier: 'proficient', usedIn: ['educore'] },
    { id: 'tailwind', label: 'Tailwind CSS', tier: 'proficient', usedIn: ['alfapet'] },

    { id: 'typescript', label: 'TypeScript', tier: 'inProjects', usedIn: ['alfapet'] },
    { id: 'python', label: 'Python', tier: 'inProjects', usedIn: ['retailvision'] },
    { id: 'fastapi', label: 'FastAPI', tier: 'inProjects', usedIn: ['retailvision'] },
    { id: 'postgresql', label: 'PostgreSQL', tier: 'inProjects', usedIn: ['alfapet', 'educore'] },
    { id: 'supabase', label: 'Supabase', tier: 'inProjects', usedIn: ['alfapet', 'educore'] },
    { id: 'php', label: 'PHP', tier: 'inProjects', usedIn: ['educore'] },
    { id: 'docker', label: 'Docker', tier: 'inProjects', usedIn: ['alfapet'] },
    { id: 'git', label: 'Git', tier: 'inProjects', usedIn: ALL },
    { id: 'github', label: 'GitHub', tier: 'inProjects', usedIn: ALL },
    { id: 'yolov8', label: 'YOLOv8', tier: 'inProjects', usedIn: ['retailvision'] },
    { id: 'opencv', label: 'OpenCV', tier: 'inProjects', usedIn: ['retailvision'] },

    { id: 'vue', label: 'Vue.js', tier: 'exploring', usedIn: [] },
    { id: 'laravel', label: 'Laravel', tier: 'exploring', usedIn: [] },
    { id: 'mongodb', label: 'MongoDB', tier: 'exploring', usedIn: [] },
    { id: 'sqlserver', label: 'SQL Server', tier: 'exploring', usedIn: [] },

    { id: 'aws', label: 'AWS', tier: 'learning', usedIn: [] },
    { id: 'cloud', label: 'Cloud architecture', tier: 'learning', usedIn: [] },
]

export const EDGES = [
    ['javascript', 'react'],
    ['javascript', 'nodejs'],
    ['javascript', 'typescript'],
    ['javascript', 'html'],
    ['react', 'typescript'],
    ['react', 'tailwind'],
    ['react', 'fastapi'],
    ['html', 'css'],
    ['css', 'tailwind'],
    ['typescript', 'supabase'],
    ['nodejs', 'docker'],
    ['python', 'fastapi'],
    ['python', 'opencv'],
    ['python', 'yolov8'],
    ['opencv', 'yolov8'],
    ['postgresql', 'supabase'],
    ['php', 'postgresql'],
    ['git', 'github'],
    ['vue', 'javascript'],
    ['laravel', 'php'],
    ['mongodb', 'nodejs'],
    ['sqlserver', 'postgresql'],
    ['aws', 'docker'],
    ['aws', 'postgresql'],
    ['cloud', 'aws'],
]