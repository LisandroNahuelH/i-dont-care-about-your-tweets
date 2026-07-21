export function findDismissFeedbackCards(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('article[role="article"]'));
}
