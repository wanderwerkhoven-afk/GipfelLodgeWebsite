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

## Navigation symbols added — 2026-11-15
| Identifier | Location | Type / responsibility | Dependencies |
|---|---|---|---|
| `menuToggle` | `index.html`, `assets/js/home.js` | Trigger button / `toggle` element | `setMenuOpen`, `aria-expanded`, `#navigation` |
| `navigation` | `index.html` | Popup nav; hidden with `inert` and `aria-hidden` | `.nav.open`, `setMenuOpen` |
| `menuClose` / `closeButton` | HTML / JS | Close button; first keyboard focus | `setMenuOpen(false)` |
| `menuBackdrop` / `backdrop` | HTML / JS | Overlay and outside-click dismissal | `.menu-backdrop.open`, `setMenuOpen(false)` |
| `setMenuOpen(open,{restoreFocus=false}={})` | `assets/js/home.js` | Single popup state manager; synchronizes classes, ARIA, inert, focus | trigger, close, overlay, link and keyboard handlers |
| `.menu-anchor`, `.menu-icon`, `.menu-caption` | HTML/CSS | Positioning, animated hamburger, caption | `aria-expanded` on trigger |
| `.nav-eyebrow`, `.nav-footnote` | HTML/CSS | Popup supporting text | `.nav` |
Menu event graph: trigger → `setMenuOpen(true)` → `.nav.open` and backdrop → close/anchor/Escape → `setMenuOpen(false)`. `returnFocus` is currently an unused local JS variable, reserved for cleanup. Visual browser QA pending.

## Original-style topbar symbols — 2026-11-15
| Symbol | Location | Purpose / dependencies |
|---|---|---|
| `.topbar`, `.topbar-inner` | `index.html`, `assets/css/home.css` | Fixed header, 88px desktop / 70px mobile, layout frame |
| `.topbar-dots`, `#menuToggle` | HTML/CSS/JS | Gold nine-dot SVG opens anchored `#navigation` via `setMenuOpen` |
| `.topbar-center`, `.topbar-logo`, `.logo-text-part` | HTML/CSS | Centered logo; stacked mobile wordmark |
| `.topbar-actions`, `.topbar-book` | HTML/CSS | Right language + BOOK CTA; BOOK links to `#contact` |
| `.lang-dropdown`, `.lang-toggle`, `#languageToggle` | HTML/CSS/JS | Language popover trigger |
| `.lang-menu`, `#languageMenu`, `.lang-link` | HTML/CSS/JS | Visual language menu; other translations marked unavailable |
| `languageToggle`, `languageMenu`, `languageDropdown` | `assets/js/home.js` | Cached DOM references for language popup |
| `setLanguageOpen(open)` | `assets/js/home.js` | Updates language popup open class, `aria-expanded`, `aria-hidden`, `inert` |
| `.fi`, `.fi-nl`, `.fi-de`, `.fi-gb`, `.fi-fr`, `.fi-it`, `.fi-pl` | HTML/external flag-icons CSS | Flag icons; CDN dependency |
Original source: legacy `Gipfel-Lodge/index.html` header and `css/site_css/components/global.css` header rules. Existing navigation is still custom animated popup, not the legacy drawer.

## Header rearrangement — 2026-11-15
- `.topbar-language` (HTML/CSS): left-side language selector container; contains `#languageToggle` and `#languageMenu`.
- `.topbar-actions` (HTML/CSS): right-side BOOK link and `.menu-anchor` trigger.
- `.topbar-hamburger`, `.hamburger-lines` (HTML/CSS): classic three-line menu trigger; uses `#menuToggle` and `aria-expanded` to animate to X.
- `.topbar .nav` (CSS): anchored to right of hamburger with `transform-origin: top right`; JavaScript `setMenuOpen` remains unchanged.
- `.topbar-language .lang-menu` (CSS): language popup aligns left under selector.

## Menu cleanup — 2026-11-15
- Removed `#menuClose` / `closeButton` from `index.html`, `assets/js/home.js` and obsolete `.menu-close` CSS. Any earlier registry references to these identifiers are historical, **not current**.
- `setMenuOpen(true)` now focuses `#navigation a` (first link), and keyboard Tab cycling uses only `#navigation a` elements.
- The right-side `#menuToggle` (`.topbar-hamburger`) is the sole visible menu toggle/close control. Backdrop and Escape continue to dismiss the menu.
- Removed obsolete `.topbar-dots` styles and older hamburger styles. Do not reintroduce duplicate close controls.

