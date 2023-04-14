/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.00223958265099],
  [11, -0.00130802514504],
  [12, -0.000340907654608],
  [13, 0.000954578905538],
  [14, 0.000705231153421],
  [15, 0.000796386433038],
  [16, -0.000470340202599],
  [2, 233.94641541],
  [21, 235.059513198],
  [22, 75.4479473509],
  [23, -434.453582409],
  [25, -351.782351645],
  [26, 254.25607665],
]);

/**
 * Calculate basic sanitation coverage from the model equations
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
              coefficients.get(26) * governance.voice)),
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
export function invert(target, governance) {
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
