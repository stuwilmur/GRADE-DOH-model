/**
 * Calculates a residual
 * @param {number} valueObserved Observed value
 * @param {number} valueCalculated Calculated value
 * @param {number} valueCalculatedAdjusted Calculate adjusted value
 * @return {number} Calculated adjusted value with residual applied
 */
export function applyResidual(
  valueObserved,
  valueCalculated,
  valueCalculatedAdjusted,
) {
  const residual = valueObserved - valueCalculated;
  const ret = valueCalculatedAdjusted + residual;
  return ret;
}
