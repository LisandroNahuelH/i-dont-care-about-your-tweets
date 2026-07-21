import { BUTTON_KITS } from "../../shared/button-kits";
import { createKitButton } from "./createKitButton";
import { kitList } from "./elements";

export function renderKitOptions(): void {
  kitList?.replaceChildren(...BUTTON_KITS.map(createKitButton));
}
