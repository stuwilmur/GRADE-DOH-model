const coverage = require('../../../src/model/coverage/index.cjs');

test('checks estimateBasicSanitation returns expected value', () => {
  expect(coverage.estimateBasicSanitation(1)).toBe(1);
});

test('checks invertBasicSanitation returns expected value', () => {
  expect(coverage.invertBasicSanitation(1)).toBe(1);
});

test('checks estimateSchoolAttendance returns expected value', () => {
  expect(coverage.estimateSchoolAttendance(1)).toBe(1);
});

test('checks invertSchoolAttendance returns expected value', () => {
  expect(coverage.invertSchoolAttendance(1)).toBe(1);
});

test('checks estimateImmunisation returns expected value', () => {
  expect(coverage.estimateImmunisation(1)).toBe(1);
});

test('checks invertImmunisation returns expected value', () => {
  expect(coverage.invertImmunisation(1)).toBe(1);
});

test('checks estimateMaternalSurvival returns expected value', () => {
  expect(coverage.estimateMaternalSurvival(1)).toBe(1);
});

test('checks invertMaternalSurvival returns expected value', () => {
  expect(coverage.invertMaternalSurvival(1)).toBe(1);
});

test('checks estimateSafeSanitation returns expected value', () => {
  expect(coverage.estimateSafeSanitation(1)).toBe(1);
});

test('checks invertSafeSanitation returns expected value', () => {
  expect(coverage.invertSafeSanitation(1)).toBe(1);
});

test('checks estimateSafeWater returns expected value', () => {
  expect(coverage.estimateSafeWater(1)).toBe(1);
});

test('checks invertSafeWater returns expected value', () => {
  expect(coverage.invertSafeWater(1)).toBe(1);
});

test('checks estimateSchoolAttendance returns expected value', () => {
  expect(coverage.estimateSchoolAttendance(1)).toBe(1);
});

test('checks invertSchoolAttendance returns expected value', () => {
  expect(coverage.invertSchoolAttendance(1)).toBe(1);
});

test('checks estimateUnderFiveSurvival returns expected value', () => {
  expect(coverage.estimateUnderFiveSurvival(1)).toBe(1);
});

test('checks invertUnderFiveSurvival returns expected value', () => {
  expect(coverage.invertUnderFiveSurvival(1)).toBe(1);
});
