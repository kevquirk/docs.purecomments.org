---
title: Webmentions
slug: webmentions
date: 2026-10-24
status: published
tags: [docs]
description: Guide to enabling native, self-contained IndieWeb Webmentions in Pure Comments.
---

Pure Comments natively supports **IndieWeb Webmentions** as pure, simple notification citations — exactly as they were originally designed.

When another website or blog writes a post that links to one of your articles, they can send a Webmention to your site. Pure Comments receives the notification, verifies that the source post actually links to your post, extracts the post title, author or site name, and a short excerpt, and displays it in a dedicated **Webmentions** section above the comments thread.

No third-party services (such as Bridgy or webmention.io) are required: Pure Comments acts as its own native Webmention endpoint and sender.

<p class="notice">Webmentions allow cross-blog conversations and citations to appear directly on your own site whilst ensuring your visitors' privacy is preserved and leaving you in complete control of your data.</p>

## How It Works

1. **Discovery:** Your blog includes a `<link rel="webmention">` tag pointing to your Pure Comments endpoint.
2. **Receiving:** When an external site links to you and submits a Webmention to your endpoint, Pure Comments fetches the source page, confirms the link, and parses the title and excerpt.
3. **Moderation:** Incoming Webmentions enter your moderation queue where you can review, publish, or delete them (or you can enable auto-approval).
4. **Display:** Published mentions appear in a dedicated "Webmentions" block above the comments thread, complete with the source post title, site name, timestamp, and a clean excerpt.

## Step 1: Configure Webmentions in Pure Comments

1. Log into your Pure Comments administration panel.
2. Navigate to **Settings** and switch to the **Spam & Webmentions** tab.
3. Under the **Webmentions** section, check **Enable Webmentions**.
4. Choose whether to **Auto-approve incoming Webmentions**:
   - When checked, verified Webmentions are published immediately.
   - When unchecked, Webmentions will await your review in the moderation dashboard.
5. Click **Save settings**.

## Step 2: Add the Discovery Tag to Your Site

Pure Comments displays your site's discovery snippet in the settings tab. Add this tag into the `<head>` of your blog template:

```html
<!-- Webmention Discovery -->
<link rel="webmention" href="https://comments.example.com/api/webmention">
```

Replace `https://comments.example.com` with the base URL of your Pure Comments installation.

<p class="notice tip">If you are using <a href="https://pureblog.org">Pure Blog</a>, you can paste this tag directly into the <strong>Header Injection</strong> setting in your site configuration. Remember to do this for both <b>Pages and Posts</b>.</p>

## Step 3: Outgoing Webmentions

When an author replies to a comment or when someone leaves a comment that references an external URL, Pure Comments can discover the remote site's endpoint and dispatch an outgoing Webmention, notifying them that you have linked to their article.
