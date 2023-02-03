const coverage = require('../../src/coverage/index.cjs');

test('checks estimate returns expected value', () => {
  expect(coverage.estimateBasicSanitation(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertBasicSanitation(1)).toBe(1);
});

test('checks estimate returns expected value', () => {
  expect(coverage.estimateSchoolAttendance(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertSchoolAttendance(1)).toBe(1);
});

test('checks estimate returns expected value', () => {
  expect(coverage.estimateImmunisation(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertImmunisation(1)).toBe(1);
});

test('checks estimate returns expected value', () => {
  expect(coverage.estimateMaternalSurvival(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertMaternalSurvival(1)).toBe(1);
});

test('checks estimate returns expected value', () => {
  expect(coverage.estimateSafeSanitation(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertSafeSanitation(1)).toBe(1);
});

test('checks estimate returns expected value', () => {
  expect(coverage.estimateSafeWater(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertSafeWater(1)).toBe(1);
});

test('checks estimate returns expected value', () => {
  expect(coverage.estimateSchoolAttendance(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertSchoolAttendance(1)).toBe(1);
});

test('checks estimate returns expected value', () => {
  expect(coverage.estimateUnderFiveSurvival(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(coverage.invertUnderFiveSurvival(1)).toBe(1);
});
