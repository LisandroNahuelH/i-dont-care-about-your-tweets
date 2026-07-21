import assert from "node:assert/strict";
import { matchesActionLabel } from "../../src/features/post-actions/actions/matchesActionLabel";

assert.equal(matchesActionLabel("block", "Block @alice"), true);
assert.equal(matchesActionLabel("mute", "Silenciar @alice"), true);
assert.equal(matchesActionLabel("dismiss", "Not interested in this post"), true);
assert.equal(matchesActionLabel("dismiss", "Mostrar menos publicaciones como esta"), true);
assert.equal(matchesActionLabel("block", "Follow @alice"), false);

console.log("matchesActionLabel.test.ts passed");
