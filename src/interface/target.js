import * as model from '../model';
import * as mt from 'micro-table/dist/module';
import {curry2} from '../utils';

/**
 * Calculate GRPC necessary to achieve target coverage
 * @param {function} targetCoverageFunction Target coverage function
 * @param {string} coverageColumnName Name of the column of the coverage measure
 * @param {number} targetCoverage Target coverage percentage
 * @param {array} data Base data array
 * @return {number} calculated GRPC necessary to achieve target
 * model.coverage.
 * The following conditions must be satisfied, or the function returns NaN:
 * 0 < observed coverage <= target coverage <= 100
 */
function calcGrpcForTargetCoverage(
  targetCoverageFunction,
  coverageColumnName,
  targetCoverage,
  data,
) {
  return mt
    .model()
    .const()
    .called(model.constants.computedColumnNames.TARGET_COVERAGE)
    .value(targetCoverage)
    .end()
    .calc()
    .called(model.constants.computedColumnNames.TARGET_GRPC)
    .does((r) =>
      targetCoverageFunction(
        r[coverageColumnName],
        r[model.constants.columnNames.GRPC_UNUWIDER],
        targetCoverage,
        model.governance.governanceObjectFromBaseObservedGovernance(r),
      ),
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.TARGET_GRPC_PERCENTAGE_INCREASE)
    .does((r) =>
      model.revenue.percentageIncreaseFromNewGrpc(
        r[model.constants.columnNames.GRPC_UNUWIDER],
        r[model.constants.computedColumnNames.TARGET_GRPC],
      ),
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.TARGET_ADDITIONAL_REVENUE_PER_CAPITA,
    )
    .does((r) =>
      model.revenue.additionalRevenuePerCapitaFromNewGrpc(
        r[model.constants.columnNames.GRPC_UNUWIDER],
        r[model.constants.computedColumnNames.TARGET_GRPC],
      ),
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.TARGET_ABSOLUTE_ADDITIONAL_REVENUE,
    )
    .does((r) =>
      model.revenue.absoluteAdditionalRevenueFromNewGrpc(
        r[model.constants.columnNames.GRPC_UNUWIDER],
        r[model.constants.computedColumnNames.TARGET_GRPC],
        r[model.constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .data(data);
}

export const basicSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.basicSanitation,
  model.constants.columnNames.BASIC_SANITATION_COVERAGE,
);

export const basicWater = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.basicWater,
  model.constants.columnNames.BASIC_WATER_COVERAGE,
);

export const immunisation = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.immunisation,
  model.constants.columnNames.IMMUNISATION_COVERAGE,
);

export const maternalSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.maternalSurvival,
  model.constants.columnNames.MATERNAL_SURVIVAL_COVERAGE,
);

export const safeSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.safeSanitation,
  model.constants.columnNames.SAFE_SANITATION_COVERAGE,
);

export const safeWater = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.safeWater,
  model.constants.columnNames.SAFE_WATER_COVERAGE,
);

export const schoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.schoolAttendance,
  model.constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE,
);

export const underFiveSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.target.underFiveSurvival,
  model.constants.columnNames.U5_SURVIVAL_COVERAGE,
);
