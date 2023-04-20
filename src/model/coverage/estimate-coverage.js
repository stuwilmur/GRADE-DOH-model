import * as basicSanitation from './basic-sanitation';
import * as basicWater from './basic-water';
import * as immunisation from './immunisation';
import * as maternalSurvival from './maternal-survival';
import * as safeSanitation from './safe-sanitation';
import * as safeWater from './safe-water';
import * as schoolAttendance from './school-attendance';
import * as underFiveSurvival from './under-five-survival';
import {estimateCoverage} from './estimate';
import {curry} from '../utils';

export const estimateBasicSanitation = curry(
  estimateCoverage,
  basicSanitation.calculate,
);
export const estimateBasicWater = curry(estimateCoverage, basicWater.calculate);
export const estimateImmunisation = curry(
  estimateCoverage,
  immunisation.calculate,
);
export const estimateMaternalSurvival = curry(
  estimateCoverage,
  maternalSurvival.calculate,
);
export const estimateSafeSanitation = curry(
  estimateCoverage,
  safeSanitation.calculate,
);
export const estimateSafeWater = curry(estimateCoverage, safeWater.calculate);
export const estimateSchoolAttendance = curry(
  estimateCoverage,
  schoolAttendance.calculate,
);
export const estimateUnderFiveSurvival = curry(
  estimateCoverage,
  underFiveSurvival.calculate,
);
