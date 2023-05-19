import {ruleOfLaw as coefficients} from './constants';

export const name = 'Rule of law';

/**
 * Forecast rule of law from the model equations
 * Forecast relies on two previous forecast values: if either
 * is unavailable, the current observed value is returned
 * @param {number} ruleOfLaw Rule of law at current timestep
 * @param {number} ruleOfLaw1 Rule of law at previous timestep
 * @param {number} ruleOfLaw2 Rule of law at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @return {number} rule of law value
 */
export function calculate(ruleOfLaw, ruleOfLaw1, ruleOfLaw2, grpc, grpc1) {
  if (ruleOfLaw1 == null || ruleOfLaw2 == null) {
    return ruleOfLaw;
  } else {
    const result =
      ruleOfLaw1 -
      coefficients.C1 +
      coefficients.C2 * (Math.log(grpc) - Math.log(grpc1)) -
      coefficients.C3 * ruleOfLaw1 -
      coefficients.C4 * (ruleOfLaw1 - ruleOfLaw2) +
      coefficients.C5 * Math.log(grpc1);
    return result;
  }
}
