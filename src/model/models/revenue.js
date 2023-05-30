import * as revenue from '../revenue';
import * as constants from '../constants';
import {model} from 'micro-table/dist/module';

export const modelGrpcFromAbsoluteIncrease = model()
  .calc()
  .called(constants.computedColumnNames.IMPROVED_GRPC)
  .does((r) =>
    revenue.grpcFromAbsoluteIncrease(
      r[constants.columnNames.GRPC_UNUWIDER],
      r[constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE],
      r[constants.columnNames.POPTOTAL],
    ),
  )
  .end();

export const modelGrpcFromPerCapitaIncrease = model()
  .calc()
  .called(constants.computedColumnNames.IMPROVED_GRPC)
  .does((r) =>
    revenue.grpcFromPerCapitaIncrease(
      r[constants.columnNames.GRPC_UNUWIDER],
      r[constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC],
    ),
  );

export const modelGrpcFromPercentageIncrease = model()
  .calc()
  .called(constants.computedColumnNames.IMPROVED_GRPC)
  .does((r) =>
    revenue.grpcFromPercentageIncrease(
      r[constants.columnNames.GRPC_UNUWIDER],
      r[constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC],
    ),
  )
  .end();
