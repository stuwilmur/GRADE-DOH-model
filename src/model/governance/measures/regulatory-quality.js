import {regulatoryQuality as coefficients} from './constants';

/**
 * Forecast regulatory quality from the model equations
 * Forecast relies on two previous forecast values: if either
 * is unavailable, the current observed value is returned
 * @param {number} regulatoryQuality Regulatory quality
 * at current timestep
 * @param {number} regulatoryQuality1 Regulatory quality
 * at previous timestep
 * @param {number} regulatoryQuality2 Regulatory quality
 * at timestep before last
 * @param {number} grpc Governement revenue per capita at current timestep
 * @param {number} grpc1 Government revenue per capita at previous timestep
 * @return {number} regulatory quality value
 */
export function calculate(
  regulatoryQuality,
  regulatoryQuality1,
  regulatoryQuality2,
  grpc,
  grpc1,
) {
  if (regulatoryQuality1 == null || regulatoryQuality2 == null) {
    return regulatoryQuality;
  } else {
    const result =
      regulatoryQuality1 -
      coefficients.C1 -
      coefficients.C2 * (regulatoryQuality1 - regulatoryQuality2) -
      coefficients.C3 * regulatoryQuality1 +
      coefficients.C4 * Math.log(grpc1);
    return result;
  }
}