## Swipe / responsive registry — 2026-11-15
| Symbol | Source | Function / dependencies |
|---|---|---|
| `hero` | `assets/js/home.js`, `.hero` in HTML | Pointer event target for touch swipe; does not intercept vertical scrolling |
| `slides` | `assets/js/home.js` | Array of `.slide` elements |
| `slideStatus` / `#slideStatus` | JS / HTML | Live accessible slide position announcement |
| `show(n)` | `assets/js/home.js` | Shared slide navigation for arrows and swipe; sets `.active` and `aria-hidden` |
| `start` | `assets/js/home.js` | Pointer start coordinates and pointer ID; reset on up/cancel |
| `dx`, `dy` | `assets/js/home.js` | Horizontal/vertical movement; 55px threshold and direction discrimination |
| `.hero {touch-action:pan-y pinch-zoom}` | `assets/css/home.css` | Native vertical scroll and pinch zoom while enabling horizontal pointer gestures |
| `.sr-only` | CSS | Visually hidden screen-reader status |
| Responsive breakpoints `800px`, `590px`, `380px` | CSS | Grid/header/hero/menu sizing and safe-area adjustments |
The static `.gallery` is a grid, not an arrow-navigable carousel. No swipe handler is attached to it.

## KPI layout — 2026-11-15
- `.kpi-band` (`index.html`, `assets/css/home.css`): full-width dark slate background enclosing KPI grid.
- `.kpi-grid`: responsive CSS grid; 3 columns desktop, 2 at <=800px, 1 at <=330px.
- `.kpi-item`: one metric with gold left border, serif `<strong>` value and sans-serif `<span>` label.
- KPI content remains static in `index.html`; no JS variables or calculations. Values retained: 135 m², Tot 10, 4, 3, Privé, Alpen.
- `.intro` now only contains introduction text above the KPI band.

## KPI reference update — 2026-11-15
The current `.kpi-grid` in `index.html` contains **five** static `.kpi-item` entries: `100 m²`/`woonruimte`, `55 m²`/`terras / balkon`, `115 m²`/`tuin`, `2 – 6`/`mensen`, `vanaf € 620`/`Prijs per chalet voor 2 personen`. CSS in `assets/css/home.css` overrides earlier responsive rules to maintain three columns and two rows at all widths; sixth slot is unoccupied. Previous 135m²/10 guest etc. registry entries are historical. Source figures are unverified reference copy, not PMS pricing.

## KPI sixth item — 2026-11-15
The `.kpi-grid` now contains six `.kpi-item` elements. Sixth: `<strong>Privé</strong><span>sauna</span>` (bottom right). The earlier note that the sixth cell is empty is superseded. No JavaScript or CSS changes required.

## KPI breakpoint correction — 2026-11-15
Current `.kpi-grid` CSS at end of `assets/css/home.css` overrides earlier KPI rules: desktop `repeat(3,minmax(0,1fr))` with two rows; `@media(max-width:800px)` uses `repeat(2,minmax(0,1fr))` with three rows, maintained at 480px and 330px. Older notes about fixed 3-column mobile layout are superseded.

## KPI content revision — 2026-11-15
Current `index.html` KPI values supersede earlier entries: `135 m²` / `woonruimte`, `2 – 10` / `personen`, and `Sauna` / `privé`. CSS and JS unchanged.

## Active theme palette — 2026-11-15 (supersedes initial token values)
Source: `assets/css/home.css` `:root`. To retheme, change these five variables:
| Variable | Value | Purpose |
|---|---|---|
| `--color-stone-charcoal` | `#383936` | Dark surfaces, topbar, KPI, footer |
| `--color-limestone` | `#F2EFE8` | Page background |
| `--color-natural-oak` | `#A88B6B` | Accent, buttons, gold-rule replacement |
| `--color-travertine` | `#D7CABB` | Soft backgrounds and borders |
| `--color-warm-graphite` | `#65615B` | Secondary text |
Legacy semantic aliases `--ink`, `--gold`, `--sand`, `--wood` now point to palette variables. Some fixed translucent overlays and text colors remain as component-level values. The initial `:root` values table above is historical.

