import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {electricityCleanFuelsStuntingTestData} from './data';

const digitsTolerance = 5;

const measuresToTest = new Map([
  ['electricity', coverage.target.electricity],
  ['cleanFuels', coverage.target.cleanFuels],
  ['stunting', coverage.target.stunting],
]);

const governanceObserved = governanceObject(
  electricityCleanFuelsStuntingTestData.observed.CORRUPTION,
  electricityCleanFuelsStuntingTestData.observed.GOVEFFECT,
  electricityCleanFuelsStuntingTestData.observed.POLSTAB,
  electricityCleanFuelsStuntingTestData.observed.REGQUALITY,
  electricityCleanFuelsStuntingTestData.observed.RULELAW,
  electricityCleanFuelsStuntingTestData.observed.VOICE,
);

measuresToTest.forEach((targeter, measure) => {
  test(`Tests ${measure} targeting: observed grpc, observed governance`, () => {
    expect(
      targeter(
        electricityCleanFuelsStuntingTestData.observed[measure],
        electricityCleanFuelsStuntingTestData.observed.grpc,
        electricityCleanFuelsStuntingTestData.observed[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(electricityCleanFuelsStuntingTestData.observed.grpc);
  });

  test(`Tests ${measure} targeting: adjusted grpc, observed governance`, () => {
    expect(
      targeter(
        electricityCleanFuelsStuntingTestData.observed[measure],
        electricityCleanFuelsStuntingTestData.observed.grpc,
        electricityCleanFuelsStuntingTestData.grpcAdjusted[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(
      electricityCleanFuelsStuntingTestData.grpcAdjusted.grpc,
      digitsTolerance,
    );
  });
});
