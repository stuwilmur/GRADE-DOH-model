import * as model from '../model';
import * as mt from 'micro-table/dist/module';
import * as t from './target';
export const target = {
  basicSanitation: t.basicSanitation,
  basicWater: t.basicWater,
  immunisation: t.immunisation,
  maternalSurvival: t.maternalSurvival,
  safeSanitation: t.safeSanitation,
  safeWater: t.safeWater,
  schoolAttendance: t.schoolAttendance,
  underFiveSurvival: t.underFiveSurvival,
  primarySchoolAttendance: t.primarySchoolAttendance,
  lowerSchoolAttendance: t.lowerSchoolAttendance,
  upperSchoolAttendance: t.upperSchoolAttendance,
  primarySchoolTeacherToPupilRatio: t.primarySchoolTeacherToPupilRatio,
  lowerSchoolTeacherToPupilRatio: t.lowerSchoolTeacherToPupilRatio,
  upperSchoolTeacherToPupilRatio: t.upperSchoolTeacherToPupilRatio,
  cleanFuels: t.cleanFuels,
  electricity: t.electricity,
  stunting: t.stunting,
  hospitalBeds: t.hospitalBeds,
  nurses: t.nurses,
};

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
 * Calculate long-run effect on coverage and associated improvements: the result
 * is immediate, i.e. there is no dynamic adjustment to the long-run result; it
 * is achieved instantaneously.
 * Takes an improvement in GRPC, which may be specified in multiple ways, and
 * optionally, a change in governance. The latter is applied as a constant value
 * which is added to all governance measures. The instantaneous long-run effect
 * of applying the GRPC and governance values is calculated for all rows in the
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

/**
 * Helper function to calculate the percentage improvement of GRPC,
 * allowing use of a variety of methods to specify the change.
 * @param {number} grpcValue GRPC generic value, used to specify change
 * @param {enum} grpcMethod method of calculation
 * @param {number} originalGrpc original GRPC
 * @param {number} totalPopulation total population
 * @return {number} percentage increase in GRPC
 */
function calculatePercentageImprovement(
  grpcValue,
  grpcMethod,
  originalGrpc,
  totalPopulation,
) {
  switch (grpcMethod) {
    case GrpcMethod.ABSOLUTE_ADDITIONAL_REVENUE:
      return (grpcValue / totalPopulation / originalGrpc) * 100.0;
      break;
    case GrpcMethod.IMPROVED_GRPC:
      return (grpcValue / originalGrpc - 1) * 100;
      break;
    case GrpcMethod.PERCENTAGE_INCREASE:
      return grpcValue;
      break;
    case GrpcMethod.PER_CAPITA_INCREASE:
      return (grpcValue / originalGrpc) * 100.0;
      break;
    default:
      return NaN;
  }
}

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
 * - grpcValue: GRPC improvement value; in conjunction with grpcMethod,
 *   used to determine the percentage improvement in GRPC
 * - grpcMethod: GRPC improvement calculation method; in conjunction with
 *   grpcValue, used to determine the percentage improvement in GRPC
 * - grpcDelay: the delay (in timesteps) to apply the improvement in
 *   GRPC: a delay of zero will apply the uplift from the first timestep,
 *   a delay of one will apply the uplift from the second timestep, and
 *   so on: only applied in the exogenous governance model.
 * - governanceMethod: the method used to calculate governance
 * - governanceDelta: the constant delta to be applied across all
 *   governance measures, only in the exogenous governance model.
 * @param {array} data Base data array
 * @return {array}  Base data with additional computed columns
 */
export function forecast(
  {
    grpcValue = 0,
    grpcMethod = GrpcMethod.PERCENTAGE_INCREASE,
    grpcDelay = 0,
    governanceMethod = GovernanceMethod.ENDOGENOUS,
    governanceDelta = 0,
  },
  data,
) {
  const grpcPercentageImprovement = calculatePercentageImprovement(
    grpcValue,
    grpcMethod,
    data[0][model.constants.columnNames.GRPC_UNUWIDER],
    data[0][model.constants.columnNames.POPTOTAL],
  );

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
      .does((r, getPrev, step) =>
        step >= grpcDelay ? grpcPercentageImprovement : 0,
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
