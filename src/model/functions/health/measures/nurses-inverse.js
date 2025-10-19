export const name = 'Nurses per 1,000 people';

/**
 * Calculate nurses per 1,000 people inverse from the model equations.
 * Nurses per 1,000 people inverse (ni) is derived from number of
 * nurses per 1,000 people (n) by the following formula:
 * ni = ln(n) + 4.
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Nurses per 1,000 people inverse inverse value
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
 * Estimate grpc necessary to achieve target nurses per 1,000
 * people inverse from the model equations.
 * Nurses per 1,000 people inverse (ni) is derived from number
 * of nurses per 1,000 people (n) by the following formula:
 * ni = ln(n) + 4.
 * @param {number} target Target value of nurses per 1,000 people inverse
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
 * Transform nurses per 1,000 people (n) to its inverse (ni),
 * using the formula ni = ln(n) + 4.
 * @param {number} nurses Nurses per 1,000 people
 * @return {number} Nurses per 1,000 people inverse
 */
export function nursesToNursesInverse(nurses) {
    return Math.log(nurses) + 4.0;
}

/**
 * Transform nurses per 1,000 people inverse (ni) to
 * nurses per 1,000 people (n),
 * using the formula h = exp(ni - 4).
 * @param {number} nursesInverse Nurses per 1,000 people inverse
 * @return {number} Nurses per 1,000 people
 */
export function nursesInverseToNurses(nursesInverse) {
    return Math.exp(nursesInverse - 4.0);
}