import { onBlockButtonClick } from "../events/onBlockButtonClick";
import { getActionIconMarkup } from "../config/buttonKitPreference";
import { getMessage } from "../../../shared/browser/getMessage";

export function createBlockButton(): HTMLButtonElement {
  const button = document.createElement("button");
  const label = getMessage("actionBlockTitle");

  button.type = "button";
  button.className = "idcayt-action-button";
  button.dataset.idcaytAction = "block";
  button.innerHTML = getActionIconMarkup("block");
  button.title = label;
  button.setAttribute("aria-label", label);
  button.addEventListener("click", onBlockButtonClick);

  return button;
}
