# ARCHITECTURE — GipfelLodgeWebsite
Version 1.0 | Updated 2026-11-15

## 1. System boundary and verified current state
New repo: `wanderwerkhoven-afk/GipfelLodgeWebsite`, branch `main`.
Reference only: `wanderwerkhoven-afk/Gipfel-Lodge` (do not modify).
Current executable implementation is **three static files**: `index.html`, `assets/css/home.css` and `assets/js/home.js`. HTML markup and externally linked CSS and JavaScript run entirely in the browser. GitHub Pages publishing has **not** been independently verified. No backend, admin, PMS, payment, authentication, database, email delivery or guest-data storage exists in this repo.

## 2. Current dependency graph
```text
Browser
 └─ index.html
     ├─ assets/css/home.css (CSS tokens, layout, responsive rules)
     ├─ DOM: header, hero, lodge, gallery, contact, footer
     ├─ assets/js/home.js (hero navigation, mobile menu, year)
     ├─ Google Fonts (Inter, Cormorant Garamond)
     └─ https://gipfellodge.at/assets/images/... (logo/photos)
```
Interactions are local DOM state changes; no external data is written. The contact link is `mailto:`, not an application form. Remote image hosting creates an availability and privacy dependency on the legacy website.

## 3. Planned modular directory map (NOT YET IMPLEMENTED)
```text
/
  index.html                  # Home entry
  README.md
  ROADMAP.md
  VARIABLES.md
  ARCHITECTURE.md
  assets/
    css/
      tokens.css              # Single source of truth for theme variables
      base.css                # Reset, typography, global layout
      components.css          # Header, nav, buttons, footer
      home.css                # EXISTS: current tokens, base, components and home layout
    js/
      home.js                 # EXISTS: current carousel, mobile menu, footer year
      main.js                 # PLANNED: bootstrap and shared interactions
      carousel.js             # Hero gallery controller
      navigation.js           # Mobile navigation controller
      i18n.js                 # Language switching (when designed)
      booking.js              # PMS widget adapter (after vendor decision)
    images/
      ...                     # Optimized, owned/authorized media
  pages/                      # Additional pages after routing decision
  docs/                       # Optional deeper specifications
```
Avoid introducing a build tool/framework until justified. For GitHub Pages, use relative paths compatible with the repository subpath `/GipfelLodgeWebsite/`. Do not put absolute `/assets/...` paths in preview builds unless a base path is configured.

## 4. Ownership and interfaces
- **Design tokens:** currently defined in `assets/css/home.css`; planned `tokens.css` will own colors, fonts, spacing and breakpoints. Components consume tokens; avoid duplicating values.
- **Navigation:** currently handled in `assets/js/home.js`; planned `navigation.js` will own open/closed state and accessibility attributes. Header markup owns menu links.
- **Carousel:** currently handled in `assets/js/home.js`; planned `carousel.js` will own active slide index and button interactions. CSS owns transition appearance.
- **Content:** page templates own user-facing copy; later translation dictionaries own locale-specific text.
- **Booking:** future adapter owns vendor-facing availability/booking calls. Never let presentation components fabricate availability or final prices.
- **Sensitive operations:** future server/provider owns validation, payments, tokens and authorization; never put secrets in static assets.

## 5. Proposed future guest booking flow (NOT IMPLEMENTED)
```text
Guest → website → vendor availability UI/API
                       ↓
                 verified pricing
                       ↓
                 provider checkout
                       ↓
                 confirmed reservation
                       ├─ guest notification (provider)
                       ├─ housekeeping trigger (provider/integration)
                       └─ accounting/tax export (approved integration)
```
A public static page cannot safely hold private PMS API keys or payment secrets. If the selected vendor requires private credentials, use a server-side proxy with scoped credentials, rate limiting, origin controls, logging redaction and validation. Avoid exposing guest PII in analytics or URLs.

