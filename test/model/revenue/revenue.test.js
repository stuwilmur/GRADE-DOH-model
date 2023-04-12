import {
  grpcFromAbsoluteIncrease,
  grpcFromPercentageIncrease,
  grpcFromPerCapitaIncrease,
} from '../../../src/model/revenue';

test('checks computing $100 increase in GRPC', () => {
  expect(grpcFromAbsoluteIncrease(100, 100, 100)).toStrictEqual(101);
});

test('checks computing 10$/capita increase in GRPC', () => {
  expect(grpcFromPerCapitaIncrease(100, 10)).toStrictEqual(110);
});

test('checks computing 10% percentage increase in GRPC', () => {
  expect(grpcFromPercentageIncrease(100, 10)).toStrictEqual(110);
});
