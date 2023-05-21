import * as model from '../model';
import {curry2} from '../utils';

/**
 * Calculate GRPC necessary to achieve target coverage
 * @param {function} targetCoverageFunction Target coverage function
 * @param {string} coverageColumnName Name of the column of the coverage measure
 * @param {number} targetCoverage Target coverage percentage
 * @param {string} countryCode Three-letter ISO country code
 * @param {year} year Year
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
  countryCode,
  year,
  data,
) {
  const countryYearRow = data.find(
    (row) => row.countrycode == countryCode && row.year == year,
  );

  if (countryYearRow == undefined) {
    return NaN;
  } else {
    const observedGrpc =
      countryYearRow[model.constants.columnNames.GRPC_UNUWIDER];
    const newGrpc = targetCoverageFunction(
      countryYearRow[coverageColumnName],
      observedGrpc,
      targetCoverage,
      model.governance.governanceObjectFromBaseObservedGovernance(
        countryYearRow,
      ),
    );
    return {
      'observed grpc': observedGrpc,
      'new grpc': newGrpc,
      'percentage increase': model.revenue.percentageIncreaseFromNewGrpc(
        observedGrpc,
        newGrpc,
      ),
      'additional revenue per capita':
        model.revenue.additionalRevenuePerCapitaFromNewGrpc(
          observedGrpc,
          newGrpc,
        ),
      'absolute additional revenue':
        model.revenue.absoluteAdditionalRevenueFromNewGrpc(
          observedGrpc,
          newGrpc,
          countryYearRow[model.constants.columnNames.POPTOTAL],
        ),
    };
  }
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