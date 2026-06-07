---
title: Working With Translations
slug: working-with-translations
date: 2026-04-14
status: published
tags: [docs]
description: How to translate the Pure Comments admin UI and embed strings into other languages.
---

Pure Comments translation system is designed so that community contributors can add new languages without any changes to the core codebase.

## How it works

All user-facing strings are stored in language files under `lang/`. On each request, Pure Comments loads the file matching the configured language and looks up strings by dot-notation key — for example `dashboard.title` or `comments.author_badge`. If a key is missing from the active language file, it falls back to the English value automatically.

The embed widget strings (the comment form, load button, and so on) are included in the API response so they are translated in the visitor-facing UI as well as the admin.

## Adding a language

Create a new file in `lang/` named with the [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) for your language, e.g. `lang/fr.php` for French or `lang/pt-BR.php` for Brazilian Portuguese.

The file must return an array with the same structure as `lang/en.php`. The simplest starting point is to copy `en.php` and translate each value:

```php
<?php
declare(strict_types=1);

return [
    'login' => [
        'title'   => 'Connexion aux commentaires',
        'heading' => 'Administration des commentaires',
        // ...
    ],
    // ...
];
```

You do not need to include every key. Any key you omit will fall back to the English string.

Once the file is saved, **the language selector will appear automatically** in Settings — it is hidden when only `en.php` exists.

## Selecting a language

Go to **Settings** and choose your language from the **Admin language** dropdown. Save. The admin UI and all API responses will switch to the selected language immediately.

## String sections

`lang/en.php` is divided into these sections:

| Section | Used in |
|---|---|
| `login` | Login page |
| `dashboard` | Admin dashboard |
| `comments` | Comment tables and pagination (admin) |
| `settings` | Settings page |
| `setup` | First-run setup page |
| `updates` | Updates page |
| `api` | API error and success responses |
| `embed` | Visitor-facing comment widget |
| `notifications` | Email notification subject and body |

## Per-site embed string overrides

If you want to customise the wording of the comment widget on your site, without changing the language file, you can override individual strings using `window.PureComments.strings` before the embed script loads:

```html
<script>
window.PureComments = {
    strings: {
        title:        'Discussion',
        load_btn:     'Show comments',
        author_badge: 'Author',
        form_heading: 'Join the discussion',
        submit_btn:   'Post comment',
    }
};
</script>
<script src="https://comments.example.com/public/embed.js" ...></script>
```

Any keys you omit use the server-translated strings from your language file. The full list of overridable keys matches the `embed` section of the language file.

## Contributing a translation

If you have translated Pure Comments into another language, contributions are welcome. Open a pull request on the [Pure Comments repository](https://codeberg.org/kevquirk/purecomments) adding your `lang/{code}.php` file.
