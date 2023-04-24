import {schoolAttendance as coefficients} from './constants';

/**
 * Calculate school attendance coverage from the model equations
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
          coefficients.C15 * governance.governmentEffectiveness +
          coefficients.C16 * governance.voiceAndAccountability
        ) *
          (grpc -
            (coefficients.C2 +
              coefficients.C21 * governance.corruption +
              coefficients.C22 * governance.politicalStability +
              coefficients.C24 * governance.ruleOfLaw +
              coefficients.C25 * governance.governmentEffectiveness +
              // eslint-disable-next-line comma-dangle
              coefficients.C26 * governance.voiceAndAccountability)),
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
export function invert(target, governance) {
  const A = -(
    coefficients.C1 +
    coefficients.C12 * governance.politicalStability +
    coefficients.C15 * governance.governmentEffectiveness +
    coefficients.C16 * governance.voiceAndAccountability
  );
  const B =
    coefficients.C2 +
    coefficients.C21 * governance.corruption +
    coefficients.C22 * governance.politicalStability +
    coefficients.C24 * governance.ruleOfLaw +
    coefficients.C25 * governance.governmentEffectiveness +
    coefficients.C26 * governance.voiceAndAccountability;

  const result = Math.log(100.0 / target - 1.0) / A + B;
  return result;
}