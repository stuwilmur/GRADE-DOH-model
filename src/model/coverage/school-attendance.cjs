/* eslint-disable indent */
const coefficients = new Map([
  [1, 2.13e-5],
  [12, -2.44e-6],
  [15, -4.48e-6],
  [16, 3.87e-6],
  [2, -28011.95],
  [21, -5385.622],
  [22, -5740.458],
  [24, 8537.92],
  [25, -17828.86],
]);

/**
 * Estimate school attendance coverage from the model equations
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
          coefficients.get(12) * goverance.polstab +
          coefficients.get(15) * goverance.goveffect +
          coefficients.get(16) * goverance.voice
        ) *
          (grpc -
            (-coefficients.get(2) +
              coefficients.get(21) * goverance.corruption +
              coefficients.get(22) * goverance.polstab +
              coefficients.get(23) * goverance.regquality +
              coefficients.get(25) * goverance.goveffect +
              // eslint-disable-next-line comma-dangle
              coefficients.get(26) * goverance.voice))
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
function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(12) * goverance.polstab +
    coefficients.get(15) * goverance.goveffect +
    coefficients.get(16) * goverance.voice
  );
  const B =
    -coefficients.get(2) +
    coefficients.get(21) * goverance.corruption +
    coefficients.get(22) * goverance.polstab +
    coefficients.get(23) * goverance.regquality +
    coefficients.get(25) * goverance.goveffect +
    coefficients.get(26) * goverance.voice;

  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}

module.exports = {
  estimate,
  invert,
};
