import assert from "node:assert/strict";
import { getNextPopupTheme } from "../../src/popup/internal/getNextPopupTheme";
import { isPopupTheme } from "../../src/popup/internal/isPopupTheme";
import { normalizePopupTheme } from "../../src/popup/internal/normalizePopupTheme";
import { DEFAULT_POPUP_THEME, POPUP_THEME_STORAGE_KEY } from "../../src/popup/internal/popupTheme";

assert.equal(POPUP_THEME_STORAGE_KEY, "idcaytPopupTheme");
assert.equal(DEFAULT_POPUP_THEME, "dark");
assert.equal(isPopupTheme("light"), true);
assert.equal(isPopupTheme("dark"), true);
assert.equal(isPopupTheme("system"), false);
assert.equal(normalizePopupTheme("dark"), "dark");
assert.equal(normalizePopupTheme("unknown"), DEFAULT_POPUP_THEME);
assert.equal(getNextPopupTheme("light"), "dark");
assert.equal(getNextPopupTheme("dark"), "light");

console.log("popup-theme.test.ts passed");
