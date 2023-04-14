/**
 * Forecast regulatory quality from the model equations
 * @param {number} x Observed regulatory quality at current timestep
 * @param {number} x1 Forecast regulatory quality at previous timestep
 * @param {number} x2 Forecast regulatory quality at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} regulatory quality value
 */
export function estimate(x, x1, x2, grpc, grpc1) {
  if (x2 != null) {
    const result =
      x1 -
      0.261581113717 -
      0.0620541606802 * (x1 - x2) -
      0.237039319473 * x1 +
      0.0395925282597 * Math.log(grpc1);
    return result;
  } else {
    // no value for the second lag available: return current observed value
    return x;
  }
}
