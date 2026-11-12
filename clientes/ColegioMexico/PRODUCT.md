# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Static HTML + CSS + JS, with all editable content in `content.json` (no database). Chosen by the user so a later phase can add a PHP admin that edits the JSON, or migrate to WordPress (custom fields) or Next.js (separate admin). Hosting target: Hostinger (same as AionSite). Lives in `public/clientes/ColegioMexico/` inside the AionSite repo.

## Users
Mothers and fathers in Ciudad del Carmen, Campeche, looking for a school for their child (Preescolar or Primaria). They mostly arrive on a phone, often from Facebook or a search, often on mobile data. Their job: decide whether this school is trustworthy and good enough to visit.

## Product Purpose
Colegio México has no website, only a Facebook page. This home is AionSite's proposal to win the school as a client, built at final-site quality so it can ship as-is. Success: parents feel trust, see real student achievements, and tap "Agendar visita" (WhatsApp).

## Positioning
A neighborhood private school (col. Tila) whose students win real competitions: 1st place state stage of the Olimpiada del Conocimiento Infantil 2026, 1st place Oratoria (sector), XXIV Legislatura Infantil 2026. Also an inclusive culture (feria "Diversidad entre páginas": Maya language, sign language, braille). Direct local competitor: Colegio Morelos Lizardi; the site must not resemble it.

## Operating Context
- Visit scheduling happens on WhatsApp, 938 382 0874, with a prefilled message.
- Office hours: Lunes a viernes de 7:30 AM a 2:00 PM.
- Address: Calle 46 no. 46, col. Tila, Ciudad del Carmen, México, 24170.
- Email: colegiomexico.carmen@gmail.com · Facebook: facebook.com/colegiomexico.carmen
- Levels: Preescolar y Primaria.

## Capabilities and Constraints
- Phase 1: home page only. Admin panel comes later.
- Every page needs `<title>` ≤ 60 chars and meta description ≤ 160 chars (repo rule).
- Spanish only (es-MX).
- Undecided / pending from the school: exact uniform colors, vector logo, C.C.T. per level (placeholder), school programs (placeholder), years of history / student counts (do not invent), privacy notice.

## Brand Commitments
- Logo: green and red swooshes forming an "M" with a stick figure, "Colegio México" in grey (`assets/marca/logo-colegio-mexico.jpg`).
- Colors from logo and uniform (beige shirt, olive/brown plaid skirt, maroon trim).
- Straight, legible typefaces (user requirement).
- Reference the user liked for clarity and structure: colegiomoreloslizardi.edu.mx (structure only, not identity).
- Voice: warm, close, proud with proof. See `docs/brand-guidelines.md`.

## Evidence on Hand
- `assets/fotos/olimpiada-alondra.jpg`: Alondra Vera Matías with medal and recognition (real photo, no overlay text).
- `assets/fotos/fb-07.jpg`: Alondra with her teacher.
- `assets/fotos/fb-06.jpg`: Alondra and teacher at the inclusive fair booth.
- `assets/fotos/fb-05.jpg`: large group photo under the covered court.
- `assets/fotos/fb-01..04.jpg`: congratulation flyers (Andrés Mateo Moreno Tatum: Oratoria 1st place, Legislatura Infantil; Alondra: Olimpiada state stage). They contain overlay text.
- No testimonials, no preschool photos, no facility photos beyond the court. Do not fabricate any.
- Minors appear with full names; school must confirm consent before publishing.

## Product Principles
1. Proof over promises: show real achievements, never generic claims.
2. One action: every section leads to "Agendar visita" on WhatsApp.
3. Phone first, slow-connection friendly.
4. Placeholders are visibly marked, never disguised as fact.
5. Content separated from design (JSON) so the school can edit it later.

## Accessibility & Inclusion
User goal: "WCAG 100%". Target WCAG 2.2 AA everywhere, AAA where practical for body text. The school's own inclusion values (sign language, braille) make this a brand matter, not just compliance.
