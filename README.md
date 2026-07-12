# Masnir Blog

The official blog for **Masnir** — cybersecurity & AI. A modern, fast, SEO-friendly, secure,
statically-generated blog built with Next.js, deployed to Netlify at
[blog.masnir.site](https://blog.masnir.site).

> Production-grade, enterprise-quality engineering — not a prototype.

---

## Tech stack

| Concern           | Choice                                         |
| ----------------- | ---------------------------------------------- |
| Framework         | Next.js (App Router) + React 19                |
| Language          | TypeScript (strict)                            |
| Styling           | Tailwind CSS, token-driven theme               |
| Content           | MDX files in Git (`content/posts`)             |
| Publishing        | Git-based — MDX files via GitHub Pull Requests |
| Animation         | Framer Motion (subtle, reduced-motion aware)   |
| Code highlighting | Shiki via `rehype-pretty-code`                 |
| Math              | KaTeX via `remark-math` / `rehype-katex`       |
| Search            | Client-side, build-time index (no backend)     |
| Hosting           | Netlify (`@netlify/plugin-nextjs`)             |
| Quality           | ESLint, Prettier, Husky + lint-staged          |

---

## Why Git-based content (MDX) instead of a database

Content lives as MDX files in this repo and is rendered at build time (SSG). This gives us:

- **$0 cost** — no database, no runtime data layer to pay for or operate.
- **Speed** — every page is pre-rendered static HTML → Lighthouse 95+ is achievable.
- **Security** — no database means no SQL/NoSQL attack surface; strict CSP + security headers.
- **Version history** — every edit is a Git commit (native, free).
- **Reviewable publishing** — authors add an MDX file and open a Pull Request; a
  maintainer reviews the Netlify Deploy Preview and approves. See
  [`content/posts/README.md`](content/posts/README.md).

The app never reads the filesystem directly. All content flows through a storage-agnostic
[`ContentSource`](src/lib/content/ContentSource.ts) interface, implemented today by
[`MdxContentSource`](src/lib/content/MdxContentSource.ts). **To move to a database later**
(Supabase/Postgres/etc.), implement `ContentSource` with a new adapter and swap the export in
[`src/lib/content/index.ts`](src/lib/content/index.ts) — no page code changes.

---

## System architecture

```
        Author ──▶ adds MDX file + opens Pull Request
                                        │
                                        ▼
   content/posts/*.mdx  ─────▶  GitHub repo (Masnir/masnir-blog)
   content/authors/*.md                 │
                        PR Deploy Preview│  ← maintainer reviews & approves
                                        │  merge to main triggers build
                                        ▼
                         ┌─────────────────────────────┐
                         │   Netlify build              │
                         │   next build (SSG)           │
                         │   • ContentSource → pages    │
                         │   • sitemap / rss / og       │
                         │   • search index             │
                         └──────────────┬──────────────┘
                                        ▼
                    Static HTML/CSS/JS on Netlify CDN
                          (blog.masnir.site)
                                        │
                             Reader ◀───┘  (fast, cached, secure headers)
```

**Content pipeline:** `MDX file → gray-matter (frontmatter) → reading-time + TOC → ContentSource
→ page (SSG) → MDXRemote (remark/rehype: gfm, math/KaTeX, Shiki, slug, autolink) → HTML`.

---

## Project structure

```
content/            # Git-based content (edited via GitHub PRs)
  posts/            # *.mdx articles (+ README.md guide, _TEMPLATE.mdx)
  authors/          # author profiles
  config/           # site.ts, categories.ts (taxonomy + site config)
public/
  uploads/          # article images (committed to the repo)
src/
  app/              # App Router
    (site)/         # public pages (share Header/Footer layout)
    api/            # og image, newsletter + contact stubs
    rss.xml/, sitemap.ts, robots.ts, not-found.tsx
  components/
    ui/             # primitives: Button, Card, Badge, Section, icons, ThemeToggle
    layout/         # Header, Footer, Logo
    mdx/            # Callout, CodeBlock, Collapsible, Figure, Gallery, Video, ...
    blog/           # ArticleCard, TOC, ShareButtons, Breadcrumbs, Related, ...
    home/           # Hero, CategoryGrid, TrendingTopics, AboutMasnir
    search/         # SearchClient
    seo/, providers/
  lib/
    content/        # ContentSource abstraction + MDX adapter
    mdx/            # remark/rehype plugin config + TOC extraction
    seo/            # metadata + JSON-LD builders
    search/         # build-time search index
    utils/          # cn, format/slugify, rateLimit
  hooks/            # useActiveHeading
  types/            # domain types (Post, Author, Category, ...)
  styles/           # tokens.css (SINGLE SOURCE OF TRUTH), globals.css
netlify.toml        # build + CSP/security headers
```

---

## Design system & theming (single source of truth)

All colors are defined **once** as CSS custom properties in
[`src/styles/tokens.css`](src/styles/tokens.css) and mapped to semantic Tailwind names in
[`tailwind.config.ts`](tailwind.config.ts). Components use classes like `bg-accent`, `text-fg`,
`border-border` — **never raw hex**.

**To re-brand the whole site, change one value:**

```css
/* src/styles/tokens.css */
.dark {
  --accent: 187 95% 55%;
} /* ← edit this HSL; entire site recolors */
```

Buttons, links, focus rings, gradients, badges, code accents, and the OG image accent all
derive from `--accent`. Dark/light are two token sets toggled by a `.dark` class via
`next-themes` (dark-first default, no flash).

---

## Local development

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL etc.
npm run dev                  # http://localhost:3000
```

Useful scripts:

```bash
npm run build        # production build (SSG) — must pass before deploy
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier write
```

### Previewing content locally

Add or edit an `.mdx` file under `content/posts/`, then run `npm run dev` — drafts are
shown locally (they're only hidden in the production build).

---

## Publishing an article

Articles are plain MDX files committed via GitHub Pull Requests. Full step-by-step
instructions (fields, categories, images, the PR flow) live in
**[`content/posts/README.md`](content/posts/README.md)**, with a ready-to-copy
**[`content/posts/_TEMPLATE.mdx`](content/posts/_TEMPLATE.mdx)**.

In short:

1. Copy `_TEMPLATE.mdx` → rename to `your-article-slug.mdx` (the name becomes the URL).
2. Fill in the frontmatter (title, excerpt, category, tags, author, publishedAt).
3. Write the body in Markdown; put any images in `public/uploads/` and reference them
   as `/uploads/...`.
4. Open a **Pull Request** → review the Netlify **Deploy Preview** → approve → merge.
5. Live in ~1–2 minutes. Set `draft: true` to keep a post hidden even after merge.

Access control is via GitHub: protect `main` to require PR approval, and add authors as
repo collaborators. Files named `_*.mdx` and `README.md` are ignored by the site.

### Authoring features available in MDX

Callouts (`<Note>`, `<Tip>`, `<Warning>`, `<Info>`, `<Danger>`, `<Callout>`), fenced code with
titles/line-numbers/highlights, `<Collapsible>`, `<Figure>`, `<Gallery>`, `<Video>`,
`<References>`, KaTeX math (`$…$`, `$$…$$`), tables, and auto-linked headings with a generated
table of contents.

---

## Deployment to Netlify

1. **Create the site**: In Netlify, _Add new site → Import from GitHub_ →
   `Masnir/masnir-blog`.
2. **Build settings** (auto-detected via `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Plugin: `@netlify/plugin-nextjs` (declared in `netlify.toml`).
3. **Environment variables** (Site settings → Environment):
   - `NEXT_PUBLIC_SITE_URL = https://blog.masnir.site`
   - (later) newsletter/contact provider keys — see `.env.example`.
4. **Protect `main`** (GitHub): Repo → Settings → Branches → require a pull request and
   at least one approval before merging. This is how publishing is reviewed.
5. **Custom domain**: add `blog.masnir.site` and point DNS (CNAME to the Netlify site, or
   Netlify DNS). HTTPS is provisioned automatically.
6. **Deploy**: merge to `main` → Netlify builds and publishes.

### Scheduled publishing (optional)

Set `updatedAt`/`publishedAt` in the future and add a **Scheduled build** (Netlify → Build &
deploy → Build hooks + a cron trigger, e.g. daily) so posts whose date has passed get
published on the next rebuild.

---

## Security

- **CSP + security headers** in [`netlify.toml`](netlify.toml) (HSTS, `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **No secrets in the client** — provider keys are server-side only; only `NEXT_PUBLIC_*`
  vars reach the browser.
- **Safe rendering** — MDX authored by trusted editors; external links get
  `rel="noopener noreferrer"`; video embeds are restricted by CSP `frame-src`.
- **API hardening** — contact endpoint has input validation, a honeypot, and best-effort
  rate limiting ([`src/lib/utils/rateLimit.ts`](src/lib/utils/rateLimit.ts)).

---

## Accessibility

Skip-to-content link, keyboard-navigable nav/menus, visible focus rings (token-based),
ARIA labels on interactive controls, semantic heading hierarchy, and contrast-checked
color tokens. Animations respect `prefers-reduced-motion`.

---

## Future scalability

The architecture is intentionally ready for (without rework of pages):

- **Database migration** — implement `ContentSource` with a Supabase/Postgres adapter.
- **Comments** — `Comments` component + `NEXT_PUBLIC_COMMENTS_ENABLED` flag (giscus/Disqus).
- **Newsletter / contact** — wire a provider into the existing API stubs.
- **Auth, premium, bookmarks, likes, analytics** — add behind the content abstraction.
- **AI features** (assistant, search, summaries) — the build-time search index and
  `ContentSource` provide clean seams.
- **Series, courses, docs, public API** — new collections + routes; components are reusable.

---

## License

© Masnir. All rights reserved.
