import * as measures from './measures';
import {curry, applyResidual, clamp} from '../../../utils';
import * as constants from './estimate-constants';

/**
 * Wraps an estimate function with limits
 * @param {function} estimateFn: estimator
 * @param {number} min: minimum coverage value
 * @param {number} max: maximum coverage value
 * @return {function} limited estimate function
 */
function limitEstimate(estimateFn, min = 0, max = 100) {
  return (...args) => clamp(min, max, estimateFn(...args));
}

/**
 * Estimate coverage from the model equations:
 * 1. Calculates the coverage value from the observed grpc and governance
 * 2. Calculates the coverage value from the adjusted grpc and governance
 * 3. Estimates the coverage value by adding the residual to the adjusted
 * coverage value
 * @param {function} coverageCalculator Function which calculates coverage,
 * of the form:
 *    coverage = f(grpc, governance)
 * @param {number} coverageObserved Obvserved value of coverage
 * @param {number} grpcObserved Observed absolute monetary value of GRPC
 * @param {number} grpcAdjusted Adjusted absolute monetary  of GRPC
 * @param {object} governanceObserved Observed governance (governance object)
 * @param {object} governanceAdjusted Adjusted governance (governance object)
 * @return {number} Estimated coverage value
 */
function estimate(
  coverageCalculator,
  coverageObserved,
  grpcObserved,
  grpcAdjusted,
  governanceObserved,
  governanceAdjusted,
) {
  const coverageCalculated = coverageCalculator(
    grpcObserved,
    governanceObserved,
  );

  const coverageAdjustedCalculated = coverageCalculator(
    grpcAdjusted,
    governanceAdjusted,
  );

  const coverageAdjustedEstimated = applyResidual(
    coverageObserved,
    coverageCalculated,
    coverageAdjustedCalculated,
  );

  return coverageAdjustedEstimated;
}

// Default limits (0-100):
export const basicSanitation = limitEstimate(
  curry(estimate, measures.basicSanitation.calculate),
);

export const basicWater = limitEstimate(
  curry(estimate, measures.basicWater.calculate),
);

export const immunisation = limitEstimate(
  curry(estimate, measures.immunisation.calculate),
);

export const maternalSurvival = limitEstimate(
  curry(estimate, measures.maternalSurvival.calculate),
);

export const safeSanitation = limitEstimate(
  curry(estimate, measures.safeSanitation.calculate),
);

export const safeWater = limitEstimate(
  curry(estimate, measures.safeWater.calculate),
);

export const schoolAttendance = limitEstimate(
  curry(estimate, measures.schoolAttendance.calculate),
);

export const underFiveSurvival = limitEstimate(
  curry(estimate, measures.underFiveSurvival.calculate),
  0,
  constants.MaxUnderFiveSurvival,
);

export const primarySchoolAttendance = limitEstimate(
  curry(estimate, measures.primarySchoolAttendance.calculate),
  0,
  1.0,
);

export const lowerSchoolAttendance = limitEstimate(
  curry(estimate, measures.lowerSchoolAttendance.calculate),
  0,
  1.0,
);

export const upperSchoolAttendance = limitEstimate(
  curry(estimate, measures.upperSchoolAttendance.calculate),
  0,
  1.0,
);

export const primarySchoolTeacherToPupilRatio = limitEstimate(
  curry(estimate, measures.primarySchoolTeacherToPupilRatio.calculate),
  0,
  constants.MaxPupilToTeacherRatio,
);

export const lowerSchoolTeacherToPupilRatio = limitEstimate(
  curry(estimate, measures.lowerSchoolTeacherToPupilRatio.calculate),
  0,
  constants.MaxPupilToTeacherRatio,
);

export const upperSchoolTeacherToPupilRatio = limitEstimate(
  curry(estimate, measures.upperSchoolTeacherToPupilRatio.calculate),
  0,
  constants.MaxPupilToTeacherRatio,
);

export const cleanFuels = limitEstimate(
  curry(estimate, measures.cleanFuels.calculate),
);

