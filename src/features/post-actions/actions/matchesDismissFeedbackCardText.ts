import {
  getDismissFeedbackThankYouKeywords,
  getDismissFeedbackUndoKeywords
} from "../config/dismissFeedbackKeywords";
import { normalizeText } from "../../../shared/text/normalizeText";

export function matchesDismissFeedbackCardText(text: string): boolean {
  const normalizedText = normalizeText(text);
  const hasThankYouMessage = getDismissFeedbackThankYouKeywords().some((keyword) =>
    normalizedText.includes(keyword)
  );

  if (!hasThankYouMessage) {
    return false;
  }

  return getDismissFeedbackUndoKeywords().some((keyword) => normalizedText.includes(keyword));
}