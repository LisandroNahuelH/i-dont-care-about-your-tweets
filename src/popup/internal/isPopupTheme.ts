import type { PopupTheme } from "./popupTheme";

const POPUP_THEMES = new Set<PopupTheme>(["light", "dark"]);

export function isPopupTheme(value: unknown): value is PopupTheme {
  return typeof value === "string" && POPUP_THEMES.has(value as PopupTheme);
}