## 6. Security and privacy requirements
1. Never commit secrets, credentials, private keys or customer data. Client-visible keys must be explicitly public and scope-restricted.
2. Use HTTPS; apply CSP and other security headers where the chosen host supports them. GitHub Pages header controls are limited; do not promise server headers on a purely static host.
3. For any future forms/endpoints: server-side validation, rate limits, anti-abuse, CSRF protection where session-based, strict authorization, output encoding, error handling and retention limits.
4. For bookings: provider-confirmed availability and price, payment via certified processor, idempotency/duplicate-booking protections, cancellation/terms disclosure.
5. For admin: separate authenticated authorization boundary; frontend hiding is not access control.
6. For third parties: inventory of fonts, analytics, embedded PMS, maps and cookies; obtain required consent before nonessential tracking.
7. Accessibility: semantic HTML, visible focus, keyboard navigation, text alternatives, reduced motion and contrast.
8. Operations: dependency review, versioned deployments, rollback, monitoring and backup ownership.

## 7. Publishing model
**Preview proposal:** GitHub Pages from `main`, root `index.html`. The user must enable this in repository Settings → Pages; verify deployment before treating URL as live.
**Production:** undecided. Select hosting/domain after PMS requirements and required security headers/server capabilities are known. Use separate preview/production environments if booking integrations collect real guest data.

## 8. Test strategy
- Static checks: HTML validity, broken relative paths, accessible IDs/labels.
- Behavior: prev/next wrap-around, mobile toggle and link close, anchors, footer year.
- Responsive: narrow mobile, tablet, wide desktop, landscape, reduced-motion.
- Performance: hero LCP, image loading, CLS, font fallback.
- Security: no embedded secrets, review external URLs, future form/API threat tests.
- Booking integration (future): sandbox success/failure, cancellations, duplicate clicks, provider outages and time-zone handling.
Test results and deployment status must be recorded in ROADMAP.md or PR description.

## 9. Change protocol
1. Read the current source and all three documentation files before editing.
2. Identify owning module/selector/function from VARIABLES.md.
3. Make smallest scoped change; preserve existing behavior unless change is intentional.
4. Update dependency map, registry, roadmap statuses and open decisions in the same PR.
5. Verify tests and deployment; document any unverified assumptions.
6. Never edit `Gipfel-Lodge` as part of the new site's work without explicit separate authorization.

## 10. Decisions still needed
PMS/channel manager; production host; custom domain; language set; exact content and capacity; contact email; local image migration; analytics/cookie platform; legal/privacy copy. Track final choices in ROADMAP.md D-001 onward.

## 11. Refactor record (2026-11-15)
Extracted the single inline stylesheet to `assets/css/home.css` and the final inline script to `assets/js/home.js`; updated `index.html` to load both via relative URLs and `defer` for JS. No intended visual or functional changes. Browser/GitHub Pages deployment verification is still pending.

## Navigation implementation — 2026-11-15
Current implementation is an anchored, animated popup: `index.html` defines `#menuToggle`, `#navigation`, `#menuClose` and `#menuBackdrop`; `assets/css/home.css` owns transitions, sizing, colors and mobile behavior; `assets/js/home.js` owns `setMenuOpen`, keyboard focus cycling, Escape and backdrop dismissal. Closed navigation is `inert` and `aria-hidden`; the trigger uses `aria-expanded`. Existing design tokens retained. Visual/browser verification pending.

## Original topbar adaptation — 2026-11-15
Header markup in `index.html` now mirrors the original repository's left nine-dot icon, center logo and right language/BOOK actions. Styling in `assets/css/home.css` is based on the legacy `css/site_css/components/global.css`, scoped to the new project and integrated with the custom floating navigation. `assets/js/home.js` owns menu and language popup state. Flag icons depend on external flag-icons CSS; logo remains hosted on `gipfellodge.at`. Language menu currently displays six choices but only Dutch is active; other languages are not interactive until translated. BOOK targets the contact section, not a real booking engine. GitHub Pages visual verification pending.

## Header rearrangement — 2026-11-15
Header now orders language on the left, centered logo, and BOOK plus classic animated hamburger on the right. HTML is in `index.html`; layout and line-to-X animation in `assets/css/home.css`; existing `setMenuOpen` and language toggle behavior in `assets/js/home.js` are reused without changes. Visual QA pending.

## Menu close control cleanup — 2026-11-15
Removed `#menuClose` from the floating panel and its JS/CSS wiring. The topbar `#menuToggle` is the only visible toggle; `setMenuOpen` focuses the first nav link on opening, traps Tab among nav links, and restores focus to trigger when dismissed with Escape/backdrop. Legacy documentation mentioning `#menuClose` describes a prior version only. Browser QA pending.

