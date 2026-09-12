<div align="center">

# I Don't Care About Your Tweets

**Block, mute, or dismiss any post on X in one click — without leaving your feed.**

Three buttons on every post. Five button-kit styles. Light and dark themes. 51 languages.

`License: MIT` · `Platform: Chrome & Edge (MV3)` · `Version: 1.2.12` · `Popup + content script + service worker`

</div>

---

## What it is

A Chrome / Edge (Manifest V3) extension for x.com. Every post gets a small action bar with three buttons:

| Button | What it does |
|---|---|
| **Block** | blocks the author through X's own menu — including the confirmation step |
| **Mute** | mutes the author without leaving the timeline |
| **Not interested** | tells X's ranking you want fewer posts like this, and dismisses X's feedback card |

No menus to hunt, no profile detours: the action happens from the post itself.

## How it works

The content script observes the timeline and attaches an action bar to each post. Clicking a button automates X's native menu (caret → menu item → confirmation), so blocks and mutes go through X's own dialogs and stick to your account. Menu entries are matched by text in English and Spanish; feedback-card strings come from the extension's own locale catalogs.

```
x.com timeline
  └─ post ──▶ action bar (Block · Mute · Not interested)
                 │ click
                 ▼
        X menu automation ──▶ X runs the action
```

The popup offers **five button kits** (Classic, Minimal, Bold, Sharp, Soft) with a live preview, plus light/dark themes. Preferences live in `chrome.storage.local` on your machine.

## What's inside

| Piece | What it is | Where it lands |
|---|---|---|
| Content script | timeline observer, action bars, menu automation | `src/features/post-actions/` |
| Popup | kit picker, theme toggle, brand link | `src/popup/` |
| Service worker | anonymous heartbeat + uninstall farewell | `src/background/` |
| Locales | 51 runtime catalogs, 29 keys each | `src/_locales/` |
| Build | esbuild bundling + static copy | `tools/`, `dist/` |

## Quick start

### From the Chrome Web Store (recommended)

[chromewebstore.google.com/detail/heeojjceomdehhpmabjebblocohkfbig](https://chromewebstore.google.com/detail/heeojjceomdehhpmabjebblocohkfbig)

### From source (build it yourself)

```bash
git clone https://github.com/LisandroNahuelH/i-dont-care-about-your-tweets.git
cd i-dont-care-about-your-tweets
npm ci
npm run build
```

Then open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and pick the `dist/` folder. Agents: the full runbook is [`AGENTS.md`](AGENTS.md).

## Requirements

- Chrome or Edge 120+ (Manifest V3).
- Node.js 22+ and npm — only to build from source.
- No other runtime dependencies.

## Security & privacy

- **Permissions**: only `storage`. Host access is limited to `https://www.premium11.com/*` and `https://premium11.com/*`; content scripts run only on `https://x.com/*` and `https://twitter.com/*`. No `tabs`, no `webRequest`, no `<all_urls>`, no remote code.
- **Anonymous heartbeat**: on install/update, and at most once per popup opening (24 h throttle), the service worker posts to `https://www.premium11.com/api/heartbeat` with the header `X-Heartbeat-Key` (a public client identifier that ships in every build — not a secret). Payload fields, all of them: `v`, `product`, `event` (`install` / `update` / `ping`), `extVersion`, `installId` (random local UUID), `installChannel`, `locale`, `timezone`, `ts`.
- **What is never sent**: X handles, post content, the posts you act on, browsing history, messages, or clipboard. No analytics SDKs.
- **Local state**: `chrome.storage.local` — install id, last ping timestamp, kit and theme preferences.
- **Uninstall**: `chrome.runtime.setUninstallURL` opens `https://www.premium11.com/goodbye/idont-care-tweets?id=<installId>&v=<version>` after removal. No fetch happens at removal time.
- **Privacy policy**: [www.premium11.com/en/privacidad](https://www.premium11.com/en/privacidad)
- **Honest note**: like any HTTPS request, the heartbeat reveals your IP to that server.

```bash
npm run verify        # i18n gates + typecheck + lint + tests + build
npm run lint          # eslint on src/, tests/, tools/
```

## Limits

- **X markup changes can pause the buttons.** The automation rides on X's own menus; a redesign may need a selector/keyword update.
- **Menu keyword matching covers English and Spanish** today; other UI languages fall back to the localized feedback-card strings.
- **Chrome and Edge only** (Manifest V3). No Firefox build yet.
- Sideloaded packages do not auto-update — install from the Chrome Web Store for updates.
- The heartbeat is best-effort anonymous telemetry; features never depend on it.

More detail: [`docs/limits.md`](docs/limits.md).

## Uninstall

1. Open `chrome://extensions`.
2. Find **I Don't Care About Your Tweets** and click **Remove**.

Your local preferences are deleted with the extension.

## Documentation

| Doc | For |
|---|---|
| [`AGENTS.md`](AGENTS.md) | agents: build, verify, load, package — the runbook |
| [`docs/architecture.md`](docs/architecture.md) | how the extension works inside |
| [`docs/limits.md`](docs/limits.md) | guaranteed behavior and edges |
| [`docs/troubleshooting.md`](docs/troubleshooting.md) | logs, probes, recovery |
| [`docs/i18n/pipeline.md`](docs/i18n/pipeline.md) | the 51-locale pipeline |

## FAQ

<details><summary>Where does my data live?</summary>

Only in `chrome.storage.local` on your machine, plus the anonymous heartbeat fields listed above. Nothing about your posts leaves the browser.
</details>

<details><summary>Does it really block, or does it just hide the post?</summary>

It drives X's own Block / Mute flows, so the effect is the real account-level action. "Not interested" sends X's own ranking signal.
</details>

<details><summary>Why does it need access to x.com?</summary>

To draw the action bar on posts and read X's menus to trigger the action. The script runs only on x.com and twitter.com.
</details>

<details><summary>Can I use it on Firefox?</summary>

Not yet — this is a Manifest V3 Chrome/Edge build. An issue describing interest helps prioritize.
</details>

<details><summary>How do I verify the privacy claims?</summary>

The full runtime is in this repository. Build it yourself (`npm ci && npm run build`) and inspect `dist/` — that is exactly what the browser loads.
</details>

## Credits

Built by [@LisandroNahuelH](https://github.com/LisandroNahuelH). Bundles the Montserrat font (SIL Open Font License 1.1 — see [`src/popup/fonts/montserrat/OFL.txt`](src/popup/fonts/montserrat/OFL.txt)). MIT licensed — see [`LICENSE`](LICENSE).
