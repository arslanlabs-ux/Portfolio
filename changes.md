# Change Log

Every change made to this project is recorded here with the reason behind it.

Format: `DATE — <file or area> — what changed — why`.

---

## 2026-09-22 — Project scaffold

**Created the Next.js application.** `create-next-app` was run in a temporary
directory and the contents moved into the project root, because npm rejects
`Portfolio` as a package name (capital letters) and `_scaffold` (leading
underscore). The generated `.git` directory was discarded.

Result: Next.js 16.3.5, React 19.2.8, TypeScript 5, Tailwind CSS v4, ESLint,
App Router with `src/`. Tailwind v4 is configured in CSS (`@theme` in
`globals.css`), so there is no `tailwind.config.js`.

**Read the bundled Next.js 16 docs** (`node_modules/next/dist/docs/`) before
writing any route code, per the generated `AGENTS.md`. Confirmed the two things
that differ from older versions: route `params` is a Promise and must be
awaited, and route props use generated global types (`PageProps<"/route">`,
`LayoutProps<"/">`).

**Renamed the package** from `scaffoldtmp` to `muhammad-arslan-portfolio`.

**Deleted the unused scaffold assets** — `public/{file,globe,next,vercel,window}.svg`.
They are dead weight and none of them are referenced.

---

## 2026-09-22 — Design system

**`src/app/globals.css`** — replaced the default light/dark theme with the
project's token set: near-black `ink`, `surface`/`panel`/`panel-2` charcoal
surfaces, `line`/`line-2` borders, off-white `fg`, muted text tones, a single
restrained PCB-green accent, and copper for decorative routing. Dark only —
the brief asks for a dark-first system, and supporting a light theme would have
meant designing and testing a second palette nobody asked for.

Added four custom utilities:

- `label-mono` — the small uppercase monospace style used for every technical
  label, so the engineering/marketing typographic split is enforced in one place.
- `blueprint` / `hatch` — the CAD grid and the diagonal hatch behind empty
  artwork slots.
- `grid-panel` / `grid-cell` — a bordered panel grid where each cell carries its
  own rules.

The `grid-panel`/`grid-cell` pair exists because the first attempt used
`gap-px` over a separator-coloured container, which left a lighter grey block
wherever a final row was short (Tools had 7 items in 3 columns, project cards
had 3 spec cells in 2 columns). Cells now paint their own borders, so a short
row leaves a panel-toned hole instead of a bright one.

Scroll reveals are CSS transitions gated behind `prefers-reduced-motion:
no-preference`, so reduced-motion users get a static page with no extra work.

**`src/app/layout.tsx`** — Plus Jakarta Sans for headings and JetBrains Mono for
technical labels, both self-hosted through `next/font` so there is no layout
shift and no external font request. Added full metadata: title template,
description containing the target keywords, Open Graph and Twitter cards, and a
`viewport` export with `themeColor` and `colorScheme: dark`.

Navbar and Footer moved into the layout rather than the home page, because the
case-study pages need them too.

---

## 2026-09-22 — Content

**`src/data/*.ts`** — all copy moved into data files so no component hard-codes
content, and so the site can be updated without touching JSX.

**No numbers were invented.** The capability strip (`stats.ts`) states scope and
toolchain only — no project counts, no years of experience, no client numbers.
Those were explicitly ruled out and there is no source for them.

**`projects.ts` separates confirmed facts from missing ones.** Each project has:

- `specs` — values actually supplied (MCU/platform, project type).
- `pendingSpecs` — labels with no confirmed value (layer count, CAD tool used,
  board dimensions, ratings, part numbers, status). Rendered with a "Pending"
  value rather than a guess.
- Case-study sections that carry `body`, `list` or `diagram` where real
  information exists, and a `pending` string where it does not.

The only project facts used are the ones given: the ESP32 platform, the focus
areas listed per project, the buck-converter topology, and the GNSS/logger
scope. The example card in the brief mentioned "4-Layer PCB" as a tag; layer
count is listed under `pendingSpecs` instead, because it was an illustration of
the card format, not a supplied specification.

Case-study sections 04–09 (Schematic, PCB Layout, Design Decisions, DRC,
Manufacturing, Results) render as labelled documentation slots. The brief asked
for placeholders rather than invented screenshots, so the artwork frames are
deliberately styled as technical slots with a caption, not as broken images.

