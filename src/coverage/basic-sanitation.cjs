/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.00224],
  [11, -0.001308],
  [12, -0.000341],
  [13, 0.000955],
  [14, 0.000705],
  [15, 0.000796],
  [16, -0.00047],
  [2, 233.9464],
  [21, 235.0595],
  [22, 75.44795],
  [23, -434.4536],
  [25, -351.7824],
  [26, 254.2561],
]);

/**
 * Estimate basic sanitation coverage from the model equations
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
          coefficients.get(12) * governance.polstab +
          coefficients.get(13) * governance.regquality +
          coefficients.get(14) * governance.rulelaw +
          coefficients.get(15) * governance.goveffect +
          coefficients.get(16) * governance.voice
        ) *
          (grpc -
            (coefficients.get(2) +
              coefficients.get(21) * governance.corruption +
              coefficients.get(22) * governance.polstab +
              coefficients.get(23) * governance.regquality +
              coefficients.get(25) * governance.goveffect +
              // eslint-disable-next-line comma-dangle
              coefficients.get(26) * governance.voice))
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target basic sanitation coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(11) * governance.corruption +
    coefficients.get(12) * governance.polstab +
    coefficients.get(13) * governance.regquality +
    coefficients.get(14) * governance.rulelaw +
    coefficients.get(15) * governance.goveffect +
    coefficients.get(16) * governance.voice
  );
  const B =
    coefficients.get(2) +
    coefficients.get(21) * governance.corruption +
    coefficients.get(22) * governance.polstab +
    coefficients.get(23) * governance.regquality +
    coefficients.get(25) * governance.goveffect +
    coefficients.get(26) * governance.voice;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}

module.exports = {
  estimate,
  invert,
};
