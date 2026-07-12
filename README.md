# Masnir Blog

The official blog for **Masnir** — cybersecurity & AI. A modern, fast, SEO-friendly, secure,
statically-generated blog built with Next.js, deployed to Netlify at
[blog.masnir.site](https://blog.masnir.site).

> Production-grade, enterprise-quality engineering — not a prototype.

---

## Tech stack

| Concern           | Choice                                                |
| ----------------- | ----------------------------------------------------- |
| Framework         | Next.js (App Router) + React 19                       |
| Language          | TypeScript (strict)                                   |
| Styling           | Tailwind CSS, token-driven theme                      |
| Content           | MDX files in Git (`content/posts`)                    |
| Admin             | Decap CMS (`/admin`) + Netlify Identity + Git Gateway |
| Animation         | Framer Motion (subtle, reduced-motion aware)          |
| Code highlighting | Shiki via `rehype-pretty-code`                        |
| Math              | KaTeX via `remark-math` / `rehype-katex`              |
| Search            | Client-side, build-time index (no backend)            |
| Hosting           | Netlify (`@netlify/plugin-nextjs`)                    |
| Quality           | ESLint, Prettier, Husky + lint-staged                 |

---

## Why Git-based content (MDX) instead of a database

Content lives as MDX files in this repo and is rendered at build time (SSG). This gives us:

- **$0 cost** — no database, no runtime data layer to pay for or operate.
- **Speed** — every page is pre-rendered static HTML → Lighthouse 95+ is achievable.
- **Security** — no database means no SQL/NoSQL attack surface; strict CSP + security headers.
- **Version history** — every edit is a Git commit (native, free).
- **Easy publishing** — editors use Decap CMS at `/admin` (no code editing required).

The app never reads the filesystem directly. All content flows through a storage-agnostic
[`ContentSource`](src/lib/content/ContentSource.ts) interface, implemented today by
[`MdxContentSource`](src/lib/content/MdxContentSource.ts). **To move to a database later**
(Supabase/Postgres/etc.), implement `ContentSource` with a new adapter and swap the export in
[`src/lib/content/index.ts`](src/lib/content/index.ts) — no page code changes.

---

## System architecture

```
                         ┌─────────────────────────────┐
        Editor ──/admin──▶│  Decap CMS (Netlify Identity │
                         │  + Git Gateway)              │
                         └──────────────┬──────────────┘
                                        │ commits MDX
                                        ▼
   content/posts/*.mdx  ─────▶  GitHub repo (Masnir/masnir-blog)
   content/authors/*.md                 │
                                        │ push triggers build
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
content/            # Git-based content (edited via CMS or directly)
  posts/            # *.mdx articles
  authors/          # author profiles
  config/           # site.ts, categories.ts (taxonomy + site config)
public/
  admin/            # Decap CMS (index.html + config.yml)
  uploads/          # media committed by the CMS
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

### Editing content locally (no auth)

Run the Decap local backend in one terminal and the dev server in another:

```bash
npx decap-server      # terminal 1
npm run dev           # terminal 2 → open http://localhost:3000/admin
```

`local_backend: true` in `public/admin/config.yml` routes the CMS to your working tree.

---

## Publishing an article (non-technical)

1. Go to **blog.masnir.site/admin** and log in (Netlify Identity).
2. Click **Articles → New Article**.
3. Fill in Title, Excerpt, Category, Tags, Author, Cover Image, and the body.
4. Leave **Draft** on to keep working; the editorial workflow tracks
   **Draft → In Review → Ready**.
5. When ready, set **Draft** off (or publish from the workflow). Decap commits to GitHub,
   Netlify rebuilds, and the article goes live in ~1–2 minutes.

Drafts never appear on the live site. Scheduled publishing is supported via the editorial
workflow plus a scheduled Netlify build (see below).

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
4. **Enable Netlify Identity**: Site settings → Identity → _Enable Identity_.
   - Registration: **Invite only** (recommended).
   - Services → **Git Gateway**: _Enable_ (lets the CMS commit to GitHub).
   - Invite yourself as a user; accept the email invite to set a password.
5. **Custom domain**: add `blog.masnir.site` and point DNS (CNAME to the Netlify site, or
   Netlify DNS). HTTPS is provisioned automatically.
6. **Deploy**: push to `main` → Netlify builds and publishes.

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
