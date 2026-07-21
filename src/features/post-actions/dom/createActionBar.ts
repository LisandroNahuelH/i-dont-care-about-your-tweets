import { createBlockButton } from "./createBlockButton";
import { createDismissButton } from "./createDismissButton";
import { createMuteButton } from "./createMuteButton";

export function createActionBar(): HTMLDivElement {
  const actionBar = document.createElement("div");

  actionBar.className = "idcayt-action-bar";
  actionBar.dataset.idcaytBar = "true";
  actionBar.dataset.idcaytBusy = "false";
  actionBar.append(createBlockButton(), createMuteButton(), createDismissButton());

  return actionBar;
}
