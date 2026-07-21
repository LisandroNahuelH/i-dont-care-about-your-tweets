import type { ButtonKit } from "../../shared/button-kits";
import { ACTIONS } from "./actions";

export function createKitIconPreview(kit: ButtonKit): HTMLSpanElement {
  const preview = document.createElement("span");
  preview.className = "kit-icon-preview";
  preview.setAttribute("aria-hidden", "true");

  for (const action of ACTIONS) {
    const icon = document.createElement("span");
    icon.className = "kit-icon";
    icon.innerHTML = kit.icons[action];
    preview.append(icon);
  }

  return preview;
}
