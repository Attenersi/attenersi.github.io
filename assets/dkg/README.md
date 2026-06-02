# DKG case study — screenshots

Used by `case/dkg-logistics.html` and `pl/case/dkg-logistics.html`.

## Files

| Filename             | What it shows |
|----------------------|---------------|
| `streamlit-3d.png`   | Streamlit app — 3D truck visualisation with sequence-coloured cabinets, sidebar metrics or HUD. |
| `checklist.png`      | A4 landscape PDF checklist — six items per page, 3D view at side, FRAGILE/HEAVY tags. |
| `sticker.png`        | Cabinet sticker — Article ID, SEQ badge, HEAVY warning, THIS SIDE UP arrows. |
| `kill-switch.png`    | Streamlit liability waiver before plan export; overload / fragile checks. |

## HTML pattern

Use a modifier class that matches the screenshot shape (see `css/style.css`):

| File | Class | Why |
|------|-------|-----|
| `streamlit-3d.png` | `case-figure--wide` | Panoramic (~2.6:1); height capped so UI stays readable |
| `checklist.png` | `case-figure--portrait-lg` | Tall document; centred, max ~42rem |
| `sticker.png` | `case-figure--portrait` | Narrower sheet; max ~26rem |
| `kill-switch.png` | `case-figure--ui` | Landscape panel; height capped |

Fig. 02 + 03 sit in `case-figure-grid case-figure-grid--paper` (stacked, not side-by-side).

```html
<figure class="case-figure case-figure--wide" data-gallery="dkg-case">
  <div class="case-figure-media">
    <img src="../assets/dkg/streamlit-3d.png" width="3385" height="1314" alt="…" loading="lazy" decoding="async">
  </div>
  <figcaption>Fig. 01 — … Click to enlarge.</figcaption>
</figure>
```

From `pl/case/`, use `../../assets/dkg/…`. `data-gallery="dkg-case"` groups all four in the lightbox.

## Export tips

Current sizes (approx.):

| File | Pixels | File size |
|------|--------|-----------|
| streamlit-3d.png | 3385×1314 | ~547 KB |
| checklist.png | 1125×1333 | ~341 KB |
| sticker.png | 858×1339 | ~105 KB |
| kill-switch.png | 1342×1087 | ~152 KB |

- **streamlit-3d:** crop empty black bars top/bottom before export; target ~1600×900 and &lt;200 KB if possible.
- **checklist / sticker:** PNG is fine; max width 1200–1400px is enough for the web.
- Compress with [squoosh.app](https://squoosh.app) or tinypng.com.
