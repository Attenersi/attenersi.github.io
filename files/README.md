# Mosór — Portfolio · Issue 01

Personal portfolio site for Mateusz Mosór. Magazine-style editorial design,
no build step, no framework, no dependencies. Just HTML, CSS, and a small
amount of vanilla JS.

## Structure

```
.
├── index.html              ← Main page (Profile, Work, Stack, Career, Contact)
├── case/
│   └── dkg-logistics.html  ← Long-form case study, Feature · 01
├── css/
│   └── style.css           ← All styles, organised by section
├── js/
│   └── main.js             ← All interactions (reveals, lightbox, theme toggle, etc.)
├── assets/
│   ├── favicon.svg         ← Italic 'M' monogram
│   ├── og-image.svg        ← Source for social preview card
│   ├── og-image.png        ← Rendered 1200×630 PNG for OG tags
│   ├── resume.pdf          ← (your file, not in repo)
│   ├── occupancy.jpg       ← (your project screenshots)
│   ├── sdg*.png            ← (Power BI screenshots)
│   ├── optimization*.png   ← (DKG 3D screenshots)
│   └── dkg/                ← DKG case-study screenshots (see ./assets/dkg/README.md)
└── README.md               ← This file
```

## Adding a new case study

1. Copy `case/dkg-logistics.html` as a template.
2. Update `<title>`, `<meta>`, headline, dek, meta strip, and the body sections.
3. The same `style.css` and `main.js` are used — no new CSS needed for standard
   layouts. New components, if needed, go at the bottom of `style.css` under
   section 21.
4. Add a link to it from `index.html` in the relevant `.case` block:
   ```html
   <a href="./case/your-case.html">Read the full case</a>
   ```

## Editing the visual system

All tokens (colours, fonts, spacing) live as CSS custom properties at the top
of `style.css` under section 1 (`:root`) and section 1's dark-mode variant.
Change them once and the entire site follows.

## Known TODOs

- `index.html`, `case/dkg-logistics.html` → set `og:url` once the deployed URL
  is known.
- `index.html` → replace the placeholder LinkedIn `href` with the real profile
  URL (marked with `<!-- TODO -->`).
- `assets/dkg/` → add the four screenshots described in `assets/dkg/README.md`.
  Until then, the case study shows dashed-border placeholders explaining what
  each slot expects.

## Local preview

Any static server works. Quickest options:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .
```

Then visit `http://localhost:8000`.

## Browser support

Targets modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses
`IntersectionObserver`, CSS custom properties, `aspect-ratio`, and modern
font-loading patterns. Reduced-motion preferences are respected throughout.

— Composed in Breda, MMXXVI.
