---
title: Setting Up Email Notifications
slug: setting-up-email-notifications
date: 2026-03-06
status: published
tags: [docs]
description: How to setup email notifications for your Pure Comments instance.
---

Pure Comments can send two types of email notification:

- **Moderation notifications** — sent to you when a new comment is awaiting approval.
- **Reply notifications** — sent to a commenter when someone replies to their comment.

Email is optional. If no provider is configured, comments still work normally — you just won't receive email alerts. Two providers are supported: **Amazon SES** and **SMTP**.

<p class="notice warning">Only 1 email provider should be configured.</p>

## Configuration

Email settings are found in:

- **Setup** (`/setup.php`) — during first-run installation.
- **Settings** (`/settings.php`) — at any time after setup, under the *Email notifications* section.

### Step 1: Choose a provider

Open the **Email provider** dropdown and select either *Amazon SES* or *SMTP*. The relevant fields will appear below.

### Step 2: Set the notification address

Fill in **Moderation notify email** — this is the address that receives new comment alerts. It does not need to match your from/author address.

### Step 3: Fill in provider details

See the provider sections below.

### Step 4: Save and test

Click **Save settings**, then click **Send test email** (shown next to the save button when a provider is configured) to confirm delivery is working.

## Amazon SES

Requires an AWS account with [SES](https://aws.amazon.com/ses/) set up and a verified sending identity (domain or address).

| Setting | Description |
|---|---|
| AWS region | The SES region, e.g. `eu-west-1`, `us-east-1` |
| AWS access key | IAM access key ID with `ses:SendRawEmail` permission |
| AWS secret key | Corresponding IAM secret access key |
| Source email address | The verified from address, e.g. `hello@example.com` |
| Source name | Optional display name for the from address, e.g. `Comment Mailer` |

**PHP requirement:** The `curl` extension must be enabled. SES sending uses a direct API call via cURL — no extra libraries are needed.

### SES config reference

These values are stored in `config.php` under the `aws` key:

```php
'aws' => [
    'region'       => 'eu-west-1',
    'access_key'   => 'AKIAIOSFODNN7EXAMPLE',
    'secret_key'   => 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    'source_email' => 'hello@example.com',
    'source_name'  => 'Comment Mailer',
],
```

## SMTP

Works with any SMTP server or mail relay — Postfix, Gmail, Mailgun, Brevo, Fastmail, Zoho, and others.

| Setting | Description |
|---|---|
| SMTP host | Your mail server hostname, e.g. `smtp.fastmail.com` |
| SMTP port | Port number — typically `587` (STARTTLS), `465` (SSL/TLS), or `25` (none) |
| Encryption | `STARTTLS` (port 587), `SSL/TLS` (port 465), or `None` (port 25) |
| SMTP username | Your SMTP login username (leave blank for unauthenticated relays) |
| SMTP password | Your SMTP login password |

The from address and display name are taken from your **Author email** and **Author name** (set in the Author section of settings).

**PHPMailer** is bundled in `includes/PHPMailer/` — no Composer or additional packages required.

### SMTP config reference

These values are stored in `config.php` under the `smtp` key:

```php
'smtp' => [
    'host' => 'smtp.fastmail.com',
    'port' => 587,
    'user' => 'you@example.com',
    'pwd'  => 'your-password',
    'enc'  => 'tls',
],
```

### Common SMTP providers

| Provider | Host | Port | Encryption |
|---|---|---|---|
| Gmail | `smtp.gmail.com` | 587 | STARTTLS |
| Fastmail | `smtp.fastmail.com` | 587 | STARTTLS |
| Mailgun | `smtp.mailgun.org` | 587 | STARTTLS |
| Brevo (Sendinblue) | `smtp-relay.brevo.com` | 587 | STARTTLS |
| Zoho Mail | `smtp.zoho.eu` | 587 | STARTTLS |
| Local Postfix | `localhost` | 25 | None |

For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) rather than your account password (requires 2FA enabled).

## Switching providers

To switch from SES to SMTP (or vice versa), open Settings, select the new provider from the dropdown, fill in its details, and save. The previous provider's credentials are cleared automatically on save.

To disable email entirely, select *None* from the provider dropdown and save.

## Troubleshooting

**Test email fails to send**
- Check your PHP error log — both SMTP and SES errors are written there.
- For SMTP: verify host, port, and encryption match your provider's requirements.
- For SMTP: ensure your username/password are correct. For Gmail, use an App Password.
- For SES: verify the from address is confirmed in your AWS SES console.
- For SES: confirm your IAM user has `ses:SendRawEmail` permission and the `curl` PHP extension is available.

**Moderation emails not arriving**
- Confirm **Moderation notify email** is set and the address is correct.
- Check your spam folder.
- Use **Send test email** in Settings to isolate whether the issue is with the provider config or with comment submission flow.

**No test button visible**
- The test button only appears when a provider is configured and saved. Select a provider, fill in its details, save first, then test.
