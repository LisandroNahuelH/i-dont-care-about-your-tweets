import assert from "node:assert/strict";
import { matchesDismissFeedbackCardText } from "../../src/features/post-actions/actions/matchesDismissFeedbackCardText";

assert.equal(
  matchesDismissFeedbackCardText("Gracias. X usará esto para mejorar tu Cronología. Deshacer"),
  true
);
assert.equal(
  matchesDismissFeedbackCardText("Thanks. X will use this to improve your timeline. Undo"),
  true
);
assert.equal(matchesDismissFeedbackCardText("Mostrar menos posts de ybhrdwj"), false);
assert.equal(matchesDismissFeedbackCardText("Deshacer"), false);

console.log("matchesDismissFeedbackCardText.test.ts passed");
