import {governmentEffectiveness as coefficients} from './constants';

/**
 * Forecast government effectiveness from the model equations
 * Forecast relies on the previous forecast value: if this
 * is unavailable, the current observed value is returned
 * @param {number} governmentEffectiveness Government
 * effectiveness at current timestep
 * @param {number} governmentEffectiveness1 Government
 * effectiveness at previous timestep
 * @param {number} governmentEffectiveness2 Government
 * effectiveness at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @return {number} Government effectiveness value
 */
export function calculate(
  governmentEffectiveness,
  governmentEffectiveness1,
  governmentEffectiveness2,
  grpc,
  grpc1,
) {
  if (governmentEffectiveness1 == null) {
    return governmentEffectiveness;
  }
  const result =
    governmentEffectiveness1 -
    coefficients.C1 -
    coefficients.C2 * governmentEffectiveness1 +
    coefficients.C3 * Math.log(grpc1);
  return result;
}
