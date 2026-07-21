import { ACTION_BAR_SELECTOR } from "../config/elementSelectors";

export function setArticleBusyState(article: HTMLElement, isBusy: boolean): void {
  const actionBar = article.querySelector<HTMLElement>(ACTION_BAR_SELECTOR);

  if (!actionBar) {
    return;
  }

  actionBar.dataset.idcaytBusy = String(isBusy);

  const buttons = Array.from(actionBar.querySelectorAll<HTMLButtonElement>("button"));

  for (const button of buttons) {
    button.disabled = isBusy;
  }
}
