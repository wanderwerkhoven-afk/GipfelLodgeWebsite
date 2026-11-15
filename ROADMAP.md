# ROADMAP — GipfelLodgeWebsite
Version: 1.0 | Updated: 2026-11-15 | Repository: wanderwerkhoven-afk/GipfelLodgeWebsite | Default branch: main

## 0. Purpose and operating rules
Build a secure, accessible, multilingual, premium lodge-rental website for Gipfel Lodge, Eben im Pongau, Austria. The existing `Gipfel-Lodge` repository is a **read-only visual/content reference**. Do not change it while implementing this project. This roadmap distinguishes DONE (committed), IN PROGRESS, PLANNED, and BLOCKED. Never claim a feature is complete without code and verification. Every implementation PR/commit must update ROADMAP.md, VARIABLES.md and ARCHITECTURE.md when relevant.

## 1. Current verified baseline
- [x] New repository exists: `wanderwerkhoven-afk/GipfelLodgeWebsite` (public, main).
- [x] Initial standalone homepage committed to `index.html` (commit `7f0a4923dfab5c42bc242a19c134211d3c08fe31`).
- [x] Home includes header/mobile menu, two-image hero, carousel arrows, lodge intro, six USP tiles, four-image gallery, contact CTA, footer, responsive CSS.
- [x] Initial styling references existing palette/fonts.
- [ ] GitHub Pages publication enabled and independently verified (user reported activation issue; settings not confirmed).
- [ ] Homepage rendered and tested on mobile, tablet, desktop after CSS/JS extraction.
- [ ] Photos and logo migrated to local assets (currently loaded from gipfellodge.at).
- [ ] Content/links reviewed (current contact email and capacity claims must be confirmed).
- [ ] Security and accessibility audit completed.

## 2. Phase plan
### Phase 0 — Foundation and documentation [IN PROGRESS]
- [x] ROADMAP.md: phases, acceptance criteria, status and decision log.
- [x] VARIABLES.md: exact current identifier inventory, scope and relationships.
- [x] ARCHITECTURE.md: structure, dependencies, data flows and security principles.
- [ ] README.md with local development instructions and publishing workflow.
- [ ] GitHub Pages: Settings > Pages > Deploy from branch > main > /(root); verify successful deploy.
- [ ] Define issue/PR template and review checklist.
**Exit:** live preview works; all docs match actual source; no accidental changes to legacy repo.

### Phase 1 — Homepage fidelity and design system [IN PROGRESS]
- [x] First homepage scaffold.
- [ ] Compare against legacy homepage section-by-section and agree what to preserve/change.
- [x] Extract homepage CSS to `assets/css/home.css` and JavaScript to `assets/js/home.js` without intentional behavior changes (committed 2026-11-15).
- [ ] Further split shared design tokens/components into dedicated modules if useful.
- [ ] Create design tokens (colors, typography, spacing, breakpoints, components) and document them.
- [ ] Move and optimize permitted original images to `assets/images/`; responsive srcset and image alt text.
- [ ] Build consistent navigation, hero, image gallery, trust content, booking CTA, footer.
- [ ] Keyboard controls, accessible menu, visible focus, reduced-motion and contrast checks.
- [ ] Lighthouse and cross-device tests; eliminate broken links.
**Exit:** visually approved responsive homepage; local assets; no JS console errors.

### Phase 2 — Information architecture and multilingual content [PLANNED]
- [ ] Agree site map: Home, Lodge, Facilities, Gallery, Surroundings, Availability/Book, Contact, Privacy, Terms, Imprint as applicable.
- [ ] Define Dutch/German/English copy and translation key registry; decide whether other languages are required.
- [ ] SEO: canonical, sitemap, robots, meta, Open Graph, accurate structured data.
- [ ] Language-aware navigation and URLs; correct hreflang.
**Exit:** approved routes and translated content, valid SEO metadata.

