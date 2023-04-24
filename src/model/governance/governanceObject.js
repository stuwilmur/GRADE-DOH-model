/**
 * Create a governance object given values for governance indicators
 * @param {number} _corruption corruption indicator
 * @param {number} _governmentEffectiveness government effectiveness indicator
 * @param {number} _politicalStability political stability indicator
 * @param {number} _regulatoryQuality regulatory quality indicator
 * @param {number} _ruleOfLaw rule of law indicator
 * @param {number} _voiceAndAccountability voiceAndAccountability indicator
 * @return {object} Governance object
 */
export function governanceObject(
  _corruption,
  _governmentEffectiveness,
  _politicalStability,
  _regulatoryQuality,
  _ruleOfLaw,
  _voiceAndAccountability,
) {
  return {
    corruption: _corruption,
    governmentEffectiveness: _governmentEffectiveness,
    politicalStability: _politicalStability,
    regulatoryQuality: _regulatoryQuality,
    ruleOfLaw: _ruleOfLaw,
    voiceAndAccountability: _voiceAndAccountability,
  };
}
