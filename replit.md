# TJKT SMKN 2 Lubuk Basung

Website presentasi program keahlian Teknik Jaringan Komputer dan Telekomunikasi SMKN 2 Lubuk Basung.

## Run & Operate

- `pnpm dev` — run the TJKT website preview
- `pnpm run typecheck` — typecheck the website
- `pnpm run build` — build the static website
- `pnpm --filter @workspace/tjkt-website run dev` — run the TJKT website preview
- `pnpm --filter @workspace/tjkt-website run build` — build the static Vercel-ready website

## Stack

- pnpm workspace, Node.js 24, TypeScript 5.9
- React 19 + TypeScript
- Vite 7
- GSAP + ScrollTrigger
- Lenis desktop smooth scrolling
- Wouter client-side routing
- Vercel static deployment

## Where things live

- Root Vercel configuration: `vercel.json`
- Root developer instructions: `README.md`
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

- See `README.md` for the Visual Studio Code setup and Vercel deployment tutorial.
