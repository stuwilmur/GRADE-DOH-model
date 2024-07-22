import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {teacherRatioTestData} from './data';

const digitsTolerance = 5;

const measuresToTest = new Map([
  ['INVPRIMARY', coverage.target.primarySchoolTeacherToPupilRatio],
  ['INVLOWER', coverage.target.lowerSchoolTeacherToPupilRatio],
  ['INVUPPER', coverage.target.upperSchoolTeacherToPupilRatio],
]);

const governanceObserved = governanceObject(
  teacherRatioTestData.observed.CORRUPTION,
  teacherRatioTestData.observed.GOVEFFECT,
  teacherRatioTestData.observed.POLSTAB,
  teacherRatioTestData.observed.REGQUALITY,
  teacherRatioTestData.observed.RULELAW,
  teacherRatioTestData.observed.VOICE,
);

measuresToTest.forEach((targeter, measure) => {
  test(`Tests ${measure} targeting: observed grpc, observed governance`, () => {
    expect(
      targeter(
        teacherRatioTestData.observed[measure],
        teacherRatioTestData.observed.grpc,
        teacherRatioTestData.observed[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(teacherRatioTestData.observed.grpc);
  });

  test(`Tests ${measure} targeting: adjusted grpc, observed governance`, () => {
    expect(
      targeter(
        teacherRatioTestData.observed[measure],
        teacherRatioTestData.observed.grpc,
        teacherRatioTestData.grpcAdjusted[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(teacherRatioTestData.grpcAdjusted.grpc, digitsTolerance);
  });
});
