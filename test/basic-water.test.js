const mymodule = require('../src/basic-water.cjs');

test('checks a in = a out', () => {
  expect(mymodule.f(1)).toBe(1);
});
