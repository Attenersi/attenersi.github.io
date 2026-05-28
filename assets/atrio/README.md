# Atrio case study — screenshot slots

The case page (`/case/atrio.html`) currently renders four
dashed-border placeholders. When you have screenshots ready, drop them in
this folder with the names below, then replace each `<a class="placeholder">`
block with a real `<figure>` containing an `<img>`.

## What goes here

| Filename             | Aspect | What it should show |
|----------------------|--------|---------------------|
| `chat-rag.jpg`       | 16:10  | Chat interface — a user question with the streamed answer visible, and the cited sources panel (`used_sources`) underneath. Ideally a real FM-style question where you can see chunks were retrieved from a specific document. |
| `multi-ticket.jpg`   | 16:10  | Auto-ticket creation in action. Best case: a single chat message containing two unrelated issues, followed by two tickets visible in the dashboard. Could be a split view (chat left, dashboard right) or sequential screenshots if needed. |
| `dashboard.jpg`      | 16:10  | Ticket dashboard — filtered list view with status colours, category/priority columns, CSV export button visible. Show 8–15 tickets to communicate scale. |
| `admin-eval.jpg`     | 16:10  | Admin `/training-quality` (or `/admin/training-quality`) screen — eval run results, `pass_rate` and `api_ok_pass_rate` visible, ideally with analyzer suggestions or prompt override panel. This is the "the loop closes here" image. |

## Swap pattern

For each slot, find the `<figure class="case-figure">` block in
`case/atrio.html` and replace this:

```html
<figure class="case-figure">
  <a class="placeholder" href="#" onclick="return false;" aria-label="...">
    <span class="ph-label">Placeholder · screenshot</span>
    <span class="ph-desc">...</span>
    <span class="ph-dims">→ ./assets/atrio/chat-rag.jpg · 16:10</span>
  </a>
  <figcaption>Fig. 01 — ...</figcaption>
</figure>
```

with this:

```html
<figure class="case-figure">
  <img
    src="../assets/atrio/chat-rag.jpg"
    alt="Atrio chat — grounded answer with cited sources"
    loading="lazy">
  <figcaption>Fig. 01 — Chat interface with grounded answer and cited sources.</figcaption>
</figure>
```

The existing `.case-figure img` styles will apply automatically.

## Format & sizing tips

- **PNG** is usually better for UI screenshots — sharper text. JPG fine for
  anything with photographic colour.
- Maximum width 1600px is plenty.
- Compress before committing. Tools: `tinypng.com`, `squoosh.app`, or
  ImageOptim.
- If you want to redact tenant names or fake email addresses, do it before
  exporting — easier than blurring afterwards.

## Optional fifth slot

The case study currently has 4 figures. If you'd like to add a fifth
(`/admin/llm` profile management view, or an injection-attempt being
blocked, for example), there's no structural reason not to — just add
another `<figure class="case-figure">` block after the others, and add
a row to the table above.
