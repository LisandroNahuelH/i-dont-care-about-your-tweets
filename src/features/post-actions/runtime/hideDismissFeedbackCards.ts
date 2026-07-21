import { findDismissFeedbackCards } from "../dom/findDismissFeedbackCards";
import { hideDismissFeedbackCard } from "../dom/hideDismissFeedbackCard";
import { isDismissFeedbackCard } from "../dom/isDismissFeedbackCard";

export function hideDismissFeedbackCards(): void {
  const articles = findDismissFeedbackCards();

  for (const article of articles) {
    if (!isDismissFeedbackCard(article)) {
      continue;
    }

    hideDismissFeedbackCard(article);
  }
}
