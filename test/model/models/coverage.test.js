import * as model from '../../../src/model';
import * as data from './data/coverage';

test(`Tests coverage for 10% increase in GRPC, no governance adjustment,
 for a single country and year`, () => {
  const result = model.models.governance
    .createGovernanceConstantAdjustmentModel(0)
    .add(model.models.revenue.createGrpcFromPercentageIncreaseModel())
    .add(model.models.coverage.createCoverageModel())
    .data(data.input);
  expect(result).toStrictEqual(data.expectedResult);
});
