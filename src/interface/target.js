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

export const calcGrpcForBasicSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetBasicSanitation,
  model.constants.columnNames.BASIC_SANITATION_COVERAGE,
);

export const calcGrpcForBasicWater = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetBasicWater,
  model.constants.columnNames.BASIC_WATER_COVERAGE,
);

export const calcGrpcForImmunisation = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetImmunisation,
  model.constants.columnNames.IMMUNISATION_COVERAGE,
);

export const calcGrpcForMaternalSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetMaternalSurvival,
  model.constants.columnNames.MATERNAL_SURVIVAL_COVERAGE,
);

export const calcGrpcForSafeSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetSafeSanitation,
  model.constants.columnNames.SAFE_SANITATION_COVERAGE,
);

export const calcGrpcForSafeWater = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetSafeWater,
  model.constants.columnNames.SAFE_WATER_COVERAGE,
);

export const calcGrpcForSchoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetSchoolAttendance,
  model.constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE,
);

export const calcGrpcForUnderFiveSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.coverage.targetUnderFiveSurvival,
  model.constants.columnNames.U5_SURVIVAL_COVERAGE,
);