export const electricity = limitEstimate(
  curry(estimate, measures.electricity.calculate),
);

/**
 * Estimate stunting prevalence from the model equations:
 * this is necessary as to calculate stunting, the working
 * variable must be transformed to stunting inverse.
 * @param {number} coverageObserved Obvserved value of coverage
 * @param {number} grpcObserved Observed absolute monetary value of GRPC
 * @param {number} grpcAdjusted Adjusted absolute monetary  of GRPC
 * @param {object} governanceObserved Observed governance (governance object)
 * @param {object} governanceAdjusted Adjusted governance (governance object)
 * @return {number} Estimated coverage value
 */
export function stunting(
  coverageObserved,
  grpcObserved,
  grpcAdjusted,
  governanceObserved,
  governanceAdjusted,
) {
  const stuntingInverseObserved =
    measures.stuntingInverse.stuntingToStuntingInverse(coverageObserved);
  const estimatedStuntingInverse = estimate(
    measures.stuntingInverse.calculate,
    stuntingInverseObserved,
    grpcObserved,
    grpcAdjusted,
    governanceObserved,
    governanceAdjusted,
  );
  const stuntingValue = measures.stuntingInverse.stuntingInverseToStunting(
    estimatedStuntingInverse,
  );
  return clamp(constants.MinimumStunting, 100.0, stuntingValue);
}

/**
 * Estimate hospital beds per 1,000 people from the model equations:
 * this is necessary as to calculate hospital beds, the working
 * variable must be transformed to hospital beds inverse.
 * @param {number} coverageObserved Obvserved value of coverage
 * @param {number} grpcObserved Observed absolute monetary value of GRPC
 * @param {number} grpcAdjusted Adjusted absolute monetary  of GRPC
 * @param {object} governanceObserved Observed governance (governance object)
 * @param {object} governanceAdjusted Adjusted governance (governance object)
 * @return {number} Estimated coverage value
 */
export function hospitalBeds(
  coverageObserved,
  grpcObserved,
  grpcAdjusted,
  governanceObserved,
  governanceAdjusted,
) {
  const hospitalBedsInverseObserved =
    measures.hospitalBedsInverse.hospitalBedsToHospitalBedsInverse(
      coverageObserved,
    );
  const estimatedHospitalBedsInverse = estimate(
    measures.hospitalBedsInverse.calculate,
    hospitalBedsInverseObserved,
    grpcObserved,
    grpcAdjusted,
    governanceObserved,
    governanceAdjusted,
  );
  const hospitalBedsValue =
    measures.hospitalBedsInverse.hospitalBedsInverseToHospitalBeds(
      estimatedHospitalBedsInverse,
    );
  return clamp(0, constants.MaxHospitalBedsPerThousand, hospitalBedsValue);
}

/**
 * Estimate nurses per 1,000 people from the model equations:
 * this is necessary as to calculate nurses, the working
 * variable must be transformed to nurses inverse.
 * @param {number} coverageObserved Obvserved value of coverage
 * @param {number} grpcObserved Observed absolute monetary value of GRPC
 * @param {number} grpcAdjusted Adjusted absolute monetary  of GRPC
 * @param {object} governanceObserved Observed governance (governance object)
 * @param {object} governanceAdjusted Adjusted governance (governance object)
 * @return {number} Estimated coverage value
 */
export function nurses(
  coverageObserved,
  grpcObserved,
  grpcAdjusted,
  governanceObserved,
  governanceAdjusted,
) {
  const nursesInverseObserved =
    measures.nursesInverse.nursesToNursesInverse(coverageObserved);
  const estimatedNursesInverse = estimate(
    measures.nursesInverse.calculate,
    nursesInverseObserved,
    grpcObserved,
    grpcAdjusted,
    governanceObserved,
    governanceAdjusted,
  );
  const nursesValue = measures.nursesInverse.nursesInverseToNurses(
    estimatedNursesInverse,
  );
  return clamp(0, constants.MaxNursesPerThousand, nursesValue);
}
