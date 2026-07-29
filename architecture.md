# Architecture — I Don't Care About Your Tweets

## Layout

Chromium MV3 extension: TypeScript sources under `src/` (content, popup, background). `npm run build` bundles with esbuild into `dist/` for unpacked/CWS load.

## Content / popup

- Content script on `x.com` / `twitter.com`: post-action menu automation (caret → menu → dismiss keywords).
- Popup: kit selection and settings; `initializePopup` applies i18n and triggers heartbeat ping via SW message.

## Heartbeat (Premium11)

Anonymous install/update/ping diagnostics via `src/background/index.ts` (service worker).

```
Popup open → HEARTBEAT_PING → SW sendAnonymousHeartbeat("ping")
onInstalled → install | update
SW boot → setUninstallURL(goodbye/idont-care-tweets?id&v)
```

Payload `{ v:1, product:'idont-care-tweets', event, extVersion, installId, installChannel, locale, timezone, ts }` to `https://www.premium11.com/api/heartbeat`. Local keys `idcaytInstallId` / `idcaytLastHeartbeatAt`. Admin: `https://www.premium11.com/admin/idont-care-tweets`.

## Chrome Web Store

- Extension ID: `heeojjceomdehhpmabjebblocohkfbig`
- Registry: `0. Chrome Web Store Publish/extensions.json`
