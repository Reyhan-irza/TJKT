# TJKT SMKN 2 Lubuk Basung

Website presentasi program keahlian Teknik Jaringan Komputer dan Telekomunikasi SMKN 2 Lubuk Basung.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/tjkt-website run dev` — run the TJKT website preview
- `pnpm --filter @workspace/tjkt-website run build` — build the static Vercel-ready website
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Website entry and routes: `artifacts/tjkt-website/src/App.tsx`
- Page content and interactions: `artifacts/tjkt-website/src/pages.tsx`
- Shared shell and GSAP/Lenis lifecycle: `artifacts/tjkt-website/src/components/site-shell.tsx`
- Visual tokens and responsive layout: `artifacts/tjkt-website/src/index.css`
- Content model: `artifacts/tjkt-website/src/data/site.ts` and `src/data/media.ts`
- Preserved visual assets: `artifacts/tjkt-website/public/images/` and `public/tech-logos/`
- Vercel SPA fallback: `artifacts/tjkt-website/vercel.json`

## Architecture decisions

- The website is a static React/Vite artifact with no backend dependency.
- GSAP ScrollTrigger owns scroll-linked motion and is cleaned up on route changes.
- Lenis is intentionally disabled on mobile and for reduced-motion preferences to keep touch scrolling responsive.
- Wouter provides lightweight path routing for the public pages; Vercel rewrites deep links to `index.html`.

## Product

The site introduces TJKT through an editorial landing page, explains the program and learning areas, presents laboratories and activities through an accessible lightbox gallery, and provides prospect/contact paths for students and parents.

## User preferences

- Keep the visual direction modern, refined, responsive, and premium without excessive neon or generic AI effects.
- Preserve the supplied TJKT content and assets.

## Gotchas

- Build works with or without `PORT` and `BASE_PATH`; the Replit artifact workflow supplies them during preview.
- Do not remove the `data-reveal`, `data-parallax`, or shell animation hooks without updating the GSAP lifecycle.
- Verify `prefers-reduced-motion` behavior when changing scroll animation timings.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
