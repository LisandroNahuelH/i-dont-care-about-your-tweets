import { BUTTON_KIT_STORAGE_KEY, type ButtonKitId } from "../../shared/button-kits";
import { getChromeStorageArea } from "./getChromeStorageArea";

export function writeStoredKitId(kitId: ButtonKitId): Promise<void> {
  const storageArea = getChromeStorageArea();
  if (!storageArea) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    try {
      storageArea.set({ [BUTTON_KIT_STORAGE_KEY]: kitId }, resolve);
    } catch {
      resolve();
    }
  });
}
