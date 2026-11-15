# VARIABLES — Code location, symbol and dependency registry
Version 1.0 | Updated 2026-11-15 | Scope: actual `main` branch at initial homepage commit.
**Important:** current CSS is in `assets/css/home.css` and current JavaScript is in `assets/js/home.js`; HTML is in `index.html`. Locations below use stable selectors and code anchors, not line numbers (which shift). Paths beginning `assets/` are **planned** unless explicitly noted. This file inventories identifiable named variables/functions/selectors; HTML text and every CSS property are not individual program variables.

## 1. Current file registry
| Path | Status | Responsibility | Called/used by |
|---|---|---|---|
| `index.html` | EXISTS | Semantic HTML; references external stylesheet and deferred script | Browser / GitHub Pages |
| `ROADMAP.md` | EXISTS after documentation commit | Milestones and decisions | Maintainers |
| `VARIABLES.md` | EXISTS after documentation commit | Symbol/dependency map | Maintainers |
| `ARCHITECTURE.md` | EXISTS after documentation commit | Architecture and contracts | Maintainers |
| `assets/css/tokens.css` | PLANNED | Global CSS custom properties | Stylesheets |
| `assets/css/home.css` | EXISTS | All current CSS, including :root tokens, components and responsive layout | `index.html` |
| `assets/js/home.js` | EXISTS | Carousel, menu handlers and footer year | `index.html` |
| `assets/images/` | PLANNED | Local optimized media | HTML/CSS |

## 2. CSS custom properties — `assets/css/home.css` > `:root`
| Symbol | Initial value | Role | Referenced by |
|---|---|---|---|
| `--ink` | `#20303d` | Primary dark text/background | `body`, `.book`, `.btn.primary`, `.closing` |
| `--gold` | `#c5a059` | Accent/CTA | `.book`, `.btn.primary` |
| `--sand` | `#faf9f6` | Warm page background | `body` |
| `--wood` | `#8b5e3c` | Secondary brown | `.kicker`, `.feature strong` |
| `--serif` | Cormorant Garamond, Georgia, serif | Display headings | `.hero h1`, `.intro h2`, `.section-heading h2`, `.closing h2`, `.feature strong`, `.photo span` |
| `--sans` | Inter, Arial, sans-serif | UI/body typography | `body` |

### External dependencies
- Google Fonts CSS for Cormorant Garamond and Inter, via `fonts.googleapis.com` and `fonts.gstatic.com`.
- All currently visible images and logo use `https://gipfellodge.at/assets/images/...`. This is a runtime dependency on the existing site, not local assets.
- No package manager, runtime framework, backend, database or PMS integration is present in the new repository.

## 3. JavaScript symbols — `assets/js/home.js` > IIFE
| Symbol | Type / scope | Defined by | Read/written by | Purpose |
|---|---|---|---|---|
| `slides` | `const`, local array | `document.querySelectorAll('.slide')` | `show` | Hero slide nodes |
| `index` | `let`, local number, initial `0` | IIFE | `show`, prev/next handlers | Active slide index |
| `show(n)` | local function | IIFE | Prev/next handlers | Wrap index and toggle `active` on slides |
| `n` | `show` argument | Caller | `show` | Requested slide index |
| `s` | `forEach` callback argument | `slides.forEach` | `classList.toggle` | One slide element |
| `i` | `forEach` callback index | `slides.forEach` | Compare to `index` | Iteration index |
| `toggle` | `const`, DOM element | `getElementById('menuToggle')` | Click handler; nav link handlers | Mobile menu button |
| `nav` | `const`, DOM element | `getElementById('navigation')` | Click handler; link handlers | Mobile navigation container |
| `open` | `const`, boolean | `nav.classList.toggle('open')` | `setAttribute('aria-expanded',...)` | Menu open state |
| `a` | callback argument | `nav.querySelectorAll('a').forEach` | `addEventListener` | Each nav link |
| `document.getElementById('year').textContent` | DOM property assignment | `new Date().getFullYear()` | Footer | Current year |
All JS is encapsulated in a self-invoking function; it exports no globals. No persistence or API calls.

## 4. DOM IDs — source `index.html`
| ID | Purpose | Referenced by |
|---|---|---|
| `menuToggle` | Mobile menu button | JS `toggle`; `aria-controls` points to `navigation` |
| `navigation` | Navigation element | JS `nav`; CSS `.nav`, `.nav.open` |
| `prev` | Previous hero slide button | JS click handler |
| `next` | Next hero slide button | JS click handler |
| `year` | Dynamic copyright year | JS footer assignment |
| `home` | Main page anchor | Header logo/Home link |
| `lodge` | Lodge intro anchor | Hero CTA and menu |
| `galerij` | Gallery anchor | Menu |
| `contact` | Contact/booking enquiry anchor | Menu and CTAs |

## 5. CSS class contracts
| Selector(s) | Function | State/dependencies |
|---|---|---|
| `.header`, `.header-inner`, `.brand` | Top navigation and logo | Header overlays hero |
| `.nav`, `.nav.open`, `.menu-button` | Responsive menu | JS toggles `open`; media breakpoint 800px |
| `.book`, `.btn`, `.btn.primary` | Booking/contact CTAs | `--gold`, `--ink` |
| `.hero`, `.slide`, `.slide.active` | Image carousel | JS toggles `active`; opacity transition |
| `.hero-content`, `.eyebrow`, `.hero-controls` | Hero text and controls | Overlay layering and slide buttons |
| `.wrap` | Content max width | `width:min(92%,1320px)` |
| `.content`, `.intro`, `.features`, `.feature` | Intro/USP grid | Responsive single column below 800px |
| `.gallery-section`, `.section-heading`, `.gallery`, `.photo` | Image gallery | CSS grid, responsive reflow |
| `.closing`, `.footer`, `.kicker` | Contact section/footer/eyebrow | Design tokens |

## 6. Event/data flow map
`click #prev` → handler → `show(index - 1)` → update `index` → `.slide.active` → CSS opacity.
`click #next` → handler → `show(index + 1)` → same rendering flow.
`click #menuToggle` → toggle `#navigation.open` → update `aria-expanded` → mobile menu visible/hidden.
`click #navigation a` → remove `open` → set `aria-expanded=false` → browser follows anchor.
Page load → set `#year` to current calendar year.
Images → browser requests legacy `gipfellodge.at` URLs (no CMS/data binding).
`mailto:` CTA → opens email client; **not** a secure booking or contact form.

## 7. Known gaps and risks
- No JS autoplay, touch-swipe or carousel pause behavior.
- Hero slides have empty alt? Current alt text is present; carousel has no live announcement.
- Images are remotely hosted; image failure may leave blank regions.
- Contact CTA currently uses `info@gipfellodge.at`; verify destination before launch.
- No booking API, prices, availability state, form validation, secrets, authentication or server-side code.
- GitHub Pages publishing not verified.
- CSS remains compact in `assets/css/home.css`; format it for easier line-level mapping in a future maintenance change.

## 8. Required registry template for future additions
For every new or changed identifier record:
`Name | Type | File:line or stable anchor | Scope | Default/source | Readers | Writers | Trigger | Side effects | Security/privacy | Tests | Status`.
For each new function record signature, inputs/outputs, errors, call sites and dependencies.
For each CSS token record value, usage and responsive overrides.
For each endpoint record method, auth, validation, payload schema, response, error behavior and retention.
For each configuration key record whether it is public or secret; **never write actual secrets**.
Update/remove old entries in the same commit as code changes. Prefer searchable semantic names and single ownership.
