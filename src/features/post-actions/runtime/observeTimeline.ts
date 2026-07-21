import { onTimelineMutations } from "./onTimelineMutations";

export function observeTimeline(): MutationObserver {
  const observer = new MutationObserver(onTimelineMutations);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return observer;
}
