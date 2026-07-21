import { getButtonKit, type ButtonKitId } from "../../shared/button-kits";
import { applyKitToPreview } from "./applyKitToPreview";
import { kitList } from "./elements";

export function setSelectedKit(kitId: ButtonKitId): void {
  applyKitToPreview(getButtonKit(kitId));

  const kitButtons = Array.from(kitList?.querySelectorAll<HTMLButtonElement>("[data-kit-id]") ?? []);
  for (const button of kitButtons) {
    const selected = button.dataset.kitId === kitId;
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  }
}
