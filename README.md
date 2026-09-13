# Tbilisi Growth Studio - Website

Official public website repository.

Published addresses (deployment state must be checked in the hosting dashboards):

- https://tbilisi-growth-studio.netlify.app/
- https://tbilisigs.github.io/Website/

Stack: HTML, CSS, JavaScript

Maintained by Tbilisi Growth Studio

## Editing the site

This is a static HTML/CSS/JavaScript site, with no build step. English pages have a matching `-ka.html` Georgian page. Keep both languages in sync.

- `index.html`: homepage and linked concept portfolio.
- `services.html`: package prices, scope and exclusions.
- `portfolio.html`: three fictional design concepts with category filters.
- `concept-*.html`: standalone concept previews, in both languages.
- `contact.html`: project inquiry form.
- `styles.css`: shared presentation and responsive layouts.
- `site-config.js`: WhatsApp number and optional promotion popup (disabled).
- `script.js`: navigation, portfolio filtering and contact handling.

Serve this directory with a local static server to preview. For example, with Python installed: `python -m http.server 8765 --bind 127.0.0.1`, then open `http://127.0.0.1:8765`.

## Pricing decisions — September 2026

Starting prices are 1,800 GEL per website project, 1,400 GEL/month for Social Presence and 2,800 GEL/month for Growth Partnership. These are positioning recommendations, not calculated profit margins: business costs and capacity were not supplied. Scope, taxes, schedule and payment terms are confirmed in a written proposal.

Public reference points reviewed: [Craftwebstudio website pricing](https://craftwebstudio.ge/en/pricing), [IDEA4 website development](https://idea4.ge/en/blog/saitis-damzadeba-sruli-gzamkvlevi/), and [Infinity social media management](https://infinity.ge/en/services/socialuri-mediis-martva/). Website starting prices around 1,500 GEL and agency social management from 2,000 GEL provide context; scopes vary. The smaller social package here excludes production and daily inbox management. Advertising spend and external costs are separate.

## Portfolio

Velvet Beauty House, Northline Dental and Metro Keys Realty are fictional, self-initiated design concepts, not clients. Every preview discloses that it is a concept and routes real project inquiries to this studio. Do not describe these as commissioned work or add invented results, reviews or endorsements.

## Contact and deployment

Netlify routes `/api/contact` to the existing function, which stores requests in Supabase. Follow `CONTACT_SETUP.md` for required environment variables and CRM setup. Successful submission requires an explicit JSON `{ "ok": true }` response. Failed submissions preserve the message and offer WhatsApp/email drafts; requests time out after 12 seconds.

GitHub Pages does not run Netlify Functions. On that host the form prepares a draft and asks the visitor to send it through WhatsApp or email. It does not claim that the inquiry has been delivered. Without JavaScript, direct contact links remain available.

Before sending clients a newly deployed URL, confirm which repository and production branch Netlify uses, then verify an authorized test inquiry appears in the CRM. Local checks cannot verify production credentials or delivery. Pushing to a connected production branch can trigger deployment. Check the hosting dashboard for the published revision and status.

## Verification

Checked local links/assets and anchors across all public HTML files, JavaScript syntax, mobile navigation, package selection, portfolio filtering, and English/Georgian layouts. Contact checks covered confirmed success, HTML 200 responses, missing confirmation, server errors, network failures, timeout, GitHub Pages drafts and Georgian fallback. A live production submission was not sent.

Run contact regression checks with `node tests/contact-form.test.cjs`. They use synthetic local data and never call the live endpoint.
