/* eslint-disable max-len */
import * as columnNames from './column-names';
/*
Strings for the computed column names
*/

// Utility strings
const estimate = ': Estimate';
const improved = ': Improved';
const BASIC_WATER_NAME = 'Basic water (SDG 6)';
const SAFE_WATER_NAME = 'Safe water (SDG 6)';
const BASIC_SANITATION_NAME = 'Basic sanitation (SDG 6)';
const SAFE_SANITATION_NAME = 'Safe sanitation (SDG 6)';
const CLEAN_FUELS_NAME = 'Clean fuels (SDG 7)';
const ELECTRICITY = 'Electricity (SDG 7)'
const PEOPLE = 'People';
const CHILDREN_UNDER_5 = 'Children < 5';
const FEMALES_15_49 = 'Females 15-49';
const WITH_INCREASED_ACCESS_TO = 'with increased access to';
const UNDER_5 = 'Under-5';
const MATERNAL = 'Maternal';
const DEATHS_AVERTED = 'deaths averted';
const DEATHS_WITH_ADDITIONAL_REVENUE = 'deaths with additional revenue';

// Target model
export const TARGET_COVERAGE = 'target coverage';
export const TARGET_GRPC = 'target grpc';
export const TARGET_GRPC_PERCENTAGE_INCREASE =
  'target grpc percentage increase';
export const TARGET_ADDITIONAL_REVENUE_PER_CAPITA =
  'target additional revenue per capita';
export const TARGET_ABSOLUTE_ADDITIONAL_REVENUE =
  'target absolute additional revenue';

// Revenue model
export const IMPROVED_GRPC = 'improved grpc';
export const ABSOLUTE_ADDITIONAL_REVENUE = 'absolute additional revenue';
export const PER_CAPITA_INCREASE_IN_GRPC = 'additional revenue per capita';
export const PERCENTAGE_INCREASE_IN_GRPC = 'grpc percentage increase';

// Governance model
export const IMPROVED_CONTROL_OF_CORRUPTION =
  columnNames.CONTROL_OF_CORRUPTION.replace(estimate, improved);
export const IMPROVED_GOVERNMENT_EFFECTIVENESS =
  columnNames.GOVERNMENT_EFFECTIVENESS.replace(estimate, improved);
export const IMPROVED_POLITICAL_STABILITY =
  columnNames.POLITICAL_STABILITY.replace(estimate, improved);
export const IMPROVED_REGULATORY_QUALITY =
  columnNames.REGULATORY_QUALITY.replace(estimate, improved);
export const IMPROVED_RULE_OF_LAW = columnNames.RULE_OF_LAW.replace(
  estimate,
  improved,
);
export const IMPROVED_VOICE_AND_ACCOUNTABILITY =
  columnNames.VOICE_AND_ACCOUNTABILITY.replace(estimate, improved);

// Coverage model
export const IMPROVED_BASIC_SANITATION_COVERAGE =
  columnNames.BASIC_SANITATION_COVERAGE + improved;
export const IMPROVED_BASIC_SANITATION_PEOPLE = `${PEOPLE} ${WITH_INCREASED_ACCESS_TO} ${BASIC_SANITATION_NAME}`;
export const IMPROVED_BASIC_SANITATION_CHILDREN_UNDER_5 = `${CHILDREN_UNDER_5} ${WITH_INCREASED_ACCESS_TO} ${BASIC_SANITATION_NAME}`;
export const IMPROVED_BASIC_SANITATION_FEMALES_15_49 = `${FEMALES_15_49} ${WITH_INCREASED_ACCESS_TO} ${BASIC_SANITATION_NAME}`;
export const IMPROVED_IMMUNISATION_COVERAGE =
  columnNames.IMMUNISATION_COVERAGE + improved;
export const INFANTS_IMMUNISED = 'Number of infants immunised';
export const IMPROVED_MATERNAL_SURVIVAL_COVERAGE =
  columnNames.MATERNAL_SURVIVAL_COVERAGE + improved;
