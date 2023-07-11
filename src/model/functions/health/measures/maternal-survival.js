import {maternalSurvival as coefficients} from './constants';

export const name = 'Maternal survival';

/**
 * Calculate maternal survival coverage from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Coverage percentage
 */
export function calculate(grpc, governance) {
  const result =
    95 +
    (100 - 95) /
      (1 +
        Math.exp(
          -(
            coefficients.C1 +
            coefficients.C11 * governance.controlOfCorruption +
            coefficients.C12 * governance.politicalStability +
            coefficients.C14 * governance.ruleOfLaw +
            coefficients.C15 * governance.governmentEffectiveness +
            coefficients.C16 * governance.voiceAndAccountability
          ) *
            (grpc -
              (coefficients.C2 +
                coefficients.C21 * governance.controlOfCorruption +
                coefficients.C22 * governance.politicalStability +
                coefficients.C23 * governance.regulatoryQuality +
                coefficients.C24 * governance.ruleOfLaw +
                coefficients.C25 * governance.governmentEffectiveness +
                // eslint-disable-next-line comma-dangle
                coefficients.C26 * governance.voiceAndAccountability)),
        ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target maternal survival coverage
 * from the model equations
 * @param {number} target Target coverage percentage
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    coefficients.C1 +
    coefficients.C11 * governance.controlOfCorruption +
    coefficients.C12 * governance.politicalStability +
    coefficients.C14 * governance.ruleOfLaw +
    coefficients.C15 * governance.governmentEffectiveness +
    coefficients.C16 * governance.voiceAndAccountability
  );
  const B =
    coefficients.C2 +
    coefficients.C21 * governance.controlOfCorruption +
    coefficients.C22 * governance.politicalStability +
    coefficients.C23 * governance.regulatoryQuality +
    coefficients.C24 * governance.ruleOfLaw +
    coefficients.C25 * governance.governmentEffectiveness +
    coefficients.C26 * governance.voiceAndAccountability;
  const result = Math.log((100.0 - 95.0) / (target - 95) - 1) / A + B;
  return result;
}
