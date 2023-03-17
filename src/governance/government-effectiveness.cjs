/**
 * Forecast government effectiveness from the model equations
 * @param {number} x Observed government effectiveness at current timestep
 * @param {number} x1 Forecast government effectiveness at previous timestep
 * @param {number} x2 Forecast government effectiveness at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} Government effectiveness value
 */
function estimate(x, x1, x2, grpc, grpc1, residual) {
  const result =
    x1 -
    0.297756094448 -
    0.289017172809 * x1 +
    0.0445136292801 * Math.log(grpc1) +
    residual;
  return result;
}

module.exports = {
  estimate,
};
