const underFiveSurvival = require('../../src/coverage/under-five-survival.cjs');

test('checks estimate returns expected value', () => {
  expect(underFiveSurvival.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(underFiveSurvival.invert(1)).toBe(1);
});
