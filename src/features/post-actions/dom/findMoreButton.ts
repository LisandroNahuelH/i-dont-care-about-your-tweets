import { MORE_BUTTON_SELECTORS } from "../config/elementSelectors";

export function findMoreButton(article: HTMLElement): HTMLElement | null {
  for (const selector of MORE_BUTTON_SELECTORS) {
    const button = article.querySelector<HTMLElement>(selector);

    if (button) {
      return button;
    }
  }

  return null;
}
