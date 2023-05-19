import {controlOfCorruption as coefficients} from './constants';

export const name = 'Control of controlOfCorruption';

/**
 * Forecast controlOfCorruption from the model equations
 * Forecast relies on the previous forecast value: if this
 * is unavailable, the current observed value is returned
 * @param {number} controlOfCorruption controlOfCorruption at current timestep
 * @param {number} controlOfCorruption1  controlOfCorruption at
 * previous timestep
 * @param {number} controlOfCorruption2 controlOfCorruption at
 * timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @return {number} controlOfCorruption value
 */
export function calculate(
  controlOfCorruption,
  controlOfCorruption1,
  controlOfCorruption2,
  grpc,
  grpc1,
) {
  if (controlOfCorruption1 == null) {
    return controlOfCorruption;
  }
  const result =
    controlOfCorruption1 -
    coefficients.C1 -
    coefficients.C2 * controlOfCorruption1 +
    coefficients.C3 * Math.log(grpc1);
  return result;
}
