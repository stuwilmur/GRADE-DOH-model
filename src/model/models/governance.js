/* eslint-disable operator-linebreak */
import * as model from '../../../src/model';
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
    .called(model.constants.computedColumnNames.IMPROVED_CONTROL_OF_CORRUPTION)
    .does(
      (r) =>
        r[model.constants.columnNames.CONTROL_OF_CORRUPTION] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.IMPROVED_GOVERNMENT_EFFECTIVENESS,
    )
    .does(
      (r) =>
        r[model.constants.columnNames.GOVERNMENT_EFFECTIVENESS] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.IMPROVED_POLITICAL_STABILITY)
    .does(
      (r) =>
        r[model.constants.columnNames.POLITICAL_STABILITY] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.IMPROVED_RULE_OF_LAW)
    .does(
      (r) =>
        r[model.constants.columnNames.RULE_OF_LAW] + constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.IMPROVED_REGULATORY_QUALITY)
    .does(
      (r) =>
        r[model.constants.columnNames.REGULATORY_QUALITY] +
        constantChangeInGovernance,
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.IMPROVED_VOICE_AND_ACCOUNTABILITY,
    )
    .does(
      (r) =>
        r[model.constants.columnNames.VOICE_AND_ACCOUNTABILITY] +
        constantChangeInGovernance,
    )
    .end();
}
/**
 * Helper function to forecast governance
 * @param {function} forecaster Forecasting function
 * @param {string} columnName Observed column name for governance measure
 * @param {string} computedColumnName Computed column name for governance
 * @param {object} r current data row
 * @param {object} r1 previous data row
 * @param {object} r2 second-lagged data row
 * @return {number} forecast value
 */
function forecastGovernance(
  forecaster,
  columnName,
  computedColumnName,
  r,
  r1,
  r2,
) {
  return forecaster(
    r[columnName],
    prev == undefined ? null : prev[columnName],
    prev2 == undefined ? null : prev2[columnName],
    r[model.constants.columnNames.GRPC_UNUWIDER],
    prev == undefined ? null : prev[model.constants.columnNames.GRPC_UNUWIDER],
    prev == undefined ? null : prev[computedColumnName],
    prev2 == undefined ? null : prev2[computedColumnName],
    r[model.constants.computedColumnNames.IMPROVED_GRPC],
    // eslint-disable-next-line max-len
    prev == undefined
      ? null
      : prev[model.constants.computedColumnNames.IMPROVED_GRPC],
  );
}

/**
 * Forecast governance measures using the model equations
 * @return {object} Forecast governance model, with computed columns for:
 * Control of Corruption: Improved
 * Government Effectiveness: Improved
 * Political Stability and Absence of Violence/Terrorism: Improved
 * Regulatory Quality: Improved
 * Rule of Law: Improved
 * Voice and Accountability: Improved
 */
export function createGovernanceForecastModel() {
  return mt
    .model()
    .calc()
    .called(model.constants.computedColumnNames.IMPROVED_CONTROL_OF_CORRUPTION)
    .does((r, getPrev) =>
      forecastGovernance(
        model.governance.forecast.controlOfCorruption,
        model.constants.columnNames.CONTROL_OF_CORRUPTION,
        model.constants.computedColumnNames.IMPROVED_CONTROL_OF_CORRUPTION,
        r,
        getPrev(1),
        getPrev(2),
      ),
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.IMPROVED_GOVERNMENT_EFFECTIVENESS,
    )
    .does((r, getPrev) =>
      forecastGovernance(
        model.governance.forecast.controlOfCorruption,
        model.constants.columnNames.GOVERNMENT_EFFECTIVENESS,
        model.constants.computedColumnNames.IMPROVED_GOVERNMENT_EFFECTIVENESS,
        r,
        getPrev(1),
        getPrev(2),
      ),
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.IMPROVED_POLITICAL_STABILITY)
    .does((r, getPrev) =>
      forecastGovernance(
        model.governance.forecast.controlOfCorruption,
        model.constants.columnNames.POLITICAL_STABILITY,
        model.constants.computedColumnNames.IMPROVED_POLITICAL_STABILITY,
        r,
        getPrev(1),
        getPrev(2),
      ),
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.IMPROVED_REGULATORY_QUALITY)
    .does((r, getPrev) =>
      forecastGovernance(
        model.governance.forecast.controlOfCorruption,
        model.constants.columnNames.REGULATORY_QUALITY,
        model.constants.computedColumnNames.IMPROVED_REGULATORY_QUALITY,
        r,
        getPrev(1),
        getPrev(2),
      ),
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.IMPROVED_RULE_OF_LAW)
    .does((r, getPrev) =>
      forecastGovernance(
        model.governance.forecast.controlOfCorruption,
        model.constants.columnNames.RULE_OF_LAW,
        model.constants.computedColumnNames.IMPROVED_RULE_OF_LAW,
        r,
        getPrev(1),
        getPrev(2),
      ),
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.IMPROVED_VOICE_AND_ACCOUNTABILITY,
    )
    .does((r, getPrev) =>
      forecastGovernance(
        model.governance.forecast.controlOfCorruption,
        model.constants.columnNames.VOICE_AND_ACCOUNTABILITY,
        model.constants.computedColumnNames.IMPROVED_VOICE_AND_ACCOUNTABILITY,
        r,
        getPrev(1),
        getPrev(2),
      ),
    )
    .end();
}
