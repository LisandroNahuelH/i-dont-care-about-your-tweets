import { BUTTON_KIT_STORAGE_KEY, DEFAULT_BUTTON_KIT_ID, normalizeButtonKitId, type ButtonKitId } from "../../shared/button-kits";
import { getChromeStorageArea } from "./getChromeStorageArea";

export function readStoredKitId(): Promise<ButtonKitId> {
  const storageArea = getChromeStorageArea();
  if (!storageArea) {
    return Promise.resolve(DEFAULT_BUTTON_KIT_ID);
  }

  return new Promise((resolve) => {
    try {
      storageArea.get({ [BUTTON_KIT_STORAGE_KEY]: DEFAULT_BUTTON_KIT_ID }, (items) => {
        resolve(normalizeButtonKitId(items[BUTTON_KIT_STORAGE_KEY]));
      });
    } catch {
      resolve(DEFAULT_BUTTON_KIT_ID);
    }
  });
}
