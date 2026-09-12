# Troubleshooting

## Where the logs are

| Surface | How to read it |
|---|---|
| Content script | Open x.com, press F12, and read the Console for `[idcayt]` output and errors. |
| Service worker | `chrome://extensions` → find the extension → click **service worker** → Console. |
| Popup | Right-click the popup → **Inspect**. |

## Common problems

| Symptom | Likely cause | Fix |
|---|---|---|
| No buttons on posts | X shipped a new layout, or the tab has been open since before an extension reload | Reload the x.com tab; if it persists, check the selectors in `src/features/post-actions/config/elementSelectors.ts` |
| Block never confirms | X changed the confirmation dialog wording in your UI language | Check `confirmKeywords` in `src/features/post-actions/config/actionDefinitions.ts` |
| "Not interested" leaves X's card visible | The feedback-card wording changed | Check `src/features/post-actions/config/dismissFeedbackKeywords.ts` and the locale catalog |
| Popup looks unstyled or empty | Stale build | `npm run build`, then reload the extension |
| Heartbeat errors in the service worker console | Offline, or the domain is blocked | Ignore — the heartbeat is fire-and-forget and throttled |

## Recovering a broken install

1. `chrome://extensions` → **Remove** the extension.
2. Reload the unpacked build (`npm ci && npm run build`, then **Load unpacked** → `dist/`), or reinstall from the Chrome Web Store.
3. Local preferences reset — they are stored per install.

## Reporting

Use the [bug report](../.github/ISSUE_TEMPLATE/bug.yml) and include: extension version, browser and version, x.com UI language, console output, and what you clicked.
