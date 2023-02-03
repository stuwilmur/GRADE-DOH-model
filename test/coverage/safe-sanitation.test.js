const safeSanitation = require('../../src/coverage/safe-sanitation.cjs');

test('checks estimate returns expected value', () => {
  expect(safeSanitation.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(safeSanitation.invert(1)).toBe(1);
});
