export const BUTTON_KIT_STORAGE_KEY = "idcaytButtonKit";
export const DEFAULT_BUTTON_KIT_ID = "classic";

export type ButtonKitId = "classic" | "minimal" | "bold" | "sharp" | "soft";
export type ButtonKitAction = "block" | "mute" | "dismiss";
export type ButtonKitIconMarkup = Record<ButtonKitAction, string>;

export interface ButtonKit {
  descriptionKey: string;
  icons: ButtonKitIconMarkup;
  id: ButtonKitId;
  nameKey: string;
}

export const BUTTON_KITS: readonly ButtonKit[] = [
  {
    id: "classic",
    nameKey: "kitClassicName",
    descriptionKey: "kitClassicDescription",
    icons: {
      block:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 5.5 18.5 18.5M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
      dismiss:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h15m-4.5-4.5 4.5 4.5-4.5 4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
      mute:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.75 14.25h3.5l4.75 3.75V6l-4.75 3.75h-3.5ZM16 9.25l4 5.5M20 9.25l-4 5.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>'
    }
  },
  {
    id: "minimal",
    nameKey: "kitMinimalName",
    descriptionKey: "kitMinimalDescription",
    icons: {
      block:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.75 6.75 17.25 17.25M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.45"/></svg>',
      dismiss:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h11.5M14 8.5l3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.45"/></svg>',
      mute:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14h2.75L13 17.25V6.75L8.75 10H6ZM16.25 10l3 4M19.25 10l-3 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.45"/></svg>'
    }
  },
  {
    id: "bold",
    nameKey: "kitBoldName",
    descriptionKey: "kitBoldDescription",
    icons: {
      block:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.25 5.25 18.75 18.75M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.35"/></svg>',
      dismiss:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.25 12h15.25M14.5 7.25 19.5 12l-5 4.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.35"/></svg>',
      mute:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 14.5h3.75l5.25 4.25V5.25L8.25 9.5H4.5ZM16.25 8.75l4 6.5M20.25 8.75l-4 6.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.35"/></svg>'
    }
  },
  {
    id: "sharp",
    nameKey: "kitSharpName",
    descriptionKey: "kitSharpDescription",
    icons: {
      block:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h10l2 2v10l-2 2H7l-2-2V7l2-2ZM6.5 6.5l11 11" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.8"/></svg>',
      dismiss:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.75 12h13.5M14.25 7.5 19 12l-4.75 4.5M4.75 7.5h4.5M4.75 16.5h4.5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.8"/></svg>',
      mute:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 14.25h3.5l4.5 3.5V6.25l-4.5 3.5H5ZM16 9l4 6M20 9l-4 6" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.8"/></svg>'
    }
  },
  {
    id: "soft",
    nameKey: "kitSoftName",
    descriptionKey: "kitSoftDescription",
    icons: {
      block:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 6.2 17.8 17.8M12 4.25c4.28 0 7.75 3.47 7.75 7.75S16.28 19.75 12 19.75 4.25 16.28 4.25 12 7.72 4.25 12 4.25Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"/></svg>',
      dismiss:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.25 12h12.5M14.25 8.25 18 12l-3.75 3.75M6.5 8.75c1.35-1.2 3.1-1.8 5.25-1.8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"/></svg>',
      mute:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.25 14.25h3.25l4.75 3.75V6L8.5 9.75H5.25ZM16.15 9.5c1.1 1.35 1.1 3.65 0 5M19 8.25c1.75 2.1 1.75 5.4 0 7.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"/></svg>'
    }
  }
] as const;

const BUTTON_KIT_IDS = new Set<ButtonKitId>(BUTTON_KITS.map((kit) => kit.id));
const BUTTON_KIT_BY_ID = Object.fromEntries(BUTTON_KITS.map((kit) => [kit.id, kit])) as Record<ButtonKitId, ButtonKit>;

export function isButtonKitId(value: unknown): value is ButtonKitId {
  return typeof value === "string" && BUTTON_KIT_IDS.has(value as ButtonKitId);
}

export function normalizeButtonKitId(value: unknown): ButtonKitId {
  return isButtonKitId(value) ? value : DEFAULT_BUTTON_KIT_ID;
}

export function getButtonKit(value: unknown): ButtonKit {
  return BUTTON_KIT_BY_ID[normalizeButtonKitId(value)];
}