# Mosór — Portfolio · Issue 01

Personal portfolio site for Mateusz Mosór. Magazine-style editorial design,
no build step, no framework, no dependencies. Just HTML, CSS, and a small
amount of vanilla JS.

Available in **English** (default URLs) and **Polish** (`/pl/`).

## Structure

```
.
├── index.html              ← Main page EN (Profile, Work, Stack, Career, Contact)
├── case/
│   ├── dkg-logistics.html  ← Long-form case study, Feature · 01 (EN)
│   └── atrio.html          ← Long-form case study, Feature · 02 (EN)
├── pl/
│   ├── index.html          ← Main page PL
│   └── case/
│       ├── dkg-logistics.html
│       └── atrio.html
├── css/
│   └── style.css           ← All styles, organised by section
├── js/
│   └── main.js             ← Interactions + theme + language preference
├── assets/
│   ├── favicon.svg
│   ├── og-image.svg / og-image.png
│   ├── resume.pdf
│   └── …                   ← Project screenshots (see repo)
└── README.md
```

## Language switcher

- Masthead **EN · PL** on every page; active language highlighted.
- First visit: if the browser language starts with `pl` (`navigator.languages`), the user is redirected to the matching `/pl/…` URL. Otherwise English stays default.
- Manual choice is stored in `localStorage` under `mosor-lang` (`en` | `pl`) and overrides browser detection on later visits.
- Each `<html>` element sets `data-lang-en` and `data-lang-pl` to the relative path of its language pair; `main.js` uses these for redirects.

## Adding a new case study

1. Copy `case/dkg-logistics.html` as a template (EN).
2. Update `<title>`, `<meta>`, `hreflang` links, `data-lang-en` / `data-lang-pl`, headline, dek, and body.
3. Add the language switcher block in the masthead (copy from an existing case page).
4. Mirror the file under `pl/case/` with Polish copy and paths adjusted (`../../css`, `../../assets`, `../../js`).
5. Link from `index.html` and `pl/index.html` in the relevant `.case` block.

## Editing the visual system

All tokens (colours, fonts, spacing) live as CSS custom properties at the top
of `style.css` under section 1 (`:root`) and section 1's dark-mode variant.
Change them once and the entire site follows.

## Known TODOs

- Set absolute `og:url` once the deployed URL is known (EN + PL pages).

## Local preview

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

Then visit:

- `http://localhost:8000/` — English home
- `http://localhost:8000/pl/` — Polish home

## Browser support

Targets modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses
`IntersectionObserver`, CSS custom properties, `aspect-ratio`, and modern
font-loading patterns. Reduced-motion preferences are respected throughout.

— Composed in Breda, MMXXVI.
