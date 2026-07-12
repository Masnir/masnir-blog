# How to write & publish an article

This folder holds every blog article. **One file = one article.** Each file is an
`.mdx` file with two parts: a **frontmatter** block (settings) and a **body** (your writing).

> 📄 Copy [`_TEMPLATE.mdx`](./_TEMPLATE.mdx) to start a new article. Files whose name
> starts with `_` are ignored by the site, so the template never gets published.

---

## Step 1 — Create the file

1. In GitHub, open the `content/posts/` folder.
2. Click **Add file → Create new file** (or upload a copy of `_TEMPLATE.mdx`).
3. Name it using **lowercase words separated by hyphens**, ending in `.mdx`:

   ```
   securing-kubernetes-secrets.mdx
   ```

   ⚠️ **The file name becomes the article URL.** The example above →
   `https://blog.masnir.site/blog/securing-kubernetes-secrets`
   Do not use spaces, capitals, or special characters.

---

## Step 2 — Fill in the frontmatter (the settings block)

The block between the two `---` lines at the top. **Order does not matter, but every
required field must be present.**

| Field           | Required? | What it is                                                    |
| --------------- | --------- | ------------------------------------------------------------- |
| `title`         | ✅ Yes    | The article headline.                                         |
| `subtitle`      | Optional  | One line under the title.                                     |
| `excerpt`       | ✅ Yes    | 1–2 sentence summary (shown in listings, search, social).     |
| `category`      | ✅ Yes    | **One** category slug from the list below.                    |
| `tags`          | ✅ Yes    | List of tags, e.g. `['aws', 'iam']`. Lowercase, hyphenated.   |
| `author`        | ✅ Yes    | An author slug. Use `masnir-team` unless another exists.      |
| `coverImage`    | Optional  | Path to a cover image, e.g. `/uploads/my-cover.png`.          |
| `coverImageAlt` | Optional  | Description of the cover image (accessibility/SEO).           |
| `publishedAt`   | ✅ Yes    | Publish date, format `YYYY-MM-DD` (e.g. `2026-07-12`).        |
| `updatedAt`     | Optional  | Last-updated date, same format.                               |
| `draft`         | ✅ Yes    | `true` = hidden from site (work in progress). `false` = live. |
| `featured`      | Optional  | `true` shows it in the homepage **Featured** section.         |
| `popular`       | Optional  | `true` shows it in the homepage **Popular** section.          |

### Valid `category` values (pick exactly one)

```
cloud-security      aws                 azure               oci
devsecops           application-security  api-security      kubernetes
threat-intelligence iam                 zero-trust          ai-security
vehicle-cybersecurity  automotive-security  research        tutorials
opinion             news
```

> `tags` are free-form — just keep them lowercase and hyphenated (`prompt-injection`,
> `s3`, `can-bus`). New tags automatically get their own page.

---

## Step 3 — Write the body

Everything below the closing `---` is your article, written in **Markdown**. See
[`_TEMPLATE.mdx`](./_TEMPLATE.mdx) for a live example of every feature:

- Headings with `##` and `###` (these auto-build the Table of Contents)
- **bold**, _italic_, lists, tables, links
- Code blocks with syntax highlighting
- Callouts: `<Note>`, `<Tip>`, `<Warning>`, `<Info>`, `<Danger>`
- Images, galleries, videos, collapsible sections, math, and references

---

## Step 4 — Add images (screenshots)

Article images must live in the repo so they exist at build time.

1. Open the `public/uploads/` folder in GitHub → **Add file → Upload files** → drag your
   image(s) → commit them (into your PR branch).
2. Reference the image in your article. **Image paths always start with `/uploads/`:**

   ```md
   ![A short description of the image](/uploads/kubernetes-dashboard.png)
   ```

   Or, for a nicer version with a caption:

   ```mdx
   <Figure
     src="/uploads/kubernetes-dashboard.png"
     alt="The Kubernetes secrets dashboard"
     caption="Figure 1: Where secrets are stored by default"
   />
   ```

   ⚠️ Always include descriptive `alt` text — it's required for accessibility and SEO.

---

## Step 5 — Publish (the PR flow)

1. Commit your new/edited file (and any images) to a **new branch**.
2. Open a **Pull Request** into `main`.
3. Netlify automatically builds a **Deploy Preview** — a temporary URL on the PR where
   you can see the article rendered before it goes live.
4. A maintainer **reviews and approves** the PR.
5. Once merged into `main`, the site rebuilds and the article is **live in ~1–2 minutes**.

> To keep something unfinished, set `draft: true` — it stays hidden on the live site even
> after merging. Flip to `draft: false` when it's ready.

---

## Quick checklist before opening your PR

- [ ] File name is lowercase-hyphenated and ends in `.mdx`
- [ ] `title`, `excerpt`, `category`, `tags`, `author`, `publishedAt` are all filled in
- [ ] `category` is one of the valid slugs above
- [ ] `draft` is set (`false` to publish now, `true` to keep hidden)
- [ ] Every image is uploaded to `public/uploads/` and has `alt` text
- [ ] You previewed the article on the PR Deploy Preview
