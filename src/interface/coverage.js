import * as model from '../model';
import * as mt from 'micro-table/dist/module';

export const GrpcMethod = {
  IMPROVED_GRPC: 0,
  ABSOLUTE_ADDITIONAL_REVENUE: 1,
  PER_CAPITA_INCREASE: 2,
  PERCENTAGE_INCREASE: 3,
};

Object.freeze(GrpcMethod);

/**
 * Calculate instantanoeous coverage and associated improvements. This model
 * takes an improvement in GRPC, which may be specified in multiple ways, and
 * optionally, a change in governance. The latter is applied as a constant value
 * which is added to all governance measures. The instantaneous effect of
 * applying the GRPC and governance values is calculated for all rows in the
 * data supplied, where each row corresponds to a single country and year.
 * @param {object} paramsObject Parameters object. Attributes are:
 * grpcValue: the value which, together with a method, is used to define
 * the change in GRPC
 * grpcMethod: the method used to define the change in GRPC
 * governanceDelta: the constant change in governance
 * @param {array} data Base data array
 * @return {array} Base data with additional computed columns
 */
export function instantaneous(
  {
    grpcValue = 0,
    grpcMethod = GrpcMethod.PERCENTAGE_INCREASE,
    governanceDelta = 0,
  },
  data,
) {
  let grpcModel;
  if (grpcMethod == GrpcMethod.IMPROVED_GRPC) {
    grpcModel = mt
      .model()
      .const()
      .called(model.constants.computedColumnNames.IMPROVED_GRPC)
      .value(grpcValue)
      .end()
      .add(model.models.revenue.createGrpcFromImprovedGrpc());
  } else if (grpcMethod == GrpcMethod.ABSOLUTE_ADDITIONAL_REVENUE) {
    grpcModel = mt
      .model()
      .const()
      .called(model.constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE)
      .value(grpcValue)
      .end()
      .add(model.models.revenue.createGrpcFromAbsoluteIncreaseModel());
  } else if (grpcMethod == GrpcMethod.PER_CAPITA_INCREASE) {
    grpcModel = mt
      .model()
      .const()
      .called(model.constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC)
      .value(grpcValue)
      .end()
      .add(model.models.revenue.createGrpcFromPerCapitaIncreaseModel());
  } else if (grpcMethod == GrpcMethod.PERCENTAGE_INCREASE) {
    grpcModel = mt
      .model()
      .const()
      .called(model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC)
      .value(grpcValue)
      .end()
      .add(model.models.revenue.createGrpcFromPercentageIncreaseModel());
  }
  const theModel = grpcModel.add(
    model.models.governance
      .createGovernanceConstantAdjustmentModel(governanceDelta)
      .add(model.models.coverage.createCoverageModel()),
  );
  return theModel.data(data);
}
