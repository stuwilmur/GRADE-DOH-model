import * as coverage from '../../../src/model/coverage';

test('checks estimateBasicSanitation returns expected value', () => {
  expect(coverage.basicSanitation.estimate(1)).toBe(1);
});

test('checks invertBasicSanitation returns expected value', () => {
  expect(coverage.basicSanitation.invert(1)).toBe(1);
});

test('checks estimateSchoolAttendance returns expected value', () => {
  expect(coverage.schoolAttendance.estimate(1)).toBe(1);
});

test('checks invertSchoolAttendance returns expected value', () => {
  expect(coverage.schoolAttendance.invert(1)).toBe(1);
});

test('checks estimateImmunisation returns expected value', () => {
  expect(coverage.immunisation.estimate(1)).toBe(1);
});

test('checks invertImmunisation returns expected value', () => {
  expect(coverage.immunisation.invert(1)).toBe(1);
});

test('checks estimateMaternalSurvival returns expected value', () => {
  expect(coverage.maternalSurvival.estimate(1)).toBe(1);
});

test('checks invertMaternalSurvival returns expected value', () => {
  expect(coverage.maternalSurvival.invert(1)).toBe(1);
});

test('checks estimateSafeSanitation returns expected value', () => {
  expect(coverage.safeSanitation.estimate(1)).toBe(1);
});

test('checks invertSafeSanitation returns expected value', () => {
  expect(coverage.safeSanitation.invert(1)).toBe(1);
});

test('checks estimateSafeWater returns expected value', () => {
  expect(coverage.safeWater.estimate(1)).toBe(1);
});

test('checks invertSafeWater returns expected value', () => {
  expect(coverage.safeWater.invert(1)).toBe(1);
});

test('checks estimateSchoolAttendance returns expected value', () => {
  expect(coverage.schoolAttendance.estimate(1)).toBe(1);
});

test('checks invertSchoolAttendance returns expected value', () => {
  expect(coverage.schoolAttendance.invert(1)).toBe(1);
});

test('checks estimateUnderFiveSurvival returns expected value', () => {
  expect(coverage.underFiveSurvival.estimate(1)).toBe(1);
});

test('checks invertUnderFiveSurvival returns expected value', () => {
  expect(coverage.underFiveSurvival.invert(1)).toBe(1);
});
