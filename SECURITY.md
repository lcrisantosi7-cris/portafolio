# Security Policy

## Reporting a vulnerability

Do not publish exploitable details in a public issue. Contact the repository owner privately through the email listed in the portfolio:

https://luis-crisanto.vercel.app/contact

Include the affected URL or file, impact, reproduction steps and (if possible) a suggested mitigation.

## Scope and operational notes

- Never commit API keys, tokens, credentials, private contact data or production environment files.
- Keep `BREVO_API_KEY` in Vercel environment variables only.
- The contact endpoint validates input and escapes user-controlled values before email rendering.
- Its in-memory rate limiter is per serverless instance and is not a substitute for distributed rate limiting or a WAF.
- Apply dependency updates and review the lockfile before production releases.
