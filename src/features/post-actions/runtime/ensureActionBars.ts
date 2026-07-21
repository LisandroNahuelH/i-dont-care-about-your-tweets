import { createActionBar } from "../dom/createActionBar";
import { findActionBarHost } from "../dom/findActionBarHost";
import { findTweetArticles } from "../dom/findTweetArticles";
import { hasActionBar } from "../dom/hasActionBar";

export function ensureActionBars(): void {
  const articles = findTweetArticles();

  for (const article of articles) {
    if (hasActionBar(article)) {
      continue;
    }

    const host = findActionBarHost(article);

    if (!host) {
      continue;
    }

    host.insertAdjacentElement("afterend", createActionBar());
  }
}
