import { isPopupTheme } from "./isPopupTheme";
import { DEFAULT_POPUP_THEME, type PopupTheme } from "./popupTheme";

export function normalizePopupTheme(value: unknown): PopupTheme {
  return isPopupTheme(value) ? value : DEFAULT_POPUP_THEME;
}
