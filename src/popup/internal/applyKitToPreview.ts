import type { ButtonKit } from "../../shared/button-kits";
import { ACTIONS } from "./actions";
import { createPreviewButton } from "./createPreviewButton";
import { previewBar } from "./elements";

export function applyKitToPreview(kit: ButtonKit): void {
  if (!previewBar) {
    return;
  }

  previewBar.dataset.kitId = kit.id;
  previewBar.replaceChildren(...ACTIONS.map((action) => createPreviewButton(action, kit)));
}
