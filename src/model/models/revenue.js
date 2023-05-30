import * as revenue from '../revenue';
import * as constants from '../constants';
import {model} from 'micro-table/dist/module';

/**
 * Calculate improved GRPC from absolute additional revenue
 * @return {object} Improved GRPC model, with computed columns for:
 * Improved GRPC
 */
export function createGrpcFromAbsoluteIncreaseModel() {
  return model()
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
}

/**
 * Calculate improved GRPC from per-capita increase in GRPC
 * @return {object} Improved GRPC model, with computed columns for:
 * Improved GRPC
 */
export function createGrpcFromPerCapitaIncreaseModel() {
  return model()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_GRPC)
    .does((r) =>
      revenue.grpcFromPerCapitaIncrease(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC],
      ),
    );
}

/**
 * Calculate improved GRPC from percentage increase in GRPC
 * @return {object} Improved GRPC model, with computed columns for:
 * Improved GRPC
 */
export function createGrpcFromPercentageIncreaseModel() {
  return model()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_GRPC)
    .does((r) =>
      revenue.grpcFromPercentageIncrease(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC],
      ),
    )
    .end();
}
