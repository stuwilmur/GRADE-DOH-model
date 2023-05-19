import * as coverage from '../../../src/model/coverage';
import {governanceObject} from '../../../src/model/governance';
import {testData} from './data';

const digitsTolerance = 6;

const measuresToTest = new Map([
  ['basicSanitation', coverage.estimate.basicSanitation],
  ['basicWater', coverage.estimate.basicWater],
  ['immunisation', coverage.estimate.immunisation],
  ['maternalSurvival', coverage.estimate.maternalSurvival],
  ['safeSanitation', coverage.estimate.safeSanitation],
  ['safeWater', coverage.estimate.safeWater],
  ['schoolAttendance', coverage.estimate.schoolAttendance],
  ['underFiveSurvival', coverage.estimate.underFiveSurvival],
]);

const governanceObserved = governanceObject(
  testData.observed.controlOfCorruption,
  testData.observed.GOVEFFECT,
  testData.observed.POLSTAB,
  testData.observed.REGQUALITY,
  testData.observed.RULELAW,
  testData.observed.VOICE,
);

const governanceAdjusted = governanceObject(
  testData.governanceAdjusted.controlOfCorruption,
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

  test(`tests ${measure} estimator: reduced grpc, observed governance`, () => {
    expect(
      estimator(
        testData.observed[measure],
        testData.observed.grpc,
        testData.grpcReduced.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(testData.grpcReduced[measure], digitsTolerance);
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
