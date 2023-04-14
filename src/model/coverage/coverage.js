import * as basicSanitation from './basic-sanitation';
import * as basicWater from './basic-water';
import * as immunisation from './immunisation';
import * as maternalSurvival from './maternal-survival';
import * as safeSanitation from './safe-sanitation';
import * as safeWater from './safe-water';
import * as schoolAttendance from './school-attendance';
import * as underFiveSurvival from './under-five-survival';
import {estimateCoverage} from './estimate-coverage';

// prettier-ignore
const curryCalculator =
  (coverageCalculator) =>
    (
      coverageObserved,
      grpcObserved,
      grpcAdjusted,
      governanceObserved,
      governancedAdjusted,
    ) =>
      estimateCoverage(
        coverageCalculator,
        coverageObserved,
        grpcObserved,
        grpcAdjusted,
        governanceObserved,
        governancedAdjusted,
      );

export const estimateBasicSanitation = curryCalculator(
  basicSanitation.calculate,
);
export const estimateBasicWater = curryCalculator(basicWater.calculate);
export const estimateImmunisation = curryCalculator(immunisation.calculate);
export const estimateMaternalSurvival = curryCalculator(
  maternalSurvival.calculate,
);
export const estimateSafeSanitation = curryCalculator(safeSanitation.calculate);
export const estimateSafeWater = curryCalculator(safeWater.calculate);
export const estimateSchoolAttendance = curryCalculator(
  schoolAttendance.calculate,
);
export const estimateUnderFiveSurvival = curryCalculator(
  underFiveSurvival.calculate,
);
