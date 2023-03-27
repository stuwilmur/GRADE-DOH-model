/* eslint-disable indent */
const coefficients = new Map([
  [1, 7.29e-5],
  [11, -5.98e-5],
  [13, 0.000101],
  [16, -1.99e-5],
  [2, 4264.142],
  [21, 11489.15],
  [23, -3922.251],
  [24, -16243.73],
  [25, -4314.271],
  [26, 2870.706],
]);

/**
 * Estimate safe sanitation coverage from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Coverage percentage
 */
function estimate(grpc, governance) {
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
              coefficients.get(26) * governance.voice))
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
function invert(target, governance) {
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

module.exports = {
  estimate,
  invert,
};
