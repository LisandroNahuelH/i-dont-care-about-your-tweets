import enMessages from "../../_locales/en/messages.json";

type MessageCatalog = Record<string, { message: string }>;

const FALLBACK_MESSAGES: Record<string, string> = Object.fromEntries(
  Object.entries(enMessages as MessageCatalog).map(([key, entry]) => [key, entry.message])
);

export function getMessage(key: string): string {
  try {
    const translated = globalThis.chrome?.i18n?.getMessage(key);

    if (translated) {
      return translated;
    }
  } catch {
    return FALLBACK_MESSAGES[key] ?? key;
  }

  return FALLBACK_MESSAGES[key] ?? key;
}