### Phase 3 — Rental conversion and booking integration [PLANNED]
- [ ] Select PMS/channel manager (compare MyTourist, EasyBooking, Smoobu against needs).
- [ ] Decide embedded widget vs redirect vs API based on supported vendor integration.
- [ ] Show accurate live availability and pricing from authoritative provider; no hardcoded claims.
- [ ] Booking flow, taxes/fees, occupancy, cancellation policy and confirmation.
- [ ] Online payments handled by certified provider; never store payment-card details in frontend.
- [ ] Consent-aware analytics and conversion tracking.
**Exit:** end-to-end test booking in vendor sandbox; no double bookings; legal texts approved.

### Phase 4 — Operations and guest experience [PLANNED]
- [ ] Automated guest communications, arrival/departure instructions.
- [ ] Housekeeping workflow linked to confirmed check-out/changeovers.
- [ ] Key access workflow with revocation/expiry and manual fallback.
- [ ] Tax reporting and accountant exports subject to provider support and legal review.
- [ ] Separate admin access from public website.
**Exit:** tested guest and staff scenarios with least-privilege permissions.

### Phase 5 — Security, privacy and reliability [PLANNED; baseline applies immediately]
- [ ] Threat model for forms, booking, payments, admin and third parties.
- [ ] Content Security Policy suitable for actual hosting/integrations; HTTPS, headers where host supports them.
- [ ] No credentials, secrets or admin API tokens in browser bundles or Git.
- [ ] Server-side validation, authorization, rate limiting and spam prevention for any future write endpoints.
- [ ] Privacy/data-retention and cookie consent requirements reviewed for relevant jurisdictions.
- [ ] Dependency review, backups, monitoring, rollback and accessibility checks.
**Exit:** security checklist passed and documented before collecting guest data.

### Phase 6 — Production launch [PLANNED]
- [ ] Configure custom domain, DNS, HTTPS and redirects.
- [ ] Verify content, translations, real booking, analytics, cookie preferences, performance and indexing.
- [ ] Rollback procedure and incident contacts.
**Exit:** documented launch approval, operational monitoring and ownership.

## 3. Change management
Every code change must record: purpose; files changed; selectors/IDs/functions/constants added/removed; dependencies; affected routes; security/privacy implications; tests performed; roadmap status; migration/rollback notes. Use a feature branch + PR for nontrivial work. Do not force-push main. For each function/variable added, changed or deleted, update VARIABLES.md in the same change. For each new module, update ARCHITECTURE.md.

## 4. Open decisions
| ID | Decision | Status | Consequence |
|---|---|---|---|
| D-001 | PMS provider and booking integration | OPEN | Determines availability/payment architecture |
| D-002 | Hosting: GitHub Pages for preview; production hosting undecided | OPEN | Determines headers, redirects and server-side support |
| D-003 | Language scope (NL/DE/EN baseline proposal) | OPEN | Translation structure |
| D-004 | Own domain and canonical URL | OPEN | SEO and publishing |
| D-005 | Final contact email and booking CTA | OPEN | Avoid misleading contact paths |
| D-006 | Local image ownership/optimization | OPEN | Avoid production dependency on legacy host |

## 5. Next implementation sequence
1. Verify GitHub Pages deployment and preview.
2. Review first homepage side-by-side with legacy and collect visual feedback.
3. Refactor inline CSS/JS into versioned modules while preserving behavior.
4. Localize assets, implement accessibility/performance improvements.
5. Approve site map and booking/PMS approach before building data flows.

## 6. Definition of done
A task is DONE only if committed, linked to the affected files/identifiers, tested at relevant viewport sizes, no known critical regressions, docs updated, and (where relevant) deployment verified. Documentation creation itself does not mean the planned features exist.

### Navigation update — 2026-11-15 [IMPLEMENTED, QA PENDING]
- [x] Floating animated menu anchored below its trigger on desktop/mobile, using slate/gold styling.
- [x] Backdrop, staggered links, animated icon, close button, Escape, focus loop and inert closed state.
- [ ] Verify visually in Safari and GitHub Pages after deployment.
- Code: `index.html` (`#menuToggle`, `#navigation`, `#menuClose`, `#menuBackdrop`), `assets/css/home.css` (navigation selectors), `assets/js/home.js` (`setMenuOpen`).

