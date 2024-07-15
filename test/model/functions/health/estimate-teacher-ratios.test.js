import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {teacherRatioTestData} from './data';

const digitsTolerance = 6;

const measuresToTest = new Map([
  ['primarySchoolTeacherToPupilRatio', coverage.estimate.primarySchoolTeacherToPupilRatio],
  ['lowerSchoolTeacherToPupilRatio', coverage.estimate.lowerSchoolTeacherToPupilRatio],
  ['upperSchoolTeacherToPupilRatio', coverage.estimate.upperSchoolTeacherToPupilRatio],
]);

const governanceObserved = governanceObject(
  teacherRatioTestData.observed.CORRUPTION,
  teacherRatioTestData.observed.GOVEFFECT,
  teacherRatioTestData.observed.POLSTAB,
  teacherRatioTestData.observed.REGQUALITY,
  teacherRatioTestData.observed.RULELAW,
  teacherRatioTestData.observed.VOICE,
);

const governanceAdjusted = governanceObject(
  teacherRatioTestData.governanceAdjusted.CORRUPTION,
  teacherRatioTestData.governanceAdjusted.GOVEFFECT,
  teacherRatioTestData.governanceAdjusted.POLSTAB,
  teacherRatioTestData.governanceAdjusted.REGQUALITY,
  teacherRatioTestData.governanceAdjusted.RULELAW,
  teacherRatioTestData.governanceAdjusted.VOICE,
);

measuresToTest.forEach((estimator, measure) => {
  test(`Tests ${measure} estimator with observed grpc and governance`, () => {
    expect(
      estimator(
        teacherRatioTestData.observed[measure],
        teacherRatioTestData.observed.grpc,
        teacherRatioTestData.observed.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBe(teacherRatioTestData.observed[measure]);
  });

  test(`Tests ${measure} estimator: adjusted grpc, observed governance`, () => {
    expect(
      estimator(
        teacherRatioTestData.observed[measure],
        teacherRatioTestData.observed.grpc,
        teacherRatioTestData.grpcAdjusted.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      teacherRatioTestData.grpcAdjusted[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: reduced grpc, observed governance`, () => {
    expect(
      estimator(
        teacherRatioTestData.observed[measure],
        teacherRatioTestData.observed.grpc,
        teacherRatioTestData.grpcReduced.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      teacherRatioTestData.grpcReduced[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: observed grpc, adjusted governance`, () => {
    expect(
      estimator(
        teacherRatioTestData.observed[measure],
        teacherRatioTestData.governanceAdjusted.grpc,
        teacherRatioTestData.governanceAdjusted.grpc,
        governanceObserved,
        governanceAdjusted,
      ),
    ).toBeCloseTo(
      teacherRatioTestData.governanceAdjusted[measure],
      digitsTolerance,
    );
  });
});
