import * as coverage from '../../../src/model/coverage';
import {governance} from '../../../src/model/governance/governance';
import {testData} from './data';

const digitsTolerance = 6;

const measuresToTest = new Map([
  ['basicSanitation', coverage.estimateBasicSanitation],
  ['basicWater', coverage.estimateBasicWater],
  ['immunisation', coverage.estimateImmunisation],
  ['maternalSurvival', coverage.estimateMaternalSurvival],
  ['safeSanitation', coverage.estimateSafeSanitation],
  ['safeWater', coverage.estimateSafeWater],
  ['schoolAttendance', coverage.estimateSchoolAttendance],
  ['underFiveSurvival', coverage.estimateUnderFiveSurvival],
]);

const governanceObserved = governance(
  testData.observed.CORRUPTION,
  testData.observed.GOVEFFECT,
  testData.observed.POLSTAB,
  testData.observed.REGQUALITY,
  testData.observed.RULELAW,
  testData.observed.VOICE,
);

const governanceAdjusted = governance(
  testData.governanceAdjusted.CORRUPTION,
  testData.governanceAdjusted.GOVEFFECT,
  testData.governanceAdjusted.POLSTAB,
  testData.governanceAdjusted.REGQUALITY,
  testData.governanceAdjusted.RULELAW,
  testData.governanceAdjusted.VOICE,
);

measuresToTest.forEach((estimator, measure) => {
  test(`tests ${measure} estimator with observed grpc and governance`, () => {
    expect(
      estimator(
        testData.observed[measure],
        testData.observed.grpc,
        testData.observed.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBe(testData.observed[measure]);
  });

  test(`tests ${measure} estimator: adjusted grpc, observed governance`, () => {
    expect(
      estimator(
        testData.observed[measure],
        testData.observed.grpc,
        testData.grpcAdjusted.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(testData.grpcAdjusted[measure], digitsTolerance);
  });

  test(`tests ${measure} estimator: observed grpc, adjusted governance`, () => {
    expect(
      estimator(
        testData.observed[measure],
        testData.governanceAdjusted.grpc,
        testData.governanceAdjusted.grpc,
        governanceObserved,
        governanceAdjusted,
      ),
    ).toBeCloseTo(testData.governanceAdjusted[measure], digitsTolerance);
  });
});
