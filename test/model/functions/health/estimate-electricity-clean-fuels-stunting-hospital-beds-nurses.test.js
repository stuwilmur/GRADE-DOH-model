import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {elecFuelsStuntBedsTestData} from './data';

const digitsTolerance = 6;

const measuresToTest = new Map([
  ['electricity', coverage.estimate.electricity],
  ['cleanFuels', coverage.estimate.cleanFuels],
  ['stunting', coverage.estimate.stunting],
  ['hospitalBeds', coverage.estimate.hospitalBeds],
  ['nurses', coverage.estimate.nurses],
]);

const governanceObserved = governanceObject(
  elecFuelsStuntBedsTestData.observed.CORRUPTION,
  elecFuelsStuntBedsTestData.observed.GOVEFFECT,
  elecFuelsStuntBedsTestData.observed.POLSTAB,
  elecFuelsStuntBedsTestData.observed.REGQUALITY,
  elecFuelsStuntBedsTestData.observed.RULELAW,
  elecFuelsStuntBedsTestData.observed.VOICE,
);

const governanceAdjusted = governanceObject(
  elecFuelsStuntBedsTestData.governanceAdjusted.CORRUPTION,
  elecFuelsStuntBedsTestData.governanceAdjusted.GOVEFFECT,
  elecFuelsStuntBedsTestData.governanceAdjusted.POLSTAB,
  elecFuelsStuntBedsTestData.governanceAdjusted.REGQUALITY,
  elecFuelsStuntBedsTestData.governanceAdjusted.RULELAW,
  elecFuelsStuntBedsTestData.governanceAdjusted.VOICE,
);

measuresToTest.forEach((estimator, measure) => {
  test(`Tests ${measure} estimator with observed grpc and governance`, () => {
    expect(
      estimator(
        elecFuelsStuntBedsTestData.observed[measure],
        elecFuelsStuntBedsTestData.observed.grpc,
        elecFuelsStuntBedsTestData.observed.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      elecFuelsStuntBedsTestData.observed[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: adjusted grpc, observed governance`, () => {
    expect(
      estimator(
        elecFuelsStuntBedsTestData.observed[measure],
        elecFuelsStuntBedsTestData.observed.grpc,
        elecFuelsStuntBedsTestData.grpcAdjusted.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      elecFuelsStuntBedsTestData.grpcAdjusted[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: reduced grpc, observed governance`, () => {
    expect(
      estimator(
        elecFuelsStuntBedsTestData.observed[measure],
        elecFuelsStuntBedsTestData.observed.grpc,
        elecFuelsStuntBedsTestData.grpcReduced.grpc,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(
      elecFuelsStuntBedsTestData.grpcReduced[measure],
      digitsTolerance,
    );
  });

  test(`Tests ${measure} estimator: observed grpc, adjusted governance`, () => {
    expect(
      estimator(
        elecFuelsStuntBedsTestData.observed[measure],
        elecFuelsStuntBedsTestData.governanceAdjusted.grpc,
        elecFuelsStuntBedsTestData.governanceAdjusted.grpc,
        governanceObserved,
        governanceAdjusted,
      ),
    ).toBeCloseTo(
      elecFuelsStuntBedsTestData.governanceAdjusted[measure],
      digitsTolerance,
    );
  });
});
