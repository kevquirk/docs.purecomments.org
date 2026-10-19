---
title: Working with Data Attributes
slug: working-with-data-attributes
date: 2026-02-25
status: published
tags: [docs]
description: Setting up data attributes for defining slugs, API calls, and auto-loading.
---

When embedding Pure Comments, you can keep setup minimal and let `embed.js` infer values automatically, or you can override behaviour with data attributes.

## Quick Start (No Overrides)

If you do this:

```html
<div id="comments"></div>
<script src="https://comments.example.com/public/embed.js" defer></script>
```

Then `embed.js` will:
- infer the post slug from the current page URL
- infer the API base URL from the script `src`
- render a "Load comments" button so comments only load when clicked by the reader

For many sites, that default behaviour is all you need.

## data-post-slug (Optional)

You can use `data-post-slug` on the `#comments` container when you want to explicitly control the post/thread identifier.

```html
<div id="comments" data-post-slug="my-first-post"></div>
<script src="https://comments.example.com/public/embed.js" defer></script>
```

### When to use it

- Your article URL might change over time (slug updates, permalink changes, route migrations).
- You want multiple URLs to point to the same comment thread.
- You use query-string or hash-based routing and want stable thread IDs.

### Why it matters

Different slugs create different threads. If your blog's URL structure changes later, explicit slugs help prevent comment history from splitting across multiple threads.

## data-base-url (Optional)

You can also use `data-base-url` on the script tag when API calls should go to a different origin than the script file.

```html
<script src="https://comments.cdn.example.com/public/embed.js" data-base-url="https://comments.example.com" defer></script>
```

### When to use it

- You host `embed.js` on a CDN, but your API lives on your comments domain.
- Static assets and API are intentionally split across domains.
- You want to force a specific API origin for testing or staged environments.

## data-autoload (Optional)

By default, Pure Comments displays a "Load comments" button so that comments and the submission form only load when requested by the reader.

If you prefer comments to load automatically without requiring reader interaction, add `data-autoload="true"` to the `#comments` container (or to the `<script>` tag):

```html
<div id="comments" data-autoload="true"></div>
<script src="https://comments.example.com/public/embed.js" defer></script>
```

### When to use it

- You prefer an open comment stream where comments and the submission form are immediately accessible.
- You want a seamless reading flow without requiring an extra click.

### Performance considerations

When `data-autoload="true"` is set, `embed.js` uses `IntersectionObserver` to load comments automatically as the reader scrolls within 300px of the comments container. This ensures that initial page load and Core Web Vitals remain completely unaffected, and saves bandwidth for visitors who do not scroll to the bottom. Furthermore, all comment author avatars and reaction facepiles are natively lazy-loaded by the browser.

## Combining Overrides

You can combine these overrides as needed:

```html
<div id="comments" data-post-slug="my-first-post" data-autoload="true"></div>
<script src="https://comments.cdn.example.com/public/embed.js" data-base-url="https://comments.example.com" defer></script>
```

This gives you:
- stable thread mapping (`data-post-slug`)
- automatic, non-blocking comment loading (`data-autoload`)
- explicit API target (`data-base-url`)

## Practical Recommendation

Start with defaults first then add these attributes only when you need predictability across URL changes, multi-domain deployments, custom routing, or automatic comment loading.
