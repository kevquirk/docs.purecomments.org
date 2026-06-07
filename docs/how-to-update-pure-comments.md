---
title: How to Update Pure Comments
slug: how-to-update-pure-comments
date: 2026-02-26
status: published
tags: [docs]
description: A look at how to update Pure Comments from inside the admin screen.
---

As of [v1.1.0](https://codeberg.org/kevquirk/purecomments/releases/tag/1.1.0) Pure Comments allows you to update direct from the dashboard. To do this, visit `Settings` > `Updates` and you will be greeted by a page similar to this:

![update 01](/content/images/how-to-update-pure-comments/update-01.webp)

Once there you can check if there's an update by hitting the `CHECK LATEST RELEASE` button. Pure Comments will then check the latest release on GitHub to see if you're up to date or not. If you're not, it will tell you:

![update 02](/content/images/how-to-update-pure-comments/update-02.webp)

If an update is available, hit the `INSPECT RELEASE PACKAGE` button. Pure Comments will provide a list of what will change during this update for you to review and ensure it won't break anything you've changed on your site.

![update 03](/content/images/how-to-update-pure-comments/update-03.webp)

<p class="notice tip">The Pure Comments update process will not touch your comments database, or config file.</p>

If you're happy with the changes, hit the green `APPLY LATEST UPDATE` button and Pure Comments will:

1. Take a backup of your current version of Pure Comments, *not* including your comments DB.
2. Apply the update.

You should now see that the version number has updated, along with the backup that was taken at the time of the update.

![update 04](/content/images/how-to-update-pure-comments/update-04.webp)

If you find anything is broken with your site after the update, you can hit the `RESTORE SELECTED BACKUP` button to restore Pure Blog back to its previous version.

<p class="notice tip">If you have multiple backups in your list, look for the version number in the backup file name.</p>

![update 05](/content/images/how-to-update-pure-comments/update-05.webp)

Once you're happy that the update worked successfully, feel free to delete the backup from Pure Comments to save space on your server.
