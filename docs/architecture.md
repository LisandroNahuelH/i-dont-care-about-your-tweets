# Architecture

## What this is

A Manifest V3 extension for Chrome and Edge. Three entry points, bundled with esbuild:

| Bundle | Source | Runs in |
|---|---|---|
| `dist/content.js` (+ `content.css`) | `src/content/` → `src/features/post-actions/` | every x.com / twitter.com page |
| `dist/popup.js` (+ `popup.html`, styles, fonts) | `src/popup/` | the toolbar popup |
| `dist/background.js` | `src/background/` | the MV3 service worker |

```
npm run build
  ├─ i18n:check / i18n:audit / i18n:audit-literals   (gates)
  ├─ clean        (tools/clean-dist.mjs)   -> empties dist/
  ├─ build:bundle (esbuild x3)             -> dist/{content,popup,background}.js
  └─ build:copy   (tools/copy-static.mjs)  -> manifest, css, _locales, icons, fonts
```

## Content script — the action bar

Flow, in order:

1. `startPostActionExtension()` boots a `MutationObserver` on the timeline (`runtime/observeTimeline.ts`).
2. For every post article, `ensureActionBars()` mounts an action bar (`dom/createActionBar.ts`) with three buttons: Block, Mute, Not interested (`dom/createBlockButton.ts`, `createMuteButton.ts`, `createDismissButton.ts`). Per-article busy state is tracked (`dom/setArticleBusyState.ts`).
3. Button clicks run `runPostAction()`: open X's caret menu (`actions/openPostMenu.ts`), find the entry by text (`actions/findActionMenuItem.ts` + `matchesActionLabel.ts`), click it, and handle the confirmation dialog for Block (`actions/findConfirmationButton.ts`, `clickConfirmationIfPresent.ts`).
4. After Not interested, X's feedback card is hidden (`runtime/hideDismissFeedbackCards.ts`).

Menu entries match by normalized text (`shared/text/normalizeText.ts`). Keywords live in `features/post-actions/config/actionDefinitions.ts`: English and Spanish for menu items; feedback-card strings come from the locale catalogs with English/Spanish fallbacks (`dismissFeedbackKeywords.ts`).

Selectors live in `config/elementSelectors.ts` and the `dom/` helpers — the main X-markup surface to revisit when X ships a redesign.

## Popup

`src/popup/index.html` + `internal/*.ts`. Responsibilities:

- i18n bootstrap (`applyPopupCopy`), theme bootstrap and toggle (`idcaytPopupTheme`, light/dark).
- Button-kit picker: five kits (classic, minimal, bold, sharp, soft) with live preview; selection persisted under `idcaytButtonKit` (`src/shared/button-kits.ts`).
- Heartbeat ping: opening the popup messages the service worker (`HEARTBEAT_PING`), which throttles to about once per 24 h.

All preferences live in `chrome.storage.local`. No other permission is requested.

## Service worker — heartbeat + farewell

`src/background/index.ts`, bundled to `dist/background.js`:

| Concern | Value |
|---|---|
| Endpoint | `POST https://www.premium11.com/api/heartbeat` |
| Header | `X-Heartbeat-Key` — a public client identifier that ships in every build |
| Events | `install` / `update` from `onInstalled`; `ping` from popup open (24 h throttle) |
| Payload | `v`, `product` (`idont-care-tweets`), `event`, `extVersion`, `installId` (random UUID), `installChannel`, `locale`, `timezone`, `ts` |
| Local keys | `idcaytInstallId`, `idcaytLastHeartbeatAt` |
| Uninstall | `chrome.runtime.setUninstallURL` opens `https://www.premium11.com/goodbye/idont-care-tweets?id=<installId>&v=<version>` |

Fire-and-forget: failures never block the extension, and no handles, post content, or DOM data leave the page.

## i18n

51 runtime catalogs under `src/_locales/` (29 keys each), driven by the registry `docs/i18n/chrome-web-store-locales.json` and the tooling under `tools/i18n/` — see [pipeline.md](i18n/pipeline.md). `npm run verify` fails on key mismatches.

## Tests

- Unit tests with tsx: `tests/**/*.test.ts` (text normalization, label matching, kits, popup theme).
- Component tests with vitest + happy-dom: `src/**/*.test.ts` (locale attributes, catalog wiring).

## Release flow

1. Bump `version` in `manifest.json` and `package.json` (they must match).
2. `npm run verify`, then `npm run package:release` (zips `dist/` into `release/`; Windows script).
3. Upload the zip to the Chrome Web Store listing; tag the GitHub release with the same zip attached.
