const basicSanitation = require('./basic-sanitation.cjs');
const basicWater = require('./basic-water.cjs');
const immunisation = require('./immunisation.cjs');
const maternalSurvival = require('./maternal-survival.cjs');
const safeSanitation = require('./safe-sanitation.cjs');
const safeWater = require('./safe-water.cjs');
const schoolAttendance = require('./school-attendance.cjs');
const underFiveSurvival = require('./under-five-survival.cjs');

const estimateBasicSanitation = basicSanitation.estimate;
const invertBasicSanitation = basicSanitation.invert;
const estimateBasicWater = basicWater.estimate;
const invertBasicWater = basicWater.invert;
const estimateImmunisation = immunisation.estimate;
const invertImmunisation = immunisation.invert;
const estimateMaternalSurvival = maternalSurvival.estimate;
const invertMaternalSurvival = maternalSurvival.invert;
const estimateSafeSanitation = safeSanitation.estimate;
const invertSafeSanitation = safeSanitation.invert;
const estimateSafeWater = safeWater.estimate;
const invertSafeWater = safeWater.invert;
const estimateSchoolAttendance = schoolAttendance.estimate;
const invertSchoolAttendance = schoolAttendance.invert;
const estimateUnderFiveSurvival = underFiveSurvival.estimate;
const invertUnderFiveSurvival = underFiveSurvival.invert;

module.exports = {
  estimateBasicSanitation,
  invertBasicSanitation,
  estimateBasicWater,
  invertBasicWater,
  estimateImmunisation,
  invertImmunisation,
  estimateMaternalSurvival,
  invertMaternalSurvival,
  estimateSafeSanitation,
  invertSafeSanitation,
  estimateSafeWater,
  invertSafeWater,
  estimateSchoolAttendance,
  invertSchoolAttendance,
  estimateUnderFiveSurvival,
  invertUnderFiveSurvival,
};
