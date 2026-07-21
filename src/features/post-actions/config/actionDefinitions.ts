import type { ActionKind } from "./actionKinds";

export const ACTION_DEFINITIONS: Record<
  ActionKind,
  {
    confirmKeywords: readonly string[];
    keywords: readonly string[];
    messageKey: string;
  }
> = {
  block: {
    confirmKeywords: ["block", "bloquear"],
    keywords: ["block", "bloquear"],
    messageKey: "actionBlock"
  },
  mute: {
    confirmKeywords: [],
    keywords: ["mute", "silenciar"],
    messageKey: "actionMute"
  },
  dismiss: {
    confirmKeywords: [],
    keywords: [
      "not interested",
      "no me interesa",
      "show fewer",
      "mostrar menos",
      "ver menos"
    ],
    messageKey: "actionDismiss"
  }
};
