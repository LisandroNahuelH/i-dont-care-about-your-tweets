import type { ActionKind } from "../config/actionKinds";
import { waitForElement } from "../../../shared/dom/waitForElement";
import { CONFIRMATION_BUTTON_SELECTORS } from "../config/elementSelectors";
import { findConfirmationButton } from "./findConfirmationButton";

export async function clickConfirmationIfPresent(action: ActionKind): Promise<void> {
  try {
    await waitForElement(CONFIRMATION_BUTTON_SELECTORS, 900);
  } catch {
    return;
  }

  const confirmationButton = findConfirmationButton(action);

  if (!confirmationButton) {
    return;
  }

  confirmationButton.click();
}
