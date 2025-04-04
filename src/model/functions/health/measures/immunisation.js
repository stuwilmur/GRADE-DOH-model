import {immunisation as coefficients} from './constants';

export const name = 'Immunisation';

/**
 * Calculate immunisation coverage from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Coverage percentage
 */
export function calculate(grpc, governance) {
  const result =
    100 /
    (1 +
      Math.exp(
        -(coefficients.C1 + coefficients.C11 * governance.politicalStability) *
          (grpc -
            // eslint-disable-next-line comma-dangle
            (coefficients.C2 +
              coefficients.C21 * governance.politicalStability)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target immunisation coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    coefficients.C1 +
    coefficients.C11 * governance.politicalStability
  );
  const B = coefficients.C2 + coefficients.C21 * governance.politicalStability;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}
