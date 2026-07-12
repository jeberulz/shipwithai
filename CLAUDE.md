# ShipWithAI (ContentWorkshop) — project notes

High-conversion landing site for the Obsidian + Claude Code bootcamp.
Next.js App Router + TypeScript, Tailwind, Radix UI + shadcn patterns,
Supabase (`@supabase/ssr` — applications/data), Remotion player for video,
markdown blog via gray-matter + remark (`content/blog/`).

## Layout
- `app/` — landing (`page.tsx`), `bootcamp/`, `apply-page/`, `blog/`,
  `admin/`, `api/`, plus SEO files (`sitemap.ts`, `robots.ts`, `manifest.ts`).
- `middleware.ts` — route protection (check it before touching admin/api).
- `content/blog/` — markdown posts; `email-content/` — email copy drafts.

## Rules
- This is a conversion-focused marketing site: copy changes matter as much as
  code. Don't rewrite marketing copy while doing code work unless asked.
- Keep SEO surface intact — `sitemap.ts`, `robots.ts`, `manifest.ts`, and
  page `metadata` exports must stay consistent when adding/renaming routes.
- Supabase is accessed server-side via `@supabase/ssr`; don't expose service
  keys in client components.
- `npm run dev` :3000 · `npm run build` · `npm run lint`. Run build + lint
  before reporting done (no test suite).

<!-- BEGIN:agentic-delivery-workflow -->
This repo uses the agentic delivery workflow.

Before coding, read:
- `AGENTS.workflow.md`
- `.agentic-workflow.yml`
- `docs/wp/RULINGS.md`

Required defaults:
- Choose Program/Migration, Work Package, Small Fix, or Gate lane before editing.
- For large/risky programs, audit first, freeze `docs/wp/program-manifest.md`, sequence by risk, and gate every wave.
- Create/switch to a branch before story or code changes.
- For work packages, maintain `docs/wp/wpNN-stories.md` and `docs/wp/wpNN-progress.md`.
- Use Git worktrees only when needed, and only under `.worktrees/`.
- Never create sibling project folders for work packages.
- Use sub-agents only for parallel work packages, independent review, gate runs, or context isolation.
- Route model quality by risk: high for orchestration/security/architecture/data/AI/final review, mid for standard WPs, low for scaffolding/docs/checks/mechanical fixes.
- Run the configured checks and record docs updated/not needed.
<!-- END:agentic-delivery-workflow -->
