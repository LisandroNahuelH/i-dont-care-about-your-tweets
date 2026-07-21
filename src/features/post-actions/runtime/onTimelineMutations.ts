import { ensureActionBars } from "./ensureActionBars";
import { hideDismissFeedbackCards } from "./hideDismissFeedbackCards";

export function onTimelineMutations(mutations: MutationRecord[]): void {
  if (mutations.length === 0) {
    return;
  }

  hideDismissFeedbackCards();
  ensureActionBars();
}
