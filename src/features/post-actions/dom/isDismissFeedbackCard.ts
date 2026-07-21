import { matchesDismissFeedbackCardText } from "../actions/matchesDismissFeedbackCardText";

export function isDismissFeedbackCard(article: HTMLElement): boolean {
  if (article.dataset.testid === "tweet") {
    return false;
  }

  return matchesDismissFeedbackCardText(article.innerText || article.textContent || "");
}
