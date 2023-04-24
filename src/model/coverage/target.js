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
import {curry2, calculateResidual} from '../../utils';

/**
 * Estimate required grpc to achieve a target coverage from the model equations:
 * 1. Calculates the fitted coverage value from grpc and governance
 * 2. Uses this value and the observed value to calculate a residual
 * 3. Calculates the target grpc, by inverting the model equation:
 *      coverage = f(grpc) + residual
 * to give
 *      grpc = f^-1(coverage - residual)
 * where coverage is the target coverage.
 * The following conditions must be satisfied, or the function returns NaN:
 *      0 < observed coverage <= target coverage <= 100
 * @param {function} coverageCalculator Function which calculates coverage,
 * of the form:
 *      coverage = f(grpc, governance)
 * @param {function} coverageInverter Function which inverts the coverage model
 * equation, to return a value of grpc. Of the form:
 *      grpc = f(targetCoverage, governance)
 * @param {number} coverageObserved Observed value of coverage (percentage)
 * @param {number} grpcObserved Observed absolute monetary value of GRPC
 * @param {number} coverageTarget Target value of coverage (percentage)
 * @param {object} governanceObserved Observed governance (governance object)
 * @return {number} Absolute monetary value of grpc required to achieve target
 */
export function targetCoverage(
  coverageCalculator,
  coverageInverter,
  coverageObserved,
  grpcObserved,
  coverageTarget,
  governanceObserved,
) {
  if (
    coverageTarget > 0 &&
    coverageTarget >= coverageObserved &&
    coverageTarget <= 100
  ) {
    const coverageCalculated = coverageCalculator(
      grpcObserved,
      governanceObserved,
    );

    const residual = calculateResidual(coverageObserved, coverageCalculated);

    const targetGrpc = coverageInverter(
      coverageTarget - residual,
      governanceObserved,
    );

    return targetGrpc;
  } else {
    return NaN;
  }
}

export const targetBasicSanitation = curry2(
  targetCoverage,
  basicSanitation.calculate,
  basicSanitation.invert,
);
export const targetBasicWater = curry2(
  targetCoverage,
  basicWater.calculate,
  basicWater.invert,
);
export const targetImmunisation = curry2(
  targetCoverage,
  immunisation.calculate,
  immunisation.invert,
);
export const targetMaternalSurvival = curry2(
  targetCoverage,
  maternalSurvival.calculate,
  maternalSurvival.invert,
);
export const targetSafeSanitation = curry2(
  targetCoverage,
  safeSanitation.calculate,
  safeSanitation.invert,
);
export const targetSafeWater = curry2(
  targetCoverage,
  safeWater.calculate,
  safeWater.invert,
);
export const targetSchoolAttendance = curry2(
  targetCoverage,
  schoolAttendance.calculate,
  schoolAttendance.invert,
);
export const targetUnderFiveSurvival = curry2(
  targetCoverage,
  underFiveSurvival.calculate,
  underFiveSurvival.invert,
);
