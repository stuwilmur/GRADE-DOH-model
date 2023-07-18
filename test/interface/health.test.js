import * as health from '../../src/interface/health';
import {data} from './data';
import * as model from '../../src/model';

const digitsTolerance = 6;
const expectedGrpc = data[model.constants.columnNames.GRPC_UNUWIDER];
const tests = [
  {
    name: model.functions.health.measuresNames.basicSanitation,
    f: health.target.basicSanitation,
    value: data[model.constants.columnNames.BASIC_SANITATION_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.basicWater,
    f: health.target.basicWater,
    value: data[model.constants.columnNames.BASIC_WATER_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.immunisation,
    f: health.target.immunisation,
    value: data[model.constants.columnNames.IMMUNISATION_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.maternalSurvival,
    f: health.target.maternalSurvival,
    value: data[model.constants.columnNames.MATERNAL_SURVIVAL_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.safeSanitation,
    f: health.target.safeSanitation,
    value: data[model.constants.columnNames.SAFE_SANITATION_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.safeSanitation,
    f: health.target.safeWater,
    value: data[model.constants.columnNames.SAFE_WATER_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.schoolAttendance,
    f: health.target.schoolAttendance,
    value: data[model.constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.underFiveSurvival,
    f: health.target.underFiveSurvival,
    value: data[model.constants.columnNames.UNDER_5_SURVIVAL_COVERAGE],
  },
  {
    name: model.functions.health.measuresNames.primarySchoolAttendance,
    f: health.target.primarySchoolAttendance,
    value: data[model.constants.columnNames.IN_SCHOOL_PRIMARY_SCHOOL],
  },
  {
    name: model.functions.health.measuresNames.lowerSchoolAttendance,
    f: health.target.lowerSchoolAttendance,
    value: data[model.constants.columnNames.IN_SCHOOL_LOWER_SCHOOL],
  },
  {
    name: model.functions.health.measuresNames.upperSchoolAttendance,
    f: health.target.upperSchoolAttendance,
    value: data[model.constants.columnNames.IN_SCHOOL_UPPER_SCHOOL],
  },
];

tests.forEach((aTest) => {
  test(`Tests calculated target GRPC for ${aTest.name} is as expected`, () => {
    expect(
      aTest.f(aTest.value, [data])[0][
        model.constants.computedColumnNames.TARGET_GRPC
      ],
    ).toBeCloseTo(expectedGrpc, digitsTolerance);
  });
});
