export function resolveAfterDelay(
  milliseconds: number,
  resolve: (value: void | PromiseLike<void>) => void
): ReturnType<typeof globalThis.setTimeout> {
  return globalThis.setTimeout(resolve, milliseconds);
}
