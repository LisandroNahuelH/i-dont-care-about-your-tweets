export const ACTION_BAR_HOST_SELECTOR = '[data-testid="User-Name"] time';
export const ACTION_BAR_SELECTOR = '[data-idcayt-bar="true"]';
export const CONFIRMATION_BUTTON_SELECTORS = [
  'button[data-testid="confirmationSheetConfirm"]',
  'div[data-testid="confirmationSheet"] button',
  '[role="dialog"] button'
] as const;
export const MENU_ROOT_SELECTORS = [
  'div[data-testid="Dropdown"]',
  'div[role="menu"]'
] as const;
export const MORE_BUTTON_SELECTORS = [
  'button[data-testid="caret"]',
  'div[data-testid="caret"][role="button"]',
  'button[aria-haspopup="menu"]',
  'div[aria-haspopup="menu"][role="button"]'
] as const;
export const TWEET_ARTICLE_SELECTOR = 'article[data-testid="tweet"], article[role="article"]';
