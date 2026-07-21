import { runPostAction } from "../actions/runPostAction";
import { findArticleFromElement } from "../dom/findArticleFromElement";

export async function onDismissButtonClick(event: Event): Promise<void> {
  event.preventDefault();
  event.stopPropagation();

  const article = findArticleFromElement(event.currentTarget);

  if (!article) {
    return;
  }

  await runPostAction(article, "dismiss");
}
