/**
 * Forecast voiceAndAccountability and accountability from the model equations
 * @param {number} voiceAndAccountability Observed voice and
 * accountability at current timestep
 * @param {number} voiceAndAccountability1 Forecast voice and
 * accountability at previous timestep
 * @param {number} voiceAndAccountability2 Forecast voice and
 * accountability at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @param {number} residual Current residual value
 * @return {number} voiceAndAccountability and accountability value
 */
export function estimate(
  voiceAndAccountability,
  voiceAndAccountability1,
  voiceAndAccountability2,
  grpc,
  grpc1,
  residual,
) {
  /* the model does not forecast voice and accountability:
  return current observed value */
  return voiceAndAccountability;
}
