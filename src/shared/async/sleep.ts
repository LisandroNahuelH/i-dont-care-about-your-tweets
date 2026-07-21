import { resolveAfterDelay } from "./resolveAfterDelay";

export function sleep(milliseconds: number): Promise<void> {
  return new Promise<void>(resolveAfterDelay.bind(null, milliseconds));
}