export const MATERNAL_DEATHS_AVERTED = `${MATERNAL} ${DEATHS_AVERTED}`;
export const MATERNAL_DEATHS_WITH_ADDITIONAL_REVENUE = `${MATERNAL} ${DEATHS_WITH_ADDITIONAL_REVENUE}`;
export const COST_PER_MATERNAL_LIFE_SAVED = 'Cost per maternal life saved';
export const IMPROVED_SAFE_SANITATION_COVERAGE =
  columnNames.SAFE_SANITATION_COVERAGE + improved;
export const IMPROVED_SAFE_SANITATION_PEOPLE = `${PEOPLE} ${WITH_INCREASED_ACCESS_TO} ${SAFE_SANITATION_NAME}`;
export const IMPROVED_SAFE_SANITATION_CHILDREN_UNDER_5 = `${CHILDREN_UNDER_5} ${WITH_INCREASED_ACCESS_TO} ${SAFE_SANITATION_NAME}`;
export const IMPROVED_SAFE_SANITATION_FEMALES_15_49 = `${FEMALES_15_49} ${WITH_INCREASED_ACCESS_TO} ${SAFE_SANITATION_NAME}`;
export const IMPROVED_BASIC_WATER_COVERAGE =
  columnNames.BASIC_WATER_COVERAGE + improved;
export const IMPROVED_BASIC_WATER_PEOPLE = `${PEOPLE} ${WITH_INCREASED_ACCESS_TO} ${BASIC_WATER_NAME}`;
export const IMPROVED_BASIC_WATER_CHILDREN_UNDER_5 = `${CHILDREN_UNDER_5} ${WITH_INCREASED_ACCESS_TO} ${BASIC_WATER_NAME}`;
export const IMPROVED_BASIC_WATER_FEMALES_15_49 = `${FEMALES_15_49} ${WITH_INCREASED_ACCESS_TO} ${BASIC_WATER_NAME}`;
export const IMPROVED_SAFE_WATER_COVERAGE =
  columnNames.SAFE_WATER_COVERAGE + improved;
export const IMPROVED_SAFE_WATER_PEOPLE = `${PEOPLE} ${WITH_INCREASED_ACCESS_TO} ${SAFE_WATER_NAME}`;
export const IMPROVED_SAFE_WATER_CHILDREN_UNDER_5 = `${CHILDREN_UNDER_5} ${WITH_INCREASED_ACCESS_TO} ${SAFE_WATER_NAME}`;
export const IMPROVED_SAFE_WATER_FEMALES_15_49 = `${FEMALES_15_49} ${WITH_INCREASED_ACCESS_TO} ${SAFE_WATER_NAME}`;
export const IMPROVED_SCHOOL_ATTENDANCE_COVERAGE =
  columnNames.SCHOOL_ATTENDANCE_COVERAGE + improved;
export const ADDITIONAL_CHILD_SCHOOL_YEARS = 'Additional child school years';
export const IMPROVED_UNDER_5_SURVIVAL_COVERAGE =
  columnNames.UNDER_5_SURVIVAL_COVERAGE + improved;
export const UNDER_5_DEATHS_AVERTED = `${UNDER_5} ${DEATHS_AVERTED}`;
export const UNDER_5_DEATHS_WITH_ADDITIONAL_REVENUE = `${UNDER_5} ${DEATHS_WITH_ADDITIONAL_REVENUE}`;
export const COST_PER_UNDER_5_LIFE_SAVED = 'Cost per under-5 life saved';
export const IMPROVED_IN_SCHOOL_PRIMARY_SCHOOL =
  columnNames.IN_SCHOOL_PRIMARY_SCHOOL + improved;
export const IMPROVED_IN_SCHOOL_LOWER_SCHOOL =
  columnNames.IN_SCHOOL_LOWER_SCHOOL + improved;
export const IMPROVED_IN_SCHOOL_UPPER_SCHOOL =
  columnNames.IN_SCHOOL_UPPER_SCHOOL + improved;
