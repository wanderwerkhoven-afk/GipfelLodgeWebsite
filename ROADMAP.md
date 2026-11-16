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

### Animated gallery zoom and blurred backdrop — 2026-11-15
- [x] Replace abrupt gallery modal opening with FLIP-style photo zoom from clicked gallery image to centered fullscreen viewer.
- [x] Animate reverse zoom on close, including outside click, close button and Escape.
- [x] Replace opaque backdrop with animated frosted/blurred underlying website; keep title beneath photo and fade title/controls.
- [x] Respect prefers-reduced-motion and guard duplicate opens.
- [ ] Visually verify in iOS Safari, especially screenshot alignment, backdrop-filter and returning photo to grid.

### Guest reviews section — 2026-11-15
- [x] Added editorial reviews block directly beneath the 'Ontdek de lodge' photo gallery and ahead of contact/closing CTA.
- [x] Responsive split layout with warm ivory and taupe, title, verified-review placeholder, and email-based review submission CTA.
- [ ] Replace placeholder with authentic, permission-cleared guest quotes and sources before publishing star ratings or review counts.
- [ ] Verify mobile and desktop visual layout.

### Source-attributed Villa for You reviews — 2026-11-15
- [x] Replace placeholder with 5 source-grounded review summaries (Peter, Luisa, John, Christian, Timo) and transparent attribution of known source channels.
- [x] Display Villa for You headline score 5.0/5 across 13 reviews (as viewed 2026-11-15); offer direct link to all reviews on Villa for You.
- [x] Horizontal swipeable review cards with previous/next controls, responsive design and reduced motion.
- [ ] Remaining 8 review entries require interactive source access; do not invent uninspected guest texts or origin platforms.
- [ ] Confirm whether the public capacity should be 8 (Villa for You listing) or 10 (current website KPI).
- [ ] Verify browser/mobile display and periodically verify source review counts.

### Review provenance investigation — 2026-11-15
- [x] Owner confirms actual Gipfel Lodge occupancy is **10 persons**; keep the website KPI at 2–10. Earlier 'confirm 8 vs 10' decision is resolved: 10 is the owner-confirmed property capacity. Major OTA listings currently cap bookable occupancy at 8; clarify their distribution configuration independently.
- [x] Researched listings: Villa for You AT.5531.14 (5/5, 13), Airbnb https://www.airbnb.com/rooms/1579349146079892345 (5/5, 6–7 in differing snapshots), Vrbo https://www.vrbo.com/5720804ha (9.8/10, 7), Booking.com https://www.booking.com/hotel/at/tauernlodge-eben-e4.en-gb.html (no property guest-review score yet).
- [x] Matched syndications: Villa for You John review aligns with Vrbo Derix (Aug 2026); Tim aligns with Giesen (Jun 2026). Vrbo flags 6/7 as 'from a partner site', with Michael A. verified on Vrbo. Do not sum visible review totals across platforms.
- [ ] Obtain original booking source/channel ID and full 13-review export from Villa for You (MyVilla/channel manager) to determine provenances authoritatively.
- [ ] Examine longer October review by Vahl (8/10, cleaning/management complaints) and reconcile against existing website's blanket five-star cards; Vrbo aggregates 9.8/10.
- [ ] Review representations/permission around static 5/5 score and review excerpts if different channels diverge.

### Review origin labels confirmed-only — 2026-11-15
- [x] Review cards explicitly show `Reviewplatform: Airbnb` only for Luisa and Christian (Villa for You attributes both to Airbnb).
- [x] Peter, Timo and John labelled `Reviewplatform niet vastgesteld`; Trade Tracker Nederland is an affiliate referral channel and not confirmed review-hosting platform.
- [ ] Add further original review-platform labels only after a platform source or booking/review ID confirms them.

### Full 13 reviews from owner-provided screenshots — 2026-11-15
- [x] Replace paraphrased five-card carousel with all 13 verbatim reviews transcribed from user-supplied Villa for You screenshots: Peter, Luisa, Timo, John, Christian, Tim, Chrystal, Damian, Sara, Sabrina, Dirk, Veerle and Philipp.
- [x] Preserve original Dutch/German/English wording, scores, guest names, dates, and disclosed channels. Timo is the original platform placeholder rather than a guest-written quote.
- [x] Reflect Airbnb as explicitly stated, and label Trade Tracker, Holidu and Fewobird/Bestfewo as listed channels (not automatically the primary review-hosting platform).
- [x] Show long reviews without truncation, preserve carousel and source URL.
- [ ] QA transcription against original guest data, including Sara's original phrasing and emoji on the Philipp/Damian cards; visual QA on iPhone and desktop.

### Five-line review preview and full-text popup — 2026-11-15
- [x] Clamp each guest review to a maximum of five visible lines on cards.
- [x] Display `…meer tonen` aligned with the end of the fifth line only when text overflows, and open an accessible native modal with the complete original guest review, author, date, stars and sourced platform.
- [x] Backdrop closes dialog, Escape works, and focus returns to the clicked control; short reviews have no expand control.
- [ ] Visually test inline ellipsis alignment, overflow detection and native dialog behavior on iOS Safari and desktop.

