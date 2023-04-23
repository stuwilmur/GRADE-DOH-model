import {safeWater as coefficients} from './constants';

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
          coefficients.C1 +
          coefficients.C11 * governance.corruption +
          coefficients.C14 * governance.rulelaw +
          coefficients.C15 * governance.goveffect +
          coefficients.C16 * governance.voice
        ) *
          (grpc -
            (coefficients.C2 +
              coefficients.C21 * governance.corruption +
              coefficients.C22 * governance.polstab +
              coefficients.C23 * governance.regquality +
              coefficients.C25 * governance.goveffect +
              // eslint-disable-next-line comma-dangle
              coefficients.C26 * governance.voice)),
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
    coefficients.C1 +
    coefficients.C11 * governance.corruption +
    coefficients.C14 * governance.rulelaw +
    coefficients.C15 * governance.goveffect +
    coefficients.C16 * governance.voice
  );
  const B =
    coefficients.C2 +
    coefficients.C21 * governance.corruption +
    coefficients.C22 * governance.polstab +
    coefficients.C23 * governance.regquality +
    coefficients.C25 * governance.goveffect +
    coefficients.C26 * governance.voice;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}
