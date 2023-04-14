/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.00211451303265],
  [11, 0.00161631702456],
  [14, 0.00164245990855],
  [15, -0.00130743988612],
  [16, -0.000998711338049],
  [2, 593.101420816],
  [21, -228.009525552],
  [22, 57.8362351257],
  [23, -270.406995993],
  [25, 143.799468174],
  [26, 168.740964493],
]);

/**
 * Calculate safe water coverage from the model equations
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
              coefficients.get(26) * governance.voice)),
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
export function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(11) * governance.corruption +
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
