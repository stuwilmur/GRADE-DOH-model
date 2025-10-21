export const name = 'Hospital beds per 1,000 people';

/**
 * Calculate hospital beds per 1,000 people inverse from the model equations.
 * Hospital beds per 1,000 people inverse (hi) is derived from number of
 * hospital beds per 1,000 people (h) by the following formula:
 * hi = ln(h) + 4.
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Hospital beds per 1,000 people inverse inverse value
 */
export function calculate(grpc, governance) {
  const result =
    8.0 /
    (1.0 +
      Math.exp(
        -(
          0.197193860745 -
          0.0244300078342 * governance.controlOfCorruption -
          0.103694236387 * governance.ruleOfLaw +
          0.0362146804208 * governance.governmentEffectiveness +
          0.0942335582254 * governance.voiceAndAccountability
        ) *
          (Math.log(grpc) -
            (4.65656784328 +
              0.958363387674 * governance.controlOfCorruption -
              0.808120140928 * governance.politicalStability -
              1.62279877246 * governance.ruleOfLaw +
              1.65628078968 * governance.voiceAndAccountability)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target hospital beds per 1,000
 * people inverse from the model equations.
 * Hospital beds per 1,000 people inverse (hi) is derived from number
 * of hospital beds per 1,000 people (h) by the following formula:
 * hi = ln(h) + 4.
 * @param {number} target Target value of hospital beds per 1,000 people inverse
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.197193860745 -
    0.0244300078342 * governance.controlOfCorruption -
    0.103694236387 * governance.ruleOfLaw +
    0.0362146804208 * governance.governmentEffectiveness +
    0.0942335582254 * governance.voiceAndAccountability
  );
  const B =
    4.65656784328 +
    0.958363387674 * governance.controlOfCorruption -
    0.808120140928 * governance.politicalStability -
    1.62279877246 * governance.ruleOfLaw +
    1.65628078968 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(8.0 / target - 1.0) / A + B);
  return result;
}

/**
 * Transform hospital beds per 1,000 people (h) to its inverse (hi),
 * using the formula hi = ln(h) + 4.
 * @param {number} hospitalBeds Hospital beds per 1,000 people
 * @return {number} Hospital beds per 1,000 people inverse
 */
export function hospitalBedsToHospitalBedsInverse(hospitalBeds) {
  return Math.log(hospitalBeds) + 4.0;
}

/**
 * Transform hospital beds per 1,000 people inverse (hi) to
 * hospital beds per 1,000 people (h),
 * using the formula h = exp(hi - 4).
 * @param {number} hospitalBedsInverse Hospital beds per 1,000 people inverse
 * @return {number} Hospital beds per 1,000 people
 */
export function hospitalBedsInverseToHospitalBeds(hospitalBedsInverse) {
  return Math.exp(hospitalBedsInverse - 4.0);
}
