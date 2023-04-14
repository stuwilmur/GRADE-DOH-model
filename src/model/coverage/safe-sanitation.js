/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.0000728527048502],
  [11, -0.0000597549843168],
  [13, 0.000101345075457],
  [16, -0.0000198813477065],
  [2, 4264.14183301],
  [21, 11489.1522222],
  [23, -3922.2505124],
  [24, -16243.7268368],
  [25, -4314.27110296],
  [26, 2870.70564325],
]);

/**
 * Calculate safe sanitation coverage from the model equations
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
          coefficients.get(11) * governance.corruption +
          coefficients.get(13) * governance.regquality +
          coefficients.get(16) * governance.voice
        ) *
          (grpc -
            (coefficients.get(2) +
              coefficients.get(21) * governance.corruption +
              coefficients.get(23) * governance.regquality +
              coefficients.get(24) * governance.rulelaw +
              coefficients.get(25) * governance.goveffect +
              // eslint-disable-next-line comma-dangle
              coefficients.get(26) * governance.voice)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target safe sanitation coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(11) * governance.corruption +
    coefficients.get(13) * governance.regquality +
    coefficients.get(16) * governance.voice
  );
  const B =
    coefficients.get(2) +
    coefficients.get(21) * governance.corruption +
    coefficients.get(23) * governance.regquality +
    coefficients.get(24) * governance.rulelaw +
    coefficients.get(25) * governance.goveffect +
    coefficients.get(26) * governance.voice;
  const result = Math.log(100.0 / target - 1.0) / A + B;

  return result;
}