## Light-first section tokens — 2026-11-15
`assets/css/home.css` now defines `--color-section-ivory:var(--color-limestone)`, `--color-section-taupe:#E8E0D5`, and `--color-section-text:var(--color-stone-charcoal)` in `:root`. These control light homepage surfaces: intro and closing ivory; KPI and gallery taupe; topbar and footer remain dark charcoal. The previous dark KPI styling is superseded.

## Adaptive topbar — 2026-11-15
`assets/css/home.css` `:root` defines `--color-topbar-solid:#FFFFFF`, `--color-topbar-solid-text:var(--color-stone-charcoal)`, `--topbar-transition-duration:320ms`. `.topbar` defaults to transparent over hero; `.topbar.is-scrolled` uses white background and charcoal foreground. `assets/js/home.js` `updateTopbar()` checks `hero.getBoundingClientRect().bottom <= topbar.getBoundingClientRect().bottom`, toggles `is-scrolled` on passive scroll and resize, and runs on initialization. `index.html` theme-color updated to limestone.

## Transparent header hotfix — 2026-11-15
`assets/css/home.css` adds `body>main{padding-top:0;margin-top:0}`, `main>.hero{margin-top:0}`, and explicit `body>.topbar:not(.is-scrolled){background-color:transparent}`. `index.html` now loads versioned stylesheet and script query strings (`?v=20261115-header2`) to invalidate earlier cached assets. Adaptive variables remain `--color-topbar-solid`, `--color-topbar-solid-text`, `--topbar-transition-duration`.

## Hero header white-foreground token — 2026-11-15
`--color-topbar-hero-foreground:#FFFFFF` controls text/icon contrast in `body>.topbar:not(.is-scrolled)`. Logo lettering, language icon, hamburger strokes, and BOOK background use it. Flag is monochromatically filtered white in hero state; returns to full color when scrolled. Existing white-topbar state remains charcoal controls. Cache-busted CSS to `?v=20261115-header3`.

## Language indicator — 2026-11-15
`index.html`: `.active-language-code` currently shows static `NL` in `#languageToggle` instead of `.active-flag-container`. The dropdown still uses `.fi fi-*` flags for each language. `assets/css/home.css` controls abbreviation styles; code inherits adaptive topbar foreground. No language-switching logic was added.

## Adaptive logo color — 2026-11-15
`assets/css/home.css` defines `--logo-light-filter:brightness(0) invert(1)` and `--logo-dark-filter:brightness(0) opacity(.78)`. `.topbar-logo img` uses light filter by default and dark filter when `.topbar.is-scrolled`; respects `--topbar-transition-duration` and reduced-motion. Logo wordmark text already switches by the topbar state. CSS URL now cache-busted `?v=20261115-logo-switch`.

## Hero overlay theme tokens — 2026-11-15
`assets/css/home.css` `:root` defines `--hero-overlay-color:56,57,54` (RGB Stone Charcoal), `--hero-overlay-left:0.50`, `--hero-overlay-middle:0.25`, `--hero-overlay-right:0.10`, and `--hero-overlay-bottom:0.20`. `.hero:after` uses these in two layered `linear-gradient()` values. The previous navy blue `#0d1c2a` shade is superseded. The CSS URL has a cache-busting version `?v=20261115-hero-charcoal`.

## Editorial footer tokens — 2026-11-15
In `assets/css/home.css`: `--footer-background:#302C2A`, `--footer-heading:var(--color-limestone)`, `--footer-body:#D5CFCA`, `--footer-accent:var(--color-natural-oak)`, `--footer-rule:rgba(242,239,232,.20)`. Footer selectors `.footer-shell`, `.footer-top`, `.footer-brand`, `.footer-columns`, `.footer-column`, `.footer-bottom` govern the new multi-column layout. Values apply to current HTML footer and supersede old single-line `.footer`. Existing `#year` ID preserved for dynamic year.

## Footer information hierarchy refinement — 2026-11-15
`index.html` footer `.footer-columns` now contains five groups: `.footer-contact` followed by Gipfel Lodge, De lodge, Eben im Pongau and Service. CSS in `assets/css/home.css`: desktop grid `1.65fr repeat(4,minmax(0,1fr))`, under 900px `.footer-contact` spans full row, remaining groups use 2 columns (also maintained under 350px). Informational destination entries are `<span>` elements pending real pages. CSS URL `?v=20261115-footer-groups`.

