import { getNextPopupTheme } from "./getNextPopupTheme";
import { normalizePopupTheme } from "./normalizePopupTheme";
import { selectPopupTheme } from "./selectPopupTheme";

export async function togglePopupTheme(): Promise<void> {
  const currentTheme = normalizePopupTheme(document.body.dataset.theme);
  await selectPopupTheme(getNextPopupTheme(currentTheme));
}
