import { ACTION_BAR_HOST_SELECTOR } from "../config/elementSelectors";
import { findMoreButton } from "./findMoreButton";

export function findActionBarHost(article: HTMLElement): HTMLElement | null {
  const timestampLink = article.querySelector<HTMLElement>(ACTION_BAR_HOST_SELECTOR)?.closest<HTMLElement>("a");

  if (timestampLink) {
    return timestampLink;
  }

  return findMoreButton(article) ?? article.querySelector<HTMLElement>('[data-testid="User-Name"]');
}
