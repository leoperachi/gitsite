(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.MatrixSkillRain = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const DEFAULT_REVEAL_DELAY_STEP = 70;
  const DEFAULT_REVEAL_DURATION = 520;
  const DEFAULT_READABLE_DURATION = 950;
  const DEFAULT_DISSOLVE_DURATION = 650;

  function createSkillReveal({
    text,
    startColumn,
    targetRow,
    now,
    revealDelayStep = DEFAULT_REVEAL_DELAY_STEP,
    revealDuration = DEFAULT_REVEAL_DURATION,
    readableDuration = DEFAULT_READABLE_DURATION,
    dissolveDuration = DEFAULT_DISSOLVE_DURATION,
  }) {
    const letters = text.split("").map((char, index) => ({
      char,
      column: startColumn + index,
      row: targetRow,
      startsAt: now + index * revealDelayStep,
    }));

    const lastLetterStart = letters.length
      ? letters[letters.length - 1].startsAt
      : now;
    const endsAt =
      lastLetterStart + revealDuration + readableDuration + dissolveDuration;

    return {
      text,
      startColumn,
      targetRow,
      now,
      revealDelayStep,
      revealDuration,
      readableDuration,
      dissolveDuration,
      letters,
      endsAt,
    };
  }

  function getRevealGlyph(reveal, column, row, now, randomGlyph) {
    const letter = reveal.letters.find(
      (item) => item.column === column && item.row === row
    );

    if (!letter) {
      return null;
    }

    if (now < letter.startsAt) {
      return {
        glyph: randomGlyph(),
        phase: "rain",
        alpha: 1,
        glow: 0,
      };
    }

    const elapsed = now - letter.startsAt;

    if (elapsed < reveal.revealDuration) {
      const progress = elapsed / reveal.revealDuration;
      const locked = progress > 0.68;
      return {
        glyph: locked ? letter.char : randomGlyph(),
        phase: "forming",
        alpha: 0.45 + progress * 0.4,
        glow: progress * 0.5,
      };
    }

    if (elapsed < reveal.revealDuration + reveal.readableDuration) {
      return {
        glyph: letter.char,
        phase: "readable",
        alpha: 1,
        glow: 1,
      };
    }

    const dissolveElapsed =
      elapsed - reveal.revealDuration - reveal.readableDuration;

    if (dissolveElapsed < reveal.dissolveDuration) {
      const progress = dissolveElapsed / reveal.dissolveDuration;
      return {
        glyph: progress < 0.72 ? letter.char : randomGlyph(),
        phase: "dissolving",
        alpha: Math.max(0, 1 - progress),
        glow: Math.max(0, 1 - progress),
      };
    }

    return {
      glyph: randomGlyph(),
      phase: "rain",
      alpha: 1,
      glow: 0,
    };
  }

  function getRevealStartRow({
    canvasHeight,
    fontSize,
    zoneMinRatio,
    navBottomCanvasY,
    navHeightCanvasY,
    glowPadding,
  }) {
    const topCanvasY = Math.max(
      canvasHeight * zoneMinRatio,
      navBottomCanvasY + navHeightCanvasY + glowPadding
    );

    return Math.ceil(topCanvasY / fontSize);
  }

  return {
    createSkillReveal,
    getRevealGlyph,
    getRevealStartRow,
  };
});
