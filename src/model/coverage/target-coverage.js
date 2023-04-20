import * as basicSanitation from './basic-sanitation';
import * as basicWater from './basic-water';
import * as immunisation from './immunisation';
import * as maternalSurvival from './maternal-survival';
import * as safeSanitation from './safe-sanitation';
import * as safeWater from './safe-water';
import * as schoolAttendance from './school-attendance';
import * as underFiveSurvival from './under-five-survival';
import {target} from './target';
import {curry2} from '../utils';

export const targetBasicSanitation = curry2(target, basicSanitation.calculate);
export const targetBasicWater = curry2(target, basicWater.calculate);
export const targetImmunisation = curry2(target, immunisation.calculate);
export const targetMaternalSurvival = curry2(
  target,
  maternalSurvival.calculate,
);
export const targetSafeSanitation = curry2(target, safeSanitation.calculate);
export const targetSafeWater = curry2(target, safeWater.calculate);
export const targetSchoolAttendance = curry2(
  target,
  schoolAttendance.calculate,
);
export const targetUnderFiveSurvival = curry2(
  target,
  underFiveSurvival.calculate,
);
