/**
 * emailTemplates.js
 * Diseño alineado a la paleta del portafolio (naranja / coral / índigo).
 * Soporte de modo claro/oscuro vía prefers-color-scheme.
 * Nota: el soporte real varía por cliente — Apple Mail, Outlook (nuevo) y
 * clientes de escritorio lo respetan; Gmail en su mayoría lo ignora.
 */

const URL = 'https://luis-crisanto.vercel.app'

// ─── Bloque de estilos: claro por defecto, oscuro si el cliente lo soporta ───
const STYLE_BLOCK = `
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    body { margin:0; padding:0; }
    .bg      { background:#f3f1fa !important; }
    .card    { background:#ffffff !important; border-color:#e9e5f4 !important; }
    .divider { border-color:#e9e5f4 !important; }
    .text-1  { color:#171426 !important; }
    .text-2  { color:#4c4760 !important; }
    .text-3  { color:#8b86a0 !important; }
    .chip    { background:#f6f3ff !important; border-color:#e3ddf7 !important; }
    .msgbox  { background:#f9f7ff !important; border-color:#ece7fb !important; }
    .btn-alt { background:#f6f3ff !important; border-color:#e3ddf7 !important; color:#171426 !important; }
    .badge   { background:#fdeee3 !important; border-color:#fbd9bd !important; color:#c8622a !important; }

    @media (prefers-color-scheme: dark) {
      .bg      { background:#0d0b14 !important; }
      .card    { background:#13101f !important; border-color:rgba(255,255,255,0.08) !important; }
      .divider { border-color:rgba(255,255,255,0.08) !important; }
      .text-1  { color:#ffffff !important; }
      .text-2  { color:rgba(255,255,255,0.55) !important; }
      .text-3  { color:rgba(255,255,255,0.32) !important; }
      .chip    { background:rgba(252,143,84,0.08) !important; border-color:rgba(252,143,84,0.25) !important; }
      .msgbox  { background:#0d0b14 !important; border-color:rgba(255,255,255,0.08) !important; }
      .btn-alt { background:rgba(255,255,255,0.05) !important; border-color:rgba(255,255,255,0.1) !important; color:#ffffff !important; }
      .badge   { background:rgba(252,143,84,0.1) !important; border-color:rgba(252,143,84,0.3) !important; color:#ffb388 !important; }
    }
  </style>
`

const HEAD = (title) => `
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light dark"/>
<meta name="supported-color-schemes" content="light dark"/>
<title>${title}</title>
${STYLE_BLOCK}
`

