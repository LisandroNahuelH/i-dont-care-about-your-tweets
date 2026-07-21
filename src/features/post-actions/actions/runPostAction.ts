import type { ActionKind } from "../config/actionKinds";
import { openPostMenu } from "./openPostMenu";
import { clickConfirmationIfPresent } from "./clickConfirmationIfPresent";
import { findActionMenuItem } from "./findActionMenuItem";
import { setArticleBusyState } from "../dom/setArticleBusyState";

export async function runPostAction(article: HTMLElement, action: ActionKind): Promise<void> {
  setArticleBusyState(article, true);

  try {
    const menuRoot = await openPostMenu(article);
    const menuItem = findActionMenuItem(menuRoot, action);

    if (!menuItem) {
      throw new Error(`Action item not found: ${action}`);
    }

    menuItem.click();
    await clickConfirmationIfPresent(action);
  } catch (error) {
    console.warn("I Don't Care About Your Tweets action failed.", error);
  } finally {
    setArticleBusyState(article, false);
  }
}
