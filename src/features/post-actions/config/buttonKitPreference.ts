import { BUTTON_KIT_STORAGE_KEY, DEFAULT_BUTTON_KIT_ID, getButtonKit } from "../../../shared/button-kits";
import { isActionKind, type ActionKind } from "./actionKinds";

let currentButtonKit = getButtonKit(DEFAULT_BUTTON_KIT_ID);
let isListeningForButtonKitChanges = false;

function getChromeStorageArea(): chrome.storage.StorageArea | null {
  return globalThis.chrome?.storage?.local ?? null;
}

function readStoredButtonKitId(): Promise<unknown> {
  const storageArea = getChromeStorageArea();
  if (!storageArea) {
    return Promise.resolve(DEFAULT_BUTTON_KIT_ID);
  }

  return new Promise((resolve) => {
    try {
      storageArea.get({ [BUTTON_KIT_STORAGE_KEY]: DEFAULT_BUTTON_KIT_ID }, (items) => {
        resolve(items[BUTTON_KIT_STORAGE_KEY]);
      });
    } catch {
      resolve(DEFAULT_BUTTON_KIT_ID);
    }
  });
}

function applyButtonKitPreference(value: unknown): void {
  currentButtonKit = getButtonKit(value);
  updateExistingActionButtonIcons();
}

function onButtonKitStorageChanged(
  changes: Record<string, chrome.storage.StorageChange>,
  areaName: chrome.storage.AreaName
): void {
  if (areaName !== "local") {
    return;
  }

  const kitChange = changes[BUTTON_KIT_STORAGE_KEY];
  if (kitChange) {
    applyButtonKitPreference(kitChange.newValue);
  }
}

export function getActionIconMarkup(action: ActionKind): string {
  return currentButtonKit.icons[action];
}

export function updateExistingActionButtonIcons(): void {
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".idcayt-action-button[data-idcayt-action]")
  );

  for (const button of buttons) {
    const action = button.dataset.idcaytAction;
    if (isActionKind(action)) {
      button.innerHTML = getActionIconMarkup(action);
    }
  }
}

export function initializeButtonKitPreference(): void {
  applyButtonKitPreference(DEFAULT_BUTTON_KIT_ID);

  if (!isListeningForButtonKitChanges) {
    try {
      globalThis.chrome?.storage?.onChanged?.addListener(onButtonKitStorageChanged);
      isListeningForButtonKitChanges = true;
    } catch {
      // The default kit keeps the extension usable when extension storage is unavailable.
    }
  }

  void readStoredButtonKitId().then(applyButtonKitPreference);
}
