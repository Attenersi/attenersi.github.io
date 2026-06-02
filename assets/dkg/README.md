# DKG case study — screenshots

Used by `case/dkg-logistics.html` and `pl/case/dkg-logistics.html`.

## Files

| Filename             | What it shows |
|----------------------|---------------|
| `streamlit-3d.png`   | Streamlit app — 3D truck visualisation with sequence-coloured cabinets, sidebar metrics or HUD. |
| `checklist.png`      | A4 landscape PDF checklist — six items per page, 3D view at side, FRAGILE/HEAVY tags. |
| `sticker.png`        | Cabinet sticker — Article ID, SEQ badge, HEAVY warning, THIS SIDE UP arrows. |
| `kill-switch.png`    | Streamlit liability waiver before plan export; overload / fragile checks. |

## HTML pattern (same as Atrio)

```html
<figure class="case-figure" data-gallery="dkg-case">
  <img
    src="../assets/dkg/streamlit-3d.png"
    alt="…"
    loading="lazy">
  <figcaption>Fig. 01 — …</figcaption>
</figure>
```

From `pl/case/`, use `../../assets/dkg/…`. The `data-gallery="dkg-case"` value groups all four figures in the lightbox.

## Format tips

- **PNG** for sharp UI text; **JPG** for photo-heavy shots.
- Max width ~1600px; compress (e.g. squoosh.app, tinypng.com).
