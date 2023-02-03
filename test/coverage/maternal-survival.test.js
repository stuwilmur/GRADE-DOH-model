const maternalSurvival = require('../../src/coverage/maternal-survival.cjs');

test('checks estimate returns expected value', () => {
  expect(maternalSurvival.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(maternalSurvival.invert(1)).toBe(1);
});