## Footer mobile masthead — 2026-11-15
At `max-width:590px`, `.footer-top` is a two-column/2-row CSS grid (`minmax(64px,.42fr) minmax(0,1.58fr)`), footer emblem occupying the left column across both rows and `.footer-top-location`/`.footer-top-email` right-aligned on the right. `.footer-brand span` is hidden only on mobile. At `max-width:370px`, column and font sizes scale down. The main contact block remains full-width and four section groups remain 2×2. Stylesheet cache-bust `?v=20261115-footer-mobile-layout`.

## Gallery lightbox — 2026-11-15
`index.html` gallery cards are `<button class="photo gallery-trigger">` with image and title; native `<dialog id="galleryLightbox">` contains `#galleryLightboxImage`, `#galleryLightboxTitle` and `#galleryLightboxClose`. `assets/js/home.js` binds gallery triggers to `showModal()`, uses original image URL and title, handles close button/backdrop, and restores keyboard focus on close; Escape is native dialog behavior. `assets/css/home.css`: `.gallery-lightbox`, `.lightbox-figure`, `.lightbox-close` and `.gallery-trigger` style fullscreen display with original aspect ratio. Asset URLs versioned `?v=20261115-gallery-lightbox`.

## Gallery motion and backdrop tokens — 2026-11-15
`assets/css/home.css` tokens: `--lightbox-backdrop-blur:16px`, `--lightbox-backdrop-tint:rgba(22,21,20,.34)`, `--lightbox-zoom-duration:560ms`. `.gallery-lightbox::backdrop` uses animated backdrop-filter for frosted page, not an opaque color. `assets/js/home.js` helpers `galleryTransform(fromRect,toRect)`, `animateGalleryImage(frames,duration)`, `openGallery(trigger)`, `closeGallery()` implement source-to-modal FLIP transform and reverse zoom; `galleryOpening`/`galleryClosing` guard repeated action, `prefers-reduced-motion` disables motion. CSS and JS URLs `?v=20261115-gallery-zoom`.

## Guest reviews section — 2026-11-15
`index.html`: `<section class="reviews-section" id="reviews">` placed after lightbox/gallery and before `.closing`. Semantic headings and CTA `mailto:info@gipfellodge.at?subject=Mijn%20ervaring%20bij%20Gipfel%20Lodge`. `assets/css/home.css` `:root` contains `--reviews-background`, `--reviews-card-background`, `--reviews-text`, `--reviews-muted`, `--reviews-accent`; corresponding selectors `.reviews-layout`, `.reviews-intro`, `.reviews-panel`, `.reviews-panel-bottom` define responsive styling. No fabricated testimonials/ratings or API integration. CSS version `?v=20261115-reviews`.

## Villa for You reviews data and carousel — 2026-11-15
`index.html` `.reviews-section` now embeds a cited-in-content 5.0/5 score based on 13 published Villa for You reviews for chalet `a6756`, plus 5 paraphrased guest reactions: Peter (Oct 2026, source unstated), Luisa (Oct 2026, Airbnb), John (Aug 2026, Trade Tracker Nederland), Christian (Jul 2026, Airbnb, verified on EN/DE site), Timo (Sep 2026, rating only, source unstated). The 8 remaining entries are not fabricated; a link opens all reviews on Villa for You. `#reviewsCards` horizontal scroll container, `#reviewsPrev`/`#reviewsNext` trigger `scrollReview(direction)` in `assets/js/home.js`; CSS styles `.reviews-header`, `.reviews-score`, `.review-card`, `.reviews-arrows` with existing `--reviews-*` palette. Cachebuster `?v=20261115-real-reviews` for JS and CSS. Provenance: https://www.villaforyou.com/nl/vakantiehuis-oostenrijk/salzburgerland/chalet-eben-im-pongau-8-personen-a6756 and corresponding English version. Review score is a static snapshot, not live sync.

## Review platform attribution standard — 2026-11-15
Static `index.html` `.review-card-footer small` displays `Reviewplatform: Airbnb` for Luisa and Christian only, supported by Villa for You source pages in NL/DE. Peter, Timo and John display `Reviewplatform niet vastgesteld`. Villa for You listing states 'via Trade Tracker Nederland' for John but this is not treated as a review platform. Never infer review origin from republication on Vrbo or an affiliate referral.

