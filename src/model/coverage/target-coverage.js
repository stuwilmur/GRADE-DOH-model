import * as basicSanitation from './basic-sanitation';
import * as basicWater from './basic-water';
import * as immunisation from './immunisation';
import * as maternalSurvival from './maternal-survival';
import * as safeSanitation from './safe-sanitation';
import * as safeWater from './safe-water';
import * as schoolAttendance from './school-attendance';
import * as underFiveSurvival from './under-five-survival';
import {targetCoverage} from './target';
import {curry2} from '../utils';

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
