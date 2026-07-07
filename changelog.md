---
title: Changelog
description: Changelog for the Pure Comments project.
date: 2024-01-01
layout: doc.njk
tags: docs
permalink: /changelog/
---

## v1.6.5 - 07 July 2026

### Changed
- Updated the license to version 1.1 to restrict only commercial hosting for a fee, while explicitly permitting free hosting for friends and family.

### Added
- Updated Romanian translations, completing previously missing localisation strings (thanks [@ThinkRoot](https://codeberg.org/ThinkRoot) for [#5](https://codeberg.org/kevquirk/purecomments/pulls/5)).

## v1.6.4 - 04 July 2026

### Fixed
- Fixed translation issues in the embed widget where the comments title, load button, and loading indicator were stuck in English. Timestamps are also now dynamically localized using client-side `Intl` formatting (thanks [@Ted11](https://codeberg.org/Ted11) for [#4](https://codeberg.org/kevquirk/purecomments/issues/4)).

## v1.6.3 - 29 June 2026

### Fixed
- Fixed an issue where the pending comments list in the admin panel incorrectly excluded comments from guests who submitted a comment with a name matching the admin author's name (thanks [@daj](https://codeberg.org/daj) for [#3](https://codeberg.org/kevquirk/purecomments/issues/3)).

## v1.6.2 - 26 June 2026

### Security
- Secured the "Remember me" cookie mechanism by replacing the static HMAC token with random, database-backed tokens stored in a new `remember_tokens` table. Tokens are now invalidated on the server when logging out.

### Fixed
- Fixed an `Undefined array key "smtp_debug"` PHP notice when saving configurations with Amazon SES or no email provider selected.

## v1.6.1 - 13 June 2026

### Updated
- German translations for search (thanks [@bttr](https://codeberg.org/bttr) for [#2](https://codeberg.org/kevquirk/purecomments/pulls/2))

## v1.6.0 - 27 May 2026

### Added
- Pure Comments logo now appears on all admin pages (dashboard, settings, updates, login).
- Search box on the dashboard to search comments by name or content (search terms are preserved when paginating through results).

### Changed
- Admin page headers and links are now themed red to match the Pure Comments brand colour.
- Replaced emoji favicon with the Pure Comments logo.


## v1.5.2 - 09 May 2026

Pure Comments has moved from GitHub to Codeberg. The update checker now fetches release information from Codeberg, and all relevant links have been updated accordingly.

<p class="notice warning"><strong>Upgrade notice</strong> - This release restructures the in-app updater so a <strong>manual update is required</strong>.</p>

### Manual upgrade steps

1. **Back up your site** — download a copy of your entire Pure Comments directory before proceeding.
2. **Download the v1.5.2 release zip** from the [Codeberg releases page](https://codeberg.org/kevquirk/purecomments/releases/tag/v1.5.2) and extract it.
3. **Delete everything EXCEPT** for the `db/` directory and the `config.php` file.
4. **Copy the new files to your existing installation**, replacing everything except your `db/` directory and `config.php` file.


## v1.5.1 - 04 May 2026
- Updated license to v1.1: commercial self-use is now explicitly permitted.
- Added Italian translation (thanks [Elena Brescacin](https://l.devol.it/@elettrona))


## 1.5.0 - 25 April 2026

### New features
- **"Remember me"** checkbox on the login page; sets a 90-day persistent cookie so the browser session survives a restart.
- **Filter by post** - each comment row in the dashboard now has a "Filter by this post" link that scopes both pending and published lists to that post.
- **Filter by commenter** - each comment row has a "Filter by this commenter" link; filters by email if the commenter provided one, otherwise by name.

**Note:** Translations for new strings were done by an AI, so will likely need a human review.

### Improvements
- Enhanced German translation (thanks [werschreibt](https://github.com/werschreibt)).


## 1.4.1 - 21 April 2026
- Fixed incorrect email encoding for UTF-8 characters (e.g. umlauts) in SMTP notifications ([fixes #2](https://github.com/kevquirk/purecomments/issues/2))
- Added SMTP debug logging toggle to settings — displays the full SMTP conversation log in the admin UI when sending a test email ([fixes #4](https://github.com/kevquirk/purecomments/issues/4))
- Fixed updater not replacing the `lang/` directory when upgrading — lang files will now be updated correctly from this version onwards

<p class="notice warning"><strong>⚠️ One-off manual step for anyone upgrading to v1.4.1:</strong> the updater could not replace your lang files during this upgrade, so you will need to manually copy the <code>lang/</code> directory from the release zip to your installation.</p>


## 1.4.0 - 14 April 2026
Added translation support. Currently has English (`en.php`) and German (`de.php`). German translations were created by AI, so please submit a PR if updates are required. [Read the docs](/working-with-translations).

<p class="notice warning"><strong>⚠️⚠️⚠️⚠️ IMPORTANT NOTE AFTER UPDATING:</strong> Your site will produce a 500 error after updating. <strong>This is expected behaviour</strong>. It's because the current updater doesn't expect the <code>/lang</code> directory, so it won't copy the language files over during the update.</p>

To fix this you have to manually copy the `/lang` directory to the root of your comments install. This is a one off action. Future updates will be fine.


## 1.3.2 — 21 March 2026

### Fixed
- The privacy policy URL field in settings is now optional. If left blank, the privacy link is hidden from the comment form entirely.


## 1.3.1 — 6 March 2026

### Added
- Rate limiting for comment submissions.

### Fixed
- Prevented unauthorised database downloads; emails are now encrypted at rest.


## 1.3.0 — 6 March 2026

### Added
- SMTP support for comment notification emails, with a test mail option in settings.


## 1.2.0 — 28 February 2026

### Added
- Support for running PureComments in a subfolder.

### Fixed
- Bug where post slugs could not be correctly derived.
- Various CSS fixes.

## 1.1.1 — 27 February 2026

### Fixed
- Bug with ability to derive slugs.


## 1.1.0 — 26 February 2026

### Added
- In-app updater support.


## 1.0.0 — 25 February 2026

### Added
- Initial release.
- Localisation support.

### Fixed
- Bug with admin reply notifications not sending correctly.
