# AGENTS.md — the runbook (read me before touching anything)

You are an agent asked to build, verify, or release **I Don't Care About Your Tweets** — a Manifest V3 extension for x.com. Follow this file top to bottom. It is self-contained: prerequisites, exact commands, expected output, and what to do when something fails.

Target platform: Chrome / Edge 120+. The build runs anywhere Node.js runs; the manual verification step needs a Chromium browser.

## 0. Preflight — verify, then stop or continue

```bash
node --version    # expect: v22 or newer
npm --version     # expect: any modern npm (bundled with Node)
git --version     # expect: any 2.x
```

If a check fails, stop and report exactly which one. Do not improvise toolchains.

## 1. Clone to a stable path

```bash
git clone https://github.com/LisandroNahuelH/i-dont-care-about-your-tweets.git
cd i-dont-care-about-your-tweets
```

## 2. Install dependencies (lockfile-exact)

```bash
npm ci
```

## 3. Verify — the gate everything else relies on

```bash
npm run verify
```

Expected output (tail): `i18n check passed`, `Translation audit passed`, `i18n literal audit passed`, then the esbuild bundle lines for `dist/content.js`, `dist/popup.js`, `dist/background.js`, exit code 0. The chain is: i18n gates → `tsc --noEmit` → `eslint .` → unit tests (tsx) → vitest → clean + bundle + static copy.

## 4. Load it in the browser (manual verification)

1. Open `chrome://extensions` and enable **Developer mode**.
2. Click **Load unpacked** and select the `dist/` folder produced by step 3.
3. Open `https://x.com`, confirm that posts show the action bar, and click each button once.

There is no installer and no dry-run step: `dist/` is the artifact, and loading it is the install.

## 5. Package a store build (maintainers, Windows)

```bash
npm run package:release   # writes release/<slug>-<version>-chrome-web-store.zip from dist/
```

The zip stays local (`release/` is git-ignored) and is the file uploaded to the Chrome Web Store listing.

## 6. Release checklist (maintainers)

1. Bump `version` in `manifest.json` and `package.json` — they must match.
2. `npm run verify` green.
3. `npm run package:release`; record the zip's sha256 with the release notes.
4. Upload the zip in the Chrome Web Store dashboard and publish.
5. Tag the GitHub release with the same zip attached: `git tag -a vX.Y.Z -m "vX.Y.Z"`, push the tag, then attach the package to the release.

## Verification checklist (prove it works, then report)

1. `npm run verify` → exit 0, with the gates listed in step 3.
2. `git ls-files` → source only; no `dist/`, no `release/`, no `node_modules/` tracked.
3. Load unpacked → the extension appears on `chrome://extensions` with no errors; the service worker console is clean.
4. On x.com: action bars render; Block opens X's confirmation; Mute applies; Not interested acts and hides the feedback card.
5. Report back: version, commands run, probe results, anything skipped.

## Failure protocol

| Symptom | Meaning | Do |
|---|---|---|
| `npm ci` fails | lockfile or network issue | retry once; report the exact error |
| i18n check fails | key parity broken between catalogs | run `npm run i18n:check` alone, fix the listed locale(s), do not ship |
| eslint fails | rule violation or unexpected global | fix the cause; never disable a rule wholesale |
| Load unpacked shows errors | stale or broken `dist/` | re-run `npm run build`, inspect `dist/manifest.json` |
| Buttons missing on x.com | X markup changed | see [docs/troubleshooting.md](docs/troubleshooting.md); report the X UI language and the post menu |

## Manual path (for a human)

```bash
git clone https://github.com/LisandroNahuelH/i-dont-care-about-your-tweets.git
cd i-dont-care-about-your-tweets
npm ci && npm run build
# chrome://extensions -> Developer mode -> Load unpacked -> dist/
```

## What you must not do

- Do not commit `dist/`, `release/`, `node_modules/`, or agent scratch files — they are git-ignored; keep it that way.
- Do not hardcode user-facing strings: add keys to `src/_locales/en/messages.json` and run the i18n gates (see [docs/i18n/pipeline.md](docs/i18n/pipeline.md)).
- Do not change the heartbeat contract (endpoint, header, payload fields) without reading [docs/architecture.md](docs/architecture.md) first.
- Do not rewrite published history or force-push `main`.
