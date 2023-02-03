const schoolAttendance = require('../../src/coverage/school-attendance.cjs');

test('checks estimate returns expected value', () => {
  expect(schoolAttendance.estimate(1)).toBe(1);
});

test('checks invert returns expected value', () => {
  expect(schoolAttendance.invert(1)).toBe(1);
});
