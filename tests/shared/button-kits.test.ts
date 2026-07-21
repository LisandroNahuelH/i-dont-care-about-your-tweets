import assert from "node:assert/strict";
import {
  BUTTON_KITS,
  DEFAULT_BUTTON_KIT_ID,
  getButtonKit,
  isButtonKitId,
  normalizeButtonKitId
} from "../../src/shared/button-kits";

assert.equal(isButtonKitId("classic"), true);
assert.equal(isButtonKitId("unknown-kit"), false);
assert.equal(normalizeButtonKitId("minimal"), "minimal");
assert.equal(normalizeButtonKitId("unknown-kit"), DEFAULT_BUTTON_KIT_ID);
assert.equal(normalizeButtonKitId(null), DEFAULT_BUTTON_KIT_ID);

assert.deepEqual(
  BUTTON_KITS.map((kit) => kit.id),
  ["classic", "minimal", "bold", "sharp", "soft"]
);

for (const kit of BUTTON_KITS) {
  assert.match(kit.icons.block, /^<svg[\s\S]+<\/svg>$/);
  assert.match(kit.icons.mute, /^<svg[\s\S]+<\/svg>$/);
  assert.match(kit.icons.dismiss, /^<svg[\s\S]+<\/svg>$/);
}

assert.equal(getButtonKit("soft").id, "soft");
assert.equal(getButtonKit("not-real").id, DEFAULT_BUTTON_KIT_ID);

console.log("button-kits.test.ts passed");
