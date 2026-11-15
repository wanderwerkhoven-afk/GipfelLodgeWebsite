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
