/* eslint-disable indent */
const coefficients = new Map([
  [1, 0.002777],
  [12, -8.16e-5],
  [14, 0.000788],
  [15, 0.001012],
  [2, -154.0232],
  [22, 108.3361],
  [24, 247.8044],
]);

/**
 * Estimate basic water coverage from the model equations
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
          coefficients.get(12) * governance.polstab +
          coefficients.get(14) * governance.rulelaw +
          coefficients.get(15) * governance.goveffect
        ) *
          (grpc -
            (coefficients.get(2) +
              coefficients.get(22) * governance.polstab +
              // eslint-disable-next-line comma-dangle
              coefficients.get(24) * governance.rulelaw))
      ));
  return result;
}

/**
 * Estimate grpc necessary to achieve target basic water coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
function invert(target, governance) {
  const A = -(
    coefficients.get(1) +
    coefficients.get(12) * g.polstab +
    coefficients.get(14) * g.rulelaw +
    coefficients.get(15) * g.goveffect
  );
  const B =
    coefficients.get(2) +
    coefficients.get(22) * g.polstab +
    coefficients.get(24) * g.rulelaw;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}

module.exports = {
  estimate,
  invert,
};
