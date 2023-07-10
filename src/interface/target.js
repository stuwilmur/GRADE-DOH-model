import * as model from '../model';
import {curry2} from '../utils';

/**
 * Calculate GRPC necessary to achieve target coverage
 * @param {function} targetCoverageFunction Target coverage function
 * @param {string} coverageColumnName Name of the column of the coverage measure
 * @param {number} targetCoverage Target coverage percentage
 * @param {array} data Base data array
 * @return {array} Base data with additional computed columns
 * model.health.
 * The following conditions must be satisfied, or the function returns NaN:
 * 0 < observed coverage <= target coverage <= 100
 */
function calcGrpcForTargetCoverage(
  targetCoverageFunction,
  coverageColumnName,
  targetCoverage,
  data,
) {
  const targetGrpcModel = model.models.target.createTargetGrpcModel(
    targetCoverageFunction,
    coverageColumnName,
    targetCoverage,
  );
  return targetGrpcModel.data(data);
}

// TODO: add JSDOC comments for all
export const basicSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.basicSanitation,
  model.constants.columnNames.BASIC_SANITATION_COVERAGE,
);

export const basicWater = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.basicWater,
  model.constants.columnNames.BASIC_WATER_COVERAGE,
);

export const immunisation = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.immunisation,
  model.constants.columnNames.IMMUNISATION_COVERAGE,
);

export const maternalSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.maternalSurvival,
  model.constants.columnNames.MATERNAL_SURVIVAL_COVERAGE,
);

export const safeSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.safeSanitation,
  model.constants.columnNames.SAFE_SANITATION_COVERAGE,
);

export const safeWater = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.safeWater,
  model.constants.columnNames.SAFE_WATER_COVERAGE,
);

export const schoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.schoolAttendance,
  model.constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE,
);

export const underFiveSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.health.target.underFiveSurvival,
  model.constants.columnNames.UNDER_5_SURVIVAL_COVERAGE,
);
