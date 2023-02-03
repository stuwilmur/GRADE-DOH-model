/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.000487660315618],
  [12, -0.0000292129327268],
  [15, -0.0000889823437485],
  [16, 0.0000441671186032],
  [2, 5986.3033303],
  [21, 295.792385161],
  [22, -218.908408761],
  [23, -307.070582687],
  [25, -1800.65834264],
  [26, 389.563410216],
]);

/**
 * Estimate under-5 survival coverage from the model equations
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
          coefficients.get(12) * governance.POLSTAB +
          coefficients.get(15) * governance.GOVEFFECT +
          coefficients.get(16) * governance.VOICE
        ) *
          (grpc -
            (-coefficients.get(2) +
              coefficients.get(21) * governance.CORRUPTION +
              coefficients.get(22) * governance.POLSTAB +
              coefficients.get(23) * governance.REGQUALITY +
              coefficients.get(25) * governance.GOVEFFECT +
              // eslint-disable-next-line comma-dangle
              coefficients.get(26) * governance.VOICE))
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target under-5 survival coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(12) * governance.POLSTAB +
    coefficients.get(15) * governance.GOVEFFECT +
    coefficients.get(16) * governance.VOICE
  );
  const B =
    -coefficients.get(2) +
    coefficients.get(21) * governance.CORRUPTION +
    coefficients.get(22) * governance.POLSTAB +
    coefficients.get(23) * governance.REGQUALITY +
    coefficients.get(25) * governance.GOVEFFECT +
    coefficients.get(26) * governance.VOICE;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}

module.exports = {
  estimate,
  invert,
};
