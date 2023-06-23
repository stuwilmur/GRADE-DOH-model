import * as coverage from '../coverage';
import * as constants from '../constants';
import * as mt from 'micro-table/dist/module';
import * as governance from '../governance';

/**
 * Helper function to calculate the number of people in a population affected
 * by a change in coverage percentage
 * @param {number}   originalCoveragePercentage: Original coverage Percentage
 * @param {number} improvedCoveragePercentrage: Improved coverage Percentage
 * @param {number} population: The number of people in the population affected
 * @return {number} Number of people who experience the improvement
 */
function calculateAffectedPopulation(
  originalCoveragePercentage,
  improvedCoveragePercentrage,
  population,
) {
  return (
    ((improvedCoveragePercentrage - originalCoveragePercentage) / 100.0) *
    population
  );
}

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
    .called(constants.computedColumnNames.IMPROVED_BASIC_SANITATION_PEOPLE)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.BASIC_SANITATION_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_BASIC_SANITATION_COVERAGE],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.IMPROVED_BASIC_SANITATION_CHILDREN_UNDER_5,
    )
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.BASIC_SANITATION_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_BASIC_SANITATION_COVERAGE],
        r[constants.columnNames.POPULATION_CHILDREN_UNDER_5],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.IMPROVED_BASIC_SANITATION_FEMALES_15_49,
    )
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.BASIC_SANITATION_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_BASIC_SANITATION_COVERAGE],
        r[constants.columnNames.POPULATION_FEMALES_15_49],
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
    .called(constants.computedColumnNames.IMPROVED_BASIC_WATER_PEOPLE)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.BASIC_WATER_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_BASIC_WATER_COVERAGE],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_BASIC_WATER_CHILDREN_UNDER_5)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.BASIC_WATER_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_BASIC_WATER_COVERAGE],
        r[constants.columnNames.POPULATION_CHILDREN_UNDER_5],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_BASIC_WATER_FEMALES_15_49)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.BASIC_WATER_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_BASIC_WATER_COVERAGE],
        r[constants.columnNames.POPULATION_FEMALES_15_49],
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
    .called(constants.computedColumnNames.INFANTS_IMMUNISED)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.IMMUNISATION_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_IMMUNISATION_COVERAGE],
        r[constants.columnNames.CHILDREN_SURVIVE_TO_1],
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
    .called(constants.computedColumnNames.MATERNAL_DEATHS_AVERTED)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.MATERNAL_SURVIVAL_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_MATERNAL_SURVIVAL_COVERAGE],
        r[constants.columnNames.NUMBER_OF_BIRTHS],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.MATERNAL_DEATHS_WITH_ADDITIONAL_REVENUE,
    )
    .does(
      (r) =>
        r[constants.columnNames.MATERNAL_DEATHS] -
        r[constants.computedColumnNames.MATERNAL_DEATHS_AVERTED],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.COST_PER_MATERNAL_LIFE_SAVED)
    .does((r) => {
      if (r[constants.computedColumnNames.MATERNAL_DEATHS_AVERTED] > 0) {
        return (
          r[constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE] /
          r[constants.computedColumnNames.MATERNAL_DEATHS_AVERTED]
        );
      } else return null;
    })
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
    .called(constants.computedColumnNames.IMPROVED_SAFE_SANITATION_PEOPLE)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.SAFE_SANITATION_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_SAFE_SANITATION_COVERAGE],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.IMPROVED_SAFE_SANITATION_CHILDREN_UNDER_5,
    )
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.SAFE_SANITATION_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_SAFE_SANITATION_COVERAGE],
        r[constants.columnNames.POPULATION_CHILDREN_UNDER_5],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.IMPROVED_SAFE_SANITATION_FEMALES_15_49,
    )
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.SAFE_SANITATION_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_SAFE_SANITATION_COVERAGE],
        r[constants.columnNames.POPULATION_FEMALES_15_49],
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
    .called(constants.computedColumnNames.IMPROVED_SAFE_WATER_PEOPLE)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.SAFE_WATER_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_SAFE_WATER_COVERAGE],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_SAFE_WATER_CHILDREN_UNDER_5)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.SAFE_WATER_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_SAFE_WATER_COVERAGE],
        r[constants.columnNames.POPULATION_CHILDREN_UNDER_5],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_SAFE_WATER_FEMALES_15_49)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.SAFE_WATER_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_SAFE_WATER_COVERAGE],
        r[constants.columnNames.POPULATION_FEMALES_15_49],
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
    .called(constants.computedColumnNames.ADDITIONAL_CHILD_SCHOOL_YEARS)
    .does(
      (r) =>
        ((constants.values.TOTAL_SCHOOL_YEARS *
          (r[
            constants.computedColumnNames.IMPROVED_SCHOOL_ATTENDANCE_COVERAGE
          ] -
            r[constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE])) /
          100.0) *
        r[constants.columnNames.CHILDREN_SURVIVE_TO_5],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_UNDER_5_SURVIVAL_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.underFiveSurvival,
        constants.columnNames.UNDER_5_SURVIVAL_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.UNDER_5_DEATHS_AVERTED)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.UNDER_5_SURVIVAL_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_UNDER_5_SURVIVAL_COVERAGE],
        r[constants.columnNames.NUMBER_OF_BIRTHS],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.UNDER_5_DEATHS_WITH_ADDITIONAL_REVENUE,
    )
    .does(
      (r) =>
        r[constants.columnNames.UNDER_5_DEATHS] -
        r[constants.computedColumnNames.UNDER_5_DEATHS_AVERTED],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.COST_PER_UNDER_5_LIFE_SAVED)
    .does((r) => {
      if (r[constants.computedColumnNames.UNDER_5_DEATHS_AVERTED] > 0) {
        return (
          r[constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE] /
          r[constants.computedColumnNames.UNDER_5_DEATHS_AVERTED]
        );
      } else return null;
    })
    .end();
}
