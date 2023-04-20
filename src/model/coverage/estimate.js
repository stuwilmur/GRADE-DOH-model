import {applyResidual} from '../utils';

/**
 * Estimate coverage from the model equations:
 * 1. Calculates the coverage value from the observed grpc and governance
 * 2. Calculates the coverage value from the adjusted grpc and governance
 * 3. Estimates the coverage value by adding the residual to the adjusted
 * coverage value
 * @param {function} coverageCalculator Function which calculates coverage,
 * of the form:
 *    coverage = f(grpc, governance)
 * @param {number} coverageObserved Obvserved value of coverage (percentage)
 * @param {number} grpcObserved Observed absolute monetary value of GRPC
 * @param {number} grpcAdjusted Adjusted absolute monetary  of GRPC
 * @param {object} governanceObserved Observed governance (governance object)
 * @param {object} governancedAdjusted Adjusted governance (governance object)
 * @return {number} Coverage percentage
 */
export function estimate(
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
