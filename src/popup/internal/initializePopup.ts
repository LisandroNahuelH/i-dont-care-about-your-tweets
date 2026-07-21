import { setDocumentLocaleAttributes } from "../../shared/browser/set-document-locale-attributes";
import { applyPopupCopy } from "./applyPopupCopy";
import { bindResetButton } from "./bindResetButton";
import { bindThemeToggleButton } from "./bindThemeToggleButton";
import { initializePopupTheme } from "./initializePopupTheme";
import { initializeSelectedKit } from "./initializeSelectedKit";
import { renderKitOptions } from "./renderKitOptions";

export function initializePopup(): void {
  setDocumentLocaleAttributes();
  applyPopupCopy();
  renderKitOptions();
  bindResetButton();
  bindThemeToggleButton();
  initializePopupTheme();
  initializeSelectedKit();
}
