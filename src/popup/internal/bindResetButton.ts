import { DEFAULT_BUTTON_KIT_ID } from "../../shared/button-kits";
import { resetButton } from "./elements";
import { selectKit } from "./selectKit";

export function bindResetButton(): void {
  resetButton?.addEventListener("click", () => {
    void selectKit(DEFAULT_BUTTON_KIT_ID);
  });
}
