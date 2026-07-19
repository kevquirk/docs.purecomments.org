---
title: Theming Pure Comments
slug: theming-pure-comments
date: 2026-02-25
status: published
tags: [docs]
description: Instructions on how to customise the look of Pure Comments on your site.
---

The Pure Comments package comes with a stylesheet that can be used as a starting point for you to customise its look so it matches the design of your blog.

First, copy the [example stylesheet](https://github.com/kevquirk/purecomments/blob/main/public/comments.css) either into your existing blog's CSS, or into a separate `comments.css` file that's only loaded on pages where your comments live:

```html
<link rel="stylesheet" href="/assets/css/comments.css">
```

From here you can edit `comments.css` to fit the style of your blog's design. If you choose not to update `comments.css`, this is what Pure Comments will look like using the default `comments.css` file:

![comments example light](/assets/images/theming-pure-comments/comments-example-light.webp)
*Light mode*

![comments example dark](/assets/images/theming-pure-comments/comments-example-dark.webp)
*Dark mode*
