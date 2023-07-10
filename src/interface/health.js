import * as model from '../model';
import * as mt from 'micro-table/dist/module';

export const GrpcMethod = {
  IMPROVED_GRPC: 0,
  ABSOLUTE_ADDITIONAL_REVENUE: 1,
  PER_CAPITA_INCREASE: 2,
  PERCENTAGE_INCREASE: 3,
};

Object.freeze(GrpcMethod);

export const GovernanceMethod = {
  ENDOGENOUS: 0,
  EXOGENOUS: 1,
};

Object.freeze(GovernanceMethod);

/**
 * Calculate instantanoeous coverage and associated improvements. This model
 * takes an improvement in GRPC, which may be specified in multiple ways, and
 * optionally, a change in governance. The latter is applied as a constant value
 * which is added to all governance measures. The instantaneous effect of
 * applying the GRPC and governance values is calculated for all rows in the
 * data supplied, where each row corresponds to a single country and year.
 * @param {object} paramsObject Parameters object. Attributes are:
 * - grpcValue: the value which, together with a method, is used to define
 *   the change in GRPC
 * - grpcMethod: the method used to define the change in GRPC
 * - governanceDelta: the constant change in governance
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
  let grpcComputedColumnName;
  let grpcComputedColumnModel;

  switch (grpcMethod) {
    case GrpcMethod.ABSOLUTE_ADDITIONAL_REVENUE:
      grpcComputedColumnName =
        model.constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE;
      grpcComputedColumnModel =
        model.models.revenue.createGrpcFromAbsoluteIncreaseModel();
      break;
    case GrpcMethod.PER_CAPITA_INCREASE:
      grpcComputedColumnName =
        model.constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC;
      grpcComputedColumnModel =
        model.models.revenue.createGrpcFromPerCapitaIncreaseModel();
      break;
    case GrpcMethod.PERCENTAGE_INCREASE:
      grpcComputedColumnName =
        model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC;
      grpcComputedColumnModel =
        model.models.revenue.createGrpcFromPercentageIncreaseModel();
      break;
    case GrpcMethod.IMPROVED_GRPC:
    default:
      grpcComputedColumnName =
        model.constants.computedColumnNames.IMPROVED_GRPC;
      grpcComputedColumnModel =
        model.models.revenue.createGrpcFromImprovedGrpc();
      break;
  }

  const totalModel = mt
    .model()
    .const()
    .called(grpcComputedColumnName)
    .value(grpcValue)
    .end()
    .add(grpcComputedColumnModel)
    .add(
      model.models.governance
        .createGovernanceConstantAdjustmentModel(governanceDelta)
        .add(model.models.coverage.createCoverageModel()),
    );

  return totalModel.data(data);
}

// TODO: allow user to specify method for grpc change

/**
 * Forecast coverage, given a percentage improvement in GRPC.
 * Governance may be modelled either endogenously or exogenously:
 * - for the ENDOGENOUS case, the governance is forecast using the
 *   model equations and observed data.
 * - for the EXOGENOUS case, governance is calculated using the
 *   observed governance plus a fixed delta applied equally across
 *   all measures; in addition, in this model ONLY, an optional number
 *   of steps to wait before applying the uplift in GRPC may be applied,
 *   which simulates a delay in the effect of interventions to increase
 *   GRPC.
 * @param {object}} paramsObject Parameters object. Attributes are:
 * - grpcPercentageImprovement: Percentage improvement in GRPC
 * - governanceMethod: the method used to calculate governance
 * - grpcDelay: the delay (in timesteps) to apply the improvement in
 *   GRPC: a delay of zero will apply the uplift from the first timestep,
 *   a delay of one will apply the uplift from the second timestep, and
 *   so on: only applied in the exogenous governance model.
 * - governanceDelta: the constant delta to be applied across all
 *   governance measures, only in the exogenous governance model.
 * @param {array} data Base data array
 * @return {array}  Base data with additional computed columns
 */
export function forecast(
  {
    grpcPercentageImprovement = 0,
    governanceMethod = GovernanceMethod.ENDOGENOUS,
    grpcDelay = 5,
    governanceDelta = 0,
  },
  data,
) {
  if (governanceMethod == GovernanceMethod.ENDOGENOUS) {
    return mt
      .model()
      .const()
      .called(model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC)
      .value(grpcPercentageImprovement)
      .end()
      .add(model.models.revenue.createGrpcFromPercentageIncreaseModel())
      .add(model.models.governance.createGovernanceForecastModel())
      .add(model.models.coverage.createCoverageModel())
      .data(data);
  } else if (governanceMethod == GovernanceMethod.EXOGENOUS) {
    return mt
      .model()
      .calc()
      .called(model.constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC)
      .does((r, getPrev) =>
        getPrev(grpcDelay) == undefined ? 0 : grpcPercentageImprovement,
      )
      .end()
      .add(model.models.revenue.createGrpcFromPercentageIncreaseModel())
      .add(
        model.models.governance.createGovernanceConstantAdjustmentModel(
          governanceDelta,
        ),
      )
      .add(model.models.coverage.createCoverageModel())
      .data(data);
  } else {
    return undefined;
  }
}
