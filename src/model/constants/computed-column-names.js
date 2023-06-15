import * as columnNames from './column-names';
/*
Strings for the computed column names
*/

// Utility strings
const estimate = ': Estimate';
const improved = ': Improved';

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
export const IMPROVED_IMMUNISATION_COVERAGE =
  columnNames.IMMUNISATION_COVERAGE + improved;
export const IMPROVED_MATERNAL_SURVIVAL_COVERAGE =
  columnNames.MATERNAL_SURVIVAL_COVERAGE + improved;
export const IMPROVED_SAFE_SANITATION_COVERAGE =
  columnNames.SAFE_SANITATION_COVERAGE + improved;
export const IMPROVED_BASIC_WATER_COVERAGE =
  columnNames.BASIC_WATER_COVERAGE + improved;
export const IMPROVED_SAFE_WATER_COVERAGE =
  columnNames.SAFE_WATER_COVERAGE + improved;
export const IMPROVED_SCHOOL_ATTENDANCE_COVERAGE =
  columnNames.SCHOOL_ATTENDANCE_COVERAGE + improved;
export const IMPROVED_U5_SURVIVAL_COVERAGE =
  columnNames.U5_SURVIVAL_COVERAGE + improved;
