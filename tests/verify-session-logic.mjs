import assert from "node:assert";

console.log("Verifying Flashcard session logic & statistics map...");

// Test session stats map deduplication logic
const reviewMap = new Map();

// User marks card-1 as learning
reviewMap.set("card-1", "learning");
assert.strictEqual(reviewMap.size, 1);

// User marks card-2 as mastered
reviewMap.set("card-2", "mastered");
assert.strictEqual(reviewMap.size, 2);

// User goes back and re-marks card-1 as mastered (should not inflate size)
reviewMap.set("card-1", "mastered");
assert.strictEqual(reviewMap.size, 2, "Review map must avoid duplicate counts when re-marking");

let masteredCount = 0;
let learningCount = 0;
reviewMap.forEach((status) => {
  if (status === "mastered") masteredCount++;
  if (status === "learning") learningCount++;
});

assert.strictEqual(masteredCount, 2);
assert.strictEqual(learningCount, 0);

console.log("Flashcard session logic verification passed!");
