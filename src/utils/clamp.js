/**
 * Clamps a value
 * @param {number} min: minimum
 * @param {number} max: maximum
 * @param {number} value to clamp
 * @return {number} clamped value
 */
export function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
}
