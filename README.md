# Muhammad Arslan — Portfolio

Portfolio site for a PCB designer and embedded systems engineer. Built with
Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Editing content

All copy lives in `src/data/` — no content is hard-coded in components.

| File | Holds |
| --- | --- |
| `site.ts` | Name, role, navigation, outbound links |
| `stats.ts` | Capability strip under the hero |
| `projects.ts` | Projects and their case-study sections |
| `expertise.ts` | "What I Work With" groups |
| `process.ts` | Six-step engineering workflow |
| `tools.ts` | Toolchain grid |

### Before deploying

1. Replace the placeholder URLs and email in `src/data/site.ts`, then set
   `linksArePlaceholders: false` to drop the notice from the footer.
2. Set `NEXT_PUBLIC_SITE_URL` so metadata, `sitemap.xml`, `robots.txt` and the
   Open Graph image resolve to the production domain.

### Publishing project details

`src/data/projects.ts` distinguishes confirmed facts from missing ones:

- `specs` — confirmed values, rendered as-is.
- `pendingSpecs` — labels only, rendered with a "Pending" value.
- A case-study section with `body` / `list` / `diagram` renders that content.
  A section with `pending` renders an explicitly labelled documentation slot.
- `artifacts` render as labelled placeholder frames until real screenshots or
  renders are added.

Nothing in the data file is a fabricated specification. When a fact is
confirmed, move it from `pendingSpecs` into `specs`, or replace a section's
`pending` string with real content and delete the placeholder.

## Structure

```
src/app/            route segments, metadata, sitemap, robots, OG image
src/components/     one component per section, plus shared primitives
src/data/           content
```

Components are server components except `Navbar`, `Reveal` and `CaseNav`,
which need scroll or intersection state in the browser.

## Notes

- Scroll animations are CSS transitions driven by an `IntersectionObserver` in
  `Reveal`; `prefers-reduced-motion` disables them entirely.
- The hero board and project silhouettes are inline SVG line drawings, not
  images or 3D — they stay sharp at any size and add no JavaScript payload.
