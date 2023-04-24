import {ruleOfLaw as coefficients} from './constants';

/**
 * Forecast rule of law from the model equations
 * Forecast relies on two previous forecast values: if either
 * is unavailable, the current observed value is returned
 * @param {number} x Observed rule of law at current timestep
 * @param {number} x1 Forecast rule of law at previous timestep
 * @param {number} x2 Forecast rule of law at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} rule of law value
 */
export function estimate(x, x1, x2, grpc, grpc1, residual) {
  if (x1 == null || x2 == null) {
    return x;
  } else {
    const result =
      x1 -
      coefficients.C1 +
      coefficients.C2 * (Math.log(grpc) - Math.log(grpc1)) -
      coefficients.C3 * x1 -
      coefficients.C4 * (x1 - x2) +
      coefficients.C5 * Math.log(grpc1);
    return result;
  }
}
