import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {schoolAttendanceTestData} from './data';

const digitsTolerance = 6;

const measuresToTest = new Map([
  ['primarySchoolAttendance', coverage.estimate.primarySchoolAttendance],
  ['lowerSchoolAttendance', coverage.estimate.lowerSchoolAttendance],
  ['upperSchoolAttendance', coverage.estimate.upperSchoolAttendance],
]);

const governanceObserved = governanceObject(
  schoolAttendanceTestData.observed.CORRUPTION,
  schoolAttendanceTestData.observed.GOVEFFECT,
  schoolAttendanceTestData.observed.POLSTAB,
  schoolAttendanceTestData.observed.REGQUALITY,
  schoolAttendanceTestData.observed.RULELAW,
  schoolAttendanceTestData.observed.VOICE,
);

const governanceAdjusted = governanceObject(
  schoolAttendanceTestData.governanceAdjusted.CORRUPTION,
  schoolAttendanceTestData.governanceAdjusted.GOVEFFECT,
  schoolAttendanceTestData.governanceAdjusted.POLSTAB,
  schoolAttendanceTestData.governanceAdjusted.REGQUALITY,
  schoolAttendanceTestData.governanceAdjusted.RULELAW,
  schoolAttendanceTestData.governanceAdjusted.VOICE,
);

measuresToTest.forEach((estimator, measure) => {
  test(`Tests ${measure} estimator with observed grpc and governance`, () => {
    expect(
      estimator(
        schoolAttendanceTestData.observed[measure],
        schoolAttendanceTestData.observed.grpc,
        schoolAttendanceTestData.observed.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBe(schoolAttendanceTestData.observed[measure]);
  });

  test(`Tests ${measure} estimator: adjusted grpc, observed governance`, () => {
    expect(
      estimator(
        schoolAttendanceTestData.observed[measure],
        schoolAttendanceTestData.observed.grpc,
        schoolAttendanceTestData.grpcAdjusted.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      schoolAttendanceTestData.grpcAdjusted[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: reduced grpc, observed governance`, () => {
    expect(
      estimator(
        schoolAttendanceTestData.observed[measure],
        schoolAttendanceTestData.observed.grpc,
        schoolAttendanceTestData.grpcReduced.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      schoolAttendanceTestData.grpcReduced[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: observed grpc, adjusted governance`, () => {
    expect(
      estimator(
        schoolAttendanceTestData.observed[measure],
        schoolAttendanceTestData.governanceAdjusted.grpc,
        schoolAttendanceTestData.governanceAdjusted.grpc,
        governanceObserved,
        governanceAdjusted,
      ),
    ).toBeCloseTo(
      schoolAttendanceTestData.governanceAdjusted[measure],
      digitsTolerance,
    );
  });
});
