import * as constants from '../constants';
import * as mt from 'micro-table/dist/module';

/**
 * Apply a constant value adjustment across all governance measures
 * @param {number} constantChangeInGovernance: cosnstant to be added to all
 * governance measures
 * @return {object} Improved governance model, with computed columns for:
 * Control of Corruption: Improved
 * Government Effectiveness: Improved
 * Political Stability and Absence of Violence/Terrorism: Improved
 * Regulatory Quality: Improved
 * Rule of Law: Improved
 * Voice and Accountability: Improved
 */
export function createGovernanceConstantAdjustmentModel(
  constantChangeInGovernance,
) {
  return mt
    .model()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_CONTROL_OF_CORRUPTION)
    .does(
      (r) =>
        r[constants.columnNames.CONTROL_OF_CORRUPTION] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_GOVERNMENT_EFFECTIVENESS)
    .does(
      (r) =>
        r[constants.columnNames.GOVERNMENT_EFFECTIVENESS] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_POLITICAL_STABILITY)
    .does(
      (r) =>
        r[constants.columnNames.POLITICAL_STABILITY] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_RULE_OF_LAW)
    .does(
      (r) => r[constants.columnNames.RULE_OF_LAW] + constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_REGULATORY_QUALITY)
    .does(
      (r) =>
        r[constants.columnNames.REGULATORY_QUALITY] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_VOICE_AND_ACCOUNTABILITY)
    .does(
      (r) =>
        r[constants.columnNames.VOICE_AND_ACCOUNTABILITY] +
        constantChangeInGovernance,
    )
    .end();
}