export const ADDITIONAL_SCHOOL_POPULATION_PRIMARY_BOTH =
  'Additional children in primary education, both sexes';
export const ADDITIONAL_SCHOOL_POPULATION_PRIMARY_FEMALE =
  'Additional children in primary education, female';
export const ADDITIONAL_SCHOOL_POPULATION_PRIMARY_MALE =
  'Additional children in primary education, male';
export const ADDITIONAL_SCHOOL_POPULATION_LOWER_BOTH =
  'Additional children in lower secondary education, both sexes';
export const ADDITIONAL_SCHOOL_POPULATION_LOWER_FEMALE =
  'Additional children in lower secondary education, female';
export const ADDITIONAL_SCHOOL_POPULATION_LOWER_MALE =
  'Additional children in lower secondary education, male';
export const ADDITIONAL_SCHOOL_POPULATION_UPPER_BOTH =
  'Additional children in upper secondary education, both sexes';
export const ADDITIONAL_SCHOOL_POPULATION_UPPER_FEMALE =
  'Additional children in upper secondary education, female';
export const ADDITIONAL_SCHOOL_POPULATION_UPPER_MALE =
  'Additional children in upper secondary education, male';
export const IMPROVED_PRIMARY_PUPILS_TO_TEACHERS = 
    columnNames.PRIMARY_PUPILS_TO_TEACHERS + improved;
export const IMPROVED_PRIMARY_TEACHERS_TO_PUPILS = 
    columnNames.PRIMARY_TEACHERS_TO_PUPILS + improved;
export const IMPROVED_LOWER_PUPILS_TO_TEACHERS = 
    columnNames.LOWER_PUPILS_TO_TEACHERS + improved;
export const IMPROVED_LOWER_TEACHERS_TO_PUPILS = 
    columnNames.LOWER_TEACHERS_TO_PUPILS + improved;
export const IMPROVED_UPPER_PUPILS_TO_TEACHERS = 
    columnNames.UPPER_PUPILS_TO_TEACHERS + improved;
export const IMPROVED_UPPER_TEACHERS_TO_PUPILS = 
    columnNames.UPPER_TEACHERS_TO_PUPILS + improved;
export const ADDITIONAL_PRIMARY_SCHOOL_TEACHERS = 
'Additional teachers of primary school-age children';
export const ADDITIONAL_LOWER_SCHOOL_TEACHERS = 
'Additional teachers of lower school-age children';
export const ADDITIONAL_UPPER_SCHOOL_TEACHERS = 
'Additional teachers of upper school-age children';
export const IMPROVED_CLEAN_FUELS_COVERAGE =
    columnNames.CLEAN_FUELS_COVERAGE + improved;
export const IMPROVED_CLEAN_FUELS_PEOPLE = `${PEOPLE} ${WITH_INCREASED_ACCESS_TO} ${CLEAN_FUELS_NAME}`;
export const IMPROVED_CLEAN_FUELS_CHILDREN_UNDER_5 = `${CHILDREN_UNDER_5} ${WITH_INCREASED_ACCESS_TO} ${CLEAN_FUELS_NAME}`;
export const IMPROVED_CLEAN_FUELS_FEMALES_15_49 = `${FEMALES_15_49} ${WITH_INCREASED_ACCESS_TO} ${CLEAN_FUELS_NAME}`;
export const IMPROVED_ELECTRICITY_COVERAGE =
    columnNames.ELECTRICITY_COVERAGE + improved;
export const IMPROVED_ELECTRICITY_PEOPLE = `${PEOPLE} ${WITH_INCREASED_ACCESS_TO} ${ELECTRICITY_NAME}`;
export const IMPROVED_ELECTRICITY_CHILDREN_UNDER_5 = `${CHILDREN_UNDER_5} ${WITH_INCREASED_ACCESS_TO} ${ELECTRICITY_NAME}`;
export const IMPROVED_ELECTRICITY_FEMALES_15_49 = `${FEMALES_15_49} ${WITH_INCREASED_ACCESS_TO} ${ELECTRICITY_NAME}`;