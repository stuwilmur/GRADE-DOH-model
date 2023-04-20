import {basicWater as coefficients} from './constants';

/**
 * Calculate basic water coverage from the model equations
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
          coefficients.C1 +
          coefficients.C12 * governance.polstab +
          coefficients.C14 * governance.rulelaw +
          coefficients.C15 * governance.goveffect
        ) *
          (grpc -
            (coefficients.C2 +
              coefficients.C22 * governance.polstab +
              // eslint-disable-next-line comma-dangle
              coefficients.C24 * governance.rulelaw)),
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
export function invert(target, governance) {
  const A = -(
    coefficients.C1 +
    coefficients.C12 * g.polstab +
    coefficients.C14 * g.rulelaw +
    coefficients.C15 * g.goveffect
  );
  const B =
    coefficients.C2 +
    coefficients.C22 * g.polstab +
    coefficients.C24 * g.rulelaw;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}