// ─── Notificación para ti ─────────────────────────────────────────────────────
export const buildNotificationHtml = (name, email, message) => {
  const ts = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  const [projectLine, ...rest] = message.split('\n\n')
  const hasType = projectLine.startsWith('Tipo de proyecto:')
  const projectType = hasType ? projectLine.replace('Tipo de proyecto:', '').trim() : null
  const body = hasType ? rest.join('\n\n') : message

  return `<!DOCTYPE html>
<html lang="es">
<head>${HEAD('Nuevo mensaje — LC.dev')}</head>
<body class="bg" style="margin:0;padding:0;background:#f3f1fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table class="bg" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1fa;padding:48px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0">

  <!-- EYEBROW -->
  <tr><td style="padding-bottom:20px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:8px;vertical-align:middle;">
        <div style="width:7px;height:7px;background:#FC8F54;border-radius:50%;"></div>
      </td>
      <td style="vertical-align:middle;">
        <span class="text-3" style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#8b86a0;">
          LC.dev &nbsp;·&nbsp; Nuevo mensaje
        </span>
      </td>
    </tr></table>
  </td></tr>

  <!-- CARD -->
  <tr><td class="card" style="background:#ffffff;border-radius:20px;border:1px solid #e9e5f4;overflow:hidden;">
  <table width="100%" cellpadding="0" cellspacing="0">

    <!-- Accent bar -->
    <tr><td style="height:4px;background:linear-gradient(90deg,#FC8F54,#F5525B,#6867D2);font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- SENDER -->
    <tr><td class="divider" style="padding:36px 40px 28px;border-bottom:1px solid #e9e5f4;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="60" style="vertical-align:top;padding-right:18px;">
          <div style="width:56px;height:56px;background:linear-gradient(135deg,#FC8F54,#F5525B);border-radius:16px;text-align:center;line-height:56px;font-size:24px;font-weight:800;color:#fff;">
            ${name.charAt(0).toUpperCase()}
          </div>
        </td>
        <td style="vertical-align:top;">
          <p class="text-3" style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b86a0;">De</p>
          <p class="text-1" style="margin:0 0 5px;font-size:20px;font-weight:700;color:#171426;letter-spacing:-0.3px;">${name}</p>
          <a href="mailto:${email}" style="font-size:13px;color:#e8672f;text-decoration:none;font-family:monospace;">${email}</a>
          ${projectType ? `
          <div class="badge" style="display:inline-block;margin-top:10px;padding:4px 10px;background:#fdeee3;border:1px solid #fbd9bd;border-radius:20px;">
            <span style="font-size:11px;font-weight:700;color:#c8622a;">${projectType}</span>
          </div>` : ''}
        </td>
        <td style="vertical-align:top;text-align:right;">
          <p class="text-3" style="margin:0;font-size:11px;color:#8b86a0;line-height:1.6;">${ts}</p>
        </td>
      </tr></table>
    </td></tr>

    <!-- MESSAGE -->
    <tr><td style="padding:32px 40px 40px;">
      <p class="text-3" style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b86a0;">Mensaje</p>
      <div class="msgbox" style="background:#f9f7ff;border:1px solid #ece7fb;border-left:3px solid #FC8F54;border-radius:0 14px 14px 0;padding:22px 26px;margin-bottom:32px;">
        <p class="text-2" style="margin:0;font-size:15px;color:#4c4760;line-height:1.85;white-space:pre-wrap;">${body}</p>
      </div>
      <a href="mailto:${email}?subject=Re%3A%20Tu%20mensaje%20en%20mi%20portafolio"
         style="display:inline-block;padding:14px 28px;background:linear-gradient(90deg,#FC8F54,#F5525B);color:#fff;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.2px;">
        Responder ahora &rarr;
      </a>
    </td></tr>

  </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:18px 4px 0;text-align:center;">
    <p class="text-3" style="margin:0;font-size:12px;color:#8b86a0;font-family:monospace;">
      <a href="${URL}" style="color:#8b86a0;text-decoration:none;">luis-crisanto.vercel.app</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

// ─── Confirmación para el visitante ───────────────────────────────────────────
export const buildConfirmationHtml = (name) => `<!DOCTYPE html>
<html lang="es">
<head>${HEAD('Mensaje recibido — LC.dev')}</head>
<body class="bg" style="margin:0;padding:0;background:#f3f1fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table class="bg" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1fa;padding:48px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

  <!-- EYEBROW -->
  <tr><td style="padding-bottom:20px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:8px;vertical-align:middle;">
        <div style="width:7px;height:7px;background:#FC8F54;border-radius:50%;"></div>
      </td>
      <td style="vertical-align:middle;">
        <span class="text-3" style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#8b86a0;">
          LC.dev &nbsp;·&nbsp; Confirmación
        </span>
      </td>
    </tr></table>
  </td></tr>

  <!-- CARD -->
  <tr><td class="card" style="background:#ffffff;border-radius:20px;border:1px solid #e9e5f4;overflow:hidden;">
  <table width="100%" cellpadding="0" cellspacing="0">

    <!-- Accent bar -->
    <tr><td style="height:4px;background:linear-gradient(90deg,#FC8F54,#F5525B,#6867D2);font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- HERO -->
    <tr><td class="divider" style="padding:48px 40px 36px;border-bottom:1px solid #e9e5f4;text-align:center;">
      <div style="width:68px;height:68px;background:linear-gradient(135deg,#FC8F54,#F5525B);border-radius:50%;text-align:center;line-height:68px;font-size:30px;margin:0 auto 28px;color:#fff;">&#10003;</div>
      <h1 class="text-1" style="margin:0 0 16px;font-size:30px;font-weight:800;color:#171426;letter-spacing:-0.5px;line-height:1.2;">
        ¡Gracias por escribirme,<br/>${name}!
      </h1>
      <p class="text-2" style="margin:0 auto;font-size:16px;color:#4c4760;line-height:1.75;max-width:380px;">
        Recibí tu mensaje y lo revisaré pronto.<br/>
        Te responderé en <span class="text-1" style="color:#171426;font-weight:600;">menos de 24 horas</span> en días laborables.
      </p>
    </td></tr>

    <!-- INFO -->
    <tr><td class="divider" style="padding:32px 40px;border-bottom:1px solid #e9e5f4;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;padding-right:16px;">
          <div class="chip" style="width:40px;height:40px;background:#f6f3ff;border:1px solid #e3ddf7;border-radius:10px;text-align:center;line-height:40px;font-size:18px;">📬</div>
        </td>
        <td style="vertical-align:middle;">
          <p class="text-1" style="margin:0 0 2px;font-size:13px;font-weight:600;color:#171426;">Respuesta garantizada</p>
          <p class="text-3" style="margin:0;font-size:12px;color:#8b86a0;">Reviso mi bandeja todos los días. Si es urgente, escríbeme por LinkedIn.</p>
        </td>
      </tr></table>
    </td></tr>

    <!-- LINKS -->
    <tr><td class="divider" style="padding:28px 40px;border-bottom:1px solid #e9e5f4;">
      <p class="text-3" style="margin:0 0 18px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b86a0;">Mientras tanto, explora</p>
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px;">
          <a href="${URL}/projects" class="btn-alt"
             style="display:inline-block;padding:11px 20px;background:#f6f3ff;border:1px solid #e3ddf7;color:#171426;font-size:13px;font-weight:600;text-decoration:none;border-radius:10px;">
            Proyectos &nearr;
          </a>
        </td>
        <td style="padding-right:10px;">
          <a href="https://github.com/lcrisantosi7-cris/" class="btn-alt"
             style="display:inline-block;padding:11px 20px;background:#f6f3ff;border:1px solid #e3ddf7;color:#171426;font-size:13px;font-weight:600;text-decoration:none;border-radius:10px;">
            GitHub &nearr;
          </a>
        </td>
        <td>
          <a href="https://www.linkedin.com/in/luis-crisanto-silup%C3%BA" class="btn-alt"
             style="display:inline-block;padding:11px 20px;background:#f6f3ff;border:1px solid #e3ddf7;color:#171426;font-size:13px;font-weight:600;text-decoration:none;border-radius:10px;">
            LinkedIn &nearr;
          </a>
        </td>
      </tr></table>
    </td></tr>

    <!-- SIGNATURE -->
    <tr><td style="padding:28px 40px;">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;padding-right:16px;">
          <div style="width:48px;height:48px;background:linear-gradient(135deg,#FC8F54,#6867D2);border-radius:14px;text-align:center;line-height:48px;font-size:18px;font-weight:800;color:#fff;">LC</div>
        </td>
        <td style="vertical-align:middle;">
          <p class="text-1" style="margin:0 0 3px;font-size:15px;font-weight:700;color:#171426;">Luis Crisanto</p>
          <p class="text-3" style="margin:0;font-size:12px;color:#8b86a0;font-family:monospace;">Ingeniero de Sistemas &middot; Full Stack Dev</p>
          <a href="${URL}" style="font-size:12px;color:#e8672f;text-decoration:none;font-family:monospace;">luis-crisanto.vercel.app</a>
        </td>
      </tr></table>
    </td></tr>

  </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:18px 4px 0;text-align:center;">
    <p class="text-3" style="margin:0;font-size:12px;color:#8b86a0;">
      Mensaje automático &mdash; no respondas directamente a este correo.
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`