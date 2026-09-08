---
title: Webmentions & Fediverse
slug: webmentions-and-fediverse
date: 2026-09-07
status: published
tags: [docs]
description: Guide to enabling IndieWeb Webmentions and Fediverse backfeed in Pure Comments using Bridgy.
---

Pure Comments natively supports **IndieWeb Webmentions** and **Fediverse Backfeed** (via [Bridgy](https://brid.gy)). 

When you share your blog posts to the Fediverse (such as Mastodon), any **likes**, **boosts**, and **replies** received on that post can be automatically collected and displayed directly on your blog in Pure Comments.

<p class="notice">Webmentions allow interactions from other blogs and social networks to live directly on your own site, keeping you in complete ownership of your community engagement.</p>

## How It Works

1. **Discovery:** Your blog includes a `<link rel="webmention">` tag pointing to your Pure Comments endpoint and a `<link rel="me">` tag pointing to your personal Mastodon/Fediverse profile.
2. **Publishing / Bridgy Connection:** You connect your Mastodon account to [Bridgy](https://brid.gy).
3. **Backfeeding:** When you post a toot with a link to your blog post, Bridgy monitors the post for interactions (likes, boosts, replies) and sends them to your Pure Comments webmention receiver.
4. **Display:** Likes and boosts appear in a compact reaction facepile with user avatars, whilst replies appear in your comment thread.

## Step 1: Configure Webmentions in Pure Comments

1. Log into your Pure Comments administration panel.
2. Navigate to **Settings** and scroll down to the **Webmentions & Fediverse** section.
3. Check the box to **Enable Webmentions & Fediverse backfeed**.
4. In **Personal Fediverse profile URL**, enter your full profile link (e.g. `https://mastodon.social/@username`).
5. Choose your moderation preferences:
   - **Auto-approve reactions:** Automatically publish likes and boosts without manual moderation (recommended).
   - **Auto-approve replies:** Automatically publish incoming text replies and mentions, or leave unchecked to hold them in your moderation queue.
6. Click **Save settings**.

## Step 2: Add Discovery Tags to Your Blog

Pure Comments will generate the exact HTML snippet needed for discovery. Add these tags into the `<head>` of your blog or website template. They will look something like this:

```html
<!-- Webmention & Fediverse Discovery -->
<link rel="webmention" href="https://comments.example.com/api/webmention">
<link rel="me" href="https://mastodon.social/@username">
```

- Replace `https://comments.example.com` with your Pure Comments installation URL.
- Replace `https://mastodon.social/@username` with your Fediverse profile URL.

<p class="notice tip">If you are using <a href="https://pureblog.org">Pure Blog</a>, you can paste these tags directly into the <strong>Header Injection</strong> setting in your site configuration. You need to do this for both <b>Pages and Posts</b>.</p>

## Step 3: Connect Your Fediverse Account to Bridgy

To allow Bridgy to discover interactions and backfeed them to your site:

1. Visit [brid.gy](https://brid.gy).
2. Under the **Fediverse / Mastodon** section, choose **Cross-post to a Mastodon account: @you@mastodon.server**.
3. Enter your instance (e.g. `mastodon.social` or `fosstodon.org`) and log in to authorise Bridgy.
4. Enter the URL of your website (**not** the URL of your Pure Comments site)
5. Once connected, your account page on Bridgy will show:
   - **`@username@instance · yoursite.com`**
   - **`Backfeeding responses.`**
6. *(Optional)* If you would like your author replies written in Pure Comments to post back to Mastodon as replies in the Fediverse, click the purple **Enable publishing: mastodon** button to grant publishing permissions.

Bridgy is now active and will periodically poll your account for interactions on links to your blog.

## Step 4: Testing & Daily Use

Whenever you write a new blog post:

1. Share the link to your post on Mastodon/Fediverse from your connected account.
2. When followers favourite, boost, or reply to your post, Bridgy will detect them and forward the webmentions to your site.
3. Reactions (likes & boosts) will immediately appear at the top of your comments section as facepile avatars, and replies will be added into the comment stream.

<p class="notice">Bridgy polls on an automated schedule in the background. If you want to check an interaction immediately during testing, you can click <strong>Poll now</strong> or use the <strong>Resend for post</strong> tool on your Bridgy dashboard.</p>

<p class="notice tip"><strong>Note on replying to Fediverse comments:</strong> When you submit an author reply to a Fediverse comment in the Pure Comments administration panel, Pure Comments communicates with Bridgy and the Mastodon API to publish your reply to the live Fediverse thread in real time. This round-trip can take a few seconds (typically 3–5 seconds) before the administration page reloads.</p>

### Hosting Pure Comments on a Subdomain (Publishing Author Replies)

If you host Pure Comments on a subdomain (e.g. `https://comments.example.com`) whilst your blog lives on your primary domain (e.g. `https://example.com`), Bridgy requires published webmentions to match the primary domain registered with your Fediverse profile.

Add the following rule to the `.htaccess` file on your **primary blog domain**:

```apache
# Pure Comments - Webmention reply resolution
RewriteRule ^comment\.php$ https://comments.example.com/comment.php [P,L]
```
*(Replace `https://comments.example.com` with your actual comments backend URL).*

When you publish a reply from the Pure Comments dashboard, Bridgy will resolve the reply through your primary verified domain and publish your post directly to the Fediverse.
