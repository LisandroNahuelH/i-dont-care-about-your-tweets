import { TWEET_ARTICLE_SELECTOR } from "../config/elementSelectors";

export function findArticleFromElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>(TWEET_ARTICLE_SELECTOR);
}