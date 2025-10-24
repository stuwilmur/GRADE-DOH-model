import * as coverage from '../functions/health';
import * as constants from '../constants';
import * as mt from 'micro-table/dist/module';
import * as governance from '../functions/governance';

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
 * Helper function to covert ratio to a percentage
 * @param {number} ratio The ratio
 * @return {number} Percentage
 */
function ratioToPercentage(ratio) {
  return ratio * 100;
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
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_IN_SCHOOL_PRIMARY_SCHOOL)
    .does((r) =>
      estimate(
        coverage.estimate.primarySchoolAttendance,
        constants.columnNames.IN_SCHOOL_PRIMARY_SCHOOL,
        r,
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_PRIMARY_BOTH,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_PRIMARY_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_PRIMARY_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_PRIMARY_BOTH],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_PRIMARY_FEMALE,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_PRIMARY_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_PRIMARY_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_PRIMARY_FEMALE],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_PRIMARY_MALE,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_PRIMARY_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_PRIMARY_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_PRIMARY_MALE],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_IN_SCHOOL_LOWER_SCHOOL)
    .does((r) =>
      estimate(
        coverage.estimate.lowerSchoolAttendance,
        constants.columnNames.IN_SCHOOL_LOWER_SCHOOL,
        r,
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_LOWER_BOTH,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_LOWER_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_LOWER_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_LOWER_BOTH],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_LOWER_FEMALE,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_LOWER_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_LOWER_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_LOWER_FEMALE],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_LOWER_MALE,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_LOWER_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_LOWER_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_LOWER_MALE],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_IN_SCHOOL_UPPER_SCHOOL)
    .does((r) =>
      estimate(
        coverage.estimate.upperSchoolAttendance,
        constants.columnNames.IN_SCHOOL_UPPER_SCHOOL,
        r,
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_UPPER_BOTH,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_UPPER_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_UPPER_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_UPPER_BOTH],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_UPPER_FEMALE,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_UPPER_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_UPPER_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_UPPER_FEMALE],
      ),
    )
    .end()
    .calc()
    .called(
      constants.computedColumnNames.ADDITIONAL_SCHOOL_POPULATION_UPPER_MALE,
    )
    .does((r) =>
      calculateAffectedPopulation(
        ratioToPercentage(r[constants.columnNames.IN_SCHOOL_UPPER_SCHOOL]),
        ratioToPercentage(
          r[constants.computedColumnNames.IMPROVED_IN_SCHOOL_UPPER_SCHOOL],
        ),
        r[constants.columnNames.SCHOOL_POPULATION_UPPER_MALE],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_PRIMARY_TEACHERS_TO_PUPILS)
    .does((r) =>
      estimate(
        coverage.estimate.primarySchoolTeacherToPupilRatio,
        constants.columnNames.PRIMARY_TEACHERS_TO_PUPILS,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_PRIMARY_PUPILS_TO_TEACHERS)
    .does(
      (r) =>
        1.0 /
        r[constants.computedColumnNames.IMPROVED_PRIMARY_TEACHERS_TO_PUPILS],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_LOWER_TEACHERS_TO_PUPILS)
    .does((r) =>
      estimate(
        coverage.estimate.lowerSchoolTeacherToPupilRatio,
        constants.columnNames.LOWER_TEACHERS_TO_PUPILS,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_LOWER_PUPILS_TO_TEACHERS)
    .does(
      (r) =>
        1.0 /
        r[constants.computedColumnNames.IMPROVED_LOWER_TEACHERS_TO_PUPILS],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_UPPER_TEACHERS_TO_PUPILS)
    .does((r) =>
      estimate(
        coverage.estimate.upperSchoolTeacherToPupilRatio,
        constants.columnNames.UPPER_TEACHERS_TO_PUPILS,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_UPPER_PUPILS_TO_TEACHERS)
    .does(
      (r) =>
        1.0 /
        r[constants.computedColumnNames.IMPROVED_UPPER_TEACHERS_TO_PUPILS],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ADDITIONAL_PRIMARY_SCHOOL_TEACHERS)
    .does(
      (r) =>
        (r[constants.computedColumnNames.IMPROVED_PRIMARY_TEACHERS_TO_PUPILS] -
          r[constants.columnNames.PRIMARY_TEACHERS_TO_PUPILS]) *
        r[constants.columnNames.SCHOOL_POPULATION_PRIMARY_BOTH],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ADDITIONAL_LOWER_SCHOOL_TEACHERS)
    .does(
      (r) =>
        (r[constants.computedColumnNames.IMPROVED_LOWER_TEACHERS_TO_PUPILS] -
          r[constants.columnNames.LOWER_TEACHERS_TO_PUPILS]) *
        r[constants.columnNames.SCHOOL_POPULATION_LOWER_BOTH],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ADDITIONAL_UPPER_SCHOOL_TEACHERS)
    .does(
      (r) =>
        (r[constants.computedColumnNames.IMPROVED_UPPER_TEACHERS_TO_PUPILS] -
          r[constants.columnNames.UPPER_TEACHERS_TO_PUPILS]) *
        r[constants.columnNames.SCHOOL_POPULATION_UPPER_BOTH],
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_CLEAN_FUELS_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.cleanFuels,
        constants.columnNames.CLEAN_FUELS_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_CLEAN_FUELS_PEOPLE)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.CLEAN_FUELS_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_CLEAN_FUELS_COVERAGE],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_CLEAN_FUELS_CHILDREN_UNDER_5)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.CLEAN_FUELS_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_CLEAN_FUELS_COVERAGE],
        r[constants.columnNames.POPULATION_CHILDREN_UNDER_5],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_CLEAN_FUELS_FEMALES_15_49)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.CLEAN_FUELS_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_CLEAN_FUELS_COVERAGE],
        r[constants.columnNames.POPULATION_FEMALES_15_49],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_ELECTRICITY_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.electricity,
        constants.columnNames.ELECTRICITY_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_ELECTRICITY_PEOPLE)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.ELECTRICITY_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_ELECTRICITY_COVERAGE],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_ELECTRICITY_CHILDREN_UNDER_5)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.ELECTRICITY_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_ELECTRICITY_COVERAGE],
        r[constants.columnNames.POPULATION_CHILDREN_UNDER_5],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_ELECTRICITY_FEMALES_15_49)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.ELECTRICITY_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_ELECTRICITY_COVERAGE],
        r[constants.columnNames.POPULATION_FEMALES_15_49],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_STUNTING_COVERAGE)
    .does((r) =>
      estimate(
        coverage.estimate.stunting,
        constants.columnNames.STUNTING_COVERAGE,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_STUNTING_CHILDREN_UNDER_5)
    .does((r) =>
      - calculateAffectedPopulation(
        r[constants.columnNames.STUNTING_COVERAGE],
        r[constants.computedColumnNames.IMPROVED_STUNTING_COVERAGE],
        r[constants.columnNames.POPULATION_CHILDREN_UNDER_5],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_HOSPITAL_BEDS)
    .does((r) =>
      estimate(
        coverage.estimate.hospitalBeds,
        constants.columnNames.HOSPITAL_BEDS,
        r,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ADDITIONAL_HOSPITAL_BEDS)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.HOSPITAL_BEDS],
        r[constants.computedColumnNames.IMPROVED_HOSPITAL_BEDS],
        r[constants.columnNames.POPTOTAL] / 1000,
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_NURSES)
    .does((r) =>
      estimate(coverage.estimate.nurses, constants.columnNames.NURSES, r),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ADDITIONAL_NURSES)
    .does((r) =>
      calculateAffectedPopulation(
        r[constants.columnNames.NURSES],
        r[constants.computedColumnNames.IMPROVED_NURSES],
        r[constants.columnNames.POPTOTAL] / 1000,
      ),
    )
    .end();
}
