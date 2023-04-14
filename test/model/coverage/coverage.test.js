import * as coverage from '../../../src/model/coverage';
import {governance} from '../../../src/model/governance/governance';

const digitsTolerance = 6;

const testData = {
  observed: {
    basicSanitation: 34.177,
    basicWater: 48.3564,
    immunisation: 66,
    maternalSurvival: 99.046,
    safeSanitation: 24,
    safeWater: 40,
    schoolAttendance: 53.16671,
    underFiveSurvival: 91.2,
    grpc: 60.2629,
    CORRUPTION: -1.635723,
    GOVEFFECT: -1.454683,
    POLSTAB: -2.579152,
    REGQUALITY: -1.532861,
    RULELAW: -1.845436,
    VOICE: -1.404468,
  },
  grpcAdjusted: {
    basicSanitation: 45.11774601,
    basicWater: 48.72370929,
    immunisation: 66.68229417,
    maternalSurvival: 99.31058509,
    safeSanitation: 24.20201772,
    safeWater: 38.47602737,
    schoolAttendance: 53.33761751,
    underFiveSurvival: 92.52186747,
    grpc: 300,
    CORRUPTION: -1.635723,
    GOVEFFECT: -1.454683,
    POLSTAB: -2.579152,
    REGQUALITY: -1.532861,
    RULELAW: -1.845436,
    VOICE: -1.404468,
  },
  governanceAdjusted: {
    basicSanitation: 34.83590089,
    basicWater: 52.21419976,
    safeWater: 38.23221688,
    immunisation: 68.18732436,
    maternalSurvival: 99.0711365,
    safeSanitation: 23.8941846,
    schoolAttendance: 54.65295384,
    underFiveSurvival: 91.89284213,
    grpc: 60.2629,
    CORRUPTION: -1.535723,
    GOVEFFECT: -1.354683,
    POLSTAB: -2.479152,
    REGQUALITY: -1.432861,
    RULELAW: -1.745436,
    VOICE: -1.304468,
  },
};

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