## Full 13 guest testimonials — 2026-11-15
`index.html` `#reviewsCards` now contains 13 `.review-card` elements with complete original-language quotations transcribed from owner-uploaded screenshots (Peter, Luisa, Timo, John, Christian, Tim, Chrystal, Damian, Sara, Sabrina, Dirk, Veerle, Philipp). `.review-original` is a `<blockquote>` with `lang` inherited from each article. For Timo, `.review-no-text` marks the original 'received without further explanation' platform placeholder. `.review-card-footer` reports guest and source channel when stated; Trade Tracker, Holidu, Fewobird/Bestfewo are labelled as *vermeld kanaal*. CSS supports untruncated wrapping and flexible card heights. CSS cache version `20261115-reviews-full13`. The 5.0/5 aggregate remains a static Villa for You snapshot.

## Review preview and modal — 2026-11-15
`assets/css/home.css` custom property `--review-preview-lines:5` sets line clamp. `.review-preview`, `.review-original`, `.review-show-more`, `.review-dialog` styles position the expand link at end of line five over a subtle gradient in the card's taupe surface. `index.html` contains native `<dialog id="reviewDialog">`, metadata slots, quote and close button. `assets/js/home.js` `updateReviewPreviews()` detects overflow by comparing `scrollHeight` and `clientHeight` (on load/fonts ready/resize); opens complete original content and metadata via `showModal()`, backdrop/close/Escape and restores focus. Cache-busted CSS and JS version `20261115-review-expand`.

## Persistent review action — 2026-11-15
`index.html` each `.review-card` contains `.review-preview` with 5-line-clamped `.review-original`, then `.review-card-action > .review-open-btn` (always visible), then `.review-card-footer`. `assets/css/home.css` makes preview flex to fill remaining card height and right-aligns action. `assets/js/home.js` binds `.review-open-btn` to the same full review modal and no longer measures text overflow. Earlier `review-show-more` notes superseded.

## Intro photo collage — 2026-11-15
`.lodge-collage` and `.lodge-collage-stage` introduced in `index.html` between `.intro` and `.kpi-band`; 4 figures use kitchen, livingroom, bedroom and terrace image URLs already used in gallery. `assets/css/home.css` tokens `--collage-overlap`, `--collage-shadow`, `--collage-frame` and styles `.lodge-collage-photo--left`, `--main`, `--right`, `--detail`; breakpoint 800/590 px. `--collage-overlap` reserved for subsequent spacing refinements. Cache-busting CSS `?v=20261115-intro-collage`.

## Draggable photo collage — 2026-11-15
`index.html` `.lodge-collage-stage` now contains 4 keyboard-focusable `.lodge-collage-photo` elements, each with `draggable=false` images and an instruction caption `#collageInstructions`. `assets/js/home.js` installs pointerdown/move/up/cancel and lostpointercapture handlers, uses pointer capture, calculates movement inside the collage, writes percentage left/top offsets, and increments z-index to bring the active photo forward. Keyboard Arrow keys move the focused photo 12px. `assets/css/home.css` uses `touch-action:none`, grab/grabbing cursors, non-selectable images, hidden stage overflow, and a focus outline. Assets are versioned with `?v=20261115-collage-drag`. Drag arrangement is local transient state and is reset on reload.

## Collage pickup motion — 2026-11-15
`assets/css/home.css` `--collage-pickup-scale:1.055`, `--collage-pickup-duration:520ms`, per-photo `--collage-photo-tilt` and `@keyframes collage-pickup-wiggle` drive a short 520ms lift/wobble on `.lodge-collage-photo.is-dragging`; release restores original transform using a 220ms CSS transition. Reduces motion for `prefers-reduced-motion:reduce`. CSS cache version `20261115-collage-pickup`.

## Collage responsive help text — 2026-11-15
`index.html` `#collageInstructions` now has `.collage-hint-desktop` and `.collage-hint-touch` inline spans. CSS hides touch text by default and swaps visibility inside `@media(pointer:coarse), (max-width:800px)`. Stylesheet version `20261115-collage-hints`.

## Mountain silhouette footer edge — 2026-11-15
`.footer-mountain-edge` (decorative `aria-hidden` inline SVG) is inserted between `</main>` and `<footer>` in `index.html`. The dark skyline inherits `--footer-background`; CSS `height:clamp(64px,10.5vw,150px)` and mobile `clamp(70px,19vw,110px)`, background `var(--color-limestone)`. Stylesheet cache key `20261115-footer-mountains`. This is a newly constructed vector contour; not a previously verified image asset.