## Responsive / touch interaction contract — 2026-11-15
The existing hero in `index.html` is an arrow-driven image carousel. `assets/js/home.js` now routes pointer swipe gestures and arrow clicks through the same `show(n)` function. A gesture is accepted only for horizontal movement >=55px and at least 1.35 times vertical movement; link/button gestures are ignored. `assets/css/home.css` applies `touch-action: pan-y pinch-zoom`, mobile breakpoints, safe-area positioning and responsive overflow constraints. Slide state updates `aria-hidden` and `#slideStatus`. The current four-image gallery is a static grid and is not converted into a carousel. Future navigable galleries should reuse this contract and keep visible arrow controls. Physical-device and browser QA remains pending.

## KPI section presentation — 2026-11-15
The intro section `#lodge` contains an editorial intro followed by a full-width `.kpi-band` and `.kpi-grid`. Each `.kpi-item` holds static value/label text; presentation lives in `assets/css/home.css` with responsive 3/2/1-column grid breakpoints. No JavaScript. Existing KPI facts preserved; the user-supplied image is a styling reference, not a source for new property facts. Visual QA pending.

## KPI reference match — 2026-11-15
`index.html` now renders five KPI entries from the supplied visual reference in a 3-column × 2-row `.kpi-grid`; the final cell is intentionally empty. `assets/css/home.css` contains responsive typography adjustments while preserving the 3-column geometry on mobile. Source values and the 'from €620' price are unverified and must be confirmed before publication; this is static presentation, not live pricing.

## KPI sixth item — 2026-11-15
Sixth KPI added in `index.html`: private sauna, completing the fixed 3-column × 2-row grid. Existing CSS unchanged. Prior documentation describing five entries is historical.

## KPI responsive layout correction — 2026-11-15
Current KPI presentation is 3 columns × 2 rows on desktop, 2 columns × 3 rows on screens <=800px. The sixth item remains private sauna. Earlier fixed-three-column-on-mobile notes are historical. Device QA pending.

## KPI content revision — 2026-11-15
Static KPI content in `index.html` updated to 135 m² living area, 2–10 persons, and Sauna / privé; no change to CSS responsive layout or JS.

## Theme architecture — 2026-11-15
`assets/css/home.css` `:root` is the source of truth for five Modern Alpine Luxury palette tokens (`--color-stone-charcoal`, `--color-limestone`, `--color-natural-oak`, `--color-travertine`, `--color-warm-graphite`). Backward-compatible aliases `--ink`, `--gold`, `--sand`, and `--wood` reference these tokens. Core topbar, navigation, KPI, background and footer surfaces reference the centralized palette. A separate `tokens.css` is not yet used.

## Light-first section design — 2026-11-15
Section surfaces are configured through `--color-section-ivory`, `--color-section-taupe`, and `--color-section-text` in `assets/css/home.css`. Intro and closing use ivory; KPI band and gallery use taupe; topbar and footer retain charcoal. The hero stays photo-led with dark overlay. These rules override historical dark KPI/closing declarations.

## Adaptive topbar behavior — 2026-11-15
Header is fixed and transparent over the hero, switching to a solid white surface when the hero's bottom moves above the header's bottom edge. JS `updateTopbar()` in `assets/js/home.js` manages `.is-scrolled`; CSS controls transitions, text/icon contrast and reduced motion. Popup nav and language menu remain dark independently. Desktop and mobile QA pending.

## Hero overlay header hotfix — 2026-11-15
The fixed transparent topbar must overlap the hero rather than take layout space. Rules explicitly zero main/hero top offset, ensure transparency outside `.is-scrolled`, and retain a white surface once scrolled. `index.html` references versioned CSS/JS to mitigate Safari cached assets; iOS visual QA is still outstanding.

## White hero header controls — 2026-11-15
Hero state now forces white header lettering, navigation icon strokes, monochrome flag, and white BOOK surface via CSS variable `--color-topbar-hero-foreground`; scrolled white-header state is unchanged. CSS asset version in `index.html` is now header3.
