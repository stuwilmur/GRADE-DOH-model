const basicWater = require('../src/basic-water.cjs');

test('checks estimate returns expected value', () => {
  expect(basicWater.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(basicWater.invert(1)).toBe(1);
});
