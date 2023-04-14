/**
 * Forecast political stability from the model equations
 * @param {number} x Observed political stability at current timestep
 * @param {number} x1 Forecast political stability at previous timestep
 * @param {number} x2 Forecast political stability at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} Political stability value
 */
export function estimate(x, x1, x2, grpc, grpc1) {
  const result =
    x1 -
    0.167147859521 -
    0.243193314392 * x1 +
    0.0241638211317 * Math.log(grpc1);
  return result;
}
