import {
  basicSanitation,
  basicWater,
  immunisation,
  maternalSurvival,
  safeSanitation,
  safeWater,
  schoolAttendance,
  underFiveSurvival,
} from './measures';
import {curry, applyResidual} from '../../utils';

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

export const estimateBasicSanitation = curry(
  estimate,
  basicSanitation.calculate,
);
export const estimateBasicWater = curry(estimate, basicWater.calculate);
export const estimateImmunisation = curry(estimate, immunisation.calculate);
export const estimateMaternalSurvival = curry(
  estimate,
  maternalSurvival.calculate,
);
export const estimateSafeSanitation = curry(estimate, safeSanitation.calculate);
export const estimateSafeWater = curry(estimate, safeWater.calculate);
export const estimateSchoolAttendance = curry(
  estimate,
  schoolAttendance.calculate,
);
export const estimateUnderFiveSurvival = curry(
  estimate,
  underFiveSurvival.calculate,
);
