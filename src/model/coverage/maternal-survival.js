/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.00162428846511],
  [11, 0.000480954347841],
  [12, -0.000245303543036],
  [14, -0.000993435385523],
  [15, 0.000635303615423],
  [16, 0.000368281180655],
  [2, -1708.97971425],
  [21, 854.424918802],
  [22, -328.239576261],
  [23, -193.518329888],
  [24, -1354.51903559],
  [25, 488.294796998],
  [26, 451.468766258],
]);

/**
 * Estimate maternal survival coverage from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Coverage percentage
 */
export function estimate(grpc, governance) {
  const result =
    95 +
    (100 - 95) /
      (1 +
        Math.exp(
          -(
            coefficients.get(1) +
            coefficients.get(11) * governance.corruption +
            coefficients.get(12) * governance.polstab +
            coefficients.get(14) * governance.rulelaw +
            coefficients.get(15) * governance.goveffect +
            coefficients.get(16) * governance.voice
          ) *
            (grpc -
              (coefficients.get(2) +
                coefficients.get(21) * governance.corruption +
                coefficients.get(22) * governance.polstab +
                coefficients.get(23) * governance.regquality +
                coefficients.get(24) * governance.rulelaw +
                coefficients.get(25) * governance.goveffect +
                // eslint-disable-next-line comma-dangle
                coefficients.get(26) * governance.voice))
        ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target maternal survival coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(11) * governance.corruption +
    coefficients.get(12) * governance.polstab +
    coefficients.get(14) * governance.rulelaw +
    coefficients.get(15) * governance.goveffect +
    coefficients.get(16) * governance.voice
  );
  const B =
    coefficients.get(2) +
    coefficients.get(21) * governance.corruption +
    coefficients.get(22) * governance.polstab +
    coefficients.get(23) * governance.regquality +
    coefficients.get(24) * governance.rulelaw +
    coefficients.get(25) * governance.goveffect +
    coefficients.get(26) * governance.voice;
  const result = Math.log((100.0 - 95.0) / (target - 95) - 1) / A + B;
  return result;
}
