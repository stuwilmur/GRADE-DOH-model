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
