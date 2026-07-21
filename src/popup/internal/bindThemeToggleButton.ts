import { themeToggleButton } from "./elements";
import { togglePopupTheme } from "./togglePopupTheme";

export function bindThemeToggleButton(): void {
  themeToggleButton?.addEventListener("click", () => {
    void togglePopupTheme();
  });
}
