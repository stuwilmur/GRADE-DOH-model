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

const observed = {
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

const governanceObserved = governanceObject(0, 0, 0, 0, 0, 0);
const grpcImproved = 2.0 * observed['grpc'];

measuresToTest.forEach((estimator, measure) => {
  console.log(
    '$$$',
    observed[measure],
    observed['grpc'],
    grpcImproved,
    governanceObserved,
  );
  test(`Tests ${measure} estimator with observed grpc and governance`, () => {
    expect(
      estimator(
        observed[measure],
        observed['grpc'],
        grpcImproved,
        governanceObserved,
        governanceObserved,
      ),
    ).toBeCloseTo(observed[measure], digitsTolerance);
  });
});
