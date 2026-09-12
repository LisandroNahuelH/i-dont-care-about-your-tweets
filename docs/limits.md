# Limits (honest ones)

## What is guaranteed

- The three buttons (Block, Mute, Not interested) appear on posts in the x.com timelines the content script observes, and trigger X's own account-level actions.
- Preferences (button kit, popup theme) persist locally through `chrome.storage.local`.
- The extension requests only the `storage` permission and talks to exactly one endpoint (the anonymous heartbeat).
- A clean `npm ci && npm run verify` reproduces the build on Windows, macOS, and Linux (Node 22+).

## What is not

- **X markup changes can pause the automation.** The buttons ride on X's caret menu; when X redesigns a dialog, matching needs a selector or keyword update. The tests and the literal audit keep the current contract honest, but nothing prevents upstream churn.
- **Menu keyword matching covers English and Spanish.** X localizes menus by account language; other languages rely on the localized feedback-card strings and may fall back safely without acting.
- **Chrome and Edge only.** Manifest V3 build; there is no Firefox port.
- **Sideloaded installs do not auto-update.** Only the Chrome Web Store distributes updates.
- **Heartbeat is best-effort telemetry.** Delivery is throttled (about once per 24 h) and fire-and-forget; features never depend on it.
- **Translations.** The 51 catalogs are produced with the repository tooling plus review; wording refinements are welcome as PRs.
- **Not covered**: multi-account management, scheduled actions, analytics of your actions, or anything that uses X credentials.

## Performance notes

The observer only inspects newly added posts and marks an article busy while an action runs; idle cost is a passive `MutationObserver`.
