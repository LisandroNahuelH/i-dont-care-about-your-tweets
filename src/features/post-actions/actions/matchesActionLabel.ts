import type { ActionKind } from "../config/actionKinds";
import { ACTION_DEFINITIONS } from "../config/actionDefinitions";
import { getMessage } from "../../../shared/browser/getMessage";
import { normalizeText } from "../../../shared/text/normalizeText";

function getActionKeywords(action: ActionKind): readonly string[] {
  const { keywords, messageKey } = ACTION_DEFINITIONS[action];
  const localized = normalizeText(getMessage(messageKey));
  return [...keywords, localized];
}

export function matchesActionLabel(action: ActionKind, label: string): boolean {
  const normalizedLabel = normalizeText(label);

  for (const keyword of getActionKeywords(action)) {
    if (normalizedLabel.includes(keyword)) {
      return true;
    }
  }

  return false;
}