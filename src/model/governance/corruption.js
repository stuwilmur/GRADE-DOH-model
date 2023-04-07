/**
 * Forecast corruption from the model equations
 * @param {number} x Observed corruption at current timestep
 * @param {number} x1 Forecast corruption at previous timestep
 * @param {number} x2 Forecast corruption at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} corruption value
 */
export function estimate(x, x1, x2, grpc, grpc1, residual) {
  const result =
    x1 -
    0.262062915863 -
    0.268386527335 * x1 +
    0.0388009869267 * Math.log(grpc1) +
    residual;
  return result;
}
