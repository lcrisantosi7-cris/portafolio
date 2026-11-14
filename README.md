# Luis Crisanto — Portfolio

Portafolio profesional de **Luis Crisanto**, estudiante de Ingeniería de Sistemas y desarrollador Full Stack en Perú. Presenta proyectos, decisiones técnicas, habilidades, formación y vías de contacto.

**Producción:** https://luis-crisanto.vercel.app  
**Repositorio:** https://github.com/lcrisantosi7-cris/portafolio

## Experiencia

- Home editorial con identidad visual espacial, composición responsive y animaciones GSAP.
- Perfil, formación y mapa visual de tecnologías.
- Catálogo de proyectos y casos de estudio con problema, solución, arquitectura, stack, capturas y aprendizajes.
- Formulario de contacto con validación en cliente y servidor, envío mediante Brevo y respuesta automática.
- Contenido en español e inglés.
- Navegación responsive, transiciones de página y scroll suave.
- Metadatos SEO, Open Graph, sitemap y recursos optimizados.

## Proyectos destacados

| Proyecto | Enfoque | Tecnologías |
| --- | --- | --- |
| RetailVision Analytics | Analítica de afluencia y visión por computadora | Python, FastAPI, YOLOv8, OpenCV, React |
| AlfaPet | Gestión clínica veterinaria | React, TypeScript, Supabase, PostgreSQL, Zod |
| EduCore | Gestión académica | PHP, PostgreSQL, JavaScript |
| PlantMilk | Comercio electrónico | En desarrollo |

Los estados y resultados de cada proyecto se describen en sus respectivas fichas. No se presentan como métricas verificadas los resultados que todavía no han sido medidos.

## Stack del portafolio

- React 19 + Vite
- Tailwind CSS 4
- React Router
- GSAP + ScrollTrigger
- Lenis
- i18next
- Vercel Functions + Brevo para el formulario

## Requisitos

- Node.js 22 o una versión compatible con Vite 8.
- pnpm (se incluye `pnpm-lock.yaml`).

## Desarrollo local

```bash
git clone https://github.com/lcrisantosi7-cris/portafolio.git
cd portafolio
pnpm install
pnpm dev
```

Abre la URL local que indique Vite (normalmente http://localhost:5173).

## Verificaciones

```bash
pnpm lint
pnpm build
pnpm preview
```

## Variables de entorno

Configura estas variables en Vercel para habilitar el formulario:

| Variable | Requerida | Descripción |
| --- | --- | --- |
| `BREVO_API_KEY` | Sí | API key privada de Brevo. Solo se usa en la función serverless. |
| `CONTACT_TO` | No | Correo que recibe los mensajes. |
| `CONTACT_SENDER` | No | Remitente verificado en Brevo. |
| `ALLOWED_ORIGINS` | No | Orígenes adicionales separados por comas. |

No agregues secretos al frontend, al repositorio ni a variables con prefijo `VITE_`. Después de cambiar variables en Vercel, vuelve a desplegar para que la función reciba los nuevos valores.

## Seguridad y privacidad

- La API de contacto acepta únicamente POST, valida tipos y longitudes, limita el tamaño de la solicitud y comprueba el origen cuando el navegador lo envía.
- Los valores dinámicos se escapan antes de insertarse en las plantillas HTML de correo.
- Hay un honeypot y límites de frecuencia por IP y correo.
- El rate limiting actual vive en memoria por instancia serverless: es una defensa básica, no un límite global distribuido. Para tráfico alto, añade un almacén compartido (por ejemplo, Redis/KV) y protección perimetral.
- Las claves de Brevo deben permanecer en variables de entorno privadas.
- El sitio aplica cabeceras HTTP de seguridad desde `vercel.json`.

## Despliegue

El proyecto está preparado para Vercel:

1. Importa el repositorio en Vercel.
2. Framework preset: **Vite**.
3. Build command: `pnpm build`.
4. Output directory: `dist`.
5. Configura las variables de entorno de la sección anterior.
6. Despliega y prueba el formulario desde el dominio de producción.

La configuración de rutas SPA y cabeceras HTTP está en `vercel.json`.

## Estructura

```
api/                 Funciones serverless
public/              Recursos estáticos, imágenes, fuentes y CV
src/
  components/        Componentes de interfaz
  data/              Proyectos, enlaces y habilidades
  hooks/             Hooks reutilizables
  i18n/              Traducciones ES/EN
  layouts/           Estructura compartida
  lib/               Integraciones y utilidades
  pages/             Rutas de la aplicación
scripts/             Herramientas de mantenimiento
```

## Licencia

El contenido, fotografía y recursos de marca de este portafolio pertenecen a sus respectivos autores. Solicita autorización antes de reutilizarlos.
