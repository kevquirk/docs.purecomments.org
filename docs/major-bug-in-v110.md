---
title: Major Bug in v1.1.0
slug: major-bug-in-v110
date: 2026-02-27
status: published
tags: [bug]
description: I've patched a major bug where Pure Comments would fail for most people. Sorry!
---

[David](https://forkingmad.blog/) made me aware of a fairly major bug where any Pure Comments instance without `data-post-slug` set, would fail. This is because I hadn’t moved the slug-detection function over from the hosted version I’ve been working on...because I'm an idiot that gets easily confused, and I'm not use to managing multiple complicated code bases.

Anyway, I've patched the issue and released v1.1.1 of Pure Comments, which fixes the problem and now slugs are inferred from the post URL when `data-post-slug` is not set, as documented in the README.

Thanks, David!
