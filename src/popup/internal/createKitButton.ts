import type { ButtonKit } from "../../shared/button-kits";
import { getMessage } from "../../shared/browser/getMessage";
import { createKitIconPreview } from "./createKitIconPreview";
import { selectKit } from "./selectKit";

export function createKitButton(kit: ButtonKit): HTMLButtonElement {
  const button = document.createElement("button");
  const text = document.createElement("span");
  const name = document.createElement("span");
  const description = document.createElement("span");

  button.type = "button";
  button.className = "kit-option";
  button.dataset.kitId = kit.id;
  button.setAttribute("aria-pressed", "false");
  text.className = "kit-copy";
  name.className = "kit-name";
  name.textContent = getMessage(kit.nameKey);
  description.className = "kit-description";
  description.textContent = getMessage(kit.descriptionKey);
  text.append(name, description);
  button.append(createKitIconPreview(kit), text);
  button.addEventListener("click", () => void selectKit(kit.id));

  return button;
}
