import { cpSync, mkdirSync } from "node:fs";

mkdirSync(new URL("../dist", import.meta.url), {
  recursive: true
});

cpSync(new URL("../manifest.json", import.meta.url), new URL("../dist/manifest.json", import.meta.url), {
  force: true
});

cpSync(new URL("../src/content/styles.css", import.meta.url), new URL("../dist/content.css", import.meta.url), {
  force: true
});

cpSync(new URL("../src/popup/index.html", import.meta.url), new URL("../dist/popup.html", import.meta.url), {
  force: true
});

cpSync(new URL("../src/popup/popup.css", import.meta.url), new URL("../dist/popup.css", import.meta.url), {
  force: true
});

cpSync(new URL("../src/popup/popup-styles", import.meta.url), new URL("../dist/popup-styles", import.meta.url), {
  force: true,
  recursive: true
});

cpSync(new URL("../src/popup/fonts", import.meta.url), new URL("../dist/fonts", import.meta.url), {
  force: true,
  recursive: true
});

cpSync(new URL("../icons", import.meta.url), new URL("../dist/icons", import.meta.url), {
  force: true,
  recursive: true
});

cpSync(new URL("../src/_locales", import.meta.url), new URL("../dist/_locales", import.meta.url), {
  force: true,
  recursive: true
});