**`tools.ts` uses monograms, not brand logos.** The brief ruled out fake company
logos, so each tool gets a restrained two-character tile and a factual usage
line instead of a recoloured vendor mark.

---

## 2026-09-22 — Components

One component per section, as requested. Shared primitives:

**`Reveal`** — a single `IntersectionObserver` per element, disconnecting after
it fires. Used instead of Framer Motion: the brief listed it as optional ("if
useful"), and 25 lines of observer plus a CSS transition covers scroll reveals
with no bundle cost. The observer's root margin extends far above the viewport
so that landing directly on `/#projects` from a shared link does not leave the
content above the landing point permanently invisible.

**`PcbVisual`** — the hero board. Drawn as inline SVG line work rather than
Three.js: a real routed board with 45°-free orthogonal buses, castellated module
pads, vias, mounting holes with keep-out rings, a coordinate ruler, a four-layer
legend and a silkscreen reference designators. One net is highlighted and
animated to show signal flow. This reads as a CAD object, stays sharp at any
size, and adds no JavaScript or image payload.

**`BoardArtwork`** — matching line-drawing silhouettes per project, used on the
cards and in the empty artwork slots. The viewBox is cropped to the drawing
bounds so the art fills its frame rather than floating in padding.

**`CaseNav`** — the sticky case-study index, with the active section tracked by
an observer band across the upper third of the viewport.

**`ArtworkFrame`** — a labelled slot for an artifact that does not exist yet.

**`Section`** — the shared section shell (index, eyebrow, title, subtitle, rule).

### Fixes made during review

- `EngineeringStats`, `Process`, `Tools`, `ProjectCard`, `About`, `Contact` and
  the case-study page all moved to the `grid-panel`/`grid-cell` pattern after the
  short-final-row problem showed up in screenshots.
- `hover:bg-panel-2` was removed from grid cells. The custom `grid-cell` utility
  and a Tailwind `hover:` variant both set `background-color`, and which one wins
  depends on layer ordering rather than intent — not worth the fragility for a
  hover tint. Process keeps its accent top-line hover, Tools keeps its monogram
  hover; neither conflicts.
- `ArtworkFrame` captions now wrap (`flex-wrap`), because long labels such as
  "Layout — power stage copper" were colliding with the note beside them.
- The hero status line uses `items-start` with a nudged dot; centred, the dot sat
  at the wrong height once the text wrapped to two lines on mobile.
- Removed an unused loop variable in `Process` flagged by ESLint.

---

## 2026-09-22 — Routes

**`src/app/page.tsx`** — composes the home page from the section components.

**`src/app/projects/[slug]/page.tsx`** — the case-study route. Statically
generated via `generateStaticParams` from the project data, with per-project
metadata and a "next project" link so the three case studies form a loop.

**`src/app/opengraph-image.tsx`** — a generated Open Graph card
(`next/og`). Generated rather than shipped as a file because there is no
photographic asset to use, and a branded card from the design tokens is honest
and costs nothing to maintain.

**`src/app/sitemap.ts`, `src/app/robots.ts`** — sitemap and crawler rules, both
built from `NEXT_PUBLIC_SITE_URL` with a localhost fallback so the build works
before a domain is chosen.

---

## 2026-09-22 — Verification

Ran the full loop rather than stopping at generated code:

- `npm run lint` — clean.
- `npm run build` — clean. All routes prerender; the three case studies are
  static (SSG).
- `npm run dev` — every route returns 200.
- Rendered the site in headless Chrome via Playwright (`playwright-core` driving
  the installed Chrome, installed into a scratch directory outside the project
  so nothing was added to `package.json`). Captured desktop, tablet and mobile
  views of the home page and all case-study sections.
- Confirmed all 29 reveal elements end up revealed after a full scroll, and that
  the mobile layout has zero horizontal overflow at 390px.
- Reviewed every section screenshot for spacing, typography and consistency,
  which is what surfaced the grid holes, the caption collision and the
  undersized board artwork listed above.

### Known limitations

- The documentation slots are empty by design. Filling them is a content task,
  not a code task — see the README section on publishing project details.
- `src/data/site.ts` still holds placeholder links and a placeholder email
  address. The footer prints a notice until `linksArePlaceholders` is set to
  `false`.
- The About portrait is a placeholder frame; no image was supplied.
