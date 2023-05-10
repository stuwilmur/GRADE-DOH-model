import * as revenue from '../revenue';
import {model} from 'micro-table';

export const modelGrpcFromAbsoluteIncrease = model()
  .called('grpc')
  .does((r) =>
    revenue.grpcFromAbsoluteIncrease(
      r['GRpcUNUWIDER 2022'],
      r['absolute additional revenue'],
      r['Pop total'],
    ),
  )
  .end();

export const modelGrpcFromPerCapitaIncrease = model()
  .called('grpc')
  .does((r) =>
    revenue.grpcFromPerCapitaIncrease(
      r['GRpcUNUWIDER 2022'],
      r['per capita increase in grpc'],
    ),
  );

export const modelGrpcFromPercentageIncrease = model()
  .called('grpc')
  .does((r) =>
    revenue.grpcFromPercentageIncrease(
      r['GRpcUNUWIDER 2022'],
      r['percentage increase in grpc'],
    ),
  )
  .end();
