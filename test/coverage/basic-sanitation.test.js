const basicSanitation = require('../../src/coverage/basic-sanitation.cjs');

test('checks estimate returns expected value', () => {
  expect(basicSanitation.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(basicSanitation.invert(1)).toBe(1);
});
