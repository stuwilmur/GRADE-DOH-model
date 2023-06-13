import * as revenue from '../revenue';
import * as constants from '../constants';
import * as mt from 'micro-table/dist/module';

/**
 * Calculate improved GRPC, change in GRPC and percentage change in GRPC from
 * absolute additional revenue
 * @return {object} Improved GRPC model, with computed columns for:
 * Improved GRPC
 * Change in GRPC
 * Percentage change in GRPC
 */
export function createGrpcFromAbsoluteIncreaseModel() {
  return mt
    .model()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_GRPC)
    .does((r) =>
      revenue.grpcFromAbsoluteIncrease(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC)
    .does((r) =>
      revenue.additionalRevenuePerCapitaFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC)
    .does((r) =>
      revenue.percentageIncreaseFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
      ),
    )
    .end();
}

/**
 * Calculate improved GRPC, percentage change and additional absolute
 * revenue from per-capita increase in GRPC
 * @return {object} Improved GRPC model, with computed columns for:
 * Improved GRPC
 * Percentage change in GRPC
 * Absolute additional revenue
 */
export function createGrpcFromPerCapitaIncreaseModel() {
  return mt
    .model()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_GRPC)
    .does((r) =>
      revenue.grpcFromPerCapitaIncrease(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC)
    .does((r) =>
      revenue.percentageIncreaseFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE)
    .does((r) =>
      revenue.absoluteAdditionalRevenueFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end();
}

/**
 * Calculate improved GRPC, change in GRPC and absolute additional revenue from
 * percentage increase in GRPC
 * @return {object} Improved GRPC model, with computed columns for:
 * Improved GRPC
 * Change in GRPC
 * Absolute addtional revenue
 */
export function createGrpcFromPercentageIncreaseModel() {
  return mt
    .model()
    .calc()
    .called(constants.computedColumnNames.IMPROVED_GRPC)
    .does((r) =>
      revenue.grpcFromPercentageIncrease(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC)
    .does((r) =>
      revenue.additionalRevenuePerCapitaFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE)
    .does((r) =>
      revenue.absoluteAdditionalRevenueFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end();
}

/**
 * Calculate change in GRPC, percentage increase in GRPC and
 * absolute additional revenue,  from improved GRPC.
 * @return {object} Improved GRPC model, with computed columns for:
 * Change in GRPC
 * Percentage change in GRPC
 * Absolute addtional revenue
 */
export function createGrpcFromImprovedGrpc() {
  return mt
    .model()
    .calc()
    .called(constants.computedColumnNames.PER_CAPITA_INCREASE_IN_GRPC)
    .does((r) =>
      revenue.additionalRevenuePerCapitaFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.PERCENTAGE_INCREASE_IN_GRPC)
    .does((r) =>
      revenue.percentageIncreaseFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
      ),
    )
    .end()
    .calc()
    .called(constants.computedColumnNames.ABSOLUTE_ADDITIONAL_REVENUE)
    .does((r) =>
      revenue.absoluteAdditionalRevenueFromNewGrpc(
        r[constants.columnNames.GRPC_UNUWIDER],
        r[constants.computedColumnNames.IMPROVED_GRPC],
        r[constants.columnNames.POPTOTAL],
      ),
    )
    .end();
}
