import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';
import {elecFuelsStuntBedsTestData} from './data';

const digitsTolerance = 5;

const measuresToTest = new Map([
  ['electricity', coverage.target.electricity],
  ['cleanFuels', coverage.target.cleanFuels],
  ['stunting', coverage.target.stunting],
  ['hospitalBeds', coverage.target.hospitalBeds],
  ['nurses', coverage.target.nurses],
]);

const governanceObserved = governanceObject(
  elecFuelsStuntBedsTestData.observed.CORRUPTION,
  elecFuelsStuntBedsTestData.observed.GOVEFFECT,
  elecFuelsStuntBedsTestData.observed.POLSTAB,
  elecFuelsStuntBedsTestData.observed.REGQUALITY,
  elecFuelsStuntBedsTestData.observed.RULELAW,
  elecFuelsStuntBedsTestData.observed.VOICE,
);

measuresToTest.forEach((targeter, measure) => {
  test(`Tests ${measure} targeting: observed grpc, observed governance`, () => {
    expect(
      targeter(
        elecFuelsStuntBedsTestData.observed[measure],
        elecFuelsStuntBedsTestData.observed.grpc,
        elecFuelsStuntBedsTestData.observed[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(elecFuelsStuntBedsTestData.observed.grpc);
  });

  test(`Tests ${measure} targeting: adjusted grpc, observed governance`, () => {
    expect(
      targeter(
        elecFuelsStuntBedsTestData.observed[measure],
        elecFuelsStuntBedsTestData.observed.grpc,
        elecFuelsStuntBedsTestData.grpcAdjusted[measure],
        governanceObserved,
      ),
    ).toBeCloseTo(
      elecFuelsStuntBedsTestData.grpcAdjusted.grpc,
      digitsTolerance,
    );
  });
});
