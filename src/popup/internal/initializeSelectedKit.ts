import { readStoredKitId } from "./readStoredKitId";
import { setSelectedKit } from "./setSelectedKit";

export function initializeSelectedKit(): void {
  void readStoredKitId().then(setSelectedKit);
}
