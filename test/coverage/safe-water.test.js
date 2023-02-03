const safeWater = require('../../src/coverage/safe-water.cjs');

test('checks estimate returns expected value', () => {
  expect(safeWater.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(safeWater.invert(1)).toBe(1);
});
