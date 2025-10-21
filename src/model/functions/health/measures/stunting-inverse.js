export const name = 'Stunting inverse';

/**
 * Calculate stunting inverse from the model equations.
 * Stunting inverse (si) is derived from the prevalence of
 * stunting (s) by the following formula:
 * si = 100 - 100 / 65 * s.
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Stunting inverse value
 */
export function calculate(grpc, governance) {
  const result =
    100.0 /
    (1.0 +
      Math.exp(
        -(
          0.615767523243 -
          0.136403617704 * governance.controlOfCorruption -
          0.0690187386714 * governance.politicalStability +
          0.362786997335 * governance.governmentEffectiveness +
          0.0626787851051 * governance.voiceAndAccountability
        ) *
          (Math.log(grpc) -
            (5.14643417028 -
              0.272350860329 * governance.politicalStability -
              0.266201741521 * governance.regulatoryQuality -
              0.621311114237 * governance.ruleOfLaw +
              0.852663964988 * governance.governmentEffectiveness +
              0.221598174524 * governance.voiceAndAccountability)),
      ));
  return result;
}

/**
 * Estimate grpc necessary to achieve target stunting inverse
 * from the model equations.
 * Stunting inverse (si) is derived from the prevalence of
 * stunting (s) by the following formula:
 * si = 100 - 100 / 65 * s.
 * @param {number} target Target value of stunting inverse
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.615767523243 -
    0.136403617704 * governance.controlOfCorruption -
    0.0690187386714 * governance.politicalStability +
    0.362786997335 * governance.governmentEffectiveness +
    0.0626787851051 * governance.voiceAndAccountability
  );
  const B =
    5.14643417028 -
    0.272350860329 * governance.politicalStability -
    0.266201741521 * governance.regulatoryQuality -
    0.621311114237 * governance.ruleOfLaw +
    0.852663964988 * governance.governmentEffectiveness +
    0.221598174524 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(100.0 / target - 1.0) / A + B);
  return result;
}

/**
 * Transform prevalence of stunting (s) to stunting inverse (si),
 * using the formula si = 100 - 100 / 65 * s.
 * @param {number} stunting Prevalence of stunting as a percentage
 * @return {number} Stunting inverse
 */
export function stuntingToStuntingInverse(stunting) {
  return 100.0 - (100.0 / 65.0) * stunting;
}

/**
 * Transform stunting inverse (si) to prevalence of stunting (s),
 * using the formula s = (100 - si) * 65 / 100.
 * @param {number} stuntingInverse Stunting inverse
 * @return {number} Prevalence of stunting as a percentage
 */
export function stuntingInverseToStunting(stuntingInverse) {
  return ((100.0 - stuntingInverse) * 65.0) / 100.0;
}
