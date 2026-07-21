import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const BRAND_NAME = "I Don't Care About Your Tweets";
const BRAND_KEYS = ["extensionName", "popupPageTitle"];
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const localesRoot = resolve(repoRoot, "src/_locales");

const localeDirs = readdirSync(localesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

let updated = 0;

for (const locale of localeDirs) {
  const filePath = resolve(localesRoot, locale, "messages.json");
  const catalog = JSON.parse(readFileSync(filePath, "utf8"));
  let changed = false;

  for (const key of BRAND_KEYS) {
    if (catalog[key]?.message !== BRAND_NAME) {
      catalog[key].message = BRAND_NAME;
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(filePath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
    updated += 1;
  }
}

console.log(`Brand name fixed in ${updated} locale(s). Keys: ${BRAND_KEYS.join(", ")}`);