import { getMessage } from "../../../shared/browser/getMessage";
import { normalizeText } from "../../../shared/text/normalizeText";

const DISMISS_FEEDBACK_THANK_YOU_FALLBACKS = [
  "gracias. x usara esto para mejorar tu cronologia",
  "thanks. x will use this to improve your timeline",
  "thanks. x will use this to make your timeline better"
] as const;

const DISMISS_FEEDBACK_UNDO_FALLBACKS = ["deshacer", "undo"] as const;

export function getDismissFeedbackThankYouKeywords(): readonly string[] {
  const localized = normalizeText(getMessage("dismissFeedbackThankYou"));
  return [...DISMISS_FEEDBACK_THANK_YOU_FALLBACKS, localized];
}

export function getDismissFeedbackUndoKeywords(): readonly string[] {
  const localized = normalizeText(getMessage("dismissFeedbackUndo"));
  return [...DISMISS_FEEDBACK_UNDO_FALLBACKS, localized];
}