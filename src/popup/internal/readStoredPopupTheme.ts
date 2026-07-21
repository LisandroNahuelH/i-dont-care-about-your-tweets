import { getChromeStorageArea } from "./getChromeStorageArea";
import { normalizePopupTheme } from "./normalizePopupTheme";
import { DEFAULT_POPUP_THEME, POPUP_THEME_STORAGE_KEY, type PopupTheme } from "./popupTheme";

export function readStoredPopupTheme(): Promise<PopupTheme> {
  const storageArea = getChromeStorageArea();
  if (!storageArea) {
    return Promise.resolve(DEFAULT_POPUP_THEME);
  }

  return new Promise((resolve) => {
    try {
      storageArea.get({ [POPUP_THEME_STORAGE_KEY]: DEFAULT_POPUP_THEME }, (items) => {
        resolve(normalizePopupTheme(items[POPUP_THEME_STORAGE_KEY]));
      });
    } catch {
      resolve(DEFAULT_POPUP_THEME);
    }
  });
}
