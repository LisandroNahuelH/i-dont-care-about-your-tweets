import { findMoreButton } from "../dom/findMoreButton";
import { waitForMenuRoot } from "./waitForMenuRoot";

export async function openPostMenu(article: HTMLElement): Promise<HTMLElement> {
  const moreButton = findMoreButton(article);

  if (!moreButton) {
    throw new Error("Post menu trigger not found.");
  }

  moreButton.click();

  return waitForMenuRoot();
}
