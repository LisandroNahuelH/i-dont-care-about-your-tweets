import type { ActionKind } from "../config/actionKinds";
import { matchesActionLabel } from "./matchesActionLabel";

export function findActionMenuItem(menuRoot: HTMLElement, action: ActionKind): HTMLElement | null {
  const candidates = Array.from(menuRoot.querySelectorAll<HTMLElement>('button, [role="menuitem"]'));

  for (const candidate of candidates) {
    const label = candidate.innerText || candidate.textContent || "";

    if (matchesActionLabel(action, label)) {
      return candidate;
    }
  }

  return null;
}