### Topbar restoration — 2026-11-15 [IMPLEMENTED, VISUAL QA PENDING]
- [x] Reproduced original Gipfel-Lodge topbar structure: left gold nine-dot toggle, absolutely centered logo, right globe/flag dropdown and gold clipped BOOK button.
- [x] Preserved animated popup menu, now anchored to left nine-dot trigger.
- [x] Mobile logo stack and responsive topbar rules based on legacy `css/site_css/components/global.css`.
- [ ] Browser/device comparison against original; exact pixel equivalence not yet verified.
- [ ] Translate content before enabling language switches; only Dutch is currently active.
- [ ] Connect BOOK to verified booking provider (currently #contact).

### Topbar arrangement — 2026-11-15 [IMPLEMENTED, QA PENDING]
- [x] Language selector moved to the left, logo stays centered, BOOK and classic three-line hamburger on the right.
- [x] Hamburger animates into X and floating nav anchors to the right edge of its trigger.
- [ ] Verify narrow iPhone layout and GitHub Pages rendering.

### Menu cleanup — 2026-11-15 [IMPLEMENTED, QA PENDING]
- [x] Removed redundant white in-panel close button; the animated topbar hamburger is the only visible close control.
- [x] Removed obsolete nine-dot and close-button styling and handlers; menu focus now moves to first link.
- [ ] Confirm on iPhone Safari after Pages deploy/cache refresh.

### Responsive + swipe baseline — 2026-11-15 [IMPLEMENTED, DEVICE QA PENDING]
- [x] Add pointer-based horizontal swipe to the existing hero carousel while retaining arrow controls.
- [x] Preserve native vertical scrolling via `touch-action: pan-y pinch-zoom`; ignore vertical/short gestures and interactive targets.
- [x] Add live slide status and inactive slide ARIA state.
- [x] Add mobile viewport, safe-area, overflow, header, menu-height and small-screen layout refinements.
- [ ] Verify on physical iPhone Safari, Android Chrome, tablet and desktop; check swipe direction, vertical scroll, menu, overflow and arrow controls.
- [ ] Apply same shared interaction pattern to future arrow-driven galleries when they are implemented; current static four-photo gallery is not a carousel.

### KPI styling — 2026-11-15 [IMPLEMENTED, VISUAL QA PENDING]
- [x] Replace old feature grid with full-width dark slate KPI band, large serif values, white labels and slim gold left borders, matching supplied design reference.
- [x] Keep existing six KPI values; responsive 3-column desktop, 2-column mobile, 1-column ultra-narrow fallback.
- [ ] Verify typography and spacing on iPhone/desktop GitHub Pages.

### KPI reference correction — 2026-11-15 [IMPLEMENTED, QA PENDING]
- [x] KPI values and labels changed to match supplied reference: 100 m² living, 55 m² terrace/balcony, 115 m² garden, 2–6 people, from €620 for two guests.
- [x] Fixed three-column/two-row layout on all viewport widths, with five occupied positions and an empty sixth position.
- [ ] Verify actual property facts and price before public launch; values currently sourced solely from user-supplied design reference.
- [ ] Check legibility on narrow iPhone widths.

### KPI completion — 2026-11-15
- [x] Added sixth KPI `Privé` / `sauna` in the bottom-right cell of the existing fixed 3×2 KPI grid.

### KPI responsive correction — 2026-11-15
- [x] Desktop KPI layout 3 columns × 2 rows; <=800px layout 2 columns × 3 rows, including small phones.
- [ ] Verify actual responsive appearance on devices.

### KPI content revision — 2026-11-15
- [x] Updated woonruimte to 135 m², occupancy to 2–10 personen, and private sauna display to Sauna / privé. Grid unchanged (3×2 desktop, 2×3 mobile).

### Alpine Luxury theme tokens — 2026-11-15
- [x] Added five central CSS color variables for charcoal, limestone, natural oak, travertine, and graphite.
- [x] Wired existing semantic aliases and major section colors to the new palette.
- [ ] Visual contrast and device QA; remaining decorative fixed color values can be consolidated in a later cleanup.

### Light-first Alpine Luxury homepage — 2026-11-15
- [x] Switch intro and closing sections to light ivory, KPI and gallery to warm taupe; retain dark topbar and footer.
- [x] Add centralized section-level light color variables and dark KPI text for contrast.
- [ ] Verify contrast and responsive visuals on actual desktop and mobile browsers.

### Adaptive topbar — 2026-11-15
- [x] Transparent fixed topbar over hero; white topbar with charcoal controls once header passes hero bottom; reverts on scrolling up.
- [x] Smooth CSS transition, passive scroll/resize update, reduced-motion fallback.
- [ ] Visual QA of logo contrast and menu/BOOK button across desktop/mobile and browser scroll restoration.

### Transparent header hotfix — 2026-11-15
- [x] Explicitly keep `main`/hero flush with top of viewport, allowing fixed topbar to overlay hero.
- [x] Set explicit transparent topbar background when `is-scrolled` is absent.
- [x] Cache-bust CSS/JS in `index.html` to address stale mobile browser style caching.
- [ ] Verify visually in iOS Safari including status-bar safe area.

### Hero header white controls — 2026-11-15
- [x] Hero overlay header uses white logo lettering, hamburger, globe and monochrome flag; BOOK is solid white with charcoal text.
- [x] Preserve white background and dark controls after the hero; cache-bust CSS query to header3.
- [ ] Verify iOS mobile contrast and scrolling state visually.

### Language indicator — 2026-11-15
- [x] Replace topbar selected-language flag with two-letter abbreviation `NL`, beside the globe icon.
- [x] Keep national flags in the language dropdown; other languages remain unavailable until translated.

### Adaptive logo color — 2026-11-15
- [x] White mountain emblem and wordmark over hero; charcoal-colored emblem and text on the white scrolled header.
- [x] CSS filter transition with reduced-motion support; asset version refreshed.
- [ ] Verify appearance against source PNG transparency on mobile Safari.

### Hero shade update — 2026-11-15
- [x] Replace dark navy hero gradients with lighter Stone Charcoal overlay: 50% left, 25% middle, 10% right and 20% bottom.
- [x] Expose overlay color and opacity as editable CSS variables.
- [ ] Verify image and white text contrast on desktop and mobile (summer and winter slides).

### Editorial footer inspired by Woodridge — 2026-11-15
- [x] Replace single-line footer with logo/location/email masthead and four-column contact, site, accommodation and service navigation.
- [x] Responsive 4 columns desktop / 2 columns mobile, single column below 350px; muted dark taupe and warm ivory text.
- [x] Reuse site logo and verified public contact email; no phone/social handles invented.
- [ ] Confirm full street address and phone/social profiles before adding; visual QA on mobile and desktop.

### Footer information hierarchy refinement — 2026-11-15
- [x] Match reference footer grouping: location/contact, Gipfel Lodge, De lodge, Eben im Pongau and Service.
- [x] Desktop five-column grid and mobile full-width contact section followed by four groups in a 2×2 grid.
- [x] Show future destination information as text rather than fake links; use existing sections and email links for actionable entries.
- [ ] Create dedicated content pages for environment, winter/summer activities and guest information before making those labels navigable.

### Footer mobile reference alignment — 2026-11-15
- [x] Mobile footer masthead is now compact: standalone white mountain emblem left, location and email right, aligned as 2-column layout.
- [x] Hide large footer wordmark only on phones; retain desktop branding and 2×2 information categories below the full-width contact block.
- [ ] Verify appearance and line breaks on 320–430px iOS Safari.

### Fullscreen gallery viewer — 2026-11-15
- [x] Open each 'Ontdek de lodge' gallery photo in a full-screen native modal with the original image title beneath.
- [x] Accessible gallery triggers, close button, Escape key and backdrop click; focus returns to the triggering tile after closing.
- [x] Keep original gallery layout and aspect ratio via `object-fit:contain` in viewer; CSS and JS cache-busted.
- [ ] Verify mobile iOS Safari fullscreen image sizing and dialog behavior.
