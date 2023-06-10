import * as model from '../../../src/model';
const data = {
  [model.constants.computedColumnNames.IMPROVED_GRPC]: 120,
  [model.constants.columnNames.GRPC_UNUWIDER]: 100,
  [model.constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE]: 1000,
  [model.constants.columnNames.POPTOTAL]: 50,
  [model.constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC]: 20,
  [model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC]: 20,
};

test(`test GrpcFromAbsoluteIncreaseModel model `, () => {
  const result = model.models.revenue
    .createGrpcFromAbsoluteIncreaseModel()
    .data([data])[0];
  result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC] =
    Math.round(
      result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC],
    );
  expect(result).toStrictEqual(data);
});

test(`test GrpcFromPerCapitaIncreaseModel model `, () => {
  const result = model.models.revenue
    .createGrpcFromPerCapitaIncreaseModel()
    .data([data])[0];
  result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC] =
    Math.round(
      result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC],
    );
  expect(result).toStrictEqual(data);
});

test(`test GrpcFromPercentageIncreaseModel model `, () => {
  const result = model.models.revenue
    .createGrpcFromPercentageIncreaseModel()
    .data([data])[0];
  result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC] =
    Math.round(
      result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC],
    );
  expect(result).toStrictEqual(data);
});

test(`test GrpcFromImprovedGrpc model `, () => {
  const result = model.models.revenue
    .createGrpcFromImprovedGrpc()
    .data([data])[0];
  result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC] =
    Math.round(
      result[model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC],
    );
  expect(result).toStrictEqual(data);
});
