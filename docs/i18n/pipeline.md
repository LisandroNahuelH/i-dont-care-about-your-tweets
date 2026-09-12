# i18n pipeline

How this repository ships 51 runtime locales plus localized Chrome Web Store copy — and how to change either without breaking the gates.

## Source of truth

[`chrome-web-store-locales.json`](chrome-web-store-locales.json) is the registry: every Chrome Web Store locale code, its display name, the runtime folder it maps to, the RTL flag, and per-entry statuses. Runtime catalogs live in `src/_locales/<folder>/messages.json`; the English catalog (`en/messages.json`, 29 keys) is canonical.

Regional codes that reuse another catalog are marked `runtimeStatus: "alias"` (for example `en_US` → `en`, `es_419` → `es`) and do not get their own folder — the store listing handles those regions.

## Tooling (`tools/i18n/`)

| Script | What it does |
|---|---|
| `bootstrap-all-locales.mjs` | creates any missing runtime folder from the registry, seeded from the English catalog |
| `apply-locale-patches.mjs` | applies `locale-patches.json` — hand-reviewed overrides on top of generated copy |
| `check-i18n.mjs` | gate: every catalog must carry exactly the English key set (`npm run i18n:check`) |
| `audit-title-case.mjs` | gate: brand/title strings keep consistent casing per locale |
| `audit-translations.mjs` | gate: translation consistency for the brand keys (`npm run i18n:audit`) |
| `audit-literals.mjs` | gate: no hardcoded user-facing literals in the popup HTML, popup internals, or post-action DOM (`npm run i18n:audit-literals`) |
| `manifest-store-copy.mjs` | canonical extension name/description plus the localized store titles/descriptions |
| `sync-manifest-store-copy.mjs` | writes the localized store copy into the catalogs (title ≤ 75 chars, description ≤ 132) |
| `capitalize-word-initials.mjs`, `fix-brand-name.mjs` | string helpers the pipeline uses |

`npm run verify` runs the three gates before typecheck / lint / tests / build — a key mismatch or a stray literal fails the build.

## Adding a key

1. Add it to `src/_locales/en/messages.json`.
2. Add the translation to every catalog; the audits enforce consistency.
3. `npm run i18n:check` — key parity across all 51 catalogs.
4. Reference it with `getMessage()`; never inline user-facing text.

## Adding a locale

1. Add the entry to `chrome-web-store-locales.json` (code, displayName, runtimeFolder, rtl, statuses).
2. `npm run i18n:bootstrap` — creates the folder from `en`.
3. Fill the translations; run `npm run i18n:check` and `npm run i18n:audit`.
4. Store side: extend the store copy in `manifest-store-copy.mjs` and re-run the sync script.

## Notes

- Folder names follow Chrome conventions (`pt_BR`, `zh_CN`, ...).
- RTL locales (`ar`, `fa`, `he`) get `dir="rtl"` handling at runtime (`src/shared/browser/is-rtl-locale.ts`).
- X menu keyword matching (English/Spanish) is a separate concern from this pipeline — see [../limits.md](../limits.md).
