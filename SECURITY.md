# Security policy

## What the extension is allowed to touch

| Surface | Value | Why |
|---|---|---|
| Permissions | `storage` | remembers your button kit and popup theme |
| Host access | `https://www.premium11.com/*`, `https://premium11.com/*` | anonymous heartbeat + uninstall farewell page |
| Content scripts | `https://x.com/*`, `https://twitter.com/*` | draws the Block / Mute / Not interested buttons on posts |

No `tabs`, no `webRequest`, no `<all_urls>`, no remotely hosted code. Everything the extension runs ships inside the package.

## Network calls

Exactly one endpoint: `POST https://www.premium11.com/api/heartbeat`, on install/update and at most once per 24 h when the popup opens. The payload is anonymous: product id, event (`install` / `update` / `ping`), extension version, a random install id, install channel, UI locale, timezone, and a timestamp. Never X handles, post content, or browsing data. Privacy policy: https://www.premium11.com/en/privacidad

## Guarantees

- **Open source**: the full runtime is in this repository. Build it yourself and diff the output.
- **Minimal permissions**: only what the three buttons need.
- **No analytics SDKs, no remote configuration, no `eval`.**

## Reporting a vulnerability

Use GitHub's private vulnerability reporting: **Security tab → Report a vulnerability**. Include reproduction steps and the extension version. Do not open a public issue for an exploitable problem. No bounty program; you get credit in the fix notes if you want it.

## Out of scope

- X.com / Twitter itself and its page markup — report issues there.
- The heartbeat backend: it only ever receives the anonymous fields listed above.
- Forks re-hosting this code — verify what you cloned against this repository.
