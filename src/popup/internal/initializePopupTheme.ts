import { applyPopupTheme } from "./applyPopupTheme";
import { DEFAULT_POPUP_THEME } from "./popupTheme";
import { readStoredPopupTheme } from "./readStoredPopupTheme";

export function initializePopupTheme(): void {
  applyPopupTheme(DEFAULT_POPUP_THEME);
  void readStoredPopupTheme().then(applyPopupTheme);
}
