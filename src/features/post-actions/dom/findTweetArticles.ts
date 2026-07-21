import { ACTION_BAR_HOST_SELECTOR, TWEET_ARTICLE_SELECTOR } from "../config/elementSelectors";
import { findMoreButton } from "./findMoreButton";
import { isDismissFeedbackCard } from "./isDismissFeedbackCard";

function looksLikeTweetArticle(article: HTMLElement): boolean {
  if (isDismissFeedbackCard(article)) {
    return false;
  }

  return article.dataset.testid === "tweet" || article.querySelector(ACTION_BAR_HOST_SELECTOR) !== null || findMoreButton(article) !== null;
}

export function findTweetArticles(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(TWEET_ARTICLE_SELECTOR)).filter(looksLikeTweetArticle);
}