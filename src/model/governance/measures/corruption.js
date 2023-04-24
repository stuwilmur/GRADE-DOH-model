import {corruption as coefficients} from './constants';

/**
 * Forecast corruption from the model equations
 * Forecast relies on the previous forecast value: if this
 * is unavailable, the current observed value is returned
 * @param {number} x Observed corruption at current timestep
 * @param {number} x1 Forecast corruption at previous timestep
 * @param {number} x2 Forecast corruption at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} corruption value
 */
export function estimate(x, x1, x2, grpc, grpc1) {
  if (x1 == null) {
    return x;
  }
  const result =
    x1 -
    coefficients.C1 -
    coefficients.C2 * x1 +
    coefficients.C3 * Math.log(grpc1);
  return result;
}
