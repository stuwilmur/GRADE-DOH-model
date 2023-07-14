import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {schoolAttendanceTestData} from './data';

const digitsTolerance = 5;

const measuresToTest = new Map([
  ['primarySchoolAttendance', coverage.target.primarySchoolAttendance],
  ['lowerSchoolAttendance', coverage.target.lowerSchoolAttendance],
  ['upperSchoolAttendance', coverage.target.upperSchoolAttendance],
]);

const governanceObserved = governanceObject(
  schoolAttendanceTestData.observed.CORRUPTION,
  schoolAttendanceTestData.observed.GOVEFFECT,
  schoolAttendanceTestData.observed.POLSTAB,
  schoolAttendanceTestData.observed.REGQUALITY,
  schoolAttendanceTestData.observed.RULELAW,
  schoolAttendanceTestData.observed.VOICE,
);

measuresToTest.forEach((targeter, measure) => {
  test(`Tests ${measure} targeting: observed grpc, observed governance`, () => {
    expect(
      targeter(
        schoolAttendanceTestData.observed[measure],
        schoolAttendanceTestData.observed.grpc,
        schoolAttendanceTestData.observed[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(schoolAttendanceTestData.observed.grpc);
  });

  test(`Tests ${measure} targeting: adjusted grpc, observed governance`, () => {
    expect(
      targeter(
        schoolAttendanceTestData.observed[measure],
        schoolAttendanceTestData.observed.grpc,
        schoolAttendanceTestData.grpcAdjusted[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(schoolAttendanceTestData.grpcAdjusted.grpc, digitsTolerance);
  });
});
