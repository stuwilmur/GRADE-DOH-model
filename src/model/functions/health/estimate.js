import * as measures from './measures';
import {curry, applyResidual} from '../../../utils';

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

export const basicSanitation = curry(
  estimate,
  measures.basicSanitation.calculate,
);
export const basicWater = curry(estimate, measures.basicWater.calculate);
export const immunisation = curry(estimate, measures.immunisation.calculate);
export const maternalSurvival = curry(
  estimate,
  measures.maternalSurvival.calculate,
);
export const safeSanitation = curry(
  estimate,
  measures.safeSanitation.calculate,
);
export const safeWater = curry(estimate, measures.safeWater.calculate);
export const schoolAttendance = curry(
  estimate,
  measures.schoolAttendance.calculate,
);
export const underFiveSurvival = curry(
  estimate,
  measures.underFiveSurvival.calculate,
);
export const primarySchoolAttendance = curry(
  estimate,
  measures.primarySchoolAttendance.calculate,
);
export const lowerSchoolAttendance = curry(
  estimate,
  measures.lowerSchoolAttendance.calculate,
);
export const upperSchoolAttendance = curry(
  estimate,
  measures.upperSchoolAttendance.calculate,
);
export const primarySchoolTeacherToPupilRatio = curry(
  estimate,
  measures.primarySchoolTeacherToPupilRatio.calculate,
);
export const lowerSchoolTeacherToPupilRatio = curry(
  estimate,
  measures.lowerSchoolTeacherToPupilRatio.calculate,
);
export const upperSchoolTeacherToPupilRatio = curry(
  estimate,
  measures.upperSchoolTeacherToPupilRatio.calculate,
);
export const cleanFuels = curry(estimate, measures.cleanFuels.calculate);
export const electricity = curry(estimate, measures.electricity.calculate);

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
  return measures.stuntingInverse.stuntingInverseToStunting(
    estimatedStuntingInverse,
  );
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
  return measures.hospitalBedsInverse.hospitalBedsInverseToHospitalBeds(
    estimatedHospitalBedsInverse,
  );
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
  return measures.nursesInverse.nursesInverseToNurses(estimatedNursesInverse);
}
