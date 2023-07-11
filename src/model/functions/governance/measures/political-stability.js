import {politicalStability as coefficients} from './constants';

export const name = 'Political stability';

/**
 * Forecast political stability from the model equations
 * Forecast relies on the previous forecast value: if this
 * is unavailable, the current observed value is returned
 * @param {number} politicalStability Political
 * stability at current timestep
 * @param {number} politicalStability1 Political
 * stability at previous timestep
 * @param {number} politicalStability2 Political
 * stability at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @return {number} Political stability value
 */
export function calculate(
  politicalStability,
  politicalStability1,
  politicalStability2,
  grpc,
  grpc1,
) {
  if (politicalStability1 == null) {
    return politicalStability;
  }
  const result =
    politicalStability1 -
    coefficients.C1 -
    coefficients.C2 * politicalStability1 +
    coefficients.C3 * Math.log(grpc1);
  return result;
}
