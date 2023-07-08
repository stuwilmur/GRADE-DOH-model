import * as model from '../../../src/model';
import * as data from './data/governance';

test(`Tests governance forecast for 10% GRPC increase over 10 years`, () => {
  const result = model.models.governance
    .createGovernanceForecastModel()
    .data(data.input);
  expect(result).toStrictEqual(data.expectedResult);
});
