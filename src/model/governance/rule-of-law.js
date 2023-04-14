/**
 * Forecast rule of law from the model equations
 * @param {number} x Observed rule of law at current timestep
 * @param {number} x1 Forecast rule of law at previous timestep
 * @param {number} x2 Forecast rule of law at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} rule of law value
 */
export function estimate(x, x1, x2, grpc, grpc1, residual) {
  if (x2 != null) {
    const result =
      x1 -
      0.189816187425 +
      0.0362663179499 * (Math.log(grpc) - Math.log(grpc1)) -
      0.246288840943 * x1 -
      0.040001478273 * (x1 - x2) +
      0.0287195914492 * Math.log(grpc1);
    return result;
  } else {
    // no value for the second lag available: return current observed value
    return x;
  }
}
