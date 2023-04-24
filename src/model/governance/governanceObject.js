/**
 * Create a governance object given values for governance indicators
 * @param {number} _corruption corruption indicator
 * @param {number} _goveffect government effectiveness indicator
 * @param {number} _polstab political stability indicator
 * @param {number} _regquality regulatory quality indicator
 * @param {number} _rulelaw rule of law indicator
 * @param {number} _voice voice indicator
 * @return {object} Governance object
 */
export function governanceObject(
  _corruption,
  _goveffect,
  _polstab,
  _regquality,
  _rulelaw,
  _voice,
) {
  return {
    corruption: _corruption,
    goveffect: _goveffect,
    polstab: _polstab,
    regquality: _regquality,
    rulelaw: _rulelaw,
    voice: _voice,
  };
}
