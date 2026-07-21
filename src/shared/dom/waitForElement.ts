import { sleep } from "../async/sleep";

export async function waitForElement(selectors: readonly string[], timeoutMs: number): Promise<HTMLElement> {
  const expiresAt = Date.now() + timeoutMs;

  while (Date.now() < expiresAt) {
    for (const selector of selectors) {
      const element = document.querySelector<HTMLElement>(selector);

      if (element) {
        return element;
      }
    }

    await sleep(75);
  }

  throw new Error(`Timed out waiting for selectors: ${selectors.join(", ")}`);
}
