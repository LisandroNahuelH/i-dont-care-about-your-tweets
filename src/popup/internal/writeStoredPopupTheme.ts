import { getChromeStorageArea } from "./getChromeStorageArea";
import { POPUP_THEME_STORAGE_KEY, type PopupTheme } from "./popupTheme";

export function writeStoredPopupTheme(theme: PopupTheme): Promise<void> {
  const storageArea = getChromeStorageArea();
  if (!storageArea) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    try {
      storageArea.set({ [POPUP_THEME_STORAGE_KEY]: theme }, resolve);
    } catch {
      resolve();
    }
  });
}