### Persistent 'Bekijk review' control — 2026-11-15
- [x] Replaced all 13 inline `…meer tonen` buttons with a fixed right-aligned `Bekijk review` button immediately above each reviewer metadata line.
- [x] Keep five-line previews; open full original text in the existing accessible dialog even for shorter reviews.
- [x] Remove obsolete overflow measurement/conditional visibility logic. HTML, CSS and JS assets cache-busted to `20261115-review-buttons`.
- [ ] iOS Safari visual verification of alignment and modal.

### Layered intro photo collage — 2026-11-15
- [x] Insert 4-image overlapping photo composition between intro copy and KPI band using existing Gipfel Lodge photos.
- [x] Responsive collage placement desktop/mobile, soft ivory frame, subtle shadow and reduced-motion support.
- [ ] Visually QA layering/cropping on iPhone and desktop.

### Draggable layered collage — 2026-11-15
- [x] Make the four introductory printed-photo collage images pointer/touch draggable and bring selected image to the front.
- [x] Constrain moved image elements to collage stage, prevent native image drag, keep vertical scroll outside images and add keyboard arrow nudging.
- [x] Preserve existing responsive collage look; use percentage placement after moving and clamp on viewport resize.
- [ ] QA pointer/touch interactions on iOS Safari, and rotated image corners at stage edges.

### Printed photo pickup animation — 2026-11-15
- [x] On pointer/touch pick-up, collage photos lift by 5.5% and briefly wobble, then remain enlarged during dragging and return smoothly on release.
- [x] Preserve each photo's starting tilt, including mobile overrides; respect reduced-motion setting.
- [ ] Verify touch animation and image boundaries on iOS Safari.

### Collage device-specific instructions — 2026-11-15
- [x] Show desktop-specific mouse/keyboard hint on pointer-fine large screens and touch-oriented instruction on touch devices and narrow screens.
- [x] Leave drag and pickup behavior unchanged.

### Mountain silhouette footer edge — 2026-11-15
- [x] Add a decorative scalable alpine mountain silhouette immediately above the footer, coloured with the shared footer background token.
- [x] Responsive desktop/mobile heights with a full-width inline SVG (no loading or network dependency).
- [ ] Visually QA skyline contour and preceding section background on desktop/mobile.

### Use original footer mountain asset — 2026-11-15
- [x] Locate `assets/icons/devider-mountain.svg` in the original `wanderwerkhoven-afk/Gipfel-Lodge` repository and copy unchanged into the new website.
- [x] Replace provisional custom SVG path with original image and responsive full-width intrinsic aspect ratio.
- [ ] QA original SVG rendering, background contrast and transition into footer on mobile/desktop.

### Original footer silhouette colour/width correction — 2026-11-15
- [x] Replace black rendering of the original `devider-mountain.svg` with its alpha-mask shape filled by `--footer-background`, matching the actual footer exactly.
- [x] Extend mountain edge to full viewport width and match the preceding section's ivory background on desktop and mobile.
- [ ] Verify visual result on mobile Safari, including mask transparency and full-bleed alignment.

### Mountain divider edge overscan — 2026-11-15
- [x] Remove tiny light seams along both sides of original mountain divider with 8px horizontal alpha-mask overscan.
- [ ] Verify on mobile Safari that silhouette now connects edge-to-edge with footer.

### Mountain silhouette scale refinement — 2026-11-16
- [x] Replace fixed 8px horizontal mask overscan with a subtle 104% centered zoom of the original footer mountain SVG mask.
- [ ] Confirm visual full-bleed coverage in mobile Safari.

### Mountain footer seam correction — 2026-11-16
- [x] Seal translucent bottom pixels of zoomed original SVG mask with a 4px footer-coloured strip and a 1px footer overlap, avoiding Safari hairline seams.
- [ ] Confirm the pale horizontal line is gone on iOS Safari.

### SVG-only decorative review icons — 2026-11-16
- [x] Replace the Villa for You external-link arrow character with a consistent inline SVG external-link icon in both links.
- [x] Replace star characters with an SVG star pattern and metadata flag emojis with readable country labels.
- [ ] Audit remaining decorative symbols before future page additions. Do not alter guest-authored review wording when it contains original emoji.

### Asset migration from Gipfel-Lodge — 2026-11-16
- [x] Inventory all image and vector assets in `wanderwerkhoven-afk/Gipfel-Lodge`: 591 image/SVG files, 321,489,709 bytes.
- [x] Copy all 590 missing image/SVG files without overwriting the one existing mountain SVG. Preserve their directory paths, including assets, beheer, site_manifest and siteground_upload.
- [x] Verify 591 images in destination tree and same aggregate bytes; import GitHub Actions run succeeded.
- [x] Repoint all 12 current hosted Gipfel Lodge photo/logo references in `index.html` to the matching local `assets/` paths.
- [x] Retain the image-import GitHub Action only as a manual workflow_dispatch for future explicit synchronization.
- [ ] Visually verify image loads and site deployment in Safari and desktop browsers.
