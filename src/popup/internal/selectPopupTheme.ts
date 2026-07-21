import { applyPopupTheme } from "./applyPopupTheme";
import type { PopupTheme } from "./popupTheme";
import { writeStoredPopupTheme } from "./writeStoredPopupTheme";

export async function selectPopupTheme(theme: PopupTheme): Promise<void> {
  applyPopupTheme(theme);
  await writeStoredPopupTheme(theme);
}
