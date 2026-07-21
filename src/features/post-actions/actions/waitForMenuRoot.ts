import { MENU_ROOT_SELECTORS } from "../config/elementSelectors";
import { waitForElement } from "../../../shared/dom/waitForElement";

export function waitForMenuRoot(): Promise<HTMLElement> {
  return waitForElement(MENU_ROOT_SELECTORS, 2500);
}
