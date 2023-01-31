/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.002115],
  [11, 0.001616],
  [14, 0.001642],
  [15, -0.001307],
  [16, -0.000999],
  [2, 593.1014],
  [21, -228.0095],
  [22, 57.83624],
  [23, -270.407],
  [25, 143.7995],
  [26, 168.741],
]);

/**
 * Estimate safe water coverage from the model equations
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
 * Estimate grpc necessary to achieve target safe water coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(11) * governance.corruption +
    0 * governance.polstab +
    0 * governance.regquality +
    coefficients.get(14) * governance.rulelaw +
    coefficients.get(15) * governance.goveffect +
    coefficients.get(16) * governance.voice
  );
  const B =
    coefficients.get(2) +
    coefficients.get(21) * governance.corruption +
    coefficients.get(22) * governance.polstab +
    coefficients.get(23) * governance.regquality +
    0 * governance.rulelaw +
    coefficients.get(25) * governance.goveffect +
    coefficients.get(26) * governance.voice;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}

module.exports = {
  estimate,
  invert,
};
