# DKG case study — screenshot slots

The case page (`/case/dkg-logistics.html`) currently renders four
dashed-border placeholders. When you have screenshots ready, drop them in
this folder with the names below, then replace each `<a class="placeholder">`
block with a real `<figure>` containing an `<img>`.

## What goes here

| Filename             | Aspect | What it should show                                                      |
|----------------------|--------|--------------------------------------------------------------------------|
| `streamlit-3d.jpg`   | 16:10  | Streamlit app — 3D truck visualisation with sequence-coloured cabinets. Ideally with sidebar metrics or HUD overlay visible. |
| `checklist.jpg`      | 16:10 or 4:3 | A4 landscape PDF checklist — one page, six items, 3D view at side, colour swatches, FRAGILE/HEAVY tags visible. |
| `sticker.jpg`        | 16:10 or 4:3 | One cabinet sticker — Article ID, SEQ 13 badge, HEAVY warning (orange), THIS SIDE UP arrows. Could be a single sticker or a page of stickers. |
| `kill-switch.jpg`    | 16:10  | The Streamlit liability waiver / Terms & Liability screen. Mandatory acknowledgement before plan export, overload warning at >28,000 kg, fragile-count check. |

## Swap pattern

For each slot, find the `<figure class="case-figure">` block in
`case/dkg-logistics.html` and replace this:

```html
<figure class="case-figure">
  <a class="placeholder" href="#" onclick="return false;" aria-label="...">
    <span class="ph-label">Placeholder · screenshot</span>
    <span class="ph-desc">...</span>
    <span class="ph-dims">→ ./assets/dkg/streamlit-3d.jpg · 16:10</span>
  </a>
  <figcaption>Fig. 01 — ...</figcaption>
</figure>
```

with this:

```html
<figure class="case-figure">
  <img
    src="../assets/dkg/streamlit-3d.jpg"
    alt="Streamlit 3D visualisation of a loaded truck"
    loading="lazy">
  <figcaption>Fig. 01 — Streamlit prototype, 3D loading visualisation. Sequence colour-coded; fragile items rendered in red wireframe.</figcaption>
</figure>
```

The existing `.case-figure img` styles will apply automatically.

## Format & sizing tips

- **JPG** for screenshots with photographic colour ranges; **PNG** if you need
  transparency or sharp UI text.
- Maximum width 1600px is plenty — anything larger just inflates page weight.
- Compress to ~70–80% quality. Tools: `tinypng.com`, `squoosh.app`, or
  ImageOptim.
- Don't worry about exact aspect ratios; the figure container has fluid sizing
  and the lightbox-style preview shows the original.
