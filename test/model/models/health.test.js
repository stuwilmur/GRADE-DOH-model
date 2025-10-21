import * as data from './data/health';
import * as health from '../../../src/interface';

test(`Tests coverage for 10% increase in GRPC, no governance adjustment,
 for a single country and year`, () => {
  const result = health.instantaneous(
    {grpcValue: 10, grpcMethod: health.GrpcMethod.PERCENTAGE_INCREASE},
    data.input,
  );
  expect(result).toStrictEqual(data.expectedResult);
});
