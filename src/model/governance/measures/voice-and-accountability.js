export const name = 'Voice and accountability';

/**
 * Forecast voiceAndAccountability and accountability from the model equations
 * @param {number} voiceAndAccountability Voice and
 * accountability at current timestep
 * @param {number} voiceAndAccountability1 Voice and
 * accountability at previous timestep
 * @param {number} voiceAndAccountability2 Voice and
 * accountability at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @return {number} voiceAndAccountability and accountability value
 */
export function calculate(
  voiceAndAccountability,
  voiceAndAccountability1,
  voiceAndAccountability2,
  grpc,
  grpc1,
) {
  /* the model does not forecast voice and accountability:
  return current observed value */
  return voiceAndAccountability;
}
