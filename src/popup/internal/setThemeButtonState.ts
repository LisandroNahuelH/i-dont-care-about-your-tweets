import { getMessage } from "../../shared/browser/getMessage";
import { themeToggleButton } from "./elements";
import { getNextPopupTheme } from "./getNextPopupTheme";
import type { PopupTheme } from "./popupTheme";
import { THEME_ICON_MARKUP } from "./themeIconMarkup";

export function setThemeButtonState(theme: PopupTheme): void {
  const nextTheme = getNextPopupTheme(theme);
  const labelKey = nextTheme === "dark" ? "popupThemeDark" : "popupThemeLight";
  const label = getMessage(labelKey);

  if (themeToggleButton) {
    themeToggleButton.innerHTML = THEME_ICON_MARKUP[nextTheme];
  }

  themeToggleButton?.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  themeToggleButton?.setAttribute("aria-label", getMessage("popupThemeToggleAriaLabel"));
  if (themeToggleButton) {
    themeToggleButton.title = label;
  }
}
