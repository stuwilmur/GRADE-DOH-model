const immunisation = require('../../src/coverage/immunisation.cjs');

test('checks estimate returns expected value', () => {
  expect(immunisation.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(immunisation.invert(1)).toBe(1);
});
