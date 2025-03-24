import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {electricityCleanFuelsStuntingTestData} from './data';

const digitsTolerance = 6;

const measuresToTest = new Map([
  ['electricity', coverage.estimate.electricity],
  ['cleanFuels', coverage.estimate.cleanFuels],
  ['stunting', coverage.estimate.stunting],
]);

const governanceObserved = governanceObject(
  electricityCleanFuelsStuntingTestData.observed.CORRUPTION,
  electricityCleanFuelsStuntingTestData.observed.GOVEFFECT,
  electricityCleanFuelsStuntingTestData.observed.POLSTAB,
  electricityCleanFuelsStuntingTestData.observed.REGQUALITY,
  electricityCleanFuelsStuntingTestData.observed.RULELAW,
  electricityCleanFuelsStuntingTestData.observed.VOICE,
);

const governanceAdjusted = governanceObject(
  electricityCleanFuelsStuntingTestData.governanceAdjusted.CORRUPTION,
  electricityCleanFuelsStuntingTestData.governanceAdjusted.GOVEFFECT,
  electricityCleanFuelsStuntingTestData.governanceAdjusted.POLSTAB,
  electricityCleanFuelsStuntingTestData.governanceAdjusted.REGQUALITY,
  electricityCleanFuelsStuntingTestData.governanceAdjusted.RULELAW,
  electricityCleanFuelsStuntingTestData.governanceAdjusted.VOICE,
);

measuresToTest.forEach((estimator, measure) => {
  test(`Tests ${measure} estimator with observed grpc and governance`, () => {
    expect(
      estimator(
        electricityCleanFuelsStuntingTestData.observed[measure],
        electricityCleanFuelsStuntingTestData.observed.grpc,
        electricityCleanFuelsStuntingTestData.observed.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBe(electricityCleanFuelsStuntingTestData.observed[measure]);
  });

  test(`Tests ${measure} estimator: adjusted grpc, observed governance`, () => {
    expect(
      estimator(
        electricityCleanFuelsStuntingTestData.observed[measure],
        electricityCleanFuelsStuntingTestData.observed.grpc,
        electricityCleanFuelsStuntingTestData.grpcAdjusted.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      electricityCleanFuelsStuntingTestData.grpcAdjusted[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: reduced grpc, observed governance`, () => {
    expect(
      estimator(
        electricityCleanFuelsStuntingTestData.observed[measure],
        electricityCleanFuelsStuntingTestData.observed.grpc,
        electricityCleanFuelsStuntingTestData.grpcReduced.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      electricityCleanFuelsStuntingTestData.grpcReduced[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: observed grpc, adjusted governance`, () => {
    expect(
      estimator(
        electricityCleanFuelsStuntingTestData.observed[measure],
        electricityCleanFuelsStuntingTestData.governanceAdjusted.grpc,
        electricityCleanFuelsStuntingTestData.governanceAdjusted.grpc,
        governanceObserved,
        governanceAdjusted,
      ),
    ).toBeCloseTo(
      electricityCleanFuelsStuntingTestData.governanceAdjusted[measure],
      digitsTolerance,
    );
  });
});
