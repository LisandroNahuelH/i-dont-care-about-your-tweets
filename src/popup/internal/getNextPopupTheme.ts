import type { PopupTheme } from "./popupTheme";

export function getNextPopupTheme(theme: PopupTheme): PopupTheme {
  return theme === "dark" ? "light" : "dark";
}
