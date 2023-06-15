import * as coverage from '../coverage';
import * as constants from '../constants';
import * as mt from 'micro-table/dist/module';
import * as governance from '../governance';

/**
 * Helper function to do the coverage estimation purely to reduce boilerplate
 * @param {function} measureEstimator: Estimator function for measure concerned
 * @param {string} measureObservedColumnName: Column name of measure in the
 * base data
 * @param {object} row: The base data row
 * @return {object} Coverage model
 */
function estimate(measureEstimator, measureObservedColumnName, row) {
  return measureEstimator(
    row[measureObservedColumnName],
    row[constants.columnNames.GRPC_UNUWIDER],
    row[constants.computedColumnNames.IMPROVED_GRPC],
    governance.governanceObjectFromBaseObservedGovernance(row),
    governance.governanceObjectFromImprovedGovernance(row),
  );
}

/**
 * Calculate improved coverage for all measures, from base data which has had
 * revenue and governance models applied to it.
 * @return {object} Coverage model
 */
export function createCoverageModel() {
  return mt
    .model()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_BASIC_SANITATION_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.basicSanitation,
        constants.columnNames.BASIC_SANITATION_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_BASIC_WATER_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.basicWater,
        constants.columnNames.BASIC_WATER_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_IMMUNISATION_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.immunisation,
        constants.columnNames.IMMUNISATION_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_MATERNAL_SURVIVAL_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.maternalSurvival,
        constants.columnNames.MATERNAL_SURVIVAL_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_SAFE_SANITATION_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.safeSanitation,
        constants.columnNames.SAFE_SANITATION_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_SAFE_WATER_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.safeWater,
        constants.columnNames.SAFE_WATER_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_SCHOOL_ATTENDANCE_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.schoolAttendance,
        constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_U5_SURVIVAL_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.underFiveSurvival,
        constants.columnNames.U5_SURVIVAL_COVERAGE,
        r,
      ),
    )
    .end();
}
