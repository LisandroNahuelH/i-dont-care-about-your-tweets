import { onDismissButtonClick } from "../events/onDismissButtonClick";
import { getActionIconMarkup } from "../config/buttonKitPreference";
import { getMessage } from "../../../shared/browser/getMessage";

export function createDismissButton(): HTMLButtonElement {
  const button = document.createElement("button");
  const label = getMessage("actionDismissTitle");

  button.type = "button";
  button.className = "idcayt-action-button";
  button.dataset.idcaytAction = "dismiss";
  button.innerHTML = getActionIconMarkup("dismiss");
  button.title = label;
  button.setAttribute("aria-label", label);
  button.addEventListener("click", onDismissButtonClick);

  return button;
}
