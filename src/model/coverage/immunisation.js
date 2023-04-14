/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.0000814179121452],
  [11, -0.000015088567052],
  [2, -25232.7095733],
  [21, -8328.61260977],
]);

/**
 * Calculate immunisation coverage from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Coverage percentage
 */
export function calculate(grpc, governance) {
  const result =
    100 /
    (1 +
      Math.exp(
        -(coefficients.get(1) + coefficients.get(11) * governance.polstab) *
          (grpc -
            // eslint-disable-next-line comma-dangle
            (coefficients.get(2) + coefficients.get(21) * governance.polstab)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target immunisation coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(coefficients.get(1) + coefficients.get(11) * governance.polstab);
  const B = coefficients.get(2) + coefficients.get(21) * governance.polstab;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}
