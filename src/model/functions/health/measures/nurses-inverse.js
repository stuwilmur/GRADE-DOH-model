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
          0.302830708013 +
          0.0554357864654 * governance.controlOfCorruption -
          0.0522345181898 * governance.governmentEffectiveness +
          0.0158111987836 * governance.voiceAndAccountability
        ) *
          (Math.log(grpc) -
            (5.44629383701 +
              0.469540956936 * governance.controlOfCorruption -
              0.231057562813 * governance.politicalStability)),
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
    0.302830708013 +
    0.0554357864654 * governance.controlOfCorruption -
    0.0522345181898 * governance.governmentEffectiveness +
    0.0158111987836 * governance.voiceAndAccountability
  );
  const B =
    5.44629383701 +
    0.469540956936 * governance.controlOfCorruption -
    0.231057562813 * governance.politicalStability;
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
