import * as mt from 'micro-table/dist/module';
import * as model from '../../model';

/**
 * Calculate GRPC necessary to achieve target coverage
 * @param {function} targetCoverageFunction Target coverage function
 * @param {string} coverageColumnName Name of the column of the coverage measure
 * @param {number} targetCoverage Target coverage percentage
 * @return {object} Target coverage model
 */
export function createTargetGrpcModel(
  targetCoverageFunction,
  coverageColumnName,
  targetCoverage,
) {
  return mt
    .model()
    .const()
    .called(model.constants.computedColumnNames.TARGET_COVERAGE)
    .value(targetCoverage)
    .end()
    .calc()
    .called(model.constants.computedColumnNames.TARGET_GRPC)
    .does((r) =>
      targetCoverageFunction(
        r[coverageColumnName],
        r[model.constants.columnNames.GRPC_UNUWIDER],
        targetCoverage,
        model.governance.governanceObjectFromBaseObservedGovernance(r),
      ),
    )
    .end()
    .calc()
    .called(model.constants.computedColumnNames.TARGET_GRPC_PERCENTAGE_INCREASE)
    .does((r) =>
      model.revenue.percentageIncreaseFromNewGrpc(
        r[model.constants.columnNames.GRPC_UNUWIDER],
        r[model.constants.computedColumnNames.TARGET_GRPC],
      ),
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.TARGET_ADDITIONAL_REVENUE_PER_CAPITA,
    )
    .does((r) =>
      model.revenue.additionalRevenuePerCapitaFromNewGrpc(
        r[model.constants.columnNames.GRPC_UNUWIDER],
        r[model.constants.computedColumnNames.TARGET_GRPC],
      ),
    )
    .end()
    .calc()
    .called(
      model.constants.computedColumnNames.TARGET_ABSOLUTE_ADDITIONAL_REVENUE,
    )
    .does((r) =>
      model.revenue.absoluteAdditionalRevenueFromNewGrpc(
        r[model.constants.columnNames.GRPC_UNUWIDER],
        r[model.constants.computedColumnNames.TARGET_GRPC],
        r[model.constants.columnNames.POPTOTAL],
      ),
    )
    .end();
}
