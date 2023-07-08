import * as target from '../../src/interface/target';
import {data} from './data';
import * as model from '../../src/model';

const digitsTolerance = 6;
const expectedGrpc = data[model.constants.columnNames.GRPC_UNUWIDER];
const tests = [
  {
    name: model.coverage.measuresNames.basicSanitation,
    f: target.basicSanitation,
    value: data[model.constants.columnNames.BASIC_SANITATION_COVERAGE],
  },
  {
    name: model.coverage.measuresNames.basicWater,
    f: target.basicWater,
    value: data[model.constants.columnNames.BASIC_WATER_COVERAGE],
  },
  {
    name: model.coverage.measuresNames.immunisation,
    f: target.immunisation,
    value: data[model.constants.columnNames.IMMUNISATION_COVERAGE],
  },
  {
    name: model.coverage.measuresNames.maternalSurvival,
    f: target.maternalSurvival,
    value: data[model.constants.columnNames.MATERNAL_SURVIVAL_COVERAGE],
  },
  {
    name: model.coverage.measuresNames.safeSanitation,
    f: target.safeSanitation,
    value: data[model.constants.columnNames.SAFE_SANITATION_COVERAGE],
  },
  {
    name: model.coverage.measuresNames.safeSanitation,
    f: target.safeWater,
    value: data[model.constants.columnNames.SAFE_WATER_COVERAGE],
  },
  {
    name: model.coverage.measuresNames.schoolAttendance,
    f: target.schoolAttendance,
    value: data[model.constants.columnNames.SCHOOL_ATTENDANCE_COVERAGE],
  },
  {
    name: model.coverage.measuresNames.underFiveSurvival,
    f: target.underFiveSurvival,
    value: data[model.constants.columnNames.UNDER_5_SURVIVAL_COVERAGE],
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
