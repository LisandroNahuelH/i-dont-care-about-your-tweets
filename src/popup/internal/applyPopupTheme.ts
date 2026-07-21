import type { PopupTheme } from "./popupTheme";
import { setThemeButtonState } from "./setThemeButtonState";

export function applyPopupTheme(theme: PopupTheme): void {
  document.body.dataset.theme = theme;
  setThemeButtonState(theme);
}
