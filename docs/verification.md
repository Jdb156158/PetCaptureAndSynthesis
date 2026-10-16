# Verification · 2026-10-16

## Reference and implementation

The supplied 49.57-second video shows a vertical claw-operated merging game: move the claw, release a circular pet, let equal levels combine in a slanted basket, track score, preview the next pet, and use support tools. Its later section shows chain merges and a temporary celebration background. Menu sections include a collection and skins.

MOMO recreates the drop / collision / merge loop, claw motion, next-pet preview, score, collection, pause and restart, and support actions. The original forest-spirit characters, soft forest artwork, nine-stage progression, exact scores, tool limits, three-second overflow rule, and ninth-stage win condition are implementation choices. There are no ads, stamina gates, copied skins, or copied character assets.

## Logic checks

`node --test tests/game.test.cjs`: 9 / 9 passed.

- Equal-level collision creates one next-level body and awards the correct score.
- Three-body contact cannot consume a body twice.
- Different levels remain separate and settle inside the basket.
- Held-pet release, aim limits and drop cooldown work.
- Pause freezes simulation time and body movement.
- Swap/remove charges and selected-body removal behave correctly.
- Falling pets get a grace period; sustained overflow ends the round.
- Merging two eighth-stage pets wins and creates the Forest Guardian.
- A prolonged normal drop sequence keeps finite body positions inside the playfield.

## Browser checks

Automated browser checks used installed Chrome through Playwright.

- Real pointer clicks caused merges, increased score, and unlocked collection entries.
- Pause/resume, all three tools, collection details, help, audio toggle, restart and record persistence passed.
- Touch emulation dispatched touch-start, drag and release, and verified the resulting merge score.
- No horizontal overflow at 320, 390, 768, 1024 and 1440 CSS pixels.
- No page JavaScript errors during the tested flows.
- Desktop and full-page mobile screenshots were inspected. The next-pet preview is inside the playfield, visible on small screens.

Machine-readable local result: [browser-qa.json](browser-qa.json).

This verifies browser behavior under desktop Chrome and mobile touch emulation; it does not claim testing on a physical phone. Sound generation was checked for errors and switch state, not audited by listening. Win and overflow rules were exercised at the simulation level.
