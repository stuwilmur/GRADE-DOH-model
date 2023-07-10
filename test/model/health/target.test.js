import * as coverage from '../../../src/model/health';
import {governanceObject} from '../../../src/model/governance';
import {testData} from './data';

const digitsTolerance = 5;

const measuresToTest = new Map([
  ['basicSanitation', coverage.target.basicSanitation],
  ['basicWater', coverage.target.basicWater],
  ['immunisation', coverage.target.immunisation],
  ['maternalSurvival', coverage.target.maternalSurvival],
  ['safeSanitation', coverage.target.safeSanitation],
  ['safeWater', coverage.target.safeWater],
  ['schoolAttendance', coverage.target.schoolAttendance],
  ['underFiveSurvival', coverage.target.underFiveSurvival],
]);

const governanceObserved = governanceObject(
  testData.observed.CORRUPTION,
  testData.observed.GOVEFFECT,
  testData.observed.POLSTAB,
  testData.observed.REGQUALITY,
  testData.observed.RULELAW,
  testData.observed.VOICE,
);

measuresToTest.forEach((targeter, measure) => {
  test(`Tests ${measure} targeting: observed grpc, observed governance`, () => {
    expect(
      targeter(
        testData.observed[measure],
        testData.observed.grpc,
        testData.observed[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(testData.observed.grpc);
  });

  /*
  Safe water is a special case, as for the test data, and increase in grpc
  leads to a worsening of coverage. This means the target calculation will
  return NaN, since the coverage target is less than the observed coverage.
  As a special case for safe water, use the test data for reduced grpc, for
  which the coverage value is greater than that observed
  */
  const grpcAdjusted =
    measure == 'safeWater' ? testData.grpcReduced : testData.grpcAdjusted;

  test(`Tests ${measure} targeting: adjusted grpc, observed governance`, () => {
    expect(
      targeter(
        testData.observed[measure],
        testData.observed.grpc,
        grpcAdjusted[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(grpcAdjusted.grpc, digitsTolerance);
  });
});
