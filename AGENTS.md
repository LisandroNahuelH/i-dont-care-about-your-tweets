# AGENTS.md — I Don't Care About Your Tweets

## Chrome Web Store

| Item | Value |
|------|--------|
| Extension ID | `heeojjceomdehhpmabjebblocohkfbig` |
| Slug (heartbeat / admin) | `idont-care-tweets` |
| Publisher ID | `2a25f2f4-d34f-44a4-816e-dbdaaf2fc14a` |
| CWS registry | `D:\OfiSync\0. Lisandro\0. Programacion\0. Chrome Web Store Publish\extensions.json` (name `I Don't Care About Your Tweets`) |
| Publish CLI | `node cws-cli.mjs release --name "I Don't Care About Your Tweets" --zip <release-zip>` from registry folder |

## Build

- `npm run build` → `dist/` (load unpacked). `npm run package:release` for store zip.
- Version truth: `package.json`, `package-lock.json`, `manifest.json`.

## Heartbeat (anonymous diagnostics)

- Product slug: `idont-care-tweets` — MV3 SW `src/background/index.ts` (bundled to `dist/background.js`).
- `POST https://www.premium11.com/api/heartbeat` with header `X-Heartbeat-Key` (fire-and-forget; no handles/tweets in payload).
- Events: `install` / `update` on `onInstalled`; `ping` on popup open (`HEARTBEAT_PING` message), throttled ~24h via `idcaytLastHeartbeatAt`.
- Storage keys: `idcaytInstallId` (UUID), `idcaytLastHeartbeatAt`.
- Uninstall: `chrome.runtime.setUninstallURL` → `https://www.premium11.com/goodbye/idont-care-tweets?id=<installId>&v=<extVersion>` (no SW fetch on remove).
- Manifest `host_permissions`: `https://www.premium11.com/*`, `https://premium11.com/*`.
- Admin: `https://www.premium11.com/admin/idont-care-tweets`
- Privacy (CWS): `https://www.premium11.com/en/privacidad`

## Git

- Do not commit `Backups/`, `node_modules/`, `dist/`, secrets.
