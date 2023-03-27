/**
 * Forecast voice and accountability from the model equations
 * @param {number} x Observed voice and accountability at current timestep
 * @param {number} x1 Forecast voice and accountability at previous timestep
 * @param {number} x2 Forecast voice and accountability at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} voice and accountability value
 */
function estimate(x, x1, x2, grpc, grpc1, residual) {
  // the model does not forecast voice: return current observed value
  return x;
}

module.exports = {
  estimate,
};
