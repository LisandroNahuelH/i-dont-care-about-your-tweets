import type { ButtonKitId } from "../../shared/button-kits";
import { setSelectedKit } from "./setSelectedKit";
import { writeStoredKitId } from "./writeStoredKitId";

export async function selectKit(kitId: ButtonKitId): Promise<void> {
  setSelectedKit(kitId);
  await writeStoredKitId(kitId);
}
