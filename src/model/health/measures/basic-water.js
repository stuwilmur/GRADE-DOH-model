import {basicWater as coefficients} from './constants';

export const name = 'Basic water';

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
          coefficients.C12 * governance.politicalStability +
          coefficients.C14 * governance.ruleOfLaw +
          coefficients.C15 * governance.governmentEffectiveness
        ) *
          (grpc -
            (coefficients.C2 +
              coefficients.C22 * governance.politicalStability +
              // eslint-disable-next-line comma-dangle
              coefficients.C24 * governance.ruleOfLaw)),
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
    coefficients.C12 * governance.politicalStability +
    coefficients.C14 * governance.ruleOfLaw +
    coefficients.C15 * governance.governmentEffectiveness
  );
  const B =
    coefficients.C2 +
    coefficients.C22 * governance.politicalStability +
    coefficients.C24 * governance.ruleOfLaw;
  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}
