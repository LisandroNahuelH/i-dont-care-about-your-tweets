import assert from "node:assert/strict";
import { normalizeText } from "../../src/shared/text/normalizeText";

assert.equal(normalizeText("  No   me interesa  "), "no me interesa");
assert.equal(normalizeText("Bloquéar"), "bloquear");
assert.equal(normalizeText("Mute   @Cuenta"), "mute @cuenta");

console.log("normalizeText.test.ts passed");
