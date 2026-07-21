import { afterEach, describe, expect, it, vi } from "vitest";
import arCatalog from "./_locales/ar/messages.json";
import deCatalog from "./_locales/de/messages.json";
import enCatalog from "./_locales/en/messages.json";
import esCatalog from "./_locales/es/messages.json";
import jaCatalog from "./_locales/ja/messages.json";
import { createChromeI18nMock } from "./test-support/create-chrome-i18n-mock";
import { POPUP_HTML_FIXTURE } from "./test-support/popup-html-fixture";

const POPUP_LOCALE_CASES = [
  {
    locale: "en",
    catalog: enCatalog,
    dir: "ltr",
    heading: "Button kit",
    reset: "Reset",
    themeAria: "Toggle popup theme"
  },
  {
    locale: "es",
    catalog: esCatalog,
    dir: "ltr",
    heading: "Kit de botones",
    reset: "Restablecer",
    themeAria: "Cambiar tema del popup"
  },
  {
    locale: "de",
    catalog: deCatalog,
    dir: "ltr",
    heading: "Schaltflächen-Set",
    reset: "Zurücksetzen",
    themeAria: "Popup-Design umschalten"
  },
  {
    locale: "ja",
    catalog: jaCatalog,
    dir: "ltr",
    heading: "ボタンキット",
    reset: "リセット",
    themeAria: "ポップアップのテーマを切り替え"
  },
  {
    locale: "ar",
    catalog: arCatalog,
    dir: "rtl",
    heading: "مجموعة الأزرار",
    reset: "إعادة تعيين",
    themeAria: "تبديل سمة النافذة المنبثقة"
  }
] as const;

describe("popup i18n locales", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  for (const localeCase of POPUP_LOCALE_CASES) {
    it(`applies locale metadata and popup copy for ${localeCase.locale}`, async () => {
      document.body.innerHTML = POPUP_HTML_FIXTURE;
      vi.stubGlobal("chrome", createChromeI18nMock(localeCase.catalog, localeCase.locale));

      const { initializePopup } = await import("./popup/internal/initializePopup");
      initializePopup();

      expect(document.documentElement.lang).toBe(localeCase.locale);
      expect(document.documentElement.dir).toBe(localeCase.dir);
      expect(document.querySelector('[data-role="popup-heading"]')?.textContent).toBe(
        localeCase.heading
      );
      expect(document.querySelector('[data-action="reset"]')?.textContent).toBe(localeCase.reset);
      expect(document.querySelector('[data-action="toggle-theme"]')?.getAttribute("aria-label")).toBe(
        localeCase.themeAria
      );

      if (localeCase.locale !== "en") {
        expect(document.body.textContent).not.toContain("Button kit");
        expect(document.body.textContent).not.toContain("Reset");
      }
    });
  }
});