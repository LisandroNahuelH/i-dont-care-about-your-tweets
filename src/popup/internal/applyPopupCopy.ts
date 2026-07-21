import { getMessage } from "../../shared/browser/getMessage";
import { kitList, popupHeading, popupSubtitle, previewSection, resetButton } from "./elements";

export function applyPopupCopy(): void {
  document.title = getMessage("popupPageTitle");
  if (popupHeading) {
    popupHeading.textContent = getMessage("popupHeading");
  }

  if (popupSubtitle) {
    popupSubtitle.textContent = getMessage("popupSubtitle");
  }

  if (resetButton) {
    resetButton.textContent = getMessage("popupReset");
  }

  previewSection?.setAttribute("aria-label", getMessage("popupPreviewAriaLabel"));
  kitList?.setAttribute("aria-label", getMessage("popupKitListAriaLabel"));
}
