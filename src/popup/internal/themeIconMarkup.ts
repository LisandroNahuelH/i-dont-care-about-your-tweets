import type { PopupTheme } from "./popupTheme";

export const THEME_ICON_MARKUP: Record<PopupTheme, string> = {
  dark:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.25 14.3A7.85 7.85 0 0 1 9.7 3.75 8.25 8.25 0 1 0 20.25 14.3Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9"/></svg>',
  light:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.25V3.5M12 20.5v-1.75M18.75 12h1.75M3.5 12h1.75M16.77 7.23l1.24-1.24M5.99 18.01l1.24-1.24M16.77 16.77l1.24 1.24M5.99 5.99l1.24 1.24M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9"/></svg>'
};
