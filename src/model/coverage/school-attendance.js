/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.0000213122024475],
  [12, -0.00000244341235644],
  [15, -0.00000448331975672],
  [16, 0.00000387008646256],
  [2, -28011.9500401],
  [21, -5385.62234392],
  [22, -5740.45815327],
  [24, 8537.9203346],
  [25, -17828.8648572],
  [26, 0.00000387008646256],
]);

/**
 * Calculate school attendance coverage from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Coverage percentage
 */
export function calculate(grpc, governance) {
  const result =
    100 /
    (1 +
      Math.exp(
        -(
          coefficients.get(1) +
          coefficients.get(12) * governance.polstab +
          coefficients.get(15) * governance.goveffect +
          coefficients.get(16) * governance.voice
        ) *
          (grpc -
            (coefficients.get(2) +
              coefficients.get(21) * governance.corruption +
              coefficients.get(22) * governance.polstab +
              coefficients.get(24) * governance.rulelaw +
              coefficients.get(25) * governance.goveffect +
              // eslint-disable-next-line comma-dangle
              coefficients.get(26) * governance.voice)),
      ));
  return result;
}

/**
 * Estimate grpc necessary to achieve target school attendance coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(12) * governance.polstab +
    coefficients.get(15) * governance.goveffect +
    coefficients.get(16) * governance.voice
  );
  const B =
    -coefficients.get(2) +
    coefficients.get(21) * governance.corruption +
    coefficients.get(22) * governance.polstab +
    coefficients.get(23) * governance.regquality +
    coefficients.get(25) * governance.goveffect +
    coefficients.get(26) * governance.voice;

  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}
