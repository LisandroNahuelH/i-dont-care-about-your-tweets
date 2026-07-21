import { initializeButtonKitPreference } from "../config/buttonKitPreference";
import { ensureActionBars } from "./ensureActionBars";
import { hideDismissFeedbackCards } from "./hideDismissFeedbackCards";
import { observeTimeline } from "./observeTimeline";

let hasStarted = false;

export function startPostActionExtension(): void {
  if (hasStarted) {
    return;
  }

  hasStarted = true;
  initializeButtonKitPreference();
  hideDismissFeedbackCards();
  ensureActionBars();
  observeTimeline();
}
