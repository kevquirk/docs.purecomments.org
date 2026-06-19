---
title: Getting Started
slug: getting-started-with-pure-comments
date: 2026-02-25
status: published
tags: [docs]
description: Instructions on how to get started with Pure Comments.
---

Pure Comments has been designed from the ground up to be simple to self-host and embed on your personal blog. Installation and setup is just a few steps:

1. [Download the latest souce code](https://codeberg.org/kevquirk/purecomments).
2. Upload it to your server.
3. Add the Pure Comments embed code to your blog.
4. Enjoy!

<p class="notice">Pure Comments can be used on <strong>ANY</strong> site where you can add the <a href="#embed">embed script</a>. You don't need to be running <a href="https://blog.purecommons.org">Pure Blog</a> to use Pure Comments.</p>

## Hosting requirements

- PHP 8+
- PHP extensions:
  - `pdo_sqlite`
  - `sodium`
  - `curl` (for SES email sending)
- Apache or nginx
- Write access for PHP user to:
  - project root (during setup, to create `config.php`)
  - `db/` directory (for SQLite and login rate-limit store)

## First run

Once you've uploaded Pure Comments to your server, navigate to its URL, and you will be greeted with the setup wizard.

<p class="notice warning">It's <b>VERY</b> important that you do this <i>immediately</i> after uploading the Pure Comments source code to your server, as the setup page will be publicly available and anyone can fill it in.</p>

This is what the setup screen looks like:

![Setup screen](/assets/images/getting-started-with-pure-comments/setup.webp)

All you need to do is fill in all the relevant fields, hit the save button, and Pure Comments is installed and ready for use!

<p class="notice tip">Once setup is complete, the <code>setup.php</code> is automatically deleted.</p>

Here's a reference guide on what the setup fields mean:

- **Admin username:** Username for admin login.
- **Admin password:** Password for admin login (will need to be entered twice).
- **Post base URL:** this is the URL where people will be reading your blog posts, so Pure Comments knows where to expect comments to be coming from.
- **Comments service URL:** the URL where you will be hosting your Pure Comments service from. Again, so the system can generate the correct embed code.
- **Challenge question:** these are optional fields that allow you to add an extra anti-spam prompt within the comment form. This could be a simple mathematical sum, or something specific to your site, like *what's domain of this blog?"
- **Author name:** this is used as your name when your reply as admin from the dashboard.
- **Author email:** this is the email that's associated with your admin reply comments, so you get notifications when someone replies to your comment (if emails are configured).
- **Moderation email:** this is the email address that new comment notifications will go to.
- **Amazon SES config:** this is the optional config for setting up email notifications with Amazon SES.

All of the above (and more) is configurable after setup from the Pure Comments setting screen.

## Embedding the comments form <a id="embed"></a>

Once you've setup Pure Comments, all you need to do now is add the embed code where you want comments to appear, and you're good to go. The embed code will look something like this:

```
<div id="comments"></div>
<script src="https://comments.example.com/public/embed.js" defer></script>
```

Just replace `comments.example.com` with the URL of your Pure Comments instance.

That's it! Pure Comments is setup and you're now ready to start receiving comments on your blog. 🎉
