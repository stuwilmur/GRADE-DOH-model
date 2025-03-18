import * as model from '../model';
import {curry2} from '../utils';

/**
 * Calculate GRPC necessary to achieve target coverage
 * @param {function} targetCoverageFunction Target coverage function
 * @param {string} coverageColumnName Name of the column of the coverage measure
 * @param {number} targetCoverage Target coverage percentage
 * @param {array} data Base data array
 * @return {array} Base data with additional computed columns
 * model.functions.health.
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

/**
 * Calculate revenue necessary to achieve target value of basic sanitation
 * @param {number} target target value of basic sanitation
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const basicSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.basicSanitation,
  model.constants.columnNames.BASIC_SANITATION_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of basic water
 * @param {number} target target value of basic water
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const basicWater = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.basicWater,
  model.constants.columnNames.BASIC_WATER_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of immunisation
 * @param {number} target target value of immunisation
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const immunisation = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.immunisation,
  model.constants.columnNames.IMMUNISATION_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of maternal survival
 * @param {number} target target value of maternal survival
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const maternalSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.maternalSurvival,
  model.constants.columnNames.MATERNAL_SURVIVAL_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of safe sanitation
 * @param {number} target target value of safe sanitation
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const safeSanitation = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.safeSanitation,
  model.constants.columnNames.SAFE_SANITATION_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of safe water
 * @param {number} target target value of safe water
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const safeWater = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.safeWater,
  model.constants.columnNames.SAFE_WATER_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of school attendance
 * @param {number} target target value of school attendance
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const schoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.schoolAttendance,
  model.constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of under-five survival
 * @param {number} target target value of under-five survival
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const underFiveSurvival = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.underFiveSurvival,
  model.constants.columnNames.UNDER_5_SURVIVAL_COVERAGE,
);

/**
 * Calculate revenue necessary to achieve target value of primary
 * school attendance
 * @param {number} target target value of primary school attendance
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const primarySchoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.primarySchoolAttendance,
  model.constants.columnNames.IN_SCHOOL_PRIMARY_SCHOOL,
);

/**
 * Calculate revenue necessary to achieve target value of lower
 * school attendance
 * @param {number} target target value of lower school attendance
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const lowerSchoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.lowerSchoolAttendance,
  model.constants.columnNames.IN_SCHOOL_LOWER_SCHOOL,
);

/**
 * Calculate revenue necessary to achieve target value of upper
 * school attendance
 * @param {number} target target value of upper school attendance
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const upperSchoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.upperSchoolAttendance,
  model.constants.columnNames.IN_SCHOOL_UPPER_SCHOOL,
);

/**
 * Calculate revenue necessary to achieve target value of primary
 * school teacher to pupil ratio
 * @param {number} target target value of primary school teacher to
 * pupil ratio
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const primarySchoolTeacherToPupilRatio = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.primarySchoolTeacherToPupilRatio,
  model.constants.columnNames.PRIMARY_TEACHERS_TO_PUPILS,
);

/**
 * Calculate revenue necessary to achieve target value of lower
 * school teacher to pupil ratio
 * @param {number} target target value of lower school teacher to
 * pupil ratio
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const lowerSchoolTeacherToPupilRatio = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.lowerSchoolTeacherToPupilRatio,
  model.constants.columnNames.LOWER_TEACHERS_TO_PUPILS,
);

/**
 * Calculate revenue necessary to achieve target value of upper
 * school teacher to pupil ratio
 * @param {number} target target value of upper school teacher to
 * pupil ratio
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */
export const upperSchoolTeacherToPupilRatio = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.upperSchoolTeacherToPupilRatio,
  model.constants.columnNames.UPPER_TEACHERS_TO_PUPILS,
);

/**                                                                                                                                                              
 * Calculate revenue necessary to achieve target value of access 
 * to clean fuels
 * @param {number} target target value of access to clean fuels
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */ 
export const cleanFuels = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.cleanFuels,
  model.constants.columnNames.CLEAN_FUELS_COVERAGE,
);

/**                                                                                                                                                              
 * Calculate revenue necessary to achieve target value of access 
 * to electricity
 * @param {number} target target value of access to electricity
 * @param {array} data the base data rows for which to calculate
 * @return {array} result data, including values for target revenue
 */ 
export const electricity = curry2(
  calcGrpcForTargetCoverage,
  model.functions.health.target.electricity,
  model.constants.columnNames.ELECTRICITY_COVERAGE,
);
