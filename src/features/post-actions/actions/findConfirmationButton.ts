import type { ActionKind } from "../config/actionKinds";
import { ACTION_DEFINITIONS } from "../config/actionDefinitions";
import { CONFIRMATION_BUTTON_SELECTORS } from "../config/elementSelectors";
import { normalizeText } from "../../../shared/text/normalizeText";

export function findConfirmationButton(action: ActionKind): HTMLElement | null {
  const { confirmKeywords } = ACTION_DEFINITIONS[action];

  if (confirmKeywords.length === 0) {
    return null;
  }

  for (const selector of CONFIRMATION_BUTTON_SELECTORS) {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>(selector));

    for (const candidate of candidates) {
      if (candidate.dataset.testid === "confirmationSheetConfirm") {
        return candidate;
      }

      const normalizedLabel = normalizeText(candidate.innerText || candidate.textContent || "");

      for (const keyword of confirmKeywords) {
        if (normalizedLabel.includes(keyword)) {
          return candidate;
        }
      }
    }
  }

  return null;
}
