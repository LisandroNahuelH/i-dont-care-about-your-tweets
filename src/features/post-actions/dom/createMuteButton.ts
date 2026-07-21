import { onMuteButtonClick } from "../events/onMuteButtonClick";
import { getActionIconMarkup } from "../config/buttonKitPreference";
import { getMessage } from "../../../shared/browser/getMessage";

export function createMuteButton(): HTMLButtonElement {
  const button = document.createElement("button");
  const label = getMessage("actionMuteTitle");

  button.type = "button";
  button.className = "idcayt-action-button";
  button.dataset.idcaytAction = "mute";
  button.innerHTML = getActionIconMarkup("mute");
  button.title = label;
  button.setAttribute("aria-label", label);
  button.addEventListener("click", onMuteButtonClick);

  return button;
}
