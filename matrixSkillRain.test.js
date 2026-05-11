const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createSkillReveal,
  getRevealGlyph,
  getRevealColumnRange,
  getRevealRowRange,
  getRevealStartRow,
} = require("./matrixSkillRain");

test("createSkillReveal places each skill letter on real matrix columns", () => {
  const reveal = createSkillReveal({
    text: "REACT",
    startColumn: 12,
    targetRow: 8,
    now: 1000,
  });

  assert.deepEqual(
    reveal.letters.map((letter) => ({
      char: letter.char,
      column: letter.column,
      row: letter.row,
    })),
    [
      { char: "R", column: 12, row: 8 },
      { char: "E", column: 13, row: 8 },
      { char: "A", column: 14, row: 8 },
      { char: "C", column: 15, row: 8 },
      { char: "T", column: 16, row: 8 },
    ]
  );
});

test("getRevealGlyph transitions from rain to readable letter and back", () => {
  const reveal = createSkillReveal({
    text: "JS",
    startColumn: 3,
    targetRow: 4,
    now: 1000,
    revealDelayStep: 100,
    revealDuration: 300,
    readableDuration: 500,
    dissolveDuration: 300,
  });

  const before = getRevealGlyph(reveal, 3, 4, 950, () => "#");
  assert.equal(before.glyph, "#");
  assert.equal(before.phase, "rain");

  const readable = getRevealGlyph(reveal, 3, 4, 1450, () => "#");
  assert.equal(readable.glyph, "J");
  assert.equal(readable.phase, "readable");
  assert.ok(readable.alpha > 0.8);

  const after = getRevealGlyph(reveal, 3, 4, 2200, () => "#");
  assert.equal(after.glyph, "#");
  assert.equal(after.phase, "rain");
});

test("getRevealStartRow keeps reveal text at least one navbar height below the navbar", () => {
  const row = getRevealStartRow({
    canvasHeight: 900,
    fontSize: 10,
    zoneMinRatio: 0.12,
    navBottomCanvasY: 24,
    navHeightCanvasY: 24,
    glowPadding: 22,
  });

  assert.equal(row, 11);
  assert.ok(row >= Math.ceil((24 + 24 + 22) / 10));
});

test("getRevealColumnRange shifts long mobile labels left so they fit the visible canvas", () => {
  const range = getRevealColumnRange({
    canvasWidth: 390,
    fontSize: 10,
    zoneMinRatio: 0.18,
    zoneMaxRatio: 0.46,
    textLength: "JAVASCRIPT DEV".length,
    totalColumns: 39,
  });

  assert.equal(range.minColumn, 3);
  assert.equal(range.maxColumn, 3);
  assert.ok(range.maxColumn + "JAVASCRIPT DEV".length <= Math.floor((390 * 0.46) / 10));
});

test("getRevealRowRange keeps mobile reveals inside the visible bottom half", () => {
  // On ≤768px the canvas is bottom-pinned (height: 200%), so the visible portion
  // of the canvas internal coords is its bottom half. Spawn ratios target that half.
  const range = getRevealRowRange({
    canvasHeight: 844,
    fontSize: 10,
    zoneMinRatio: 0.62,
    zoneMaxRatio: 0.92,
    // Mobile navBottom is past canvas.height/2 because the navbar sits in the
    // visible bottom half once the canvas is pinned to .hero's bottom.
    navBottomCanvasY: 450,
    navHeightCanvasY: 28,
    glowPadding: 22,
  });

  assert.ok(range.minRow * 10 >= 844 * 0.5, "minRow lands in the visible bottom half");
  assert.ok(range.minRow >= Math.ceil((450 + 28 + 22) / 10), "stays clear of the navbar");
  assert.ok(range.maxRow >= range.minRow);
  assert.ok(range.maxRow * 10 <= 844, "maxRow stays inside the canvas");
});
