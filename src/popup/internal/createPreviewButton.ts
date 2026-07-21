import type { ButtonKit, ButtonKitAction } from "../../shared/button-kits";
import { getMessage } from "../../shared/browser/getMessage";
import { ACTION_MESSAGE_KEYS } from "./actionMessageKeys";

export function createPreviewButton(action: ButtonKitAction, kit: ButtonKit): HTMLButtonElement {
  const button = document.createElement("button");
  const label = getMessage(ACTION_MESSAGE_KEYS[action]);

  button.type = "button";
  button.className = "preview-action-button";
  button.dataset.previewAction = action;
  button.innerHTML = kit.icons[action];
  button.title = label;
  button.setAttribute("aria-label", label);

  return button;
}
