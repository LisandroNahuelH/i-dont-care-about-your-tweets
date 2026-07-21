type MessageCatalog = Record<string, { message: string }>;

export function createChromeI18nMock(
  catalog: MessageCatalog,
  locale: string
): typeof chrome {
  return {
    i18n: {
      getMessage: (key: string) => catalog[key]?.message ?? "",
      getUILanguage: () => locale
    },
    storage: {
      local: {
        get: async () => ({}),
        set: async () => ({})
      }
    }
  } as unknown as typeof chrome;
}