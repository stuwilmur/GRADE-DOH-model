import * as target from '../../src/interface/target';
import {data} from 'grade-doh-data';
import {columnNames} from '../../src/model/constants';

const digitsTolerance = 6;

const iso = 'BGD';
const year = 2002;
const BGD2002 = data.filter((x) => x.countrycode == iso && x.year == year);
const expectedGrpc = BGD2002[columnNames.GRPC_UNUWIDER];
const targetFunctionsAndValues = [
  {f: target.basicSanitation, value: columnNames.BASIC_SANITATION_COVERAGE},
  {f: target.basicWater, value: columnNames.BASIC_WATER_COVERAGE},
  {f: target.immunisation, value: columnNames.IMMUNISATION_COVERAGE},
  {f: target.maternalSurvival, value: columnNames.MATERNAL_SURVIVAL_COVERAGE},
  {f: target.safeSanitation, value: columnNames.SAFE_SANITATION_COVERAGE},
  {f: target.safeWater, value: columnNames.SAFE_WATER_COVERAGE},
  {f: target.schoolAttendance, value: columnNames.SCHOOL_ATTENDANCE_COVERAGE},
  {f: target.underFiveSurvival, value: columnNames.U5_SURVIVAL_COVERAGE},
];

test(`tests ${measure} targeting`, () => {
  expect(
    targetFunctionsAndValues[0].f(
      targetFunctionsAndValues[0].value,
      iso,
      year,
      data,
    ),
  ).toBeCloseTo(expectedGrpc, digitsTolerance);
});
