export const ACTION_KINDS = ["block", "mute", "dismiss"] as const;

export type ActionKind = (typeof ACTION_KINDS)[number];

export function isActionKind(value: unknown): value is ActionKind {
  return typeof value === "string" && ACTION_KINDS.includes(value as ActionKind);
}
