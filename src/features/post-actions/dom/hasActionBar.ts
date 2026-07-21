import { ACTION_BAR_SELECTOR } from "../config/elementSelectors";

export function hasActionBar(article: HTMLElement): boolean {
  return article.querySelector(ACTION_BAR_SELECTOR) !== null;
}