## Original mountain footer divider — 2026-11-15
The source repo `wanderwerkhoven-afk/Gipfel-Lodge`, `assets/icons/devider-mountain.svg` (viewBox 0 0 750 90, embedded image) has been copied unchanged into the same path in `GipfelLodgeWebsite`. `index.html` `.footer-mountain-edge > img` now references local original SVG; `assets/css/home.css` sets full-width aspect ratio 750/90. Cache key `20261115-original-mountain`. This supersedes the temporary authored inline mountain SVG from the prior commit.

## Mountain divider colour correction — 2026-11-15
`assets/css/home.css` `.footer-mountain-edge::after` uses CSS `mask-image` / `-webkit-mask-image` on the local `../../assets/icons/devider-mountain.svg`, with solid `background:var(--footer-background)` instead of rendering the original SVG's black pixels. `.footer-mountain-edge` uses `width:100vw` and `margin-left:calc(50% - 50vw)` for full-bleed width; the area above the peaks uses `var(--color-section-ivory)`. The old `<img>` is hidden but retained in markup. CSS cache bust key: `20261115-mountain-color-width`.

## Mountain divider edge overscan — 2026-11-15
`.footer-mountain-edge::after { inset:0 -8px 0 -8px; }` expands the original SVG mask by 8 pixels horizontally within its clipped container, compensating for faint transparent pixels at the source image edges. Wrapper now uses `width:100%` to avoid subpixel viewport-offset issues. Cache version `20261115-mountain-edge-overscan`.

## Mountain silhouette zoom — 2026-11-16
Footer mountain mask now uses `mask-size:104% 104%` / `-webkit-mask-size:104% 104%` and `mask-position:center bottom` instead of `inset:0 -8px`. Mask `inset:0` and its existing `--footer-background` fill stay unchanged. Cache version `20261116-mountain-zoom`.

## Mountain footer join seam — 2026-11-16
`assets/css/home.css` `.footer-mountain-edge::before` draws a 4px high `--footer-background` strip at the bottom of the mountain divider above the masked pseudo-element; `.footer-mountain-edge+.footer { margin-top:-1px }` overlaps the join. Preserves the 104% SVG mask zoom. Cache version `20261116-mountain-seam-fix`.

## Review icons — 2026-11-16
Decorative reviews UI avoids emoji: `.external-link-icon` is an inline 24x24 SVG line icon; `.reviews-score-stars`, `.review-card-stars`, `.review-dialog-stars` use a five-repeat SVG background pattern instead of the literal star characters. Author-country emoji flags were changed into plain country names while preserving reviewer metadata. Original guest-authored text remains untouched (including any emoji in original submissions). CSS cache bust `20261116-svg-icons`.

## Complete historical image library imported — 2026-11-16
Source `wanderwerkhoven-afk/Gipfel-Lodge` main and target `wanderwerkhoven-afk/GipfelLodgeWebsite` main now contain the same 591 assets with extensions JPEG/PNG/WebP/GIF/SVG/AVIF/BMP/ICO/TIFF (total 321,489,709 bytes). The source layout is preserved across `assets/`, `beheer/assets/`, `beheer/site_manifest/`, `site_manifest/` and `siteground_upload/`; existing SVG `assets/icons/devider-mountain.svg` was skipped. A one-time import workflow `.github/workflows/import-gipfel-images.yml` succeeded and is now manual-only (`workflow_dispatch`). `index.html` replaced 12 absolute image references from `https://gipfellodge.at/assets/` with local `assets/` references. Stylesheet cache marker `20261116-local-assets`.

## Repository asset pruning — 2026-11-16
The earlier 591-image import inventory is historical: after explicit cleanup both `Gipfel-Lodge` and `GipfelLodgeWebsite` contain 195 image/SVG files (107,081,289 bytes). The duplicated folders `beheer/`, `siteground_upload/` and `site_manifest/favicon_admin/` are no longer tracked; the site's main assets live under `assets/images/`, `assets/icons/`, plus public website favicons at `site_manifest/favicon_website/`. The temporary import workflow was deleted rather than leaving a path to accidentally restore the redundant images. Do not reintroduce retired copies without explicit approval.

