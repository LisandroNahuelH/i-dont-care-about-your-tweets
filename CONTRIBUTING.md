# Contributing to I Don't Care About Your Tweets

Thanks for considering a contribution.

## Ground rules

- English for all repository documentation and commit messages.
- One logical change per pull request.
- Never include secrets, tokens, or personal data.
- UI strings go through the i18n pipeline (see [`docs/i18n/pipeline.md`](docs/i18n/pipeline.md)) — do not hardcode user-facing text.

## Development setup

```bash
git clone https://github.com/LisandroNahuelH/i-dont-care-about-your-tweets.git
cd i-dont-care-about-your-tweets
npm ci
npm run verify     # i18n gates + typecheck + lint + tests + build
```

Then load `dist/` as an unpacked extension: `chrome://extensions` → Developer mode → **Load unpacked**.

## Before opening a PR

1. `npm run verify` is green.
2. New UI strings exist in every locale — `npm run i18n:check` enforces key parity across the 51 catalogs.
3. Docs updated when behavior changes (`README.md`, `docs/`, `CHANGELOG.md`).
4. The PR body states **what** changed and **why**; link the issue when one exists.

## Reporting bugs

Use the [bug report](.github/ISSUE_TEMPLATE/bug.yml): include the extension version (`manifest.json`), your browser and its version, the x.com UI language, and the console output.

## Security

Do not open public issues for vulnerabilities — see [SECURITY.md](SECURITY.md).
