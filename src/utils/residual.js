/**
 * Calculates a residual
 * @param {number} valueObserved Observed value
 * @param {number} valueCalculated Calculated value
 * @return {number} Calculated residual
 */
export function calculateResidual(valueObserved, valueCalculated) {
  const residual = valueObserved - valueCalculated;
  return residual;
}

/**
 * Calculates a residual and applies it to a fitted value
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
  const residual = calculateResidual(valueObserved, valueCalculated);
  const valueCalculatedAdjustedWithResidualApplied =
    valueCalculatedAdjusted + residual;
  return valueCalculatedAdjustedWithResidualApplied;
}
