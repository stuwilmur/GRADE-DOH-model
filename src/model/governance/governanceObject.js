import * as constants from '../constants';

/**
 * Create a governance object given values for governance indicators
 * @param {number} _controlOfCorruption controlOfCorruption indicator
 * @param {number} _governmentEffectiveness government effectiveness indicator
 * @param {number} _politicalStability political stability indicator
 * @param {number} _regulatoryQuality regulatory quality indicator
 * @param {number} _ruleOfLaw rule of law indicator
 * @param {number} _voiceAndAccountability voiceAndAccountability indicator
 * @return {object} Governance object
 */
export function governanceObject(
  _controlOfCorruption,
  _governmentEffectiveness,
  _politicalStability,
  _regulatoryQuality,
  _ruleOfLaw,
  _voiceAndAccountability,
) {
  return {
    controlOfCorruption: _controlOfCorruption,
    governmentEffectiveness: _governmentEffectiveness,
    politicalStability: _politicalStability,
    regulatoryQuality: _regulatoryQuality,
    ruleOfLaw: _ruleOfLaw,
    voiceAndAccountability: _voiceAndAccountability,
  };
}

/**
 * Create a governance object for the observed governance,
 * given a row of the base data
 * @param {object} dataRow data row object from the base data
 * @return {object} Governance object
 */
export function governanceObjectFromBaseObservedGovernance(dataRow) {
  return governanceObject(
    dataRow[constants.columnNames.CONTROL_OF_CORRUPTION],
    dataRow[constants.columnNames.GOVERNMENT_EFFECTIVENESS],
    dataRow[constants.columnNames.POLITICAL_STABILITY],
    dataRow[constants.columnNames.REGULATORY_QUALITY],
    dataRow[constants.columnNames.RULE_OF_LAW],
    dataRow[constants.columnNames.VOICE_AND_ACCOUNTABILITY],
  );
}
