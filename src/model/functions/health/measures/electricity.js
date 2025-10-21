export const name = 'Access to electricity';

/**
 * Calculate access to electricity from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Access value
 */
export function calculate(grpc, governance) {
  const result =
    100.0 /
    (1.0 +
      Math.exp(
        -(
          1.5019625456 -
          0.2578443514823 * governance.controlOfCorruption +
          0.362341978581 * governance.regulatoryQuality +
          0.465587308283 * governance.governmentEffectiveness
        ) *
          (Math.log(grpc) -
            (5.27113495126 +
              0.671315739474 * governance.controlOfCorruption +
              0.171880470512 * governance.politicalStability +
              0.348130495524 * governance.regulatoryQuality -
              0.30838918822 * governance.ruleOfLaw -
              0.79095443295 * governance.governmentEffectiveness +
              0.136955671243 * governance.voiceAndAccountability)),
      ));
  return result;
}

/**
 * Estimate grpc necessary to achieve target access to electricity
 * from the model equations
 * @param {number} target Target access value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    1.5019625456 -
    0.2578443514823 * governance.controlOfCorruption +
    0.362341978581 * governance.regulatoryQuality +
    0.465587308283 * governance.governmentEffectiveness
  );
  const B =
    5.27113495126 +
    0.671315739474 * governance.controlOfCorruption +
    0.171880470512 * governance.politicalStability +
    0.348130495524 * governance.regulatoryQuality -
    0.30838918822 * governance.ruleOfLaw -
    0.79095443295 * governance.governmentEffectiveness +
    0.136955671243 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(100.0 / target - 1.0) / A + B);
  return result;
}
