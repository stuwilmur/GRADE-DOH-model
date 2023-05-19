import {corruption as coefficients} from './constants';

export const name = 'Control of corruption';

/**
 * Forecast corruption from the model equations
 * Forecast relies on the previous forecast value: if this
 * is unavailable, the current observed value is returned
 * @param {number} corruption Corruption at current timestep
 * @param {number} corruption1  Corruption at previous timestep
 * @param {number} corruption2 Corruption at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @return {number} corruption value
 */
export function calculate(corruption, corruption1, corruption2, grpc, grpc1) {
  if (corruption1 == null) {
    return corruption;
  }
  const result =
    corruption1 -
    coefficients.C1 -
    coefficients.C2 * corruption1 +
    coefficients.C3 * Math.log(grpc1);
  return result;
}
