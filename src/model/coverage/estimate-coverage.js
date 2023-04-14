import {applyResidual} from '../utils';

/**
 * Estimate coverage from the model equations:
 * 1. Calculates the coverage value from the observed grpc and governance
 * 2. Calculates the coverage value from the adjusted grpc and governance
 * 3. Estimates the coverage value by adding the residual to the adjusted
 * coverage value
 * @param {function} coverageCalculator
 * @param {number} coverageObserved
 * @param {number} grpcObserved
 * @param {number} grpcAdjusted
 * @param {object} governanceObserved
 * @param {object} governancedAdjusted
 * @return {number} Coverage percentage
 */
export function estimateCoverage(
  coverageCalculator,
  coverageObserved,
  grpcObserved,
  grpcAdjusted,
  governanceObserved,
  governancedAdjusted,
) {
  const coverageCalculated = coverageCalculator(
    grpcObserved,
    governanceObserved,
  );
  const coverageAdjustedCalculated = coverageCalculator(
    grpcAdjusted,
    governancedAdjusted,
  );
  const coverageAdjustedEstimated = applyResidual(
    coverageObserved,
    coverageCalculated,
    coverageAdjustedCalculated,
  );
  return coverageAdjustedEstimated;
}
