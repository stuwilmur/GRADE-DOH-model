import * as basicSanitation from './basic-sanitation';
import * as basicWater from './basic-water';
import * as immunisation from './immunisation';
import * as maternalSurvival from './maternal-survival';
import * as safeSanitation from './safe-sanitation';
import * as safeWater from './safe-water';
import * as schoolAttendance from './school-attendance';
import * as underFiveSurvival from './under-five-survival';
import {estimate} from './estimate';
import {curry} from '../utils';

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