## Public site manifest — 2026-11-16
Manifest URL: `site_manifest/favicon_website/site.webmanifest` (linked in `index.html`). `start_url` is `../../index.html` and `scope` is `../../` relative to the manifest directory to work both under the GitHub Pages project path and at a future domain root. `display:standalone`, `lang:nl`, `theme_color` and `background_color` = `#F2EFE8`; icons: existing 192×192 and 512×512 PNG in the same directory, declared `any maskable`. Head links local .ico, .svg, 96px favicon, 180px Apple Touch icon. Do not use retired `favicon_admin/` assets. No PWA offline cache/service worker implied.

## Open Graph and social sharing — 2026-11-16
`index.html` publishes OG metadata and `twitter:card=summary_large_image` for WhatsApp/Facebook/LinkedIn/X social previews. Canonical and `og:url`: `https://wanderwerkhoven-afk.github.io/GipfelLodgeWebsite/`. Absolute `og:image` and `twitter:image`: `https://wanderwerkhoven-afk.github.io/GipfelLodgeWebsite/assets/images/Foto-collage-woning/outside-building-winter.jpg` (local JPEG). Static crawlers receive the tags without JS. Update all absolute social URLs and canonical once the production custom domain is activated. Do not substitute `gipfellodge.at` without verifying actual active domain/hosting.

## Faceted button system — 2026-11-16
Global `--button-facet:11%` and `--button-transition:200ms ease` defined in `assets/css/home.css`. `a.btn`, `.review-open-btn` and `.nav .book` share a six-point beveled-end silhouette inspired by `.topbar-book`. Primary actions are natural oak (`--color-natural-oak`), secondary hero actions are light translucent, review actions use compact natural oak buttons. Phone breakpoint `590px` reduces padding. The topbar's original BOOK button remains unchanged. CSS cache key `20261116-faceted-buttons`.

## Rounded faceted CTA corners — 2026-11-16
The inline `<svg class="button-shape-defs">` near the start of `<body>` defines `#gipfelRoundedHex` as a normalized (objectBoundingBox) path with tiny quadratic-curve turns at all six hexagonal corners. CSS applies `clip-path:url("#gipfelRoundedHex")` to `.topbar .topbar-book`, `a.btn`, `.review-open-btn` and `.nav .book` to replace the polygon's mathematically sharp points. Relative curve sizes are approximately 1–2 px at normal button dimensions. On `:focus-visible` clipping is removed to preserve keyboard outline. CSS version `20261116-rounded-hex`.

## Desktop scaling — 2026-11-16
`assets/css/home.css` contains `--desktop-site-zoom:0.8`. `@media (min-width:1024px) and (pointer:fine) { html { zoom:var(--desktop-site-zoom) } }` applies the smaller scale to the complete desktop layout, including typography, buttons, imagery and spacing. Touch devices and narrower viewports remain at 100%. CSS cache version `20261116-desktop-80`. CSS `zoom` changes layout scale; no transform wrapper is used.

## Desktop dimensions baked in — 2026-11-16
Supersedes the earlier `--desktop-site-zoom:0.8` setting. That variable and the `html { zoom: ... }` rule were deleted. `assets/css/home.css` now ends with fixed numeric desktop CSS overrides under `@media(min-width:1024px) and (pointer:fine)`, with pixel/rem/em typography and spacing values directly scaled around 80%. No CSS zoom or shared scale variable remains. Standard small/mobile CSS definitions were left untouched. The versioned stylesheet is `20261116-desktop-fixed80`.

## Reference-inspired desktop layout — 2026-11-16
The desktop composition now references the broad layout rhythm of `https://gipfellodge.nl/` while retaining the new website's content, photo collage interaction, five-star review slider, KPI facts, rounded faceted CTAs and taupe/ivory palette. `index.html` wraps `.intro` and `.lodge-collage` in `.intro-visual-row`. In `assets/css/home.css`, desktop `@media(min-width:1024px) and (pointer:fine)` gives the wrapper a two-column grid (.86fr/1.14fr), max 1220px wide with a ~42–80px gap and ~95–112px section padding, and sets explicit sizes for hero, gallery, reviews, KPIs and footer. Small mobile sizes unchanged. Tablet 801–1023px retains stacked composition. Prior generated 80%-scale override block replaced, and no zoom variable exists. CSS cache key `20261116-reference-layout`.
