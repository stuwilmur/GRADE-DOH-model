import * as revenue from '../revenue';
import * as constants from '../constants';
import {model} from 'micro-table/dist/module';

export const modelGrpcFromAbsoluteIncrease = model()
  .calc()
  .called('grpc')
  .does((r) =>
    revenue.grpcFromAbsoluteIncrease(
      r[constants.columnNames.GRPC_UNUWIDER],
      r['absolute additional revenue'],
      r[constants.columnNames.POPTOTAL],
    ),
  )
  .end();

export const modelGrpcFromPerCapitaIncrease = model()
  .calc()
  .called('grpc')
  .does((r) =>
    revenue.grpcFromPerCapitaIncrease(
      r[constants.columnNames.GRPC_UNUWIDER],
      r['per capita increase in grpc'],
    ),
  );

export const modelGrpcFromPercentageIncrease = model()
  .calc()
  .called('grpc')
  .does((r) =>
    revenue.grpcFromPercentageIncrease(
      r[constants.columnNames.GRPC_UNUWIDER],
      r['percentage increase in grpc'],
    ),
  )
  .end();
