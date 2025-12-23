import * as coverage from '../../../../src/model/functions/health';
import {governanceObject} from '../../../../src/model/functions/governance';

const digitsTolerance = 6;

const measuresToTest = new Map([
  ['basicSanitation', coverage.estimate.basicSanitation],
  ['basicWater', coverage.estimate.basicWater],
  ['immunisation', coverage.estimate.immunisation],
  ['maternalSurvival', coverage.estimate.maternalSurvival],
  ['underFiveSurvival', coverage.estimate.underFiveSurvival],
  ['safeSanitation', coverage.estimate.safeSanitation],
  ['safeWater', coverage.estimate.safeWater],
  ['schoolAttendance', coverage.estimate.schoolAttendance],
  ['primarySchoolAttendance', coverage.estimate.primarySchoolAttendance],
  ['lowerSchoolAttendance', coverage.estimate.lowerSchoolAttendance],
  ['upperSchoolAttendance', coverage.estimate.upperSchoolAttendance],
  [
    'primarySchoolTeacherToPupilRatio',
    coverage.estimate.primarySchoolTeacherToPupilRatio,
  ],
  [
    'lowerSchoolTeacherToPupilRatio',
    coverage.estimate.lowerSchoolTeacherToPupilRatio,
  ],
  [
    'upperSchoolTeacherToPupilRatio',
    coverage.estimate.upperSchoolTeacherToPupilRatio,
  ],
  ['electricity', coverage.estimate.electricity],
  ['cleanFuels', coverage.estimate.cleanFuels],
  ['stunting', coverage.estimate.stunting],
  ['hospitalBeds', coverage.estimate.hospitalBeds],
  ['nurses', coverage.estimate.nurses],
]);

const observedMax = {
  grpc: 10000.0,
  basicSanitation: 100.0,
  basicWater: 100.0,
  immunisation: 100.0,
  maternalSurvival: 100.0,
  underFiveSurvival: 99.9,
  safeSanitation: 100.0,
  safeWater: 100.0,
  schoolAttendance: 100.0,
  primarySchoolAttendance: 1.0,
  lowerSchoolAttendance: 1.0,
  upperSchoolAttendance: 1.0,
  primarySchoolTeacherToPupilRatio: 0.1,
  lowerSchoolTeacherToPupilRatio: 0.1,
  upperSchoolTeacherToPupilRatio: 0.1,
  electricity: 100.0,
  cleanFuels: 100.0,
  stunting: 0.0,
  hospitalBeds: 16,
  nurses: 20,
};

const observedMin = {
  grpc: 10000.0,
  basicSanitation: 0,
  basicWater: 0,
  immunisation: 0,
  maternalSurvival: 0,
  underFiveSurvival: 0,
  safeSanitation: 0,
  safeWater: 0,
  schoolAttendance: 0,
  primarySchoolAttendance: 0,
  lowerSchoolAttendance: 0,
  upperSchoolAttendance: 0,
  primarySchoolTeacherToPupilRatio: 0,
  lowerSchoolTeacherToPupilRatio: 0,
  upperSchoolTeacherToPupilRatio: 0,
  electricity: 0,
  cleanFuels: 0,
  stunting: 100.0,
  hospitalBeds: 0,
  nurses: 0,
};

const governanceObserved = governanceObject(0, 0, 0, 0, 0, 0);

const grpcImprovedMax = 2.0 * observedMax['grpc'];

measuresToTest.forEach((estimator, measure) => {
  test(`Tests ${measure} estimator is clamped when GRPC is increased`, () => {
    expect(
      estimator(
        observedMax[measure],
        observedMax['grpc'],
        grpcImprovedMax,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(observedMax[measure], digitsTolerance);
  });
});

const grpcImprovedMin = 0.5 * observedMax['grpc'];

measuresToTest.forEach((estimator, measure) => {
  test(`Tests ${measure} estimator is clamped when GRPC is increased`, () => {
    expect(
      estimator(
        observedMin[measure],
        observedMin['grpc'],
        grpcImprovedMin,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(observedMin[measure], digitsTolerance);
  });
});
